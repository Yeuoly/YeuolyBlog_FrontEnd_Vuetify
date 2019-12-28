<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VNavigationDrawer v-model="open"
                       fixed
                       temporary
    >
        <VCard flat
               height="130"
               class="menu-header"
        >
            <YAvatar @click="router('home')"
                     size="74"
                     class="menu-avatar"
                     :uid="userUid"
            />
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
                        <VIcon class="menu-icon">mdi-{{t.icon}}</VIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle class="menu-text">
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
                        <VIcon class="menu-icon">mdi-{{t.icon}}</VIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle class="menu-text">
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
                        <VIcon class="menu-icon">mdi-{{t.icon}}</VIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle class="menu-text">
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
                        <VIcon class="menu-icon">mdi-logout-variant</VIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle class="menu-text">
                            登出
                        </VListTileTitle>
                    </VListTileContent>
                </VListTile>
                <VDivider />
            </div>

            <div v-if="isAdministrator">
                <VListTile class="nav-list"
                           v-for="( t , key ) in navs.admin"
                           :key="key"
                           @click="router(t.route)"
                >
                    <VListTileAvatar>
                        <VIcon class="menu-icon">mdi-{{t.icon}}</VIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle class="menu-text">
                            {{t.name}}
                        </VListTileTitle>
                    </VListTileContent>
                </VListTile>

                <VDivider />
            </div>
        </VList>
    </VNavigationDrawer>
</template>

<script>
    import { communicate } from "../../communicate"
    import { messageBox } from "../../communicate";
    import base from '../../mixins/base'
    import YAvatar from "../common/YAvatar";

    export default {
        name: "SideMenu",
        components: {YAvatar},
        data(){
            return {
                open: false,
                navs: {
                    online: [{
                        name: '我的主页',
                        route: 'home',
                        icon : 'home-circle-outline'
                    }, {
                        name : '编辑',
                        route : 'editor',
                        icon : 'circle-edit-outline'
                    }, {
                        name : '设置',
                        route : 'setting',
                        icon : 'settings-outline'
                    }],
                    offline: [{
                        name : '登录',
                        route : 'login',
                        icon : 'login-variant'
                    }],
                    ordinary: [{
                        name: '搜索',
                        route: 'search',
                        icon : 'magnify'
                    }, {
                        name: '网站主页',
                        route: 'index',
                        icon : 'home-circle-outline'
                    }, {
                        name: '开发日志',
                        route : 'history',
                        icon : 'backup-restore'
                    }],
                    admin : [{
                        name : '系统管理',
                        route : 'admin-dash-board',
                        icon : 'vector-circle'
                    }]
                }
            }
        },
        computed : {
            isAdministrator(){
                const level = this.$store.getters.getClass;
                return level !== 1 && level !== 0;
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
                        messageBox('失败','获取服务端信息失败','','error');
                    }
                }).catch( () => {
                    messageBox('失败','获取服务端信息失败','','error');
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

    .menu-text{
        color: grey;
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