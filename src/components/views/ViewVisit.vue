<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <PopDialog v-model="dialog_show"
                   :pop-type="dialog_type"
                   :title="dialog_title"
                   :text="dialog_text"
                   :subtext="dialog_subtext"
        />
        <VContainer v-if="$vuetify.breakpoint.smAndDown" class="pb-0 px-0">
            <VCard>
                <VList>
                    <VListGroup v-model="openSelection">
                        <VCard class="px-3 py-3">
                            <PostCardFilter :tags="tags" v-model="postFilter" />
                        </VCard>
                        <template v-slot:activator>
                            <VListTileTitle>
                                <YIcon class="px-2">shaixuan</YIcon>
                                筛选
                            </VListTileTitle>
                        </template>
                    </VListGroup>
                </VList>
            </VCard>

        </VContainer>
        <VLayout class="mt-4"
                 :class=" $vuetify.breakpoint.mdAndUp ? 'mx-5' : 'mx-0' "
                 :style="'min-height:' + ( $vuetify.breakpoint.height - 75 ) +'px'"
                 row
                 wrap
        >
            <VFlex sm12 xs12 md8 lg8>
                <VisitPostCard v-for="(t , key) in postCollections"
                               :key="key"
                               v-show="dateAllowed(t.time) && selected(t.tags)"
                               :title="t.title"
                               :avatar="avatar(t.poster_uid)"
                               :user="t.poster_id"
                               :text="t.content"
                               :post_id="t.post_id"
                               :time="t.time"
                               :tags="t.tags"
                               class="mb-3"
                />
            </VFlex>
            <VFlex md4 lg4 sm12 xs12 v-if="$vuetify.breakpoint.mdAndUp">
                <VContainer>
                    <VCard class="px-3 py-3">
                        <div v-if="$vuetify.breakpoint.mdAndUp">
                            <PostCardFilter :tags="tags" v-model="postFilter" />
                        </div>
                    </VCard>
                </VContainer>
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

    /***
     *
     * 这里提一下，因为VISIT和HOME两个界面代码重复率相当高，所以用了一个homePageBaseLoader的mixin来
     * 提高代码复用率，建议去HOME界面的代码看实现
     *
     * */

    import PopDialog from "../common/PopDialog";
    import popdialog from "../../mixins/popdialog";
    import VisitPostCard from "../items/VisitPostCard";
    import MugenScroll from "vue-mugen-scroll";

    import { homePageBaseLoader } from "./ViewHome";
    import { filter } from "../common/PostCardFilter";
    import PostCardFilter from "../common/PostCardFilter";
    import YIcon from "../common/YIcon";

    export default {
        name: "ViewVisit",
        components: {YIcon, PostCardFilter, VisitPostCard, PopDialog, MugenScroll},
        mixins : [popdialog,homePageBaseLoader,filter],
        data(){
            return{
                uid : Number,
            }
        },
        methods : {
            get(page){
                this.loading = true;
                this.axios.post('v1/post/public/get/person',this.$qs.stringify({
                    uid : this.uid,
                    page : page + 1
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
                    return `${process.env.VUE_APP_API_ROOT}/v1/account/avatar?size=75&uid=${uid}`;
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