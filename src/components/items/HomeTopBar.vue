<template>
    <div class="home-top-bar">
        <div class="home-top-bar__avatar">
            <VAvatar :size="$vuetify.breakpoint.mdAndUp ? 90 : 70">
                <VImg :src="userAvatar"></VImg>
            </VAvatar>
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
        <div class="home-top-bar__follow">
            <VBtn :color=" user_follow ? 'grey' : 'primary' " small round
                  v-if="$vuetify.breakpoint.smAndDown"
                  @click="follow"
                  :disabled="disabled"
            >
                {{ user_follow ? '取消关注' : '关注' }}
            </VBtn>
            <VBtn :color=" user_follow ? 'grey' : 'primary' " round
                  v-else
                  @click="follow"
                  :disabled="disabled"
            >
                {{ user_follow ? '取消关注' : '关注' }}
            </VBtn>
        </div>
    </div>
</template>

<script>

    export default {
        name: "HomeTopBar",
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
                form_data.append('act','4');
                form_data.append('react',this.user_follow ? 'unfo' : 'fo');
                form_data.append('uid',this.user_uid);
                this.$utils.csrf_post(`${process.env.VUE_APP_API_ROOT}/v1/account/online/action`, form_data,
                response => {
                    const _data = response.data;
                    if(_data['data']['res'] === 666){
                        this.$emit(this.user_follow ? 'unfollowed' : 'followed');
                    }
                });
            }
        },
        computed : {
            userAvatar(){
                return `${process.env.VUE_APP_API_ROOT}/v1/account/avatar?size=100&uid=${this.user_uid}`;
            },
            userClassColor(){
                switch (this.user_class) {
                    case 1:
                        return 'rgb(149,211,178)';
                    case 2:
                        return 'rgb(146,209,229)';
                    case 3:
                        return 'rgb(255,179,124)';
                    case 4:
                        return 'rgb(255,0,0)';
                }
            }
        }
    }
</script>

<style scoped>

    .home-top-bar{
        height: 160px;
        background-color: #424242;
        position: relative;
        background-image: url("https://i0.hdslb.com/bfs/album/44a23a025f6d31e90ba7a9d2e35773437c3e7be6.png");
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
        bottom: -50px;
        right: 60px;
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

        .home-top-bar__follow{
            bottom: -40px;
            right: 10px;
        }
    }

</style>