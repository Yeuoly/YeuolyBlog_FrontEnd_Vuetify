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
    import { loadAvatar } from '../../lib/async/avatar';
    import { default_avatar } from '../../lib/static/value';

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
            },
            home : {
                default : false,
                type : Boolean
            }
        },
        methods : {
            async load(){
                this.url = this.uid === 0 ? default_avatar : await loadAvatar(this.uid);
            },
            to(){
                if(this.home){
                    this.$router.push({ name : 'home' });
                }else if(this.$route.name !== 'visit' || this.uid !== parseInt(this.$route.query.uid)){
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