import Vue from 'vue'
import Vuex from 'vuex'

import userinfo from './userinfo'

Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        userinfo : userinfo
    },
    state : {
        defaultAvatar : '',
        localhostApi : 'http://localhost:200/',
        remoteServerApi : 'https://api.ylday.srmxy.cn/',
        localhostImageUrl : 'http://localhost:100/website/pif_mana/img/',
        remoteServerImageUrl : 'https://img.srmxy.cn/ylday/'
    },
    getters : {
        getDefaultAvatar(state){
            return state.defaultAvatar;
        },
        getLocalApiUrl(state){
            return state.localhostApi;
        },
        getRemoteApiUrl(state){
            return state.remoteServerApi;
        },
        getLocalImgUrl(state){
            return state.localhostImageUrl;
        },
        getRemoteImgUrl(state){
            return state.remoteServerImageUrl;
        }
    }
});