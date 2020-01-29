export default {
    computed : {
        userName(){
            return this.$store.getters.getUserName;
        },
        userOnline(){
            return this.$store.getters.getOnlineState;
        },
        userUid(){
            return this.$store.getters.getUid;
        }
    }
}