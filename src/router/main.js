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

const setting_routes = [{
        name : 'st-avt-cg',
        path : '/setting/avatar-change',
        component : ChangeAvatar,
        meta : {
            login_required : true,
            offline_required : false,
            keepAlive : false
        }
},{
        name : 'st-avt-et',
        path : '/setting/avatar-edit',
        component : EditAvatar,
        meta : {
            login_required : true,
            offline_required : false,
            keepAlive : false
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
    },{
        name : 'setting',
        path : '/setting',
        component : ViewSetting,
        meta : {
            keepAlive : false,
            login_required : true,
            offline_required : false
        },
        children : setting_routes
    },{
        name : 'visit',
        path : '/visit',
        component : ViewVisit,
        meta : {
            keepAlive : false,
            login_required : false,
            offline_required : false
        }
    },{
        name : 'search',
        path : '/search',
        component : ViewSearch,
        meta : {
            keepAlive : true,
            login_required : false,
            offline_required : false
        }
    },{
        path : '*',
        component : NotFound,
        meta : {
            keepAlive : false,
            login_required : false,
            offline_required : false
        }
    }],
};