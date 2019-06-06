<template>
    <div>
        <FloatHelper/>
        <VLayout :height="$vuetify.breakpoint.height">

        </VLayout>
    </div>
</template>

<script>
    import FloatHelper from "../items/FloatHelper";
    export default {
        name: "ViewHome",
        components: {FloatHelper},
        mounted(){

        }
    }
</script>

<style>

</style>