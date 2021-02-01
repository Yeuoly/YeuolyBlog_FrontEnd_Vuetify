<template>
    <div>
        <div v-if="$vuetify.breakpoint.smAndDown">
            <VAvatar @click="open_filter_dialog = true"
                     class="filter_btn"
            >
                <VIcon style="transform: translateY(150px)">
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
        <VLayout :class=" $vuetify.breakpoint.mdAndUp ? 'mx-5 pt-5' : 'mx-0 pt-4' "
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
</template>

<script>
    import HomePostCard from "../../components/common/HomePostCard";
    import MugenScroll from 'vue-mugen-scroll';
    import PostCardFilter from "../../components/common/PostCardFilter";
    import MaterialCard from "../../components/material/Card";
    import YDialog from "../../components/common/YDialog";
    import { filter } from "../../components/common/PostCardFilter";
    import { communicate, messageBox } from "../../communicate";
    import { enter_space_format_has } from "../../lib/pattern";
    import { api_private_del_post, api_get_recent } from '../../lib/static/api';

    export default {
        components: {MaterialCard, YDialog, PostCardFilter, HomePostCard,MugenScroll},
        mixins : [filter],
        data : () => ({
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
        }),
        watch : {
            '$route.params.uid' : {
                handler(){
                    this.clear();
                    this.init();
                }
            }
        },
        methods : {
            deleteLocalCard(post_id){
                this.axios.post(api_private_del_post.route ,this.$qs.stringify({
                    post_id : post_id,
                    act : api_private_del_post.act
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
                    //先把博客加入缓存，避免多次加载的情况
                    //loadBlogDirective(item['post_id'], item);
                    const tags = this.$utils.array_drop(item['tags'].split(enter_space_format_has),'');
                    item['tags'] = tags;
                    this.$utils.array_merge(this.tags,tags);
                });
                this.postCollections = [...this.postCollections, ...dist];
            },
            getRecent(){
                if(this.end){
                    return;
                }
                this.loading = true;
                this.axios.post(api_get_recent.route(this.home_flag) ,this.$qs.stringify({
                    page : this.page + 1,
                    act : api_get_recent.act,
                    uid : this.uid
                })).then( response => {
                    const _data = response.data['data'];
                    if(_data['res'] === 666){
                        this.visitable = true;
                        this.load(_data['data']['posts']);
                        this.page++;
                        if(_data['data']['posts'].length == 0){
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
                const uid = this.$route.params.uid;
                this.uid = uid
                this.home_flag = uid === undefined;
                if(uid === undefined && !this.$store.getters.getOnlineState){
                    this.$router.push({ name : 'login'})
                }else{
                    this.getRecent();
                }
            },
        },
        computed : {
            useMugenScroll(){
                return this.firstLoaded && !this.end && this.$route.name === 'home-dynamic';
            },

        },
        mounted(){
            communicate.$on('HomeDelete',this.deleteLocalCard);
            communicate.$on('refreshHome',this.refresh);
            this.init();
        },
        destroyed(){
            communicate.$off('HomeDelete',this.deleteLocalCard);
            communicate.$off('refreshHome',this.refresh);
        }
    }
</script>

<style>

</style>