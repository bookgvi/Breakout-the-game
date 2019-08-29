<template>
  <div id="app">
    <v-stage
      :config="stage"
    >
      <v-layer>
        <v-line :config="border" />
      </v-layer>
      <v-layer ref="main">
        <breaks
          v-for="(col, index) in breaks"
          :key="index"
          :col="col"
        />
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
import Breaks from '@/components/Breaks'
export default {
  data: () => ({
    anim: '',
    isAnimStart: false,
    ballAttr: {
      dx: 4,
      dy: 4
    },
    paddleAttr: {
      isPaddleMoveable: false,
      dx: 0
    }
  }),
  created () {
    this.drawBorder()
    this.initBreaks()
    // ---------------------------------------
    document.addEventListener('keypress', this.hPause)
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.anim = new Konva.Animation(this.mainCicle, this.$refs.main.getNode())
  },
  components: {
    Ball,
    Paddle,
    Breaks
  },
  computed: {
    ...mapGetters([
      'stage',
      'border',
      'ball',
      'paddle',
      'breaks',
      'breaksAttr'
    ])
  },
  methods: {
    ...mapActions([
      'drawBorder',
      'setBallPos',
      'setPaddlePos',
      'initBreaks',
      'breaksProjX',
      'breaksProjY',
      'setXreverse',
      'setYreverse'
    ]),
    mainCicle (frame) {
      let x = this.ball.config.x + this.ballAttr.dx
      let y = this.ball.config.y + this.ballAttr.dy
      this.setBallPos({ x, y })
      let px = this.paddle.config.x + this.paddleAttr.dx
      px = Math.max(px, this.stage.x + this.border.strokeWidth)
      px = Math.min(px, this.stage.width - this.stage.x - this.border.strokeWidth - this.paddle.config.width)
      this.setPaddlePos(px)
      this.isBallCollision()
      this.hasBallWithBreaksCollision()
    },
    isBallCollision () {
      let ball = this.ball.config
      let stage = this.stage
      let border = this.border
      let paddle = this.paddle.config
      if (ball.x + ball.radius >= stage.width + stage.x - border.strokeWidth || ball.x <= stage.x + ball.radius - border.strokeWidth) {
        this.ballAttr.dx = -this.ballAttr.dx
      } else if (ball.y - ball.radius <= stage.y || ball.y + ball.radius >= stage.y + stage.height - border.strokeWidth) {
        this.ballAttr.dy = -this.ballAttr.dy
      } else if (ball.y + ball.radius >= paddle.y && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width / 4) {
        this.ballAttr.dy = -this.ballAttr.dy
        this.ballAttr.dx = -Math.abs(this.ballAttr.dx)
      } else if (ball.y + ball.radius >= paddle.y && ball.x > paddle.x + paddle.width / 4 && ball.x <= paddle.x + paddle.width * 3 / 4) {
        this.ballAttr.dy = -this.ballAttr.dy
      } else if (ball.y + ball.radius >= paddle.y && ball.x > paddle.x + paddle.width * 3 / 4 && ball.x <= paddle.x + paddle.width) {
        this.ballAttr.dy = -this.ballAttr.dy
        this.ballAttr.dx = Math.abs(this.ballAttr.dx)
      }
    },
    hasBallWithBreaksCollision () {
      let ball = this.ball.config
      this.breaks.forEach((row, colIndex) => {
        row.forEach((item, rowIndex) => {
          let ballUpY = Math.min(ball.y + ball.radius, item.y)
          // ...
          let ballDownY = Math.max(ball.y - ball.radius, item.y + item.height)
          //  ...
          let ballLeftX = Math.min(ball.x + ball.radius, item.x)
          // ...
          let ballRightX = Math.max(ball.x - ball.radius, item.x + item.width)
          // ...
          if (ball.y + ball.radius >= item.y && ball.y + ball.radius < item.y + Math.abs(this.ballAttr.dy) &&
            ball.x + ball.radius >= item.x && ball.x - ball.radius <= item.x + item.width) {
            this.setBallPos({ x: ball.x, y: ballUpY - ball.radius })
            // ... Отскок вдоль оси Y сверху блока
            this.breaksCollisionY()
            console.log('item.y = ', item.y)
            console.log('Ball Y (Up) ', ballUpY)

          } else if (ball.y - ball.radius <= item.y + item.height && ball.y - ball.radius > item.y + item.height - Math.abs(this.ballAttr.dy) &&
            ball.x + ball.radius >= item.x && ball.x - ball.radius <= item.x + item.width) {
            this.setBallPos({ x: ball.x, y: ballDownY + ball.radius })
            // ... Отскок вдоль оси Y снизу блока
            this.breaksCollisionY()
            console.log('item.y = ', item.y)
            console.log('Ball Y (Down) ', ballDownY)

            console.log('Down ', ball.y)
          } else if (ball.x + ball.radius >= item.x && ball.x + ball.radius < item.x + Math.abs(this.ballAttr.dx) &&
            ball.y - ball.radius <= item.y + item.height && ball.y + ball.radius >= item.y) {
            this.setBallPos({ x: ballLeftX - ball.radius, y: ball.y })
            // ... Отскок вдоль оси Х слева блока
            this.breaksCollisionX()
            console.log('Left ', ball.x)
          } else if (ball.x - ball.radius <= item.x + item.width && ball.x - ball.radius > item.x + item.width - Math.abs(this.ballAttr.dx) &&
            ball.y - ball.radius <= item.y + item.height && ball.y + ball.radius >= item.y) {
            this.setBallPos({ x: ballRightX + ball.radius, y: ball.y })
            // ... Отскок вдоль оси Х справа блока
            this.breaksCollisionX()
            console.log('Right ', ball.x)
          }
        })
      })
    },
    breaksCollisionX () {
      this.ballAttr.dx = -this.ballAttr.dx
    },
    breaksCollisionY () {
      this.ballAttr.dy = -this.ballAttr.dy
    },
    hPause (e) {
      if (e.code === 'Space' && this.isAnimStart) {
        this.anim.stop()
        this.isAnimStart = false
        removeEventListener('keydown', this.hKeyDown)
        removeEventListener('keyup', this.hKeyUp)
      } else if (e.code === 'Space' && !this.isAnimStart) {
        this.anim.start()
        this.isAnimStart = true
        document.addEventListener('keydown', this.hKeyDown)
        document.addEventListener('keyup', this.hKeyUp)
      }
    },
    hKeyDown (e) {
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
