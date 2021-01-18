<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VCard flat ref="master" class="px-2 py-2" style="position: relative">
        <VResponsive>
            <VueCropper ref="cropper"
                        output-type="jpeg || png || webp"
                        :can-move="true"
                        :can-move-box="true"
                        :img="img_path"
                        :fixed="true"
                        :fixed-number="[1,1]"
                        :info="true"
                        :output-size="quality / 100"
            ></VueCropper>
        </VResponsive>
        <YFileInput label="选择头像"
                    placeholder="选择头像"
                    v-model="img"
                    max-size="5"
                    ref="input_handler"
        ></YFileInput>
        <VSlider v-model="quality"
                 label="质量"
                 min="1"
                 max="100"
        >
            <template v-slot:prepend>
                <VBtn color="primary"
                      :disabled="!img_path"
                      @click.stop="over('blob')"
                >
                    保存到本地
                </VBtn>
            </template>
            <template v-slot:append>
                <v-text-field
                        v-model="quality"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                ></v-text-field>
            </template>
        </VSlider>
        <VCardText>
            <li>因为是头像编辑，迫于一些不可抗因素，图片比例将保持在1:1</li>
            <li>点击保存到本地将会下载剪切后的图片到本地</li>
            <li>调整质量大小可以调整图片的质量与大小，由于最高支持2M上传，建议适当调小质量大小</li>
        </VCardText>
    </VCard>
</template>

<script>
    import { VueCropper } from 'vue-cropper';
    import YFileInput from "../../components/common/YFileInput";

    export default {
        name: "ViewSettingEditAvatar",
        components : {YFileInput, VueCropper },
        data(){
            return{
                img: null,
                img_path : '',
                img_name : '',
                block_info : {
                    width : 0,
                    height : 0
                },
                quality : 100
            }
        },
        methods : {
            start(){
                this.$refs.cropper.startCrop();
            },
            stopCrop(){
                this.$refs.cropper.stopCrop();
            },
            over() {
                let aLink = document.createElement('a');
                aLink.download = this.img_name;
                this.$refs.cropper.getCropBlob( data => {
                    this.downImg = window.URL.createObjectURL(data);
                    aLink.href = window.URL.createObjectURL(data);
                    aLink.click();
                });
            },
        },
        watch : {
            img(newVal){
                this.img_path = window.URL.createObjectURL(newVal);
                const img_controller = new Image();
                img_controller.src = this.img_path;
                img_controller.onload = () => {
                    this.img_file = img_controller;
                    this.img_w = img_controller.width;
                    this.img_h = img_controller.height;
                    this.block_info.width = this.$refs.master.$el.offsetWidth - 16;
                    this.block_info.height = ( this.img_h / this.img_w ) * this.block_info.width;
                    this.img_name = this.img.name;
                    this.start();
                }
            },
            'block_info.width' : {
                handler(newVal){
                    this.$refs.cropper.$el.style.width = newVal + 'px';
                }
            },
            'block_info.height' : {
                handler(newVal){
                    this.$refs.cropper.$el.style.height = newVal + 'px';
                }
            }
        }
    }
</script>

<style scoped>

</style>