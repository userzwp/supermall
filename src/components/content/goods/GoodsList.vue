<template>
	<div class="goods">
		<goods-list-item v-for="item in goods"
		:goods-item="item"></goods-list-item>
	</div>
</template>

<script>
	import GoodsListItem from "./GoodsListItem.vue"
	export default{
		props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			GoodsListItem
		}
	
	}
</script>

<style scoped>
	.goods{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		padding: 2px;
	}
</style>
