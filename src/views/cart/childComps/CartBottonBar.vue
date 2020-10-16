<template>
	<div class="bottom-bar">
		<div class="check-content">
		<check-button class="check-button" 
		:is-checked="isSelectAll"
		@click.native="checkClick"></check-button>
		<span>全选</span>
		</div>
		<div class="price">
			合计:{{totalPrice}}
		</div>
		<div class="calculate">
			去计算: {{checkLength}}
		</div>
	</div>
</template>

<script>
	import CheckButton from "components/content/checkButton/CheckButton.vue"
	import { mapGetters } from "vuex"
	export default {
		components:{
			CheckButton,
		},
		computed:{
			...mapGetters(["cartList"]),
			totalPrice(){
				return "￥" + this.cartList.filter(item =>{
					return item.checked
				}).reduce((preValue,item) => {
					return  preValue + item.price * item.count
				},0).toFixed(2)
			},
			checkLength(){
				return this.cartList.filter(item =>item.checked).length
			},
			isSelectAll(){
				if(this.cartList.length ===0) return false
				for(let item of this.cartList){
					if(!item.checked){
						return false
					}
				}
				return true 
			}
		},
		methods:{
			checkClick(){
				if(this.isSelectAll){
					this.cartList.forEach(item => item.checked = false)
				}else{
					this.cartList.forEach(item => item.checked = true)
				}
			}
		}
	}
</script>

<style scoped>
	.bottom-bar {
		height: 40px;
		background-color:#eee;
		position: relative;
	    line-height: 40px;
		display: flex;
		font-size: 14px;
		z-index: 999;
		right: 0;
		left: 0;
		bottom:0px;
		
	}
	.check-content {
		display: flex;
		margin-left: 10px;
		align-items: center;
	    width: 60px;
	}
	.check-button{
		height: 22px;
		width: 22px;
		line-height: 20px;
		margin-right: 5px;
	
	}
	.price{
		margin-left: 20px;
		flex: 1;
	}
	.calculate{
		width: 90px;
		background: red;
		color: #fff;
		text-align: center;
	}
	
</style>
