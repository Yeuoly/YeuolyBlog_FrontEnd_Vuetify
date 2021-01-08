<template>
    <div ref="editor" style="text-align:left;min-height: 300px"></div>
</template>

<script>
    /**
     * 这里的逻辑过于混乱（乱写x
     * 所以在这里注释一下
     * 为了避免双向绑定导致的文本刷新带来的更新延迟和光标移动
     * 添加了一个prop:locked，当父级将locked改为true时会解除从子级向父级的绑定
     * 所以父级应当先将locked的默认值设定为true，如果要从父级向编辑框更改文本内容的话
     * 应当先将locked设定为false，此时可以修改，等待修改完毕时子级会发出'loaded'的信号
     * 父级接受loaded之后再把locked改为true即可
     *
     * 为了避免编辑框初始化还没有完成就有从父级向子级的修改，添加了queue_fun这个值，
     * 如果还没初始化完，会将修改请求存入queue_fun，在初始化完之后会调用queue_fun完成修改
     *
     * **/

    import E from 'wangeditor';
    import InsertLatex from '../../class/wangeditor/insert-latex';
    import PreviewMenu from '../../class/wangeditor/preview';
    import InsertBlogPreview from '../../class/wangeditor/insert-blog-preview';
    import HLJS from 'highlight.js';
    import { messageBox } from "../../communicate";
    import { openLoadingOverlay } from "../../communicate";
    import { closeLoadingOverlay } from "../../communicate";
    export default {
        name: 'editor',
        model : {
            event : 'change',
            prop : 'hostValue'
        },
        props : {
            hostValue : String,
            locked : Boolean,
        },
        data () {
            return {
                editor_content: '',
                handler : null,
                queue_fun : null
            }
        },
        methods : {
            change(val){
                if (!this.locked){
                    const e = () => {
                        this.handler.txt.html(val);
                        this.$emit('loaded');
                    };
                    if(!this.handler){
                        this.queue_fun = e;
                    }else{
                        e();
                    }
                }
            }
        },
        watch : {
            hostValue(newVal){
                this.change(newVal);
            },
            locked(newVal){
                if(!newVal && !this.handler){
                    //注册组件
                    const editor = new E(this.$refs.editor);
                    //挂载HLJS插件
                    editor.highlight = HLJS;
                    editor.config.onchange = html => {
                        this.editor_content = html;
                        this.$emit('change', html);
                    };
                    //设置文件上传
                    editor.config.uploadImgMaxSize = 2 * 1024 * 1024;
                    editor.config.customUploadImg = (files,insert) => {
                        const form_data = new FormData();
                        form_data.append('img',files[0]);
                        openLoadingOverlay();
                        this.$utils.csrf_post('v1/upload/img',form_data, response => {
                            const data = response.data['data'];
                            if(data['res'] === 666){
                                insert(data['data']['url']);
                            }else{
                                messageBox('失败',data['error'],'','error');
                            }
                            closeLoadingOverlay();
                        },() => {
                            messageBox('失败','与服务器的连接错误','','error');
                            closeLoadingOverlay();
                        });
                    };
                    //移除原生code
                    //editor.config.excludeMenus = ['code'];
                    //注册latex扩展菜单
                    editor.menus.extend('InsertLatexKey', InsertLatex);
                    editor.config.menus = editor.config.menus.concat('InsertLatexKey');
                    //博客预览扩展
                    editor.menus.extend('InsertBlogPreview', InsertBlogPreview);
                    editor.config.menus = editor.config.menus.concat('InsertBlogPreview');
                    //注册预览扩展菜单，只有在屏幕够大时才允许预览
                    if(this.$vuetify.breakpoint.mdAndUp){
                        editor.menus.extend('PreviewBtnKey', PreviewMenu);
                        editor.config.menus = editor.config.menus.concat('PreviewBtnKey');
                    }
                    editor.create();
                    if(this.$vuetify.breakpoint.mdAndUp){
                        editor.config.onPreviewCallBack( res => {
                            this.$emit('change-preview', res);
                        });
                    }
                    this.handler = editor;
                    if(typeof this.queue_fun === 'function'){
                        this.queue_fun();
                        this.queue_fun = null;
                    }
                }
            }
        }
    }
</script>

<style>
    /**
        这里呢，主要是wangeditor的z-index，为了配合它，这里修改了一堆z-index
    */

    .w-e-toolbar {
        /* display: -webkit-box; */
        display: -ms-flexbox;
        display: flex;
        padding: 0 5px;
        flex-wrap: wrap !important;
    }

    .w-e-active button{
        color: #1e88e5;
    }

    .w-e-menu button{
        outline: none;
    }

    .w-e-droplist{
        background-color: white;
    }

    @media (max-width: 700px) {
        .w-e-text img{
            width: 50%;
        }
    }

    .v-overlay{
        z-index: 10002 !important;
    }

    .w-e-panel-tab-content input{
        height: 33px !important;
    }

    .v-dialog__content--active{
        z-index: 10003 !important;
    }

</style>