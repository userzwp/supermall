<template>
	<div id="home">
		<navbar class="home_navbar">
			<div slot="center">购物车</div>
		</navbar>
		<tab-control :titles="['流行','新款','精选']"
		@tabClick="tabClick" ref="tabControl1"
		class="tab_control" v-show="isTabFixed"></tab-control>
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
		:pullUpLoad="true" @pullingUp="loadMore">
		<slide :banners="banners" @imageLoad="imageLoad"></slide>
		<recommend-view :recommend="recommends"></recommend-view>
		<fetrue-view></fetrue-view>
		<tab-control :titles="['流行','新款','精选']"
		@tabClick="tabClick" ref="tabControl" 
		:class="{fixed:isTabFixed}"></tab-control>
		<goods-list :goods="showGoods"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import Navbar from "components/common/navbar/Navbar.vue"
	import {getHomeMultidata,getHomeGoods} from "../../network/home.js"
	import Slide from "./swiper/Slide.vue"
	import RecommendView from "./childComps/RecommendView.vue"
	import FetrueView from "./childComps/FetrueView.vue"
	import TabControl from "components/content/tabcontrol/TabControl.vue"
	import GoodsList from "components/content/goods/GoodsList.vue"
	import Scroll from "components/common/scroll/Scroll.vue"
	// import BackTop from "components/content/backTop/BackTop.vue"
	import {itemListenerMixin,backTopMixin} from "common/mixin.js"
	export default {
		data(){
			return {
				banners:[],
				recommends:[],
				goods:{
					"pop":{page:0,list:[]},
					"new":{page:0,list:[]},
					"sell":{page:0,list:[]}
				},
				currentType:"pop",
				// isShowBackTop:false,
				tabOffsetTop:0,
				isTabFixed:false,
				saveY:0,
				// itemImgListener:null
			}
		},
		mixins:[itemListenerMixin,backTopMixin],
		components:{
			Navbar,
			Slide,
			RecommendView,
			FetrueView,
			TabControl,
			GoodsList,
			Scroll,
			// BackTop
		},
		created() {
		this.getHomeMultidata()
		this.getHomeGoods("pop")
		this.getHomeGoods("new")
		this.getHomeGoods("sell")
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		mounted() {
			// const refresh = this.debounce(this.$refs.scroll.refresh,50)
			// this.itemImgListener = ()=>{refresh(this.$route.path)}
			// this.$bus.$on("itemImageLoad",this.itemImgListener)
			// this.tabOffsetTop 
			
		},
		methods:{
			debounce(func,delay){
				let timer = null
				return function(...args){
					if(timer) clearTimeout(timer)
				    timer = setTimeout(()=>{
						func.apply(this,args)
					},delay)
				}
			},
			getHomeMultidata(){
				getHomeMultidata().then(res=>{
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods(type){
				const page = this.goods[type].page + 1
				getHomeGoods(type,page).then(res =>{
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page +=1
					this.$refs.scroll.finishPullUp()
				})
			},
			tabClick(index){
				switch(index){
					case 0:
					this.currentType = "pop";
					break;
					case 1:
					this.currentType = "new";
					break;
					case 2:
					this.currentType = "sell";
					break
				}
				this.$refs.tabControl1.currentIndex = index
				this.$refs.tabControl.currentIndex = index
			},
			// backClick(){
			//   this.$refs.scroll.scrollTo(0,0,500)
			// },
			contentScroll(position){
			this.isShowBackTop = (-position.y)> 1000
			this.isTabFixed = (-position.y)>this.tabOffsetTop
			},
			loadMore(){
				this.getHomeGoods(this.currentType)
			},
			imageLoad(){
				this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
				
			}
		},
		activated() {
			this.$refs.scroll.scrollTo(0,this.saveY,0)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			this.saveY = this.$refs.scroll.scroll.y
			this.$bus.$off("itemImageLoad",this.itemImgListener)
		}
	}
</script>

<style scoped>
	#home{
		padding-top: 44px;
		height: 100vh;
	}
	.home_navbar{
       background-color: var(--color-tint);
	   color: white;
	   position: fixed;
	   top: 0;
	   left: 0;
	   right: 0;
	   z-index: 11;
	}

	.content{
		height: calc(100vh - 93px);
		overflow: hidden;
	}
	.fixed{
	  position: fixed;
	  right: 0;
	  left: 0;
	  top: 44px;
	}
    .tab_control{
		position: relative;
		z-index: 999;
	}
</style>
