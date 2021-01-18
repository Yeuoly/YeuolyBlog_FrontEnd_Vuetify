<template>
    <div ref="holder">
        <div id="landlord" style="left:5px;bottom:0px;">
            <div class="message" style="opacity:0"></div>
            <canvas id="live2d" width="500" height="560" class="live2d"></canvas>
            <div class="live_talk_input_body">
                <div class="live_talk_input_name_body">
                    <input name="name" type="text" class="live_talk_name white_input" id="AIuserName" autocomplete="off" placeholder="你的名字" />
                </div>
                <div class="live_talk_input_text_body">
                    <input name="talk" type="text" class="live_talk_talk white_input" id="AIuserText" autocomplete="off" placeholder="要和我聊什么呀？"/>
                    <button type="button" class="live_talk_send_btn" id="talk_send">发送</button>
                </div>
            </div>
            <input name="live_talk" id="live_talk" value="1" type="hidden" />
            <div class="live_ico_box">
                <div class="live_ico_item type_info" id="showInfoBtn"></div>
                <div class="live_ico_item type_talk" id="showTalkBtn"></div>
                <div class="live_ico_item type_quit" id="hideButton"></div>
                <input name="live_statu_val" id="live_statu_val" value="0" type="hidden" />
            </div>
        </div>
        <div id="open_live2d">召唤伊斯特瓦尔</div>
    </div>
</template>

<script>
    window.message_Path = '/live2dw/assets/live2d/';
    window.talkAPI = '';

    export default {
        name: "Live2DGirl",
        methods : {
            loadJs(){
                const node_1 = document.createElement('script');
                const node_2 = document.createElement('script');
                const node_3 = document.createElement('script');
                const node_4 = document.createElement('link');
                node_4.rel = 'stylesheet';
                node_3.src = 'https://apps.bdimg.com/libs/jquery/1.7.1/jquery.min.js';
                node_4.href = `${process.env.VUE_APP_WEB_ROOT}/live2dw/assets/live2d/css/live2d.css`;
                node_1.src = `${process.env.VUE_APP_WEB_ROOT}/live2dw/assets/live2d/js/live2d.js`;
                node_2.src = `${process.env.VUE_APP_WEB_ROOT}/live2dw/assets/live2d/js/message.js`;
                document.head.appendChild(node_4);
                document.body.appendChild(node_3);
                setTimeout(() => {
                    document.body.appendChild(node_2);
                    document.body.appendChild(node_1);
                }, 3000);
            },
            addRouteWatcher(){
                this.$watch('$route.name', {
                    handler : newVal => {
                        this.$refs.holder.style.display = newVal === 'home' ? 'block' : 'none';
                    },
                    immediate : true
                });
            }
        },
        mounted() {
            if(this.$cookies.get('live2dHomeOnly') === 'true'){
                this.addRouteWatcher();
            }
        },
        created(){
            if(this.$cookies.get('live2dAll') === 'true'){
                this.loadJs();
            }
        }
    }
</script>