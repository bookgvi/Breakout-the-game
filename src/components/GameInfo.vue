<template>
  <v-text
    :config="{
      x: width - 500,
      y: 12,
      text: 'Текущий счёт: ' + score,
      fontFamily: 'Arial',
      fontSize: 25,
      fill: '#008800'
      }"
  />
</template>

<script>
export default {
  props: {
    score: Number,
    width: Number
  },
  data: () => ({
    config: {
      x: width - 100,
      y: 12,
      text: 'Текущий счёт: ', // + this.score,
      fontFamily: 'Arial',
      fontSize: 25,
      fill: '#008800'
    }
  })
}
</script>

<style scoped>

</style>
