<template>
	<view class="page flex-col">
		<view class="box_1 flex-col">
			<u-navbar @leftClick="navBack" :is-fixed="true" title="资讯详情" rightIcon='share-square'
				@rightClick="onShareBox" :border-bottom="false"> </u-navbar>
			<text class="text_3">
				降薪导致员工“堵门”?上海浦发银行:两起独立事件&nbsp;抗议者系外包公司
			</text>
			<view class="group_6 flex-row">
				<text class="text_4">海报新闻</text>
				<text class="text_5">05-11&nbsp;23:01</text>
				<view class="text-wrapper_1 flex-col">
					<text class="text_6">3评论</text>
				</view>
			</view>
			<image class="image_3" referrerpolicy="no-referrer"
				src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6b3d9b3cc6efcd234194015bf4868c3de4a8380b2fcc5c714fe39a34c451c1fe" />
			<text class="text_7">股票开户超简单，新客专享多重福利&gt;&gt;</text>
			<view class="text-wrapper_2">
				<text class="text_8">5月11日，网传上海</text>
				<text class="text_9">浦发银行</text>
				<text class="text_10">
					员工因降薪引发不满，集体到浦发大厦“静坐”抗议。浦发银行方面回应，网传降薪图片与集体抗议图片属两起独立事件，目前正在核实具体情况，沟通解决中。
				</text>
			</view>
			<text class="text_11">
				针对降薪图片事件，浦发银行方面表示，该子公司一员工薪酬下调是因其本人业绩考核不佳所致，经沟通，目前该员工已对上述调整表示理解。知情人士透露，浦发银行目前内部已经整体降薪两轮，高管则是年年在降。
			</text>
			<text class="text_12">
				公开资料显示，在同行平均薪酬增长的背景下，浦发银行2022年人均薪酬小幅下降由2021年的45.88万元降至2022年的45.46万元。2022年，行长及多数副行长薪酬有所下降。同时，该行2022年应付职工薪酬为126.72亿元，较2021年下降14.75%
			</text>
			<text class="text_13">文章来源:&nbsp;海报新闻</text>
			<text class="text_14">
				原标题:&nbsp;降薪导致员工“堵门”?上海浦发银行:两起独立事件&nbsp;抗议者系外包公司
			</text>
			<view class="group_7 flex-row justify-between">
				<text class="text_15">分享至：</text>
				<view class="list_2 flex-row">
					<view class="image-text_1 flex-row justify-between" v-for="(item, index) in loopData0" :key="index">
						<image class="label_4" referrerpolicy="no-referrer" :src="item.lanhuimage0" />
						<text class="text-group_1" v-html="item.lanhutext0"></text>
					</view>
				</view>
			</view>
			<view class="text-wrapper_3">
				<text class="text_16">郑重声明:</text>
				<text class="text_17">
					&nbsp;好人好股发布此内容旨在传播更多信息，与本站立场无关，不构成投资建议。据此操作，风险自担
				</text>
			</view>
			<view class="block_4 flex-col"></view>
		</view>
		<view class="box_2 flex-col">
			<view class="box_6 flex-row">
				<text class="text_18">全部评论</text>
				<text class="text_19">（3）</text>
				<view class="image-text_5 flex-row justify-between">
					<text class="text-group_2">最新</text>
					<image class="thumbnail_1" referrerpolicy="no-referrer"
						src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngaaa6f628aa9106d7934180e8f1046ee5317893bdd5f74613a251a20b036f8b3d" />
				</view>
			</view>
			<view class="box_7 flex-row justify-between">
				<view class="image-text_6 flex-row justify-between">
					<view class="box_3 flex-col"></view>
					<view class="text-group_5 flex-col">
						<text class="text_20">长线为王共同成长</text>
						<text class="text_21">今天涨不涨?</text>
						<text class="text_22">来自:重庆</text>
					</view>
				</view>
				<image class="image_4" referrerpolicy="no-referrer"
					src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng7b82d0c217c3c41dd8a3b26ba7b4ca16c47796a15a74beed258cfe04f16880c6" />
			</view>
			<view class="box_8 flex-row">
				<text class="text_23">05-12&nbsp;07:18</text>
				<view class="text-wrapper_4 flex-col">
					<text class="text_24">回复</text>
				</view>
				<image class="label_5" referrerpolicy="no-referrer"
					src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng7b9ef1d603819ebd305fcc20694cee2b3a4695f67670582e4eb185a675f3dd2f" />
				<text class="text_25">15</text>
				<image class="label_6" referrerpolicy="no-referrer"
					src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc5cde5482954226f12fb7ffe518330cc432df8197a4884f6cb50cb8c57bbb120" />
				<text class="text_26">21</text>
			</view>
			<view class="box_9 flex-row justify-between">
				<view class="image-text_7 flex-row justify-between">
					<view class="group_3 flex-col"></view>
					<view class="text-group_6 flex-col">
						<text class="text_27">老农割</text>
						<text class="text_28">好银行，为股东利益着想.</text>
						<text class="text_29">来自:广东</text>
					</view>
				</view>
				<image class="image_5" referrerpolicy="no-referrer"
					src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng7b82d0c217c3c41dd8a3b26ba7b4ca16c47796a15a74beed258cfe04f16880c6" />
			</view>
			<view class="box_10 flex-row">
				<text class="text_30">05-12&nbsp;07:18</text>
				<view class="text-wrapper_5 flex-col">
					<text class="text_31">回复</text>
				</view>
				<image class="label_7" referrerpolicy="no-referrer"
					src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng7b9ef1d603819ebd305fcc20694cee2b3a4695f67670582e4eb185a675f3dd2f" />
				<text class="text_32">15</text>
				<image class="label_8" referrerpolicy="no-referrer"
					src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc5cde5482954226f12fb7ffe518330cc432df8197a4884f6cb50cb8c57bbb120" />
				<text class="text_33">21</text>
			</view>
			<view class="block_10 flex-col">
				<view class="text-wrapper_6">
					<text class="text_34">长坡厚雪价值投资&nbsp;:</text>
					<text class="text_35">
						&nbsp;比民生银行好，民生业绩烂，高管收入高
					</text>
				</view>
			</view>
			<text class="text_36">暂无更多评论，欢迎发表观点</text>
		</view>
		<view class="text-wrapper_9 flex-col">
			<text class="text_37">
				声明:&nbsp;用户在社区发表的所有资料、言论等仅代表其个人观点与好人好股的立场无关。据此操作，风险自担。
			</text>
			<text class="text_38">《好人好股社区管理规定》</text>
		</view>
		<view class="box_4 flex-col">
			<view class="box_5 flex-row justify-between">
				<view class="text-wrapper_8 flex-col">
					<text class="text_39">我也来说一句…</text>
				</view>
				<image class="label_9" referrerpolicy="no-referrer"
					src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng05ef97ac9f62b937a9a493f7bd78d78bc1af4e70669a4db58d6f22650031c363" />
			</view>
			<image class="image_6" referrerpolicy="no-referrer"
				src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngc8ecaa274fb4b311e2f628873bfc885dc01fd40225f92c14b64dbd8a9eaea1da" />
		</view>
		<shareGApp :shareDataDefault="shareData" ref="shareGApp"></shareGApp>
	</view>
</template>
<script>
	import { mapState } from 'vuex';
	import shareGApp from '@/components/share-g-app.vue';
	export default {
		components: {
			shareGApp
		},
		data() {
			return {
				loopData0: [{
						lanhuimage0: 'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng3ebc5978c20d767e443048bdb4ff90a8ffcf5c2d6f79a43e0bfadffcb04e26c3',
						lanhutext0: '微信',
					},
					{
						lanhuimage0: 'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngcdd1372e33c8869f7908d87a841bf63838db58dab029eb915fa286501fa5daee',
						lanhutext0: '朋友圈',
					},
					{
						lanhuimage0: 'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngeddc1943f6a68567ee5cbc537433ab04eef6e90d466ee4c2f39f00e5a1faf811',
						lanhutext0: '微博',
					},
				],
				constants: {},
				shareData:{},
				shareLogo: `https://f.integrity.com.cn/tj/uploads/20230524/25c1fba0fe922ea43196e20df9ca94f9.png`,
			};
		},
		computed:{
			...mapState(['Config','userInfo']),
		},
		methods: {
			navBack() {
				//  #ifdef  APP-PLUS
				uni.navigateBack();
				//  #endif

				//  #ifdef  H5
				history.back();
				//  #endif
			},
			onShareBox() {
				this.initShareData();
				// #ifndef MP-WEIXIN
				this.$refs.shareGApp.show();
				// #endif
			},
			initShareData() {
				let that = this;

				let $href = that.$.sprintf('%s/html/#/pages/f10/informationDetails?', that.Config.SiteUrl, that.userInfo
					.user_id, '&showOpenApp=true');

				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				// #ifdef APP-PLUS
				$href = that.$.sprintf('%s/html/#/pages/f10/informationDetails?', that.Config.SiteUrl, that.userInfo.user_id,
					'&showOpenApp=true');
				// #endif
				// #ifdef MP-WEIXIN
				$href = '/html/#/pages/f10/informationDetails?';
				// #endif

				that.setData({
					shareData: {
						shareTitle: '资讯详情',
						shareText: '资讯详情',
						href: $href + 'item_id=' + that.item_id + '&product_id=' + that.product_id,
						image: that.shareLogo,
					},
				});
				console.log('分享入参：', that.shareData.href);
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
			},
		},
	};
</script>
<style>
	@import '@/styles/f10/common.css';
	@import '@/styles/f10/informationDetails.scss';
	@import '@/styles/new_nav.scss';
</style>