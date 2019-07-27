<template>
    <VCard ref="master" class="px-2 py-2" style="position: relative">
        <div v-if="!!img_path"
             ref="line_l"
             class="controller-img controller-y"
             @mousemove="move($event,0)"
             @mousedown="lineDown(0)"
             @mouseup="lineUp(0)"
        ></div>
        <div v-if="!!img_path"
             ref="line_r"
             class="controller-img controller-y"
             @mousemove="move($event,1)"
             @mousedown="lineDown(1)"
             @mouseup="lineUp(1)"
        ></div>
        <div v-if="!!img_path"
             ref="line_t"
             class="controller-img controller-x"
             @mousemove="move($event,2)"
             @mousedown="lineDown(2)"
             @mouseup="lineUp(2)"
        ></div>
        <div v-if="!!img_path"
             ref="line_b"
             class="controller-img controller-x"
             @mousemove="move($event,3)"
             @mousedown="lineDown(3)"
             @mouseup="lineUp(3)"
        ></div>
        <div v-if="!!img_path"
             ref="overlay"
             class="v-overlay"
        ></div>
        <VResponsive>
            <div ref="img_holder">
                <img v-if="!!img_path" :src="img_path" alt="" style="width: 100%"/>
            </div>
            <VCardActions>
                <VLayout wrap row>
                    <VFlex xs12>
                        <YFileInput label="选择头像"
                                    placeholder="选择头像"
                                    v-model="img"
                                    max-size="5"
                                    ref="input_handler"
                        ></YFileInput>
                    </VFlex>
                    <VFlex xs12>
                        <VBtn color="primary" :disabled="!img_path">保存</VBtn>
                    </VFlex>
                </VLayout>
            </VCardActions>
        </VResponsive>
    </VCard>
</template>

<script>
    import YFileInput from "../../common/YFileInput";
    export default {
        name: "ViewSettingEditAvatar",
        components: { YFileInput },
        data(){
            return{
                img: null,
                img_path : '',
                img_w : Number,
                img_h : Number,
                img_h_eq_w : false,

                img_file : null,
                mouse_info : [ false , false , false , false],
                block_info : {
                    width : 0,
                    height : 0
                }
            }
        },
        methods : {
            lineDown(id){
                this.mouse_info[id] = true;
            },
            lineUp(id){
                this.mouse_info[id] = false;
            },
            move(event,controller){
                console.log(event);
                if(!this.mouse_info[controller])
                    return;
                switch (controller) {
                    case 1:

                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break
                }
            },
            setPosition(controller,p,l){
                switch (controller) {
                    case 0:
                        this.$refs.line_l.style.left = p + 8 + 'px';
                        break;
                    case 1:
                        this.$refs.line_r.style.left = p + 8 + 'px';
                        break;
                    case 2:
                        this.$refs.line_t.style.top = p + 8 + 'px';
                        break;
                    case 3:
                        this.$refs.line_b.style.top = p + 8 + 'px';
                        break;
                    case 4:
                        break;
                }
            }
        },
        watch : {
            img(newVal){
                this.img_path = window.URL.createObjectURL(newVal);
                let img_controller = new Image();
                img_controller.src = this.img_path;
                img_controller.onload = () => {
                    this.img_file = img_controller;
                    this.img_w = img_controller.width;
                    this.img_h = img_controller.height;
                    this.block_info.width = this.$refs.master.$el.offsetWidth - 16;
                    this.block_info.height = ( this.img_h / this.img_w ) * this.block_info.width;
                    this.$refs.line_l.style.height = this.block_info.height + 'px';
                    this.$refs.line_r.style.height = this.block_info.height + 'px';
                    this.$refs.line_t.style.width = this.block_info.width + 'px';
                    this.$refs.line_b.style.width = this.block_info.width + 'px';
                    this.setPosition(0,0);
                    this.setPosition(1,this.block_info.width);
                    this.setPosition(2,0);
                    this.setPosition(3,this.block_info.height);
                    if(this.img_h > this.img_w){
                        this.img_h_eq_w = true;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .controller-img{
        position: absolute;
        z-index: 3;
    }

    .controller-y{
        width: 3px;
        background-color: #00acc1;
    }

    .controller-x{
        height: 3px;
        background-color: #00acc1;
    }
</style>