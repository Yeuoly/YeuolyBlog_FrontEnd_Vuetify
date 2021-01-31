<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VCard class="position-relative" block>
        <VLayout wrap row>
            <YAvatar :magic_door="true" size="50" class="mx-2 mt-2" :uid="user_uid" />
            <div class="post-card-head clickable" @click="goDetail">
                <VCardTitle>
                    <span class="card-user">
                        {{ user }}
                    </span>
                    <span class="card-date">
                        {{ date }}
                    </span>
                </VCardTitle>
            </div>
            <VMenu offset-y left>
                <template v-slot:activator="{ on }">
                    <VBtn class="post-card-menu" v-on="on" small fab flat>
                        <VIcon>mdi-dots-vertical</VIcon>
                    </VBtn>
                </template>
                <VList v-if="usePrivateOperateBox(user_uid)">
                    <VBtn block flat @click="editPost">
                        编辑
                    </VBtn>
                    <VBtn block flat @click="deletePost">
                        删除
                    </VBtn>
                    <VBtn block flat @click="html2pdf(false)">
                        PDF(小)
                    </VBtn>
                    <VBtn block flat @click="html2pdf(true)">
                        PDF(大)
                    </VBtn>
                </VList>
                <VList v-else>
                    <VBtn block flat @click="removeFromFollowings">
                        取消关注
                    </VBtn>
                </VList>
            </VMenu>
            <VFlex xs12>
                <div class="card-title clickable" @click="goDetail">
                        {{ title }}
                </div>
                <YHtmlCompiler class=" pt-5 px-3" :html="text" :has-latex="true" ref="card" />
            </VFlex>
            <VFlex xs12>
                <CategoryBox v-model="tags" />
            </VFlex>
        </VLayout>
    </VCard>
</template>

<script>
    import { communicate , messageBox, openLoadingOverlay, closeLoadingOverlay } from "../../communicate";
    import YHtmlCompiler from "../common/YHtmlCompiler";
    import CategoryBox from "../common/CategoryBox";
    import YAvatar from "../common/YAvatar";

    export default {
        name: "PostCard",
        components : {YAvatar, CategoryBox, YHtmlCompiler },
        props : {
            post_id: String,
            title : String,
            avatar : String,
            user : String,
            text : String,
            time : Number,
            tags : Array,
            user_uid : Number
        },
        computed : {
            date(){
                return this.$utils.date('M-D h:m:s',this.time);
            },
            usePrivateOperateBox(){
                return uid => uid === this.$store.getters.getUid;
            }
        },
        methods : {
            deletePost() {
                messageBox('警告','主人确定要删除这篇博客嘛？','不能恢复的哦，确定了的话就点击【我知道了】吧~ 摁错了的话就点周围空白的地方就好啦','info',() => {
                    communicate.$emit('HomeDelete',this.post_id);
                });
            },
            editPost () {
                let post_id = this.post_id;
                this.$router.push({ name : 'editor' , query : { post_id : post_id } });
            },
            removeFromFollowings(){
                this.$emit('removeFromFollowings',this.user_uid);
            },
            goDetail(){
                this.$router.push({ name : 'post-page', query : { pid : this.post_id } });
            },
            async html2pdf(quality){
                openLoadingOverlay();
                const el = this.$refs.card.$el;
                try{
                    const pdf = await this.$utils.html2pdf(el, quality ? 2 : 1);
                    pdf.save(`YeuolyBlog-${ this.post_id }.pdf`);
                }catch(e){
                    messageBox('错误', '渲染html过程中出现错误，请检查博客格式是否正确', '', 'error');
                }
                closeLoadingOverlay();
            }
        }
    }
</script>

<style>

    @media (max-width: 568px) {
        .extra-f-t{
            display: none;
        }
    }


    .card-date{
        position: absolute;
        top: 40px;
        font-size: 12px;
        width: 120px;
    }

    .card-title{
        position: absolute;
        top: 70px;
        left: 24px;
    }

    .card-user{
        position: absolute;
        top: 22px;
    }

    .post-card-head{
        position: absolute;
        left: 70px;
        top: 0px;
        width: 120px;
    }

    .post-card-menu{
        position: absolute !important;
        right: 0 !important;
    }

</style>