import card from './card'
// import wangeditor from './wangeditorAntd'
// import jumpType from './jumpType'

const components = [
  card
  // wangeditor,
  // jumpType
]
const install = function (Vue, opts = {}) {
  components.forEach((key) => {
    Vue.component(key.name, key)
  })
}
export default install
