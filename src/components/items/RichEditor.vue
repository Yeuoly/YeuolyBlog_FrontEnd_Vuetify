<template>
    <div ref="editor" style="text-align:left;min-height: 300px"></div>
</template>

<script>
    import E from 'wangeditor'

    export default {
        name: 'editor',
        model : {
            event : 'change',
            prop : 'hostValue'
        },
        props : {
            hostValue : String
        },
        data () {
            return {
                editorContent: '',
                handler : null
            }
        },
        methods : {
            change(val){
                this.handler.txt.html(val);
            }
        },
        mounted() {
            let editor = new E(this.$refs.editor);
            editor.customConfig.onchange = html => {
                this.editorContent = html;
                this.$emit('change',html);
            };
            editor.create();
            this.handler = editor;
        },
        watch : {
            hostValue(newVal){
                this.change(newVal);
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