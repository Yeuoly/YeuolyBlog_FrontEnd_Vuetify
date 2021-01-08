//这个文件处理博客预览的异步加载问题
import axios from 'axios';
import store from '../../storage';
import { stringify } from 'querystring';

const cache = [];
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

const insertBlog = (pid, post) => {
    store.commit('insertPost', { pid, post });
    for(const i of cache){
        if(i.pid === pid){
            i.resolve(post);
        }
    }
}

const loadBlogBase = async pid => {
    try{
        const { data } = await axios.post('v1/post/public/action', stringify({
            post_id : pid,
            act : 4
        }));
        if(data['data']['res'] === 666){
            const post = data['data']['data'];
            insertBlog(pid, post);
        }else{
            insertBlog(pid, default_resolve(data['data']['error']));
        }
    }catch(e){
        insertBlog(pid, default_resolve('未知原因'));
    }
}

export const loadBlog = pid => new Promise(async resolve => {
    const post = store.getters.getPost(pid);
    //如果已经加载过了，就直接返回，否则丢进队列
    if(post){
        resolve(post);
    }else{
        cache.push({ pid, resolve });
        loadBlogBase(pid);
    }
});