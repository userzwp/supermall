import {debounce} from "./utils.js";
import {POP, NEW, SELL} from "./const";
import BackTop from "components/content/backTop/BackTop.vue"

export const itemListenerMixin = {
	data(){
		return {
			itemImgListener:null
		}
	},
	mounted(){
		const refresh = debounce(this.$refs.scroll.refresh,50)
		this.itemImgListener = ()=>{refresh(this.$route.path)}
		this.$bus.$on("itemImageLoad",this.itemImgListener)
		
	}
}

export const backTopMixin = {
	components:{
		BackTop
	},
	data(){
		return {
		isShowBackTop:false
		}
	},
	methods:{
		backClick(){
		  this.$refs.scroll.scrollTo(0,0,500)
		},
	}
}
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}