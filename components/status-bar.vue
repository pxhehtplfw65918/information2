<template name="status-bar" :style="{'background-color':backgroundColor}">
    <block>
	<!-- #ifdef APP-PLUS -->
	<view class="status_bar">
		<view class="top_view" :style="{'background-color':backgroundColor}"></view>
	</view>
	<!-- #endif -->
    </block>
</template>


<script>

	export default {
		name: "status-bar",
		
		props: {
			backgroundColor: {
				type: String,
				default: '#f7f7f7'
			}
		}
	}
</script>



<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.top_view{
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		z-index: 9999;
		top: 0;
	}
</style>

