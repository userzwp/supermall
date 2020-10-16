<template>
	<div id="detail">
	<detail-nav-bar class="detail_navbar" @titleClick="titleClick" 
	ref="nav"></detail-nav-bar>
	 <scrolls class="content" ref="scroll" @scroll="contentScroll" 
	 :probeType="3">
	<detail-swiper :topImages="topImages"></detail-swiper>
	<detail-base-info :goods="goods"></detail-base-info>
	<detail-shop-info :shop="shop"></detail-shop-info>
	<detail-goods-info :detailInfo="detailInfo" 
	@imageLoad="imageLoad"></detail-goods-info>
	<detai-param-info :paramInfo="paramInfo" ref="params"></detai-param-info>
	<detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
	<goods-list :goods="recommends" ref="recommend"></goods-list>
    </scrolls>

	<detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
	<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import DetailNavBar from "./childComps/DetailNavBar.vue"
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail.js"
	import DetailSwiper from "./childComps/DetailSwiper.vue"
	import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
	import DetailShopInfo from "./childComps/DetailShopInfo.vue"
	import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
	import DetaiParamInfo from "./childComps/DetaiParamInfo.vue"
    import Scrolls from "../../components/common/scroll/Scroll.vue"
	import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
	import GoodsList from "components/content/goods/GoodsList.vue"
	import {itemListenerMixin,backTopMixin} from "common/mixin.js"
	import DetailBottomBar from "./childComps/DetailBottomBar.vue"
	// import backtop from "components/content/backTop/BackTop.vue"
	import {mapActions} from "vuex"
	import {debounce} from "common/utils.js"
	export default{
		name:"Detail",
		data(){
			return{
				iid:null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{},
				paramInfo:{},
				commentInfo:{},
				recommends:[],
				// itemImgListener:null
				themeTopYs:[],
				currentIndex:0,
			
			}
		},
		mixins:[itemListenerMixin,backTopMixin],
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetaiParamInfo,
			DetailCommentInfo,
			GoodsList,
			Scrolls,
			DetailBottomBar,
			// backtop
		},
		created() {
	        this.iid = this.$route.params.id
			getDetail(this.iid).then(res=>{
				this.topImages = res.result.itemInfo.topImages
				const data = res.result
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				this.shop = new Shop(data.shopInfo)
				this.detailInfo = data.detailInfo
				this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
				// this.$nextTick(() => {
				// 	this.themeTopYs = []
				// 	this.themeTopYs.push(0)
				// 	this.themeTopYs.push(this.$refs.params.$el.offsetTop)
				// 	this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
				// 	this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
				// 	console.log(this.themeTopYs)
				// })
			})
			getRecommend().then(res => {
				this.recommends = res.data.list
			})
		    
		},
		methods:{
			...mapActions(["addCart"]),
			imageLoad(){
			   this.$refs.scroll.refresh()
			   this.themeTopYs = []
			   this.themeTopYs.push(0)
			   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
			   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
			   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
			   this.themeTopYs.push(Number.MAX_VALUE)
			
			},
			// debounce(func,delay){
			// 	let timer = null
			// 	return function(...args){
			// 		if(timer) clearTimeout(timer)
			// 		timer = setTimeout(()=>{
			// 			func.apply(this,args)
			// 		},delay)
			// 	}
			// }
			titleClick(index){
				this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
			},
			contentScroll(position){
	            const positionY = -position.y
				let length = this.themeTopYs.length
				for(let i =0;i<length-1;i++){
				if(this.currentIndex !==i && (positionY >=this.themeTopYs[i] && positionY< 
				this.themeTopYs[i+1])){
					this.currentIndex = i
					this.$refs.nav.currentIndex = this.currentIndex
				}
				}
				this.isShowBackTop = (-position.y) > 1000
			},
			addToCart(){
			   const product ={}
			   product.image = this.topImages[0];
			   product.title = this.goods.title;
			   product.desc = this.goods.desc;
			   product.price = this.goods.realPrice;
			   product.iid = this.iid
			   this.$store.dispatch("addCart",product).then(res=>{
				    this.$toast.show(res,1500)
		
			   })
			   // this.addCart(product).then(res=>{
				  //  console.log(res)
			   // })
			}
	
		},
		mounted() {
			// const refresh = this.debounce(this.$refs.scroll.refresh,50)
			// this.$bus.$on("detailImageLoad",()=>{
			// 	refresh([1,2,3])
			// })
			// const refresh = this.debounce(this.$refs.scroll.refresh,50)
			// this.itemImgListener = ()=>{refresh(this.$route.path)}
			// this.$bus.$on("itemImageLoad",this.itemImgListener)

		},
		destroyed(){
			this.$bus.$off("itemImageLoad",this.itemImgListener)
		}
	}
</script>

<style scoped>
	#detail{
		position: relative;
	    z-index: 9;
		background-color: white;
		height: 100vh;
	}
	.detail_navbar{
		position: relative;
		z-index: 9;
		background-color: white;
	}
	.content{
     height: calc(100vh - 98px);
	
	}
</style>
