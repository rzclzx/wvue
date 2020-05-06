// vuex状态管理
import Vue from 'vue'
import Vuex from 'vuex'
// api
import admin from './modules/api/admin'
// data
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin,
    user
  }
})
