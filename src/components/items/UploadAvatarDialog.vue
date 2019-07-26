<template>
    <MaterialCard title="上传头像">
        <VInput>

        </VInput>
    </MaterialCard>
</template>

<script>
    import MaterialCard from "../material/Card";
    export default {
        name: 'UploadAvatarDialog',
        components: {MaterialCard},
        data () {
            return {
                errorStr: ''
            }
        },
        methods: {
            upload(e){

            }
        }

    }
</script>

<style scoped>

</style>