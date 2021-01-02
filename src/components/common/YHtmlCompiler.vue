<template>
    <div class="y-html__controller">
        <div class="w-e-text" v-html="clean_html"></div>
    </div>
</template>

<script>
    export default {
        name: "YHtmlCompiler",
        props : {
            html : {
                type : String,
                default : '<p></p>'
            },
        },
        computed : {
            clean_html(){
                return this.$utils.xss_filter(this.html);
            }
        }
    }
</script>

<style>
    @import "~wangeditor/release/wangEditor.css";

    .y-html__controller{
        width: 100%;
    }

    .y-html__controller .w-e-text{
        overflow-y: hidden !important;
    }

    .y-html__controller .w-e-text img{
        width: 50%;
    }

</style>