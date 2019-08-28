<template>
  <div class="">
    <v-rect
      v-for="(row, index) in col"
      :key="index"
      :config="col[index]"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    col: Array
  },
  computed: {
    ...mapGetters([
      'breaksAttr'
    ])
  }
}
</script>

<style scoped>

</style>
