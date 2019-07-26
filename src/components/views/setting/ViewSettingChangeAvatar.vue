<template>
    <VCard flat>
        <YDialog v-model="show_change" v-on="$listeners" :width="$vuetify.breakpoint.width * 0.8">
            <UploadAvatarDialog slot="inner"></UploadAvatarDialog>
        </YDialog>
        <VLayout row wrap>
            <VFlex xs12>
                <VCard flat height="170" class="text-xs-center">
                    <VAvatar size="100" style="margin-top: 50px">
                        <VImg :src="avatar"></VImg>
                    </VAvatar>
                </VCard>
                <VCard flat class="text-xs-center">
                    <VBtn color="primary" round dark @click="show_change = true">更换头像</VBtn>
                    <VBtn round>历史头像</VBtn>
                </VCard>
            </VFlex>
        </VLayout>
    </VCard>
</template>

<script>
    import base from '../../../mixins/base';
    import YDialog from "../../common/YDialog";
    import UploadAvatarDialog from "../../items/UploadAvatarDialog";

    export default {
        name: "ViewSettingChangeAvatar",
        components: {UploadAvatarDialog, YDialog},
        mixins : [base],
        data(){
            return{
                show_change : false
            }
        },
        computed : {
            avatar(){
                return `${process.env.VUE_APP_API_ROOT}/v1/account/avatar?size=100&uid=${this.userUid}`;
            }
        },
        methods : {
            upload(){

            }
        }
    }
</script>

<style>

</style>