export default {
    computed : {
        userName(){
            return this.$store.getters.getUserName;
        },
        userAvatar(){
            return process.env.VUE_APP_API_ROOT +
                '/v1/account/avatar?size=75&uid=' + this.$store.getters.getUid;
        },
        userOnline(){
            return this.$store.getters.getOnlineState;
        },
        userUid(){
            return this.$store.getters.getUid;
        }
    }
}