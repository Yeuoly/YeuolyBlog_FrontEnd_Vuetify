<template>
    <VContainer>
        <VLayout row wrap>
            <VFlex xs12 sm12 md12 lg12>
                <DashBoardStatsCard
                    title="总计博客数"
                    icon="mdi-store"
                    :is-value-num="true"
                    :value="base_info.total_post_num"
                />
            </VFlex>
            <VFlex xs12 sm12 md12 lg12>
                <DashBoardDataTable
                    :headers="pre_list.headers"
                    :items="pre_list.items"
                    title="近期博客"
                />
            </VFlex>
        </VLayout>
    </VContainer>
</template>

<script>

    import DashBoardStatsCard from "../material/StatsCard";
    import DashBoardDataTable from "../material/DataTable";
    export default {
        name: "ViewAdmin",
        data(){
            return{
                base_info : {
                    total_post_num : 0,
                },
                pre_list : {
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
                },
            }
        },
        components: {DashBoardDataTable, DashBoardStatsCard },
        methods : {
            getBaseInfo(){
                this.axios.post('v2/admin/info',this.$qs.stringify({type : 'all-count|pre-list'})).then( response => {
                    const _data = response.data['data'];
                    if(_data['res'] === 666){
                        this.base_info.total_post_num = _data['data'][0];
                        _data['data'][1].forEach(( item , index ) => {
                            _data['data'][1][index]['time'] = this.$utils.date('Y-M-D h:m:s',item['time']);
                        });
                        this.pre_list.items = _data['data'][1];
                    }
                });
            }
        },
        mounted(){
            setTimeout(this.getBaseInfo,0);
        }
    }
</script>

<style scoped>

</style>