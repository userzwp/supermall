<template>
<swiper class="swiper" :options="swiperOption">
   <swiper-slide v-for="item in banners" >
       <a :href="item.link">
            <img :src="item.image" @load="imageLoad">
        </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>


<script>
	import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'
    export default {
      components: {
        Swiper,
        SwiperSlide
      },
	  props:{
	     banners:{
	      type:Array,
	     }
		 },
      directives: {
        swiper: directive
      },
	   data() {
	        return {
	          swiperOption: {
	            pagination: {
	              el: '.swiper-pagination',
	              type: 'fraction'
	            },
	            
				autoplay: {
				delay: 2000,
				disableOnInteraction:false
				},
				loop: true,
				speed: 900,
				notNextTick: true,
	         },
			    isLoad:false,
				isLoade:false,
			 }
			 },
			 methods:{
				 imageLoad(){
					 if(!this.isLoade){
						 this.$emit("imageLoad")
						 this.isLoade = true
					 }
					
				 }
			 }
	}
    
</script>


<style scoped>
.swiper img{
  width:100%;
  height: 100%;
 
}
</style>
