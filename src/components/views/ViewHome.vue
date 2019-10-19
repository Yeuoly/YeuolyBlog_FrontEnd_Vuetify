<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
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
                <HomePostCard v-for="(t , key) in postCollections"
                              v-show="selected(t.tags) && dateAllowed(t.time)"
                              :key="key"
                              :title="t.title"
                              :avatar="avatarUrl(t.poster_uid)"
                              :user="t.poster_id"
                              :text="t.content"
                              :post_id="t.post_id"
                              :time="t.time"
                              :tags="t.tags"
                              :user_uid="t.poster_uid"
                              class="mb-3"
                              @removeFromFollowings="removeFromFollowings"
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
        <MugenScroll :handler="getRecent"
                     :should-handle="!loading"
                     scroll-container="noCharge"
                     v-if="useMugenScroll"
        ></MugenScroll>
    </div>
</template>

<script>
    import HomePostCard from "../items/HomePostCard";
    import MugenScroll from 'vue-mugen-scroll';

    import { communicate } from "../../communicate";
    import { messageBox } from "../../communicate";
    import { filter } from "../common/PostCardFilter";
    import YIcon from "../common/YIcon";
    import PostCardFilter from "../common/PostCardFilter";

    export const homePageBaseLoader = {
        data(){
            return {
                tags : [],
                postCollections : [],
                page : 0,
                firstLoaded : false,
                end : false,
                loading : false,
                openSelection : false,
            }
        },
        methods : {
            load(dist){
                dist.forEach( item => {
                    let tags = this.$utils.array_drop(item['tags'].split(/[\r\n ]/),'');
                    item['tags'] = tags;
                    this.$utils.array_merge(this.tags,tags);
                });
                this.postCollections = [...this.postCollections,...dist];
            },
        }
    };

    export default {
        name: "ViewHome",
        components: { PostCardFilter, YIcon, HomePostCard,MugenScroll},
        mixins : [filter,homePageBaseLoader],
        methods : {
            deleteLocalCard(post_id){
                this.axios.post('v1/post/private/action',this.$qs.stringify({
                    post_id : post_id,
                    act : 3
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666)
                    {
                        messageBox('成功啦', '已经删掉刚刚的那篇博客了哦~', '', 'success');
                        for(let i in this.postCollections) {
                            if(this.postCollections[i].post_id === post_id) {
                                this.postCollections.splice(i,1);
                            }
                        }
                    }else{
                        messageBox('哦呀，好像出了一点点事情', _data['data']['error'], '', 'error');
                    }
                }).catch(() =>{
                    messageBox('哦呀，好像出了一点点事情', '服务器坏掉惹o(╥﹏╥)o', '', 'error');
                });
            },
            avatarUrl(uid){
                return `${process.env.VUE_APP_API_ROOT}/v1/account/avatar?size=75&uid=${uid}`;
            },
            getRecent(){
                if(this.end){
                    messageBox('消息','这就是主人的全部啦！','','info');
                    return;
                }
                this.loading = true;
                this.axios.post('v1/post/private/action',this.$qs.stringify({
                    page : this.page + 1,
                    act : 0
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.load(_data['data']['data']);
                        this.page++;
                        if(_data['data']['data'].length < 5){
                            this.end = true;
                            if(_data['data']['data'].length === 0){
                                messageBox('消息','这就是主人的全部啦！','','info');
                            }
                        }
                    }
                }).finally( () => {
                    this.firstLoaded = true;
                    setTimeout(() => {
                        this.loading = false;
                    },500);
                });
            },
            refresh(){
                this.postCollections = [];
                this.page = 0;
                this.end = false;
                this.firstLoaded = false;
                this.getRecent();
            },
            removeFromFollowings(uid) {
                this.axios.post('v1/account/follow/remove',this.$qs.stringify({
                    uid : uid,
                })).then( response => {

                } ).catch( () => {

                });
            }
        },
        computed : {
            useMugenScroll(){
                return this.firstLoaded && !this.end && this.$route.name === 'home';
            }
        },
        mounted(){
            communicate.$on('HomeDelete',this.deleteLocalCard);
            communicate.$on('refreshHome',this.refresh);
            this.getRecent();
        },
        destroyed(){
            communicate.$off('HomeDelete',this.deleteLocalCard);
            communicate.$off('refreshHome',this.refresh);
        }
    }
</script>

<style>

</style>