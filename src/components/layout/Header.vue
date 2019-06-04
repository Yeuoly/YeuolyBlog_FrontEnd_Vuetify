<template>
    <VToolbar dark color="rgb(68, 68, 68)" height="50">
        <VBtn icon @click="openSideMenu">
            <YIcon class="__header-btn">
                caidan
            </YIcon>
        </VBtn>
        <VToolbarTitle>YeuolyBlog</VToolbarTitle>
        <VToolbarItems>
            <VBtn flat class="ml-1" @click="router('index')">
                主页
            </VBtn>
            <VBtn flat class="ml-1" @click="router('home')">
                我的主页
            </VBtn>
        </VToolbarItems>
    </VToolbar>
</template>

<script>
    import { communicate } from "../../communicate";
    import YIcon from "../common/YIcon";

    export default {
        name: "Header",
        components: {YIcon},
        methods : {
            router(name){
                this.$router.push({name : name});
            },
            openSideMenu(){
                communicate.$emit('openSideMenu');
            }
        }
    }
</script>

<style scoped>

    .__header-btn{
        font-size: 25px;
    }

</style>