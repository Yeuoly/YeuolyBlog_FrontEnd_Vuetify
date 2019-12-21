export default {
    state : {
        cache : {}
    },
    mutations : {
        add( state , item ) {
            state[item.key] = item.val
        },
        remove( state , key ){
            delete state.key;
        }
    },
    getters : {
        get : state => key => {
            return state.key;
        }
    }
}