import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Cookies from 'js-cookie'
import name from '@/assets/config/name'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),// 刷新白屏问题
  base: '/',
  routes: []
})

// 路由守卫

const whiteList = ['/login']

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + name.title
  }
  NProgress.start()
  if (Cookies.get('token')) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (!store.state.user.userIsInit) {
        store.dispatch('GetInfo').then(res => {
          store.dispatch('LoadMenus').then(menus => {
            router.addRoutes(menus)
            next({ ...to, replace: true })
          })
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
