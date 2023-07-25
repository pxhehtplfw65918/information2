<template>
  <view class="nav-box">
    <view :style="{ height: statusBarHeight + 'px' }"></view>
    <view class="navbar" :style="{ paddingTop: navBarHeight + 'px' }">
      <view class="back" v-if="withBack" @tap="back">
        <image :src="iconBack" class="back-icon"></image>
      </view>
      <view v-else></view>
      <view class="title">{{ title }}</view>
      <slot name="right"></slot>
    </view>
  </view>
  <!-- <view :style="{ height: statusBarHeight + 'px' }"></view> -->
</template>

<script>
export default {
  components: {},
  props: {
    title: String,
    withBack: Boolean,
    iconBack: {
      type: String,
      default() {
        return 'https://qnsp.zcskjy.com/zc_images/images/backback.png';
      },
    },
  },
  data() {
    return {
      statusBarHeight: 0,
      navBarHeight: 0,
    };
  },
  onLoad() {},
  onUnload() {},
  methods: {
    init() {
      // 获取手机系统信息
      const info = uni.getSystemInfoSync();
      // 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）
      this.statusBarHeight = info.statusBarHeight;
      // 除了h5 app mp-alipay的情况下执行
      // #ifndef H5 || APP-PLUS || MP-ALIPAY
      // 获取胶囊的位置
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
      // (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
      this.navBarHeight = menuButtonInfo.bottom - info.statusBarHeight + (menuButtonInfo.top - info.statusBarHeight);

      // #endif
    },
    back() {
      this.$emit('backPage');
    },
  },
};
</script>

<style lang="scss">
.back {
  .back-icon {
    width: 30rpx;
    height: 30rpx;
  }
}
.navbar{
	text-align: center;
}
.back-icon {
	margin-left: 36rpx;
}

.navbar {
	width: 750rpx;
	height: 100%;
	display: flex;
	align-items: center;
	justify-items: flex-start;
}
</style>
