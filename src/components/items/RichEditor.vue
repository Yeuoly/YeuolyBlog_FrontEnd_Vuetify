<template>
    <div ref="editor" style="text-align:left;min-height: 300px"></div>
</template>

<script>
    import E from 'wangeditor'

    export default {
        name: 'editor',
        model : {
            event : 'change',
        },
        data () {
            return {
                editorContent: ''
            }
        },
        methods: {
            getContent: function () {
                alert(this.editorContent);
            }
        },
        mounted() {
            let editor = new E(this.$refs.editor);
            editor.customConfig.onchange = html => {
                this.editorContent = html;
                this.$emit('change',html);
            };
            editor.create();
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
        z-index: 100 !important;
    }

    .w-e-menu{
        z-index: 101 !important;
    }

</style>