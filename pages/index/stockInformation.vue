<template>
	<view class="page flex-col">
		<view class="box_1 flex-row">
			<scroll-view class="articleDetail-scroll" :style="{ height: scrollHeight + 'rpx' }" scroll-y="true"
				@scrolltolower="toLower">
				<view class="box_2 flex-col">
					<view class="informationList" v-for="(item,index) in informationList" :key="index"
						@click="det(item.seq)">
						<!-- < -->
						<!-- <a class="text_8" href="#" target="_blank" rel="noopener noreferrer">{{item.title}}</a> -->
						<rich-text class="text_8" v-if="item.title != null " v-html="item.title"></rich-text>
						<text class="text_9" v-if="item.ctime != null ">{{item.ctime}}</text>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['Config']),
			scrollHeight: function() {
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750 / winWidth;
				let winHeight = parseInt(sys.windowHeight * winrate);
				return winHeight - this.$FT.pxToRpx(0);
			},
		},
		data() {
			return {
				constants: {},
				tabCurrentIndex: 1,
				stockCodes: '871857',
				informationList: [],
				pageNum: 0, //每页条数
				pageSize: 20,
			};
		},
		created() {
			console.log("Config", this.Config)
			let params = {
				stockCodes: this.stockCodes,
				type: "0",
				stockName: "",
				sort: "",
				title: "",
				page:  this.pageNum,
				size: "20"
			};
			this.stockList(params);
		},
		methods: {
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			toLower(e) {
				console.log('滑动加载-toLower', e);
				const that = this;
				that.pageNum++;
				let params = {
					stockCodes: this.stockCodes,
					type: "0",
					stockName: "",
					sort: "",
					title: "",
					page:  this.pageNum,
					size: "20"
				};

				this.stockList(params);

			},
			stockList(data) {
				const that = this;
				uni.request({
					url: this.Config.stockList,
					method: 'POST',
					dataType: 'jsonp',
					data: data,
					success: (res) => {
						let data = JSON.parse(res.data);
						console.log(data)
						let list = data.result.newsList;
						// list.map((item) =>{
						// 	 that.informationList.push({})
						// })
						that.informationList = that.informationList.concat(list);

					},
					fail: (res) => {

					},
					complete: () => {},
				});
			},
			det(i) {
				uni.navigateTo({
					url: '/pages/index/informationDetails?seq=' + i
				});
			}
		},
	};
</script>
<style lang="scss">
	@import '@/styles/f10/common.css';
	@import '@/styles/f10/stockInformation.scss';
</style>