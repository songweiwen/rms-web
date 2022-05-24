const state = {
  userInfo: {}
}
// JSON.parse(localStorage.getItem('userInfo')) ||
const mutations = {
  SET_userInfo: (state, item) => {
    // localStorage.setItem('userInfo', JSON.stringify(item))
    console.log(item)
    state.userInfo = item
    console.log(state)
  }
}

// const getters = {
//   getCatalog_id: (state) => {
//     state.userInfo.userInfo = localStorage.getItem('userInfo')
//     return state.userInfo.userInfo
//   }
// }

const actions = {
  userInfo ({ commit }) {
    commit('SET_userInfo', name)
  }
}

export default {
  namespaced: false,
  state,
  // getters,
  mutations,
  actions
}
