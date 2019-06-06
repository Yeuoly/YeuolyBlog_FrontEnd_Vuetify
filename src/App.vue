<template>
  <VApp>
    <LayoutHeader></LayoutHeader>
    <LayoutSideMenu></LayoutSideMenu>
    <VSlideYTransition>
      <LayoutContainer v-if="server_state"></LayoutContainer>
    </VSlideYTransition>
    <VContainer v-if="working">
      <h1>服务器维护中……</h1>
    </VContainer>
    <LayoutFooter v-show="!loading"></LayoutFooter>
  </VApp>
</template>

<script>

  import LayoutHeader from "./components/layout/Header";
  import LayoutSideMenu from "./components/layout/SideMenu";
  import LayoutContainer from "./components/layout/Container";
  import LayoutFooter from "./components/layout/Footer";

  export default {
    name: 'App',
    components: {
      LayoutFooter,
      LayoutContainer,
      LayoutSideMenu,
      LayoutHeader
    },
    data(){
      return{
        server_state : false,
        loading : true
      }
    },
    computed : {
      working(){
        return !this.server_state && !this.loading;
      }
    },
    methods : {
      user(){
        this.axios.post('v1/account/user',null).then(response => {
          let _data = response['data'];
          if(_data['data']['res'] === 666){
            let data = _data['data']['data'];
            this.$store.commit('setOnlineState',true);
            this.$store.commit('setUserName',data['user_id']);
            this.$store.commit('setLoginTime',data['login_time']);
            this.$store.commit('setUid',data['user_uid']);
            this.$store.commit('setUserClass',data['user_class']);
            this.server_state = true;
            this.loading = false;
          }else if(_data['data']['error'] === '101'){
            this.server_state = false;
            this.loading = false;
          }
        }).catch(() => {
          this.server_state = false;
          this.loading = false;
        });
      }
    },
    created() {
      setTimeout(this.user);
    }
  }
</script>

<style lang="scss">

  .position-relative{
    position: relative;
  }

  .position-absolute{
    position: absolute;
  }

</style>
