<template>
    <MaterialCard title="上传头像">
        <VCard flat class="text-xs-center">
            <VAvatar v-if="!!img_path" size="200">
                <VImg :src="img_path"></VImg>
            </VAvatar>
        </VCard>
        <YFileInput label="上传"
                    placeholder="选择头像"
                    v-model="file"
                    max-size="2"
                    ref="upload_handler"
        />
        <VCardActions>
            <VBtn :disabled="!img_path" color="primary" @click="upload">确定上传</VBtn>
            <VBtn :disabled="!img_path" color="white" @click="onclick">不行我再看看</VBtn>
        </VCardActions>
        <span class="caption ml-2">如需处理图片（压缩、裁剪）请使用编辑头像功能</span>
    </MaterialCard>
</template>

<script>
    import MaterialCard from "../material/Card";
    import YFileInput from "../common/YFileInput";

    import { messageBox } from "../../communicate";

    export default {
        name: 'UploadAvatarDialog',
        components: {YFileInput, MaterialCard},
        data () {
            return {
                file_name : '',
                img_path : '',
                file : null
            }
        },
        methods: {
            upload(){
                const from_data = new FormData();
                from_data.append('img',this.file,'img');
                from_data.append('act','0');
                this.$utils.csrf_post(
                    'v1/account/online/action',
                    from_data,
                    response => {
                        const _data = response.data;
                        if (_data['data']['res'] === 666) {
                            location.href = '/setting/avatar-change';
                        }
                    },
                    () => {
                        messageBox('错误','服务器大姨妈了','','error');
                    }
                );
            },
            onclick(){
                this.$refs.upload_handler.$emit('select');
            }
        },
        watch : {
            file(newVal){
                this.img_path = window.URL.createObjectURL(newVal);
            }
        }
    }
</script>

<style scoped>

</style>