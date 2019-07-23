<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <VContainer>
        <VLayout row wrap>
            <VFlex xs6 sm5 md4 lg3>
                <VList style="margin-right: 5px;background-color: transparent;box-shadow: rgba(0,0,0,.12) 1px 0px 0px 0px;">
                    <VListGroup v-for="( t , key ) in items"
                                :key="key"
                                v-model="t.active"
                                no-action
                    >
                        <template v-slot:activator>
                            <div style="padding: 10px">
                                <YIcon style="font-size: 30px;padding-right: 10px">
                                    {{t.icon}}
                                </YIcon>
                            </div>
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
            <VFlex xs6 sm7 md8 lg9>
                <VCard flat>
                    <RouterView></RouterView>
                </VCard>
            </VFlex>
        </VLayout>
    </VContainer>
</template>

<script>
    import YIcon from "../common/YIcon";
    export default {
        name: "ViewSetting",
        components: {YIcon},
        data(){
            return{
                items : [{
                    icon : 'touxiang',
                    title : '头像',
                    active : true,
                    children : [{
                        title : '修改头像',
                        route : 'st-avt-cg'
                    },{
                        title : '编辑头像',
                        route : 'st-avt-et'
                    },]
                }]
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

</style>