<template>
	<div id="cart">
		<nav-bar class="cart_navbar">
			<div slot="center" >购物车({{cartLength}})</div>
		</nav-bar>
		<div v-if="cartLength">
	  <cart-list></cart-list>
	  <cart-botton-bar></cart-botton-bar>
	  </div>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/Navbar.vue"
	import { mapGetters } from "vuex"
    import CartList from "./childComps/CartList.vue"
    import CartBottonBar from "./childComps/CartBottonBar.vue"
	export default{
		components:{
			NavBar,
			CartList,
			CartBottonBar
		},
		computed:{
		    ...mapGetters(["cartList","cartLength"])
		},
	}
</script>

<style scoped>
	#cart{
		height: 100vh;
	}
	.cart_navbar{
		background-color: var(--color-high-text);
		color: white;
		z-index: 9999;
	}

</style>
