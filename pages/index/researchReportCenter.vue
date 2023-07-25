<template>
	<view class="page flex-col researchReportCenter" :class="{fullMaskOH: isFullMask}">
		<!-- 	<scroll-view class="articleDetail-scroll" :style="{ height: scrollHeight + 'rpx' }" scroll-y="true"> -->
<!-- 		<u-navbar @leftClick="navBack" :is-fixed="true" title="研报中心" rightIcon='' :border-bottom="false"> -->
		</u-navbar>
		<view class="group_2 flex-col">
			<view class="search-box">
		<!-- 		<image class="search-icon" :src="searchIcon" mode="widthFix"></image> -->
				<view class="search-icon"></view>
				<input class="search-input" type="text" value="" placeholder="搜索个股研报/研究机构" />
			</view>
			<scrollTabs :tabs="dataList"
				:tabOptions="{label: 'name', activeColor: '#666666',barWidth:'30',barColor:'#FE0000',activeColor:'#333333'}"
				:offsetTop="60+statusBarHeight" :scrollTop="scrollTop" :sticky="true"
				:itemOffsetTop="105+statusBarHeight" :stickyTop="stickyTop" :clickScroll="clickScroll"
				@onChange="tabChange">

				<view class="container-item" v-for="(item, index) in dataList" :key="index" :class="'tabs'+index">
					<view class="box_3 flex-row justify-between" :class="{box_tab:item.isTab}">
						<view v-if="!item.isTab" class="image-text_2 flex-row justify-between flexCenter">
							<text class="text-group_2">{{item.title}}</text>
							<view class="iconMark"></view>
							<!-- <image @click="markClick" class="label_5" referrerpolicy="no-referrer" :src="mark" /> -->
						</view>

						<view v-if="item.isTab" class="box_13 flex-row">
							<view class="text" v-for="(tabItem, tabIndex) in navList" :key="tabIndex"
								:class="{ current: tabCurrentIndex === tabIndex }" @click="tabClick(tabIndex)">
								{{tabItem.text}}
							</view>
						</view>
						<view class="stockScreening" :class="{ openStockPopup: item.iStockScreenPopup }">
							<view v-if="item.name == '个股' || item.name == '研报'"
								class="image-text_3 flex-row justify-between" @click="stockClick(index)">
								<text class="text-group_3">{{item.stockText}}</text>
								<view class="icon-arrow"></view>
								<!-- <image class="image_4" referrerpolicy="no-referrer" :src="downArrow" /> -->
							</view>
							<view class="stockScreenPopup" v-if="item.iStockScreenPopup">
								<view class="stockChild" v-for="(stockItem, stockIndex) in stockList" :key="stockIndex"
									:class="{ stockCurrent: item.stockIndex === stockIndex }"
									@click="selctStock(index,stockIndex)">
									{{stockItem.text}}
								</view>
							</view>
						</view>

					</view>
					<view class="box_4 flex-row screenList">
						<view class="text-wrapper_3 flex-col" :class="{ timeCurrent: item.timeIndex === index1 }"
							v-for="(item1,index1) in item.screenList" :key="index1">
							<text @click="timeClick(index,index1)" class="text_7">{{item1.key}}</text>
						</view>
					</view>
					<moveTable v-if="!item.isTab" class="marketScanningTable oneScreen" :tableList="item.tableList">
					</moveTable>

					<view v-else v-for="(item,index) in item.tableList" :key="index">
						<view class="text-wrapper_25 flex-row justify-between">
							<text class="text_78">{{item.securitiesDealer}}</text>
							<text class="text_79">{{item.time}}</text>
						</view>
						<view class="text-wrapper_26">
							<view class="title_icon">{{item.titleIcon}}</view>
							<view class="paragraph_1">{{item.text}}</view>
						</view>
						<view class="box_16 flex-row justify-between">
							<view class="group_4 flex-col">{{item.iconText}}</view>
							<text class="text_81">目标价:{{item.pice}}</text>
						</view>
						<view class="line">

						</view>

					</view>

			<!-- 		<view class="line">

					</view> -->
					<view  v-if="item.name != '研报'" class="image-text_4 flex-row justify-between" @click="det(item.name,index)">
						<text class="text-group_7">查看更多</text>
						<view class="icon-arrow-left"></view>
					</view>

				</view>
			</scrollTabs>
		</view>
		<shareGApp :shareDataDefault="shareData" ref="shareGApp"></shareGApp>
		<u-popup class="fullMask" :safeAreaInsetBottom="false" :safeAreaInsetTop="false" :mode="popupData.mode"
			:round="popupData.round" :overlay="popupData.overlay" :borderRadius="popupData.borderRadius"
			:closeOnClickOverlay="popupData.closeOnClickOverlay" :show="isFullMask"  @close="close">
			<view class="fullMask-content">
				<scroll-view scroll-y="true" style="height: 320rpx;">
					<view class="fullMask-text">
						<text>{{fullMaskText}}</text>
					</view>
				</scroll-view>
				<view class="confrim-btn">
					<u-button @click="isFullMask = false;">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import scrollTabs from "@/components/scroll-tabs/scroll-tabs/scroll-tabs.vue";
	import moveTable from '../../components/scrolTable.vue';
	// import shareGApp from '@/components/share-g-app.vue';
	import shareGApp from '@/components/share-g-app.vue';
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
		components: {
			scrollTabs,
			moveTable,
			shareGApp
		},
		data() {
			return {
				constants: {},
				stickyTop: 0,
				offsetTop: 0,
				clickScroll: false,
				statusBarHeight: 0,
				scrollTop: 0,
				id: null,
				tabCurrentIndex: 0,
				timeIndex: 0,
				isFullMask: false,
				fullMaskText: '本模块将所有研报按照不同个股、不同时间区间统计得到对应的研报数量，客观呈现当前个股的受关注程度，但不代表被推荐程度，不构成投资建议，敬请用户注意',
				navList: [{
						text: '个股研报'
					},
					{
						text: '行业研报'
					}
				],

				stockList: [{
						text: 'A股市场'
					},
					{
						text: '港股市场'
					},
					{
						text: '美股市场'
					}
				],
				mark: 'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng615104f9ddb9771b9b4e91bbed2530640f2552b51c55b9e0b5c95f650cbbf741',
				downArrow: 'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngf28a41324e4c156c166f0a077d843ef39c9c979d94e50afcd2b5ee8f5ef8b85e',
				searchIcon: 'https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng702b2e38161631a8b67e798adea0860bd26fb89dc98afe16cc62df19096665b9',
				popupData: {
					overlay: true,
					mode: 'center',
					borderRadius: '20%',
					closeable: true,
					closeOnClickOverlay: true,
				},
				shareData: {},
				shareBlb: `https://f.integrity.com.cn/tj/uploads/20230524/25c1fba0fe922ea43196e20df9ca94f9.png`,
				
				dataList: [{
						name: '个股',
						total: '234',
						scroll_id: 'tabs0',
						title: '个股排行',
						isTab: false,
						timeIndex: 0,
						stockIndex: 0,
						stockText: 'A股市场',
						iStockScreenPopup: false,
						screenList: [{
								key: '近24h',
							},
							{
								key: '近5日',
							},
							{
								key: '近30日',
							},
							{
								key: '近60日',
							},
						],
						tableList: {
							theadList: [{
									id: 'ranking',
									name: '排名',
								},
								{
									name: '股票',
									id: 'shareCertificate',
								},
								{
									name: '研报数量',
									id: 'numberReports',
								},
								{
									name: '机构数量',
									id: 'numbeInstitutions',
								},
								{
									name: '近1日涨幅',
									id: 'dayIncrease',
								}
							],
							fixedTB: [{
								ranking: {
									val: '--',
									val2: '',
									type: 'normal',
									icon: '',
									val2Color: '#333333',
									fontColor: '#333333',
								},

								shareCertificate: {
									val: '--',
									val2: '--',
									type: 'normal',
									fontColor: '#333333',
									val2Color: '#666666',
								},
								numberReports: {
									val: '--',
									type: 'normal',
									fontColor: '#333333',
								},
								numbeInstitutions: {
									val: '--',
									type: 'normal',
									fontColor: '#333333',
								},
								dayIncrease: {
									val: '--',
									type: 'normal',
									fontColor: '#F43D3E',
								},
							}, ],
						},
					},
					{
						name: '分析师',
						total: '234',
						scroll_id: 'tabs1',
						timeIndex: 0,
						title: '分析师排行',
						isTab: false,
						stockIndex: 0,
						stockText: 'A股市场',
						iStockScreenPopup: false,
						screenList: [{
								key: '近3月',
							},
							{
								key: '近6月',
							},
							{
								key: '近1年',
							}
						],
						tableList: {
							theadList: [{
									id: 'ranking',
									name: '排名',
								},
								{
									name: '分析师',
									id: 'analyst',
								},
								{
									name: '最新指数',
									id: 'latestIndex',
								},
								{
									name: '总收益',
									id: 'totalRevenue',
								}
							],
							fixedTB: [{
								ranking: {
									val: '--',
									val2: '',
									type: 'normal',
									icon: '',
									fontColor: '#333333',
									val2Color: '#333333',
								},

								analyst: {
									val: '--',
									val2: '--',
									type: 'normal',
									fontColor: '#333333',
								},
								latestIndex: {
									val: '--',
									type: 'normal',
									fontColor: '#333333',
								},
								totalRevenue: {
									val: '--',
									type: 'normal',
									fontColor: '#F43D3E',
								},
							}],
						},
					},
					{
						name: '研究机构',
						total: '234',
						scroll_id: 'tabs2',
						timeIndex: 0,
						stockIndex: 0,
						stockText: 'A股市场',
						iStockScreenPopup: false,
						title: '研究机构排行',
						isTab: false,
						screenList: [{
								key: '近3月',
							},
							{
								key: '近6月',
							},
							{
								key: '近1年',
							}
						],
						tableList: {
							theadList: [{
									id: 'ranking',
									name: '排名',
								},
								{
									name: '研究机构',
									id: 'researchInstitutions',
								},
								{
									name: '研报数量',
									id: 'reportsNumber',
								},
								{
									name: '平均收益',
									id: 'averageRevenue',
								}
							],
							fixedTB: [{
								ranking: {
									val: '--',
									val2: '',
									type: 'normal',
									icon: '',
									fontColor: '#333333',
									val2Color: '#333333',
								},

								researchInstitutions: {
									val: '--',
									val2: '--',
									type: 'normal',
									fontColor: '#333333',
								},
								reportsNumber: {
									val: '--',
									type: 'normal',
									fontColor: '#333333',
								},
								averageRevenue: {
									val: '--',
									type: 'normal',
									fontColor: '#F43D3E',
								},
							}, ],
						},
					},
					{
						name: '研报',
						total: '234',
						scroll_id: 'tabs3',
						timeIndex: 0,
						stockIndex: 0,
						stockText: 'A股市场',
						iStockScreenPopup: false,
						title: '',
						isTab: true,
						screenList: [{
								key: '最新',
							},
							{
								key: '24h热门',
							},
							{
								key: '本周热门',
							},
							{
								key: '本月热门',
							}
						],
						tableList: [{
								securitiesDealer: '浙商证券 梁凤洁等',
								time: '2023/07/07',
								text: '浦发银行:调整、筑底中的股份制银行浦发银行:调整、筑底中的股份制银行浦发银行:调整、筑底中的股份制银行浦发银行:调整、筑底中的股份制银行浦发银行:调整、筑底中的股份制银行浦发银行:调整、筑底中的股份制银行',
								titleIcon: '恒辉安防',
								iconText: '买入',
								pice: '9.06'
							},
							{
								securitiesDealer: '浙商证券 梁凤洁等',
								time: '2023/07/07',
								text: '浦发银行:调整、筑底中的股份制银行',
								titleIcon: '恒辉安防',
								iconText: '买入',
								pice: '9.06'
							},
							{
								securitiesDealer: '浙商证券 梁凤洁等',
								time: '2023/07/07',
								text: '浦发银行:调整、筑底中的股份制银行',
								titleIcon: '恒辉安防',
								iconText: '推荐',
								pice: '9.06'
							}
						],

					},
					//更多的静态数据这里就不放了，可以自己编
				]

			};
		},
		created() {
			// 获取状态栏高度
			let that = this;
			uni.getSystemInfo({
				success: function(e) {
					that.stickyTop = e.statusBarHeight + 44 + 'px';
					that.statusBarHeight = e.statusBarHeight;
				}
			})
		},
		onNavigationBarButtonTap(e) {
			console.info("onNavigationBarButtonTap",e)
			// uni.showToast({
			// 	title: e.index === 0 ? "你点了分享按钮" : "你点了收藏按钮",
			// 	icon: "none"
			// })
		
			this.onShareBox();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			this.clickScroll = true;
		},
		methods: {
			close(){
				this.isFullMask = false;
			},
			navigateBack() {
				uni.navigateBack();
			},
			clickSearch() {
				console.log('点击搜索');
			},
			tabClick(index) {
				this.tabCurrentIndex = index;

			},
			tabChange() {
				if (!this.clickScroll) {
					this.clickScroll = true;
				}
			},
			timeClick(index, index1) {
				this.dataList[index].timeIndex = index1;
			},
			stockClick(i) {
				this.dataList[i].iStockScreenPopup = !this.dataList[i].iStockScreenPopup;
			},
			selctStock(index, index1) {
				this.dataList[index].stockIndex = index1;
				this.dataList[index].stockText = this.stockList[index1].text;
				this.dataList[index].iStockScreenPopup = false;
			},
			markClick(i){
				this.isFullMask = true;
			},
			det(name,index) {
				console.log("name",name,"index",index);
				uni.navigateTo({
					url: '/pages/f10/centerlookMore?name=' + name + '&index=' + index
				});
			},
			initShareData() {
				let that = this;
				let $href = that.$.sprintf('%s/html/#/pages/f10/researchReportCenter%d');
			
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				// #ifdef APP-PLUS
				$href = that.$.sprintf('%s/html/#/pages/f10/researchReportCenter%d');
				// #endif
				// #ifdef MP-WEIXIN
				$href = '/html/#/pages/f10/researchReportCenter';
				// #endif
				this.setData({
					shareData: {
						shareTitle: '研报中心',
						shareText: '中和应泰',
						href: $href,
						image: that.shareBlb,
					},
				});
				console.log('分享入参-研报中心：', that.shareData);
			},
			onShareBox() {
				this.initShareData();
				// #ifndef MP-WEIXIN
				this.$refs.shareGApp.show();
				// #endif
			},
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
	@import '@/styles/f10/researchReportCenter.scss';
	@import '@/styles/new_nav.scss';
	.researchReportCenter{
		.group_2 {
		  padding-top: calc(22rpx + var(--status-bar-height));
		}
	}
</style>