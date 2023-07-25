<template name="share-box-mp">
	<view :class="['shareMsk', isShare?'':'hide']">
		<view :class="['sharebox', isShareBox?'bounceInUp animated':'bounceOutDown animated']">
			<view class='shareList g-flex '>
                <!-- #ifdef MP-WEIXIN -->
				<view class='shareItem g-flex-item'>
					<view class='shareBtn'>
						<button open-type="share" style='line-height:0' hover-class="none">
							<image src='https://static.shopsuite.cn/xcxfile/appicon/images/friend.png' style='width:100upx;height:100upx;margin-bottom:6upx'></image>
						</button>
						<label>{{__('分享给朋友')}}</label>
					</view>
				</view>
                <!-- #endif -->
				<view class='shareItem g-flex-item'>
					<view class='shareBtn' @click='shareQRCode'>
						<image src='https://static.shopsuite.cn/xcxfile/appicon/images/allfriend.png' style='width:100upx;height:100upx'></image>
						<label>{{__('生成海报')}}</label>
					</view>
				</view>
			</view>
			<view class='cancelShare' @click='cancelShare'>{{__('取消')}}</view>
		</view>
		<view :class="['shareCodeImg', IsJT?'':'hide']">
			<uni-icons  class="uni-icon uni-icon-clear mp-clean-icon hide"  type="clear" size="20" @click='cancelShare' v-if="false"/>
			<view class="uni-icon uni-icon-clear mp-clean-icon" @click='cancelShare'></view>
			<view  @click='showCodeImg'>
				<image mode="widthFix" :src='Path'></image>
			</view>
			<label>{{__('保存至相册 生成海报')}}</label>
			<button type="primary" size="mini" @click="saveImg">{{__('保存图片')}}</button>
		</view>
	</view>
</template>


<script>

	export default {
		name: "share-box-mp",
		props: {
			shareDataDefault: {
				type: Object,
				default() {
					return {
						shareTitle: '',
						shareText: '',
						href: '',
						image: '',
						price: 0
					}
				},
			},
		},
		data(){
			return {
				IsJT:false,
				Path:"",
				isShare:false,
				isShareBox:false
			}
		},
        methods: {
			cancel() {
				this.isShareBox = false;
				this.isShare = false;
				this.$emit('onCancel');
			},
			show() {
				this.isShareBox = true;
				this.isShare = true;
			},

			cancelShare: function() {
				this.isShareBox = false;
				this.isShare = false;
				this.IsJT = false;

				this.$emit('cancelShare')
			},
			shareQRCode: function(e) {
				var that = this;
				var params = {
							MainPrice: this.shareDataDefault.price,

							summary : this.shareDataDefault.shareText,
							MainImg : this.shareDataDefault.image,
							MainTitle : this.shareDataDefault.shareTitle,
							Path : this.shareDataDefault.href,
							source_from: 'wxminiapp',

							poster_name:this.shareDataDefault.shareText,
							path : this.shareDataDefault.href,
						};

                let url = that.cf.URL.wx.getMiniAppQRCodeUnlimitPoster;

                if (this.shareDataDefault.price > 0)
                {
					// #ifdef H5
					url = that.cf.URL.fx.poster;
					params['poster_type'] = 1;
					// #endif
					// #ifdef MP-WEIXIN
					params['poster_type'] = 2
					// #endif
					// #ifdef APP-PLUS
					params['poster_type'] = 1
					// #endif
                }
                else
                {
                    url = that.cf.URL.fx.poster;

                    // #ifdef H5
                    params['poster_type'] = 1;
                    // #endif
                    // #ifdef MP-WEIXIN
                    params['poster_type'] = 2
                    // #endif
                    // #ifdef APP-PLUS
                    params['poster_type'] = 1
                    // #endif
                }

				//生成二维码并返回地址。 - 需要修改调整为小程序地址
				that.$.request({
					url: url,
					data: params,
					success: function(data, status, msg, code) {
						that.setData({
							Path: data.url || data.poster_url,
							isShare: !0,
							isShareBox: !1,
							IsJT: !0
						})
					}
				});

				this.$emit('shareQRCode')
			},
			saveImg: function(e) {
				var that = this;
				that.$.showLoading();
				that.$.downloadFile({
					url: that.Path,
					success: function(t) {
						that.$.hideLoading();
						that.$.saveImageToPhotosAlbum({
							filePath: t.tempFilePath,
							success: function() {
								that.setData({
									Path: "",
									isShare: !1,
									isShareBox: !1,
									IsJT: !1
								}), that.$.alert("保存图片成功！")
							},
							fail: function(e) {
								that.$.hideLoading()
							}
						})
					},
					fail: function(e) {
						that.$.hideLoading()
					}
				})

				that.$.hideLoading()

				this.$emit('saveImg')
			},
			showCodeImg: function() {
				let that = this;
				that.$.previewImage({
					current: that.Path,
					urls: [that.Path]
				})

				this.$emit('showCodeImg')
			}
        }
	}
</script>


<style>
	.mp-clean-icon{
		position: absolute;
		right: 8upx;
		top: 8upx;
		color: #999999;
	}
</style>

