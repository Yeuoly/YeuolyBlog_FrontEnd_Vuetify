<template>
    <div class="y-file-input">
        <VTextField :placeholder="placeholder"
                    :label="label"
                    @click="onclick"
                    ref="text"
                    @focus="unFocus"
                    v-model="file_name"
        ></VTextField>
        <input type="file" ref="file_button" style="display: none" @change="selectFile">
    </div>
</template>

<script>
    export default {
        name: "YFileInput",
        model : {
            event : 'change',
            prop : 'hostValue'
        },
        props : ['hostValue','label','placeholder','maxSize','type'],
        data(){
            return{
                file : null,
                file_name : ''
            }
        },
        methods : {
            selectFile(e){
                try {
                    let file = e.target.files[0];
                    this.file_name = file.name;
                    let file_size = file.size;
                    if(file_size > parseInt(this.maxSize * 1024 * 1024)){
                        alert(`文件过大(要求${this.maxSize}M以下)`);
                        return;
                    }
                    this.file = file;
                    this.$emit('change',file);
                }catch(e){
                    return 0;
                }
            },
            onclick(){
                this.$refs.file_button.click();
            },
            unFocus(){
                setTimeout(() => {
                    this.$refs.text.blur();
                },600);
            }
        },
        mounted(){
            this.$on('select',this.onclick);
        },
        beforeDestroy(){
            this.$off('select',this.onclick);
        }
    }
</script>

<style scoped>

</style>