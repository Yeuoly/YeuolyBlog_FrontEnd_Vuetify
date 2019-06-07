<template>
    <YDialog v-model="p__show"
             :width="width"
             v-on="$listeners"
    >
        <VCard slot="inner" class="grey lighten-5">
            <VAlert v-model="True"
                    :type="PopType"
                    class="mb-3"
            >
                {{title}}
            </VAlert>
            <VCardText>
                {{text}}
            </VCardText>
            <VCardText>
                {{subtext}}
            </VCardText>
            <VCardActions>
                <VSpacer></VSpacer>
                <VBtn flat
                      text
                      @click="p__show = false"
                >我知道啦</VBtn>
            </VCardActions>
        </VCard>
    </YDialog>
</template>

<script>
    import YDialog from "./YDialog";
    export default {
        name: "PopDialog",
        components: {YDialog},
        model : {
            prop : 'show',
            event : 'change'
        },
        props : {
            PopType : {
                type : String,
                default : 'info'
            },
            text : {
                type : String,
                default : ''
            },
            subtext : {
                type : String,
                default : ''
            },
            title : {
                type : String,
                default : ''
            },
            show_helper : {
                type : Boolean,
                default : false
            }
        },
        data(){
            return{
                p__show : false,
                variant: null,
                True : true
            }
        },
        methods: {
            change(){
                this.$emit('change',this.p__show);
            }
        },
        computed : {
            width() {
                return this.$vuetify.breakpoint.smAndUp ? 500 : 400;
            }
        },
        watch : {
            show_helper(){
                this.p__show = this.show_helper;
            },
            p__show(){
                this.change();
            }
        },
        mounted() {
            this.show = false;
        }
    }
</script>

<style scoped>

</style>