<template>
    <div class="y-html__controller">
        <div class="w-e-text" v-html="clean_html"></div>
    </div>
</template>

<script>

    let XSS = require('xss');
    let XSSFilterXSS = new XSS.FilterXSS({
        css : {
            whiteList : {
                color : true,
                'background-color': true,
                top : true,
                left : true,
                'text-decoration-line' : true,
                'font-family' : true,
                'font-size' : true,
            }
        },
        whiteList : {
            p : ['style','class'],
            h1 : ['style','class'],
            h2 : ['style','class'],
            h3 : ['style','class'],
            h4 : ['style','class'],
            h5 : ['style','class'],
            h6 : ['style','class'],
            span : ['style','class'],
            br : [],
            img : ['src','class'],
            a : ['href','target'],
            sup : ['class'],
            ol : ['class'],
            li : ['class'],
            ul : ['class'],
            blockquote : ['class'],
            em : ['class'],
            s : ['class'],
            u : ['class'],
            strong : ['class'],
            pre : ['class','spellcheck'],
            font : ['class'],
            table : ['border','width','cellpadding','cellspacing'],
            tbody : [],
            tr : [],
            th : [],
            td : []
        }
    });

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
                return XSSFilterXSS.process(this.html);
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

</style>