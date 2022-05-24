
import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import userInfo from './modules/userInfo'
import audioSetting from './modules/audioSetting'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userInfo,
    audioSetting
  },
  getters,
  plugins: [createPersistedState({
    // reducer (val) {
    //   return {
    //     // 只储存state中的count
    //     userInfo: val.userInfo
    //   }
    // }
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
