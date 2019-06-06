<template>
    <VCarousel hide-controls :height="carouselHeight">
        <VCarouselItem v-for="t in items"
                       :key="t.src"
                       :src="t.src"
                       class="position-relative"
        >
            <div class="index-items__box">
                <VCard flat class="mx-5 index-items__card">
                    <VLayout row wrap>
                        <p class="index-items__spacer"></p>
                        <VFlex xs12 class="index-items__title">
                            <VFlex xs12>
                                <h2>
                                    {{t.detail.title}}
                                </h2>
                            </VFlex>
                            <VFlex xs12>
                                <h3>
                                    {{t.detail.subtext}}
                                </h3>
                            </VFlex>
                        </VFlex>
                        <VFlex v-for="( btn , key ) in t.detail.buttons"
                               :key="key"
                               xs12
                               sm4
                               md3
                               lg2
                        >
                            <div class="mr-3 mb-1 index-items__btn">
                                <VBtn block
                                      flat
                                      @click="btn.event"
                                      class="index-items__btn"
                                      :color="btn.color ? btn.color : ''"
                                >
                                    {{btn.text}}
                                </VBtn>
                            </div>
                        </VFlex>
                    </VLayout>
                </VCard>
            </div>
        </VCarouselItem>
    </VCarousel>
</template>

<script>
    export default {
        name: "ViewIndex",
        computed : {
            carouselHeight(){
                let height = 0;
                let v = this.$vuetify.breakpoint;
                if(v.mdAndUp){
                    height = this.$vuetify.breakpoint.height;
                }else if(v.smOnly){
                    height = 800;
                }else if(v.xsOnly){
                    height = 600;
                }
                return height;
            }
        },
        data(){
            let vm = this;
            return{
                items:[{
                    src : 'https://i.loli.net/2019/06/06/5cf896dec4dc734199.png',
                    detail : {
                        title : 'YeuolyBlog',
                        subtext : '这是一个以精简便捷为设计核心的博客系统',
                        buttons : [{
                            text : '注册',
                            event : vm.signIn,
                            color : 'green'
                        },{
                            text : '我的主页',
                            event : vm.homePage,
                        }]
                    }
                },{
                    src : 'https://i.loli.net/2019/06/06/5cf8bef8cea4735092.jpg',
                    detail : {
                        title : 'YeuolySystem',
                        subtext : '账号系统基于YeuolySystem，这是由Yeuoly制作的账号' +
                            '管理系统。'
                    }
                },{
                    src : 'https://i.loli.net/2019/06/06/5cf8c059b5aac77365.jpg',
                    detail : {
                        title : 'GitHub',
                        subtext : '前端开源在GitHub',
                        buttons : [{
                            text : '前往',
                            event : vm.gitHub,
                            green : 'green'
                        }]
                    }
                }]
            }
        },
        methods : {
            signIn(){
                this.$router.push({ name : 'signin' });
            },
            homePage(){
                this.$router.push({ name : 'home' });
            },
            gitHub(){
                location.href = '//github.com/Yeuoly/YeuolyBlog_FrontEnd_Vuetify';
            }
        }
    }
</script>

<style>
    .index-items__box{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0,0,0,.45);
    }

    .index-items__card{
        width: calc(100% - 96px);
    }

    .index-items__spacer{
        width: 1px;
        height: 150px;
    }

    .index-items__title{
        height: 200px;
        margin-bottom: 30px;
    }

    .index-items__box > * h2{
        font-size: 70px !important;
        font-weight: 100 !important;;
        line-height: 87px !important;;
        font-family: "Roboto", Arial, sans-serif !important;;
    }

    .index-items__box > * h3{
        font-size: 30px !important;
        font-weight: 300 !important;
    }

    .index-items__btn{
        height: 60px;
        background-color: rgba(0,0,0,.25);
    }

    @media (max-width: 500px) {
        .index-items__box > * h2{
            font-size: 50px !important;
            text-align: center;
        }

        .index-items__box > * h3{
            font-size: 15px !important;
            text-align: center;
        }

        .index-items__spacer{
            width: 1px;
            height: 100px;
        }
    }

</style>