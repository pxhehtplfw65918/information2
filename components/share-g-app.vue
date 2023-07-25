<template name="share-g-app">
	<view v-if="isShare && shareDataDefault.mode !== 'image'" :class="['', isShare?'':'hide']">
		<view class="shareMsk" @click='cancelShare'></view>
		<image v-if="shareDataDefault.type == 2" class="saveImg" mode="widthFix" :src='shareDataDefault.image'></image>
		<view :class="['sharebox', isShareBox?'bounceInUp animated':'bounceOutDown animated']">
			<view class="sharebox_content">
					<view class="shareboxTitle">分享至</view>
					<view class='shareList g-flex '>
						<!-- #ifdef APP-PLUS-->
							<view class='shareItem g-flex-item'>
								<view class='shareBtn' @tap="appToShare('WXSceneSession')">
									<image :src='wechat' style='width:100upx;height:auto;' mode="widthFix"></image>
									<label>{{__('微信')}}</label>
								</view>
							</view>
							<view class='shareItem g-flex-item'>
								<view class='shareBtn'  @tap="appToShare('WXSenceTimeline')">
									<image :src='pyq' style='width:100upx;height:auto;' mode="widthFix"></image>
									<label>{{__('朋友圈')}}</label>
								</view>
							</view>
						<!-- #endif -->
						
						<view class='shareItem g-flex-item'>
							<view class='shareBtn' @tap="copyText">
								<image :src='copyURL' style='width:100upx;height:auto;' mode="widthFix"></image>
								<label>{{__('复制链接')}}</label>
							</view>
						</view>
						<view class='shareItem g-flex-item' v-if="shareDataDefault.type == 2">
							<view class='shareBtn' @tap="saveImg">
								<image :src='saveImage' style='width:100upx;height:auto' mode="widthFix"></image>
								<label>{{__('保存图片')}}</label>
							</view>
						</view>
					</view>
			</view>

			<view class='cancelShare' @click='cancelShare'>{{__('取消')}}</view>
		</view>
	</view>
</template>


<script>

	export default {
		name: "share-g-app",
		props: {
			shareDataDefault: {
				type: Object,
				default() {
					return {
						type:0,// 0	图文	weixin、sinaweibo,1	纯文字	weixin、qq,2	纯图片	weixin、qq,5	小程序	weixin
						shareTitle: '',
						shareText: '',
						href: '',
						image: '',
					}
				},
			},
		},
		data(){
			return {
				IsJT:false,
				Path:"",
				isShare:false,
				isShareBox:false,
				wechat: `${getApp().globalData.qnUrl}/zc_images/images/wechat.png`,
				pyq: `${getApp().globalData.qnUrl}/zc_images/images/pyq.png`,
				copyURL: `${getApp().globalData.qnUrl}/zc_images/images/copyURL.png`,
				saveImage: `${getApp().globalData.qnUrl}/zc_images/images/saveImage.png`,
				shareType:0
			}
		},
        methods: {
			appToShare: function(scene,type) {
				  let _type = this.shareDataDefault.type ||   0;
				  if(scene == 'WXSceneSession'){
					  // 分享到聊天界面
					  uni.share({
					  	provider: 'weixin',//分享服务提供商（即weixin|qq|sinaweibo）
					  	scene: scene,//WXSceneSession(分享到聊天界面)、WXSenceTimeline(分享到朋友圈)、WXSceneFavorite(分享到微信收藏)
					  	type: _type,
					  	summary : this.shareDataDefault.shareText, // 分享描述
					  	imageUrl : this.shareDataDefault.image,// ,//分享图片路径(必须是线上可访问图片：http://xxx、https://xxx等)
					  	title : this.shareDataDefault.shareTitle,
					  	href : this.shareDataDefault.href, // //分享跳转地址
					  	success: function(res) {
					  		console.log("success:" + JSON.stringify(res));
					  		
					  	},
					  	fail: function(e) {
					  		uni.showModal({
					  			content: e.errMsg,
					  			// content: '用户取消',
					  			showCancel:false
					  		})
					  	}
					  });
					  
				  }else if(scene == 'WXSenceTimeline'){
					  uni.share({
					  	provider: 'weixin',//分享服务提供商（即weixin|qq|sinaweibo）
					  	scene: scene,//WXSceneSession(分享到聊天界面)、WXSenceTimeline(分享到朋友圈)、WXSceneFavorite(分享到微信收藏)
					  	type: _type,
						title : "【" + this.shareDataDefault.shareTitle + '】'+ this.shareDataDefault.shareText,
					  	summary : this.shareDataDefault.shareText, // 分享描述
					  	imageUrl : this.shareDataDefault.image,// ,//分享图片路径(必须是线上可访问图片：http://xxx、https://xxx等)
					  	href : this.shareDataDefault.href, // //分享跳转地址
					  	success: function(res) {
					  		// console.log("success:" + JSON.stringify(res));
					  		
					  	},
					  	fail: function(e) {
					  		// uni.showModal({
					  		// 	content: e.errMsg,
					  		// 	// content: '用户取消',
					  		// 	showCancel:false
					  		// })
					  	}
					  });
				  }
			     
			},
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
			copyText(){
				console.log("copyText", this.shareDataDefault.href)
				uni.setClipboardData({
				    data:  this.shareDataDefault.href, // e是你要保存的内容
				    success: function () {
					console.log("copyText", '复制成功')
						uni.showToast({
							title:'复制成功',
							icon:'none'
						})
				    },
					fail: function(err) {
					console.log("copyText-复制fail", err)
							// uni.showToast({
							// 	title: err,
							// 	duration: 2000,
							// 	icon: 'none'
							// });
					}
				})
			},
			saveImg: function(e) {
				var that = this;
				that.$.showLoading();
				that.$.downloadFile({
					url:this.shareDataDefault.image,
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


<style lang="scss">
	.shareMsk{
		position: fixed;
		z-index: 999;
	}
	.mp-clean-icon{
		position: absolute;
		right: 8upx;
		top: 8upx;
		color: #999999;
	}
	.sharebox {
		height: auto;
		background-color: transparent;
		z-index: 9999;
	}
	.shareboxTitle{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		text-align: center;
		padding: 15rpx 0;
	}
	.sharebox_content {
		width: 750rpx;
		height: 251rpx;
		background: #F5F5F5;
		border-radius: 16rpx 16rpx 0px 0px;
		overflow: hidden;
	}
	.shareList{
		background: #F5F5F5;
		height: auto;
	}
	.uni-label-pointer{
		 margin-top: 0;
		 font-size: 24rpx;
		 font-family: PingFangSC-Regular, PingFang SC;
		 font-weight: 400;
		 color: #666666;
	 }
	.cancelShare{
		width: 750rpx;
		height: 114rpx;
		line-height: 114rpx;
		background-color: #ffffff;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.saveImg{
		width: 60%;
		height: auto;
		position: absolute;
	    top:var(--status-bar-height);
		left: 50%;
		transform: translateX(-50%);
		}
</style>

