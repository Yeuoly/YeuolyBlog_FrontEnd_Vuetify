<template>
    <VContainer :heigth="containerHeight" class="position-relative login__container">
        <PopDialog v-model="dialog_show"
                   :pop-type="dialog_type"
                   :title="dialog_title"
                   :text="dialog_text"
                   :subtext="dialog_subtext"
        ></PopDialog>
        <MaterialCard title="登录" :width="cardWidth" class="position-absolute login__card">
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
                    <div class="login__btn-group pb-2">
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
                </VForm>
            </div>
        </MaterialCard>
    </VContainer>
</template>

<script>
    import passportBase from './../../mixins/passport'
    import PopDialog from "../common/PopDialog"
    import popdialog from './../../mixins/popdialog'

    export default {
        name: "ViewLogin",
        components: {PopDialog},
        computed : {
            cardWidth(){
                return this.$vuetify.breakpoint.smAndUp ? 400 : 300;
            },
            containerHeight(){
                return this.$vuetify.breakpoint.height - 50;
            }
        },
        mixins : [passportBase,popdialog],
        methods : {
            login(){
                let password = this.password;
                let email = this.email;
                this.axios.post('v1/account/login', this.$qs.stringify({
                        password : password,
                        email : email
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        location.href = process.env.VUE_APP_WEB_ROOT;
                    }else{
                        this.openDialog(
                            '登录失败',
                            '阿拉啦好像出现了点什么(*╹▽╹*)',
                            _data['data']['error'],
                            'error'
                        );
                    }
                }).catch( () => {
                    this.openDialog(
                        '服务器好像挂掉惹QAQ',
                        '可能在维护，也有可能真坏惹',
                        '',
                        'error'
                    );
                });
            },
            signIn(){
                this.$router.push({name : 'signin'});
            }
        }
    }
</script>

<style>

    .login__card{
        left: calc((100% - 400px) / 2);
    }

    .login__container{
        min-height: calc(100vh - 50px);
    }

    @media (max-width: 599px) {
        .login__card{
            left: calc((100% - 300px) / 2);
        }
    }

    .login__btn-group{
        overflow: auto;
        margin: 0 auto;
        width: 60%;
    }

</style>