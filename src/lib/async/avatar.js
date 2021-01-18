import AsyncLoading from 'async_loading';
import store from '../../storage';
import axios from 'axios';
import { default_avatar } from '../static/value';
import { api_avatar } from '../static/api';

class AvatarLoading extends AsyncLoading {
    store(uid, url){
        store.commit('setAvatar',{ uid, url });
    }

    exist(uid){
        return store.getters.getAvatar(uid);
    }

    data(uid){
        return store.getters.getAvatar(uid);
    }

    async load(uid, resolve, reject){
        const { data } = await axios.post(`${api_avatar.route}?act=${api_avatar.act}&uid=${uid}`);
        if(data['data']['res'] === 666){
            resolve(data['data']['data']['face']);
        }else{
            reject(default_avatar);
        }
    }
}

const loader = new AvatarLoading(default_avatar);

export const loadAvatar = (...args) => loader.get(...args);