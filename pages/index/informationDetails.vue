<template>
	<view class="page flex-col">
		<view class="block_1 flex-col">
			<u-navbar @leftClick="navBack" :is-fixed="true" title="资讯详情" rightIcon='' :border-bottom="false">
			</u-navbar>
		</view>
		<scroll-view class="articleDetail-scroll" :style="{ height: scrollHeight + 'rpx' }" scroll-y="true">
		
			<view class="block_4 flex-col">
				<rich-text class="richText" :nodes="content" style="">
				</rich-text>
			</view>
		</scroll-view>

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
				return winHeight - this.$FT.pxToRpx(44);
			},
		},
		data() {
			return {
				constants: {},
				content:'',
				id:0,
				stockCodes:'871857',
			};
		},
		onLoad(e) {
			this.id = e.seq;
			this.stockList(e.seq)
			console.log(e)
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
			stockList(id) {
				let data = {
					seq:id
				}
				const that= this;
				uni.request({
					url: this.Config.stockDetail,
					method: 'Get',
					dataType: 'jsonp',
					data:data,
					success: (res) => {
						let data = JSON.parse(res.data);
						console.log("that.data",data.result.content)
						let list = data.result.content;
						that.content = list;
						console.log("that.content",that.content)
						 // that.informationList = that.informationList.concat(list);
					},
					fail: (res) => {
			
					},
					complete: () => {},
				});
			},
		},
	};
</script>
<style lang="scss">
	@import '@/styles/f10/common.css';
	@import '@/styles/f10/informationDetails.scss';
	@import '@/styles/new_nav.scss';
	table{
		display: none;
	}
</style>