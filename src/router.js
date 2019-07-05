import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

//按需加载
const ViewIndex = () => import('./components/views/ViewIndex.vue');
const ViewLogin = () => import('./components/views/ViewLogin.vue');
const ViewSignIn = () => import('./components/views/ViewSignIn.vue');
const ViewHome = () => import('./components/views/ViewHome.vue');
const ViewEditor = () => import('./components/views/ViewEditor.vue');

const router = new VueRouter({
    mode : 'history',
    routes : [{
        name : 'index',
        path : '/',
        component : ViewIndex,
        meta : {
            keepAlive : true,
            login_required : false
        }
    },{
        name : 'login',
        path : '/login',
        component : ViewLogin,
        meta : {
            keepAlive : true,
            login_required : false,
            offline_required : true
        }
    },{
        name : 'signin',
        path : '/signin',
        component : ViewSignIn,
        meta : {
            keepAlive : true,
            login_required : false,
            offline_required : false
        }
    },{
        name : 'home',
        path : '/home',
        component : ViewHome,
        meta : {
            keepAlive : true,
            login_required : true,
            offline_required : false
        }
    },{
        name : 'editor',
        path : '/editor',
        component : ViewEditor,
        meta : {
            keepAlive : false,
            login_required : true,
            offline_required : false
        }
    }]
});

import { state_user } from "./storage/userinfo";
import { addOnlineHook } from "./storage/userinfo";

let first_loaded = false;


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
    next();
});

export default router;