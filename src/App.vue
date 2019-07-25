<template>
  <VApp>
    <div v-if="!checking">
      <LayoutHeader />
      <FloatHelper />
      <LayoutSideMenu />
      <VSlideYTransition>
        <LayoutContainer v-if="allowContainer" />
      </VSlideYTransition>
      <VContainer v-if="working">
        <h1>服务器维护中……</h1>
      </VContainer>
      <VContainer v-else-if="browserVersionTooLow">
        <BrowserVersionTooLow />
      </VContainer>
      <LayoutFooter />
    </div>
    <div v-else-if="checking" class="text-xs-center app-items__loading">
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
  import BrowserVersionTooLow from './components/views/ViewBrowserTooLow';


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
        checking : true,
        working : false
      }
    },
    computed : {
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
      getApiState(){
        this.axios.get('/v1/state/api').then( response => {
          this.working = response.data !== 'OK' ;
        }).catch(() => {
          this.working = true;
        }).finally(() => {
          this.checking = false;
        });
      }
    },
    mounted() {
      this.getApiState();
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

  .app-items__loading{
    position: fixed;
    height: 100px;
    width: 100%;
    top: calc((100% - 200px) / 2);
  }

  .clickable{
    cursor: pointer;
  }

</style>
