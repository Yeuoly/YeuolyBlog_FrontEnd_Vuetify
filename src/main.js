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

//解决router的路径报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

//启用cookie
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

//安装vuex
import store from './storage'

//加载路由
import routes from './routes/routes';

//加载工具类
import utils from './lib/utils';
Vue.prototype.$utils = utils;

//
import { state_user } from "./storage/userinfo";

//使用axios
//初始化数据
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.withCredentials = true;
axios.post('/v1/account/ordinary/action',qs.stringify({
  act : 0
})).then( response => {
  let _data = response.data;
  if(_data['data']['res'] === 666) {
    let data = _data['data']['data'];
    store.commit('setOnlineState',true);
    store.commit('setUserName',data['user_id']);
    store.commit('setLoginTime',data['login_time']);
    store.commit('setUid',data['user_uid']);
    store.commit('setUserClass',data['user_class']);
  }
}).finally(() => {
  let router = new VueRouter(routes);
  router.beforeEach( (to , from , next) => {
    let _next = null;
    to.matched.some( item => {
      if(!state_user.online && item.meta.login_required)
        _next = '/login';
      else if(state_user.online && item.meta.offline_required){
        _next = '/';
      }
    });
    if(_next)
      next(_next);
    else
      next();
  });

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
Vue.prototype.$qs = qs;