import Vue from 'vue'
import './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

//注册组件
import './components'

//加载应用
import App from './App.vue'

//安装路由
import router from './router'

//安装vuex
import store from './storage'

// 使用axios

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.headers = {
  "Content-Type": "application/json"
};

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  render: h => h(App),
}).$mount('#app');
