<template>
    <div id="board-girl"></div>
</template>

<script>
    export default {
        name: "Live2DGirl",
        mounted(){
            this.$nextTick( function () {
                setTimeout(() => {
                    window.L2Dwidget.init({
                        "pluginRootPath":"live2dw/",
                        "pluginJsPath":"lib/",
                        "pluginModelPath":"assets/",
                        "tagMode":false,
                        "debug":false,
                        "model": {
                            "jsonPath":"/live2dw/assets/uni.model.json"
                        },
                        "display": {
                            "position":"right",
                            "width":200,
                            "height":500,
                            "bottom":0
                        },
                        "mobile": {
                            "show":true
                        },
                        "log":false
                    });
                },3000);
            });
        }
    }
</script>

<style scoped>
    #live2dcanvas {
        border: 0 !important;
    }
</style>