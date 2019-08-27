<template>
  <v-rect
    :config="paddle.config"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created() {
    this.initPaddle()
  },
  computed: {
    ...mapGetters([
      'paddle'
    ])
  },
  methods: {
    ...mapActions([
      'initPaddle'
    ])
  }
}
</script>

<style scoped>

</style>
