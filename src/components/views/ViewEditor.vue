<template>
    <VLayout row wrap>
        <VFlex xs12 sm12 md8 lg8>
            <VContainer class="mt-2 editor-items__title">
                <VTextField v-model="title" placeholder="标题"></VTextField>
                <RichEditor v-model="content" :locked="disabled_edit" @loaded="loaded"></RichEditor>
                <VLayout wrap row>
                    <VFlex xs5 sm4 md3 lg2>
                        <VBtn text color="primary" block @click="save">保存</VBtn>
                    </VFlex>
                </VLayout>
            </VContainer>
        </VFlex>
        <VFlex xs12 sm12 md4 lg4>
            <VContainer>
                <ViewEditor_PostTips v-if="$vuetify.breakpoint.mdAndUp" />
                <TagsBox class="my-2" v-model="tags" />
                <ViewEditor_PostTips v-if="$vuetify.breakpoint.smAndDown" />
            </VContainer>
        </VFlex>
    </VLayout>
</template>

<script>

    import RichEditor from "../items/RichEditor";
    import base from '../../mixins/base';

    import TagsBox from "../items/TagsBox";
    import ViewEditor_PostTips from "../items/ViewEditor_PostTips";

    import { messageBox } from "../../communicate";

    export default {
        name: "ViewEditor",
        components: {ViewEditor_PostTips, TagsBox, RichEditor },
        mixins: [base],
        data(){
            return{
                title : '',
                content : '',
                post_id : '',
                disabled_edit : true,
                tags : []
            }
        },
        methods : {
            loaded(){
                this.disabled_edit = true;
            },
            save(){
                let url = `v1/post/private/${ this.post_id ? 'modify' : 'send' }`;
                this.axios.post(url,this.$qs.stringify({
                    post_data : this.content,
                    post_title : this.title,
                    post_id : this.post_id,
                    post_tags : `[${this.tags.join(' ')}]`
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.post_id = _data['data']['data']['post_id'];
                        let vm = this;
                        this.$router.push({ query : { post_id : vm.post_id } });
                        messageBox('保存成功','主人的博客保存成功啦~','','success');
                    }else{
                        messageBox('失败惹','似乎出现了一些问题',_data['data']['error'],'error');
                    }
                }).catch(() => {
                    messageBox('失败惹','与服务器的连接似乎出现了一些问题','','error');
                });
            },
            init(){
                let query_pid = this.$route.query.post_id;
                if(query_pid){
                    this.post_id = query_pid;
                    this.$router.push({ query : { post_id : query_pid } });
                    this.get(query_pid);
                }else{
                    this.disabled_edit = false;
                }
            },
            load(dist){
                this.title = dist['title'];
                this.content = dist['content'];
                this.post_id = dist['post_id'];
                this.tags = this.$utils.array_drop(dist['tags'].split(/[\r\n ]/),'');
                this.disabled_edit = false;
            },
            get(post_id){
                this.axios.post('/v1/post/private/get',this.$qs.stringify({
                    post_id : post_id
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.load(_data['data']['data']);
                    }else{
                        messageBox('获取博客失败',_data['data']['error'],'','error');
                    }
                }).catch(() => {
                    messageBox('获取博客失败','与服务器的连接似乎出现了一些问题','','error');
                });
            }
        },
        mounted(){
            this.init();
        }
    }
</script>

<style>

    .editor-items__title input{
        font-size: 30px !important;
    }

</style>