<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="position-relative">
        <div class="helper-btn-group">
            <VLayout column wrap>
                <VFlex xs12>
                    <VTooltip v-if="btn_show_1" left>
                        <template v-slot:activator="{ on }">
                            <VBtn @click="show_helper = !show_helper"
                                  v-on="on"
                                  fab
                                  dark
                                  color="green"
                            >
                                <YIcon style="font-size: 30px">
                                    iconset0143
                                </YIcon>
                            </VBtn>
                        </template>
                        <span>有事找我哦</span>
                    </VTooltip>
                </VFlex>
                <VFlex xs12>
                    <VTooltip v-if="btn_show_2" left>
                        <template v-slot:activator="{ on }">
                            <VBtn @click="toEditor"
                                  v-on="on"
                                  fab
                                  dark
                                  color="red"
                            >
                                <YIcon style="font-size: 30px;">
                                    jia
                                </YIcon>
                            </VBtn>
                        </template>
                        <span>新建博客</span>
                    </VTooltip>
                </VFlex>
            </VLayout>
        </div>
        <YDialog v-model="show_helper" width="500">
            <MaterialCard slot="inner" title="有问题请联系我">
                <li>邮箱：admin@srmxy.cn</li>
                <li>QQ：1845958331</li>
                <VCardActions>
                    <VSpacer></VSpacer>
                    <VBtn flat
                          text
                          color="primary"
                          @click="show_helper = !show_helper"
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
    import MaterialCard from "../material/Card";

    export default {
        name : "FloatHelper",
        components : {YDialog, YIcon, MaterialCard},
        data(){
            return{
                show_helper : false,
            }
        },
        computed : {
            btn_show_1(){
                let list = ['login','signin','index'];
                return !list.some(item => {
                    return item === this.$route.name;
                });
            },
            btn_show_2(){
                let list = ['login','signin','index','editor'];
                return !list.some(item => {
                    return item === this.$route.name;
                });
            }
        },
        methods : {
            toEditor(){
                this.$router.push({ name : 'editor' });
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

    .helper-btn-group{
        position: fixed;
        bottom: 40px;
        right: 20px;
    }

</style>