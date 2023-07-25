<template>
	<view class="page flex-col" :class="{fullMaskOH: isFullMask}">
		<scroll-view class="articleDetail-scroll" :style="{ height: scrollHeight + 'rpx' }" scroll-y="true"
			@toLower="toLower">
		<!-- 	<u-navbar @leftClick="navBack" :is-fixed="true" title="研报中心" rightIcon='' :border-bottom="false">
			</u-navbar> -->
			<view class="group_2 flex-col">
				<view class="container-item">

					<view class="box_3 flex-row justify-between" :class="{box_tab:currentList.isTab}">

						<view v-if="!currentList.isTab" class="image-text_2 flex-row justify-between">
							<text class="text-group_2">{{currentList.title}}</text>
							<image @click="markClick" class="label_5" referrerpolicy="no-referrer" :src="mark" />
						</view>

						<view v-if="currentList.isTab" class="box_13 flex-row">
							<view class="text" v-for="(tabItem, tabIndex) in navList" :key="tabIndex"
								:class="{ current: tabCurrentIndex === tabIndex }" @click="tabClick(tabIndex)">
								{{tabItem.text}}
							</view>
						</view>
						<view class="stockScreening" :class="{ openStockPopup: currentList.iStockScreenPopup }">
							<view v-if="currentList.name == '个股' || currentList.name == '研报'"
								class="image-text_3 flex-row justify-between" @click="stockClick">
								<text class="text-group_3">{{currentList.stockText}}</text>
								<image class="image_4" referrerpolicy="no-referrer" :src="downArrow" />
							</view>
							<view class="stockScreenPopup" v-if="currentList.iStockScreenPopup">
								<view class="stockChild" v-for="(stockItem, stockIndex) in stockList" :key="stockIndex"
									:class="{ stockCurrent: currentList.stockIndex === stockIndex }"
									@click="selctStock(stockIndex)">
									{{stockItem.text}}
								</view>
							</view>
						</view>

					</view>
					<view class="box_4 flex-row screenList">
						<view class="text-wrapper_3 flex-col" :class="{ timeCurrent: currentList.timeIndex === index1 }"
							v-for="(item1,index1) in currentList.screenList" :key="index1">
							<text @click="timeClick(index1)" class="text_7">{{item1.key}}</text>
						</view>
					</view>
					<moveTable class="marketScanningTable oneScreen" :tableList="currentList.tableList">
					</moveTable>


				</view>
			</view>
			<shareGApp :shareDataDefault="shareData" ref="shareGApp"></shareGApp>
			<u-popup class="fullMask" :maskCloseAble="true" :safeAreaInsetBottom="false" :safeAreaInsetTop="false"
				:mode="popupData.mode" :round="popupData.round" :overlay="popupData.overlay"
				:borderRadius="popupData.borderRadius" :closeOnClickOverlay="popupData.closeOnClickOverlay"
				:show="isFullMask" @close="close">
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
		</scroll-view>
	</view>
</template>
<script>
	import moveTable from '../../components/scrolTable.vue';
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
				pageNum: 0, //每页条数
				listName: '',
				listIndex: 0,
				currentList: {},
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
			console.info("onNavigationBarButtonTap", e)
			// uni.showToast({
			// 	title: e.index === 0 ? "你点了分享按钮" : "你点了收藏按钮",
			// 	icon: "none"
			// })

			this.onShareBox();
		},
		onLoad(option) {
			console.log("option", option)
			this.listName = option.name;
			this.listIndex = option.index;
			this.currentList = this.dataList[option.index];
			console.log("this.currentList ", this.currentList)

		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			this.clickScroll = true;
		},
		methods: {
			toLower(e) {
				// console.log('扫雷宝-toLower:', e);
				if (this.firstTabIndex == 0) {
					const that = this;
					// console.log('滑动加载', e);
					that.pageNum++;
					let redHeiParams = {
						pageNum: that.pageNum,
						pageSize: 20,
					};
					let params = {
						userId: this.userInfo.user_id,
						queryType: "1"
					}
					// this.pagingTableList(redHeiParams);
				};
			},
			navigateBack() {
				uni.navigateBack();
			},

			tabClick(index) {
				this.tabCurrentIndex = index;

			},
			tabChange() {
				if (!this.clickScroll) {
					this.clickScroll = true;
				}
			},
			timeClick(index) {
				this.currentList.timeIndex = index;
			},
			stockClick(i) {
				this.currentList.iStockScreenPopup = !this.currentList.iStockScreenPopup;
			},
			selctStock(index1) {
				this.currentList.stockIndex = index1;
				this.currentList.stockText = this.stockList[index1].text;
				this.currentList.iStockScreenPopup = false;
			},
			markClick(i) {
				this.isFullMask = true;
			},
			det() {
				uni.navigateTo({
					url: '/pages/f10/centerlookMore'
				});
			},
			close() {
				this.isFullMask = false;
			},
			initShareData() {
				let that = this;
				let $href = that.$.sprintf('%s/html/#/pages/f10/centerlookMore?name=%d', that.listName,'&index=', that.listIndex);
			
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				// #ifdef APP-PLUS
				$href = that.$.sprintf('%s/html/#/pages/f10/centerlookMore?name=%d', that.listName,'&index=', that.listIndex);
				// #endif
				// #ifdef MP-WEIXIN
				$href = '/html/#/pages/f10/centerlookMore?name='+ that.listName + '&index=', that.listIndex;
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

	.page {
		background-color: #ffffff;
	}

	::v-deep .marketScanningTable {
		.gridtable tbody {
			&:after {
				border-bottom: 0;
			}
		}
	}

	.container-item {
		border-bottom: 0;
	}
</style>