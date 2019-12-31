<template>
    <VContainer>
        <MaterialCard color="rgb(50,50,50)" title="关于这个网站">
            <p>其实呢，这个网站现在大概就算是个记事本（日记本），支持隐私保护以及一些筛选功能。</p>
            <p>网站前端开源在 <a href="https://github.com/Yeuoly/YeuolyBlog_FrontEnd_Vuetify">github</a></p>
            <p>前端使用的框架是Vue.js，UI库是Vuetify（其实之前有做过ElementUI的版本，但感觉不好就没用了）</p>
            <p>欢迎大家提交代码来完善网站的美化工作（希望你们看得懂我写得代码x</p>
            <p>后端因为写得太烂加为了网站安全就不开源了</p>
        </MaterialCard>
        <MaterialCard color="rgb(50,50,50)" title="技术相关">
            <h5>前端</h5>
            <li>框架使用了Vue.js</li>
            <li>采取了渐进式WEB应用程序，能够在浏览器上获得原生App般的体验，前提是使用Chrome、Safari、edge等主流浏览器。</li>
            <li>使用了Vue全家桶，VueRouter Vuex VueCli3.0等</li>
            <li>前端UI库使用了Vuetify，这是一个基于Material Design的由歪果仁维护的UI库</li>
            <h5>后端</h5>
            <li>框架使用了ThinkPHP</li>
            <li>使用了PHPMailer用于邮件发送</li>
            <h5>数据库</h5>
            <li>使用了MongoDB</li>
            <h5>缓存</h5>
            <li>缓存数据库使用了Redis，同时还用于用户博客的推送队列</li>
        </MaterialCard>
    </VContainer>
</template>

<script>
    import MaterialCard from "../material/Card";
    export default {
        name: "ViewIndex",
        components: { MaterialCard},
    }
</script>