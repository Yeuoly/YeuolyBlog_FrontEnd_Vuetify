<template>
    <VToolbar dark color="rgb(68, 68, 68)" height="50">
        <YIcon class="__header-l-icon">caidan</YIcon>
        <VAvatar size="20">
            <VBtn small icon @click="openSideMenu">
                <VImg :src="userAvatar"></VImg>
            </VBtn>
        </VAvatar>
        <VToolbarTitle>YeuolyBlog</VToolbarTitle>
        <VSpacer />
        <VBtn v-if="hasSearcher" flat small fab @click="router('search')">
            <YIcon style="font-size: 20px">sousuo</YIcon>
        </VBtn>
    </VToolbar>
</template>

<script>
    import { communicate } from "../../communicate";
    import base from '../../mixins/base';
    import YIcon from "../common/YIcon";

    export default {
        name: "Header",
        mixins : [base],
        components: {YIcon},
        methods : {
            router(name){
                this.$router.push({name : name});
            },
            openSideMenu(){
                communicate.$emit('openSideMenu');
            }
        },
        computed : {
            hasSearcher(){
                return this.$route.name !== 'search';
            }
        }
    }
</script>

<style scoped>

    .__header-btn{
        font-size: 25px;
    }

    .__header-l-icon{
        font-size: 30px;
        padding-right: 10px;
        margin-left: -43px;
    }

    @media (max-width: 959px) {
        .__header-l-icon{
            margin-left: -35px;
        }
    }

</style>