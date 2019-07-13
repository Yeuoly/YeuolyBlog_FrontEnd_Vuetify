//按需加载
const ViewIndex = () => import('./components/views/ViewIndex.vue');
const ViewLogin = () => import('./components/views/ViewLogin.vue');
const ViewSignIn = () => import('./components/views/ViewSignIn.vue');
const ViewHome = () => import('./components/views/ViewHome.vue');
const ViewEditor = () => import('./components/views/ViewEditor.vue');
const ViewHistory = () => import('./components/views/ViewHistory.vue');

export default {
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
    },{
        name : 'history',
        path : '/devlog',
        component : ViewHistory,
        meta : {
            keepAlive : false,
            login_required : false,
            offline_required : false
        }
    }]
};