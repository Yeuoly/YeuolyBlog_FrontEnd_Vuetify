<template>
    <VToolbar dark color="rgb(68, 68, 68)" height="50">
        <VIcon class="__header-l-icon">mdi-menu</VIcon>
        <YAvatar size="35" @click="openSideMenu" :uid="userUid" class="clickable" />
        <VToolbarTitle>YeuolyBlog</VToolbarTitle>
        <VSpacer />
        <VBtn v-if="hasSearcher" flat small fab @click="router('search')">
            <VIcon style="font-size: 25px">mdi-magnify</VIcon>
        </VBtn>
    </VToolbar>
</template>

<script>
    import { communicate } from "../../communicate";
    import base from '../../mixins/base';
    import YAvatar from "../common/YAvatar";

    export default {
        name: "Header",
        mixins : [base],
        components: {YAvatar},
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
        font-size: 25px;
        padding-right: 10px;
        margin-left: -39px;
    }

    @media (max-width: 959px) {
        .__header-l-icon{
            margin-left: -33px;
        }
    }

</style>