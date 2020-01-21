<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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

            <VTabsItems
                    v-model="tabs.tab"
                    @change="load"
                    touchless
            >
                <VTabItem v-for="t in tabs.items" >
                    <div v-for="p in t.col">
                        <DashBoardStatsCard
                                v-if="p.type === 'stats'"
                                :title="p.beta.title"
                                :value="p.beta.data"
                                :icon="p.beta.icon"
                                :is-value-num="p.beta.isNum"
                        />
                        <DashBoardDataTable
                                v-else-if="p.type === 'table'"
                                :headers="p.beta.data.headers"
                                :items="p.beta.data.items"
                        />
                        <div v-else-if="p.type === 'search'">
                            <VTextField
                                    v-model="p.keyword"
                            >
                                <template v-slot:append-outer>
                                    <VBtn @click.stop="p.method[0]"
                                          color="white"
                                          small
                                    >
                                        <span class="caption">
                                            搜索
                                        </span>
                                    </VBtn>
                                    <VBtn @click.stop="p.method[1]"
                                          color="primary"
                                          small
                                    >
                                        <span class="caption">
                                            加载全部
                                        </span>
                                    </VBtn>
                                </template>
                            </VTextField>
                        </div>
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

    import { messageBox } from "../../communicate";

    export default {
        name: "ViewAdmin",
        data(){
            const vm = this;
            const data = {
                tabs : {
                    cache : Array(114),
                    tab : 0,
                    items : {
                        basement : {
                            icon : 'mdi-align-horizontal-left',
                            name : '总概（等级2）',
                            col : [{
                                type : 'stats',
                                beta : {
                                    title : '总计博客数',
                                    icon : 'mdi-store',
                                    data : 0,
                                    isNum : true
                                },
                            }]
                        },
                        pre_list : {
                            icon : 'mdi-table',
                            name : '近期博客（等级3）',
                            col : [{
                                type : 'table',
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
                            }],
                        },
                        user_manage : {
                            icon : 'mdi-account-details',
                            name : '用户管理（等级4）',
                            col : [{
                                type : 'search',
                                method : [vm.loadUsers,vm.loadAllUsers],
                                keyword : '',
                            },{
                                type : 'table',
                                beta : {
                                    data : {
                                        headers : [{
                                            sortable : false,
                                            text : '用户名',
                                            value : 'nickname',
                                        },{
                                            sortable : false,
                                            text : 'uid',
                                            value : 'uid',
                                        },{
                                            sortable : false,
                                            text : '职介',
                                            value : 'class',
                                        },{
                                            sortable : false,
                                            text : '注册时间',
                                            value : 'register_time',
                                        },{
                                            sortable : false,
                                            text : '邮箱',
                                            value : 'email',
                                        },{
                                            sortable : false,
                                            text : '设置职介',
                                            value : 'operate_class',
                                        },],
                                        items : []
                                    }
                                }
                            }]
                        }
                    }
                },
            };
            return data;
        },
        components: {MaterialCard, DashBoardDataTable, DashBoardStatsCard },
        methods : {
            load(){
                if(this.tabs.cache[this.tabs.tab]){
                    return;
                }
                switch (this.tabs.tab) {
                    case 0:
                        this.axios.post('v2/admin/info',this.$qs.stringify({type : 'all-count'})).then( response => {
                            const _data = response.data['data'];
                            if(_data['res'] === 666){
                                this.tabs.items.basement.col[0].beta.data = _data['data'][0];
                                this.tabs.cache[0] = true;
                            }
                        });
                        break;
                    case 1:
                        this.axios.post('v2/admin/info',this.$qs.stringify({type : 'pre-list'})).then( response => {
                            const _data = response.data['data'];
                            if(_data['res'] === 666){
                                _data['data'][0].forEach(( item , index ) => {
                                    _data['data'][0][index]['time'] = this.$utils.date('Y-M-D h:m:s',item['time']);
                                });
                                this.tabs.items.pre_list.col[0].beta.data.items = _data['data'][0];
                                this.tabs.cache[1] = true;
                            }
                        });
                        break;
                }
            },
            loadUsers(){
                this.loadUserBase({
                    kw : this.tabs.items.user_manage.col[0].keyword
                });
            },
            loadAllUsers(){
                this.loadUserBase({
                    kw : 'all',
                    all : true
                });
            },
            loadUserBase(form){
                this.axios.post('v2/admin/users',this.$qs.stringify(form)).then( response => {
                    const _data = response.data['data'];
                    const operateClass = (uid,i,index) => {
                        this.axios.post('v2/admin/user/class/operate',this.$qs.stringify({
                            uid : uid,
                            class : i
                        })).then( response => {
                            const _data = response.data['data'];
                            if(_data['res'] === 666){
                                this.tabs.items.user_manage.col[1].beta.data.items[index].class = i;
                            }else{
                                messageBox('失败',_data['error'],'','error');
                            }
                        } );
                    };
                    if(_data['res'] === 666){
                        _data['data'].forEach( ( item , index ) => {
                            const menu = [];
                            for(let i = 1 ;i < 5 ;i++){
                                menu.push({ text : i , method(){ operateClass(item['uid'],i,index) } })
                            }
                            _data['data'][index] = {
                                ..._data['data'][index],
                                menu : menu
                            }
                        });
                        this.tabs.items.user_manage.col[1].beta.data.items = _data['data'];
                    }
                });
            }

        },
        mounted(){
            setTimeout(this.load,0);
        }
    }
</script>