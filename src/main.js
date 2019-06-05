import Vue from 'vue'
import './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'querystring'

//注册组件
import './components'

//加载应用
import App from './App.vue'

//安装路由
import router from './router'

//安装vuex
import store from './storage'

//使用axios

axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
Vue.use(VueAxios, axios);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

Vue.config.productionTip = false;

Vue.prototype.$qs = qs;

new Vue({
  router,
  store,
  axios,
  render: h => h(App),
}).$mount('#app');
