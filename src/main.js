import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import utils from '@/utils/utils'
import { bus } from '@/utils/bus'
import name from '@/assets/config/name'
import columnsInit from '@/assets/config/columns'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/public.less'
import '@/styles/element.less'
import '@/styles/icon/iconfont.css'

columnsInit();

document.title = name.title

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
