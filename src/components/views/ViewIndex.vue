<template>
    <VCarousel hide-delimiters :height="carouselHeight">
        <VCarouselItem v-for="t in items"
                       :key="t.src"
                       :src="t.src"
                       class="position-relative"
        >
            <div class="index-items__box">

            </div>
        </VCarouselItem>
    </VCarousel>
</template>

<script>
    export default {
        name: "ViewIndex",
        computed : {
            carouselHeight(){
                return (this.$vuetify.breakpoint.mdAndUp ? this.$vuetify.breakpoint.height : 400) -50 ;
            }
        },
        data(){
            return{
                items:[{
                    src : 'http://i2.bvimg.com/689260/5a6fa2c802460762.png',
                    text : {
                        title : '欢迎来到YeuolyBlog',
                        subtext : '这是一个以精简为设计核心的博客系统'
                    }
                },{
                    src : 'http://i2.bvimg.com/689260/f8145eb781232d76.jpg',
                    text : {
                        title : '欢迎来到YeuolyBlog',
                        subtext : '这是一个以精简为设计核心的博客系统'
                    }
                }]
            }
        }
    }
</script>

<style>
    .index-items__box{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0,0,0,.25);
    }
</style>