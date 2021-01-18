<template>
    <div>
        <span v-if="!preview">
            <VLayout row wrap>
                <VFlex xs12 sm12 md8 lg8>
                    <VContainer class="mt-2 editor-items__title">
                        <VTextField v-model="title" placeholder="标题"></VTextField>
                        <RichEditor v-model="content" :locked="disabled_edit" @loaded="loaded" @change-preview="changePreview"></RichEditor>
                        <VLayout wrap row>
                            <VFlex xs5 sm4 md3 lg2>
                                <VBtn text color="primary" block @click="save">保存</VBtn>
                            </VFlex>
                        </VLayout>
                    </VContainer>
                </VFlex>
                <VFlex xs12 sm12 md4 lg4>
                    <VContainer>
                        <TagsBox class="my-2" v-model="tags" />
                        <VCard class="my-2">
                            <VCardTitle>
                                隐私设置
                            </VCardTitle>
                            <VCardActions>
                                <VSwitch label="仅自己可见" v-model="privacy.onlyMe"></VSwitch>
                            </VCardActions>
                        </VCard>
                        <VCard>
                            <VCardTitle>
                                须知
                            </VCardTitle>
                            <VCardText>
                                <li>请勿发表/转发任何违反中华人民共和国法律的言论。</li>
                                <li style="color: red">使用Latex时请将每一条Latex单独做一行，否则插入Latex的视为无效语句</li>
                                <li style="color: red">PC用户建议点击View开启预览模式</li>
                                <li>这边建议去<a href="//latexlive.com" target="_blank">latexlive</a>编写Latex</li>
                                <li>小破站维护不容易，请各位大佬手下留情，感激不尽。</li>
                                <li>我们对会对攻击者的输入内容进行多次过滤转译以确保网站的安全性，但仍存在有漏洞的可能。</li>
                                <li>您的输入内容将会被按加密等级进行加密，默认加密等级为0，您可以向站长申请更高的加密等级。</li>
                                <li>由于服务器比较烂，图片还是采用外链吧QAQ，暂时不支持上传图片哒，以后有更好的服务器了可能可以叭（</li>
                                <li>在标签输入框按空格可以添加标签</li>
                            </VCardText>
                        </VCard>
                    </VContainer>
                </VFlex>
            </VLayout>
        </span>
        <span v-else>
            <VLayout row wrap>
                <VFlex md6 lg6>
                    <VContainer class="mt-2 editor-items__title">
                        <VTextField v-model="title" placeholder="标题"></VTextField>
                        <RichEditor v-model="content" :locked="disabled_edit" @loaded="loaded" @change-preview="changePreview"></RichEditor>
                        <VLayout wrap row>
                            <VFlex xs5 sm4 md3 lg2>
                                <VBtn text color="primary" block @click="save">保存</VBtn>
                            </VFlex>
                        </VLayout>
                    </VContainer>
                </VFlex>
                <VFlex md6 lg6>
                    <VContainer class="mt-2">
                        <VCard class="mt-5">
                            <VCardTitle class="pb-4" style="border-bottom: 1px solid #EEE">
                                <VCardText>
                                    预览 - 上次更改：{{ last_update }} - powered by Yeuoly.Works
                                </VCardText>
                            </VCardTitle>
                            <YHtmlCompiler
                                class="preview-window"
                                :html="content"
                                :has-latex="true"
                                @changed="updateChangeTime"
                            />
                        </VCard>
                    </VContainer>
                </VFlex>
                <VFlex md12 lg12>
                    <div class="px-4">
                    <TagsBox class="my-2" v-model="tags" />
                    <VCard class="my-2">
                        <VCardTitle>
                            隐私设置
                        </VCardTitle>
                        <VCardActions>
                            <VSwitch label="仅自己可见" v-model="privacy.onlyMe"></VSwitch>
                        </VCardActions>
                    </VCard>
                    <VCard>
                        <VCardTitle>
                            须知
                        </VCardTitle>
                        <VCardText>
                            <li>请勿发表/转发任何违反中华人民共和国法律的言论。</li>
                            <li style="color: red">使用Latex时请将每一条Latex单独做一行，不然会有奇怪的bug，真的，大佬们，别乱玩，好好复制latex表达式就行了，别整活了，现在bug多</li>
                            <li>这边建议去<a href="//latexlive.com" target="_blank">latexlive</a>编写Latex</li>
                            <li>小破站维护不容易，请各位大佬手下留情，感激不尽。</li>
                            <li>我们对会对攻击者的输入内容进行多次过滤转译以确保网站的安全性，但仍存在有漏洞的可能。</li>
                            <li>您的输入内容将会被按加密等级进行加密，默认加密等级为0，您可以向站长申请更高的加密等级。</li>
                            <li>由于服务器比较烂，图片还是采用外链吧QAQ，暂时不支持上传图片哒，以后有更好的服务器了可能可以叭（</li>
                            <li>在标签输入框按空格可以添加标签</li>
                        </VCardText>
                    </VCard>
                    </div>
                    
                </VFlex>
            </VLayout>
        </span>
    </div>
    
</template>

<script>
    import RichEditor from "../components/common/RichEditor";
    import base from '../mixins/base';
    import TagsBox from "../components/common/TagsBox";
    import YHtmlCompiler from '../components/common/YHtmlCompiler';
    import { messageBox } from "../communicate";
    import { analysisLatex, parseIntoSimple } from '../lib/module/RichContent/insert-latex';
    import { enter_space_format_has } from '../lib/pattern';
    import { api_save_post, api_private_post } from '../lib/static/api';

    export default {
        name: "ViewEditor",
        components: { TagsBox, RichEditor, YHtmlCompiler },
        mixins: [base],
        data(){
            return{
                title : '',
                content : '',
                post_id : '',
                disabled_edit : true,
                tags : [],
                privacy : {
                    onlyMe : false
                },
                preview : false,
                last_update : 'Date'
            }
        },
        methods : {
            updateChangeTime(){
                this.last_update = this.$utils.date('h:m:s', new Date().getTime() / 1000);
            },
            changePreview(res){
                this.preview = res;
            },
            loaded(){
                this.disabled_edit = true;
            },
            save(){
                this.axios.post(api_save_post.route ,this.$qs.stringify({
                    post_data : this.content,
                    post_title : this.title,
                    post_id : this.post_id,
                    post_tags : `[${this.tags.join(' ')}]`,
                    act : api_save_post.act(this.post_id),
                    private : this.privacy.onlyMe
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
                //先解析latex
                //this.content = analysisLatex(dist['content']).innerHTML;
                //由于容易导致很操蛋的bug，这里去除latex解析
                this.content = dist['content'];
                this.post_id = dist['post_id'];
                this.tags = this.$utils.array_drop(dist['tags'].split(enter_space_format_has),'');
                this.privacy.onlyMe = dist['private'];
                this.disabled_edit = false;
            },
            get(post_id){
                this.axios.post(api_private_post.route ,this.$qs.stringify({
                    post_id : post_id,
                    act : api_private_post.act
                })).then( response => {
                    const _data = response.data;
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

    .preview-window{
        height: 305px;
        overflow: scroll;
        overflow-x: initial;
        overflow-y: scroll;
    }

</style>