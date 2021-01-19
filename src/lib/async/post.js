//这个文件处理博客预览的异步加载问题
import axios from 'axios';
import store from '../../storage';
import AsyncLoading from 'async_loading';
import { api_public_post } from '../static/api';
import { stringify } from 'querystring';

const default_resolve = error => ({
    title : '加载错误',
    content : error,
    user_uid : 8,
    user_id : 'YeuolyBlog',
    tags : [],
    time : 0,
    user_class : 3,
    followed : false,
});

class PostLoading extends AsyncLoading {
    store(pid, post){
        store.commit('insertPost', { pid, post });
    }

    exist(pid){
        return store.getters.getPost(pid);
    }

    data(pid){
        return store.getters.getPost(pid);
    }

    async load(pid, resolve, reject){
        const { data } = await axios.post(api_public_post.route, stringify({
            post_id : pid,
            act : api_public_post.act
        }));
        if(data['data']['res'] === 666){
            resolve(data['data']['data']);
        }else{
            reject(default_resolve(data['data']['error']));
        }
    }
}

const loader = new PostLoading(default_resolve('未知错误'));

export const loadBlog = (...args) => loader.get(...args);

export const loadBlogDirective = (pid, blog) => loader.store(pid, blog);