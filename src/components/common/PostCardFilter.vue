<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <VSelect label="筛选标签"
                 multiple
                 v-model="postFilter.selectedTags"
                 :items="tags"
                 chips
        ></VSelect>
        <VMenu v-model="postFilter.dateSection.frontMenu"
               ref="frontMenu"
               :close-on-content-click="false"
               transition="scale-transition"
               offset-y
               full-width
               max-width="290px"
               min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <VTextField label="这个时间之前"
                            v-model="postFilter.dateSection.frontDate"
                            v-on="on"
                            @keydown.prevent
                            @focus.prevent
                >
                </VTextField>
            </template>
            <VDatePicker v-model="postFilter.dateSection.frontDate"
                         @input="postFilter.dateSection.frontMenu = false"
                         :max="new Date().toISOString().substr(0,10)"
                         locale="cn"
            ></VDatePicker>
        </VMenu>
        <VMenu v-model="postFilter.dateSection.backMenu"
               ref="frontMenu"
               :close-on-content-click="false"
               transition="scale-transition"
               offset-y
               full-width
               max-width="290px"
               min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <VTextField label="这个时间之后"
                            v-model="postFilter.dateSection.backDate"
                            v-on="on"
                            @keydown.prevent
                            @focus.prevent
                            :disabled="!postFilter.dateSection.bootBack"
                >
                </VTextField>
            </template>
            <VDatePicker v-model="postFilter.dateSection.backDate"
                         @input="postFilter.dateSection.backMenu = false"
                         :max="postFilter.dateSection.frontDate"
                         locale="cn"
            ></VDatePicker>
        </VMenu>
        <VSwitch v-model="postFilter.dateSection.bootBack"
                 :label="`${postFilter.dateSection.bootBack ? '关闭' : '启用'}第二个时间框`"
        ></VSwitch>
    </div>
</template>

<script>
    export default {
        name: "PostCardFilter",
        model : {
            prop : 'hostValue',
            event : 'change'
        },
        props : {
            tags : Array
        },
        data(){
            let date = new Date().toISOString().substr(0, 10);
            return {
                postFilter : {
                    selectedTags : [],
                    dateSection : {
                        frontDate : date,
                        backDate : date,
                        frontMenu : false,
                        backMenu : false,
                        bootBack : false
                    }
                }
            }
        },
        computed : {
            hostValue(){
                return this.hostValue;
            }
        },
        watch : {
            postFilter : {
                handler(){
                    this.$emit('change',this.postFilter);
                },
                deep : true,
                immediate : true
            }
        }
    }

    export const filter = {
        data(){
            return {
                postFilter : {
                    selectedTags : [],
                    dateSection : {
                        frontDate : '',
                        backDate : '',
                        frontMenu : false,
                        backMenu : false,
                        bootBack : false
                    }
                }
            }
        },
        computed : {
            selected(){
                return tags => {
                    if(this.postFilter.selectedTags.length === 0){
                        return true;
                    }
                    return this.$utils.array_intersection(tags,this.postFilter.selectedTags).length !== 0;
                }
            },
            dateAllowed(){
                return timestamp => {
                    if(this.postFilter.dateSection.bootBack){
                        return timestamp > this.backTime && timestamp < this.frontTime;
                    }
                    return timestamp < this.frontTime;
                }
            },
            backTime(){
                return ( Date.parse(this.postFilter.dateSection.backDate) / 1000 ) ;
            },
            frontTime(){
                return ( Date.parse(this.postFilter.dateSection.frontDate) / 1000 ) + 86399;
            }
        }
    }
</script>