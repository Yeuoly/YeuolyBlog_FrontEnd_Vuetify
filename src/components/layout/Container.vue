<template>
    <div>
        <PopDialog v-model="dialog_show"
                   :pop-type="dialog_type"
                   :title="dialog_title"
                   :text="dialog_text"
                   :subtext="dialog_subtext">
        </PopDialog>
        <VSlideYTransition group mode="out-in">
            <div key="1">
                <KeepAlive key="1">
                    <RouterView v-if="$route.meta.keepAlive"></RouterView>
                </KeepAlive>
            </div>
            <RouterView key="2" v-if="!$route.meta.keepAlive"></RouterView>
        </VSlideYTransition>
        <Live2DGirl />
    </div>
</template>

<script>
    import PopDialog from "../common/PopDialog";
    import { communicate } from "../../communicate";
    import popdialog from '../../mixins/popdialog';
    import Live2DGirl from "../items/Live2DGirl";

    export default {
        name: "Container",
        components: {Live2DGirl, PopDialog},
        mixins : [popdialog],
        mounted() {
            communicate.$on('messageBox',this.openDialog)
        }
    }
</script>

<style scoped>

</style>