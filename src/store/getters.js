export const getters = {
  game: state => state.game,
  stage: state => state.stage.config,
  border: state => state.border.config,
  ball: state => state.ball,
  paddle: state => state.paddle,
  breaks: state => state.breaks,
  breaksAttr: state => state.breaksAttr
}
