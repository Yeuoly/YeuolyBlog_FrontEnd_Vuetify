export default {
    state : {
        online : false,
        name : '游客',
        uid : Number(),
        class : Number(),
        exp : Number(),
        login_time : Number()
    },
    mutations : {
        setOnlineState(state,val){
            state.online = val
        },
        setUserName(state,name){
            state.name = name;
        },
        setUid(state,uid){
            state.uid = uid;
        },
        setExp(state,exp){
            state.exp = exp;
        },
        setLoginTime(state,loginTime){
            state.login_time = loginTime;
        }
    },
    getters : {
        getUserName(state){
            return state.name;
        },
        getOnlineState(state){
            return state.online;
        },
        getUid(state){
            return state.uid;
        },
        getClass(state){
            return state.class;
        },
        getExp(state){
            return state.exp;
        },
        getLoginTime(state){
            return state.login_time;
        }
    }
}