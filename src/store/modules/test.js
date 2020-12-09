let state = {
  num: 0,
  code: 0
}

let mutations = {
  SET_NUM (state, num) {
    state.num = num
  },
  SET_CODE (state, code) {
    state.code = code
  }
}

let actions = {
  setUserInfo ({ commit }, data) {
    // 处理异步或请求
  }
}

export default {
  state,
  mutations,
  actions
}