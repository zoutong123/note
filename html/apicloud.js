```
var Tool = {
    /**
     * 打开一个新窗口
     */
    openWin: function(param) {
        api.openWin({
            name: param.name || new Date().getTime(),
            url: api.wgtRootDir + param.url,
            reload: true,
            vScrollBarEnabled: false,
            slidBackEnabled: false,
            bounces: false,
            delay : param.delay || 300,
            animation: {
                type: "movein",
                subType: "from_right",
                duration: 300
            },
            pageParam : param.param
        });
    },
    openHeader: function(param) {
    	api.openWin({
    		name : param.name || new Date().getTime(),
    		url : api.wgtRootDir + '/publicWin.html',
    		reload : true,
    		bounces : false,
    		vScrollBarEnabled : false,
    		slidBackEnabled : false,
    		delay : param.delay || 300,
    		pageParam : {
    			title : param.frame.title,
    			frameName : param.frame.name || new Date().getTime(),
    			frameUrl : param.frame.url,
    			text : param.frame.text,
    			eveObj : param.frame.eveObj,
    			param : param.frame.param || {}
    		}
    	});
    },
    confirm: function(msg, event){
        api.openFrame({
            name: 'dialog',
            url: api.wgtRootDir + '/home/dialog.html',
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: api.winHeight
            },
            pageParam: {
                msg: msg,
                event: event
            }
        });
    },
    showOrHideFG: function(name, bool){
        api.setFrameGroupAttr({
            name: name,
            hidden: !bool
        });
    },
    showOrHideFrame: function(name, bool){
        api.setFrameAttr({
            name: name,
            hidden: !bool
        });
    },
    /**
     * 关闭当前窗口
     */
    closeWin: function() {
        api.closeWin();
    },
    /**
     * 关闭到指定 window，最上面显示的 window 到指定 name 的 window 间的所有 window 都会被关闭
     */
    closeToWin: function(name) {
        api.closeToWin({
            name: name
        });
    },
    /**
     * 监听安卓返回键,执行closeToWin
     */
    keyBackToWin: function(name) {
        api.addEventListener({
            name: 'keyback'
        }, function(ret, err) {
            Tool.closeToWin(name);
        });
    },
    /**
     * 退出App
     */
    exitApp: function(str) {
        var tip = str || '您即将退出App?';
        if (confirm(tip)) {
            api.closeWidget({
                id: api.appId,
                silent: true
            });
        }
    },
    /**
     * 判断登陆状态，进入登录界面
     */
    isLogin: function(){
        var isLogin = $api.getStorage('isLogin');
        if(isLogin === 'false'){
            api.addEventListener({
                name: 'goLogin'
            }, function(ret, err){
                Tool.openWin({
                    name: 'signIn',
                    url: '/home/signIn.html'
                });
            });
            Tool.confirm('请先登录', 'goLogin');
        }
    },
    /**
     * 验证交易密码
     */
    hasDealPwd: function(event){
        api.ajax({
            url: SERVER_PATH + 'User/checkDealPasswordIsSet',
            method: 'post',
            data: {
                values: {
                    accessToken: $api.getStorage('token'),
                    investorId: $api.getStorage('userId')
                }
            }
        }, function(ret, err) {
            var bool = false;
            if (ret && ret.code == 0) {
                bool = true;
            }
            api.sendEvent({
                name: event,
                extra: {
                    hasDealPwd: bool
                }
            });
        });
    },
    /**
     * 验证交易密码
     */
    checkDealPwd: function(event){
        api.openFrame({
            name: 'dialog',
            url: api.wgtRootDir + '/home/dialog.html',
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: api.winHeight
            },
            pageParam: {
                title: '输入交易密码',
                event: event,
                input: true,
                inputType: 'password',
            }
        });
    },
    /**
     * 返回当前是否联网
     */
    isOnLineStatus: function(callback) {
        var s = api.connectionType;
        s = s.toLowerCase();
        if ((s.indexOf('wifi') != -1) || (s.indexOf('3g') != -1) || (s.indexOf('4g') != -1) || (s.indexOf('2g') != -1)) {
            callback(true, s);
        } else {
            callback(false, s);
        }
    },
    /**
     * toast提示信息
     */
    toastInfo: function(msg, time, pos){
        var time = time || 1500;
        api.toast({
            msg: msg,
            duration: time,
            location: pos || 'middle'
        });
    },
    /**
     * toast提示并关闭当前窗口
     */
    toastInfoThenClose: function(msg, time, pos){
        var time = time || 1500;
        api.toast({
            msg: msg,
            duration: time,
            location: pos || 'middle'
        });
        setTimeout(function() {
    		closeWin();
    	}, (time+500));
    },
    /**
     * 加载更多
     */
    loadMore: function(fn){
        api.addEventListener({
    		name : 'scrolltobottom',
    		extra : {
    			threshold : 30
    		}
    	}, function(ret, err) {
    		fn();
    	});
    },
    /**
     * 刷新
     */
    refreshPage: function(fn){
        api.setRefreshHeaderInfo({
    		visible : true,
    		loadingImg : 'widget://image/refresh.png',
    		bgColor : '#ccc',
    		textColor : '#fff',
    		textDown : '下拉刷新...',
    		textUp : '松开刷新...',
    		showTime : true
    	}, function(ret, err) {
    		//这里写重新渲染页面的方法
    		api.refreshHeaderLoadDone();
    		fn();
    	});
    },
    sendEvent: function(event, ret, err){
        api.sendEvent({
            name: event,
            extra: {
                ret: ret,
                err: err
            }
        });
    },
    /**
     * 选择上传图片方式
     */
    getPicture: function(type, event){
        api.getPicture({
    		sourceType : type,
    		encodingType : 'png',
    		mediaValue : 'pic',
    		destinationType : 'url',
    		allowEdit : false,
            targetWidth: 750,
    		saveToPhotoAlbum : false
    	}, function(ret, err) {
            Tool.sendEvent(event, ret, err);
    	});
    },
    /**
     * 上传图片
     */
    uploadImage: function(url, file, event){
        api.showProgress();
        api.ajax({
            url : url,
            method : 'POST',
            cache : false,
            dataType : 'json',
            data : {
                files: {
                    file: file
                }
            }
        }, function(ret, err) {
            api.hideProgress();
            Tool.sendEvent(event, ret, err);
        });
    },
    /**
     * 查看图片
     */
    viewImage: function(imgArr, index){
        var imageBrowser = api.require('imageBrowser');
		imageBrowser.openImages({
			imageUrls : imgArr,
            showList: false,
            activeIndex: index
		});
    },
    /**
     * 格式化金额
     */
    formatMoney: function(money){
        money = +money;
        money = money.toFixed(2);
        money += '';
        int = money.substring(0,money.indexOf(".")).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
        dot = money.substring(money.length,money.indexOf("."))//取到小数部分
        money = int + dot;
        return money;
    },
    /**
     * 格式化日期
     * date : new Date()
     * fmt : "yyyy-mm-dd"
     */
    formatDate: function (date, fmt){
        var o = {
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
     * 排序函数 type:-1 从小到大；tyoe:1 从大到小
     */
    arrSort: function(arr, key, type){
        var _arr = [].concat(arr);
        var _type = type || -1;
        _arr.sort(function(a, b){
            if(a[key] > b[key]){
                return _type;
            }else if(a[key] < b[key]){
                return _type * -1;
            }else{
                return 0;
            }
        });
        return _arr;
    },
    imageCache: function(dataArr, str, fn){
        var _len = dataArr.length,
            i = 0;
        if(!_len) return;
        dataArr.forEach(function(item){
            api.imageCache({
                url: item[str],
            }, function(ret, err) {
                i++;
                item[str] = ret.url;
                if(_len == i){
                    fn();
                }
            });
        });
    }
};
```
