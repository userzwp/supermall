<template>
<swiper class="swiper" :options="swiperOption">
   <swiper-slide v-for="item in topImages">
            <img :src="item" >
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
	     topImages:{
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
				
			 }
			 }
		
		
	}
    
</script>


<style scoped>
	.swiper{
		height: 200px;
	}
.swiper img{
  width:100%;
 
}
</style>
