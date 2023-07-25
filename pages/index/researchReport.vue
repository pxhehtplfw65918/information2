<template>
	<view class="researchReport flex-col">
<!-- 		<scroll-view class="articleDetail-scroll" :style="{ height: scrollHeight + 'rpx' }" scroll-y="true"> -->
			<view class="section_1 flex-row">
				<view class="box_1 flex-col">
					<text class="text_9">评级统计</text>
					<moveTable class="marketScanningTable oneScreen" :tableList="tableList"></moveTable>
					<view class="group_3 flex-col"></view>
					<text class="text_21">盈利预测</text>
					<moveTable class="marketScanningTable" :tableList="tableList2"></moveTable>
					<view class="group_4 flex-col"></view>
					<view class="group_5 flex-row justify-between">
						<text class="text_34">最新研报</text>
						<view class="image-text_1 flex-row justify-between" @click="inDet">
							<text class="text-group_1">研报中心</text>
							<view class="icon-arrow-left"></view>
						</view>
					</view>
					
					<view class="latestReportList">
						<view class="latestReportChild" v-for="(item,index) in latestReportList" :key="index">
						
							<view class="text-wrapper_9 flex-row justify-between">
								<text class="text_35">{{item.securitiesDealer}}</text>
								<text class="text_36">{{item.time}}</text>
							</view>
						
							<text class="text_37">{{item.text}}</text>
						
							<view class="group_6 flex-row justify-between">
								<view class="text-wrapper_10 flex-col">
									<text class="text_38">{{item.iconText}}</text>
								</view>
								<text class="text_39">目标价:{{item.pice}}</text>
							</view>
							<!-- <image class="image_1" referrerpolicy="no-referrer"
								src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngbc1bcdb77c471da514f43da0214ca1a452d2a99e2f53745f893e0e5a71654c2e" />
						 -->
						</view>
					</view>
				</view>

			</view>
<!-- 		</scroll-view> -->

	</view>
</template>
<script>
	import moveTable from '../../components/scrolTable.vue';
	export default {
		components: {
			moveTable,
		},
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
				tableList: {
					theadList: [{
							id: 'timeSlot',
							name: '时间段',
						},
						{
							name: '综合评级',
							id: 'compositeRating',
						},
						{
							name: '买入',
							id: 'buy',
						},
						{
							name: '增持',
							id: 'increaseInHoldings',
						},
						{
							name: '中性',
							id: 'neutral',
						},
						{
							name: '卖出',
							id: 'sell',
						},
						{
							name: '总家数',
							id: 'totalNumber',
						}
					],
					fixedTB: [{
						timeSlot: {
							val: '--',
							val2: '',
							type: 'bold',
							icon: '',
							val2Color: '#333333',
						},

						compositeRating: {
							val: '--',
							type: 'normal',
							fontColor: '#F43D3E',
						},
						buy: {
							val: '--',
							type: 'normal',
							fontColor: '#333333',
						},
						increaseInHoldings: {
							val: '--',
							type: 'normal',
						},
						neutral: {
							val: '--',
							type: 'normal',
						},

						sell: {
							val: '--',
							type: 'normal',
							fontColor: '#333333',
						},
						totalNumber: {
							val: '--',
							type: 'normal',
							fontColor: '#333333',
						},
					}, ],
				},
				tableList2: {
					theadList: [{
							id: 'year',
							name: '年份',
						},
						{
							name: '预测每股收益',
							id: 'PEarningsPerShare',
						},
						{
							name: '预测市盈率',
							id: 'PERatio',
						}
					],
					fixedTB: [{
						year: {
							val: '--',
							val2: '',
							type: 'bold',
							icon: '',
							val2Color: '#333333',
						},

						PEarningsPerShare: {
							val: '--',
							type: 'normal',
							fontColor: '#333333',
						},
						PERatio: {
							val: '--',
							type: 'normal',
							fontColor: '#333333',
						},

					}, ],
				},
				latestReportList: [{
						securitiesDealer: '浙商证券 梁凤洁等',
						time: '2023/07/07',
						text: '浦发银行:调整、筑底中的股份制银行筑底中的股份制银行筑底中的股份制银行筑底中的股份制银行筑底中的股份制银行',
						iconText: '买入',
						pice: '9.06'
					},
					{
						securitiesDealer: '浙商证券 梁凤洁等',
						time: '2023/07/07',
						text: '浦发银行:调整、筑底中的股份制银行',
						iconText: '买入',
						pice: '9.06'
					},
					{
						securitiesDealer: '浙商证券 梁凤洁等',
						time: '2023/07/07',
						text: '浦发银行:调整、筑底中的股份制银行',
						iconText: '推荐',
						pice: '9.06'
					}
				],

				loopData0: [{
						lanhutext0: '综合评级',
						lanhufontColor0: 'rgba(153,153,153,1)',
						specialSlot1: {
							lanhutext0: '增持',
							lanhufontColor0: 'rgba(254,0,0,1)',
						},
						slot1: 1,
					},
					{
						lanhutext0: '买入',
						lanhufontColor0: 'rgba(153,153,153,1)',
						specialSlot1: {
							lanhutext0: '2',
							lanhufontColor0: 'rgba(51,51,51,1)',
						},
						slot1: 1,
					},
					{
						lanhutext0: '增持',
						lanhufontColor0: 'rgba(153,153,153,1)',
						specialSlot1: {
							lanhutext0: '3',
							lanhufontColor0: 'rgba(51,51,51,1)',
						},
						slot1: 1,
					},
					{
						lanhutext0: '中性',
						lanhufontColor0: 'rgba(153,153,153,1)',
						specialSlot1: {
							lanhutext0: '0',
							lanhufontColor0: 'rgba(51,51,51,1)',
						},
						slot1: 1,
					},
					{
						lanhutext0: '卖出',
						lanhufontColor0: 'rgba(153,153,153,1)',
						specialSlot1: {
							lanhutext0: '0',
							lanhufontColor0: 'rgba(51,51,51,1)',
						},
						slot1: 1,
					},
					{
						lanhutext0: '增持',
						lanhufontColor0: 'rgba(254,0,0,1)',
						specialSlot2: {
							lanhutext0: '增持',
							lanhufontColor0: 'rgba(254,0,0,1)',
						},
						slot2: 2,
					},
					{
						lanhutext0: '2',
						lanhufontColor0: 'rgba(51,51,51,1)',
						specialSlot2: {
							lanhutext0: '3',
							lanhufontColor0: 'rgba(51,51,51,1)',
						},
						slot2: 2,
					},
					{
						lanhutext0: '3',
						lanhufontColor0: 'rgba(51,51,51,1)',
						specialSlot2: {
							lanhutext0: '4',
							lanhufontColor0: 'rgba(51,51,51,1)',
						},
						slot2: 2,
					},
					{
						lanhutext0: '0',
						lanhufontColor0: 'rgba(51,51,51,1)',
						specialSlot2: {
							lanhutext0: '0',
							lanhufontColor0: 'rgba(51,51,51,1)',
						},
						slot2: 2,
					},
					{
						lanhutext0: '0',
						lanhufontColor0: 'rgba(51,51,51,1)',
						specialSlot2: {
							lanhutext0: '0',
							lanhufontColor0: 'rgba(51,51,51,1)',
						},
						slot2: 2,
					},
				],
				constants: {},
			};
		},
		methods: {
			inDet() {
				uni.navigateTo({
					url: '/pages/f10/researchReportCenter'
				});
			}
		},
	};
</script>

<style lang="scss">
	@import '@/styles/f10/common.css';
	@import '@/styles/f10/researchReport.scss';
</style>