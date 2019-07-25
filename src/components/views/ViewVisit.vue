<template>
    <div>
        <PopDialog v-model="dialog_show"
                   :pop-type="dialog_type"
                   :title="dialog_title"
                   :text="dialog_text"
                   :subtext="dialog_subtext"
        />
        <VLayout class="mt-4"
                 :class=" $vuetify.breakpoint.mdAndUp ? 'mx-5' : 'mx-0' "
                 :style="'min-height:' + ( $vuetify.breakpoint.height - 75 ) +'px'"
                 row
                 wrap
        >
            <VFlex sm12 xs12 md8 lg8>
                <VisitPostCard v-for="(t , key) in postCollections"
                              :key="key"
                              :title="t.title"
                              :avatar="avatar(t.poster_uid)"
                              :user="t.poster_id"
                              :text="t.content"
                              :post_id="t.post_id"
                              :time="t.time"
                              class="mb-3"
                />
            </VFlex>
        </VLayout>
        <MugenScroll :handler="refresh"
                     :should-handle="!loading"
                     scroll-container="noCharge"
                     v-if="firstLoaded && !end"
        ></MugenScroll>
    </div>
</template>

<script>
    import PopDialog from "../common/PopDialog";
    import popdialog from "../../mixins/popdialog";
    import VisitPostCard from "../items/VisitPostCard";
    import MugenScroll from "vue-mugen-scroll";

    export default {
        name: "ViewVisit",
        components: {VisitPostCard, PopDialog, MugenScroll},
        mixins : [popdialog],
        data(){
            return{
                postCollections : [],
                uid : Number,
                loading : false,
                page : 1,
                firstLoaded : false,
                end : false,
            }
        },
        methods : {
            get(page){
                this.loading = true;
                this.axios.post('v1/post/public/get/person',this.$qs.stringify({
                    uid : this.uid,
                    page : page
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.load(_data['data']['data']);
                        this.page++;
                        if(_data['data']['data'].length === 0){
                            this.end = true;
                        }
                    }else{
                        this.openDialog('发生了一些错误',_data['data']['error'],'','error');
                        this.end = true;
                    }
                }).catch( () => {
                    this.openDialog('发生了一些错误','服务器大姨妈了','','error');
                }).finally( () => {
                    this.firstLoaded = true;
                    setTimeout(() => {
                        this.loading = false;
                    },500);
                })
            },
            load(dist){
                this.postCollections = [...this.postCollections,...dist];
            },
            refresh(){
                this.get(this.page);
            },
            init(){
                this.uid = this.$route.query.uid;
                if(this.uid !== undefined){
                    this.get(this.page);
                }else{
                    this.openDialog('缺少请求参数','咱也不知道主人要访问谁的空间惹x','','error');
                }
            }
        },
        computed : {
            avatar(){
                return (uid) => {
                    return `${process.env.VUE_APP_API_ROOT}/v1/account/avatar?uid=${uid}`;
                }
            }
        },
        mounted(){
            this.init();
        }
    }
</script>

<style scoped>

</style>