<template>
    <div>
        <VBtn  @click="show = !show"
               fixed
               right
               fab
               dark
               color="green"
               class="float-button"
        >
            <YIcon style="font-size: 30px">
                iconset0143
            </YIcon>
        </VBtn>
        <VDialog v-model="show" width="500">
            <VFadeTransition mode="out-in">
                <MaterialCard v-show="show1" title="有问题联系我">
                    <li>邮箱：admin@srmxy.cn</li>
                    <li>QQ:1845958331</li>
                </MaterialCard>
            </VFadeTransition>
        </VDialog>
    </div>
</template>

<script>
    import YIcon from "../common/YIcon";
    export default {
        name: "FloatHelper",
        components: {YIcon},
        data(){
            return{
                show : false,
                show1 : false
            }
        },
        watch : {
            show(newVal){
                if(newVal){
                    setTimeout(() => {
                        this.show1 = true;
                    },150);
                }else{
                    this.show1 = false;
                }
            }
        }
    }
</script>

<style>

    .float-button {
        bottom: 48px;
    }

    .v-dialog{
        box-shadow: none !important;
    }

    .__overlay{
        background-color: rgba(0,0,0,.25);
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 200;
        top: 0;
        left: 0;
    }

</style>