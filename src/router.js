import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

//按需加载
const ViewIndex = () => import('./components/views/ViewIndex');
const ViewLogin = () => import('./components/views/ViewLogin');
const ViewSignIn = () => import('./components/views/ViewSignIn');
const ViewHome = () => import('./components/views/ViewHome');

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
        component : ViewHome
    }]
});