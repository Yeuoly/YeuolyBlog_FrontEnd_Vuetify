<template>
    <div v-if="magic_door">
        <VAvatar class="clickable" v-on="$listeners" v-bind="$attrs" @click="to">
            <VImg v-if="url" :src="url"></VImg>
        </VAvatar>
    </div>
    <div v-else>
        <VAvatar v-on="$listeners" v-bind="$attrs">
            <VImg v-if="url" :src="url"></VImg>
        </VAvatar>
    </div>
</template>

<script>
    import { AvatarLoadingCenter } from "../../communicate";

    export default {
        name : "YAvatar",
        data : () => ({
            url : ''
        }),
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
            set(){
                this.url = this.$store.getters.getAvatar(this.uid);
                AvatarLoadingCenter.communicate.$off('load',this.set);
            },
            load(){
                const url_cache = this.$store.getters.getAvatar(this.uid);
                if(!url_cache){
                    AvatarLoadingCenter.communicate.$on('load', this.set);
                    AvatarLoadingCenter.get(this.uid);
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