<template>
    <VCard flat>
        <YDialog v-model="show_change" v-on="$listeners" :width="$vuetify.breakpoint.width * 0.8">
            <UploadAvatarDialog slot="inner"></UploadAvatarDialog>
        </YDialog>
        <VLayout row wrap>
            <VFlex xs12>
                <VCard flat height="170" class="text-xs-center">
                    <YAvatar :uid="userUid" size="100" style="margin-top: 50px"></YAvatar>
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
    import base from '../../mixins/base';
    import YDialog from "../../components/common/YDialog";
    import YAvatar from "../../components/common/YAvatar";
    import UploadAvatarDialog from "../../components/common/UploadAvatarDialog";

    export default {
        name: "ViewSettingChangeAvatar",
        components: {YAvatar, UploadAvatarDialog, YDialog},
        mixins : [base],
        data(){
            return{
                show_change : false
            }
        },
    }
</script>