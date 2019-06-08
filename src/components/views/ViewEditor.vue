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
                        须知
                    </VCardTitle>
                    <VCardText>
                        <li>请勿发表/转发任何违反中华人民共和国法律的言论。</li>
                        <li>小破站维护不容易，请各位大佬手下留情，感激不尽。</li>
                        <li>我们对会对攻击者的输入内容进行多次过滤转译以确保网站的安全性，但仍存在有漏洞的可能。</li>
                        <li>您的输入内容将会被按加密等级进行加密，默认加密等级为0，您可以向站长申请更高的加密等级。</li>
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
        components: { RichEditor },
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