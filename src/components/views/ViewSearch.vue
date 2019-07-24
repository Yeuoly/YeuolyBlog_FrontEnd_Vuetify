<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VContainer>
        <VTextField v-model="search_key_word"
                    :placeholder="`请输入关键词(${placeholder})`"
        >
            <template v-slot:append-outer>
                <VBtn @click.stop=""
                      :disabled="!!!search_key_word"
                      color="primary"
                >
                    <span class="caption">
                        搜索
                    </span>
                </VBtn>
            </template>
        </VTextField>
        <VRadioGroup v-model="search_type" row>
            <VRadio v-for="t in selections"
                    :key="t.value"
                    :label="t.label"
                    :value="t.value"
                    :disabled="t.disabled"
            />
        </VRadioGroup>
        <VDivider />
        <VContent flat>
            <VCard v-for="( t , key ) in result"
                   :key="key"
                   flat
            >
                <VCard v-if="t['type'] === 'user'">

                </VCard>
                <VCard v-else-if="t['type'] === 'post'">

                </VCard>
            </VCard>
        </VContent>
    </VContainer>
</template>

<script>
    export default {
        name: "ViewSearch",
        data(){
            return{
                search_type : 'user',
                search_key_word : '',
                selections : [{
                    label : '用户',
                    value : 'user',
                    disabled : false
                },{
                    label : '博客',
                    value : 'post',
                    disabled : true
                },],
                result : []
            }
        },
        methods : {
            search(){
                this.axios.post(`v1/search/${this.search_type}`).then( response => {

                }).catch( () =>{

                });
            }
        },
        computed : {
            placeholder(){
                switch (this.search_type) {
                    case 1:
                        return 'uid、用户名';
                    case 2:
                        return 'pid、标题';
                    default:
                        return '任意';
                }
            }
        }
    }
</script>

<style scoped>

</style>