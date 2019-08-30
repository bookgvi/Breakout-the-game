import store from '../store'

export const ballCollisions = {
  withBordersAndPaddle () {
    let ball = store.state.ball.config
    let stage = store.state.stage.config
    let border = store.state.border.config
    let paddle = store.state.paddle.config
    let ballXr = Math.min(ball.x + ball.radius, stage.x + stage.border)
    let ballXl = Math.max(ball.x - ball.radius, stage.x)
    let ballYup = Math.max(ball.y - ball.radius, stage.y)
    // ...................................... Отскок слева и справа от игрового поля
    if (ball.x + ball.radius >= stage.border + stage.x - border.strokeWidth) {
      store.dispatch('setBallPos', { x: ballXr - ball.radius, y: ball.y })
      this.ballAttr.dx = -this.ballAttr.dx
    } else if (ball.x <= stage.x + ball.radius - border.strokeWidth) {
      store.dispatch('setBallPos', { x: ballXl + ball.radius, y: ball.y })
      this.ballAttr.dx = -this.ballAttr.dx
    } else if (ball.y + ball.radius >= stage.y + stage.height - border.strokeWidth) { // - нет отскока снизу
      this.finishGame('gameOverOpacity')
      // .....................................................................................
    } else if (ball.y - ball.radius <= stage.y) {
      store.dispatch('setBallPos', { x: ball.x, y: ballYup + ball.radius })
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
  withBreaks () {
    let ball = store.state.ball.config
    store.state.breaks.forEach((row, colIndex) => {
      row.forEach((item, rowIndex) => {
        let ballUpY = Math.min(ball.y + ball.radius, item.y)
        // ...
        let ballDownY = Math.max(ball.y - ball.radius, item.y + item.height)
        //  ...
        let ballLeftX = Math.min(ball.x + ball.radius, item.x)
        // ...
        let ballRightX = Math.max(ball.x - ball.radius, item.x + item.width)
        // ...
        if (ball.y + ball.radius > item.y && ball.y + ball.radius < item.y + Math.abs(this.ballAttr.dy) &&
          ball.x + ball.radius >= item.x && ball.x - ball.radius <= item.x + item.width) {
          store.dispatch('setBallPos', { x: ball.x, y: ballUpY - ball.radius })
          // ... Отскок вдоль оси Y сверху блока
          this.breaksCollisionY([colIndex, rowIndex])
        } else if (ball.y - ball.radius < item.y + item.height && ball.y - ball.radius > item.y + item.height - Math.abs(this.ballAttr.dy) &&
          ball.x + ball.radius >= item.x && ball.x - ball.radius <= item.x + item.width) {
          store.dispatch('setBallPos', { x: ball.x, y: ballDownY + ball.radius })
          // ... Отскок вдоль оси Y снизу блока
          this.breaksCollisionY([colIndex, rowIndex])
        } else if (ball.x + ball.radius >= item.x && ball.x + ball.radius < item.x + Math.abs(this.ballAttr.dx) &&
          ball.y - ball.radius <= item.y + item.height && ball.y + ball.radius >= item.y) {
          store.dispatch('setBallPos', { x: ballLeftX - ball.radius, y: ball.y })
          // ... Отскок вдоль оси Х слева блока
          this.breaksCollisionX([colIndex, rowIndex])
        } else if (ball.x - ball.radius <= item.x + item.width && ball.x - ball.radius > item.x + item.width - Math.abs(this.ballAttr.dx) &&
          ball.y - ball.radius <= item.y + item.height && ball.y + ball.radius >= item.y) {
          store.dispatch('setBallPos', { x: ballRightX + ball.radius, y: ball.y })
          // ... Отскок вдоль оси Х справа блока
          this.breaksCollisionX([colIndex, rowIndex])
        }
      })
    })
  }
}
