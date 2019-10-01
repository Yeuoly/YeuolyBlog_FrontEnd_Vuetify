<template>
    <p id="board-girl"></p>
</template>

<script>
    export default {
        name: "Live2DGirl",
        methods : {
            init(){
                window.L2Dwidget.init({
                    pluginRootPath : "live2dw/",
                    pluginJsPath : "lib/",
                    pluginModelPath : "assets/",
                    tagMode : true,
                    debug : false,
                    model : {
                        jsonPath : "/live2dw/assets/uni.model.json"
                    },
                    display : {
                        position : this.$vuetify.breakpoint.smAndDown ? 'left' : 'right',
                        width : this.$vuetify.breakpoint.smAndDown ? 125 : 200,
                        height : this.$vuetify.breakpoint.smAndDown ? 300 : 500,
                    },
                    mobile : {
                        show : true
                    },
                    log : false
                });
            },
            loadJs(){
                const node = document.createElement('script');
                node.src = `${process.env.VUE_APP_WEB_ROOT}/live2dw/lib/L2Dwidget.min.js`;
                document.body.appendChild(node);
            }
        },
        created() {
            if(this.$cookies.get('live2dAll') === 'true'){
                this.loadJs();
                const reader = () => {
                    window.L2Dwidget ? this.init() : setTimeout(reader,300);
                };
                reader();
                if(this.$cookies.get('live2dHomeOnly') === 'true'){
                    this.$watch('$route.name', {
                        handler : newVal => {
                            const changer = () => {
                                const node = document.getElementById('live2d-widget');
                                node ? node.style.display =
                                    ( newVal === 'home' ? 'initial' : 'none' ) : setTimeout(changer,300);
                            };
                            changer();
                        },
                        immediate : true
                    });
                }
            }
        }
    }
</script>

<style>
    @media (min-width: 959px) {
        #live2d-widget{
            right: 100px !important;
        }
    }
</style>