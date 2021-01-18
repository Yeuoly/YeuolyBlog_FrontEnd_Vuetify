<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VCard class="px-2">
        <VCardTitle>标签</VCardTitle>
        <VTextField @keypress="checkInput" v-model="text">
            <template v-slot:append-outer>
                <VBtn small color="primary" @click="checkInput({key : ' '})">添加</VBtn>
            </template>
        </VTextField>
        <CategoryBox :can-operate="true" :display="false" v-model="tags"></CategoryBox>
    </VCard>
</template>

<script>
    import CategoryBox from "../common/CategoryBox";
    import { enter_space_format_has } from '../../lib/pattern';

    export default {
        name: "TagsBox",
        components: {CategoryBox},
        model : {
            prop : 'hostValue',
            event : 'change',
        },
        props : {
            hostValue : {
                type : Array,
                default(){
                    return [];
                }
            }
        },
        data(){
            return{
                tags : [],
                text : ''
            }
        },
        methods : {
            checkInput(e){
                let key = e.key;
                if(enter_space_format_has.test(key)){
                    let list = this.text.split(enter_space_format_has);
                    this.text = '';
                    list.forEach( item => {
                        if(item !== '' && this.tags.indexOf(item) === -1){
                            this.tags.push(item);
                            this.$emit('change',this.tags);
                        }
                    });
                }
            }
        },
        watch : {
            hostValue(){
                this.tags = this.hostValue;
            }
        }
    }
</script>

<style scoped>

</style>