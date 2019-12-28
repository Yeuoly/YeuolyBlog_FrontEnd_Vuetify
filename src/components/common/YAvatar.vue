<template>
    <div v-if="magic_door">
        <VAvatar class="clickable" v-on="$listeners" v-bind="$attrs" @click="to">
            <VImg v-if="url" :src="url"></VImg>
        </VAvatar>
    </div>
    <div v-else>
        <VAvatar class="clickable" v-on="$listeners" v-bind="$attrs">
            <VImg v-if="url" :src="url"></VImg>
        </VAvatar>
    </div>
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
            },
            magic_door : {
                default : false,
                type : Boolean
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
            },
            to(){
                if(this.$route.name !== 'visit' || this.uid !== parseInt(this.$route.query.uid)){
                    this.$router.push({ name : 'visit' , query : { uid : this.uid } });
                }
            }
        },
        watch : {
            uid(){
                this.load();
            }
        },
        mounted(){
            setTimeout(this.load,0);
        }
    }
</script>