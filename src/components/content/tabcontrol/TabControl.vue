<template>
	<div class="tabControl">
		<div v-for="(item,index) in titles" :key="index"
		class="control_item" :class="{active:index === currentIndex}"
		@click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				currentIndex:0
			}
		},
		props:{
			titles:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex = index
				this.$emit("tabClick",index)
			}
		}
	}
</script>

<style scoped>
	.tabControl{
		display: flex;
		text-align: center;
		background-color: white;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
	}
	.control_item{
		flex: 1;
	}
	.active{
		color: var(--color-high-text);
	}
	.active span{
	    border-bottom: 2px solid var(--color-high-text);
		padding: 3px 5px;
	}
</style>
