import Vue from 'vue'
import * as types from './mutation-types'

export const mutations = {
  [types.DRAW_BORDER]: state => {
    Vue.set(state.border.config.points, '0', -state.stage.config.x + state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '1', state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '2', state.stage.config.border - state.stage.config.x - state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '3', state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '4', state.stage.config.border - state.stage.config.x - state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '5', state.stage.config.height - state.stage.config.y - state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '6', -state.stage.config.x + state.border.config.strokeWidth)
    Vue.set(state.border.config.points, '7', state.stage.config.height - state.stage.config.y - state.border.config.strokeWidth)
  },
  [types.INIT_BALL]: state => {
    state.ball.config.x = state.stage.config.x + state.ball.config.radius + 10
    state.ball.config.y = state.stage.config.y + state.ball.config.radius + state.breaksAttr.rows * (state.breaksAttr.height + state.breaksAttr.offsetY) + 50
  },
  [types.INIT_PADDLE]: state => {
    state.paddle.config.x = (state.stage.config.border - state.stage.config.x) / 2 - state.paddle.config.width / 2
    state.paddle.config.y = state.stage.config.height - state.stage.config.y - state.border.config.strokeWidth - state.paddle.config.height
  },
  [types.INIT_BREAKS]: state => {
    const columnsCount = Math.floor((state.stage.config.border + state.stage.config.x) / (state.breaksAttr.width + state.breaksAttr.offsetX))
    const rowsCount = state.breaksAttr.rows
    const paddingX = ((state.stage.config.border + state.stage.config.x) - (columnsCount * (state.breaksAttr.width + state.breaksAttr.offsetX))) / 2
    let paddingY = state.breaksAttr.offsetY
    let color = '#'
    let isInGame = true
    for (let c = 0; c < columnsCount; c++) {
      Vue.set(state.breaks, c, [])
      color = '#'
      for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 9)
      }
      for (let r = 0; r < rowsCount; r++) {
        // eslint-disable-next-line no-undef
        !r ? paddingY = state.breaksAttr.offsetY + 50 : ''
        Vue.set(state.breaks[c], r, {
          x: paddingX + (state.breaksAttr.offsetX + state.breaksAttr.width) * c,
          y: paddingY + (state.breaksAttr.offsetY + state.breaksAttr.height) * r,
          width: state.breaksAttr.width,
          height: state.breaksAttr.height,
          fill: color,
          isInGame: true
        })
        if ((!r && !c) || (r === rowsCount - 1 && c === columnsCount - 1)) {
          state.breaks[c][r].x = -20000
          state.breaks[c][r].y = -20000
          state.breaks[c][r].isInGame = false
        } else {
          state.game.startBreaksCount++
        }
      }
    }
  },
  [types.SET_BALL_POS]: (state, pos) => {
    state.ball.config.x = pos.x
    state.ball.config.y = pos.y
  },
  [types.SET_PADDLE_POS]: (state, x) => {
    state.paddle.config.x = x
  },
  [types.SET_BREAKS_POS]: (state, delta) => {
    state.breaks.forEach((row, colIndex) => {
      row.forEach((item, rowIndex) => {
        // eslint-disable-next-line no-unused-expressions
        item.isInGame ? item.y += delta : ''
        state.game.lowestY = Math.max(state.game.lowestY, item.y)
      })
    })
  },
  [types.SET_MAIN_OPACITY]: (state, value) => {
    state.game.layersOpacity = value
  },
  [types.BREAK_OUT]: (state, item) => {
    state.breaks[item[0]][item[1]].isInGame = false
    state.breaks[item[0]][item[1]].x = -20000
    state.breaks[item[0]][item[1]].y = -20000
    state.game.score++
    state.game.endBreaksCount = state.game.startBreaksCount - state.game.score
    // state.breaks[item[0]].splice(item[1], 1)
  }
}
