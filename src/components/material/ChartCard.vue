<template>
  <MaterialCard>
    <Chart
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

export default {
  inheritAttrs: false,
  components : {MaterialCard},
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
