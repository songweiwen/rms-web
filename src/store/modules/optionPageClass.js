const state = {
  optionPageClass: []
}

const mutations = {
  SET_optionPageClass: (state, item) => {
    state.optionPageClass = item
  }
}

const actions = {
  optionPageClass ({ commit }) {
    commit('SET_optionPageClass', name)
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions
}
