<template>
    <i :class="iconName +' iconfont'"></i>
</template>

<script>
    export default {
        name: "YIcon",
        computed : {
            iconName(){
                if(typeof this.$slots.default[0].text === 'string')
                    return  'icon' + this.$slots.default[0].text.replace(/^\s+|\s+$/g,'');
                return 'default';
            }
        }
    }
</script>

<style>
    .iconMyHome:before{
        content: '\e60e' !important;
    }
</style>