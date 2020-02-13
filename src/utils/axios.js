import Vue from 'vue'
// 引入axios
import Axios from 'axios'
// 给axios配置公共跟地址
Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
Vue.prototype.$axios = Axios
