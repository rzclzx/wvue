import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import initAxios from './assets/js/axios'


import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI)

// 挂载axios
initAxios();

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
