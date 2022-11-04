import { createApp } from 'vue'
import './assets/less/index.less'
import App from './App.vue'
import './api/mock.js'
import router from './router' //vue-router
import store from './store/index.js' //vuex
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //ele 图标

import api from './api/api.js'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  //element 图标配置
  app.component(key, component)
}

app.config.globalProperties.$api = api //挂载$api
store.commit('addMenu', router)
function checkRouter(path) {
  let hasCheck = router.getRoutes().filter((route) => route.path == path).length
  if (hasCheck) {
    return true
  } else {
    return false
  }
}

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (!checkRouter(to.path)) {
    next({ name: 'home' })
  } else {
    next()
  }
})

app.use(router).use(store)
app.mount('#app')
