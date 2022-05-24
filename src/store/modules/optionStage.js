const state = {
  optionStage: []
}

const mutations = {
  SET_optionStage: (state, item) => {
    state.optionStage = item
  }
}

const actions = {
  optionStage ({ commit }) {
    commit('SET_optionStage', name)
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions
}
