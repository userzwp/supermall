<template>
	<div class="goods_item" @click="itemClick">
		<img v-lazy="showImgae" @load="imageLoad"/>
		<div class="goods_info">
			<p>{{goodsItem.title}}</p>
			<span class="price">{{goodsItem.price}}</span>
			<span class="collect">{{goodsItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		
		props:{
			goodsItem:{
				type:Object,
			    default(){
					return {}
				}
			}
		},
		methods:{
			imageLoad(){
				this.$bus.$emit("itemImageLoad")
				
				// if(this.$route.path.indexOf("/home")!== -1){
				// 	this.$bus.$emit("itemImageLoad")
					
				// }else if(this.$route.path.indexOf("/detail")!== -1){
				// 	this.$bus.$emit("detailImageLoad")
					
				// }
			    
				},
			itemClick(){
				this.$router.push("/detail/"+this.goodsItem.iid)
				
			}
			
			},
		computed:{
			showImgae(){
				return  this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img 
			}
		
		},
	

		}
	
	
</script>

<style scoped>
	.goods_item{
		width: 48%;
		padding-bottom: 40px;
		position: relative;
	}
	.goods_item img{
		width: 100%;
		border-radius: 5px;
	}
	.goods_info{
		font-size: 12px;
		text-align: center;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
	}
	.goods_info p{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}
	.goods_info .price{
		color: var(--color-high-text);
		margin-right: 20px;
	}
	.goods_info .collect{
		position: relative;
	}
	.goods_info .collect::before{
		content: "";
		position: absolute;
		width: 14px;
		height: 14px;
		left: -15px;
		top: -1px;
		background: url(~assets/img/common/collect.svg) 0 0px/14px 14px;
	}
</style>
