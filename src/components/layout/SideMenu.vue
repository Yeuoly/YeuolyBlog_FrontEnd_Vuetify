<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VNavigationDrawer v-model="open"
                       fixed
                       temporary
                       style="z-index:10003"
    >
        <VCard flat
               height="130"
               class="menu-header"
        >
            <YAvatar :magic_door="true"
                     :home="true"
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
    import { api_logout } from '../../lib/static/api';
    import { stringify } from 'querystring';
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
                        name: '关于',
                        route: 'info',
                        icon : 'alert-circle-outline'
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
            async logout(){
                try{
                    const { data } = await this.axios.post(api_logout.route, stringify({
                        act : api_logout.act
                    }));
                    if(data['data']['res'] === 666){
                        location.href = '/';
                    }else{
                        messageBox('失败', '登出失败', data['data']['error'], 'error');
                    }
                }catch(e){
                    messageBox('失败', '服务器大姨妈惹', '', 'error');
                }
            }
        },
        mixins : [ base ],
        mounted() {
            communicate.$on('openSideMenu', this.openSideMenu);
            communicate.$on('closeSideMenu', this.closeSideMenu);
        }
    }
</script>

<style>
    .menu-header{
        position: relative;
        background-image: url(//yeuoly.oss-cn-beijing.aliyuncs.com/yeuolyblog/public/daily/20210127/ae69432b5d8a2e287e55147c3fff50e6b302c724.jpg);
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