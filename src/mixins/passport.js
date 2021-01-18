import { email_format_all, password_format_all } from '../lib/pattern';

export default {
    data(){
        return{
            password : '',
            email : '',
            rule : {
                required : v => !!v || '这个是必须的哦~',
                password_min : v => v.length >= 6 || '我就没见过这么短的！',
                email_min : v => v.length >= 6 || '你能不能长一点啊（半恼',
                password_max : v => v.length <= 16 || '人家受不了这么长的啦！',
                email_max : v => v.length <= 64 || '这么长是不可以的啊！！',
                email_format : v => !!v.match(email_format_all) || '邮箱可不长这样哦→_→',
                password_format : v => !!v.match(password_format_all) || '好奇怪的密码哦←_←'
            },
            password_show : false,
            submit_valid : null
        }
    }
}