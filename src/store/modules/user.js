import { getInfo, logout } from '@/api/login'
import { buildMenus } from '@/api/menu'
import Cookies from 'js-cookie'
import { filterAsyncRouter } from './permissing'

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
        let menus = [
          {
            name: '首页',
            path: 'dashboard',
            hidden: false,
            component: 'main/index',
            meta: {
              icon: '',
              noCache: false,
              title: '首页'
            }
          }
        ]
        menus = filterAsyncRouter(menus);
        commit('SET_MENUS', menus);
        resolve(menus);
      }).catch(err => reject(err));
    })
  }
}

export default {
  state,
  mutations,
  actions
}