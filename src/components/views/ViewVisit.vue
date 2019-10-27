<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <HomeTopBar :user_uid="user_uid"
                    :user_name="user_id"
                    :user_follow="user_follow"
                    :user_class="user_class"
                    @followed="user_follow = true"
                    @unfollowed="user_follow = false"
        />
        <div v-if="$vuetify.breakpoint.smAndDown">
            <VAvatar @click="open_filter_dialog = true"
                     style="position: absolute; right: 110px;"
            >
                <YIcon style="font-size: 20px;">
                    shaixuan
                </YIcon>
            </VAvatar>
            <YDialog v-model="open_filter_dialog">
                <MaterialCard class="px-2 py-2" slot="inner">
                    <PostCardFilter :tags="tags"
                                    v-model="postFilter"
                    />
                </MaterialCard>
            </YDialog>
        </div>
        <VLayout class="mt-4"
                 :class="$vuetify.breakpoint.mdAndUp ? 'mx-5 pt-5' : 'mx-0 pt-4' "
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
                     v-if="useMugenScroll"
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

    import VisitPostCard from "../items/VisitPostCard";
    import MugenScroll from "vue-mugen-scroll";

    import { homePageBaseLoader } from "./ViewHome";
    import { filter } from "../common/PostCardFilter";
    import { messageBox } from "../../communicate";
    import PostCardFilter from "../common/PostCardFilter";
    import YIcon from "../common/YIcon";
    import HomeTopBar from "../items/HomeTopBar";
    import YDialog from "../common/YDialog";
    import MaterialCard from "../material/Card";

    export default {
        name: "ViewVisit",
        components: {MaterialCard, YDialog, HomeTopBar, YIcon, PostCardFilter, VisitPostCard, MugenScroll},
        mixins : [homePageBaseLoader,filter],
        data(){
            return{
                uid : Number(),
                user_id : String(),
                user_class : Number(),
                user_follow : Boolean(),
            }
        },
        methods : {
            get(page){
                this.loading = true;
                this.axios.post('v1/post/public/action',this.$qs.stringify({
                    uid : this.uid,
                    page : page + 1,
                    act : 0
                })).then( response => {
                    const _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.load(_data['data']['data']['posts']);
                        this.end = _data['data']['data']['posts'].length === 0;
                        this.user_id = _data['data']['data']['user_id'];
                        this.user_class = _data['data']['data']['user_class'];
                        this.user_follow = _data['data']['data']['followed'];
                        this.page++;
                    }else{
                        messageBox('发生了一些错误',_data['data']['error'],'','error');
                        this.end = true;
                    }
                }).catch( () => {
                    messageBox('发生了一些错误','服务器大姨妈了','','error');
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
                    messageBox('缺少请求参数','咱也不知道主人要访问谁的空间惹x','','error');
                }
            }
        },
        computed : {
            avatar(){
                return (uid) => {
                    return `${process.env.VUE_APP_API_ROOT}/v1/account/avatar?size=75&uid=${uid}`;
                }
            },
            useMugenScroll(){
                return this.firstLoaded && !this.end && this.$route.name === 'visit';
            },
            user_uid(){
                return parseInt(this.uid);
            }
        },
        mounted(){
            this.init();
        }
    }
</script>

<style scoped>

</style>