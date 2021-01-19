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
        <div class="pt-5 mb-2 post-page-card">
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
import PostCard from '../components/common/HomePostCard';
import TopBar from '../components/common/HomeTopBar';
import axios from 'axios';
import { stringify } from 'querystring';
import { messageBox } from '../communicate';
import { loadBlog } from '../lib/async/post';
import { pid_format_all, space_format_has } from '../lib/pattern';

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
        init(){
            setTimeout(async () => {
                const pid = this.$route.query.pid;
                if(!pid.match(pid_format_all)){
                    messageBox('错误', 'pid格式错误', '', 'error');
                    return;
                }
                const post = await loadBlog(pid);
                this.html = post['content'];
                this.user_id = post['user_id'] || post['poster_id'];
                this.user_uid = post['user_uid'] || post['poster_uid'];
                this.post_tags = typeof post['tags'] === 'string' ? post['tags'].split(space_format_has) : post['tags'];
                this.post_time = post['time'];
                this.title = post['title'];
                this.user_followed = post['followed'];
                this.user_class = post['user_class'];
                this.over = true;
            }, 200);
        }
    },
    watch : {
        '$route.query.pid' : {
            handler(){
                this.init();
            },
            immediate : true
        }
    }
}
</script>

<style>
.post-page-card{
    max-width: 1200px;
    margin: 0 auto;
}
</style>