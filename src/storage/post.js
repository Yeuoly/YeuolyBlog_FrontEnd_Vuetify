export default {
    state : {
        posts : {}
    },
    mutations : {
        insertPost(state, { pid, post }){
            state.posts[pid] = post;
        },
    },
    getters : {
        getPost : state => uid => {
            return state.posts[uid];
        }
    }
}