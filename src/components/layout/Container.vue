<template>
    <VSlideYTransition group mode="out-in">
        <div key="1">
            <KeepAlive key="1">
                <RouterView v-if="$route.meta.keepAlive"></RouterView>
            </KeepAlive>
        </div>
        <RouterView key="2" v-if="!$route.meta.keepAlive"></RouterView>
    </VSlideYTransition>
</template>

<script>
    export default {
        name: "Container"
    }
</script>

<style scoped>

</style>