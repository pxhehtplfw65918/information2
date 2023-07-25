// An highlighted block
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? (module.exports = factory())
    : typeof define === 'function' && define.amd ? define(factory) : (global.JSBridge = factory())
})(this, function() {
  'use strict'
  var JSBridge = {
    init() {
      this.ready(function() {})
    },
    ready(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge)
      } else {
        //register
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function() {
            callback(WebViewJavascriptBridge)
          },
          false
        )
        //register ios
        if (window.WVJBCallbacks) {
          return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        var WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'https://__bridge_loaded__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(function() {
          document.documentElement.removeChild(WVJBIframe)
        }, 0)
      }
    },
    callHandler(handName = null, param = null, callback = null) {
        window.WebViewJavascriptBridge &&
          window.WebViewJavascriptBridge.callHandler(handName, param, callback)
    },

    registerHandler(handName = null, callback = null) {
      window.WebViewJavascriptBridge &&
        window.WebViewJavascriptBridge.registerHandler(
          handName,
          (data,
          responseCallback => {
            callback(data, responseCallback)
          })
        )
    },

    /**
     * @method takePhoto
     * @description 拍照
     * @param null
     * @return 图片base64
     */
    takePhoto(callback) {
      this.callHandler('openTakepicture', null, (response) => {
        callback && callback(response);
      });
    },
    /**
     * @method openPictureBroswer
     * @description 点击图片查看
     * @param
     *   '' base64格式 传空
     *   url 如果是网络图片 传url
     * @return {str} 取消/重拍回调
     */
    openPictureBroswer(imgUrl, callback) {
      this.callHandler('openPictureBroswer', imgUrl, response => {
        callback && callback(response)
      })
    }
  }
  JSBridge.init()
  return JSBridge
})

