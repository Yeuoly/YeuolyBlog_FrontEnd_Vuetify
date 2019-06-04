export default {
    computed : {
        userName(){
            return this.$store.getters.getUserName;
        },
        userAvatar(){
            return process.env.VUE_APP_API_ROOT +
                '/v1/account/avatar?uid=' + this.$store.getters.getUid;
        },
        defaultAvatar(){
            return this.$store.getters.getDefaultAvatar;
        },
    }
}