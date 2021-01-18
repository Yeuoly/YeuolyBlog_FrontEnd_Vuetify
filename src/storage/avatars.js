export default {
    state : {
        avatars : {}
    },
    mutations : {
        setAvatar(state,item){
            state.avatars[item.uid] = item.url;
        },
    },
    getters : {
        getAvatar : state => uid => state.avatars[uid]
    }
}