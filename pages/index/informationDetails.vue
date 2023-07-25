<template>
	<view class="page flex-col">
		<view class="block_1 flex-col">
			<u-navbar @leftClick="navBack" :is-fixed="true" title="资讯详情" rightIcon='' :border-bottom="false">
			</u-navbar>
		</view>
		<scroll-view class="articleDetail-scroll" :style="{ height: scrollHeight + 'rpx' }" scroll-y="true">
				
				<view class="block_4 flex-col">
					<text class="text_3">
						降薪导致员工“堵门”?上海浦发银行:两起独立事件&nbsp;抗议者系外包公司
					</text>
					<view class="section_1 flex-row">
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
				</view>
		</scroll-view>

	</view>
</template>
<script>
	export default {
		computed: {
			scrollHeight: function() {
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750 / winWidth;
				let winHeight = parseInt(sys.windowHeight * winrate);
				return winHeight;
			},
		},
		data() {
			return {
				constants: {},
			};
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
		},
	};
</script>
<style lang="scss">
	@import '@/styles/f10/common.css';
	@import '@/styles/f10/informationDetails.scss';
	@import '@/styles/new_nav.scss';
</style>