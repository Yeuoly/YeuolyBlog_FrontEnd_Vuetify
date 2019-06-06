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
                    <span class="text-xs-center">
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
                        删除
                    </VBtn>
                    <VBtn block flat @click="deletePost">
                        删除
                    </VBtn>
                </VList>
            </VMenu>
            <VFlex xs12>
                <VCardText>
                    {{ text }}
                </VCardText>
            </VFlex>
        </VLayout>
    </VCard>
</template>

<script>
    import { communicate } from "../../communicate";
    import YIcon from "../common/YIcon";

    export default {
        name: "PostCard",
        components : {
            YIcon

        },
        props : {
            postID: String,
            title : String,
            avatar : String,
            user : String,
            introduction : String,
            text : String
        },
        methods : {
            deletePost () {
                this.axios.post('v1/post/private/delete',this.$qs.stringify({
                    postID : this.postID
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666)
                    {
                        communicate.$emit(
                            'HomeMessage',
                            '成功啦',
                            '已经删掉刚刚的那篇博客了哦~',
                            '',
                            'success'
                        );
                        communicate.$emit(
                            'Home',
                            this.postID
                        );
                    }else{
                        communicate.$emit(
                            'HomeMessage',
                            '哦呀，好像出了一点点事情',
                            _data['data']['error'],
                            '',
                            'error'
                        );
                    }
                }).catch(() =>{
                    communicate.$emit(
                        'HomeMessage',
                        '哦呀，好像出了一点点事情',
                        '服务器坏掉惹o(╥﹏╥)o',
                        '',
                        'error'
                    );
                });
            },
            //跳转编辑界面
            editPost () {
                this.$router.push({ name : 'edit' , params : { pid : this.postID } })
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