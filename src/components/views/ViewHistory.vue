<template>
    <VContainer>
        <MaterialCard title="开发日志">
            <VCard flat>
                <VTimeline align-top dense>
                    <VTimelineItem small
                                   v-for="( t , key ) in history"
                                   :key="key"
                                   :color="t.color"
                    >
                        <VLayout pt-3>
                            <VFlex xs5 sm3 md2 lg2>
                                <h5>{{t.date}}</h5>
                                <h6>{{t.version}}</h6>
                            </VFlex>
                            <VFlex xs7 sm9 md10 lg10>
                                <h4>{{t.title}}</h4>
                                <h6>{{t.content}}</h6>
                            </VFlex>
                        </VLayout>
                    </VTimelineItem>
                </VTimeline>
            </VCard>
        </MaterialCard>
    </VContainer>
</template>

<script>
    import MaterialCard from "../material/Card";
    export default {
        name: "ViewHistory",
        components: {MaterialCard},
        data(){
            return{
                history :  [
                    {
                        title   : '新功能',
                        version : '2.0.7.00-α',
                        content : '新增隐私功能，可以在设置内更改',
                        date    : '2019/9/7',
                        color   : 'green'
                    },
                    {
                        title   : '新功能',
                        version : '2.0.6.00-α',
                        content : '新增博客筛选功能，可以根据标签和日期筛选博客',
                        date    : '2019/8/31',
                        color   : 'green'
                    },
                    {
                        title   : '新功能',
                        version : '2.0.5.00-α',
                        content : '新增标签',
                        date    : '2019/8/30',
                        color   : 'green'
                    },
                    {
                        title   : '新功能',
                        version : '2.0.4.00-α',
                        content : '新增头像编辑功能',
                        date    : '2019/7/29',
                        color   : 'green'
                    },
                    {
                        title   : '新功能，修复bug',
                        version : '2.0.3.00-α',
                        content : '新增更改头像功能，修复编辑框的魔性bug，顺便把编辑框换成了wangEditor',
                        date    : '2019/7/25',
                        color   : 'green'
                    },
                    {
                        title   : '新功能',
                        version : '2.0.2.00-α',
                        content : '新增搜索、访问功能，新增用户权限系统',
                        date    : '2019/7/25',
                        color   : 'green'
                    },
                    {
                        title   : '修复bug，新功能',
                        version : '2.0.1.00-α',
                        content : '修复主页刷新错误、无法登出等bug，添加设置页面，优化代码结构',
                        date    : '2019/7/23',
                        color   : 'green'
                    },
                    {
                        title   : '双端重构',
                        version : '2.0.0.00-α',
                        content : '使用Vuetify ThinkPHP重构双端，安全性能、美观度、用户体验大大提升。',
                        date    : '2019/7/13',
                        color   : 'red'
                    },
                    {
                        title   : '美化，优化',
                        version : '1.2.1.02-β',
                        content : '添加前端界面平滑切换动画，优化路由判断逻辑',
                        date    : '2019/4/20',
                        color   : 'blue'
                    },
                    {
                        title   : '修复bug，新功能，美化',
                        version : '1.2.1.02-α',
                        content : '修复消息盒在手机端文字会卡出窗体外的bug，添加用户隐私设置',
                        date    : '2019/4/19',
                        color   : 'green'
                    },
                    {
                        title   : '修复bug',
                        version : '1.2.1.01-δ',
                        content : '修复home界面没有默认头像的bug',
                        date    : '2019/4/14',
                        color   : 'blue'
                    },
                    {
                        title   : '修复bug，新功能',
                        version : '1.2.1.01-γ',
                        content : '修复了编辑界面无法加载博客信息的bug，添加了评论等功能的界面，暂不可用，修复了common-button' +
                            '的css的bug，优化了common-button',
                        date    : '2019/4/13',
                        color   : 'green'
                    },
                    {
                        title   : '修复bug',
                        version : '1.2.1.01-β',
                        content : '修复了手机端输入时输入框会被虚拟键盘挡住的bug',
                        date    : '2019/4/13',
                        color   : 'blue'
                    },
                    {
                        title   : '修复bug，美化',
                        version : '1.2.1.01-α',
                        content : '修复了换行会json字符串转化错误的bug，about界面的换行bug已修复，美化了侧边用户栏，' +
                            '添加了默认用户头像',
                        date    : '2019/4/12',
                        color   : 'blue'
                    },
                    {
                        title   : '新功能及美化',
                        version : '1.2.1.0-α',
                        content : '大量修改了样式，布局风格修改，性能优化，修改了编辑器编码格式，添加修改用户个人信息' +
                            '，增添Q&A界面和setting界面，添加了logo，终于有主页了，添加了访问量统计',
                        date    : '2019/4/7',
                        color   : 'green'
                    },
                    {
                        title   : '修复及优化',
                        version : '1.2.0.1-α',
                        content : '修复标题会和操作栏以及正文重叠的bug，性能优化，编辑框升级添加工具栏，支持图片上传',
                        date    : '2019/3/30',
                        color   : 'blue'
                    },
                    {
                        title   : '单页应用重构完成',
                        version : '1.2-release',
                        content : '经过一段时间的重构，正式以单页应用的形式上线，为了更佳的体验，修改了大量样式',
                        date    : '2019/3/23',
                        color   : 'green'
                    },
                    {
                        title   : '开始大规模重构',
                        version : '1.2-α',
                        content : '考虑到网站的兼容性、可管理性、可扩展性等因素，对网站前端进行了大规模重构' +
                            '，改为单页应用，正式使用webpack和vue-cli',
                        date    : '2019/2/30',
                        color   : 'red'
                    },
                    {
                        title   : '基本功能完工',
                        version : '1.1-release',
                        content : '基本的功能已完成，并对之前的功能进行了一定的优化，可以第一次上线测试',
                        date    : '2019/2/16',
                        color   : 'green'
                    },
                    {
                        title   : '前端index完工',
                        version : '1.0.21-α',
                        content : '前端index.html index.css index.js基本完成，侧边顶部固定栏完成，整体框架' +
                            '升级为Vue.js，完善了代码结构，更容易看懂我在写什么辣鸡代码了',
                        date    : '2019/2/1',
                        color   : 'blue'
                    },
                    {
                        title   : '整体大更新，项目改名YeuolyBlog',
                        version : '1.0.2-α',
                        content : '整体重构，后端改为面向对象编程，开始向github更新，去除页面壁纸，改为白色背景简约布局',
                        date    : '2019/1/28',
                        color   : 'red'
                    },
                    {
                        title   : '整体大更新',
                        version : '1.0.1-β',
                        content : '分离前后端，从石器时代进入共产主义时代（大雾',
                        date    : '2018/12/01',
                        color   : 'red'
                    },
                    {
                        title   : '项目改名NotForget',
                        version : '1.0.1-α',
                        content : '项目改名，旨在建立一个帮助用户记录信息，爬取信息，以及周期性规律性地进行数据更新',
                        date    : '2018/11/10',
                        color   : 'green'
                    },
                    {
                        title   : '项目UserInfo初步完成',
                        version : '1.0.0-release',
                        content : '完成部分预期功能，初步上线测试，一共四个内测用户，预期功能正常运作',
                        date    : '2018/10/07',
                        color   : 'red'
                    },
                    {
                        title   : '项目UserInfo启动',
                        version : '0.0.0-α',
                        content : '启动项目，建立基础数据库，建立初步用户数据库结构，旨在建立一个帮助用户保存信息的网站，' +
                            '用于储存用户的私人信息，如账号密码等',
                        date    : '2018/10/01',
                        color   : 'red'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>