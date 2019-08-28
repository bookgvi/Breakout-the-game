import Vue from 'vue'
import * as types from './mutation-types'

export const mutations = {
  [types.DRAW_BORDER]: state => {
    Vue.set(state.border.config.points, '0', -state.stage.config.x + state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '1', state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '2', state.stage.config.width - state.stage.config.x - state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '3', state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '4', state.stage.config.width - state.stage.config.x - state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '5', state.stage.config.height - state.stage.config.y - state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '6', -state.stage.config.x + state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '7', state.stage.config.height - state.stage.config.y - state.border.config.strokeWidth)
  },
  [types.INIT_BALL]: state => {
    state.ball.config.x = state.stage.config.x + state.ball.config.radius + 10
    state.ball.config.y = state.stage.config.y + state.ball.config.radius + 120
  },
  [types.INIT_PADDLE]: state => {
    state.paddle.config.x = (state.stage.config.width - state.stage.config.x) / 2 - state.paddle.config.width / 2
    state.paddle.config.y = state.stage.config.height - state.stage.config.y - state.border.config.strokeWidth - state.paddle.config.height
  },
  [types.INIT_BREAKS]: state => {
    let columnsCount = Math.floor((state.stage.config.width - state.stage.config.x) / (state.breaksAttr.width + state.breaksAttr.offsetX))
    let rowsCount = 3
    let padding = ((state.stage.config.width - state.stage.config.x) - (columnsCount * (state.breaksAttr.width + state.breaksAttr.offsetX))) / 2
    for (let c = 0; c < columnsCount; c++) {
      Vue.set(state.breaks, c, [])
      for (let r = 0; r < rowsCount; r++) {
        Vue.set(state.breaks[c], r, {
          xP: false,
          yP: false,
          collisionDirectionChange: '',
          x: padding + (state.breaksAttr.offsetX + state.breaksAttr.width) * c,
          y: state.breaksAttr.offsetY + (state.breaksAttr.offsetY + state.breaksAttr.height) * r,
          width: state.breaksAttr.width,
          height: state.breaksAttr.height,
          fill: '#0093ee'
        })
      }
    }
  },
  [types.SET_BREAKS_PROJ]: (state, num) => {
    num[2] === 'xP' ? state.breaks[num[0]][num[1]].xP = num[3] : state.breaks[num[0]][num[1]].yP = num[3]
    state.breaks[num[0]][num[1]].collisionDirectionChange = num[4]
  },
  [types.SET_BALL_POS]: (state, pos) => {
    state.ball.config.x = pos.x
    state.ball.config.y = pos.y
  },
  [types.SET_PADDLE_POS]: (state, pos) => {
    state.paddle.config.x = pos
  }
}