import Vue from 'vue'
import store from './storage'
import axios from 'axios'

export const communicate = new Vue();

export const messageBox = (title,msg,sub,type,hook) => {
    communicate.$emit('messageBox',title,msg,sub,type,hook || null);
};

export const openLoadingOverlay = () => {
    communicate.$emit('openLoadingOverlay');
};

export const closeLoadingOverlay = () => {
    communicate.$emit('closeLoadingOverlay');
};

export const AvatarLoadingCenter = {
    communicate : new Vue(),
    cache : Array(10000),
    load(uid){
        this.cache[uid] = true;
        axios.post(`v1/account/ordinary/action?act=3&uid=${uid}`).then( r => {
            const url = r.data['data']['data']['face'];
            store.commit('setAvatar',{ uid : uid , url : url });
            this.communicate.$emit('load');
        });
    },
    get(uid) {
        if (!this.cache[uid]) {
            this.load(uid);
        }
    }
};