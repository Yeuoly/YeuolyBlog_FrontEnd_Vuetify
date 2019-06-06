<template>
    <div class="position-relative">
        <VBtn @click="show = !show"
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
        <YDialog v-model="show" width="500">
            <MaterialCard slot="inner" title="有问题请联系我">
                <li>邮箱：admin@srmxy.cn</li>
                <li>QQ:1845958331</li>
                <VCardActions>
                    <VSpacer></VSpacer>
                    <VBtn flat
                          text
                          color="primary"
                          @click="show = !show"
                    >
                        我知道啦
                    </VBtn>
                </VCardActions>
            </MaterialCard>
        </YDialog>
    </div>
</template>

<script>
    import YIcon from "../common/YIcon";
    import YDialog from "../common/YDialog";
    export default {
        name: "FloatHelper",
        components: {YDialog, YIcon},
        data(){
            return{
                show : false
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