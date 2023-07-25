<template>
  <view class="no-data">
    <image class="no-data-icon" src="https://qnsp.zcskjy.com/zc_images/findPage/no-data.png" mode=""></image>
    <view>{{noDataText}}</view>
  </view>
</template>

<script>
export default {
  name: 'noData',
  props: {
    noDataText: {
      type: String,
      default: () => {
        return '暂无数据';
      },
    },
  }
}

</script>

<style lang="scss">
.no-data {
  width: 100%;
  height: 100%;
  font-size: 26upx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  text-align: center;
  &-icon {
    width: 300upx;
    height: 224upx;
    margin: 0 auto;
  }
}
</style>
