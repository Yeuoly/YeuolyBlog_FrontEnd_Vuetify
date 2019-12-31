<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <HomeTopBar :user_uid="uid"
                    :user_name="user_id"
                    :user_follow="user_follow"
                    :user_class="user_class"
                    :disabled="home_flag || !visitable"
                    @followed="user_follow = true"
                    @unfollowed="user_follow = false"

        />
        <div v-if="visitable" class="position-relative">
            <div v-if="$vuetify.breakpoint.smAndDown">
                <VAvatar @click="open_filter_dialog = true"
                         class="filter_btn"
                >
                    <VIcon style="transform: translateY(-3px)">
                        mdi-filter-variant
                    </VIcon>
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
                     :class=" $vuetify.breakpoint.mdAndUp ? 'mx-5 pt-5' : 'mx-0 pt-4' "
                     :style="'min-height:' + ( $vuetify.breakpoint.height - 75 ) +'px'"
                     row
                     wrap
            >
                <VFlex sm12 xs12 md8 lg8>
                    <HomePostCard v-for="(t , key) in postCollections"
                                  v-show="selected(t.tags) && dateAllowed(t.time)"
                                  :key="key"
                                  :title="t['title']"
                                  :user="t['poster_id']"
                                  :text="t['content']"
                                  :post_id="t['post_id']"
                                  :time="t['time']"
                                  :tags="t['tags']"
                                  :user_uid="t['poster_uid']"
                                  :home_flag="home_flag"
                                  class="mb-1"
                    />
                </VFlex>
                <VFlex md4 lg4 sm12 xs12 v-if="$vuetify.breakpoint.mdAndUp">
                    <VContainer>
                        <VCard class="px-3 py-3">
                            <div class="grey--text caption lighten-1">
                                粉丝数：{{subscribe.be_num}}
                            </div>
                            <div class="grey--text caption lighten-1">
                                关注数：{{subscribe.do_num}}
                            </div>
                            <PostCardFilter :tags="tags" v-model="postFilter" />
                        </VCard>
                    </VContainer>
                </VFlex>
            </VLayout>
            <MugenScroll :handler="getRecent"
                         :should-handle="!loading"
                         scroll-container="noCharge"
                         v-if="useMugenScroll"
            ></MugenScroll>
        </div>
        <div v-else>
            <VContainer class="pt-5">
                <p v-show="tips">CODE:403-这个界面是不被允许访问的哦</p>
                <p>{{ tips }}</p>
            </VContainer>
        </div>
    </div>
</template>

<script>
    import HomePostCard from "../items/HomePostCard";
    import MugenScroll from 'vue-mugen-scroll';

    import { communicate } from "../../communicate";
    import { messageBox } from "../../communicate";
    import { filter } from "../common/PostCardFilter";
    import PostCardFilter from "../common/PostCardFilter";
    import HomeTopBar from "../items/HomeTopBar";
    import YDialog from "../common/YDialog";
    import MaterialCard from "../material/Card";

    export default {
        name: "ViewHome",
        components: {MaterialCard, YDialog, HomeTopBar, PostCardFilter, HomePostCard,MugenScroll},
        mixins : [filter],
        data(){
            return {
                tags : [],
                postCollections : [],
                page : 0,
                firstLoaded : false,
                end : false,
                loading : false,
                openSelection : false,
                open_filter_dialog : false,
                home_flag : false,
                uid : Number(),
                user_id : String(),
                user_class : Number(),
                user_follow : Boolean(),
                visitable : false,
                tips : String(),
                subscribe : {
                    be_num : 0,
                    do_num : 0
                }
            }
        },
        methods : {
            deleteLocalCard(post_id){
                this.axios.post('v1/post/private/action',this.$qs.stringify({
                    post_id : post_id,
                    act : 3
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666) {
                        messageBox('成功啦', '已经删掉刚刚的那篇博客了哦~', '', 'success');
                        for(let i in this.postCollections) {
                            this.postCollections[i].post_id === post_id ? this.postCollections.splice(i,1) : {};
                        }
                    }else{
                        messageBox('哦呀，好像出了一点点事情', _data['data']['error'], '', 'error');
                    }
                }).catch(() =>{
                    messageBox('哦呀，好像出了一点点事情', '服务器坏掉惹o(╥﹏╥)o', '', 'error');
                });
            },
            load(dist){
                dist.forEach( item => {
                    const tags = this.$utils.array_drop(item['tags'].split(/[\r\n ]/),'');
                    item['tags'] = tags;
                    this.$utils.array_merge(this.tags,tags);
                });
                this.postCollections = [...this.postCollections,...dist];
            },
            getRecent(){
                if(this.end){
                    return;
                }
                this.loading = true;
                const url = `v1/post/${ this.home_flag ? 'private' : 'public' }/action`;
                this.axios.post(url,this.$qs.stringify({
                    page : this.page + 1,
                    act : 0,
                    uid : this.uid
                })).then( response => {
                    const _data = response.data['data'];
                    if(_data['res'] === 666){
                        this.visitable = true;
                        this.load(_data['data']['posts']);
                        if(_data['data']['user_id']){
                            this.user_id = _data['data']['user_id'];
                            this.user_class = _data['data']['user_class'];
                            this.user_follow = _data['data']['followed'];
                        }else{
                            this.user_id = this.$store.getters.getUserName;
                            this.user_follow = false;
                            this.user_class = this.$store.getters.getClass;
                        }
                        this.page++;
                        if(_data['data']['posts'].length < 5){
                            this.end = true;
                        }
                    }else{
                        this.tips = _data['error'];
                        this.visitable = false;
                    }
                }).finally( () => {
                    this.firstLoaded = true;
                    setTimeout(() => {
                        this.loading = false;
                    },500);
                });
            },
            clear(){
                this.postCollections = [];
                this.tags = [];
                this.page = 0;
                this.end = false;
                this.firstLoaded = false;
            },
            refresh(){
                this.clear();
                this.getRecent();
            },
            init(){
                const uid = this.$route.query.uid;
                this.uid = uid || this.$store.getters.getUid;
                this.home_flag = uid === undefined;
                if(uid === undefined && !this.$store.getters.getOnlineState){
                    this.$router.push({ name : 'login'})
                }else{
                    this.getRecent();
                    this.getSubscribeInfo();
                }
            },
            getSubscribeInfo(){
                this.axios.get(`v1/account/info?uid=${this.uid}&filter=be_num|do_num`).then( response => {
                    const _data = response.data['data']['data'];
                    this.subscribe.be_num = _data[0];
                    this.subscribe.do_num = _data[1];
                });
            }
        },
        computed : {
            useMugenScroll(){
                return this.firstLoaded && !this.end &&
                     ( this.$route.name === 'home' || this.$route.name === 'visit' );
            },

        },
        mounted(){
            communicate.$on('HomeDelete',this.deleteLocalCard);
            communicate.$on('refreshHome',this.refresh);
            if(this.$route.name === 'visit'){
                this.$watch('$route.query.uid',() => {
                    this.clear();
                    this.init();
                })
            }
            this.init();
        },
        destroyed(){
            communicate.$off('HomeDelete',this.deleteLocalCard);
            communicate.$off('refreshHome',this.refresh);
        }
    }
</script>

<style>

    .filter_btn{
        position: absolute;
        right: 110px;
        top: -25px;
    }

</style>