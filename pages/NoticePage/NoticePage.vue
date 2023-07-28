<template>
	<view class="container">
		<view class="top-section">
			<view class="top-content">
				<p class="title">大事提醒</p>
				<p class="more">
					<span>更多</span>
					<img src="../../static/icon/more.png" alt="" />
				</p>
			</view>
			<view class="timeline-wrapper">
				<el-timeline>
					<el-timeline-item placement="top" size="normal" v-for="(activity, index) in activities"
						:key="index">
						<view class="custom-timestamp">
							<span v-html="activity.timestamp"> </span>
						</view>
						<view class="custom-content">
							<view class="title-content">
								<p class="title">{{ activity.type }}</p>
								<p class="more">
									同类事件
									<img src="../../static/icon/more-1.png" alt="" />
								</p>
							</view>
							<view class="wrapper">
								<!-- <input id="exp1" class="exp" type="checkbox" /> -->
								<view class="custom-notice">
									<span class="btn">
										<img src="../../static/icon/more-1.png" alt="" /></span>
									<!-- <label class="btn" for="exp1"></label> -->
									{{ activity.content }}
								</view>
							</view>
						</view>
					</el-timeline-item>
				</el-timeline>
			</view>
		</view>
		<view class="viewider"></view>
		<view class="bottom-section">
			<view class="title-content">
				<p class="title">公告</p>
				<p class="more" @click="isShow = !isShow">
					全部公告
					<img src="../../static/icon/more-2.png" alt="" />
				</p>
			</view>
			<view class="bottom-content">
				<view v-for="(item, index) in notice" :key="index">
					<view>
						<p class="content-area">{{ item.content }}</p>
						<p class="time-area">{{ item.timestamp }}</p>
					</view>
					<view v-if="index < notice.length - 1" class="bottomLine"></view>
				</view>
				<div class="infinite-list-wrapper" style="overflow:auto">
					<ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
						<view v-for="(item, index) in notice" :key="index">
							<view>
								<p class="content-area">{{ item.content }}</p>
								<p class="time-area">{{ item.timestamp }}</p>
							</view>
							<view v-if="index < notice.length - 1" class="bottomLine"></view>
						</view>
					</ul>
					<p v-if="loading">加载中...</p>
					<p v-if="noMore">没有更多了</p>
				</div>
			</view>
		</view>

		<view class="select-area" v-show="isShow">
			<view class="mask-area" @click="isShow = !isShow"></view>
			<view class="notice-selector">
				<view class="selector-title">
					<span>公告筛选</span>
					<img src="../../static/icon/close.png" alt="" @click="isShow = !isShow" />
				</view>
				<view class="selector">
					<view v-for="(item, index) in notice_selector" @click="
              select_type = item.type;
              isShow = !isShow;
            " :key="index" :class="[
              item.type == select_type ? 'isSelected' : '',
              'type_option',
            ]">
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	//设置根节点font-size
	document.documentElement.style.fontSize =
		1560 / document.documentElement.clientWidth + "vw";
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				count: 10,
				loading: false,
				activities: [{
						content: "06-06入选龙虎榜，买入总额3595万元，卖出总额3514万元，上榜原因: 有价格涨跌幅限…06-06入选龙虎榜，买入总额3595万元，卖出总额3514万元，上榜原因: 有价格涨跌幅限…",
						timestamp: "2018-04-05",
						type: "龙虎榜",
					},
					{
						content: "06-06入选龙虎榜，买入总额3595万元，卖出总额3514万元，上榜原因: 有价格涨跌幅限…",
						timestamp: "2018-04-13",
						type: "分红转送",
					},
					{
						content: "06-06入选龙虎榜，买入总额3595万元，卖出总额3514万元，上榜原因: 有价格涨跌幅限…",
						timestamp: "2018-04-11",
						type: "一季报披露",
					},
				],
				notice: [{
						content: "杭州热电:股票交易严重异常波动公告",
						timestamp: "2023-05-31",
						type: "",
					},
					{
						content: "杭州热电:关于对杭州热电集团股份有限公司股票交易严重异常波动问询函的回复",
						timestamp: "2023-05-31",
						type: "",
					},
					{
						content: "杭州热电:杭州热电集团股份有限公司 2022年年度权益分派实施公告杭州热电:股票交易风险提示公告",
						timestamp: "2023-05-31",
						type: "",
					},
					{
						content: "杭州热电:股票交易风险提示公告",
						timestamp: "2023-05-31",
						type: "",
					},
					{
						content: "杭州热电:杭州热电集团股份有限公司 2022年年度权益分派实施公告杭州热电:股票交易风险提示公告",
						timestamp: "2023-05-31",
						type: "",
					},
					{
						content: "杭州热电:杭州热电集团股份有限公司 2022年年度权益分派实施公告杭州热电:股票交易风险提示公告",
						timestamp: "2023-05-31",
						type: "",
					},
					{
						content: "杭州热电:杭州热电集团股份有限公司 2022年年度权益分派实施公告杭州热电:股票交易风险提示公告",
						timestamp: "2023-05-31",
						type: "",
					},
					{
						content: "杭州热电:杭州热电集团股份有限公司 2022年年度权益分派实施公告杭州热电:股票交易风险提示公告",
						timestamp: "2023-05-31",
						type: "",
					},
					{
						content: "杭州热电:杭州热电集团股份有限公司 2022年年度权益分派实施公告杭州热电:股票交易风险提示公告",
						timestamp: "2023-05-31",
						type: "",
					},
					{
						content: "杭州热电:杭州热电集团股份有限公司 2022年年度权益分派实施公告杭州热电:股票交易风险提示公告",
						timestamp: "2023-05-31",
						type: "",
					},
					{
						content: "杭州热电:杭州热电集团股份有限公司 2022年年度权益分派实施公告杭州热电:股票交易风险提示公告",
						timestamp: "2023-05-31",
						type: "",
					},
				],
				notice_selector: [],
				select_type: "",
				isShow: false,
				code: "600519", //进入页面获取的股票代码
				page: 1,
				totalPage: ""
			};
		},
		watch: {
			activities: {
				handler(newName, oldName) {
					this.activities = newName;
					this.$forceUpdate();
				},
				deep: true,
				immediate: true,
			},
		},
		created() {
			this.getNoticeTypeList(0)
			this.getNoticeList()
			this.initActivities();
		},
		methods: {
			//加载数据
			load() {
				this.loading = true
				setTimeout(() => {
					this.count += 2
					this.loading = false
				}, 2000)
			},
			initActivities() {
				let that = this;
				this.activities.map((item, i) => {
					that.activities[i].timestamp = that.formatTime(item.timestamp)
					console.log("", that.activities[i])
				})
			},
			//传入一个时间格式为2018-04-16转换为年月日返回一个html结构month不足10补0
			formatTime(time) {
				const date = new Date(time);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, "0");
				const day = date.getDate().toString().padStart(2, "0");
				return (
					'<view style="font-size: 0.78rem;color: #333333;height:1.0725rem;line-height:1.0725rem;float:right; ">' +
					month +
					"-" +
					day +
					'</view><view style="font-size:0.65rem;color: #999999; transform: scale(0.833); float:right;height:0.11rem;line-height:0.81rem">' +
					year +
					"</view>"
				);
			},
			//获取公告类型列表
			getNoticeTypeList(id) {
				let data = {
					code: id
				}
				var that = this;
				uni.request({
					url: this.Config.URL.newsUrl.noticeTypeList,
					method: 'Get',
					dataType: 'json',
					data: data,
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						that.notice_selector = res.data.result

					},
					fail: (res) => {

					},
					complete: () => {},
				});
			},
			//获取公告列表
			getNoticeList() {
				let data = {
					code: this.code,
					type: this.select_type,
					pageNum: this.page
				}
				var that = this;
				uni.request({
					url: this.Config.URL.newsUrl.noticeList,
					method: 'Get',
					dataType: 'json',
					data: data,
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						that.totalPage = res.data.result.totalPage
					},
					fail: (res) => {

					},
					complete: () => {},
				});
			},
		},
		computed: {
			...mapState(['Config']),
			noMore() {
				return this.count >= 20
			},
			disabled() {
				return this.loading || this.noMore
			}
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		font-size: 0.91rem;
	}

	.top-section,
	.bottom-section {
		padding: 0 0.975rem;
	}

	.top-section {
		min-height: 35%;
	}

	.top-section {
		.top-content {
			height: 3.75rem;
			line-height: 3.75rem;
			display: flex;
			justify-content: space-between;

			p {
				margin: 0;
				display: inline-block;
			}

			.title {
				font-size: 1.105rem;
				font-family: "PF Medium";
			}

			.more {
				font-size: 0.845rem;
				color: #999999;

				img {
					width: 0.625rem;
					height: 0.625rem;
				}
			}
		}
	}

	.bottom-section {
		.title-content {
			padding-top: 1rem;
			display: flex;
			justify-content: space-between;

			p {
				margin: 0;
				display: inline-block;
			}

			.title {
				font-size: 1.105rem;
				font-family: "PF Medium";
			}

			.more {
				font-size: 0.845rem;
				color: #999999;

				img {
					width: 0.625rem;
					height: 0.625rem;
				}
			}
		}

		.bottom-content {
			.time-area {
				font-size: 0.845rem;
				color: #999999;
				display: flex;
				justify-content: flex-end;
			}

			.bottomLine {
				margin-top: 0.625rem;
				margin-bottom: 0.625rem;
				height: 0.0625rem;
				background-color: #e4e4e4;
				opacity: 0.7;
			}
		}
	}

	.viewider {
		height: 0.3125rem;
		background-color: #f5f5f5;
	}

	//重写element-ui的样式
	::v-deep.el-timeline-item {
		padding-bottom: 0.5rem;
	}

	::v-deep .el-timeline-item__timestamp.is-top {
		position: absolute;

		color: #333333;
		white-space: pre-line;
	}

	::v-deep .el-timeline {
		padding-left: 2.7rem;
		font-size: 0.91rem;
		--el-timeline-node-size-normal: 0.625rem;
	}

	::v-deep .el-timeline-item__tail {
		border-left: 0.0625rem solid #e4e4e4;
	}

	::v-deep .el-timeline-item__node--normal {
		left: 0;
	}

	::v-deep .el-timeline-item__wrapper {
		padding-left: 1.3rem;
		padding-top: -0.3125rem;
	}

	.custom-timestamp {
		position: absolute;
		top: -0.5em;
		left: -2.7rem;
		color: #333333;
		white-space: pre-line;
		width: 2.5rem;
	}

	.custom-content {
		.title-content {
			display: flex;
			justify-content: space-between;

			p {
				margin: 0;
				display: inline-block;
			}

			.title {
				font-size: 0.91rem;
				font-family: "PF Medium";
				color: #fe0000;
			}

			.more {
				font-size: 0.715rem;
				color: #999999;
			}

			img {
				width: 0.625rem;
				height: 0.625rem;
			}
		}

		.wrapper {
			display: flex;
			overflow: hidden;

			.custom-notice {
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: justify;
				/* display: flex; */
				/*   display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical; */
				line-height: 1.5;
				max-height: 4.5em;
				position: relative;
				transition: 0.3s max-height;

				.btn {
					position: relative;
					float: right;
					clear: both;
					margin-left: 1rem;
					line-height: 1rem;
					cursor: pointer;
					border: 0;

					img {
						width: 0.75rem;
						height: 0.75rem;
					}
				}

				.btn::before {
					content: "...";
					position: absolute;
					left: -0.5rem;
					color: #333;
					transform: translateX(-100%);
				}

				.btn::after {
					content: "";
				}
			}

			.custom-notice::before {
				content: "";
				height: calc(100% - 1.25rem);
				float: right;
			}

			.custom-notice::after {
				content: "";
				width: 999vw;
				height: 999vw;
				position: absolute;
				box-shadow: inset calc(6.25rem - 999vw) calc(1.875rem - 999vw) 0 0 #fff;
				margin-left: -6.25rem;
			}

			// .exp {
			//   display: none;
			// }
			// .exp:checked + .custom-notice {
			//   max-height: none;
			// }
			// .exp:checked + .custom-notice .btn::after {
			//   content: "收起";
			// }
			// .exp:checked + .custom-notice .btn::before {
			//   visibility: hidden; /*在展开状态下隐藏省略号*/
			// }
		}

		// .custom-notice::before {
		//   content: "";
		//   float: right;
		//   clear: both;
		//   width: 0;
		//   height: 1.5625rem; /*先随便设置一个高度*/
		// }
	}

	.formatTime {
		margin-top: -1em;
	}

	.select-area {
		.mask-area {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			/* 设置遮罩层的背景色及透明度 */
			z-index: 1;
			/* 确保遮罩层在选择器之下 */
		}

		.notice-selector {
			position: fixed;
			width: 100%;
			height: 40%;
			bottom: 0;
			/* 调整选择器距离底部的距离 */
			background-color: white;
			border-radius: 6px 6px 0 0;
			/* 设置选择器的圆角 */
			z-index: 2;
			/* 确保选择器位于遮罩层上方 */
			animation-name: zoomIn;
			animation-duration: 0.1s;
			animation-timing-function: ease-out;

			.selector-title {
				display: flex;
				width: 94%;
				margin: auto;
				justify-content: space-between;
				padding-top: 1rem;
				padding-bottom: 0.5rem;

				img {
					width: 0.91rem;
					height: 0.91rem;
				}

				span {
					font-size: 0.91rem;
					font-family: "PF Medium";
				}
			}

			.selector {
				width: 94%;
				margin: auto;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;

				.type_option {
					width: 30%;
					margin-top: 1rem;
					text-align: center;
					height: 3rem;
					line-height: 3rem;
					background-color: #f7f8fa;
					border-radius: 0.375rem;
				}

				.type_option:not(:nth-child(3n + 1)) {
					margin-left: 5%;
				}

				.isSelected {
					background-color: #ffeded;
					color: #fe0000;
					font-family: "PF Medium";
				}
			}
		}

		@keyframes zoomIn {
			0% {
				transform: scale(0);
			}

			100% {
				transform: scale(1);
			}
		}
	}
</style>
