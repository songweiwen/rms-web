const state = {
  audioSetting: {
    second: 15,
    enable: 0
  }
}
// JSON.parse(localStorage.getItem('audioSecond')) ||
const mutations = {
  SET_audioSetting: (state, item) => {
    // localStorage.setItem('audioSecond', JSON.stringify(item))
    console.log(item)
    state.audioSetting = item
    console.log(state)
  }
}

const actions = {
  audioSecond ({ commit }) {
    commit('SET_audioSetting', name)
  }
}

export default {
  namespaced: false,
  state,
  // getters,
  mutations,
  actions
}
