
import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import userInfo from './modules/userInfo'
import audioSecond from './modules/audioSecond'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userInfo,
    audioSecond
  },
  getters,
  plugins: [createPersistedState({
    // userInfo(val){
    //   return {
    //     user
    //   }
    // }
    // userInfo: (key, val) => {
    //   return localStorage.getItem('userInfo')
    // },
    // reducer (val) {
    //   return {
    //     userInfo: val.userInfo.userInfo
    //   }
    // }
    // console.log(key)
    // console.log(localStorage.getItem('userInfo'))
    // }
  })]
})

export default store
