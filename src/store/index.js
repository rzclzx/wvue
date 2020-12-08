// vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    test,
    user
  }
})
