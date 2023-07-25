<template>
<view class="page">
	<status-bar></status-bar>
	<block>
		<scroll-view scroll-y="true" v-if="(Info.length>0)"  @scrolltolower="scrollbottom" :style="'width:100%;height:' + (windowHeight) + 'px'">
			<navigator :url="'/pagesub/article/detail?id=' + (items.article_id)" class="m-activity-item" v-for="(items, index) in Info"  :key="index">
				<image lazy-load :src="(items.article_image)" mode="aspectFill" class="m-activity-img" />
				<view class="m-activity-info">
					<view class="m-activity-name" style="word-wrap:break-word;">{{items.article_title}}</view>
					<view class="m-activity-time">{{sprintf(__('发布时间：%s'), items.article_add_time)}}</view>
				</view>
			</navigator>
			<view class="m-loading-box">
				<block v-if="(ispage)">
					<view class="u-loadmore">
						<label class="u-loading"></label>
						<text class="u-loadmore-tips">{{__('正在加载')}}</text>
					</view>
				</block>
				<block v-else>
					<view class="u-loadmore u-loadmore-line">
						<text class="u-loadmore-tips">{{__('没有更多数据啦！')}}</text>
					</view>
				</block>
			</view>
		</scroll-view>
		<view class="m-nullcontent" v-else>
			<view class="m-nullpage-middle">
				<label class="iconfont icon-meiyougengduo"></label>
				<view class="m-null-tip">
					<text>{{__('亲~什么都没有')}}</text>
				</view>
			</view>
		</view>
	</block>
</view>
</template>

<script>
    import $ from "../../helpers/util";
    import statusBar from '../../components/status-bar.vue'

	import {
		mapState,
		mapMutations
	} from 'vuex'

    export default {
        data: function(){
            return {
                page: 1, rows: 10, ispage: !1, flag: !0, Info: [], windowHeight: 0, categoryId: 0, Title: ""
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

            this.setData({categoryId: options.cid});
            try
            {
                var t = $.getSystemInfoSync();
                this.setData({windowHeight: t.windowHeight})
            } catch (n)
            {
                //console.log(" Do something when catch error")
            }

            this.getArticleList();
            this.getArticleCategory();

        },

		methods:{
			...mapMutations(['login', 'logout', 'getPlantformInfo', 'forceUserInfo', 'getUserInfo']),
            getArticleCategory: function () {
                if (this.categoryId)
                {
                    var params = {categoryId: this.categoryId || 0},
                        that = this;

                    $.request({
                        url: this.Config.URL.cms.category,
                        data: params,
                        dataType: 'json',
                        ajaxCache: {
                            timeout: this.Config.CACHE_EXPIRE
                        },
                        success: function (data, status, msg, code) {
                            that.setData({Title: data.items[0]})
                            $.setNavigationBarTitle({title: that.Title.category_name || "企业资讯"})
                        }
                    });
                }
                else
                {
                    $.setNavigationBarTitle({title: "企业资讯"})
                }
            },

            getArticleList: function () {
                var params = {
                        // 暂时放平台咨询
                        //store_id: this.shopInfo.store_id,
                        page: this.page,
                        rows: 10,
                        sidx: 'article_id',
                        sord: 'DESC',
                        categoryId: this.categoryId || 0
                    },
                    that = this;
                $.request({
                    url: this.Config.URL.cms.lists,
                    data: params,
                    dataType: 'json',
                    ajaxCache: {
                        timeout: this.Config.CACHE_EXPIRE
                    },
                    success: function (data, status, msg, code) {
                        if (status == 200) {
                            that.setData({isdata: !0});
                            if (data.page >= data.total) {
                                that.setData({
                                    flag: !1,
                                    ispage: !1,
                                    Info: that.Info.concat(data.items)
                                })
                            } else {
                                that.setData({
                                    flag: !0,
                                    ispage: !0,
                                    Info: that.Info.concat(data.items)
                                })
                            }

                        } else {
                            that.setData({flag: !1, ispage: !1});
                        }
                    }
                });
                /* $.xsr($.makeUrl(activityapi.getArticleList, e), function (e) {
                     $.isNull(e.Info), !$.isNull(e.Info) && e.Code == 0 ? (e.Info.length < 10 && t.setData({flag: !1}), t.setData({
                         ispage: !0,
                         Info: t.Info.concat(e.Info)
                     })) : t.setData({flag: !1, ispage: !0})
                 })*/
            },
            scrollbottom: function () {
                if (this.flag)
                {
                    var e = this;
                    e.setData({flag:!1}),clearTimeout(t);
                    var t = setTimeout(function () {
                        e.setData({page: e.page + 1,flag:!1}), e.getArticleList();
                    }, 500)
                }
            }
		}

    }

</script>



<style lang="scss">
	@import "../../styles/_variables";

	.m-activity-item{width: 100%;height: 240upx;margin-bottom: 10upx;background: white;}
	.m-activity-img{padding: 20upx;width: 260upx;height: 200upx;float: left;}
	.m-activity-info{width: 450upx;height:100%;float: left;padding: 20upx;box-sizing: border-box;display: flex;flex-flow: column;justify-content: space-between}
	.m-activity-name{font-size: 16px;margin-bottom: 40upx;margin-top:10upx;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;}
	.gray{font-size: 35upx;display: inline-block;color: #888;}
	.m-activity-time{margin-left: 10upx;margin-right: 30upx;font-size: 26upx;color: #888;}

</style>

