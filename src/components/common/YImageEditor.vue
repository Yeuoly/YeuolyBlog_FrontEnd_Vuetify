<template>
    <VCard ref="master" class="px-2 py-2" style="position: relative">
        <VResponsive>
            <VResponsive>
                <VImg v-if="!!img_path" :src="img_path"/>
            </VResponsive>
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
    import YFileInput from "./YFileInput";
    export default {
        name: "ViewSettingEditAvatar",
        components: { YFileInput },
        data(){
            return{
                img: null,
                img_path : '',
                img_w : Number,
                img_h : Number,
                img_file : null,
                mouse_info : [ false , false , false , false],
                block_info : {
                    width : 0,
                    height : 0
                },
                origin_info : {
                    width : 0,
                    height : 0,
                },
                anchor : {
                    x : 0,
                    y : 0
                },
                margin : {
                    t : 0,
                    l : 0
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
                    case 0:
                        this.setPosition(0,event.pageX - this.margin.l);
                        break;
                    case 1:
                        this.setPosition(1,event.pageX - this.margin.l);
                        break;
                    case 2:
                        this.setPosition(2,event.pageY - this.margin.t);
                        break;
                    case 3:
                        this.setPosition(3,event.pageY - this.margin.t);
                        break;
                    case 4:
                }
            },
            setPosition(controller,p){
                let movement = 0;
                switch (controller) {
                    case 0:
                        movement = this.anchor.x;
                        this.anchor.x = p + 8;
                        movement = this.anchor.x - movement;
                        this.block_info.width -= movement;
                        break;
                    case 1:
                        this.block_info.width += this.anchor.x + this.block_info.width - p;
                        break;
                    case 2:
                        movement = this.anchor.y;
                        this.anchor.y = p + 8;
                        movement = this.anchor.y - movement;
                        this.block_info.height -= movement;
                        break;
                    case 3:
                        this.block_info.height += this.anchor.y + this.block_info.height - p;
                        break;
                    case 4:
                        break;
                }
            }
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
                    this.origin_info.width = this.block_info.width;
                    this.origin_info.height = this.block_info.height;
                    this.anchor.x = 8;
                    this.anchor.y = 8;
                }
            },
            'block_info.width' : {
                handler(newVal){
                    this.$refs.line_t.style.width = newVal + 'px';
                    this.$refs.line_b.style.width = newVal + 'px';
                    console.log(newVal);
                }
            },
            'block_info.height' : {
                handler(newVal){
                    this.$refs.line_l.style.height = newVal + 'px';
                    this.$refs.line_r.style.height = newVal + 'px';
                }
            },
            'anchor.x' : {
                handler(newVal){
                    this.$refs.line_l.style.left = newVal + 'px';
                    this.$refs.line_t.style.left = newVal + 'px';
                    this.$refs.line_b.style.left = newVal + 'px';
                    this.$refs.line_r.style.left = newVal + this.block_info.width + 'px';
                }
            },
            'anchor.y' : {
                handler(newVal) {
                    this.$refs.line_t.style.top = newVal + 'px';
                    this.$refs.line_l.style.top = newVal + 'px';
                    this.$refs.line_r.style.top = newVal + 'px';
                    this.$refs.line_b.style.top = newVal + this.block_info.height + 'px';
                }
            }
        },
        mounted() {
            const pos = this.$refs.master.$el.getBoundingClientRect();
            this.margin.l = pos.x + 8;
            this.margin.t = pos.y + 8;
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