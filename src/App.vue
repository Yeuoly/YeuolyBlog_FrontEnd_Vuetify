<template>
  <VApp>
    <div v-if="ready">
      <LayoutHeader />
      <FloatHelper />
      <LayoutSideMenu />
      <VSlideYTransition>
        <LayoutContainer v-if="allowContainer" />
      </VSlideYTransition>
      <VContainer v-if="working">
        <h1>服务器维护中……</h1>
      </VContainer>
      <VContainer v-if="browserVersionTooLow">
        <BrowserVersionTooLow />
      </VContainer>
      <LayoutFooter v-show="!loading" />
    </div>
    <div v-else class="text-xs-center app-items__loading">
      <VProgressCircular color="grey"
                         indeterminate
                         size="100"
      ></VProgressCircular>
    </div>
  </VApp>
</template>

<script>

  import LayoutHeader from "./components/layout/Header";
  import LayoutSideMenu from "./components/layout/SideMenu";
  import LayoutContainer from "./components/layout/Container";
  import LayoutFooter from "./components/layout/Footer";
  import FloatHelper from "./components/items/FloatHelper";
  const BrowserVersionTooLow = () => import('./components/views/ViewBrowserTooLow');

  export default {
    name: 'App',
    components: {
      FloatHelper,
      LayoutFooter,
      LayoutContainer,
      LayoutSideMenu,
      LayoutHeader,
      BrowserVersionTooLow : BrowserVersionTooLow
    },
    data(){
      return{
        server_state : false,
        loading : true,
        ready : false
      }
    },
    computed : {
      working(){
        return !this.server_state && !this.loading;
      },
      browserVersionTooLow(){
        let theUA = window.navigator.userAgent.toLowerCase();
        if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
          let ieVersion = ~~theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
          if (ieVersion <= 10) {
            return true;
          }
        }
        return false;
      },
      allowContainer(){
        return !this.working && !this.browserVersionTooLow;
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
          this.ready = true;
        }).catch(() => {
          this.server_state = false;
          this.loading = false;
          this.ready = true;
        });
      }
    },
    created(){
      setTimeout(this.user);
    },
  }
</script>

<style lang="scss">

  .position-relative{
    position: relative;
  }

  .position-absolute{
    position: absolute;
  }

  .app-items__loading{
    position: fixed;
    height: 100px;
    width: 100%;
    top: calc((100% - 200px) / 2);
  }

</style>
