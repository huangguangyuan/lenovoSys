import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vant from 'vant'
import Utile from './lib/utils'
import 'vant/lib/index.css';
import '@/assets/css/app.scss';
import 'amfe-flexible';
import '@/lib/validate.js'


Vue.config.productionTip = false
Vue.use(VueAxios,axios);
Vue.use(Vant);
Vue.use(Utile)


let myVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response);
  if(response.data.code === -1){
    router.replace({
      path: '/bespeakBinding' // 到登录页重新获取token
    })
  }else if(response.data.code === -2){
    router.replace({
      path: '/engineerBinding' // 到登录页重新获取token
    })
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

