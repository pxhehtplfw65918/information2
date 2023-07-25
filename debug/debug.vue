<template>
  <view class="debug-content">
    <view class="inputUrl__content">
      <u--input placeholder="http://ip:8082/" border="surround" v-model="inputUrl" @change="change" @confirm="searchStart()"></u--input>
    </view>
    <view class="button-list">
      <u-button text="H5" size="normal" type="success" @click="openWebview(H5,webview)"></u-button>
      <!--      <u-button text="获取全部系统信息" size="normal" type="success" @click="showSystem"></u-button> -->
    </view>
    <view class="switch-content">
      <view class="switch-child">
        <view class="">是否显示系统信息：</view>
        <u-switch v-model="iSystemInfo"></u-switch>
      </view>
    </view>
    <view v-if="iSystemInfo">
      <view class="">系统信息:</view>
      <view class="" v-for="(val, key, i) in systemInfo" :key="i">
        <text>{{ key }}:</text>
        <text>{{ val }}</text>
      </view>
	  	  <view class="">{{systemInfo}}</view>
    </view>
  </view>
</template>
<script>
	// import countdown from '../../components/home/countdown.vue';
	import { mapState, mapMutations } from 'vuex';
export default {
  props: {
    isWithdrawal: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed: {
    ...mapState(['Config', 'StateCode', 'notice', 'plantformInfo', 'shopInfo', 'userInfo', 'hasLogin', 'newMsgNum', 'Lang']),
    scrollHeight: function () {
      let sys = uni.getSystemInfoSync();
      let winWidth = sys.windowWidth;
      let winrate = 750 / winWidth;
      let winHeight = parseInt(sys.windowHeight * winrate);
      return winHeight;
    },
  },
  watch: {
    iSystemInfo(newValue, oldValue) {
      console.log('v-model', newValue);
    },
  },
  data() {
    return {
      inputUrl: '',
      H5: 'https://p.shopsuite.cn/zhongcaiedu/html/#/pages/index/index',
      systemInfo: {},
      iSystemInfo: false,
    };
  },
  onLoad() {
    this.getSystem();
  },
  onUnload() {},
  methods: {
    showSystem() {
      this.iSystemInfo = true;
    },
    getSystem() {
		let that = this;
      uni.getSystemInfo({
        success(res) {
		  // alert(JSON.stringify(res));
          console.log("系统信息:",res);
          that.systemInfo = res;
          console.log(res.brand); //手机牌子
          console.log(res.model); //手机型号
          console.log(res.screenWidth); //屏幕宽度
          console.log(res.screenHeight); //屏幕高度
        },
      });
    },
    searchStart() {
      let _this = this;
      console.log('触发搜索', _this.inputUrl);
	  // window.open(this.inputUrl, '_blank');
      this.openWebview(_this.inputUrl);
    },
	webview_live(urls) {
	   // console.log('openWebview-hasLogin', this.hasLogin);
	  // if (!this.hasLogin) {
	  //   uni.showToast({
	  //     icon: 'none',
	  //     title: '请登录后再试',
	  //   });
	  //   return;
	  // }
	  // #ifdef H5
	  var e_uid = uni.getStorageSync('e_uid');
	  uni.request({
	    method: 'POST',
	    url: this.Config.xeLogin,
	    data: {
	      user_id: e_uid,
	      redirect_uri: urls,
	      login_type: 2,
	    },
	    success: function (data, status) {
	      uni.showToast({
	        icon: 'none',
	        title: data,
	      });
	      if (data.data.code == '0') {
	        const target = data.data.result.login_url;
	        window.location.href = target;
	      } else {
	        window.location.href = urls;
	      }
	      // // #ifdef APP-PLUS
	      // plus.runtime.openURL(target) //这里默认使用外部浏览器打开而不是内部web-view组件打开
	      // // #endif
	    },
	  });
	  // #endif
	
	  //#ifdef APP-PLUS
	  var e_uid = uni.getStorageSync('e_uid');
	  uni.request({
	    method: 'POST',
	    url: this.Config.xeLogin,
	    data: {
	      user_id: e_uid,
	      redirect_uri: urls,
	      login_type: 2,
	    },
	    success: function (data, status) {
	      if (data.data.code == '0') {
	        const target = data.data.result.login_url;
	        uni.navigateTo({
	          url: `/my/webview/webview_live?url=${target}`,
	        });
	      } else {
	        uni.navigateTo({
	          url: `/my/webview/webview_live?url=${urls}`,
	        });
	      }
	    },
	  });
	  // #endif
	},
	openWebview(urls,path) {
	  //  console.log('openWebview-hasLogin', this.hasLogin);
	  // if (!this.hasLogin) {
	  //   uni.showToast({
	  //     icon: 'none',
	  //     title: '请登录后再试',
	  //   });
	  //   return;
	  // }
	  // #ifdef H5
	  var e_uid = uni.getStorageSync('e_uid');
	  uni.request({
	    method: 'POST',
	    url: this.Config.xeLogin,
	    data: {
	      user_id: e_uid,
	      redirect_uri: urls,
	      login_type: 2,
	    },
	    success: function (data, status) {
	      uni.showToast({
	        icon: 'none',
	        title: data,
	      });
	      if (data.data.code == '0') {
	        const target = data.data.result.login_url;
	        window.location.href = target;
	      } else {
	        window.location.href = urls;
	      }
	      // // #ifdef APP-PLUS
	      // plus.runtime.openURL(target) //这里默认使用外部浏览器打开而不是内部web-view组件打开
	      // // #endif
	    },
	  });
	  // #endif
	
	  //#ifdef APP-PLUS
	  var e_uid = uni.getStorageSync('e_uid');
	  uni.request({
	    method: 'POST',
	    url: this.Config.xeLogin,
	    data: {
	      user_id: e_uid,
	      redirect_uri: urls,
	      login_type: 2,
	    },
	    success: function (data, status) {
	      if (data.data.code == '0') {
	        const target = data.data.result.login_url;
	        uni.navigateTo({
	          url: `/my/webview/webview?url=${target}`,
	        });
	      } else {
	        uni.navigateTo({
	          url: `/my/webview/webview?url=${urls}`,
	        });
	      }
	    },
	  });
	  // #endif
	},
  },
};
</script>

<style lang="scss">
.debug-content {
  width: 90%;
  margin: 0 auto;
}
.inputUrl__content {
  width: 100%;
  height: 60rpx;
  background: #f7f8fb;
  border-radius: 33rpx;
  margin: 0 auto;
}
.switch-content {
  .switch-child {
    display: flex;
    align-content: center;
    justify-content: flex-start;
  }
}
.button-list {
  margin-bottom: 20rpx;
  /deep/.u-button {
    margin-top: 20rpx;
  }
}
</style>
