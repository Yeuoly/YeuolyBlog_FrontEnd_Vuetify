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
                <VisitPostCard v-for="(t , key) in postCollections"
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
    import PopDialog from "../common/PopDialog";
    import popdialog from "../../mixins/popdialog";
    import VisitPostCard from "../items/VisitPostCard";

    export default {
        name: "ViewVisit",
        components: {VisitPostCard, PopDialog},
        mixins : [popdialog],
        data(){
            return{
                postCollections : []
            }
        },
        methods : {
            get(){

            }
        }
    }
</script>

<style scoped>

</style>