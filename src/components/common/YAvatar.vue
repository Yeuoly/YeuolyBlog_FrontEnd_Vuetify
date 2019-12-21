<template>
    <VAvatar v-on="$listeners" v-bind="$attrs">
        <VImg v-if="url" :src="url"></VImg>
    </VAvatar>
</template>

<script>
    export default {
        name: "YAvatar",
        data(){
            return {
                url : ''
            }
        },
        props : {
            uid : {
                required : true,
                type : [ String, Number ]
            }
        },
        methods : {
            load(){
                const url_cache = this.$store.getters.getAvatar(this.uid);
                if(!url_cache){
                    this.axios.get(`v1/account/avatar&uid=${this.uid}`).then( r => {
                        const url = r.data['data']['data']['face'];
                        this.$store.commit('setAvatar',{ uid : this.uid , url : url });
                        this.url = url;
                    });
                }else{
                    this.url = url_cache;
                }
            }
        },
        mounted(){
            setTimeout(this.load,0);
        }
    }
</script>