<template>
	<div class="recommend">
		<div class="recommend_item" v-for="item in recommend" 
		:key="item.sort">
			<a :href="item.link">
				<img :src="item.image" class="item_image">
				<p class="item_text">{{item.title}}</p>
			</a>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			recommend:{
				type:Array,
				default(){
					return []
				}
			}	
		}
	}
</script>

<style scoped>
	.recommend{
		display: flex;
		width: 100%;
		text-align: center;
		font-size: 13px;
		padding: 5px 0 15px;
		border-bottom: 8px solid #eee;
	}
	.recommend_item{
		flex: 1;
	
	}
   .recommend_item .item_image{
	   width: 70px;
	   height: 70px;
   }
</style>
