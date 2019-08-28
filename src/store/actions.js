import * as types from './mutation-types'

export const actions = {
  drawBorder: ({ commit }) => commit(types.DRAW_BORDER),
  initBall: ({ commit }) => commit(types.INIT_BALL),
  initPaddle: ({ commit }) => commit(types.INIT_PADDLE),
  initBreaks: ({ commit }) => commit(types.INIT_BREAKS),

  setBallPos: ({ commit }, pos) => commit(types.SET_BALL_POS, pos),
  setPaddlePos: ({ commit }, pos) => commit(types.SET_PADDLE_POS, pos),
  setBreaksProj: ({ commit }, num) => commit(types.SET_BREAKS_PROJ, num)
}
