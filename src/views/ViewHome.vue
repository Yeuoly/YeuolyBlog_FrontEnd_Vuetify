<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <HomeTopBar :user_uid="space.user_uid"
                    :user_name="space.user_id"
                    :user_follow="subscribe.followed"
                    :user_class="space.user_class"
                    :disabled="is_home || !visiable"
                    @followed="subscribe.followed = true"
                    @unfollowed="subscribe.followed = false"
                    style="z-index: 11"

        />
        <div class="home-tab-links">
            <div class="home-tab-link" v-for="(t, index) in links" :key="index" :ref="t.route_name" 
                 :style="`z-index: ${ 10 - index};`"
                 @click="jumpTo(t.route)"
            >
                <span>{{ t.name }}</span>
            </div>
        </div>
        <div v-if="visiable">
            <RouterView></RouterView>
        </div>
        <div v-else>
            <VContainer class="pt-5">
                <p v-show="tips">CODE:403-这个界面是不被允许访问的哦</p>
                <p>{{ tips }}</p>
            </VContainer>
        </div>
    </div>
</template>

<script>
    import HomeTopBar from "../components/common/HomeTopBar";
    import { api_get_space_info } from '../lib/static/api';
    import { stringify } from 'querystring';
    import { messageBox } from '../communicate';

    export default {
        name: "ViewHome",
        components: {HomeTopBar},
        data : () => ({
            visitable : false,
            tips : '博主关上了他家的大门',
            subscribe : {
                be_num : 0,
                do_num : 0,
                followed : false
            },
            space : {
                user_id : 0,
                user_uid : 0,
                user_class : 1,
                public : false
            },
            active_el : null
        }),
        watch : {
            '$route.name' : {
                handler(v){
                    //这里要做一个处理，如果说在home跟路由下，就需要先跳到dynamic去
                    if(v === 'home'){
                        this.$router.push(`/home/dynamic/${this.$store.getters.getUid}`);
                    }else{
                        //初始化一些数据
                        const uid = this.$route.params.uid || this.$store.getters.getUid;
                        this.space.user_uid = parseInt(uid);
                        setTimeout(() => {
                            this.getSpaceInfo();
                        });
                        setTimeout(() => {
                            //先卸掉目前这个的活跃状态
                            if(this.active_el){
                                this.active_el.classList.remove('home-tab-active');
                            }
                            //再看看有没有目标路由，如果有的话那就
                            const el = this.$refs[v][0];
                            if(el){
                                el.classList.add('home-tab-active');
                                this.active_el = el;
                            }
                        });
                    }
                },
                immediate : true
            },
            '$route.params.uid' : {
                handler(v){
                    this.space.user_uid = parseInt(v);
                    this.getSpaceInfo();
                }
            }
        },
        computed : {
            is_home(){
                return this.space.user_uid === this.$store.getters.getUid;
            },
            visiable(){
                return this.is_home || this.space.public;
            },
            links(){
                return [{
                    name : '动态',
                    route : `/home/dynamic/${this.space.user_uid}`,
                    route_name : 'home-dynamic'
                },{
                    name : '收藏夹',
                    route : `/home/category/${this.space.user_uid}`,
                    route_name : 'home-category'
                }];
            }
        },
        methods : {
            async getSpaceInfo(){
                try{
                    const { data } = await this.axios.post(api_get_space_info.route, stringify({
                        act : api_get_space_info.act,
                        uid : this.space.user_uid,
                        filter : 'fans_be_num|fans_do_num|uname|class|public|followed'
                    }));
                    if(data['data']['res'] === 666){
                        const _data = data['data']['data'];
                        this.subscribe.be_num = _data[0];
                        this.subscribe.do_num = _data[1];
                        this.space.user_id = _data[2];
                        this.space.user_class = _data[3];
                        this.space.public = _data[4];
                    }else{
                        messageBox('错误', data['data']['error'], '', 'error');
                    }
                }catch(e){
                    messageBox('错误', '发生了未知错误', '', 'error');
                }
            },
            jumpTo(route){
                this.$router.push(route);
            }
        }
    }
</script>

<style>
    .filter_btn{
        position: absolute;
        right: 110px;
        top: -25px;
    }

    .home-tab-links{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .home-tab-link{
        padding-right: 10px;
        transition: all .2s;
        cursor: pointer;
        background-color: #eee;
    }

    .home-tab-link:hover{
        background-color: #dfdfdf;
        color: #23ade5;
    }

    .home-tab-active{
        color: #23ade5;
    }

    @media (max-width: 959px) {
        .home-tab-links{
            padding-left: 80px;
        }

        .home-tab-link{
            display: block;
            width: 200px;
        }
    }

    @media (min-width: 959px){
        .home-tab-links{
            padding-left: 100px;
        }

        .home-tab-link{
            width: 130px;
            height: 40px;
            text-align: right;
            line-height: 40px;
            padding-right: 30px;
            border-radius: 0 0 40px 0;
            margin-left: -31px;
        }
    }

</style>