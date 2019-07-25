<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VNavigationDrawer v-model="open"
                       fixed
                       temporary
    >
        <VCard flat
               height="130"
               class="menu-header"
               style="background-color: #68cbf8 !important;"
        >
            <VAvatar size="74"
                     class="menu-avatar"
            >
                <VImg :src="userAvatar"></VImg>
            </VAvatar>
            <VCardText class="menu-name">
                {{ userName }}
            </VCardText>
        </VCard>
        <VList dense>
            <VListTile class="nav-list"
                       @click="router('index')"
            >
                <VListTileAvatar>
                    <YIcon class="menu-icon">zhuye</YIcon>
                </VListTileAvatar>
                <VListTileContent>
                    <VListTileTitle>
                        网站主页
                    </VListTileTitle>
                </VListTileContent>
            </VListTile>


            <VListTile class="nav-list"
                       @click="router('home')"
            >
                <VListTileAvatar>
                    <YIcon class="menu-icon">MyHome</YIcon>
                </VListTileAvatar>
                <VListTileContent>
                    <VListTileTitle>
                        我的主页
                    </VListTileTitle>
                </VListTileContent>
            </VListTile>

            <VListTile class="nav-list"
                       @click="router('search')"
            >
                <VListTileAvatar>
                    <YIcon class="menu-icon">sousuo</YIcon>
                </VListTileAvatar>
                <VListTileContent>
                    <VListTileTitle>
                        搜索
                    </VListTileTitle>
                </VListTileContent>
            </VListTile>

            <VDivider />

            <div v-if="userOnline">
                <VListTile class="nav-list"
                           @click="router('editor')"
                >
                    <VListTileAvatar>
                        <YIcon class="menu-icon">fawenzi</YIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle>
                            编辑
                        </VListTileTitle>
                    </VListTileContent>
                </VListTile>
                <VDivider />
            </div>

            <VListTile class="nav-list"
                       @click="router('history')"
            >
                <VListTileAvatar>
                    <YIcon class="menu-icon">iconset0142</YIcon>
                </VListTileAvatar>
                <VListTileContent>
                    <VListTileTitle>
                        开发日志
                    </VListTileTitle>
                </VListTileContent>
            </VListTile>
            <VDivider />

            <VListTile class="nav-list"
                       @click="router('login')"
                       v-if="!userOnline"
            >
                <VListTileAvatar>
                    <YIcon class="menu-icon">denglu</YIcon>
                </VListTileAvatar>
                <VListTileContent>
                    <VListTileTitle>
                        登录
                    </VListTileTitle>
                </VListTileContent>
            </VListTile>

            <div v-else>
                <VListTile class="nav-list"
                           @click="router('setting')"
                >
                    <VListTileAvatar>
                        <YIcon class="menu-icon">shezhi</YIcon>
                    </VListTileAvatar>
                    <VListTileContent>
                        <VListTileTitle>
                            设置
                        </VListTileTitle>
                    </VListTileContent>
                </VListTile>

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
                this.axios.post('v1/account/logout').then( response => {
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