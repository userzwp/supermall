<template>
	<div class="tab_item" @click="itemClick">
	    <slot name="image" v-if="!isActive"></slot>
		<slot name="active_image" v-else></slot>
		<div :class="{active:isActive}"><slot name="text"></slot></div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
		       
			}
		},
		props:{
			path:String
		},
		methods:{
			itemClick(){
			this.$router.replace(this.path)
		    }
		},
		computed:{
			isActive(){
				// this.$route.path.indexOf(this.path) !== -1
				return this.$route.path === this.path
			}
		}
	
	}
</script>

<style scoped>
	.tab_item{
		height: 49px;
		flex: 1;
		text-align: center;
		font-size: 14px;
	}
	.tab_item img{
		width: 24px;
		height: 24px;
		vertical-align: middle;
		margin-top: 3px;
	}
	.active{
		color: red;
	}
</style>
	