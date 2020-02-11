import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // 要通过render成员对主模板容器进行渲染，会把app.vue组件文件内容获得并覆盖渲染给div#app主容器
  render: h => h(App)
}).$mount('#app')
