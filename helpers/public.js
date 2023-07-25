    import { mapState, mapMutations } from 'vuex';
	
export default {
	  computed: {
	    ...mapState(['Config',']),
	  },
};
	// 获取微信签名 getSignature
    export function getSignature() {
      const that = this;
      let _href = encodeURIComponent(location.href.split('#')[0]);
      const params = {
        url: encodeURIComponent(_href), // url
        // url: 'https://shop-qa.zcskjy.com/h5/', // url
      };
      console.log('getSignature-params', params);
      console.log('getSignature-url', that.Config.URL.WXSignature);
      uni.request({
        url: that.Config.URL.WXSignature,
        method: 'get',
        data: params,
        dataType: 'json',
        success: (res) => {
          const data = res.data;
          console.log('getSignature-data', data);
          let result = res.data.result;
          // console.log('getSignature-complete-res', result);
        },
        fail: () => {},
        complete: (res) => {
          let result = res.data?.result;
          console.log('getSignature-complete-res', result);
          let jweixin_data = {
            // appId: 'wx1935506901780516', // 小程序的唯一标识
            appId: 'wxd74f2b85b1b724a7', // 必填，公众号的唯一标识
            timestamp: result?.timestamp, // 必填，生成签名的时间戳
            nonceStr: result?.nonceStr, // 必填，生成签名的随机串
            signature: result?.signature, // 必填，签名，见附录1
          };
          console.log('getSignature-complete-res', result);
          that.getConfig(jweixin_data);
        },
      });
    };