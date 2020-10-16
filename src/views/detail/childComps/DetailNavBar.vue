<template>
	<div class="detaiNavBar">
		<nav-bar>
			<div slot="left" class="back" @click="backClicj">
				<img src="~assets/img/common/back.svg" />
			</div>
			<div slot="center" class="title">
				<div v-for="(item,index) in titles" :key="index" class="title_item"
				:class="{active:index === currentIndex}" @click="titleClick(index)">
					{{item}}
				</div>
			</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/Navbar.vue"
	export default {
		data(){
			return {
				titles:["商品","参数","评价","推荐"],
				currentIndex:0
			}
		},
		components:{
			NavBar
		},
		methods:{
			titleClick(index){
				this.currentIndex = index
				this.$emit("titleClick",index)
			},
			backClicj(){
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
	.title{
		display: flex;
		font-size: 13px;
	}
	.title_item{
		flex: 1;
	}
	.active{
		color: var(--color-high-text);
	}
	.back img{
		margin-top: 12px;
		margin-right: 10px;
	}
</style>
