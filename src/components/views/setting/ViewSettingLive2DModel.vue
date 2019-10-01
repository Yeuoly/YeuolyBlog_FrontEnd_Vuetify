<template>
    <VCard flat>
        <VLayout class="px-2" colnum wrap>
            <VFlex xs12 v-for="( t , index ) in settings" :key="index">
                <VSwitch v-model="t.on" :label="t.title + '：' + t.detail"></VSwitch>
            </VFlex>
        </VLayout>
        <VCardText class="grey--text">
            更新换设置之后记得刷新界面哦~因为模型比较大，开启后第一次加载会很慢哒，请主人稍微等一下啦
        </VCardText>
    </VCard>
</template>

<script>
    export default {
        name: "ViewSettingLive2DModel",
        data(){
            return {
                settings : {
                    on : {
                        title : '开启live2d看板娘',
                        detail : '开启之后主人就会看到一个可爱的看板娘啦',
                        on : false
                    },
                    homeOnly : {
                        title : '只在自己的空间展示看板娘',
                        detail : '咱只想让她守着家',
                        on : true
                    }
                }
            }
        },
        watch : {
            'settings.on.on' : {
                handler(newVal){
                    this.$cookies.set('live2dAll',newVal,1145141919);
                },
            },
            'settings.homeOnly.on' : {
                handler(newVal){
                    this.$cookies.set('live2dHomeOnly',newVal,1145141919);
                },
            }
        },
        methods : {
            init(){
                this.settings.on.on = this.$cookies.get('live2dAll') === 'true' || false;
                this.settings.homeOnly.on = this.$cookies.get('live2dHomeOnly') === 'true' || false;
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
