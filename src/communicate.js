import Vue from 'vue'

export let communicate = new Vue();

export let messageBox = (title,msg,sub,type) => {
    communicate.$emit('messageBox',title,msg,sub,type);
};