<template>
	<view class="loading-box"  :style="'height: ' + h + 'px'">
		<view class="loading"></view>
	</view>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
		h:0
	};
  },
  created() {
	  var that = this;
	  that.h = that.$.getSystemInfoSync().windowHeight;
  }
};
</script>

<style scoped="true">
	
.loading-box {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

	
.loading {
  position: relative;
  width: 30upx;
  height: 30upx;
  border-radius: 50%;
  background: peachpuff;
  -webkit-animation: loading 1.5s infinite linear;
  animation: loading 1.5s infinite linear;
}
.loading:after {
  content: "";
  position: absolute;
  width: 50upx;
  height: 50upx;
  border-top: 10upx solid coral;
  border-bottom: 10upx solid coral;
  border-left: 10upx solid transparent;
  border-right: 10upx solid transparent;
  border-radius: 50%;
  top: -20upx;
  left: -20upx;
}

@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loading {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
