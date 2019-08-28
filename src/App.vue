<template>
  <div id="app">
    <v-stage
      :config="stage"
    >
      <v-layer>
        <v-line :config="border" />
      </v-layer>
      <v-layer ref="main">
        <ball/>
        <paddle/>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Ball from '@/components/Ball'
import Paddle from '@/components/Paddle'
export default {
  data: () => ({
    anim: '',
    isAnimStart: false,
    ballAttr: {
      dx: 3,
      dy: 3
    },
    paddleAttr: {
      isPaddleMoveable: false,
      dx: 0
    }
  }),
  created () {
    this.drawBorder()
    // ---------------------------------------
    document.addEventListener('keydown', this.hKeyDown)
    document.addEventListener('keyup', this.hKeyUp)
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.anim = new Konva.Animation(this.mainCicle, this.$refs.main.getNode())
  },
  components: {
    Ball,
    Paddle
  },
  computed: {
    ...mapGetters([
      'stage',
      'border',
      'ball',
      'paddle'
    ])
  },
  methods: {
    ...mapActions([
      'drawBorder',
      'setBallPos',
      'setPaddlePos'
    ]),
    mainCicle () {
      let x = this.ball.config.x + this.ballAttr.dx
      let y = this.ball.config.y + this.ballAttr.dy
      this.setBallPos({ x, y })
      this.isBallCollision()
      let px = this.paddle.config.x + this.paddleAttr.dx
      px = Math.max(px, this.stage.x + this.border.strokeWidth)
      px = Math.min(px, this.stage.width - this.stage.x - this.border.strokeWidth - this.paddle.config.width)
      this.setPaddlePos(px)
    },
    isBallCollision () {
      let ball = this.ball.config
      let stage = this.stage
      let border = this.border
      let paddle = this.paddle.config
      if ((ball.x + ball.radius) >= (stage.width - stage.x - border.strokeWidth) || ball.x <= stage.x + ball.radius) {
        this.ballAttr.dx = -this.ballAttr.dx
      }
      if (ball.y <= stage.y + ball.radius) {
        this.ballAttr.dy = -this.ballAttr.dy
      }
      if (ball.y + ball.radius >= paddle.y) {
        if (ball.x >= paddle.x || ball.x <= paddle.width - paddle.x) {
          this.ballAttr.dy = -this.ballAttr.dy
        }
      }
    },
    hKeyDown (e) {
      if (e.code === 'Space' && this.isAnimStart) {
        this.anim.stop()
        this.isAnimStart = false
      }
      if (e.code === 'Space' && !this.isAnimStart) {
        this.anim.start()
        this.isAnimStart = true
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        this.paddleAttr.isPaddleMoveable = 'true'
        this.paddleAttr.dx = 7
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        this.paddleAttr.isPaddleMoveable = 'true'
        this.paddleAttr.dx = -7
      }
    },
    hKeyUp (e) {
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        this.paddleAttr.isPaddleMoveable = 'false'
        this.paddleAttr.dx = 0
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        this.paddleAttr.isPaddleMoveable = 'false'
        this.paddleAttr.dx = 0
      }
    }
  }
}
</script>

<style>
</style>
