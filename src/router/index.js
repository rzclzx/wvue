import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/pages/index/index'], resolve)
    },
    {
      path: '/',
      name: 'trade',
      component: resolve => require(['@/pages/trade/index'], resolve)
    },
    {
      path: '/CookiePathTest',
      name: 'CookiePathTest',
      component: resolve => require(['@/pages/CookiePathTest/index'], resolve)
    }
  ]
})
