const ViewSettingBaseInfo = () => import("../views/setting/ViewSettingBaseInfo");
const ChangeAvatar = () => import('../views/setting/ViewSettingChangeAvatar.vue');
const EditAvatar = () => import('../views/setting/ViewSettingEditAvatar.vue');
const ChangePrivacy = () => import('../views/setting/ViewSettingChangePrivacy.vue');
const Live2DModel = () => import('../views/setting/ViewSettingLive2DModel.vue');
const BaseInfoSetting = () => import('../views/setting/ViewSettingBaseInfo.vue');

export default [
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