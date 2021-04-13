const state = {
  audioSecond: 15
}
// JSON.parse(localStorage.getItem('audioSecond')) ||
const mutations = {
  SET_audioSecond: (state, item) => {
    // localStorage.setItem('audioSecond', JSON.stringify(item))
    console.log(item)
    state.audioSecond = item
    console.log(state)
  }
}

// const getters = {
//   getCatalog_id: (state) => {
//     state.audioSecond.audioSecond = localStorage.getItem('audioSecond')
//     return state.audioSecond.audioSecond
//   }
// }

const actions = {
  audioSecond ({ commit }) {
    commit('SET_audioSecond', name)
  }
}

export default {
  namespaced: false,
  state,
  // getters,
  mutations,
  actions
}
