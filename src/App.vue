<template>
  <VApp>
    <LayoutHeader></LayoutHeader>
    <LayoutSideMenu></LayoutSideMenu>
    <LayoutContainer></LayoutContainer>
    <LayoutFooter></LayoutFooter>
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

  }
}
</script>
