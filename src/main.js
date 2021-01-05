import Vue from 'vue'
import './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'querystring'

//加载应用
import App from './App.vue'

//启用router
import VueRouter from 'vue-router'
Vue.use(VueRouter);

//启用cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

//安装vuex
import store from './storage'

//加载路由
import routes from './router/router';

//加载工具类
import utils from './lib/utils';
Vue.prototype.$utils = utils;

//
import { state_user } from "./storage/userinfo";

//
import { beforeHook } from "./router/router";

//安装图片预览插件，由于YeuolyBlog的特殊性，这个插件最终选择了VuePreview的1.0.4，高版本不行
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//使用axios
//初始化数据
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.withCredentials = true;
axios.post('/v1/account/ordinary/action',qs.stringify({
  act : 0
})).then( response => {
  const _data = response.data;
  if(_data['data']['res'] === 666) {
    const data = _data['data']['data'];
    store.commit('setOnlineState',true);
    store.commit('setUserName',data['user_id']);
    store.commit('setLoginTime',data['login_time']);
    store.commit('setUid',data['user_uid']);
    store.commit('setUserClass',data['user_class']);
    store.commit('setEmail',data['user_email']);
  }
}).finally(() => {
  //初始化router
  const router = new VueRouter(routes);
  router.beforeEach(beforeHook);

  //实例化Vue
  new Vue({
    router,
    store,
    axios,
    render: h => h(App),
  }).$mount('#app');
});

Vue.use(VueAxios, axios);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
Vue.prototype.$qs = qs;