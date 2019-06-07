import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

//按需加载
const ViewIndex = () => import('./components/views/ViewIndex.vue');
const ViewLogin = () => import('./components/views/ViewLogin.vue');
const ViewSignIn = () => import('./components/views/ViewSignIn.vue');
const ViewHome = () => import('./components/views/ViewHome.vue');
const ViewEditor = () => import('./components/views/ViewEditor.vue');

export default new VueRouter({
    mode : 'history',
    routes : [{
        name : 'index',
        path : '/',
        component : ViewIndex
    },{
        name : 'login',
        path : '/login',
        component : ViewLogin
    },{
        name : 'signin',
        path : '/signin',
        component : ViewSignIn
    },{
        name : 'home',
        path : '/home',
        component : ViewHome,
        meta : {
            keepAlive : true
        }
    },{
        name : 'editor',
        path : '/editor',
        component : ViewEditor,
    }]
});