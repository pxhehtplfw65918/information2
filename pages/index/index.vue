<template>
	<view class="pageIndex flex-col">
		<view class="box_1 flex-row">
			
			<view class="box_2 flex-col">
				<view class="text-wrapper_1 flex-row justify-between">
					<view v-for="(item, index) in navList" :key="index" :class="{ current: tabCurrentIndex === index }"
						@click="tabClick(index)" class="text_1">
						{{ item.text }}
					</view>
				</view>
				<scroll-view class="articleDetail-scroll" :style="{ height: scrollHeight + 'rpx' }" scroll-y="true">
					<stockInformation v-if="tabCurrentIndex == 3" />
					<researchReport v-if="tabCurrentIndex == 5" />
				</scroll-view>
			</view>
<!-- 
			<view class="box_3 flex-row">
				<view class="group_2 flex-col">
					<image class="thumbnail_1" referrerpolicy="no-referrer"
						src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng31ed4b2e7274ba1af523d063fafdced635078453bd1a2db340c4e80d59c1ac51" />
					<view class="text-wrapper_2 flex-row justify-between">
						<text class="text_24">科创50</text>
						<text class="text_25">-0.00%</text>
					</view>
					<text class="text_26">1025.74</text>
				</view>
				<view class="image-text_1 flex-col">
					<image class="label_1" referrerpolicy="no-referrer"
						src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6f8da69151e743aa426d9dc32384b428f5f5637893833a2022eb46c5631d2dad" />
					<text class="text-group_4">下单</text>
				</view>
				<view class="image-text_2 flex-col">
					<image class="label_2" referrerpolicy="no-referrer"
						src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng8d1912d5016618d3d3c5caa951cb3604c3bdc0cf6f47f6117893423ceb91f87f" />
					<text class="text-group_5">盯盘</text>
				</view>
				<view class="image-text_3 flex-col">
					<image class="label_3" referrerpolicy="no-referrer"
						src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPnga141c8ded569f09fadf1e8a47c027b0fe178718d8d24edd6ce91c6b0a7d82777" />
					<text class="text-group_6">加自选</text>
				</view>
				<view class="image-text_4 flex-col">
					<image class="label_4" referrerpolicy="no-referrer"
						src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng8c64e66cef69402c9382129bf84cd5427cfdd6f9a5111d5aa7cf250b60fe81ff" />
					<text class="text-group_7">功能</text>
				</view>
			</view> -->
		</view>


	</view>
</template>
<script>
	import stockInformation from './stockInformation.vue'
	import researchReport from './researchReport.vue'
	export default {
		components: {
			stockInformation,
			researchReport
		},
		computed: {
			scrollHeight: function() {
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750 / winWidth;
				let winHeight = parseInt(sys.windowHeight * winrate);
				return winHeight - this.$FT.pxToRpx(44);
			},
		},
		data() {
			return {
				constants: {},
				tabCurrentIndex: 3,
				navList: [{
						text: '盘口'
					},
					{
						text: '资金'
					},
					{
						text: '股吧'
					},
					{
						text: '资讯'
					},
					{
						text: '公告'
					},
					{
						text: '研报'
					}
				],
			};
		},
		methods: {
			tabClick(index) {
				this.tabCurrentIndex = index;

			}
		},
	};
</script>
<style lang="scss">
	@import '@/styles/f10/common.css';
	@import '@/styles/f10/stockInformation.scss';
</style>