//图片验证码
export const captcha_picture_format_all = /^[0-9]*$/g;

//博客id
export const pid_format_all = /^([a-f0-9]{32})$/g;

//是否包含博客id
export const pid_format_has = /[a-f0-9]{32}/g;

//是否有空格
export const space_format_has = /[ ]/g;

//用户名
export const username_format_all = /^[0-9a-zA-Z\u4E00-\u9FA5\u0800-\u4E00]*$/g;

//密码
export const password_format_all = /^([a-zA-Z0-9\-.+@#!$%^&*();[\]]*)$/g;

//邮箱
export const email_format_all = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\\.-])+\.([A-Za-z]){2,4}$/g;

//是否同时包含空格与换行符
export const enter_space_format_has = /[\n\r ]/g;