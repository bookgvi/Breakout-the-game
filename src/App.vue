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
        <breaks
          v-for="(col, index) in breaks"
          :key="index"
          :col="col"
        />
        <ball/>
        <paddle/>
        <game-info
          :score="score"
          :width="stage.border"
        />
      </v-layer>
      <v-layer>
        <game-over :gameOverOpacity="gameOverOpacity" />
        <win-game :gameWinOpacity="gameWinOpacity" />
        <start-game :gameStartOpacity="gameStartOpacity" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Ball from '@/components/Ball'
import Paddle from '@/components/Paddle'
import Breaks from '@/components/Breaks'
import GameInfo from '@/components/GameInfo'
import GameOver from '@/components/GameOver'
import WinGame from '@/components/WinGame'
import StartGame from '@/components/StartGame'
import { ballCollisions } from '@/modules/BallCollisions'
import { game } from '@/modules/gameUtilities'
export default {
  data: () => ({
    anim: '',
    isAnimStart: false,
    gameOverOpacity: 0,
    gameWinOpacity: 0,
    gameStartOpacity: 1,
    ballAttr: {
      dx: 4,
      dy: 4
    },
    paddleAttr: {
      isPaddleMoveable: false,
      dx: 0
    },
    breaksAttrib: {
      dy: 0.1
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
    Breaks,
    GameInfo,
    GameOver,
    WinGame,
    StartGame
  },
  computed: {
    ...mapGetters([
      'game',
      'stage',
      'border',
      'ball',
      'paddle',
      'breaks',
      'breaksAttr'
    ]),
    score () {
      if (this.game.score === this.game.startBreaksCount) {
        document.removeEventListener('keypress', this.hPause)
        game.stopGame.call(this)
        console.log('Победа...')
        game.finishGame.call(this, 'gameWinOpacity')
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
      paddleX = Math.min(paddleX, this.stage.border - this.stage.x - this.border.strokeWidth - this.paddle.config.width)
      this.setBallPos({ x: ballX, y: ballY })
      this.hasBreaksPos(breaksY)
      this.setPaddlePos(paddleX)
      ballCollisions.withBordersAndPaddle.call(this)
      ballCollisions.withBreaks.call(this)
    },
    hasBreaksPos (delta) {
      if (this.game.lowestY >= this.paddle.config.y - this.paddle.config.height) {
        game.finishGame.call(this, 'gameOverOpacity')
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
    hPause (e) {
      if (e.code === 'Space' && this.isAnimStart) {
        game.stopGame.call(this)
      } else if (e.code === 'Space' && !this.isAnimStart) {
        if (this.gameStartOpacity) {
          let i = 0
          let initId = setInterval(() => {
            setTimeout(() => {
              this.setMainOpacity(i)
              this.gameStartOpacity = Math.abs(i - 1)
              i += 0.05
              i = Math.min(1, i)
            }, 5)
            if (i >= 1) {
              clearInterval(initId)
            }
          }, 50)
        }
        game.startGame.call(this)
      }
    },
    hKeyDown (e) {
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        this.paddleAttr.isPaddleMoveable = 'true'
        this.paddleAttr.dx = 8.5
      }
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        this.paddleAttr.isPaddleMoveable = 'true'
        this.paddleAttr.dx = -8.5
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
