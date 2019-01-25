const fs = require('fs-extra');
const axios = require('axios');
const resolve = require('path').resolve;
function createUrl(lastMax) {
    return `http://login.meiwu.co/hxkkqippkx/pins/?jr91h12a&max=${lastMax}&limit=100&wfl=1`
}
const filename = last => resolve(__dirname, 'source', `pins-${last}.json`);

const instance = axios.create({
    baseURL: '',
    timeout: 10000,
    headers: {
        'Pragma': 'no-cache', 'DNT': '1', 'Accept-Encoding': 'gzip, deflate', 'X-Request': 'JSON', 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7', 'Accept': 'application/json', 'Cache-Control': 'no-cache', 'X-Requested-With': 'XMLHttpRequest', 'Cookie': 'referer=http%3A%2F%2Fhuaban.com%2F; sid=OD1pZ4cQ7zjii5J2war5rfYdaN1.HMdf3j35QEC2gQJlnKadgiGhaiRy2m42BeOR4QTEQdI; _f=iVBORw0KGgoAAAANSUhEUgAAADIAAAAUCAYAAADPym6aAAAEtElEQVRYR82XbWwUVRSGnzPbgkJN0cqXSEKjAhWVIDtTUEtnAlESNQEFIfCDIGoCISYqJkYwotFgRARFBENQwEQIKgrFmAC6uyIh3S0qKoJgtFEoxUTTSlu%2B2j3m7t6uLW3pB0I4yf6Ye2fmnue%2B7z1nVlBVgJ61tVT16kW3M2dQETPE0IMHOVBQsEbgkdRAJ0LhOWC7QGknHmvz1mV%2FL0vl2VZIU5CanBycZPJckHcFZnU2mcsWROE%2B4KTAFwZKYT0w14wBjwJTgb3AUoHfLUg5cA%2FQA1gssEehr71%2FEvABsEKgVmEdsAV4Eoja9%2FzVuIGdVuSpJUtIOk7q%2BesqKnh68eKUIgrTgRpJL2ZAfgVuB%2BqAccDXwN1Af4HlFsQDZgO5wJdAPpAHDAB%2BAOYDnwnsVjgMrATeA54AygS2dhnEj0Yz1hpUXs66GTPOCyJQpXADYJI2PwMy1YJ83wT8DdIqfgOEgVuAe4HPBdZYkLFWzTGAL%2FBil0HaOiMK04B6gU0KIaACGAIMBF4FXgGMlHMEJluQiKSVMgquAt62AIXA%2B1ZRFVhtQVy7MUbpiZIuGKnotLXOA2J229jLyH4b8C1wtbVTrk3GzE9oAtINWEj6XOwBbgJeB9YC35n8gH2XGqQnsAgYZf0%2B0yqSYy1zytpmiAVZAPSxNhoMzDI2U7jLwpiD%2FCNwyIL8DBResCJtF2jbVOwNCldKulJlQtOW6iZgYJqFglHF2Ods44RCth2r72hZ77C1OgrS0YVbAEXKhkJeuQT5LWBTZ%2Birsv401IckGHWktTUMSO7pK6ju3urjZBpiZ0E0Gj8GlIjvPZbZ6Wg8hopK4PqZsVhpPkkpQWQASjYiS8QPP99M0WjclFkfFaPsTgncCc3nEx%2BeyD49KTvp8M6weKupXgjIZpAC8d2C1I5G9udAXSXoQgm81%2F6DS6wHLURrh%2BFctQhNPozW9pUgSNlKo%2FGZIG8ScnzqG3ojshV1HpBg5LbMOyKJjfuvOT7lxn%2FyWDWs9S%2BeroNEEpNAN5IVKpSikXs1lpiPMg%2Bt6d2YZDrRxAGDKb43R0tL8zgplWhoYmOiGk1sAh0ovjfagh1KqeJ7c5pu%2FY5fNmjRsUH%2FP0hahfgRHCmRYne2RhO7UK2VwBt%2Fji2OorJSgvBLNtFqRJ6VYneFfcdOkFMSuOYTyChkvPOb%2BN6USwcSTWwAhpMjo6nRCoTHpdhd0wwkEq%2FEkeVS7L6cAYF54nurrWIR0BrxvfubgBwW3zM9KRMXW5HxCCUgy1GdJoHXr0W1isYPobJdAneu7t7Xh7Onj%2BIwTsZ4MZv4ZqCf%2BN4dFuwwwjYpdk3jvTQgNhHz8XgtsEN878FWQD62ReFmjSWWktTJEnjXayz%2BEFndo5w9Mx30BUJZRdTrQEh%2BhGgRODmEqJOicOp0X1RFrMfXIjIDlYkShD9tARJLjCDJJwi5KOYf2wIJ3Lc0kqgCVkngPpM%2BX4wwzQDYJL47S6OJUmu5sRqJVzY42jekDg1Okj96VrMl%2F6dmS3W5ap2bcHvXuquskPoTezNld1fpYCkqNBUqFRoru5Ws7ONy5%2FA%2FU9emQfagTsLhanN92XT29kDbm28P5F9qMYs3WgVuuAAAAABJRU5ErkJggg%3D%3D%2CMacIntel.1920.1080.24; _uab_collina=154823807359538415671301; Hm_lvt_d4a0e7c3cd16eb58a65472f40e7ee543=1548238074; UM_distinctid=1687a2e302247d-063a861423d1d9-10306653-1fa400-1687a2e302353e; uid=966116; __gads=ID=74133a997d2d692d:T=1548238477:S=ALNI_MY_DA8d_twh5u_KycWJYpaal6goaQ; Hm_lpvt_d4a0e7c3cd16eb58a65472f40e7ee543=1548238912; CNZZDATA1256903590=1074569097-1548233483-http%253A%252F%252Fhuaban.com%252F%7C1548238883; _cnzz_CV1256903590=is-logon%7Clogged-in%7C1548238912587%26urlname%7Chxkkqippkx%7C1548238912590', 'Connection': 'keep-alive', 'Referer': 'http://login.meiwu.co/hxkkqippkx/pins/'
    }
});
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data.user;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


function main() {
    let lastMax = '2242203460';

    function fetchData() {
        const url = createUrl(lastMax);
        instance.get(url).then(user => {
            const { pins } = user;
            if (pins.length > 0) {
                lastMax = pins[pins.length - 1].pin_id;
                fs.writeJSONSync(filename(lastMax), pins);
                setTimeout(fetchData, 2000);
            }
        })
    }
    fetchData();
}
main();