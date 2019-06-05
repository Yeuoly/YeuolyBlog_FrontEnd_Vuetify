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
                       v-for="t in menuList"
                       :key="t.routeName"
                       @click.stop="router(t.routeName)"
                       v-show="t.show"
            >
                <VListTileAvatar>
                    <YIcon class="menu-icon">{{t.icon}}</YIcon>
                </VListTileAvatar>
                <VListTileContent>
                    <VListTileTitle>
                        {{t.text}}
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
                open : false,
                menuList : [{
                    routeName : 'index',
                    text : '网站主页',
                    icon : 'zhuye',
                    show : true
                },{
                    routeName : 'home',
                    text : '我的主页',
                    icon : 'MyHome',
                    show : true
                },{
                    routeName : 'login',
                    text : '登录',
                    icon : 'denglu',
                    show : this.userOnline
                }]
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