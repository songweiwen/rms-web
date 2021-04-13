// element-ui.js
import 'element-ui/lib/theme-chalk/index.css'
// import { Loading } from 'element-ui'
import Vue from 'vue'
import {
  Alert,
  Aside,
  Header,
  MenuItemGroup,
  Form,
  FormItem,
  Row,
  Col,
  Card,
  Main,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Image,
  Button,
  Input,
  Menu,
  MenuItem,
  Submenu,
  Switch,
  Backtop,
  Icon,
  Select,
  Option,
  Dialog,
  Loading,
  Message,
  MessageBox,
  Popconfirm,
  Table,
  TableColumn,
  Tag,
  TabPane,
  Tree,
  Tabs,
  // msgbox
  Pagination,
  Notification
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

const components = [
  Alert,
  Aside,
  Header,
  MenuItemGroup,
  Form,
  FormItem,
  Row,
  Col,
  Card,
  Main,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Image,
  Button,
  Input,
  Menu,
  MenuItem,
  Submenu,
  Switch,
  Backtop,
  Icon,
  Select,
  Option,
  Dialog,
  Popconfirm,
  Table,
  TableColumn,
  Tag,
  TabPane,
  Tree,
  Tabs,
  // Message
  // MessageBox
  Pagination
  // Notification
]

const Element = {
  install (Vue) {
    components.forEach(component => {
      // console.log(component)
      // debugger
      Vue.component(component.name, component)
    })
  }
}
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox
// Vue.use(Notification)
Vue.prototype.$notify = Notification
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
// if (process.BROWSER_BUILD) {
// Vue.use(require('element-ui'))
Vue.use(Element, { locale })
// }
