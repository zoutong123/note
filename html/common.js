```
(function(){
    let root = this;
    let ZF = function(obj){
        if(obj instanceof ZF) return obj;
        if(!(this instanceof ZF)) return new ZF(obj);
    };

    if(typeof exports !== 'undefined'){
        if(typeof module !== 'undefined' && module.exports){
            exports = module.exports = ZF;
        }
        exports.ZF = ZF;
    }else{
        root.ZF = ZF;
    }

    ZF.prototype = {
        isInArray: (arr, val) => {
            let testStr = ',' + arr.join(",") + ",";
            return testStr.indexOf("," + val + ",") != -1;
        },
        /**
         * 格式化日期
         * date : new Date()
         * fmt : "yyyy-mm-dd"
         */
        formatDate: (date, fmt) => {
            let o = {
                "m+" : date.getMonth() + 1, //月份
                "d+" : date.getDate(), //日
                "H+" : date.getHours(), //小时
                "i+" : date.getMinutes(), //分
                "s+" : date.getSeconds(), //秒
                "q+" : Math.floor((date.getMonth() + 3) / 3), //季度
                "S" : date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        /**
         * date: new Date('12/12/2016');
         */
        dateAgo: (date) => {
            let diff = (new Date().getTime() - date.getTime())/1000,
                day_diff = Math.floor(diff/86400);
            return day_diff == 0 && (
                    diff < 60 && "just now" ||
                    diff < 120 && "1 minute ago" ||
                    diff < 3600 && Math.floor(diff/60) + " minutes ago" ||
                    diff < 7200 && "1 hour ago" ||
                    diff < 86400 && Math.floor(diff/3600) + " hours ago") ||
                    day_diff == 1 && "Yesterday" ||
                    day_diff < 7 && day_diff + " days ago" ||
                    Math.ceil(day_diff / 7) + " weeks ago";
        },
        escapeHTML: (str) => {
            let entity = {
                quot: '"',
                lt: '<',
                gt: '>',
                nbsp: ' ',
                amp: '&',
            };
            return str.replace(/&([^&;]+);/g, unit).replace(/&([^&;]+);/g, unit);
            function unit(a, b) {
                let r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        },
        getQueryString: (val) => {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        getUrlArgs: (url) => {
            let url = url || window.location.search,
                arr,args,
                result = {};
            if(url === ""){
                console.log('url没有参数');
                return result;
            }
            arr = url.substr(1).split('&');
            for(let i = 0,len = arr.length,item;i<len;i++){
                item = arr[i].split('=');
                result[item[0]] = item[1];
            }
            return result;
        },
        getBorderColor: () => {
            return 'rgba('+Math.floor(Math.random () * 255)+', '+Math.floor(Math.random () * 255)+', '+Math.floor(Math.random () * 255)+', 0.6)';
        },
        setCookie: (key, val, expiredays) => {
            let exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+';path=/');
        },
        getCookie: (key) => {
            let cookie = document.cookie,cookies,result;
            if(cookie.length>0){
                cookies = cookie.split(/\s*;\s*/);
                cookies.forEach(function(item){
                    let arr = cookie.split('=');
                    if(arr.length>1){
                        if(arr[0] == key){
                            result = arr[1];
                        }
                    }
                });
                return result;
            }
        },
        pcAddEventListener: (event) => {
            localStorage.setItem(event, new Date().getTime());
        },
        pcEventListener: (event, fn) => {
            window.addEventListener('storage',function(e){
                if(e.key == event){
                    fn();
                }
            })
        },
        extend: (a, b) => {
            for (let key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a;
        }
    };
}).call(window);

```
