<template>
    <VLayout row wrap>
        <VFlex xs12 sm9 md8 lg8>
            <VContainer class="mt-2 editor-items__title">
                <VTextField v-model="title" placeholder="标题"></VTextField>
                <RichEditor v-model="content"></RichEditor>
            </VContainer>
        </VFlex>
        <VFlex xs12 sm3 md4 lg4>
            <VContainer class="mt-5">
                <VCard>
                    <VCardTitle>
                        富文本内容
                    </VCardTitle>
                    <VCardText>
                        {{content}}
                    </VCardText>
                </VCard>
            </VContainer>
        </VFlex>
    </VLayout>
</template>

<script>

    import RichEditor from "../items/RichEditor";
    import base from '../../mixins/base';
    export default {
        name: "ViewEditor",
        components: {RichEditor},
        mixins: [base],
        data(){
            return{
                title : '',
                content : ''
            }
        }
    }
</script>

<style>
    .editor-items__title input{
        font-size: 30px !important;
    }
</style>