<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VContainer class="position-relative passport__container register__container">
        <PopDialog v-model="dialog_show"
                   :pop-type="dialog_type"
                   :title="dialog_title"
                   :text="dialog_text"
                   :subtext="dialog_subtext"
        ></PopDialog>
        <MaterialCard title="注册"
                      :width="cardWidth"
                      class="position-absolute passport__card"
                      ref="card"
        >
            <VCard>
                <VCardText>
                    <li>注册一个全新的YS账号。</li>
                    <li>我们会对您的所有信息进行高度加密，但仍然存在被破解的可能。</li>
                    <li>最终解释权归YeuolyBlog所有。</li>
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


                    <VTextField label="用户名"
                                counter="16"
                                type="text"
                                :rules="[rule.required,rule2.account_min,rule2.account,rule2.account_max]"
                                v-model="account"
                    ></VTextField>


                    <VTextField label="密码"
                                counter="16"
                                :type="password_show ? 'text' : 'password'"
                                :append-icon="password_show ? 'visibility' : 'visibility_off'"
                                :rules="[rule.required,rule.password_min,rule.password_max,rule.password_format]"
                                @click:append="password_show = !password_show"
                                v-model="password"
                    ></VTextField>


                    <VTextField label="重复密码"
                                counter="16"
                                :type="repeat_password_show ? 'text' : 'password'"
                                :append-icon="repeat_password_show ? 'visibility' : 'visibility_off'"
                                :rules="[rule.required,rule.password_min,rule.password_max,rule.password_format]"
                                @click:append="repeat_password_show = !repeat_password_show"
                                v-model="repeat_password"
                    ></VTextField>


                    <VTextField label="验证码"
                                counter="5"
                                :rules="[rule.required,rule2.captcha]"
                                v-model="captcha_image"
                    >
                        <template v-slot:append-outer>
                            <VTooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <VImg v-on="on"
                                          width="100"
                                          @click="refreshCaptcha"
                                          :src="getImageCaptcha"
                                    ></VImg>
                                </template>
                                <span>小学算数</span>
                            </VTooltip>
                        </template>
                    </VTextField>


                    <VTextField label="邮箱验证码"
                                counter="6"
                                :rules="[rule.required,rule2.captcha_l,rule2.captcha]"
                                @click:append="repeat_password_show = !repeat_password_show"
                                v-model="captcha_email"
                    >
                        <template v-slot:append-outer>
                            <VBtn @click.stop="getEmailCaptcha"
                                  :disabled="!captcha_email_btn"
                            >
                                <span class="caption">
                                    {{captcha_email_btn_text}}
                                </span>
                            </VBtn>
                        </template>
                    </VTextField>


                    <div v-if="mdAndUp" class="passport__btn-group pb-2">
                        <VBtn class="left"
                              :disabled="!submit_valid"
                              @click.stop="signIn"
                        >
                            注册
                        </VBtn>
                        <VBtn class="right"
                              @click.stop="login"
                        >
                            登录
                        </VBtn>
                    </div>
                    <div v-else-if="smAndDown">
                        <VFlex xs12>
                            <VBtn block :disabled="!submit_valid"
                                  @click.stop="signIn"
                            >
                                注册
                            </VBtn>
                        </VFlex>
                        <VFlex xs12>
                            <VBtn block @click.stop="login">
                                登录
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
    import popdialog from './../../mixins/popdialog';
    import MaterialCard from '../material/Card';

    export default {
        name: "ViewSignIn",
        components: { MaterialCard },
        mixins : [passportBase,popdialog],
        computed : {
            cardWidth(){
                return this.$vuetify.breakpoint.smAndUp ? 400 : 300;
            },
            getImageCaptcha(){
                return process.env.VUE_APP_API_ROOT + '/v1/tool/verify/create/captcha?method=register&p=' + this.p;
            },
            containerHeight(){
                return 1300;
            },
            smAndDown(){
                return this.$vuetify.breakpoint.smAndDown;
            },
            mdAndUp(){
                return this.$vuetify.breakpoint.mdAndUp;
            }
        },
        data(){
            return{
                repeat_password : String(),
                repeat_password_show : false,
                captcha_email : '',
                captcha_image : '',
                account : '',
                captcha_email_btn : true,
                captcha_email_btn_text : '获取邮箱验证码',
                lastTime : 0,
                rule2 : {
                    captcha : v => !!v.match(/^[0-9]*$/g) || '验证码可不长这样',
                    captcha_l : v => v.length === 6 || '长度不对哦~',
                    account : v => !!v.match(/^[0-9a-zA-Z]*$/g) || '用户名怪怪的哦~',
                    account_max : v => v.length <= 16 || '好。。好长。。',
                    account_min : v => v.length >= 6 || '好~短~喔~'
                },
                dialog_title : '',
                dialog_text : '',
                dialog_type : 'info',
                dialog_subtext : '',
                dialog_show : false,
                p : 0
            }
        },
        methods : {
            login(){
                this.$router.push({name : 'login'});
            },
            signIn(){

            },
            getEmailCaptcha(){
                this.captcha_email_btn = false;
                this.axios.post('v1/tool/verify/create/email',this.$qs.stringify({
                    method : 'register',
                    email : this.email,
                    captcha : this.captcha_image
                })).then(response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.openDialog('验证码发送成功','验证码已经发送到主人的邮箱啦~请注意查哦。如果很久很久没有收到的话' +
                            '请主人重新发送啦。','有可能在主人的垃圾箱了啦。。，还没有的话请联系咱哦~','success');
                        this.captcha_email_btn_text = '60 秒后再试';
                        let timer = setInterval(() => {
                            this.lastTime++;
                            this.captcha_email_btn_text = ( 60 - this.lastTime ) + ' 秒后再试';
                            if(this.lastTime === 60){
                                clearInterval(timer);
                                this.captcha_email_btn = true;
                                this.captcha_email_btn_text = '获取邮箱验证码';
                                this.lastTime = 0;
                            }
                        },1000);
                    }else{
                        this.openDialog(
                            '验证码发送失败',
                            '嘤嘤嘤虽然不知道发送了什么，不过嘤就对了。',
                            _data['data']['error'],
                            'error'
                        );
                        this.captcha_email_btn = true;
                    }
                });
            },
            refreshCaptcha(){
                this.p++;
            }
        }
    }
</script>

<style>
    @import "./style/passport.css";

</style>