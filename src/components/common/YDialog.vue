<template>
    <VDialog v-model="show" v-bind="$attrs">
        <VFadeTransition>
            <VCard v-show="show1">
                <slot name="inner"></slot>
            </VCard>
        </VFadeTransition>
    </VDialog>
</template>

<script>
    export default {
        name: "YDialog",
        model : {
            type : Boolean,
            default : false,
            event : 'change'
        },
        data(){
            return{
                show : false,
                show1 : false
            }
        },
        computed : {
            value(){
                return this.$attrs.value;
            }
        },
        methods : {
            change(){
                this.$emit('change',this.show);
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
                this.change();
            },
            value(){
                this.show = this.$attrs.value ? this.$attrs.value : false;
            }
        }
    }
</script>

<style>

</style>