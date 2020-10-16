<template>
	<div class="toast" v-show="isshow">
		<div>{{message}}</div>
	</div>
</template>

<script>

	export default {
		// props:{
		// 	message:{
		// 		type:String,
		// 		default:""
		// 	},
		// 	iSshow:{
		// 		type:Boolean,
		// 		default:false
		// 	}
		// },
		data(){
			return {
				message:"",
				isshow:false,
			}
		},
		methods:{
		
			show(message,duration){
				this.isshow = true
				this.message = message
				console.log(this.isshow)
				setTimeout(() => {
					this.isshow = false;
					this.message = ""
				},duration)
			}
		}
	}
</script>

<style scoped>
	.toast{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		padding: 8px 10px;
		background-color: rgba(0,0,0,.8);
		color: #fff;
		z-index: 10000;
	}
</style>
