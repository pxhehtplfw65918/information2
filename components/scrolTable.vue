<template>
	<view class="table-main" :class="stocksList.fixedTB.length == 0 ? 'loading' : ''">

		<table class="gridtable" :class="`col${stocksList.theadList.length}`" border="0">
			<thead>
				<tr class="title">
					<td class="title-th" v-for="(item, index) in stocksList.theadList"
						:class="item.type == 'fixed' ? 'fixed' : ''">
						<text class="title-key">{{ item.name }}</text>
						<image class="iconHelp" v-if="item.isIconHelp" :src="iconHelp" mode="widthFix"></image>
						<view class="" v-if="item.iSort">
							<!-- 20的为不可以点的 -->
							<view class="triangle-up" :class="item.sortState == 1 ? 'iSelect-up' : ''"
								@click="item.iSort ? sortDate(item,index,'asc') : ''">

							</view>
							<view class="triangle-down" :class="item.sortState == 2 ? 'iSelect-down' : ''"
								@click="item.iSort ? sortDate(item,index,'desc') : ''">

							</view>
						</view>
					</td>
				</tr>
			</thead>
			<tbody v-if="stocksList.fixedTB.length !== 0">
				<tr v-for="(item, index) in stocksList.fixedTB">
					<td class="body-td" v-for="(row, i) in stocksList.theadList"
						:class="item.type == 'fixed' ? 'fixed' : ''" @tap="itemClick(item, i)">

						<view v-if="item[row.id].type == 'image'" class="valImage">
							<image class=" icon-c" :src="item[row.id].val" mode="widthFix"> </image>
						</view>

						<view v-if="item[row.id].type !== 'image'" class="val"
							:style="{ color: item[row.id].fontColor }"> {{ item[row.id].val }}</view>

						<view class="val2" v-if="item[row.id].val2 != null">
							<!-- 	<view class="icon-c" v-if="item[row.id].icon !=null ">{{item[row.id].icon}}</view> -->
							<view v-if="item[row.id].market != null">
								<image class="icon-c" v-if="item[row.id].market == 0" :src="stocksH" mode="widthFix">
								</image>
								<image class="icon-c" v-if="item[row.id].market == 1" :src="stocksS" mode="widthFix">
								</image>
								<image class="icon-c" v-if="item[row.id].market == 2" :src="stocksB" mode="widthFix">
								</image>
								<image class="icon-c" v-if="item[row.id].market == 3" :src="stocksC" mode="widthFix">
								</image>
								<image class="icon-c" v-if="item[row.id].market == 4" :src="stocksK" mode="widthFix">
								</image>
							</view>

							<text :style="{ color: item[row.id].val2Color }">{{ item[row.id].val2 }}</text>
						</view>
					</td>
				</tr>
			</tbody>
			<tbody class="loading_content" v-if="stocksList.fixedTB.length == 0">
				<tr>
					<td>正在加载中<view class="dot">...</view>
					</td>
				</tr>
			</tbody>
		</table>
	</view>
</template>

<script>
	/*
    <moveTable :stocksList="stocksList"></moveTable>
    使用示例：playingNewShares.vue组件
    demo:/findTools/daXinBao/index(打新宝)
  */
	import {
		mapState
	} from 'vuex'
	export default {
		components: {},
		props: {
			tableList: {
				type: Object,
				default () {
					return {
						theadList: [{
								id: 'nameCode',
								name: '名称/代码',
								iSort: false,
								sortState: 0, // 0 默认， 1降序 2升序
							},
							// {

							// }
						],
						fixedTB: [{
							nameCode: {
								val: '--',
								val2: '--',
								type: 'normal',
								icon: '创',
								fontColor: '#999999',
							},
						}, ],
					};
				},
			},
		},
		watch: {
			tableList: {
				handler(newName, oldName) {
					if (Object.keys(newName).length !== 0) {
						this.stocksList = newName;
					}
					this.$forceUpdate();
				},
				deep: true,
				immediate: true,
			},
		},
		data() {
			return {
				sort: false,
				controlUp: false,
				controlDown: false,
				iconHelp: `${getApp().globalData.qnUrl}/zc_images/findPage/icon-help.png`,
				stocksB: `${getApp().globalData.qnUrl}/zc_images/findTools/stocks-b.png`,
				stocksC: `${getApp().globalData.qnUrl}/zc_images/findTools/stocks-c.png`,
				stocksH: `${getApp().globalData.qnUrl}/zc_images/findTools/stocks-h.png`,
				stocksK: `${getApp().globalData.qnUrl}/zc_images/findTools/stocks-k.png`,
				stocksS: `${getApp().globalData.qnUrl}/zc_images/findTools/stocks-s.png`,
				defaultSort: true,
				stocksList: {
					theadList: [],
					fixedTB: [],
				},
			};
		},
		computed: {
			...mapState(['controlTableSort'])
		},
		onLoad() {
			console.log("is.$.isNull(this.tableList)", this.$.isNull(this.tableList))
			if (Object.keys(newName).length !== 0) {
				this.stocksList = this.tableList;
			}

			console.info('-----stocksList----', this.stocksList);
		},
		onUnload() {},
		methods: {
			sortDate(item, index, state) {
				const that = this;
				this.stocksList.theadList.map((item, i) => {
					that.stocksList.theadList[i].sortState = 0;
				})


				this.defaultSort = false;
				this.sort = !this.sort
				if (state == 'desc') {
					this.stocksList.theadList[index].sortState = 2;
				} else if (state == 'asc') {
					this.stocksList.theadList[index].sortState = 1;
				}

				this.$emit('changeSortDate', this.stocksList.theadList[index].sortState, index, state)
			},
			det(item, index) {
				if (index == 0) {
					this.$emit('det', item, index);
				} else {
					this.$emit(
						'itemClick', {
							stockName: item.nameCode.val,
							market: item.nameCode.market,
							stockCode: item.nameCode.val2,
						},
						index,
						item
					);
				}
			},

			itemClick(item, index) {
				//console.info('---item---row------', item);
				if (index == 0) {
					this.$emit('itemClick', item, index);
				} else {
					this.$emit(
						'itemClick', {
							stockName: item.nameCode.val,
							market: item.nameCode.market,
							stockCode: item.nameCode.val2,
						},
						index,
						item
					);
				}
			},

			changeDateUp() {
				// upSort
				this.$emit('changeDateUp', 'up')
				this.controlUp = true
				this.controlDown = false
			},

			changeDateDown() {
				// downSort
				this.$emit('changeDateDown', 'down')
				this.controlDown = true
				this.controlUp = false
			}
		},
	};
</script>

<style lang="scss">
	.table-main {
		overflow: auto;
		position: relative;
		// padding-top: 42rpx;
		width: 690rpx;
		margin: 0 auto;
	}

	table.gridtable {
		// width: 100%;
		height: auto;
		font-family: verdana, arial, sans-serif;
		color: #333333;
		border-collapse: collapse;
		table-layout: fixed;

		thead {
			display: flex;

			tr {
				td {
					padding-bottom: 16rpx;
				}

				td:nth-child(1) {
					position: sticky;
					top: 0;
					left: 0;
					z-index: 2;
				}
			}
		}

		thead,
		tbody {
			// display: flex;
			position: relative;

			&:after {
				content: "";
				position: absolute;
				width: 100%;
				height: 1%;
				left: 0;
				bottom: 0;
				// background-color: #F0F0F0;
				border-bottom: 2rpx solid #f0f0f0;
				z-index: 9;
			}

			tr,
			td {
				height: 100%;
				background-color: #ffffff;
			}

			tr {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: auto;

				td {
					width: 180rpx !important;
					white-space: nowrap;
					background-color: #ffffff;
					padding-bottom: 16rpx;
				}

				td:first-child {

					.val,
					.val2 {
						text-align: left;
					}
				}

				.val {
					font-size: 28rpx;
					text-align: left;
				}

				.val2 {
					font-size: 24rpx;
				}

				td:first-child {
					.val {
						font-size: 34rpx;
					}
				}
			}

			.fixed {
				position: fixed;
				display: none;
			}

			.tdAbs {
				position: absolute;
			}
		}
	}

	.title-key {
		margin-right: 10rpx;
	}

	.title-th {
		display: flex;
		align-items: center;
		text-align: left;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.body-td {
		flex-shrink: 0;
		height: 127rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 28rpx;
		font-family: DIN-Medium, DIN;
		font-weight: 500;
		color: #000000;

		p {
			display: flex;
		}
	}

	table.gridtable tbody {
		width: 100%;
		// display: flex;
		height: 127rpx;
		overflow: auto;

		tr {
			border-bottom: 2rpx solid #f0f0f0;

			td:nth-child(1) {
				position: relative;
				position: sticky;
				left: 0;
				z-index: 99;
			}
		}

		tr:last-child {
			td {
				padding-bottom: 26rpx;
			}
		}
	}

	table.gridtable th {
		padding: 8px;
		background-color: #dedede;
		white-space: nowrap;
		// border: 1px solid #000;
	}

	.val2 {
		display: flex;
		align-items: center;
	}

	.textCode {
		font-size: 26rpx;
		font-family: DIN-Medium, DIN;
		font-weight: 500;
		color: #999999;
	}

	.loading {
		overflow-x: hidden;

		&_content {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 127rpx;
			overflow-x: hidden;

			tr {
				border-bottom: 0;
			}

			td {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 127rpx;
				padding-bottom: 0;
			}
		}
	}

	table.gridtable.col3 {
		width: 100%;
		overflow: hidden;

		thead,
		tbody {
			tr {
				width: 100%;

				td {
					width: 200rpx !important;
				}

				td:nth-child(2) {
					text-align: left;

					.val,
					.val2 {
						text-align: left;
					}

				}

				// td:last-child{
				// 		text-align: right;
				// 	.val,.val2{
				// 		text-align: right;
				// 	}
				// }
			}
		}
	}

	.triangle {
		position: sticky;
		right: 18rpx;
		z-index: 9;
		margin-top: 18rpx;

		&::before {
			content: "";
			position: absolute;
			top: 0;
			right: 0;
			width: 0;
			height: 0;
			border-left: 10rpx solid #e7e7e7;
			border-top: 10rpx solid transparent;
			border-bottom: 10rpx solid transparent;
		}
	}

	.icon-c {
		width: 30rpx;
		height: 30rpx;
		margin-right: 5rpx;
		// line-height: 30rpx;
		vertical-align: baseline;
		// text-align: center;
		// background: #4D62FF;
		// border-radius: 4rpx;
		// font-size: 20rpx;
		// font-family: PingFangSC-Regular, PingFang SC;
		// font-weight: 400;
		// color: #FFFFFF;
		// margin-right: 5rpx;
	}

	.icon-hu {
		background: rgba(246, 72, 34, 1);
	}

	.icon-shen {
		background: rgba(246, 104, 34, 1);
	}

	.icon-bei {
		background: rgba(246, 104, 34, 1);
	}

	.icon-ke {
		background: rgba(246, 104, 34, 1);
	}

	.iconHelp {
		width: 18rpx;
		height: 18rpx;
		margin-left: 5rpx;
		position: relative;
		vertical-align: middle;
		// &::after{
		// 	content: '';
		// 	position: absolute;
		// 	top:50%;
		// 	width: 18rpx;
		// 	height: 18rpx;
		// 	background: url('https://qnsp.zcskjy.com/zc_images/findPage/icon-help.png');
		// 	background-size: 18rpx  18rpx;
		// 	background-repeat: no-repeat;
		// 	background-position: center;
		// 	transform: translateY(-50%);

		// }
	}

	.dot {
		display: inline-block;
		height: 1em;
		line-height: 1;
		text-align: left;
		vertical-align: -0.25em;
		overflow: hidden;
	}

	.dot::before {
		display: block;
		content: "...\A..\A.";
		white-space: pre-wrap;
		animation: dot 3s infinite step-start both;
	}

	@keyframes dot {
		33% {
			transform: translateY(-2em);
		}
	}

	::v-deep .u-icon__img {
		width: 20rpx !important;
		height: 36rpx !important;
	}

	.triangle-up {
		width: 0;
		height: 0;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-bottom: 10rpx solid #CCCCCC;
		margin-bottom: 5rpx;
		position: relative;
		&::before {
			content: '';
			position: absolute;
			top: -30rpx;
			right: -30rpx;
			bottom: -10rpx;
			left: -30rpx;
		}
	}

	.triangle-down {
		width: 0;
		height: 0;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-top: 10rpx solid #ccc;
		position: relative;
		&::before {
			content: '';
			position: absolute;
			top: -10rpx;
			right: -30rpx;
			bottom: -20rpx;
			left: -30rpx;
		}
	}

	.iSelect-up {
		border-bottom: 10rpx solid #FE0000;
	}

	.iSelect-down {
		border-top: 10rpx solid #FE0000;
	}
</style>