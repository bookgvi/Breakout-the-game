<template>
  <v-text :config="{
        x,
        y,
        textAlign: 'center',
        verticalAlign: 'center',
        text: 'Game, как говорится, over...',
        fontFamily: 'Arial',
        fontSize: 55,
        fill: '#880000',
        shadowColor: '#000000',
        shadowBlur: 10,
        shadowOpacity: 1,
        shadowOffset: [10, 10],
        opacity: gameOverOpacity
      }" />
</template>

<script>
export default {
  props: {
    gameOverOpacity: Number
  },
  data: () => ({
    x: document.documentElement.clientWidth / 2 - 360,
    y: document.documentElement.clientHeight / 2 - 100
  })
}
</script>

<style scoped>

</style>
