# Huaban 扒图实践

## 适用时间 2019-01-25

## 起因

因为花瓣要关闭了，同事在花瓣采集的1w6个图片无法被在线访问了，需要进行保存。

## 过程

在个人主页单个采集（不是画板）进行浏览，可以抓取到形如

    http://login.meiwu.co/hxkkqippkx/pins/?jr91h12a&max=2239464418&limit=20&wfl=1

的Ajax请求。

其中`max`为上一次请求结果中最后一张采集图片的`pin_id`。表现逻辑为将采集集合中大于该`max`的数据，取`limit`条返回，当然`limit`可以调整成`100`。

请求本身中携带`cookie`等必要因素，可以自行摘取。这里有个[请求的例子](sample-curl.sh)。

这里有个[请求结果的例子](sample-res.json)。

每个花瓣的结构中有如下必要字段

```json
{
    "pin_id": 33579511,
    "user_id": "tongshi_id",
    "board_id": 3455962,
    "file_id": 7094309,
    "file": {
        "farm": "farm1",
        "bucket": "hbimg",
        "key": "dee9c9f1f9cf144fa103bd3120ca99677e116a4532b41-xGFBEv",
        "type": "image/jpeg",
        "width": 740,
        "height": 340,
        "frames": 1
    },
    "media_type": 2,
    "source": "fun.alipay.com",
    "link": "http://fun.alipay.com/zhthd/index.htm?src=wdzfb_bottom02",
    "raw_text": "好粉, 好多字,好多元素. 账户通为你的异地恋情护航 - 支付宝 知托付！",
}
```

其中 `pin_id` 有助于下一期请求。`file`中的`key`有助于获得图片最后的地址。


于是很明显的就只有两步要做：

1. 将所有采集的结果请求到本地保存起来。[采集结果所需脚本](get-pins.js)

1. 根据采集的数据中图片的信息，拼出图片地址，请求并保存到本地。[保存图片所需脚本](main-down.js)

很幸运的是，所有的图片都在花瓣的cdn存放，地址形如

    http://img.hb.meiwu.co/${hash}

`hash`部分会在第一步的结果找到。

如把上面的`key`拼到这个地址后面部分，可以得到地址：`http://img.hb.meiwu.co/dee9c9f1f9cf144fa103bd3120ca99677e116a4532b41-xGFBEv` ，也就是下面的图

![](http://img.hb.meiwu.co/dee9c9f1f9cf144fa103bd3120ca99677e116a4532b41-xGFBEv)

于是乎，就可以批量下载了。

下载采用了[aria2c](https://aria2.github.io/)。

## 踩坑

花瓣CDN对IP有限制，大约500张的频繁请求之后就被限制，于是做了一下延时处理。俗称IP冷却。

具体做法为：

- 将`worker`中的文件全部移动到`done`文件夹，进行清空。

- 将采集到的收藏结果集`source`文件夹中取4个JSON文件放到`worker`文件夹

- 下载脚本读取`worker`文件夹中的文件，进行下载，存储到`output`文件夹。

- 下载完成后，结束进程。

为了自动化执行这个循环，就有了这个[脚本](watch-nohup.js)。它监听到`nohup`包裹的进程的结束后，再次启动`nohup`，来重复这个过程。

当然还有更好的做法，限于时间，就不做尝试了。

# Contact Me!

Please feel free to contact me if you have any problems 😄

    npm run cwa

# Acknowledgement

[lib/logger.js](lib/logger.js) is copied from [node-logger](https://github.com/quirkey/node-logger), all rights reserved to [quirkey](https://github.com/quirkey).
