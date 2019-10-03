<template>
    <VContainer>
        <MaterialCard title="关于这个网站">
            <p>其实呢，这个网站现在大概就算是个记事本（日记本），支持隐私保护以及一些筛选功能。</p>
            <p>网站前端开源在 <a href="https://github.com/Yeuoly/YeuolyBlog_FrontEnd_Vuetify">github</a></p>
            <p>前端使用的框架是Vue.js，UI库是Vuetify（其实之前有做过ElementUI的版本，但感觉不好就没用了），图标库使用的是阿里的iconfont</p>
            <p>欢迎大家提交代码来完善网站的美化工作（希望你们看得懂我写得代码x</p>
            <p>后端因为写得太烂加为了网站安全就不开源了</p>
        </MaterialCard>
        <MaterialCard title="最新动态">
            一些有必要说的事情
            <li>因为芸璃现在在忙高考，所以现在YeuolyBlog的更新是由朋友在做哒！可能有一些地方的设计和芸璃的设想会不太一样
            ，希望大家理解啦</li>
            更新：
            <li class="text-primary">2019/10/1更新了看板娘！！！！！可以在设置里打开！！！</li>
            <li>2019/9/20更新了主页和界面样式，现在看着大概更舒服了叭</li>
            <li>2019/9/7 更新了隐私功能</li>
            <li>有了隐私功能之后，大家就可以设置自己的空间是否可以被访问啦~</li>
            说起来站长自己的账号一直都有隐私功能的说，这个人好坏哦x
            <li>然后呢，这差不多就是最后一次更新啦~除非出现了致命的漏洞，否则就不会再有新的更新啦</li>
            <li>最后一件事，有关YeuolyBlog的消息将会更新在<a href="/visit?uid=8">YeuolyBlog</a>这个账号里，有兴趣的同学可以康一康~</li>
        </MaterialCard>
        <ThanksList />
    </VContainer>
</template>

<script>
    import MaterialCard from "../material/Card";
    import ThanksList from "../items/ThanksList";
    export default {
        name: "ViewIndex",
        components: {ThanksList, MaterialCard},
    }
</script>