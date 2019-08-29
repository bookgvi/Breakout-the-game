<template>
  <v-text
    :config="{
      x: width + 10,
      y: 20,
      text: `Текущий счёт: ${ game.score }
              \n Общее количество блоков: ${ game.startBreaksCount }
              \n Осталось: ${ game.endBreaksCount }`,
      fontFamily: 'Arial',
      fontSize: 25,
      fill: '#0095ee'
      }"
  />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    width: Number
  },
  computed: {
    ...mapGetters([
      'game'
    ])
  }
}
</script>

<style scoped>

</style>
