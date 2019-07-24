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
                <HomePostCard v-for="(t , key) in postCollections"
                              :key="key"
                              :title="t.title"
                              :avatar="avatarUrl(t.poster_uid)"
                              :user="t.poster_id"
                              :text="t.content"
                              :post_id="t.post_id"
                              :time="t.time"
                              class="mb-3"
                />
            </VFlex>
        </VLayout>
    </div>
</template>

<script>
    import popdialog from "../../mixins/popdialog";
    import HomePostCard from "../items/HomePostCard";

    import { communicate } from "../../communicate";

    export default {
        name: "ViewHome",
        components: { HomePostCard},
        mixins : [popdialog],
        methods : {
            deleteLocalCard(post_id){
                this.axios.post('v1/post/private/delete',this.$qs.stringify({
                    post_id : post_id
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666)
                    {
                        this.openDialog(
                            '成功啦',
                            '已经删掉刚刚的那篇博客了哦~',
                            '',
                            'success'
                        );
                        for(let i in this.postCollections) {
                            if(this.postCollections[i].post_id === post_id) {
                                this.postCollections.splice(i,1);
                            }
                        }
                    }else{
                        this.openDialog(
                            '哦呀，好像出了一点点事情',
                            _data['data']['error'],
                            '',
                            'error'
                        );
                    }
                }).catch(() =>{
                    this.openDialog(
                        '哦呀，好像出了一点点事情',
                        '服务器坏掉惹o(╥﹏╥)o',
                        '',
                        'error'
                    );
                });
            },
            avatarUrl(uid){
                return process.env.VUE_APP_API_ROOT + '/v1/account/avatar?uid=' + uid;
            },
            getRecent(){
                if(this.end){
                    this.openDialog('消息','这就是主人的全部啦！','','info');
                    return;
                }
                this.axios.post('v1/post/private/getrecent',this.$qs.stringify({
                    page : this.page + 1
                })).then( response => {
                    let _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.load(_data['data']['data']);
                        this.page++;
                        if(_data['data']['data'].length < 5){
                            this.end = true;
                            if(_data['data']['data'].length === 0){
                                this.openDialog('消息','这就是主人的全部啦！','','info');
                            }
                        }
                    }
                });
            },
            load(dist){
                this.postCollections = [...this.postCollections,...dist];
            },
            refresh(){
                this.postCollections = [];
                this.page = 0;
                this.end = false;
                this.getRecent();
            }
        },
        data(){
            return{
                postCollections : [],
                page : 0,
                end : false
            }
        },
        mounted(){
            communicate.$on('HomeDelete',this.deleteLocalCard);
            communicate.$on('refreshHome',this.refresh);
            communicate.$on('loadMoreHome',this.getRecent);
            this.getRecent();
        },
        destroyed(){
            communicate.$off('HomeDelete',this.deleteLocalCard);
            communicate.$off('refreshHome',this.refresh);
            communicate.$off('loadMoreHome',this.getRecent);
        }
    }
</script>

<style>

</style>