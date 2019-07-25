<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VContainer>
        <PopDialog v-model="dialog_show"
                   :pop-type="dialog_type"
                   :title="dialog_title"
                   :text="dialog_text"
                   :subtext="dialog_subtext"
        />
        <VTextField v-model="search_key_word"
                    :placeholder="`请输入关键词(${placeholder})`"
        >
            <template v-slot:append-outer>
                <VBtn @click.stop="search"
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
        <VContent flat>
            <VCard flat v-if="result.length === 0 && clicked" class="text-xs-center">
                果咩纳塞，没有找到主人搜索的内容QAQ
            </VCard>
            <VCard v-for="( t , key ) in result"
                   :key="key"
                   flat
                   class="clickable"
            >
                <VCard v-if="t['type'] === 'user'"
                       @click="visit(t.uid)"
                >
                    <VCardTitle>
                        用户名:{{t.name}} | uid:{{t.uid}} | 职阶：{{level(t.class)}}
                    </VCardTitle>
                    <VResponsive class="ml-2 pb-2">
                        <VAvatar size="75">
                            <VImg :src="avatar(t.uid)"></VImg>
                        </VAvatar>
                    </VResponsive>
                </VCard>
                <VCard v-else-if="t['type'] === 'post'">

                </VCard>
            </VCard>
        </VContent>
    </VContainer>
</template>

<script>
    import PopDialog from "../common/PopDialog";
    import popdialog from "../../mixins/popdialog";

    export default {
        name: "ViewSearch",
        components: {PopDialog},
        mixins : [popdialog],
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
                result : [],
                clicked : false,
            }
        },
        methods : {
            search(){
                this.axios.post(`v1/search/${this.search_type}`,this.$qs.stringify({
                    kw : this.search_key_word,
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.loadResult(_data['data']['data']);
                    }else{
                        this.openDialog('发生了一些错误',_data['data']['error'],'','error');
                    }
                }).catch( () => {
                    this.openDialog('发生了一些错误','服务器错误，请联系管理员','','error');
                }).finally( () => {
                    setTimeout( () => {
                        this.clicked = true;
                    },200);
                });
            },
            loadResult(res){
                this.result = res;
            },
            visit(uid){
                this.$router.push({ name : 'visit' ,query : { uid : uid } });
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
            },
            level(){
                return (num) => {
                    switch (num) {
                        case 1:
                            return '普通用户';
                        case 2:
                            return '风纪委员';
                        case 3:
                            return '部门管理';
                        case 4:
                            return '最高管理';
                    }
                }
            },
            avatar(){
                return (uid) => {
                    return `${process.env.VUE_APP_API_ROOT}/v1/account/avatar?uid=${uid}`;
                }
            }
        }
    }
</script>

<style scoped>

</style>