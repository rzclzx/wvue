import { getInfo, logout } from '@/api/login'
import { buildMenus } from '@/api/menu'
import Cookies from 'js-cookie'
import menusConfig from '@/assets/config/menu'
import Layout from '@/views/layout/index'

let state = {
  user: {},
  userIsInit: false,
  menus: []
}

let mutations = {
  SET_MENUS(state, data) {
    state.menus = data;
  },
  SET_USER (state, data) {
    state.user = data || {};
    state.userIsInit = data ? true : false;
  }
}

let actions = {
  GetInfo ({ commit }, data) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        commit('SET_USER', res || {});
        resolve(res);
      }).catch(err => reject(err));
    })
  },
  LogOut ({ commit }, data) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        commit('SET_USER', null);
        Cookies.remove('token');
        resolve(res);
      }).catch(err => reject(err));
    })
  },
  LoadMenus ({ commit }, data) {
    return new Promise((resolve, reject) => {
      buildMenus().then(res => {
        // 实际需要concat   res
        let menus = menusConfig;
        menus = filterAsyncRouter(menus);
        commit('SET_MENUS', menus);
        resolve(menus);
      }).catch(err => reject(err));
    })
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter (routers) {
  return routers.filter(router => {
    if (router.component) {
      if (router.component === 'Layout') {
        // Layout组件特殊处理
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

function loadView (view) {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = state.user.roles;
    const permissionRoles = value;
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role);
    })

    if (!hasPermission) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}

export default {
  state,
  mutations,
  actions
}