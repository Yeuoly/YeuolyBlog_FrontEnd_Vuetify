<template>
    <MaterialCard
            color="green"
            :title="title"
            :text="text"
    >
        <v-data-table
                :headers="headers"
                :items="items"
                hide-actions
        >
            <template
                    slot="headerCell"
                    slot-scope="{ header }"
            >
                <span class="subheading font-weight-light text-success text--darken-3"
                      v-text="header.text"></span>
            </template>
            <template
                    slot="items"
                    slot-scope="{ item }"
            >
                <td v-for="t in item">{{ t }}</td>
            </template>
        </v-data-table>
    </MaterialCard>
</template>

<script>
    import MaterialCard from "./Card";
    export default {
        name: "DashBoardDataTable",
        components: {MaterialCard},
        props : {
            headers : {
                required : true
            },
            items : {
                required : true
            },
            title : {
                type : String(),
            },
            text : {
                type : String()
            }
        }
    }
</script>

<style scoped>

</style>