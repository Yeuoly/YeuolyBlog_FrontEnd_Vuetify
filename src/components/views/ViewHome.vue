<template>
    <div>
        <PopDialog v-model="dialog_show" />
        <VLayout class="mt-4"
                 :class=" $vuetify.breakpoint.mdAndUp ? 'mx-5' : 'mx-0' "
                 :style="'min-height:' + ( $vuetify.breakpoint.height - 75 ) +'px'"
                 row
                 wrap
        >
            <VFlex sm12 xs12 md8 lg8>
                <HomePostCard v-for="(t , key) in postCollections"
                              :key="key"
                              :title="t.title"
                              :avatar="avatarUrl(t.user_uid)"
                              :user="t.user_name"
                              :introduction="t.introduction"
                              :text="t.text"
                              class="mb-3"
                />
            </VFlex>
            <VFlex sm12 xs12 md4 lg4 :class="$vuetify.breakpoint.mdAndUp ? 'pl-2' : 'pl-0'">
                <HomePostCardMini />
            </VFlex>
        </VLayout>
    </div>
</template>

<script>
    import popdialog from "../../mixins/popdialog";
    import HomePostCard from "../items/HomePostCard";

    import { communicate } from "../../communicate";
    import HomePostCardMini from "../items/HomePostCardMini";

    export default {
        name: "ViewHome",
        components: {HomePostCardMini, HomePostCard},
        mixins : [popdialog],
        methods : {
            deleteLocalCard(post_id){
                console.log('删除本地post'+post_id);
            },
            avatarUrl(uid){
                return process.env.VUE_APP_API_ROOT + '/v1/account/avatar?uid=' + uid;
            }
        },
        data(){
            return{
                postCollections : [{
                    postID: '123',
                    title : 'hello',
                    avatar : '1',
                    user_name : 'Yeuoly',
                    user_uid : 1,
                    introduction : '哦啊啦啦',
                    text : '<a href="javascript:alert()">awd</a><script></s' + 'cript>'
                }]
            }
        },
        mounted(){
            communicate.$on('HomeMessage',this.openDialog);
            communicate.$on('HomeDelete',this.deleteLocalCard);
        }
    }
</script>

<style>

</style>