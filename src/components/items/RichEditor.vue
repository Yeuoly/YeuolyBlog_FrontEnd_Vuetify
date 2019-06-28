<template>
    <quillEditor v-model="value" :options="option"></quillEditor>
</template>

<script>
    //引入VueEditor
    import { quillEditor } from 'vue-quill-editor'

    export default {
        name: "RichEditor",
        components : { quillEditor },
        model : {
            type : String,
            default : '',
            event : 'change'
        },
        computed : {
            hostValue(){
                return this.$attrs.value || '';
            }
        },
        data(){
            return{
                value : '',
                option : {
                    modules : {
                        toolbar : [
                            ['bold','italic','underline','strike'],
                            ['blockquote','code-block'],

                            [{ header : 1 }, { header : 2 }],
                            [{ list : 'ordered' }, { list : 'bullet' }],
                            [{ script : 'sub' }, { script : 'super' }],
                            [{ indent : '-1' }, { indent : '+1' }],
                            [{ direction : 'rt1' }],

                            [{ size : [ 'small', false, 'large', 'huge' ] }],
                            [{ header : [1, 2, 3, 5, 6, false ] }],

                            [{ color : [] }, {background: []}],
                            [{ font : [] }],
                            [{ align : [] }],

                            ['clean']
                        ]
                    }
                }
            }
        },
        watch : {
            hostValue(){
                this.value = this.hostValue;
            },
            value(){
                this.$emit('change',this.value);
            }
        }
    }
</script>

<style>
    @import "~quill/dist/quill.bubble.css";
    @import "~quill/dist/quill.core.css";
    @import "~quill/dist/quill.snow.css";

    /*汉化*/
    .editor {
        line-height: normal !important;
        height: 800px;
    }
    .ql-editor.ql-blank::before {
        content: '请在这里输入';
    }
    .ql-snow .ql-tooltip[data-mode=link]::before {
        content: "请输入链接地址:";
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: '保存';
        padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode=video]::before {
        content: "请输入视频地址:";
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: '14px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
        content: '10px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
        content: '18px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
        content: '32px';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: '文本';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: '标题1';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: '标题2';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: '标题3';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: '标题4';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: '标题5';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: '标题6';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: '标准字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
        content: '衬线字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
        content: '等宽字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='宋体']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='宋体']::before {
        content: "宋体" !important;
        font-family: "宋体";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='黑体']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='黑体']::before {
        content: "黑体" !important;
        font-family: "黑体";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='微软雅黑']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='微软雅黑']::before {
        content: "微软雅黑" !important;
        font-family: "微软雅黑";
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Arial']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Arial']::before {
        content: "Arial" !important;
        font-family: "Arial";
    }
    /*编辑器内容用*/
    .ql-font-Arial {
        font-family: "Arial";
    }
    .ql-font-宋体 {
        font-family: "SimSun";
    }
    .ql-font-黑体 {
        font-family: "SimHei";
    }
    .ql-font-微软雅黑 {
        font-family: "Microsoft YaHei";
    }
</style>