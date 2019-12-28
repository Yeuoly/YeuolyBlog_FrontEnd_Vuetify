<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VContainer>
        <VLayout row wrap>
            <VFlex xs12 sm4 md4 lg3>
                <VList style="background-color: transparent;box-shadow: rgba(0,0,0,.12) 0px 0px 1px;">
                    <VListGroup v-for="( t , key ) in items"
                                :key="key"
                                v-model="t.active"
                                :prepend-icon="`mdi-${t.icon}`"
                                no-action
                    >
                        <template v-slot:activator>
                            <VListTileTitle class="list-name">{{t.title}}</VListTileTitle>
                        </template>
                        <VListTile v-for="i in t.children"
                                   :key="i.title"
                                   @click="router(i.route)"
                        >
                            <VListTileContent>
                                <VListTileSubTitle>
                                    {{i.title}}
                                </VListTileSubTitle>
                            </VListTileContent>
                        </VListTile>
                    </VListGroup>
                </VList>
            </VFlex>
            <VFlex xs12 sm7 md8 lg9>
                <VCard flat>
                    <RouterView></RouterView>
                </VCard>
            </VFlex>
        </VLayout>
    </VContainer>
</template>

<script>
    export default {
        name: "ViewSetting",
        data(){
            return{
                items : [{
                    icon : 'face-outline',
                    title : '头像',
                    active : true,
                    children : [{
                        title : '修改头像',
                        route : 'st-avt-cg'
                    },{
                        title : '编辑头像',
                        route : 'st-avt-et'
                    },]
                },{
                    icon : 'folder-information-outline',
                    title : '隐私',
                    active : false,
                    children : [{
                        title: '隐私选项',
                        route: 'st-pri-cg'
                    }]
                },]
            }
        },
        methods : {
            router(name){
                this.$router.push({name : name});
            }
        }
    }
</script>

<style scoped>
    .list-name{
        height: 50px;
        padding-top: 13px;
        color: grey;
    }
</style>