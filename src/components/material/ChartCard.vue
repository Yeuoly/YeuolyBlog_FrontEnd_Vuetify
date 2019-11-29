<template>
  <MaterialCard>
    <ECharts
      slot="header"
      theme="card"
      :auto-resize="true"
      :options="options"
      style="width:100%; max-height:200px"
    />
    <slot />

    <slot
      slot="actions"
      name="actions"
    />
  </MaterialCard>
</template>

<script>

  import MaterialCard from './Card'
  import ECharts from "vue-echarts";

export default {
    name : 'DashBoardChart',
  inheritAttrs: false,
  components : {ECharts, MaterialCard},
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
