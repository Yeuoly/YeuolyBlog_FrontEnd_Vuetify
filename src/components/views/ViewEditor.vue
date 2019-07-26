<template>
    <VLayout row wrap>
        <VFlex xs12 sm12 md12 lg12>
            <PopDialog v-model="dialog_show"
                       :pop-type="dialog_type"
                       :title="dialog_title"
                       :text="dialog_text"
                       :subtext="dialog_subtext"
            >
            </PopDialog>
        </VFlex>
        <VFlex xs12 sm9 md8 lg8>
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
        <VFlex xs12 sm3 md4 lg4>
            <VContainer class="mt-5">
                <VCard>
                    <VCardTitle>
                        须知
                    </VCardTitle>
                    <VCardText>
                        <li>请勿发表/转发任何违反中华人民共和国法律的言论。</li>
                        <li>小破站维护不容易，请各位大佬手下留情，感激不尽。</li>
                        <li>我们对会对攻击者的输入内容进行多次过滤转译以确保网站的安全性，但仍存在有漏洞的可能。</li>
                        <li>您的输入内容将会被按加密等级进行加密，默认加密等级为0，您可以向站长申请更高的加密等级。</li>
                        <li>由于服务器比较烂，图片还是采用外链吧QAQ，暂时不支持上传图片哒，以后有更好的服务器了可能可以叭（</li>
                    </VCardText>
                </VCard>
            </VContainer>
        </VFlex>
    </VLayout>
</template>

<script>

    import RichEditor from "../items/RichEditor";
    import base from '../../mixins/base';
    import PopDialog from "../common/PopDialog";

    import popdialog from '../../mixins/popdialog';

    export default {
        name: "ViewEditor",
        components: {PopDialog, RichEditor },
        mixins: [base , popdialog],
        data(){
            return{
                title : '',
                content : '',
                post_id : '',
                disabled_edit : true
            }
        },
        methods : {
            loaded(){
                this.disabled_edit = true;
            },
            save(){
                let url = 'v1/post/private/';
                if(!this.post_id){
                    url += 'send';
                }else{
                    url += 'modify';
                }
                this.axios.post(url,this.$qs.stringify({
                    post_data : this.content,
                    post_title : this.title,
                    post_id : this.post_id
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.post_id = _data['data']['data']['post_id'];
                        let vm = this;
                        this.$router.push({ query : { post_id : vm.post_id } });
                        this.openDialog('保存成功','主人的博客保存成功啦~','','success');
                    }else{
                        this.openDialog('失败惹','似乎出现了一些问题',_data['data']['error'],'error');
                    }
                }).catch(() => {
                    this.openDialog('失败惹','与服务器的连接似乎出现了一些问题','','error');
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
                        this.openDialog('获取博客失败',_data['data']['error'],'','error');
                    }
                }).catch(() => {
                    this.openDialog('获取博客失败','与服务器的连接似乎出现了一些问题','','error');
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