<template>
    <VContainer style="padding: 0">
        <VSlideYTransition mode="out-in">
            <RouterView v-if="$route.meta.keepAlive"></RouterView>
            <KeepAlive>
                <RouterView v-if="$route.meta.keepAlive"></RouterView>
            </KeepAlive>
        </VSlideYTransition>
    </VContainer>
</template>

<script>
    export default {
        name: "Container"
    }
</script>

<style scoped>

</style>