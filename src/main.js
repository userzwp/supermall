import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from "components/common/toast"
Vue.use(toast)

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

import FastClick from "fastclick"
FastClick.attach(document.body)

import VueLazyLoad from "vue-lazyload"
Vue.use(VueLazyLoad,{
	// loading:import()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
