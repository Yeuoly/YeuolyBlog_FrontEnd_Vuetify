<template>
    <MaterialCard title="开发日志">
        <VTimeline>
            <VTimeLineItem>

            </VTimeLineItem>
        </VTimeline>
    </MaterialCard>
</template>

<script>
    import MaterialCard from '../material/Card';

    /**
     * 更新日志
     * αβγδεζηθικλμνξοπρστυφχψω
     */
    export let updateLog = [
        {
            title   : '重构后端，半重构前端',
            version : '1.3-α',
            content : '后端使用ThinkPHP框架进行重构，前端移除bootstrap，新引入了ElementUI组件库',
            date    : '2019/5/24'
        },
        {
            title   : '性能优化',
            version : '1.2.1.03-γ',
            content : '启用vue按需加载，大大提升了用户初次加载时的体验（个鬼啊',
            date    : '2019/5/2',
        },
        {
            title   : '重构界面样式',
            version : '1.2.1.03-β',
            content : '使用bootstrap重构了home和侧边菜单界面，用户体验提升，对系统负载减小',
            date    : '2019/5/2',
        },
        {
            title   : '引入bootstrap',
            version : '1.2.1.03-α',
            content : '正式引入bootstrap，摒弃蛋疼的自己写css，修复关于界面移动端界面宽度的bug',
            date    : '2019/4/20',
        },
        {
            title   : '美化，优化',
            version : '1.2.1.02-β',
            content : '添加前端界面平滑切换动画，优化路由判断逻辑',
            date    : '2019/4/20',
        },
        {
            title   : '修复bug，新功能，美化',
            version : '1.2.1.02-α',
            content : '修复消息盒在手机端文字会卡出窗体外的bug，添加用户隐私设置',
            date    : '2019/4/19',
        },
        {
            title   : '修复bug',
            version : '1.2.1.01-δ',
            content : '修复home界面没有默认头像的bug',
            date    : '2019/4/14',
        },
        {
            title   : '修复bug，新功能',
            version : '1.2.1.01-γ',
            content : '修复了编辑界面无法加载博客信息的bug，添加了评论等功能的界面，暂不可用，修复了common-button' +
                '的css的bug，优化了common-button',
            date    : '2019/4/13',
        },
        {
            title   : '修复bug',
            version : '1.2.1.01-β',
            content : '修复了手机端输入时输入框会被虚拟键盘挡住的bug',
            date    : '2019/4/13',
        },
        {
            title   : '修复bug，美化',
            version : '1.2.1.01-α',
            content : '修复了换行会json字符串转化错误的bug，about界面的换行bug已修复，美化了侧边用户栏，' +
                '添加了默认用户头像',
            date    : '2019/4/12',
        },
        {
            title   : '新功能及美化',
            version : '1.2.1.0-α',
            content : '大量修改了样式，布局风格修改，性能优化，修改了编辑器编码格式，添加修改用户个人信息' +
                '，增添Q&A界面和setting界面，添加了logo，终于有主页了，添加了访问量统计',
            date    : '2019/4/7'
        },
        {
            title   : '修复及优化',
            version : '1.2.0.1-α',
            content : '修复标题会和操作栏以及正文重叠的bug，性能优化，编辑框升级添加工具栏，支持图片上传',
            date    : '2019/3/30'
        },
        {
            title   : '单页应用重构完成',
            version : '1.2-release',
            content : '经过一段时间的重构，正式以单页应用的形式上线，为了更佳的体验，修改了大量样式',
            date    : '2019/3/23'
        },
        {
            title   : '开始大规模重构',
            version : '1.2-α',
            content : '考虑到网站的兼容性、可管理性、可扩展性等因素，对网站前端进行了大规模重构' +
                '，改为单页应用，正式使用webpack和vue-cli',
            date    : '2019/2/30'
        },
        {
            title   : '基本功能完工',
            version : '1.1-release',
            content : '基本的功能已完成，并对之前的功能进行了一定的优化，可以第一次上线测试',
            date    : '2019/2/16'
        },
        {
            title   : '前端index完工',
            version : '1.0.21-α',
            content : '前端index.html index.css index.js基本完成，侧边顶部固定栏完成，整体框架' +
                '升级为Vue.js，完善了代码结构，更容易看懂我在写什么辣鸡代码了',
            date    : '2019/2/1'
        },
        {
            title   : '整体大更新，项目改名YeuolyBlog',
            version : '1.0.2-α',
            content : '整体重构，后端改为面向对象编程，开始向github更新，去除页面壁纸，改为白色背景简约布局',
            date    : '2019/1/28'
        },
        {
            title   : '整体大更新',
            version : '1.0.1-β',
            content : '分离前后端，从石器时代进入共产主义时代（大雾',
            date    : '2018/12/01'
        },
        {
            title   : '项目改名NotForget',
            version : '1.0.1-α',
            content : '项目改名，旨在建立一个帮助用户记录信息，爬取信息，以及周期性规律性地进行数据更新',
            date    : '2018/11/10'
        },
        {
            title   : '项目UserInfo初步完成',
            version : '1.0.0-release',
            content : '完成部分预期功能，初步上线测试，一共四个内测用户，预期功能正常运作',
            date    : '2018/10/07'
        },
        {
            title   : '项目UserInfo启动',
            version : '0.0.0-α',
            content : '启动项目，建立基础数据库，建立初步用户数据库结构，旨在建立一个帮助用户保存信息的网站，' +
                '用于储存用户的私人信息，如账号密码等',
            date    : '2018/10/01'
        }
    ];

    /**
     * 使用到的工具
     */
    export let techList = [
        {
            name : '&#xe617;',
            content : 'HTML5网站基础框架'
        },
        {
            name : '&#xe63b;',
            content : 'CSS样式表'
        },
        {
            name : '&#xec68;',
            content : 'JavaScript'
        },
        {
            name : '&#xf25f;',
            content : '使用了Vue.js框架，还不太会用，处于学习阶段，本站就作为练手（学习中）项目' +
                '写得不好的地方望各位指出'
        },
        {
            name : '&#xf25f;',
            content : 'Vue全家桶，Vue-router路由 Vue-cli3.0脚手架 Vuex状态管理'
        },
        {
            name : '&#xe602;',
            content : 'ElementUI是由饿了么前端开源的一个Vue组件库'
        },
        {
            name : '&#xe699;',
            content : 'axios作为网站的异步请求工具'
        },
        {
            name : '&#xe6ae;',
            content : 'Echarts是由百度开源的图表库'
        },
        {
            name : '&#xe743;',
            content : 'picb是一个图床，因为咱的服务器太烂了，顶不死大图片，所以就传到第三方去了，' +
                '这个图床非常良心，放心用。所有可以编辑图片的界面的左上角都会有上传按钮，官网地址：www.picb.cc'
        },
        {
            name : '&#xe62c;',
            content : 'iconfont这是一个阿里的矢量图库，官网地址：www.iconfont.cn'
        },
        {
            name : '&#xe667;',
            content : '数据库使用了MySQL，小网站，就没用MongoDB了'
        },
        {
            name : '&#xf20e;',
            content : '网站后端采用了PHP，因为好用，也是我用得较多的一门语言之一，也处于学习阶段，' +
                '所以各个方面的优化可能还不尽人意，理解万岁~'
        },
        {
            name : '&#xf20e;',
            content : 'ThinkPHP框架是一个国内开发的开源的烂大街（不是）很牛逼的php框架。'
        },
        {
            name : '&#xe615;',
            content : 'PHPMailer https://github.com/PHPMailer/PHPMailer'
        },
    ];

    /**
     *  FQA界面
     * */

    export let FQACollection = [
        {
            q : 'YeuolyBlog是干啥的？',
            a : '其实就是个记事本，虽说是博客，但暂时还没完成该有的主页自定义等功能。'
        },
        {
            q : 'YeuolyBlog是谁做的？',
            a : '是Yeuoly做哒！'
        },
        {
            q : 'YeuolyBlog怎么用？',
            a : 'Yeuoly将所有主要功能都放到了左边的菜单栏，左上角有个按钮能打开菜单，' +
                '然后看字面意思应该就能知道了。'
        },
        {
            q : '为什么要做这个破东西？',
            a : '一方面，这是Yeuoly的第一个web应用（练手），然后Yeuoly一直都想做' +
                '这么一个东西来写日记，然后一不小心就做这么大了orz。'
        },
        {
            q : '为啥我改了名之后我以前发的博客的作者名字没改？',
            a : '每一个脚印都是自己踩下的，也许您不喜欢自己的过去，但那终究是一段回忆。'
        },
        {
            q : '关于里提到的DataConnection是个啥？',
            a : 'YeuolyBlog终究是一个初级阶段，而DataConnection将会是它的第二形态' +
                '，但那大概是很多年以后的事情了，毕竟Yeuoly才高中呐。'
        },
        {
            q : 'Yeuoly高中怎么还有时间做这个？',
            a : '对不同的人来说有不同的爱好，一昧的学习效率并不高，有的人通过运动来放松自己，' +
                '而Yeuoly就通过写代码来放松自己。'
        },
        {
            q : '为啥我的头像一直在变？',
            a : '啊，咱这里的默认头像有五个哒hhh，在用户没有设置头像的时候会采用默认头像中的第一个哒！'
        },
        {
            q : '怎么联系Yeuoly？',
            a : '微博搜索Yeuoly芸璃，推特搜索@Yeuoly1，发送邮件到admin@srmxy.cn'
        },
        {
            q : '为啥有些功能用不了？？',
            a : '那大概是没完成叭，等一段时间大概就能用了。'
        },
        {
            q : '为什么不用Vuetify?为什么不用Laravel?为什么不用*？',
            a : '没有啥为什么，所有原因都是我喜欢，当然，不排除以后会用这些东西重构的可能性。' +
                '在简介里我就说了，这是一个给我练手的网站，所以我可能会用很多不同的工具、框架进行重构，' +
                '如果要投入实用的话得要几年后我大学差不多。排开这些因素不说，Vuetify和Laravel都是很好的' +
                '框架，分别都比ElementUI与ThinkPHP优秀，我也有学习的。'
        }
    ];

    export default {
        name: "ViewDevelopingLog",
        components : { MaterialCard }
    }
</script>

<style scoped>

</style>