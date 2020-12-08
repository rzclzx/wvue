let state = {
  user: {}
}

let mutations = {
  SET_USER (state, data) {
    state.user = data
  }
}

export default {
  state,
  mutations
}