<template>
    <div>
        <TopBar 
            :user_uid="user_uid"
            :user_name="user_id"
            :user_follow="user_followed"
            :user_class="user_class"
            @followed="user_followed = true"
            @unfollowed="user_followed = false"
            :disabled="user_uid == $store.getters.getUid || !user_uid"
        />
        <div class="pt-5 mb-2">
            <PostCard
                v-if="over"
                :title="title"
                :user="user_id"
                :text="html"
                :post_id="post_id"
                :time="post_time"
                :tags="post_tags"
                :user_uid="user_uid"
                :home_flag="false"
            />
        </div>
    </div>
</template>

<script>
import PostCard from '../items/HomePostCard';
import TopBar from '../items/HomeTopBar';
import axios from 'axios';
import { stringify } from 'querystring';
import { messageBox } from '../../communicate';

export default {
    name : 'ViewPostPage',
    components : { PostCard, TopBar },
    data(){
        return {
            title : '',
            user_id : '',
            user_uid : 0,
            user_followed : false,
            user_class : '',
            html : '',
            post_id : '',
            post_time : 0,
            post_tags : '',
            over : false
        }
    },
    methods : {
        async init(pid){
            try{
                const { data } = await axios.post('v1/post/public/action', stringify({
                    post_id : pid,
                    act : 4
                }));
                if(data['data']['res'] === 666){
                    const _ = data['data']['data'];
                    this.html = _['content'];
                    this.user_id = _['user_id'];
                    this.user_uid = _['user_uid'];
                    this.post_tags = _['tags'].split(/[\s]/g);
                    this.post_time = _['time'];
                    this.title = _['title'];
                    this.user_followed = _['followed'];
                    this.user_class = _['user_class'];
                    this.over = true;
                }else{
                    messageBox('发生了一点小错误', data['data']['error'],'','error');
                }
            }catch(e){
                messageBox('发生了一点小错误', '与服务器的连接似乎出现了一点小问题','','error');
            }
        }
    },
    mounted(){
        setTimeout(() => {
            const pid = this.$route.query.pid;
            if(/^([a-f0-9]{32,32})$/g.test(pid)){
                this.init(pid);
            }else{
                messageBox('发生了一点小错误', 'pid格式错误', '', 'error');
            }
        });
    }
}
</script>

<style>

</style>