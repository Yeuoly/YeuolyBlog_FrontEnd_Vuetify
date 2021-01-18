import { state_user } from "../storage/userinfo";
import setting_routes from './setting_views';
import admin_routes from './admin_views';

//按需加载
const ViewInfo = () => import('../views/ViewInfo.vue');
const ViewLogin = () => import('../views/ViewLogin.vue');
const ViewSignIn = () => import('../views/ViewSignIn.vue');
const ViewHome = () => import('../views/ViewHome.vue');
const ViewEditor = () => import('../views/ViewEditor.vue');
const ViewHistory = () => import('../views/ViewHistory.vue');
const ViewSetting = () => import('../views/ViewSetting.vue');
const ViewSearch = () => import('../views/ViewSearch.vue');
const ViewPostPage = () => import('../views/ViewPostPage.vue');
const ViewIndex = () => import('../views/ViewIndex');
const ViewNotFound = () => import('../views/View404.vue');
const ViewAdminDashBoard = () => import('../views/ViewAdmin.vue');

export default {
    mode : 'history',
    routes : [{
        name : 'index',
        path : '/',
        component : ViewIndex,
        meta : {
            keepAlive : true,
            login_required : false,
            btns : {
                helper : false,
                new_post : false,
                refresh : false
            }
        }
    },{
        name : 'info',
        path : '/info',
        component : ViewInfo,
        meta : {
            keepAlive : true,
            login_required : false,
            btns : {
                helper : false,
                new_post : false,
                refresh : false
            }
        }
    },{
        name : 'login',
        path : '/login',
        component : ViewLogin,
        meta : {
            keepAlive : true,
            login_required : false,
            offline_required : true,
            btns : {
                helper : true,
                new_post : false,
                refresh : false
            }
        }
    },{
        name : 'signin',
        path : '/signin',
        component : ViewSignIn,
        meta : {
            keepAlive : true,
            login_required : false,
            offline_required : false,
            btns : {
                helper : true,
                new_post : false,
                refresh : false
            }
        }
    },{
        name : 'home',
        path : '/home',
        component : ViewHome,
        meta : {
            keepAlive : true,
            login_required : true,
            offline_required : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : true
            }
        }
    },{
        name : 'editor',
        path : '/editor',
        component : ViewEditor,
        meta : {
            keepAlive : false,
            login_required : true,
            offline_required : false,
            btns : {
                helper : true,
                new_post : false,
                refresh : false
            }
        }
    },{
        name : 'history',
        path : '/devlog',
        component : ViewHistory,
        meta : {
            keepAlive : false,
            login_required : false,
            offline_required : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : false
            }
        }
    },{
        name : 'setting',
        path : '/setting',
        component : ViewSetting,
        meta : {
            keepAlive : false,
            login_required : true,
            offline_required : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : false
            }
        },
        children : setting_routes
    },{
        name : 'visit',
        path : '/visit',
        component : ViewHome,
        meta : {
            keepAlive : false,
            login_required : false,
            offline_required : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : false
            }
        }
    },{
        name : 'search',
        path : '/search',
        component : ViewSearch,
        meta : {
            keepAlive : true,
            login_required : false,
            offline_required : false,
            btns : {
                helper : true,
                new_post : false,
                refresh : false
            }
        }
    },{
        name : 'admin-dash-board',
        path : '/admin-dash-board',
        component : ViewAdminDashBoard,
        meta : {
            keepAlive : true,
            login_required : true,
            offline_required : false,
            btns : {
                helper : false,
                new_post : false,
                refresh : false
            }
        },
        children : admin_routes
    },{
        name : 'post-page',
        path : '/post-page',
        component : ViewPostPage,
        meta : {
            keepAlive : false,
            login_required : false,
            offline_required : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : false
            }
        }
    },{
        path : '*',
        component : ViewNotFound,
        meta : {
            keepAlive : false,
            login_required : false,
            offline_required : false,
            btns : {
                helper : true,
                new_post : false,
                refresh : false
            }
        }
    }],
};

export const beforeHook = (to , from , next) => {
    let _next = null;
    to.matched.some( item => {
        if(!state_user.online && item.meta.login_required)
            _next = '/login';
        else if(state_user.online && item.meta.offline_required){
            _next = '/';
        }
    });
    _next ? next(_next) : next();
};