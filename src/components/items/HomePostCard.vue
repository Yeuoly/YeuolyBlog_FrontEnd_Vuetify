<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VCard block>
        <VLayout wrap row>
            <VFlex lg1 md2 sm2 xs3>
                <VAvatar size="50" class="mx-2 mt-2">
                    <VImg :src="avatar"></VImg>
                </VAvatar>
            </VFlex>
            <VFlex lg10 md9 sm9 xs8>
                <VCardTitle>
                    <span class="mr-2">
                        {{ date }}
                    </span>
                    <span>
                        {{ title }}
                    </span>
                </VCardTitle>
            </VFlex>
            <VMenu offset-y left>
                <template class="position-relative" v-slot:activator="{ on }">
                    <VBtn class="home-items__dropdown_btn" v-on="on" small fab flat>
                        <YIcon>
                            youcecaidan
                        </YIcon>
                    </VBtn>
                </template>
                <VList>
                    <VBtn block flat @click="editPost">
                        编辑
                    </VBtn>
                    <VBtn block flat @click="deletePost">
                        删除
                    </VBtn>
                </VList>
            </VMenu>
            <VFlex xs12>
                <YHtmlCompiler class="px-3" :html="text" />
            </VFlex>
            <VFlex xs12>
                <CategoryBox v-model="tags_array" />
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
        components : {
            CategoryBox,
            YHtmlCompiler,
            YIcon
        },
        props : {
            post_id: String,
            title : String,
            avatar : String,
            user : String,
            text : String,
            time : Number,
            tags : String
        },
        computed : {
            date(){
                return this.$utils.date('M-D',this.time);
            },
            tags_array(){
                let temp = this.tags.split(/[\r\n ]/);
                let ary = [];
                temp.forEach( item => {
                    if (item !== ' '){
                        ary.push(item);
                    }
                });
                return ary;
            }
        },
        methods : {
            deletePost () {
                communicate.$emit('HomeDelete',this.post_id);
            },
            //跳转编辑界面
            editPost () {
                let post_id = this.post_id;
                this.$router.push({ name : 'editor' , query : { post_id : post_id } });
            },
        }
    }
</script>

<style scoped>

    @media (max-width: 568px) {
        .extra-f-t{
            display: none;
        }
    }

    .home-items__dropdown_btn{
        position: absolute;
        right: 0px;
    }

</style>