import Vue from 'vue'

export const communicate = new Vue();

export const messageBox = (title,msg,sub,type,hook) => {
    communicate.$emit('messageBox',title,msg,sub,type,hook || null);
};

export const openLoadingOverlay = () => {
    communicate.$emit('openLoadingOverlay');
};

export const closeLoadingOverlay = () => {
    communicate.$emit('closeLoadingOverlay');
};

export const router = () => {
    //这里的逻辑可能比较科幻，所以也写一下，其实就是创建一个空对象，利用引用传参去主根里取$router
    const container = {};
    communicate.$emit('getRouter', container);
    return container.router;
};