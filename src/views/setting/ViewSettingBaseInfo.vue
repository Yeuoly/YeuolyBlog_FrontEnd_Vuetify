<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VContainer>
        <VCardTitle>
            基础信息（部分可用）
        </VCardTitle>

        <VTextField
                v-model="info.nickname.modified"
                label="用户名"
                counter="16"
                type="text"
        >
            <template v-slot:append-outer>
                <VBtn
                        :disabled="info.nickname.modified === info.nickname.origin"
                        @click.stop="sendModifiedNickname"
                >
                    修改
                </VBtn>
            </template>
        </VTextField>
        <VTextField
                v-model="info.email_ad"
                label="邮箱"
                type="text"
                disabled
        >
            <template v-slot:append-outer>
                <VBtn
                        @click.stop="toApplyPage"
                        disabled
                >
                    申请修改
                </VBtn>
            </template>
        </VTextField>

        <VCardTitle>修改密码</VCardTitle>
        <VDivider color="grey"></VDivider>
        <VTextField
                v-model="pswd.captcha"
                label="验证码"
                placeholder="您的邮箱将会收到一个八位数的数字验证码，请将它填在此处"
                counter="8"
                type="text"
                disabled
        >
            <template v-slot:append-outer>
                <VBtn
                        disabled
                >
                    获取验证码
                </VBtn>
            </template>
        </VTextField>
        <VTextField
                v-model="pswd.modified"
                label="新密码"
                counter="16"
                type="text"
                disabled
        >
            <template v-slot:append-outer>
                <VBtn
                        disabled
                >
                    修改
                </VBtn>
            </template>
        </VTextField>
    </VContainer>
</template>

<script>
    import { messageBox } from "../../communicate";
    import { api_change_nickname } from '../../lib/static/api';

    export default {
        name : "ViewSettingBaseInfo",
        data : () => ({
            info : {
                nickname : {
                    origin : '',
                    modified : ''
                },
                user_uid : 0,
                email_ad : '',
                user_cls : 0
            },
            pswd : {
                captcha : '',
                modified : ''
            }
        }),
        methods : {
            init(){
                this.info.email_ad = this.$store.getters.getEmail;
                this.info.nickname.origin = this.$store.getters.getUserName;
                this.info.nickname.modified = this.$store.getters.getUserName;
                this.info.user_cls = this.$store.getters.getClass;
                this.info.user_uid = this.$store.getters.getUid;
            },
            getPSWDCaptcha(){

            },
            sendModifiedPSWD(){

            },
            sendModifiedNickname(){
                this.axios.post(api_change_nickname.route ,this.$qs.stringify({
                    act : api_change_nickname.act,
                    name : this.info.nickname.modified
                })).then( r => {
                    const data = r.data;
                    if(data['data']['res'] === 666){
                        location.href = '/setting/base-info';
                    }else{
                        messageBox('错误',data['data']['error'],'','error');
                    }
                } )
            },
            toApplyPage(){

            }
        },
        mounted(){
            setTimeout(this.init);
        }
    }
</script>

<style scoped>

</style>