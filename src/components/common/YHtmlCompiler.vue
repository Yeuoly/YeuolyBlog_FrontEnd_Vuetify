<template>
    <div class="y-html__controller" ref="holder">
        <div class="w-e-text" v-html="clean_html"></div>
    </div>
</template>

<script>
    import "wangeditor";

    export default {
        name: "YHtmlCompiler",
        props : {
            html : {
                type : String,
                default : '<p></p>'
            },
            hasLatex : {
                type : Boolean,
                default : false
            },
        },
        data : () => ({
            flag : 0,
            timer : false,
            cache_html : '',
            first_loaded : false,
            modified : null,
            cache_lock : false,
            lastest : '<div class="w-e-text"></div>'
        }),
        computed : {
            clean_html(){
                this.flag++;
                this.$emit('changed');
                return this.$utils.xss_filter(this.cache_html);
            }
        },
        methods : {
            //初始化latex公式，需要遍历一遍holder，找latexpression标签，并且初始化img标签事件
            initLatex(){
                //这个true表示处理latex的同时处理img
                this.$utils.analysisRichContent(this.$refs.holder, true);
            },
            addListener(){
                this.initLatex();
            },
            lazyUpdate(ms){
                this.modified = false;
                setTimeout(() => {
                //如果在这ms毫秒秒后，发生了更改，说明此时键盘速度很快，所以不更改，等待下一个ms
                    if(this.modified){
                        this.lazyUpdate(ms);
                    }else{
                        this.cache_lock = false;
                        this.cache_html = this.html;
                    }
                }, ms);
            }
        },
        watch : {
            flag : {
                handler(){
                    if(this.hasLatex){
                        setTimeout(() => {
                            this.addListener();
                        });
                    }
                },
            },
            html : {
                //做一个缓存，避免出现高频率渲染的情况
                handler(){
                    this.modified = true;
                    if(!this.first_loaded){
                        this.cache_html = this.html;
                        this.first_loaded = true;
                    }else{
                        //如果修改了而且没锁住的话，就开始渲染判断
                        if(this.modified && !this.cache_lock){
                            this.cache_lock = true;
                            this.lazyUpdate(500);
                        }
                    }
                },
                immediate : true
            }
        }
    }

</script>

<style>
    @import "../../style/katex.css";

    .y-html__controller{
        width: 100%;
    }

    .y-html__controller .w-e-text{
        overflow-y: hidden !important;
    }

    @media (max-width: 700px) {
        .y-html__controller .w-e-text img{
            width: 100%;
        }
    }

    @media (min-width: 700px){
        .y-html__controller .w-e-text img{
            width: 50%;
        }
    }

</style>