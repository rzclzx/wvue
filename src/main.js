import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import utils from '@/utils/utils'
import { bus } from '@/utils/bus'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$utils = utils;

Vue.prototype.$bus = bus;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
