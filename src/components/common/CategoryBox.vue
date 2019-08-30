<template>
    <VCardActions class="category-box mx-0">
        <span v-for="t in items"
              :key="t"
              class="category-box__item"
              :class="display ? 'category-box__item-extend-display' : ''"
              v-show="t !== ' '"
        >
            <button v-if="canOperate" class="category-box__item-delete" @click="deleteCategory(t)">×</button>
            {{t}}
        </span>
    </VCardActions>
</template>

<script>
    export default {
        name: "CategoryBox",
        model : {
            prop : 'items',
            event : 'change'
        },
        props : {
            items : [Array,String],
            canOperate : {
                type : Boolean,
                default : false
            },
            display : {
                type : Boolean,
                default : true
            }
        },
        methods : {
            deleteCategory(item){
                this.items.splice(this.items.indexOf(item),1);
                this.$emit('change',this.items);
            },
        }
    }
</script>

<style>
    .category-box{
        font-size: 12px;
        margin: 0;
        display: block;
    }

    .category-box__item{
        margin-left: 14px;
        display: inline-block !important;
    }

    .category-box__item > span {
        float: left;
        margin-right: 25px;
        font-size: 13px;
        line-height: 1.8em;
        cursor: default;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .category-box__item .category-box__item-delete{
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: #1976d2;
        color: white;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
    }

    .category-box__item-extend-display{
        background-color: #1976d2;
        border-radius: 10px;
        color: white;
        padding-left: 5px;
        padding-right: 5px;
    }
</style>