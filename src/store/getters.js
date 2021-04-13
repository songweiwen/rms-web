const getStoryage = (item) => {
  const str = localStorage.getItem(item)
  return JSON.parse(str)
}
const getters = {
  userInfo: (state) => {
    console.log(state.userInfo)
    return state.userInfo ? state.userInfo : getStoryage('userInfo')
  },

  audioSecond: (state) => {
    console.log(state.userInfo)
    return state.audioSecond.audioSecond
  }
  // optionPageClass: state => state.optionPageClass.optionPageClass
  // userInfo: state => state.userInfo.userInfo
  // userInfo: (state) => {
  //   state.userInfo.userInfo = localStorage.getItem('userInfo')
  //   return state.userInfo.userInfo
  // }
}
export default getters
