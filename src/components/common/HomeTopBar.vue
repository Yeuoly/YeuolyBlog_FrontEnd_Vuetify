<template>
    <div ref="host" class="home-top-bar">
        <div class="home-top-bar__avatar">
            <YAvatar :size="$vuetify.breakpoint.mdAndUp ? 90 : 70" :uid="user_uid" />
        </div>
        <div class="home-top-bar__info">
            <span class="home-top-bar__class"
                  :style="{ backgroundColor : userClassColor }"
            >
                lv.{{ user_class }}
            </span>
            <span class="home-top-bar__name">
                {{ user_name }}
            </span>
        </div>
        <!--<div class="home-top-bar__subscribes"
             v-if="$vuetify.breakpoint.mdAndUp"
        >
            <div class="x-w-half left">
                <span class="caption grey&#45;&#45;text">关注数：</span>
            </div>
            <div class="x-w-half right">
                <span class="caption">粉丝数：</span>
            </div>
        </div>-->
        <div class="home-top-bar__follow" v-show="!disabled">
            <VBtn :color=" user_follow ? 'grey' : 'primary' "
                  small
                  round
                  v-if="$vuetify.breakpoint.smAndDown"
                  @click="follow"
            >
                {{ user_follow ? '取消关注' : '关注' }}
            </VBtn>
            <VBtn :color=" user_follow ? 'grey' : 'primary' "
                  round
                  v-else
                  @click="follow"
            >
                {{ user_follow ? '取消关注' : '关注' }}
            </VBtn>
        </div>
    </div>
</template>

<script>

    import { messageBox } from "../../communicate";
    import { api_follow } from '../../lib/static/api';
    import YAvatar from "../common/YAvatar";

    export default {
        name: "HomeTopBar",
        components: {YAvatar},
        props : {
            user_name : {
                default : 'none',
                type : String()
            },
            user_uid : {
                default: 0,
                type : Number(),
            },
            user_follow : {
                default : false,
                type : Boolean()
            },
            user_class : {
                default : 1,
                type : Number()
            },
            disabled : {
                default : false,
                type : Boolean()
            }
        },
        methods : {
            follow(){
                const form_data = new FormData();
                form_data.append('act', `${api_follow.act}`);
                form_data.append('react', this.user_follow ? 'unfo' : 'fo');
                form_data.append('uid', this.user_uid);
                this.$utils.csrf_post(`${process.env.VUE_APP_API_ROOT}/${api_follow.route}`, form_data,
                response => {
                    const _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.$emit(this.user_follow ? 'unfollowed' : 'followed');
                    }else{
                        messageBox('错误','',_data['data']['error'],'error');
                    }
                });
            }
        },
        computed : {
            userClassColor(){
                switch (this.user_class) {
                    case 0:
                        return 'grey';
                    case 1:
                        return 'rgb(149,211,178)';
                    case 2:
                        return 'rgb(146,209,229)';
                    case 3:
                        return 'rgb(255,179,124)';
                    case 4:
                        return 'rgb(255,0,0)';
                }
            },
            useFollowBtn(){
                return this.$store.getters.getOnlineState &&
                    this.user_uid !== this.$store.getters.getUid;
            }
        }
    }
</script>

<style scoped>

    .x-w-half{
        width: 50%;
    }

    .home-top-bar{
        height: 160px;
        background-color: #424242;
        position: relative;
        background-image: url(//yeuoly.oss-cn-beijing.aliyuncs.com/yeuolyblog/public/daily/20210127/e1d73ecc5b9f932f8e4879a30ee890693d3ee429.png);
        background-size: 100%;
        background-position: center;
    }

    .home-top-bar > * {
        position: absolute;
    }

    .home-top-bar__avatar{
        bottom: -40px;
        left: 30px;
        background-color: white;
        border-radius: 100px;
        padding: 2px;
    }

    .home-top-bar__info{
        left: 150px;
        bottom: 10px;
    }

    .home-top-bar__name{
        font-size: 25px;
        font-weight: 400;
        color: white;
    }

    .home-top-bar__class{
        display: inline-block;
        width: 34px;
        height: 16px;
        margin-right: 5px;
        border-radius: 5px;
        text-align: center;
        color: white;
        font-size: 8px;
        font-weight: 300;
    }

    .home-top-bar__follow{
        position: absolute;
        bottom: 5px;
        right: 10px;
    }

    .home-top-bar__subscribes{
        padding: 5px;
        position: absolute;
        right: 60px;
        width: 160px;
        height: 40px;
        bottom: 10px;
        border-radius: 10px;
        background-color: white;
    }

    @media (max-width: 959px) {
        .home-top-bar{
            height: 80px;
        }

        .home-top-bar__info{
            left: 110px;
        }

        .home-top-bar__avatar{
            left: 15px;
        }
    }

</style>