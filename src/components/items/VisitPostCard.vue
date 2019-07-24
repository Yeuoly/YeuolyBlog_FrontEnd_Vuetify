<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VCard block>
        <VLayout wrap row>
            <VFlex lg1 md2 sm2 xs3>
                <VAvatar size="50" class="mx-2 mt-2">
                    <VImg :src="avatar"></VImg>
                </VAvatar>
            </VFlex>
            <VFlex lg10 md9 sm9 xs8>
                <VCardTitle>
                    <span class="mr-2">
                        {{ date }}
                    </span>
                    <span class="mr-2">
                        {{ user }}
                    </span>
                    <span>
                        {{ title }}
                    </span>
                </VCardTitle>
            </VFlex>
            <VFlex xs12>
                <YHtmlCompiler class="px-3" :html="text"></YHtmlCompiler>
            </VFlex>
        </VLayout>
    </VCard>
</template>

<script>
    import YHtmlCompiler from "../common/YHtmlCompiler";

    export default {
        name: "VisitPostCard",
        components: {YHtmlCompiler},
        props : {
            post_id: String,
            title : String,
            avatar : String,
            user : String,
            text : String,
            time : Number
        },
        computed : {
            date(){
                return this.$utils.date('M-D',this.time);
            }
        },
    }
</script>

<style scoped>

</style>