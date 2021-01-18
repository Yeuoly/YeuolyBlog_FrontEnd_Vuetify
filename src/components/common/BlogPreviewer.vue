<template>
    <VCard>
        <VCardTitle>
            <VCardText class="blog-preivew-title clickable" @click="jumpTo">
                {{ post.title }}
            </VCardText>
            {{ post.time }} - {{ post.user_id }}
        </VCardTitle>
        <VCardText class="blog-preivew-content">{{ post.content }}</VCardText>
    </VCard>
</template>

<script>
import { loadBlog } from '../../lib/async/post';
import { router, communicate } from '../../communicate';
import utils from '../../lib/utils';

export default {
    name : 'BlogPreviewer',
    data : () => ({
        post : {
            title : '',
            content : '',
            time : '',
            user_id : ''
        }
    }),
    methods : {
        jumpTo(){
            const pid = this.$parent.pid;
            //为了避免多年后的我忘记，这里写一下，这里的router方法会返回主Root中的$router
            const $router = router();
            if($router.currentRoute.name === 'post-page'){
                $router.push({ query : { pid } });
                communicate.$emit('update-post-page');
            }else{
                $router.push({ name : 'post-page', query : { pid } });
            }
        },
        async init(){
            const post = await loadBlog(this.$parent.pid);
            this.post.title = post['title'];
            this.post.content = post['content'];
            this.post.time = utils.date('Y-M-D h:m:s', post['time']);
            this.post.user_id = post['user_id'];
        }
    },
    watch : {
        pid : {
            handler(){
                this.init();
            },
            immediate : true
        }
    }
}
</script>

<style>

.blog-preivew-title{
    font-size: 22px;
    text-decoration: underline;
    padding: 0;
}

.blog-preivew-title:hover{
    color: cadetblue;
}

.blog-preivew-content{
    max-height: 60px;
    overflow: hidden;
}

</style>