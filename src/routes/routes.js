//按需加载
const ViewIndex = () => import('../components/views/ViewIndex.vue');
const ViewLogin = () => import('../components/views/ViewLogin.vue');
const ViewSignIn = () => import('../components/views/ViewSignIn.vue');
const ViewHome = () => import('../components/views/ViewHome.vue');
const ViewEditor = () => import('../components/views/ViewEditor.vue');
const ViewHistory = () => import('../components/views/ViewHistory.vue');
const ViewSetting = () => import('../components/views/ViewSetting.vue');
const ViewVisit = () => import('../components/views/ViewVisit.vue');
const ViewSearch = () => import('../components/views/ViewSearch.vue');

const NotFound = () => import('../components/views/View404.vue');

const ChangeAvatar = () => import('../components/views/setting/ViewSettingChangeAvatar.vue');
const EditAvatar = () => import('../components/views/setting/ViewSettingEditAvatar.vue');
const ChangePrivacy = () => import('../components/views/setting/ViewSettingChangePrivacy.vue');

const ViewTest = () => import('../components/items/Live2DGirl');

const setting_routes = [{
        name : 'st-avt-cg',
        path : '/setting/avatar-change',
        component : ChangeAvatar,
        meta : {
            login_required : true,
            offline_required : false,
            keepAlive : false,
            btns : {
                help : true,
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
                help : true,
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
                help : true,
                new_post : true,
                refresh : false
            }
        }
},];

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
                help : false,
                new_post : false,
                refresh : false
            }
        }
    },{
        name : 'test',
        path : '/test',
        component : ViewTest,
        meta : {
            keepAlive : true,
            login_required : false,
            btns : {
                help : false,
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
                help : true,
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
                help : true,
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
                help : true,
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
                help : true,
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
                help : true,
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
                help : true,
                new_post : true,
                refresh : false
            }
        },
        children : setting_routes
    },{
        name : 'visit',
        path : '/visit',
        component : ViewVisit,
        meta : {
            keepAlive : false,
            login_required : false,
            offline_required : false,
            btns : {
                help : true,
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
                help : true,
                new_post : false,
                refresh : false
            }
        }
    },{
        path : '*',
        component : NotFound,
        meta : {
            keepAlive : false,
            login_required : false,
            offline_required : false,
            btns : {
                help : true,
                new_post : false,
                refresh : false
            }
        }
    }],
};