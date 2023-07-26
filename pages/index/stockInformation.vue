<template>
	<view class="page flex-col">
		<view class="box_1 flex-row">
			<view class="box_2 flex-col">

				<view class="informationList" v-for="(item,index) in informationList" :key="index" @click="det(item.seq)">
					<!-- < -->
					<!-- <a class="text_8" href="#" target="_blank" rel="noopener noreferrer">{{item.title}}</a> -->
				 <rich-text class="text_8" v-if="item.title != null " v-html="item.title"></rich-text>
					<text class="text_9"  v-if="item.ctime != null " >{{item.ctime}}</text>
				</view>

			</view>
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
		},
		data() {
			return {
				constants: {},
				tabCurrentIndex: 1,
				stockCodes:'871857',
				informationList: []
			};
		},
		created() {
			console.log("Config", this.Config)
			this.stockList();
		},
		methods: {
			tabClick(index) {
				this.tabCurrentIndex = index;

			},
			stockList() {
				let data = {
					stockCodes: this.stockCodes,
					type: "0",
					stockName: "",
					sort: "",
					title: "",
					page: "0",
					size: "20"
				}
				const that= this;
				uni.request({
					url: this.Config.stockList,
					method: 'POST',
					dataType: 'jsonp',
					data:data,
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