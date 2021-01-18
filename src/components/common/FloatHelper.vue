<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="position-relative" id="float-btn-group">
        <div class="helper-btn-group">
            <VLayout column wrap ref="holder">
                <VFlex v-if="$route.meta.btns.helper" xs12>
                    <VBtn @click="show_helper = !show_helper"
                          fab
                          small
                          dark
                          color="green"
                          ref="btn_1"
                          class="initial-btn"
                    >
                        <VIcon>mdi-help-circle-outline</VIcon>
                    </VBtn>
                </VFlex>
                <VFlex v-if="$route.meta.btns.new_post" xs12>
                    <VBtn @click="toEditor"
                          fab
                          dark
                          small
                          color="red"
                          ref="btn_2"
                          class="initial-btn"
                    >
                        <VIcon>mdi-circle-edit-outline</VIcon>
                    </VBtn>
                </VFlex>
                <VFlex v-if="$route.meta.btns.refresh" xs12>
                    <VBtn @click="refresh"
                          fab
                          dark
                          small
                          color="#ecde60"
                          ref="btn_3"
                          class="initial-btn"
                    >
                        <VIcon>mdi-refresh</VIcon>
                    </VBtn>
                </VFlex>
            </VLayout>
            <VBtn
                    fab
                    color="blue"
                    dark
                    @click="operateHelper"
            >
                <VIcon>{{ open ? 'mdi-menu-down' : 'mdi-menu-up' }}</VIcon>
            </VBtn>
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
    import YDialog from "../common/YDialog";
    import MaterialCard from "../material/Card";
    import { communicate } from "../../communicate";
    export default {
        name : "FloatHelper",
        components : {YDialog, MaterialCard},
        data(){
            return{
                show_helper : false,
                open : false
            }
        },
        methods : {
            toEditor(){
                this.$router.push({ name : 'editor' });
            },
            refresh() {
                communicate.$emit('refreshHome');
            },
            operateHelper(){
                this.open = !this.open;
            },
            handleMove(v){
                const nodes = this.$refs.holder.children;
                if(v){
                    for(let i = 0; i < 3; i++){
                        if(nodes[i]){
                            nodes[i].children[0].style.transform = `translateY(-${ i  * 45 + 60}px)`;
                        }
                    }
                }else{
                    for(let i = 0; i < 3; i++){
                        if(nodes[i]){
                            nodes[i].children[0].style.transform = `translateY(0)`;
                        }
                    }
                }
            }
        },
        watch : {
            open : {
                handler(v){
                    this.handleMove(v);
                }
            },
        }
    }
</script>

<style>
    #float-btn-group{
        z-index: 100 !important;
    }
    .initial-btn{
        position: absolute !important;
        bottom: 7px;
        right: 9px;
    }
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