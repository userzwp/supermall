<template>
  <div id="app">
	  <keep-alive exclude="Detail">
	  <router-view></router-view>
	  </keep-alive>
      <main-tab-bar></main-tab-bar>
	  <icon></icon>
	  <SvgIcon></SvgIcon>
  </div>
</template>
<script>
  import MainTabBar from "components/content/maintabbar/MainTabBar.vue"
  import Icon from "components/content/icon/Icon.vue"
  import SvgIcon from "components/content/icon/Svg.vue" 
	export default {
		components:{
		 MainTabBar,
		 Icon,
		 SvgIcon
		}
	}
</script>

<style>
@import "assets/css/base.css";

</style>
