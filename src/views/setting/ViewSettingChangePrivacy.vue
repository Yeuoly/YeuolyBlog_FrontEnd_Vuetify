<template>
    <VCard flat>
        <VLayout class="px-2" colnum wrap>
            <VFlex xs12 v-for="( t , index ) in tips" :key="index">
                <VSwitch :disabled="locked" v-model="settings[index]" :label="t.title + '：' + t.detail"></VSwitch>
            </VFlex>
            <VFlex>
                <VBtn color="primary" @click="upload">保存设置</VBtn>
            </VFlex>
        </VLayout>
    </VCard>
</template>

<script>
    import { communicate } from "../../communicate";
    import { api_get_privacy_settings, api_change_privacy_settings } from '../../lib/static/api';

    export default {
        name: "ViewSettingChangePrivacy",
        data(){
            return {
                tips : [{
                    title : '允许访问',
                    detail : '允许他人访问我的空间'
                },{
                    title : '允许关注',
                    detail : '允许他人关注我'
                },{
                    title : '允许评论',
                    detail : '允许他人评论我的博客'
                },],
                settings : [ false , false , false ],
                locked : true
            }
        },
        methods : {
            load(){
                this.axios.post(api_get_privacy_settings.route ,this.$qs.stringify({
                    act : api_get_privacy_settings.act
                })).then( response => {
                    const _data = response.data;
                    if(_data['data']['res'] === 666 ){
                        let settings = _data['data']['data'];
                        settings.forEach( ( item , index )=> {
                            this.settings[index] = item;
                        });
                        this.locked = false;
                    }
                });
            },
            upload(){
                const form_data = new FormData();
                form_data.append('settings',this.settings);
                form_data.append('act',`${api_change_privacy_settings.act}`);
                this.$utils.csrf_post(
                    api_change_privacy_settings.route,
                    form_data,
                    response => {
                        let _data = response.data;
                        if(_data['data']['res'] === 666){
                            communicate.$emit('messageBox','成功','主人的设置保存成功啦','','success');
                        }else{
                            communicate.$emit('messageBox','失败',_data['data']['error'],'','error');
                        }
                    },
                    () => {
                        communicate.$emit('messageBox','失败','服务器大姨妈了','','error');
                    }
                );
            }
        },
        mounted(){
            this.load();
        }
    }
</script>

<style scoped>

</style>