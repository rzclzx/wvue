import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      meta: { title: '登录', noCache: true },
      component: resolve => require(['@/views/login/index'], resolve),
      hidden: true
    },
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/views/main/index'], resolve)
    }
  ]
})
