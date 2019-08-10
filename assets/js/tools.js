var tools = {
    getRouter() {
        let router = '';
        if (location.href.indexOf('?') != -1) {
            router = location.href.substring(location.href.lastIndexOf('/') + 1, location.href.indexOf('?'))
        } else {
            router = location.href.substring(location.href.lastIndexOf('/') + 1)
        }
        return router
    },
    //?id=1&name=2&age=3
    getLocationSearch(str) {

        let obj = {};
        let st = str.substring(1);    //id=1&name=2&age=3
        let temp = st.split('&');       //[id=1,name=2,age=3]
        temp.forEach((val, index) => {
            let arr = val.split('=');       //[id,1]
            obj[arr[0]] = arr[1];
        })
        return obj;
    }
}