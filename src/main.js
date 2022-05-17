// 引⼊ element 组件库
import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App.vue'
// 引入 mock
import './mock/index'
import router from './router'
import store from './store'
// 引⼊ element 主题⽂件（在全局样式⽂件中修改 element 主题后引⼊了，所以这里注释不要重复引入）
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

// 注册为 Vue 插件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
