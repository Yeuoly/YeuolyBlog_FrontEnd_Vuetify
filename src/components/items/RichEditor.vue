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
                    let editor = new E(this.$refs.editor);
                    editor.customConfig.onchange = html => {
                        this.editor_content = html;
                        this.$emit('change',html);
                    };
                    editor.create();
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

    .w-e-toolbar {
        /* display: -webkit-box; */
        display: -ms-flexbox;
        display: flex;
        padding: 0 5px;
        flex-wrap: wrap !important;
    }

    .w-e-text-container{
        z-index: 3 !important;
    }

    .w-e-menu{
        z-index: 4 !important;
    }

    .v-overlay{
        z-index: 5;
    }

</style>