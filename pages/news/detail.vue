<template>
<view class="page">
	<view v-if="(flag)">
		<view class="header">{{Info.article_title}}</view>
		<view class="time">{{sprintf(__('发布时间：%s'), Info.article_add_time)}}</view>
		<view class="center">
		</view>
	</view>
	<view class="m-nullcontent" v-if="(!flag)">
		<view class="m-nullpage-middle">
			<label class="iconfont icon-meiyougengduo"></label>
			<view class="m-null-tip">
				<text>{{__('亲~什么都没有')}}</text>
				<text>{{__('到别处看看吧~~')}}</text>
			</view>
		</view>
	</view>

	<view class="u-tap-btn">
		<button  open-type="share" class="u-go-home" style="position: relative;width:84upx;height:84upx;box-shadow:0px 0upx 0upx;">
			<view class="iconfont icon-share" style="position: absolute;left: 19upx;"></view>
		</button>
		<navigator url="/pages/index/index" open-type="switchTab" class="u-go-home" style="box-shadow:0px 0upx 0upx;">
			<view class="iconfont icon-shouyeshouye" style="font-size:50upx;"></view>
		</navigator>
	</view>


</view>
</template>


<style lang="scss">
	@import "../../styles/_variables";

	.header{
		padding: 20upx;
		font-size: 32upx;
		font-weight: bold
	}
	.time{
		padding: 0 20upx 20upx;
		color: #717171;
		font-size: 28upx;
	}
	.center{
		padding: 0 20upx;
		word-wrap:break-word;
	}
	.center .wxParse-p image{
		max-width: 710upx !important
	}
	.u-tap-btn{position: fixed;right: 20upx;bottom: 90upx;}
	.u-go-home{border-radius: 100%;width: 80upx;height: 80upx;border: 1px solid #eee;font-size: 20upx;text-align: center;background-color: #fff;box-shadow: 0px 4upx 8upx;z-index: 2;line-height:80upx; margin-bottom: 20upx;}
	.u-go-home .iconfont{font-size: 36upx;}

</style>

<script>


    import $ from "../../helpers/util";
    import statusBar from '../../components/status-bar.vue'

	import {
		mapState,
		mapMutations
	} from 'vuex'

    export default {
        data: function(){
            return {Info: [], Id: 0, flag: !0, activitydetail: [], isBasics: !0
            }
        },
		computed: mapState(['Config', 'StateCode', 'notice', 'plantformInfo', 'shopInfo', 'userInfo', 'hasLogin']),
        components: {
            statusBar
        },
        onLoad(options) {
			uni.setNavigationBarTitle({
				title:this.__('')
			});

            var t = this;
            this.setData({Id: options.id}), $.isNull(this.userInfo) ? this.getUserInfo(function (user) {
                    if (user)
                    {
                        t.GetNewsletter()
                    }
                },
                options.uid) : this.GetNewsletter();
            var n = this.shopInfo.VendorFeatureSet;
            n.indexOf("Share") > -1 ? this.setData({isBasics: !0}) : this.setData({isBasics: !1})
        },

        onShareAppMessage: function () {
			// #ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			});
			// #endif

            return {
                title: this.Info.Title,
                path: "/pagesub/article/detail?id=" + this.Id + "&uid=" + this.userInfo.user_id
            }
        },
		/**
		 * 用户点击右上角分享朋友圈
		 */
		onShareTimeline: function () {
			return {
				title: this.Info.Title,
				query: {
					uid: this.userInfo.user_id,
					id: this.Id
				}
			}
		},

		methods:{
			...mapMutations(['login', 'logout', 'getPlantformInfo', 'forceUserInfo', 'getUserInfo']),
            GetNewsletter: function () {
                var params = {article_id: this.Id},
                    that = this;
                $.request({
                    url: this.Config.URL.cms.get,
                    data: params,
                    dataType: 'json',
                    ajaxCache: {
                        timeout: this.Config.CACHE_EXPIRE
                    },
                    success: function (data, status, msg, code) {
                        if (status == 200) {
                            if (data) {
                                that.setData({Info: data});
                                if (!that.Content) {
                                    var n = that.Info.article_content;
                                    n = n.replace(/&amp;nbsp;/g, ""), WxParse.wxParse("article_content", "html", n, that)
                                }
                            } else that.setData({flag: !1});
                            $.setNavigationBarTitle({title: that.Info.article_title})




							setTimeout(function() {
								//
								let $title = that.title;
								let $desc = '';
								let $link = '';
								let $img_url = that.Info.article_image;

								//初始化微信分享
								that.$.wxShare($title, $desc, $link, $img_url)
							}, 100);
                        }
                    }
                });
            }
		}

    }

</script>
