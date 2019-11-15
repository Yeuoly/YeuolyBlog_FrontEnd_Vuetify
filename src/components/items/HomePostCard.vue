<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VCard class="position-relative" block>
        <VLayout wrap row>
            <div>
                <VAvatar size="50" class="mx-2 mt-2">
                    <VImg :src="avatar"></VImg>
                </VAvatar>
            </div>
            <div class="post-card-head">
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
                        <YIcon>
                            youcecaidan
                        </YIcon>
                    </VBtn>
                </template>
                <VList v-if="usePrivateOperateBox(user_uid)">
                    <VBtn block flat @click="editPost">
                        编辑
                    </VBtn>
                    <VBtn block flat @click="deletePost">
                        删除
                    </VBtn>
                </VList>
                <VList v-else>
                    <VBtn block flat @click="removeFromFollowings">
                        取消关注
                    </VBtn>
                </VList>
            </VMenu>
            <VFlex xs12>
                <div class="card-title">
                        {{ title }}
                </div>
                <YHtmlCompiler class=" pt-5 px-3" :html="text" />
            </VFlex>
            <VFlex xs12>
                <CategoryBox v-model="tags" />
            </VFlex>
        </VLayout>
    </VCard>
</template>

<script>
    import { communicate } from "../../communicate";
    import YIcon from "../common/YIcon";
    import YHtmlCompiler from "../common/YHtmlCompiler";
    import CategoryBox from "../common/CategoryBox";

    export default {
        name: "PostCard",
        components : { CategoryBox, YHtmlCompiler, YIcon },
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
            deletePost () {
                communicate.$emit('HomeDelete',this.post_id);
            },
            editPost () {
                let post_id = this.post_id;
                this.$router.push({ name : 'editor' , query : { post_id : post_id } });
            },
            removeFromFollowings(){
                this.$emit('removeFromFollowings',this.user_uid);
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
        width: 120px;
    }

    .post-card-menu{
        position: absolute !important;
        right: 0 !important;
    }

</style>