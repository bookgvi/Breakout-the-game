<template>
  <v-circle
    :config="ball.config"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created() {
    this.initBall()
  },
  computed: {
    ...mapGetters([
      'ball'
    ])
  },
  methods: {
    ...mapActions([
      'initBall'
    ])
  }
}
</script>

<style scoped>

</style>
