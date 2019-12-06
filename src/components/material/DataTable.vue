<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
                <td v-for="t in item">
                    <span v-if="typeof t === 'string' || typeof t === 'number'">
                        {{ t }}
                    </span>
                    <VMenu v-else>
                        <template v-slot:activator="{ on }">
                            <VBtn v-on="on" small flat>
                                <VIcon>mdi-menu-open</VIcon>
                            </VBtn>
                        </template>
                        <VList>
                            <VBtn small block flat v-for="p in t" @click="p.method">
                                {{p.text}}
                            </VBtn>
                        </VList>
                    </VMenu>
                </td>
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