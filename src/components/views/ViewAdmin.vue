<template>
    <VContainer>
        <MaterialCard
                class="card-tabs"
                color="green"
        >
            <VFlex slot="header">
                <VTabs
                        v-model="tabs.tab"
                        color="transparent"
                        slider-color="white"
                        @change="load"
                >
                    <span
                            class="subheading font-weight-light mr-3"
                            style="align-self: center"
                    >
                        管理：
                    </span>
                    <VTab
                            class="mr-3"
                            v-for="t in tabs.items"
                    >
                        <VIcon class="mr-2">{{t.icon}}</VIcon>
                        {{t.name}}
                    </VTab>
                </VTabs>
            </VFlex>

            <VTabsItems v-model="tabs.tab">
                <VTabItem v-for="t in tabs.items">
                    <div v-if="t.type === 'stats' ">
                        <DashBoardStatsCard
                                :title="t.beta.title"
                                :value="t.beta.data"
                                :icon="t.beta.icon"
                                :is-value-num="t.beta.isNum"
                        />
                    </div>
                    <div v-else-if="t.type === 'table' ">
                        <DashBoardDataTable
                                :headers="t.beta.data.headers"
                                :items="t.beta.data.items"
                        />
                    </div>
                </VTabItem>
            </VTabsItems>
        </MaterialCard>
    </VContainer>
</template>

<script>

    import DashBoardStatsCard from "../material/StatsCard";
    import DashBoardDataTable from "../material/DataTable";
    import MaterialCard from "../material/Card";

    export default {
        name: "ViewAdmin",
        data(){
            return{
                tabs : {
                    cache : Array(114),
                    tab : 0,
                    items : {
                        basement : {
                            type : 'stats',
                            icon : 'mdi-align-horizontal-left',
                            name : '总概',
                            beta : {
                                title : '总计博客数',
                                icon : 'mdi-store',
                                data : 0,
                                isNum : true
                            }
                        },
                        pre_list : {
                            type : 'table',
                            icon : 'mdi-table',
                            name : '近期博客',
                            beta : {
                                title : '近期博客',
                                data : {
                                    headers : [{
                                        sortable : false,
                                        text : '博客ID',
                                        value : 'post_id'
                                    },{
                                        sortable : false,
                                        text : '标题',
                                        value : 'title'
                                    },{
                                        sortable : false,
                                        text : '用户名',
                                        value : 'user_id'
                                    },{
                                        sortable : false,
                                        text : '用户UID',
                                        value : 'user_uid'
                                    },{
                                        sortable : false,
                                        text : '日期',
                                        value : 'time'
                                    },],
                                    items : []
                                }
                            }
                        }
                    }
                },
            }
        },
        components: {MaterialCard, DashBoardDataTable, DashBoardStatsCard },
        methods : {
            load(){
                switch (this.tabs.tab) {
                    case 0:
                        if(!this.tabs.cache[0]){
                            this.axios.post('v2/admin/info',this.$qs.stringify({type : 'all-count'})).then( response => {
                                const _data = response.data['data'];
                                if(_data['res'] === 666){
                                    this.tabs.items.basement.beta.data = _data['data'][0];
                                    this.tabs.cache[0] = true;
                                }
                            });
                        }
                        break;
                    case 1:
                        if(!this.tabs.cache[1]){
                            this.axios.post('v2/admin/info',this.$qs.stringify({type : 'pre-list'})).then( response => {
                                const _data = response.data['data'];
                                if(_data['res'] === 666){
                                    _data['data'][0].forEach(( item , index ) => {
                                        _data['data'][0][index]['time'] = this.$utils.date('Y-M-D h:m:s',item['time']);
                                    });
                                    this.tabs.items.pre_list.beta.data.items = _data['data'][0];
                                    this.tabs.cache[1] = true;
                                }
                            });
                        }
                        break;
                }
            },
        },
        mounted(){
            setTimeout(this.load,0);
        }
    }
</script>

<style scoped>

</style>