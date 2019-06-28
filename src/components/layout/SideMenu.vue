<template>
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
                       @click="router('login')"
                       v-show="!userOnline"
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

            <VListTile class="nav-list"
                       @click="router('editor')"
                       v-show="userOnline"
            >
                <VListTileAvatar>
                    <YIcon class="menu-icon">denglu</YIcon>
                </VListTileAvatar>
                <VListTileContent>
                    <VListTileTitle>
                        编辑
                    </VListTileTitle>
                </VListTileContent>
            </VListTile>

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
        font-size: 20px;
    }

    .nav-list-tile {
        height: 30px;
    }
</style>