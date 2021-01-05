//按需加载
import {state_user} from "../storage/userinfo";

const ViewInfo = () => import('../components/views/ViewInfo.vue');
const ViewLogin = () => import('../components/views/ViewLogin.vue');
const ViewSignIn = () => import('../components/views/ViewSignIn.vue');
const ViewHome = () => import('../components/views/ViewHome.vue');
const ViewEditor = () => import('../components/views/ViewEditor.vue');
const ViewHistory = () => import('../components/views/ViewHistory.vue');
const ViewSetting = () => import('../components/views/ViewSetting.vue');
const ViewSearch = () => import('../components/views/ViewSearch.vue');
const ViewAdminDashBoard = () => import('../components/views/ViewAdmin.vue');
const ViewPostPage = () => import('../components/views/ViewPostPage.vue');

import ViewIndex from '../components/views/ViewIndex';
import ViewNotFound from '../components/views/View404.vue';
import ViewSettingBaseInfo from "../components/views/setting/ViewSettingBaseInfo";

const ChangeAvatar = () => import('../components/views/setting/ViewSettingChangeAvatar.vue');
const EditAvatar = () => import('../components/views/setting/ViewSettingEditAvatar.vue');
const ChangePrivacy = () => import('../components/views/setting/ViewSettingChangePrivacy.vue');
const Live2DModel = () => import('../components/views/setting/ViewSettingLive2DModel.vue');
const BaseInfoSetting = () => import('../components/views/setting/ViewSettingBaseInfo.vue');

const setting_routes = [
    {
        name : 'st-avt-cg',
        path : '/setting/avatar-change',
        component : ChangeAvatar,
        meta : {
            login_required : true,
            offline_required : false,
            keepAlive : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : false
            }
        }
    },{
        name : 'st-avt-et',
        path : '/setting/avatar-edit',
        component : EditAvatar,
        meta : {
            login_required : true,
            offline_required : false,
            keepAlive : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : false
            }
        }
    },{
        name : 'st-pri-cg',
        path : '/setting/privacy-change',
        component : ChangePrivacy,
        meta : {
            login_required : true,
            offline_required : false,
            keepAlive : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : false
            }
        },
    }, {
        name: 'st-l2-cg',
        path: '/setting/live2d',
        component: Live2DModel,
        meta: {
            login_required: true,
            offline_required: false,
            keepAlive: false,
            btns: {
                helper: true,
                new_post: true,
                refresh: false
            }
        },
    },{
        name : 'st-bi-et',
        path : '/setting/base-info',
        component : ViewSettingBaseInfo,
        meta : {
            login_required : true,
            offline_required : false,
            keepAlive : false,
            btns : {
                helper : true,
                new_post : true,
                refresh : false
            }
        },
    }
];

const admin_routes = [];

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

