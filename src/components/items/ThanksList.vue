<template>
    <MaterialCard title="特别鸣谢">
        <li><a href="https://www.wikimoe.com">维基萌</a>开源的live2d源码</li>
        <li><a href="https://www.live2d.com">L2D</a>免费公开的live2d模型</li>
        <li><a href="https://www.biliob.com">见齐</a>开源的前端设计源码</li>
        <li><a href="https://www.vuejs.org">尤大</a>开源的Vue框架</li>
        <li><a href="https://next.vuetifyjs.com">vuetify</a>的UI库</li>
        <li><a href="https://www.iconfont.cn">阿里</a>的免费矢量图库</li>
    </MaterialCard>
</template>

<script>
    import MaterialCard from "../material/Card";
    export default {
        name: "ThanksList",
        components: {MaterialCard}
    }
</script>