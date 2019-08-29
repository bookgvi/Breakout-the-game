<template>
  <v-text :config="{
        x,
        y,
        textAlign: 'center',
        verticalAlign: 'center',
        text: `  Управление - кнопками со стрелками, или кнопками \'A\' и \'D\',

                      нажмите 'SPACE' чтобы начать игру !`,
        fontFamily: 'Arial',
        fontSize: 55,
        fill: '#00008a',
        shadowColor: '#000000',
        shadowBlur: 10,
        shadowOpacity: 1,
        shadowOffset: [10, 10],
        opacity: gameStartOpacity
      }" />
</template>

<script>
export default {
  props: {
    gameStartOpacity: Number
  },
  data: () => ({
    x: 0,
    y: document.documentElement.clientHeight / 2 - 100,
  })
}
</script>

<style scoped>

</style>
