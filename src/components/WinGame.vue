<template>
  <v-text :config="{
        x,
        y,
        textAlign: 'center',
        verticalAlign: 'center',
        text: 'Победа!',
        fontFamily: 'Arial',
        fontSize: 55,
        fill: '#00008a',
        shadowColor: '#000000',
        shadowBlur: 10,
        shadowOpacity: 1,
        shadowOffset: [10, 10],
        opacity: gameWinOpacity
      }" />
</template>

<script>
  export default {
    props: {
      gameWinOpacity: Number
    },
    data: () => ({
      x: document.documentElement.clientWidth / 2 - 160,
      y: document.documentElement.clientHeight / 2 - 100,
    })
  }
</script>

<style scoped>

</style>
