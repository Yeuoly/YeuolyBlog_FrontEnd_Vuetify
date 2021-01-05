<template>
    <div>
        <PopDialog v-model="dialog_show"
                   :pop-type="dialog_type"
                   :title="dialog_title"
                   :text="dialog_text"
                   :subtext="dialog_subtext"
                   @hook="dialog_hook"
        >
        </PopDialog>
        <LoadingOverlay/>
        <img class="preview-img" style="display: none">
        <VSlideYTransition group mode="out-in">
            <div key="1">
                <KeepAlive key="1">
                    <RouterView v-if="$route.meta.keepAlive"></RouterView>
                </KeepAlive>
            </div>
            <RouterView key="2" v-if="!$route.meta.keepAlive"></RouterView>
        </VSlideYTransition>
        <!--<Live2DGirl v-if="$vuetify.breakpoint.smAndDown" v-show="$route.name === 'maid-garden'" />-->
    </div>
</template>

<script>
    import { communicate } from "../../communicate";
    import PopDialog from "../common/PopDialog";
    import popdialog from '../../mixins/popdialog';
    import Live2DGirl from "../items/Live2DGirl";
    import LoadingOverlay from "../items/LoadingOverlay";

    export default {
        name: "Container",
        components: {LoadingOverlay, Live2DGirl, PopDialog},
        mixins: [popdialog],
        methods: {
            previewImg(src){
                const img = new Image();
                const set = img => {
                    const w = img.width;
                    const h = img.height;
                    this.$preview.open(0, [{src, w, h}]);
                }
                img.src = src;
                if(img.complete){
                    set(img);
                }else{
                    img.onload = () => set(img);
                }
            }
        },
        mounted() {
            communicate.$on('messageBox',this.openDialog);
            communicate.$on('previewImg',this.previewImg);
        }
    }
</script>