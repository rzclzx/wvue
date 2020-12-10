import Layout from '@/views/layout/index'
let state = {
  
}

let mutations = {
  
}

let actions = {
  
}

export function filterAsyncRouter (routers) { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
}

export function loadView (view) {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default {
  state,
  mutations,
  actions
}