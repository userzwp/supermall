<template>
	<div calss="cart-list">
		<scroll class="content" ref="scroll">
		<cart-list-item v-for="(item,index) in cartList" :item-info="item" 
		:key="index"></cart-list-item>
		</scroll>	
	</div>
</template>

<script>
	import { mapGetters } from "vuex"
	import Scroll from "components/common/scroll/Scroll.vue"
	import CartListItem from "./CartListItem.vue"
	export default {
		components:{
			 Scroll,
			 CartListItem
		},
		computed:{
			...mapGetters(["cartList"])
		},
		activated(){
			this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped>
	.cart-list{
	height: 100vh;
	}
	.content{
		height: calc(100vh - 44px - 49px - 43px);
		overflow: hidden;
	}
</style>
