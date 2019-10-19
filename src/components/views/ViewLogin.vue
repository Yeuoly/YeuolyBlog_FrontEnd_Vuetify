<template>
    <VContainer :heigth="containerHeight" class="position-relative passport__container">
        <MaterialCard title="登录" :width="cardWidth" class="position-absolute passport__card">
            <VCard>
                <VCardText>
                    使用您的YS账号登录，YS账号为Yeuoly相关产品的通用账号
                </VCardText>
            </VCard>
            <div>
                <VForm v-model="submit_valid">
                    <VTextField label="邮箱"
                                counter="64"
                                type="text"
                                :rules="[rule.required,rule.email_max,rule.email_min,rule.email_format]"
                                v-model="email"
                    ></VTextField>
                    <VTextField label="密码"
                                counter="16"
                                :type="password_show ? 'text' : 'password'"
                                :append-icon="password_show ? 'visibility' : 'visibility_off'"
                                :rules="[rule.required,rule.password_min,rule.password_max,rule.password_format]"
                                @click:append="password_show = !password_show"
                                v-model="password"
                    ></VTextField>

                    <div v-if="mdAndUp" class="passport__btn-group pb-2">
                        <VBtn class="left"
                              :disabled="!submit_valid"
                              @click.stop="login"
                        >
                            登录
                        </VBtn>
                        <VBtn class="right"
                              @click.stop="signIn"
                        >
                            注册
                        </VBtn>
                    </div>
                    <div v-else>
                        <VFlex xs12>
                            <VBtn :disabled="!submit_valid"
                                  @click.stop="login"
                                  block
                            >
                                登录
                            </VBtn>
                        </VFlex>
                        <VFlex xs12>
                            <VBtn @click.stop="signIn"
                                  block
                            >
                                注册
                            </VBtn>
                        </VFlex>
                    </div>
                </VForm>
            </div>
        </MaterialCard>
    </VContainer>
</template>

<script>
    import passportBase from './../../mixins/passport';
    import MaterialCard from '../material/Card';

    import { messageBox } from "../../communicate";

    export default {
        name: "ViewLogin",
        components: { MaterialCard },
        computed : {
            cardWidth(){
                return this.$vuetify.breakpoint.smAndUp ? 400 : 300;
            },
            containerHeight(){
                return this.$vuetify.breakpoint.height - 50;
            },
            mdAndUp(){
                return this.$vuetify.breakpoint.mdAndUp;
            }
        },
        mixins : [passportBase],
        methods : {
            login(){
                let password = this.password;
                let email = this.email;
                this.axios.post('v1/account/ordinary/action', this.$qs.stringify({
                    password : password,
                    email : email,
                    act : 2
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        location.href = process.env.VUE_APP_WEB_ROOT;
                    }else{
                        messageBox('登录失败', '阿拉啦好像出现了点什么(*╹▽╹*)', _data['data']['error'], 'error');
                    }
                }).catch( () => {
                    messageBox('服务器好像挂掉惹QAQ', '可能在维护，也有可能真坏惹', '', 'error');
                });
            },
            signIn(){
                this.$router.push({name : 'signin'});
            }
        }
    }
</script>

<style>
    @import "./style/passport.css";
</style>