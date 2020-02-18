import Vue from 'vue';
import router from 'vue-router';
// 引入大数字处理插件
import JSONBig from 'json-bigint';
// 引入axios
import Axios from 'axios';
// 给axios配置公共跟地址
Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0';
// 请求拦截器
Axios.interceptors.request.use(function (config) {
  // config是对象，可以进行配置
  var token = window.sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  };
  return config;
}, function (error) {
  return Promise.reject(error);
});

Axios.defaults.transformResponse = [function (data) {
  if (data) {
    return JSONBig.parse(data);
  } else {
    return data;
  };
}]
// 响应拦截器
Axios.interceptors.response.use(function (response) {
  // response是服务器返回的信息
  return response;
}, function (error) {
  // 处理401
  if (error.response.status === 401) {
    // 重新登录
    router.push({ path: '/login' });
  };
  return Promise.reject(error);
});

Vue.prototype.$axios = Axios;
