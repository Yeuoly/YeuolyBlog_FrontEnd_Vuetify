export default {
    state : {
        avatars : new Array(2000)
    },
    mutations : {
        setAvatar(state,item){
            state.avatars[item.uid] = item.url;
        },
    },
    getters : {
        getAvatar : state => uid => {
            return state.avatars[uid];
        }
    }
}