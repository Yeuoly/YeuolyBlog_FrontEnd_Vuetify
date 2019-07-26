<template>
    <MaterialCard title="上传头像">
        <VCard flat class="text-xs-center">
            <VAvatar v-if="!!img_path" size="200">
                <VImg :src="img_path"></VImg>
            </VAvatar>
        </VCard>
        <VTextField placeholder="选择头像"
                    label="上传"
                    @click="onclick"
                    ref="text"
                    @focus="unFocus"
                    v-model="file_name"
        ></VTextField>
        <input type="file" ref="file_button" style="display: none" @change="selectFile">
        <VCardActions>
            <VBtn :disabled="!img_path" color="primary" @click="upload">确定上传</VBtn>
            <VBtn :disabled="!img_path" color="white" @click="onclick">不行我再看看</VBtn>
        </VCardActions>
        <span class="caption ml-2">如需处理图片（压缩、裁剪）请使用编辑头像功能</span>
    </MaterialCard>
</template>

<script>
    import MaterialCard from "../material/Card";
    export default {
        name: 'UploadAvatarDialog',
        components: {MaterialCard},
        data () {
            return {
                file_name : '',
                img_path : '',
                file : null
            }
        },
        methods: {
            selectFile(e){
                try {
                    let file = e.target.files[0];
                    this.file_name = file.name;
                    let file_size = file.size;
                    if(file_size > 2 * 1024 * 1024){
                        alert('文件过大(要求2M以下)');
                        return;
                    }
                    this.img_path = window.URL.createObjectURL(file);
                    this.file = file;
                }catch(e){
                    return 0;
                }
            },
            upload(){
                let requestError = () => {
                    alert('服务器大姨妈了');
                };
                this.axios.post('v2/53001474031784309d75cf8438fee8a2').then( response => {
                    let csrf_token = response.data['data']['data']['jct'];
                    let from_data = new FormData();
                    from_data.append('img',this.file,'img');
                    from_data.append('jct',csrf_token);
                    this.axios.post('v1/account/change/avatar',from_data).then( response => {
                        let _data = response.data;
                        if(_data['data']['res'] === 666){
                            location.href = '/setting/avatar-change';
                        }
                    }).catch(() => {
                        requestError();
                    });
                }).catch(() => {
                    requestError();
                });

            },
            onclick(){
                this.$refs.file_button.click();
            },
            unFocus(){
                setTimeout(() => {
                    this.$refs.text.blur();
                },600);
            }
        }

    }
</script>

<style scoped>

</style>