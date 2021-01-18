<template>
    <div class="v-overlay text-xs-center bg-overlay v-overlay--active" style="z-index: 99999;" v-show="value">
        <VProgressCircular
                class="app-items__loading"
                indeterminate
                size="64"
                color="white"
        ></VProgressCircular>
    </div>
</template>

<script>

    import { communicate } from "../../communicate";

    export default {
        name: "LoadingOverlay",
        data : () => ({
            value : false
        }),
        methods : {
            open(){
                this.value = true;
            },
            close(){
                this.value = false;
            }
        },
        created(){
            communicate.$on('openLoadingOverlay',this.open);
            communicate.$on('closeLoadingOverlay',this.close);
        }
    }
</script>