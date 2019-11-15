<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VNavigationDrawer v-model="open"
                       fixed
                       temporary
    >
        <VCard flat
               height="130"
               class="menu-header"
        >
            <VAvatar @click="router('home')"
                     size="74"
                     class="menu-avatar"
                     style="cursor: pointer"
            >
                <VImg :src="userAvatar"></VImg>
            </VAvatar>
            <VCardText class="menu-name">
                {{ userName }}
            </VCardText>
        </VCard>
        <VList dense>
            <div v-if="userOnline">
                <VListTile class="nav-list"
                           v-for="( t , key ) in navs.online"
                           :key="key"
                           @click="router(t.route)"
                >
                    <VListTileAvatar>
                        <YIcon class="menu-icon">{{t.icon}}</YIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle>
                            {{t.name}}
                        </VListTileTitle>
                    </VListTileContent>
                </VListTile>
                <VDivider />
            </div>

            <div v-else>
                <VListTile class="nav-list"
                           v-for="( t , key ) in navs.offline"
                           :key="key"
                           @click="router(t.route)"
                >
                    <VListTileAvatar>
                        <YIcon class="menu-icon">{{t.icon}}</YIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle>
                            {{t.name}}
                        </VListTileTitle>
                    </VListTileContent>
                </VListTile>

                <VDivider />
            </div>

            <div>
                <VListTile class="nav-list"
                           v-for="( t , key ) in navs.ordinary"
                           :key="key"
                           @click="router(t.route)"
                >
                    <VListTileAvatar>
                        <YIcon class="menu-icon">{{t.icon}}</YIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle>
                            {{t.name}}
                        </VListTileTitle>
                    </VListTileContent>
                </VListTile>

                <VDivider />
            </div>

            <div v-if="userOnline">
                <VListTile class="nav-list"
                           @click="logout"
                >
                    <VListTileAvatar>
                        <YIcon class="menu-icon">-dengchu</YIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle>
                            登出
                        </VListTileTitle>
                    </VListTileContent>
                </VListTile>
            </div>

            <VDivider />
        </VList>
    </VNavigationDrawer>
</template>

<script>
    import { communicate } from "../../communicate"
    import base from '../../mixins/base'
    import YIcon from "../common/YIcon";

    export default {
        name: "SideMenu",
        components: {YIcon},
        data(){
            return {
                open: false,
                navs: {
                    online: [{
                        name: '我的主页',
                        route: 'home',
                        icon: 'MyHome'
                    }, {
                        name : '编辑',
                        route : 'editor',
                        icon : 'fawenzi'
                    }, {
                        name : '设置',
                        route : 'setting',
                        icon : 'shezhi'
                    }],
                    offline: [{
                        name : '登录',
                        route : 'login',
                        icon : 'denglu'
                    }],
                    ordinary: [{
                        name: '搜索',
                        route: 'search',
                        icon: 'sousuo'
                    }, {
                        name: '网站主页',
                        route: 'index',
                        icon: 'zhuye'
                    }, {
                        name: '开发日志',
                        route : 'history',
                        icon: 'iconset0142'
                    }],
                }
            }
        },
        methods : {
            openSideMenu(){
                this.open = true;
            },
            closeSideMenu(){
                this.open = false;
            },
            router(name){
                this.$router.push({name : name});
            },
            logout(){
                this.axios.post('v1/account/online/action',this.$qs.stringify({
                    act : 3
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        location.href = '/';
                    }else{
                        alert('失败');
                    }
                }).catch( () => {
                    alert('失败');
                })
            }
        },
        mixins : [base],
        mounted() {
            communicate.$on('openSideMenu',this.openSideMenu);
            communicate.$on('closeSideMenu',this.closeSideMenu);
        }
    }
</script>

<style>
    .menu-header{
        position: relative;
        background-image: url(http://i0.hdslb.com/bfs/album/80841ce0b27d582fc99c29c9dca228807640482b.jpg);
        background-size: 100% 100%;
        background-color: rgb(100,100,100) !important;border-radius: 0
    }

    .menu-avatar{
        position: absolute;
        top: 10px;
        left: 113px;
        margin: 0 auto;
    }

    .menu-name{
        position: absolute;
        top: 80px;
        text-align: center;
        font-size: 20px;
        color: white;
    }

    .menu-icon {
        font-size: 18px;
    }

    .nav-list-tile {
        height: 30px;
    }
</style>