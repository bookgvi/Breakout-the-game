<template>
  <div id="app">
    <v-stage
      :config="stage"
    >
      <v-layer
        ref="main"
        :config="{ opacity: game.layersOpacity }"
      >
        <v-line :config="border" />
        <v-text
          :config="{ x: 12, y: 12, text: 'Текущий счёт: ' + score, fontFamily: 'Arial', fontSize: 25, fill: '#008800' }"
        />
        <breaks
          v-for="(col, index) in breaks"
          :key="index"
          :col="col"
        />
        <ball/>
        <paddle/>
      </v-layer>
      <v-layer
        :config="{
        opacity: Math.abs(game.layersOpacity - 1)
        }"
      >
        <v-text :config="gameOver" />
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
    },
    breaksAttrib: {
      dy: 0.15
    }
  }),
  created () {
    this.drawBorder()
    this.initBreaks()
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.anim = new Konva.Animation(this.mainCicle, this.$refs.main.getNode())
    // ---------------------------------------
    document.addEventListener('keypress', this.hPause)
  },
  components: {
    Ball,
    Paddle,
    Breaks
  },
  computed: {
    ...mapGetters([
      'game',
      'stage',
      'border',
      'ball',
      'paddle',
      'breaks',
      'breaksAttr',
      'gameOver'
    ]),
    score () {
      if (this.game.score === this.game.startBreaksCount) {
        document.removeEventListener('keypress', this.hPause)
        this.stopGame()
        console.log('Победа...')
      }
      return this.game.score
    }
  },
  methods: {
    ...mapActions([
      'drawBorder',
      'setBallPos',
      'setPaddlePos',
      'initBreaks',
      'setBreaksPos',
      'breakOut',
      'setMainOpacity'
    ]),
    mainCicle (frame) {
      let breaksY = this.breaksAttrib.dy
      let ballX = this.ball.config.x + this.ballAttr.dx
      let ballY = this.ball.config.y + this.ballAttr.dy
      let paddleX = this.paddle.config.x + this.paddleAttr.dx
      paddleX = Math.max(paddleX, this.stage.x + this.border.strokeWidth)
      paddleX = Math.min(paddleX, this.stage.width - this.stage.x - this.border.strokeWidth - this.paddle.config.width)
      this.setBallPos({ x: ballX, y: ballY })
      this.hasBreaksPos(breaksY)
      this.setPaddlePos(paddleX)
      this.isBallCollision()
      this.hasBallWithBreaksCollision()
    },
    isBallCollision () {
      let ball = this.ball.config
      let stage = this.stage
      let border = this.border
      let paddle = this.paddle.config
      // ...................................... Отскок слева и справа от игрового поля
      if (ball.x + ball.radius >= stage.width + stage.x - border.strokeWidth || ball.x <= stage.x + ball.radius - border.strokeWidth) {
        this.ballAttr.dx = -this.ballAttr.dx
      } else if (ball.y + ball.radius >= stage.y + stage.height - border.strokeWidth) { // - нет отскока снизу
        this.gameOverM()
        // .....................................................................................
      } else if (ball.y - ball.radius <= stage.y) {
        this.ballAttr.dy = -this.ballAttr.dy
      } else if (ball.y + ball.radius >= paddle.y && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width / 4) {
        this.ballAttr.dy = -this.ballAttr.dy
        this.ballAttr.dx = -Math.abs(this.ballAttr.dx - 2)
      } else if (ball.y + ball.radius >= paddle.y && ball.x > paddle.x + paddle.width / 4 && ball.x <= paddle.x + paddle.width * 3 / 4) {
        this.ballAttr.dy = -this.ballAttr.dy
      } else if (ball.y + ball.radius >= paddle.y && ball.x > paddle.x + paddle.width * 3 / 4 && ball.x <= paddle.x + paddle.width) {
        this.ballAttr.dy = -this.ballAttr.dy
        this.ballAttr.dx = Math.abs(this.ballAttr.dx + 2)
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
            this.breaksCollisionY([colIndex, rowIndex])
          } else if (ball.y - ball.radius <= item.y + item.height && ball.y - ball.radius > item.y + item.height - Math.abs(this.ballAttr.dy) &&
            ball.x + ball.radius >= item.x && ball.x - ball.radius <= item.x + item.width) {
            this.setBallPos({ x: ball.x, y: ballDownY + ball.radius })
            // ... Отскок вдоль оси Y снизу блока
            this.breaksCollisionY([colIndex, rowIndex])
          } else if (ball.x + ball.radius >= item.x && ball.x + ball.radius < item.x + Math.abs(this.ballAttr.dx) &&
            ball.y - ball.radius <= item.y + item.height && ball.y + ball.radius >= item.y) {
            this.setBallPos({ x: ballLeftX - ball.radius, y: ball.y })
            // ... Отскок вдоль оси Х слева блока
            this.breaksCollisionX([colIndex, rowIndex])
          } else if (ball.x - ball.radius <= item.x + item.width && ball.x - ball.radius > item.x + item.width - Math.abs(this.ballAttr.dx) &&
            ball.y - ball.radius <= item.y + item.height && ball.y + ball.radius >= item.y) {
            this.setBallPos({ x: ballRightX + ball.radius, y: ball.y })
            // ... Отскок вдоль оси Х справа блока
            this.breaksCollisionX([colIndex, rowIndex])
          }
        })
      })
    },
    hasBreaksPos (delta) {
      if (this.game.lowestY >= this.paddle.config.y) {
        this.gameOverM()
      }
      this.setBreaksPos(delta)
    },
    breaksCollisionX (item) {
      this.breakOut(item)
      this.ballAttr.dx = -this.ballAttr.dx
    },
    breaksCollisionY (item) {
      this.breakOut(item)
      this.ballAttr.dy = -this.ballAttr.dy
    },
    stopGame () {
      this.anim.stop()
      this.isAnimStart = false
      removeEventListener('keydown', this.hKeyDown)
      removeEventListener('keyup', this.hKeyUp)
    },
    startGame () {
      this.anim.start()
      this.isAnimStart = true
      document.addEventListener('keydown', this.hKeyDown)
      document.addEventListener('keyup', this.hKeyUp)
    },
    gameOverM () {
      document.removeEventListener('keypress', this.hPause)
      this.stopGame()
      let i = 1
      let initId = setInterval(() => {
        setTimeout(() => {
          this.setMainOpacity(i)
          i -= 0.005
          i = Math.max(0, i)
        }, 50)
        if (i <= 0) {
          clearInterval(initId)
        }
      })
      console.log('Неудача')
    },
    hPause (e) {
      if (e.code === 'Space' && this.isAnimStart) {
        this.stopGame()
      } else if (e.code === 'Space' && !this.isAnimStart) {
        this.startGame()
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
