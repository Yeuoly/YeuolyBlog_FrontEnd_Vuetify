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

export const router = () => {
    //这里的逻辑可能比较科幻，所以也写一下，其实就是创建一个空对象，利用引用传参去主根里取$router
    const container = {};
    communicate.$emit('getRouter', container);
    return container.router;
};

export const AvatarLoadingCenter = {
    communicate : new Vue(),
    cache : Array(10000),
    load(uid){
        this.cache[uid] = true;
        axios.post(`v1/account/ordinary/action?act=3&uid=${uid}`).then( r => {
            const url = r.data['data']['data']['face'];
            store.commit('setAvatar',{ uid : uid , url : url });
            this.communicate.$emit('load-' + uid);
        });
    },
    get(uid) {
        if (!this.cache[uid]) {
            this.load(uid);
        }
    }
};