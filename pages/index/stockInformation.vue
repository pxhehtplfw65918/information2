<template>
	<view class="page flex-col">
			<view class="box_1 flex-row">
				<view class="box_2 flex-col">
					
					<view class="informationList" v-for="(item,index) in informationList" :key="index">
						<!-- < -->
						<!-- <a class="text_8" href="#" target="_blank" rel="noopener noreferrer">{{item.title}}</a> -->
						<navigator :url="'/pages/f10/informationDetails?item='+ encodeURIComponent(JSON.stringify(item))">
							<text class="text_8">{{item.title}}</text>
						</navigator>
						<text class="text_9">{{item.updateTime}}</text>
					</view>
			
				</view>
			</view>
	
	</view>
</template>
<script>
	export default {
		data() {
			return {
				constants: {},
				tabCurrentIndex: 1,
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
				informationList: [{
						title: '网传“降薪”风波 银行紧急回应',
						updateTime: '2023-06-06'
					},
					{
						title: '降薪导致员工“堵门”?上海浦发银行:两起独立事件 抗议者系外包公司',
						updateTime: '2023-06-06'
					},
					{
						title: '浦发银行回应员工“降薪”: 网传图片系两起独立事件 相关问题已在解决中浦发银行回应员工“降薪”: 网传图文',
						updateTime: '2023-06-06'
					},
					{
						title: '中央结算公司为浦发银行贸易融资业务提供第三方担保品管理服务',
						updateTime: '2023-06-06'
					}, {
						title: '降薪导致员工“堵门”?上海浦发银行:两起独立事件 抗议者系外包公司',
						updateTime: '2023-06-06'
					}
				]
			};
		},
		methods: {
			tabClick(index) {
				this.tabCurrentIndex = index;

			},
			det() {
				uni.navigateTo({
					url: '/pages/f10/informationDetails'
				});
			}
		},
	};
</script>
<style lang="scss">
	@import '@/styles/f10/common.css';
	@import '@/styles/f10/stockInformation.scss';
</style>