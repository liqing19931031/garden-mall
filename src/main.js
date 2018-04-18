import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueCookie from 'vue-cookie'
import { userInfo } from './api'
import { Button, Pagination, Checkbox, Icon, Autocomplete, Loading, Message, Notification, Steps, Step, Table, TableColumn, Input, Dialog, Select, Option, Carousel, CarouselItem, Cascader } from 'element-ui'
import { setStore, getStore } from '/utils/storage'
Vue.use(Button)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Autocomplete)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Cascader)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.use(infiniteScroll)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: 'static/images/load.gif'
  // attempt: 1
})
Vue.config.productionTip = false
const whiteList = ['/home', '/goods', '/login', '/register', '/goodsDetails', '/search', '/refreshsearch'] // 不需要登陆的页面
router.beforeEach(function (to, from, next) {
  // let params = {
  //   params: {
  //     token: getStore('token')
  //   }
  // }
  if (getStore('login')) {
    userInfo().then(res => {
      if (res.code === 1) {
        store.commit('UPDATE_USER', res.data)
      } else {
        setStore('login', false)
        if (whiteList.indexOf(to.path) !== -1) {
          next()
        } else {
          next('/login')
        }
      }
    })
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
  // userInfo(params).then(res => {
  //   if (res.result.state !== 1) { // 没登录
  //     if (whiteList.indexOf(to.path) !== -1) { // 白名单
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   } else {
  //     store.commit('RECORD_USERINFO', {info: res.result})
  //     if (to.path === '/login') { //  跳转到
  //       next({path: '/'})
  //     }
  //     next()
  //   }
  // })
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
