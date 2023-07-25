import __config from '../config/config'
import __statecode from '../config/statecode'
import Lang from '../config/lang'

import md5 from './md5'

var version = "0.0.1", jQuery = function (selector, context) {
    return new jQuery.fn.init(selector, context);
};

//var cj = require("./CryptoJS-AES.js");

//var WxStorageCache = require("./WxStorageCache.js");

import WxStorageCache from '../helpers/WxStorageCache'
import WxValidate from '../helpers/WxValidate'


var storageCache = new WxStorageCache();
var validate = new WxValidate();

import WxStorage from '../helpers/WxStorage'
import Tools from '../helpers/Tools'



// #ifndef H5
function wxShare($title, $desc, $link, $img_url)
{
}
// #endif

function scanCode(opt) {
// #ifdef H5
return null;
// #endif

// #ifndef H5
return uni.scanCode(opt);
// #endif
}

function downloadFile(opt) {
    // #ifdef H5
    return (function (opt) {
        window.location.href = sprintf('%s?url=%s', __config.URL.download_proxy, encodeURIComponent(opt.url))
    })(opt);
    // #endif

    // #ifndef H5
    return uni.downloadFile(opt);
    // #endif
}



function chooseImage(opt) {
	// #ifndef APP-PLUS
	return uni.chooseImage(opt);
	// #endif

	// #ifdef APP-PLUS
	if (plus.os.name.toLowerCase() === 'android') {
		return new Promise(function(resolve, reject) {
			plus.android.requestPermissions(['android.permission.READ_EXTERNAL_STORAGE'], function(e) {
				/*
				if(e.deniedAlways.length>0){ //权限被永久拒绝
				 // 弹出提示框解释为何需要相册权限，引导用户打开设置页面开启
				 console.log('Always Denied!!! '+e.deniedAlways.toString());
				}
				if(e.deniedPresent.length>0){ //权限被临时拒绝
				 // 弹出提示框解释为何需要相册权限，可再次调用plus.android.requestPermissions申请权限
				 console.log('Present Denied!!! '+e.deniedPresent.toString());
				}
				*/
				if (e.granted.length == 1) {
					//权限被允许
					//调用依赖获取相册权限的代码
					resolve(uni.chooseImage(opt));
				}
			}, function(e) {
				console.log('Request Permissions error:' + JSON.stringify(e));
			});
		})
	} else {
		return uni.chooseImage(opt);
	}
	// #endif
}

function chooseVideo(opt) {

	// #ifndef APP-PLUS
	return uni.chooseVideo(opt);
	// #endif

	// #ifdef APP-PLUS
	if (plus.os.name.toLowerCase() === 'android') {
		return new Promise(function(resolve, reject) {
			plus.android.requestPermissions(['android.permission.READ_EXTERNAL_STORAGE'], function(e) {
				/*
				if(e.deniedAlways.length>0){ //权限被永久拒绝
				 // 弹出提示框解释为何需要相册权限，引导用户打开设置页面开启
				 console.log('Always Denied!!! '+e.deniedAlways.toString());
				}
				if(e.deniedPresent.length>0){ //权限被临时拒绝
				 // 弹出提示框解释为何需要相册权限，可再次调用plus.android.requestPermissions申请权限
				 console.log('Present Denied!!! '+e.deniedPresent.toString());
				}
				*/
				if (e.granted.length == 1) {
					//权限被允许
					//调用依赖获取相册权限的代码
					resolve(uni.chooseVideo(opt));
				}
			}, function(e) {
				console.log('Request Permissions error:' + JSON.stringify(e));
			});
		})
	} else {
		return uni.chooseVideo(opt);
	}
	// #endif
}


//判断是否包含在APP中
function ifUniApp(opt) {
	// #ifdef H5
	if (/uni-app/i.test(navigator.userAgent))
	{
		return true;
	}
	// #endif

	return false;
}

function openApp(schema, ios_download_link, android_download_link) {
    // #ifdef APP-PLUS
    plus.runtime.openURL( schema );
    // #endif

    // #ifdef H5
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        var loadDateTime = new Date();
        window.location = schema;//schema链接或者universal link
        window.setTimeout(function() { //如果没有安装app,便会执行setTimeout跳转下载页
            var timeOutDateTime = new Date();
            if (timeOutDateTime - loadDateTime < 5000) {
                window.location = ios_download_link; //ios下载地址
            } else {
                window.close();
            }
        }, 500);

    } else if (navigator.userAgent.match(/android/i)) {
        var state = null;
        try {
            window.location = schema; //schema链接或者universal link
            window.setTimeout(function() {
                window.location = android_download_link; //android下载地址
            }, 500);
        } catch (e) {}
    }
    // #endif

}

function openAppByPackagename(packagename, actionname, download_link) {
    // #ifdef APP-PLUS
    if(plus.runtime.isApplicationExist({pname:packagename}))
    {
        console.log("该app已安装")
        //调用第三方app
        plus.runtime.launchApplication({
                pname:packagename,
                action:actionname //传递的参数
            },
            function ( e ) {
                //console.log("e",e)
                uni.showToast({
                    title: Lang.__('唤起App失败'),
                    icon:"none"
                })
            },
        );
    }
    else
    {
        uni.showToast({
            title:Lang.__('App未安装'),
            icon:"none"
        })

        plus.runtime.openURL(download_link)
    }
    // #endif
}

//设置当前页面标题
function setNavigationBarTitle() {
    uni.setNavigationBarTitle(...arguments)

	// #ifdef H5
	let options = arguments[0];
	if (options.title)
	{
		//setTitle(options.title)
	}
	// #endif
}


/**
 * 微信浏览器中设置对应页面的标题
 * 解决：IOS微信浏览器中用document.title 设置标题无效
 * */
export const setTitle = (title) => {
    var body = document.getElementsByTagName('body')[0];
    document.title = title;
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "logo.png");
    iframe.setAttribute("style", "display:none");
    iframe.addEventListener('load', function() {
        setTimeout(function() {
            try{
                iframe.removeEventListener('load');
            }catch (err){}
            document.body.removeChild(iframe);
        }, 0);
    });
    document.body.appendChild(iframe);
};

export const setMeta = (meta_content) => {
    let head = document.getElementsByTagName('head');
    let meta = document.createElement('meta');
    meta.content = meta_content;
    head[0].appendChild(meta)
};


let source_data = {};

// #ifdef APP-PLUS
source_data['source_type'] = __statecode.SOURCE_TYPE_APP;
source_data['source_from'] = __statecode.SOURCE_FROM_OTHER;
// #endif

// #ifdef MP
source_data['source_type'] = __statecode.SOURCE_TYPE_MP;
source_data['source_from'] = __statecode.SOURCE_FROM_WECHAT;
// #endif

// #ifdef MP-WEIXIN
source_data['source_type'] = __statecode.SOURCE_TYPE_MP;
source_data['source_from'] = __statecode.SOURCE_FROM_WECHAT;
// #endif

// #ifdef MP-BAIDU
source_data['source_type'] = __statecode.SOURCE_TYPE_MP;
source_data['source_from'] = __statecode.SOURCE_FROM_BAIDU;
// #endif

// #ifdef MP-ALIPAY
source_data['source_type'] = __statecode.SOURCE_TYPE_MP;
source_data['source_from'] = __statecode.SOURCE_FROM_ALIPAY;
// #endif

// #ifdef MP-TOUTIAO
source_data['source_type'] = __statecode.SOURCE_TYPE_MP;
source_data['source_from'] = __statecode.SOURCE_FROM_TOUTIAO;
// #endif

// #ifdef H5
source_data['source_type'] = __statecode.SOURCE_TYPE_H5;
source_data['source_from'] = __statecode.SOURCE_FROM_OTHER;
// #endif



var storage = new WxStorage;
var tools = new Tools;

jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    setBackground: function () {
        this[0].style.background = 'yellow';
        return this;
    },
    setColor: function () {
        this[0].style.color = 'blue';
        return this;
    }
};

jQuery.extend = jQuery.fn.extend = function () {
    var isObject = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    };
    var isArray = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    };
    var name, clone, copy, copyIsArray, options, i = 1,
        length = arguments.length,
        target = arguments[0] || {},
        deep = false; //默认为浅复制

    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    if (typeof target !== "object" && typeof target !== "function") {
        target = {};
    }

    //target后面没有其他参数了(要拷贝的对象)，直接扩展jQuery自身，target并入jQuery
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                var src = target[name]; //jQuery是否已经有该属性
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                //深拷贝，且确保被拷属性为对象/数组
                if (deep && copy && isObject(copy) || (copyIsArray = isArray(copy))) {
                    //被拷贝属性为数组
                    if (copyIsArray) {
                        copyIsArray = false;
                        //被合并属性
                        clone = src && isArray(src) ? src : [];
                    } else { //被拷贝属性为对象
                        clone = src && isObject(src) ? src : {};
                    }
                    //右侧递归，直到内部属性值是非对象
                    target[name] = jQuery.extend(deep, clone, copy);
                } else if (copy !== undefined) { //非对象/数组，或者浅复制的情况
                    target[name] = copy; //递归结束
                }
            }
        }
    }
    //返回修改后的target
    return target;
};


function Encrypt(e) {
    var t = cj.CryptoJS.enc.Utf8.parse(e),
        n = cj.CryptoJS.AES.encrypt(t, key, {iv: iv, mode: cj.CryptoJS.mode.CBC, padding: cj.CryptoJS.pad.Pkcs7}),
        r = cj.CryptoJS.enc.Base64.stringify(n.ciphertext);
    return tools.stringToHex(r)
}

function Decrypt(e) {
    var t = tools.hexToString(e),
        n = cj.CryptoJS.AES.decrypt(t, key, {iv: iv, mode: cj.CryptoJS.mode.CBC, padding: cj.CryptoJS.pad.Pkcs7}),
        r = n.toString(cj.CryptoJS.enc.Utf8);
    return r.toString()
}

function getRequestCacheKey(opts) {
    var dataOrigin = tools.clone(opts.data || {});
    delete dataOrigin.perm_id;
    delete dataOrigin.perm_key;

    var key,dataString;
    try {
        if (typeof dataString !== 'string') {
            dataString = JSON.stringify(dataOrigin);
        }
        //key = opts.url.replace(/jQuery.*/,'') + ajaxOptions.type.toUpperCase() + (dataString || '')
        key = opts.url.replace(/jQuery.*/,'') + (dataString || '')
    } catch (e) {
        console.error(e);
    }

    return md5(key);
}

function get (ajaxOpts) {
    //为对象新增ajaxPost方法
    //uni.setStorageSync('uid', 10001);
    //uni.setStorageSync('ukey', 'dZk60avC8uj3zz32rIzpp758K669AJhhHK9KriXap2pKzj_2OvuHA9hBd58QcpswgFlJx_DIZp0LF9D7Sn3C7idsziZf2K40Phg1ju7-lQz2XBftoGyf5gVwKJp7tNWX');

    var id = uni.getStorageSync('uid');
    var key = uni.getStorageSync('ukey');
    var perm_data = {};

    //修正 opts 数据, 默认数据
    if (id && key) {
        perm_data = {perm_id: id, perm_key: key};
    }

    //判断终端来源
    perm_data['source_type'] = __statecode.SOURCE_TYPE_OTHER;
    perm_data['source_from'] = __statecode.SOURCE_FROM_OTHER;

    source_data['source_lang']  = uni.getStorageSync('language');
    source_data['currency_id']  = uni.getStorageSync('currency_id');

    source_data['site_id']      = uni.getStorageSync('site_id');

    Object.assign(perm_data, source_data);

	//perm_data['systemInfo'] = JSON.stringify(__config.systemInfo);

    //perm_data = {perm_id: 10001, perm_key: 'dZk60avC8uj3zz32rIzpp758K669AJhhHK9KriXap2pKzj_2OvuHA9hBd58QcpswgFlJx_DIZp0LF9D7Sn3C7idsziZf2K40Phg1ju7-lQz2XBftoGyf5gVwKJp7tNWX'};
    //perm_data['frontend_id'] = '5';
    //perm_data['store_id'] = __config.STOREID;

    if (__config.SAAS_STATUS)
    {
        //perm_data['store_id'] = __config.STOREID;
    }

    var opts = {
        method: "GET",
        dataType: "json",
        loading: false,
        data: perm_data,
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },

        //header: {"content-type": "application/json"},
/*

        ajaxCache: {
            timeout: __config.CACHE_EXPIRE,
            forceRefresh: false
        },
*/

        success: function (data, status) {
            uni.hideToast();
        },

        fail: function (err, status) {
            uni.hideToast();
            //parent.Public.tips({type: 2, content: '操作无法成功，请稍后重试！'});
            console.error('$.request  - 操作无法成功，请稍后重试！');
			console.info(err);
			console.info(ajaxOpts);
        },
        complete: function (res, status) {
            //console.info('$.request  -complete');
            //uni.hideToast();
        }
    };

	// 规范写法 不可随意自定义
	if (key) opts.header['Authorization'] = `Bearer ${key}`;


    jQuery.extend(true, opts, ajaxOpts);


    // 调试 console.info(opts);

    if (opts.loading) {
        uni.showToast({
            title: Lang.__('加载中'),
            icon: 'loading',
            duration: 10000,
            mask: !0,
        })
    }


    var successCallback = opts.success;
    var errorCallback = opts.fail;
    var completeCallback = opts.complete;

    opts.success = function (res) {
        if (opts.loading) {
            uni.hideToast();
        }

        var data = res.data
        if (data.status == 250 && data.code == 30) {

            uni.removeStorageSync('uid');
            uni.removeStorageSync('ukey');

			var pages = getCurrentPages();
			var page = pages[pages.length - 1];

            if (page.route !=  'pages/login/login') {

				uni.setStorageSync('pre_route', page.route);
				if (page.options) {
					uni.setStorageSync('pre_options', page.options);
				}
				//page.$getAppWebview();

                //
                //var app = getApp();

                /*
                //重新发送原先请求
                app.getUserInfo(function (data) {
                    //
                    if (data)
                    {
                        var id = uni.getStorageSync('uid');
                        var key = uni.getStorageSync('ukey');

                        //服务端出错，可能出现死循环的。
                        if (id && key) {
                            get(ajaxOpts);
                        }
                    }
                    //
                });
                */

                /*
                uni.redirectTo({
                    url: '/pages/login/index'
                })
                 */
                tools.toLogin();

                 /*
                uni.switchTab({
                    url: '/pages/user-center/user-center'
                });
                 */
            }
        }
        else
        {
			//console.info(JSON.stringify(data))
            successCallback && successCallback(data.data, data.status, data.msg, data.code);
        }

        //存入cache
        if (data.status == 200)
        {
            //
        }

    }

    opts.fail = function (err, ms) {
        if (opts.loading) {
            uni.hideToast();
        }

        if (!errorCallback) {
            var content = Lang.__('服务端响应错误！')
            if (ms === 'timeout') {
                content = Lang.__('请求超时！');
            }

            uni.showModal({
                title: Lang.__('提示'),
                content: content,
                showCancel: false
            })
        }

        errorCallback && errorCallback(err);
    }

    opts.complete = function (res, status) {
        if (opts.loading) {
            //uni.hideToast();
        }

        completeCallback && completeCallback(res, status);
    }

    if (typeof opts['data']['store_id'] == 'undefined' || opts['data']['store_id'] == 5854) {
        //opts['data']['store_id'] = __config.STOREID;
    }

    //判断Cache
    var ajaxCacheOptions = opts.ajaxCache;
    if (__config.CACHE && !tools.isNull(opts.ajaxCache))
    {
        try {
            var cacheKey = getRequestCacheKey(opts);
            var value = storageCache.get(cacheKey);

            // force reflash cache
            if(ajaxCacheOptions.forceRefresh === true) {
                storageCache.delete(cacheKey);
                value = null;
            }

            // If it not in the cache, we store the data, add success callback - normal callback will proceed
            var realsuccess;
            if (opts.success) {
                realsuccess = opts.success;
            }

            if (!value){
                opts.success = function(res) {
                    // 业务逻辑的判断这个请求是否真正成功的请求。
                    if (200 == res.data.status) {
                        var exp = ajaxCacheOptions.timeout;

                        storageCache.set(cacheKey, res.data, {exp: exp});
                    }

                    if (realsuccess) realsuccess(res);
                };

                /*
                console.info('send request.................');
                console.info(JSON.stringify(opts))
                // #ifdef APP-PLUS
                console.info(plus.navigator.getCookie(__config.CONFIG.base_url));
                // #endif
                */

                uni.request(opts);
            }
            else
            {
                //console.info('read from $ajaxCache: ', value);

                var res = {'data':value};

                if (realsuccess) realsuccess(res);
            }

        } catch (e) {
            console.error(e);
        }
    }
    else
    {
        /*
        console.info('send request.................');
        console.info(JSON.stringify(opts))
        // #ifdef APP-PLUS
        console.info(plus.navigator.getCookie(__config.CONFIG.base_url));
        // #endif
        */
		//判断终端
		if (source_data['source_type'] == __statecode.SOURCE_TYPE_H5)
		{
			uni.request(opts);
		}
		else
		{
			uni.request(opts);
		}
    }
}

function createUrl(url, param, encode_flag) {
    var paramStr = '';
    var dot= '';
    for (var key in param) {
        //var link = dot + key + "=" + param[key];

		if ('undefined' == typeof encode_flag || !encode_flag) {
			var link = dot + key + "=" + param[key];
		}
		else
		{
			var link = dot + key + "=" + encodeURIComponent(param[key]);
		}

        paramStr += link;
        dot = '&';
    }

    let index = url.indexOf("?");

    if(index > 0)
    {
        return url + (paramStr ? "&" + paramStr : '');
    }
    else
    {
        return url + (paramStr ? "?" + paramStr : '');
    }
}

//显示提示框
function alert(e, t, n) {
    uni.showToast({icon: "success", title: e || Lang.__("成功"), duration: n || 2e3, success: t})
}

//显示提示框
function showToast(e, t, n) {

    if (tools.isObject(e))
    {
        uni.showToast(e);
    }
    else
    {
        uni.showToast({icon: "success", title: e || Lang.__("成功"), duration: n || 2e3, success: t})
    }
}

//显示加载提示框
function loading(e, t, n) {

    if (tools.isObject(e))
    {
    	uni.showLoading(e);
    }
    else
    {
        uni.showLoading({mask: !0, title: e || "loading...", success: n})
    }

}

//隐藏提示框
function hideToast() {
    uni.hideToast()
}

//隐藏提示框
function hideloading() {
    var e = setTimeout(function () {
        uni.hideLoading()
    }, 1e3)
}

//显示模态弹窗
function confirm(e, t, n) {
    if (tools.isObject(e))
    {
        if (!("cancelText" in e))
        {
            e['cancelText'] = Lang.__("取消");
        }

        if (!("confirmText" in e))
        {
            e['confirmText'] = Lang.__("确定");
        }

        if (!("title" in e))
        {
            e['title'] = Lang.__("提示");
        }

    	uni.showModal(e);
    }
    else
    {
        uni.showModal({title: Lang.__("提示"), cancelText:Lang.__("取消"), confirmText:Lang.__("确定"), content: e, showCancel: n || !1, success: t})
    }

}


function showModal(e, t, n) {
    confirm(e, t, n);
}


//显示菜单列表
function showActionSheet() {
    uni.showModal(...arguments)
}

//显示导航条加载动画
function showNavigationBarLoading() {
    uni.showNavigationBarLoading(...arguments)
}


//隐藏导航条加载动画
function hideNavigationBarLoading() {
    uni.hideNavigationBarLoading(...arguments)
}


//停止下拉刷新动画
function stopPullDownRefresh() {
    uni.stopPullDownRefresh(...arguments)
}


function gopage(url, t) {
    if (tools.isObject(url))
    {
    	uni.navigateTo(url);
    }
    else
    {
        if (__config.tabBar.list instanceof Array  || true) {
            var n = !1;
            for (var r = 0; r < __config.tabBar.list.length; r++) {
                if (!n) {
                    var i = __config.tabBar.list[r];
                    "/" + i.pagePath == url ? n = !0 : n = !1
                }
            }

            if (n)
            {
                uni.switchTab({url: url, success: t})
            }
            else
            {
                uni.navigateTo({url: url, success: t})
            }
        }
        else {
            uni.navigateTo({
                url: url, success: t
            })
        }
    }
}

function gotopage(url, t) {
    if (tools.isObject(url))
    {
    	uni.redirectTo(url);
    }
    else
    {
        if (__config.tabBar.list instanceof Array  || true) {
            var n = !1;
            for (var r = 0; r < __config.tabBar.list.length; r++) {
                if (!n) {
                    var i = __config.tabBar.list[r];
                    "/" + i.pagePath == url ? n = !0 : n = !1
                }
            }

            if (n)
            {
                uni.switchTab({url: url, success: t})
            }
            else
            {
                uni.redirectTo({url: url, success: t})
            }
        }
        else {
            uni.redirectTo({
                url: url, success: t
            })
        }
    }
}

function backpage(e, callback) {
    if (tools.isObject(e))
    {
    	uni.navigateBack(e);
    }
    else
    {
        uni.navigateBack({delta: e || 1, success: callback})
    }
}

function setCache(e, t, n) {
    uni.setStorage({key: e, data: t, success: n})
}

function getCache(e, t, n) {
    uni.getStorage({key: e, success: t, fail: n})
}

function removeCache(e, t) {
    uni.removeStorage({key: e, success: t})
}

function distanceFormat(meter) {
    if (meter<1000) {
        return meter.toFixed(2) + "m";
    } else if (meter<10000) {
        return (meter/1000).toFixed(2) + "km";
    } else {
        return (meter/1000).toFixed(0) + "km";
    }
}

function dateFormat(dateString,format) {
    var date = new Date(dateString.replace(/-/g, "/"));
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(format))
        format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return format;
}

function sendTpl(tpl_params) {
    /*
    get({
        url: tpl_params.api,
        data: tpl_params.value,
        dataType: 'json',
        success: function (data, status, msg, code) {
            var n = {
                access_token: data.Info.AccessToken,
                touser: tpl_params.WeiXinOpenId,
                template_id: data.Info.WXTmessage_key,
                page: tpl_params.pages,
                form_id: tpl_params.formId,
                data: data.Info.data
            };
            uni.request({
                url: __config.URL.wx.send_tpl_msg,
                method: "POST",
                data: {data: JSON.stringify(n)},
                header: {"content-type": "application/json"},
                success: function (t) {
                    console.log("模版消息发送成功", t, tpl_params)
                },
                fail: function (e) {
                    console.log("模版消息发送失败")
                }
            })
        }
    });
    */
}

function goToTabBar(that, url) {
    try {
        if (__config.tabBar.list instanceof Array  || true) {
            var n = !1;
            for (var r = 0; r < __config.tabBar.list.length; r++) {
                if (!n) {
                    var i = __config.tabBar.list[r];
                    "/" + i.pagePath == url ? n = !0 : n = !1
                }
            }
            n ? uni.switchTab({url: url}) : uni.navigateTo({url: url})
        }
        else {
            uni.navigateTo({
                url: url, fail: function () {
                    uni.switchTab({url: url})
                }
            })
        }
    } catch (s) {
        uni.navigateTo({
            url: url, fail: function () {
                uni.switchTab({url: url})
            }
        })
    }
}

function golevelToTabBar(that, route, url) {
    try {
        if (__config.tabBar.list instanceof Array  || true) {
            var r = false;
            for (var i = 0; i < __config.tabBar.list.length; i++) {
                if (!r) {
                    var s = __config.tabBar.list[i];
                    "/" + s.pagePath == route ? r = !0 : r = !1
                }
            }
            r ? uni.navigateTo({url: url}) : uni.redirectTo({url: url})
        }
        else {
            uni.redirectTo({url: url})
        }
    } catch (o) {
        uni.redirectTo({url: url})
    }
}


function sprintf () {
    var regex = /%%|%(\d+\$)?([\-+'#0 ]*)(\*\d+\$|\*|\d+)?(?:\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g
    var a = arguments
    var i = 0
    var format = a[i++]

    var _pad = function (str, len, chr, leftJustify) {
        if (!chr) {
            chr = ' '
        }
        var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0).join(chr)
        return leftJustify ? str + padding : padding + str
    }

    var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
        var diff = minWidth - value.length
        if (diff > 0) {
            if (leftJustify || !zeroPad) {
                value = _pad(value, minWidth, customPadChar, leftJustify)
            } else {
                value = [
                    value.slice(0, prefix.length),
                    _pad('', diff, '0', true),
                    value.slice(prefix.length)
                ].join('')
            }
        }
        return value
    }

    var _formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
        // Note: casts negative numbers to positive ones
        var number = value >>> 0
        prefix = (prefix && number && {
            '2': '0b',
            '8': '0',
            '16': '0x'
        }[base]) || ''
        value = prefix + _pad(number.toString(base), precision || 0, '0', false)
        return justify(value, prefix, leftJustify, minWidth, zeroPad)
    }

    // _formatString()
    var _formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
        if (precision !== null && precision !== undefined) {
            value = value.slice(0, precision)
        }
        return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar)
    }



    // doFormat()
    var doFormat = function (substring, valueIndex, flags, minWidth, precision, type) {
        var number, prefix, method, textTransform, value

        if (substring === '%%') {
            return '%'
        }

        // parse flags
        var leftJustify = false
        var positivePrefix = ''
        var zeroPad = false
        var prefixBaseX = false
        var customPadChar = ' '
        var flagsl = flags.length
        var j
        for (j = 0; j < flagsl; j++) {
            switch (flags.charAt(j)) {
                case ' ':
                    positivePrefix = ' '
                    break
                case '+':
                    positivePrefix = '+'
                    break
                case '-':
                    leftJustify = true
                    break
                case "'":
                    customPadChar = flags.charAt(j + 1)
                    break
                case '0':
                    zeroPad = true
                    customPadChar = '0'
                    break
                case '#':
                    prefixBaseX = true
                    break
            }
        }

        // parameters may be null, undefined, empty-string or real valued
        // we want to ignore null, undefined and empty-string values
        if (!minWidth) {
            minWidth = 0
        } else if (minWidth === '*') {
            minWidth = +a[i++]
        } else if (minWidth.charAt(0) === '*') {
            minWidth = +a[minWidth.slice(1, -1)]
        } else {
            minWidth = +minWidth
        }

        // Note: undocumented perl feature:
        if (minWidth < 0) {
            minWidth = -minWidth
            leftJustify = true
        }

        if (!isFinite(minWidth)) {
            throw new Error('sprintf: (minimum-)width must be finite')
        }

        if (!precision) {
            precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined
        } else if (precision === '*') {
            precision = +a[i++]
        } else if (precision.charAt(0) === '*') {
            precision = +a[precision.slice(1, -1)]
        } else {
            precision = +precision
        }

        // grab value using valueIndex if required?
        value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++]

        switch (type) {
            case 's':
                return _formatString(value + '', leftJustify, minWidth, precision, zeroPad, customPadChar)
            case 'c':
                return _formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad)
            case 'b':
                return _formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
            case 'o':
                return _formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
            case 'x':
                return _formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
            case 'X':
                return _formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
                    .toUpperCase()
            case 'u':
                return _formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
            case 'i':
            case 'd':
                number = +value || 0
                // Plain Math.round doesn't just truncate
                number = Math.round(number - number % 1)
                prefix = number < 0 ? '-' : positivePrefix
                value = prefix + _pad(String(Math.abs(number)), precision, '0', false)
                return justify(value, prefix, leftJustify, minWidth, zeroPad)
            case 'e':
            case 'E':
            case 'f': // @todo: Should handle locales (as per setlocale)
            case 'F':
            case 'g':
            case 'G':
                number = +value
                prefix = number < 0 ? '-' : positivePrefix
                method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())]
                textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2]
                value = prefix + Math.abs(number)[method](precision)
                return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]()
            default:
                return substring
        }
    }

    return format.replace(regex, doFormat)
}

function parse_str(query) {
    var result = {};

    var queryArr = query.split("&");

    queryArr.forEach(function(item){
        var obj = {};
        var value = item.split("=")[0];
        var key = item.split("=")[1];
        result[value] = key;

    });
    return result;
}

function isWeixin(){
    //是否微信打开
	try {
		var ua = navigator.userAgent.toLowerCase();
		var flag = ua.indexOf('micromessenger') != -1;
		if (flag && __config.WechatStatus) {
			return true;
		}else{
			return false;
		}
	} catch (e) {}

	return false;
}

function isQyWeixin(){
    //是否企业微信打开
    try {
        var ua= window.navigator.userAgent.toLowerCase();
        if ((ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork')  && __config.WechatStatus){
            return true;
        }else{
            return false;
        }
    } catch (e) {}

    return false;
}

//读Cookie
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return "";
}

function get_ext(filename){
    var postf = '';
    if (filename)
    {
        var index1=filename.lastIndexOf(".");

        var index2=filename.length;
        var postf=filename.substring(index1,index2);//后缀名
    }
    else
    {

    }

    return postf;
}

//根据文件名，返回时是否是图片类型
function isImg(filePath) {
    let index = filePath.lastIndexOf('.');
    let ext = filePath.substr(index + 1);
    var temp = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
    return temp;
}



function image_thumb(image_url, w, h) {
	if (image_url == null)
	{
		image_url = ""
	}
		
    if ('undefined' == typeof w) {
        w = 60;
    }

    if ('undefined' == typeof h) {
        h = w;
    }


    var ext = get_ext(image_url);


    if (image_url.indexOf('image.php') !== -1)
    {
        image_url = sprintf('%s!%sx%s%s', image_url, w, h, ext);
    }
    else
    {
        if (__config.UPLOAD_TYPE == 'default' && (image_url.indexOf('image.php') !== -1))
        {
            image_url = sprintf('%s!%sx%s%s', image_url, w, h, ext);
        }
        else if (/*__config.UPLOAD_TYPE == 'aliyun' &&*/ (image_url.indexOf('.aliyuncs.com') !== -1))
        {
            //将图自动裁剪成宽度为 100px，高度为 100px 的效果图。 ?x-oss-process=image/resize,m_fill,h_100,w_100

            //http://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg?x-oss-process=image/resize,m_mfit,h_100,w_100
            //将图缩略成宽度为 100px，高度为 100px，按长边优先 image/resize,m_lfit,h_100,w_100
            image_url = sprintf('%s?x-oss-process=image/resize,m_fill,h_%s,w_%s', image_url, w, h);
        }
        else if (/*__config.UPLOAD_TYPE == 'tengxun' &&*/ (image_url.indexOf('.file.myqcloud.com') !== -1))
        {
            image_url = sprintf('%s?imageMogr2/crop/%sx%s/gravity/center', image_url, w, h);
        }
        else
        {
            //image_url = sprintf('%s!%sx%s%s', image_url, w, h, ext);
        }
    }

    return image_url;
}

function img(image_url, w, h) {
    return image_thumb(image_url, w, h);
}


function qqMapTransBMap(lng, lat) {
      let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
      let x = lng;
      let y = lat;
      let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
      let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
      let lngs = z * Math.cos(theta) + 0.0065;
      let lats = z * Math.sin(theta) + 0.006;

      return {
          lng: lngs,
          lat: lats
      }
}

function bMapTransQQMap(lng, lat) {
	  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	  let x = lng - 0.0065;
	  let y = lat - 0.006;
	  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
	  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
	  let lngs = z * Math.cos(theta);
	  let lats = z * Math.sin(theta);

	  return {
		  lng: lngs,
		  lat: lats
	  }
}

function number_format(number, decimals, dec_point, thousands_sep) {
    //  discuss at: http://phpjs.org/functions/number_format/
    // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: davook
    // improved by: Brett Zamir (http://brett-zamir.me)
    // improved by: Brett Zamir (http://brett-zamir.me)
    // improved by: Theriault
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Michael White (http://getsprink.com)
    // bugfixed by: Benjamin Lupton
    // bugfixed by: Allan Jensen (http://www.winternet.no)
    // bugfixed by: Howard Yeend
    // bugfixed by: Diogo Resende
    // bugfixed by: Rival
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    //  revised by: Luke Smith (http://lucassmith.name)
    //    input by: Kheang Hok Chin (http://www.distantia.ca/)
    //    input by: Jay Klehr
    //    input by: Amir Habibi (http://www.residence-mixte.com/)
    //    input by: Amirouche
    //   example 1: number_format(1234.56);
    //   returns 1: '1,235'
    //   example 2: number_format(1234.56, 2, ',', ' ');
    //   returns 2: '1 234,56'
    //   example 3: number_format(1234.5678, 2, '.', '');
    //   returns 3: '1234.57'
    //   example 4: number_format(67, 2, ',', '.');
    //   returns 4: '67,00'
    //   example 5: number_format(1000);
    //   returns 5: '1,000'
    //   example 6: number_format(67.311, 2);
    //   returns 6: '67.31'
    //   example 7: number_format(1000.55, 1);
    //   returns 7: '1,000.6'
    //   example 8: number_format(67000, 5, ',', '.');
    //   returns 8: '67.000,00000'
    //   example 9: number_format(0.9, 0);
    //   returns 9: '1'
    //  example 10: number_format('1.20', 2);
    //  returns 10: '1.20'
    //  example 11: number_format('1.20', 4);
    //  returns 11: '1.2000'
    //  example 12: number_format('1.2000', 3);
    //  returns 12: '1.200'
    //  example 13: number_format('1 000,50', 2, '.', ' ');
    //  returns 13: '100 050.00'
    //  example 14: number_format(1e-8, 8, '.', '');
    //  returns 14: '0.00000001'

    number = (number + '')
        .replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? '' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                .toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');



    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
        .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
            .join('0');
    }
    return s.join(dec);
}

function mf(number, decimals, dec_point, thousands_sep) {
    //判断语言货币，修正 decimals

    return number_format(number, decimals, dec_point, thousands_sep);
}

 function buildUlr(url, param) {
    var LG = (function(lg){
        var objURL=function(url){
            this.ourl=url||window.location.href;
            this.href="";//?前面部分
            this.params={};//url参数对象
            this.jing="";//#及后面部分
            this.init();
        }
        //分析url,得到?前面存入this.href,参数解析为this.params对象，#号及后面存入this.jing
        objURL.prototype.init=function(){
            var str=this.ourl;
            var index=str.indexOf("#");
            if(index>0){
                this.jing=str.substr(index);
                str=str.substring(0,index);
            }
            index=str.indexOf("?");
            if(index>0){
                this.href=str.substring(0,index);
                str=str.substr(index+1);
                var parts=str.split("&");
                for(var i=0;i<parts.length;i++){
                    var kv=parts[i].split("=");
                    this.params[kv[0]]=kv[1];
                }
            }
            else{
                this.href=this.ourl;
                this.params={};
            }
        }
        //只是修改this.params
        objURL.prototype.set=function(key,val){
            this.params[key]=val;
        }
        //只是设置this.params
        objURL.prototype.remove=function(key){
            this.params[key]=undefined;
        }
        //根据三部分组成操作后的url
        objURL.prototype.url=function(){
            var strurl=this.href;
            var objps=[];//这里用数组组织,再做join操作
            for(var k in this.params){
                if(this.params[k]){
                    objps.push(k+"="+this.params[k]);
                }
            }
            if(objps.length>0){
                strurl+="?"+objps.join("&");
            }
            if(this.jing.length>0){
                strurl+=this.jing;
            }
            return strurl;
        }
        //得到参数值
        objURL.prototype.get=function(key){
            return this.params[key];
        }
        lg.URL=objURL;
        return lg;
    }(LG||{}));

    var obj =  new LG.URL(url);

    for(var o in param){
        obj.set(o, param[o]);
    }

    return obj.url();
}

function uploadFile(ajaxOpts)
{
    var id = uni.getStorageSync('uid');
    var key = uni.getStorageSync('ukey');
    var perm_data = {};

    //修正 opts 数据, 默认数据
    if (id && key) {
        perm_data = {perm_id: id, perm_key: key};
    }

    var opts = {
        header: {
        },
    };


    jQuery.extend(true, opts, ajaxOpts);
    // 规范写法 不可随意自定义
    if (key) opts.header['Authorization'] = `Bearer ${key}`;

    return uni.uploadFile(opts);
}


var defualt_data =  Object.assign(tools, {
    createUrl: createUrl,
    request: get,
    get: get,

    //界面
    alert: alert,
    showToast: showToast,
    showLoading: loading,
    hideToast: hideToast,
    hideLoading: hideloading,
    confirm: confirm,
    showModal                  :  showModal                  , //显示模态弹窗
    showActionSheet: showActionSheet,
    setNavigationBarTitle: setNavigationBarTitle,
    showNavigationBarLoading: showNavigationBarLoading,
    hideNavigationBarLoading: hideNavigationBarLoading,
    stopPullDownRefresh: stopPullDownRefresh,

    setNavigationBarColor: uni.setNavigationBarColor,

    //界面
    /*
    showToast                  :  uni.showToast                  , //显示提示框
    showLoading                :  uni.showLoading                , //显示加载提示框
    hideToast                  :  uni.hideToast                  , //隐藏提示框
    hideLoading                :  uni.hideLoading                , //隐藏提示框
    showModal                  :  uni.showModal                  , //显示模态弹窗
    showActionSheet            :  uni.showActionSheet            , //显示菜单列表
    setNavigationBarTitle      :  uni.setNavigationBarTitle      , //设置当前页面标题
    showNavigationBarLoading   :  uni.showNavigationBarLoading   , //显示导航条加载动画
    hideNavigationBarLoading   :  uni.hideNavigationBarLoading   , //隐藏导航条加载动画
    */
    createAnimation            :  uni.createAnimation            , //动画
    createContext              :  uni.createContext              , //创建绘图上下文
    drawCanvas                 :  uni.drawCanvas                 , //绘图


    //设备
    getNetworkType           :   uni.getNetworkType           ,    //获取网络类型
    onNetworkStatusChange    :   uni.onNetworkStatusChange    ,    //监听网络状态变化
    getSystemInfo            :   uni.getSystemInfo            ,    //获取系统信息
    getSystemInfoSync        :   uni.getSystemInfoSync        ,    //获取系统信息
    onAccelerometerChange    :   uni.onAccelerometerChange    ,    //监听加速度数据
    startAccelerometer       :   uni.startAccelerometer       ,    //开始监听加速度数据
    stopAccelerometer        :   uni.stopAccelerometer        ,    //停止监听加速度数据
    onCompassChange          :   uni.onCompassChange          ,    //监听罗盘数据
    startCompass             :   uni.startCompass             ,    //开始监听罗盘数据
    stopCompass              :   uni.stopCompass              ,    //停止监听罗盘数据
    setClipboardData         :   uni.setClipboardData         ,    //设置剪贴板内容
    getClipboardData         :   uni.getClipboardData         ,    //获取剪贴板内容
    makePhoneCall            :   uni.makePhoneCall            ,    //拨打电话
    scanCode                 :   scanCode                     ,    //扫码
    setScreenBrightness      :   uni.setScreenBrightness      ,    //设置屏幕亮度
    getScreenBrightness      :   uni.getScreenBrightness      ,    //获取屏幕亮度
    setKeepScreenOn          :   uni.setKeepScreenOn          ,    //设置是否保持常亮状态
    vibrateLong              :   uni.vibrateLong              ,    //使手机发生较长时间的振动
    vibrateShort             :   uni.vibrateShort             ,    //使手机发生较短时间的振动
    addPhoneContact          :   uni.addPhoneContact          ,    //添加手机通讯录


    //网络
    //request                    :  uni.request                    , //发起网络请求
    uploadFile                 :  uploadFile                 , //上传文件
    downloadFile               :  downloadFile                   , //下载文件
    connectSocket              :  uni.connectSocket              , //创建 WebSocket 连接
    onSocketOpen               :  uni.onSocketOpen               , //监听 WebSocket 打开
    onSocketError              :  uni.onSocketError              , //监听 WebSocket 错误
    sendSocketMessage          :  uni.sendSocketMessage          , //发送 WebSocket 消息
    onSocketMessage            :  uni.onSocketMessage            , //接受 WebSocket 消息
    closeSocket                :  uni.closeSocket                , //关闭 WebSocket 连接
    onSocketClose              :  uni.onSocketClose              , //监听 WebSocket 关闭
    //媒体
    chooseImage                :  chooseImage                    , //从相册选择图片，或者拍照
    previewImage               :  uni.previewImage               , //预览图片
    getImageInfo               :  uni.getImageInfo               , //获取图片信息
    saveImageToPhotosAlbum     :  uni.saveImageToPhotosAlbum     , //保存图片到系统相册
    getRecorderManager         :  uni.getRecorderManager         , //录音管理
    getBackgroundAudioManager  :  uni.getBackgroundAudioManager  , //背景音频播放管理
    createInnerAudioContext    :  uni.createInnerAudioContext    , //音频组件管理
    chooseVideo                :  chooseVideo                    , //从相册选择视频，或者拍摄
    saveVideoToPhotosAlbum     :  uni.saveVideoToPhotosAlbum     , //保存视频到系统相册
    //文件
    saveFile                   :  uni.saveFile                   , //保存文件
    getSavedFileList           :  uni.getSavedFileList           , //获取已保存的文件列表
    getSavedFileInfo           :  uni.getSavedFileInfo           , //获取已保存的文件信息
    removeSavedFile            :  uni.removeSavedFile            , //删除已保存的文件信息
    openDocument               :  uni.openDocument               , //打开文件
    //数据
    getStorage                 :  uni.getStorage                 , //获取本地数据缓存
    getStorageSync             :  uni.getStorageSync             , //获取本地数据缓存
    setStorage                 :  uni.setStorage                 , //设置本地数据缓存
    setStorageSync             :  uni.setStorageSync             , //设置本地数据缓存
    getStorageInfo             :  uni.getStorageInfo             , //获取本地缓存的相关信息
    getStorageInfoSync         :  uni.getStorageInfoSync         , //获取本地缓存的相关信息
    removeStorage              :  uni.removeStorage              , //删除本地缓存内容
    removeStorageSync          :  uni.removeStorageSync          , //删除本地缓存内容
    clearStorage               :  uni.clearStorage               , //清理本地数据缓存
    clearStorageSync           :  uni.clearStorageSync           , //清理本地数据缓存
    //位置
    getLocation                :  uni.getLocation                , //获取当前位置
    chooseLocation             :  uni.chooseLocation             , //打开地图选择位置
    openLocation               :  uni.openLocation               , //打开内置地图
    createMapContext           :  uni.createMapContext           , //地图组件控制

    //路由
    gopage: gopage,
    gotopage: gotopage,
    navigateBack: backpage,
    backpage: backpage,

    navigateTo                 :  uni.navigateTo                 , //新窗口打开页面
    redirectTo                 :  gotopage                 , //原窗口打开页面
    reLaunch                   :  uni.reLaunch                   , //重新启动到某个页面
    switchTab                  :  uni.switchTab                  , //切换到 tabbar 页面
    //navigateBack               :  uni.navigateBack               , //退回上一个页面

    // 节点信息
    createSelectorQuery        :  uni.createSelectorQuery        , //创建查询请求
    createIntersectionObserver :  uni.createIntersectionObserver , //创建 IntersectionObserver 对象

    //第三方服务
    getProvider                :  uni.getProvider                , //获取服务供应商
    login                      :  uni.login                      , //登录
    getUserInfo                :  uni.getUserInfo                , //获取用户信息
    share                      :  uni.share                      , //分享
    requestPayment             :  uni.requestPayment             , //支付
    subscribePush              :  uni.subscribePush              , //开启推送
    unsubscribePush            :  uni.unsubscribePush            , //关闭推送
    onPush                     :  uni.onPush                     , //监听透传数据
    offPush                    :  uni.offPush                    , //移除监听透传数据


    setMetaDescription : function(){},
    setMetaKeywords : function(){},
    setDocumentTitle : function(){},


    setCache: setCache,
    getCache: getCache,
    removeCache: removeCache,
    sendTpl: sendTpl,
    goToTabBar: goToTabBar,
    golevelToTabBar: golevelToTabBar,
    Decrypt: Decrypt,
    dateFormat: dateFormat,
    distanceFormat: distanceFormat,
    storage: storage,
    sprintf: sprintf,
    number_format: number_format,
    mf: mf,
    parse_str: parse_str,
    isWeixin: isWeixin,
    isQyWeixin: isQyWeixin,
    wxShare: wxShare,
    image_thumb: image_thumb,
    img: image_thumb,
    get_ext: get_ext,
    isImg: isImg,
    getCookie: getCookie,
    ifUniApp: ifUniApp,
    openApp: openApp,
    openAppByPackagename:openAppByPackagename,

    qqMapTransBMap: qqMapTransBMap,
    bMapTransQQMap: bMapTransQQMap,
    buildUlr: buildUlr,
    source_data: source_data,
    validate: validate,
    __: Lang.__
});

// #ifdef H5
//微信公众号
if (isWeixin())
{
    source_data['source_from'] = __statecode.SOURCE_FROM_WECHAT;
}
// #endif

// #ifdef H5
import initWxShareReady from "./jweixinShare";

function wxShare($title, $desc, $link, $img_url)
{
    if (isWeixin())
    {
        var pages = getCurrentPages();
        var page = pages[pages.length - 1];
        let url = page.route;

                url = window.location.href;
		//url = buildUlr(url, page.options || {});

            $link = sprintf('%s', url);

        $title = $title || window.document.title;
        get({
            url: __config.URL.wx.config.replace("typ=e", "typ=json"),
            data: {
                href: $link, title: $title, img_url:$img_url, desc:$desc, _pjax:1, fancybox:1
            },
            success: function (data, status, msg, code) {

                var uid = uni.getStorageSync('uid');
                var key = uni.getStorageSync('ukey');

				url = buildUlr(url, {uid:uid});
                initWxShareReady(data, $title, $desc, $link, $img_url, url);
            }
        });
    }
}
// #endif


export default  defualt_data
/*
uni.createAnimation	动画
uni.createContext	创建绘图上下文
uni.drawCanvas	绘图
*/

