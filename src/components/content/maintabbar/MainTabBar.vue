<template>
	<tab-bar>
		<tab-bar-item path="/home">
			<img src="~assets/img/tabbar/home.svg"  slot="image"/>
			<img src="~assets/img/tabbar/home_active.svg"  slot="active_image"/>
			<div slot="text">首页</div>
		</tab-bar-item>
		<tab-bar-item path="/category">
			<img src="~assets/img/tabbar/category.svg" slot="image"/>
			<img src="~assets/img/tabbar/category_active.svg"  slot="active_image"/>
			
			<div slot="text">分类</div>
		</tab-bar-item>
		<tab-bar-item path="/cart">
			<img src="~assets/img/tabbar/cart.svg" slot="image"/>
			<img src="~assets/img/tabbar/cart_active.svg"  slot="active_image"/>
			
			<div  slot="text">购物车</div>
		</tab-bar-item>
		<tab-bar-item path="/profile">
		<img src="~assets/img/tabbar/profile.svg" slot="image"/>
		<img src="~assets/img/tabbar/profile_active.svg"  slot="active_image"/>
		<div slot="text">个人</div>
		</tab-bar-item>
	</tab-bar>
</template>
<script>
  import TabBar from "components/common/tabbar/TabBar.vue"
  import TabBarItem from "components/common/tabbar/TabBarItem.vue"
	export default {
		components:{
		TabBar,
		TabBarItem
		}
	}
</script>