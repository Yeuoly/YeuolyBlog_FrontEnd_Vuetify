import Vue from 'vue'

export let communicate = new Vue();

export let messageBox = (title,msg,sub,type,hook) => {
    communicate.$emit('messageBox',title,msg,sub,type,hook || null);
};