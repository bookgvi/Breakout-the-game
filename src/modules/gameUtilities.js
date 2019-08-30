export const game = {
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
  finishGame (someOpacity) {
    document.removeEventListener('keypress', this.hPause)
    game.stopGame.call(this)
    let i = 0
    let initId = setInterval(() => {
      setTimeout(() => {
        this.setMainOpacity(Math.abs(i - 1))
        this[someOpacity] = i
        i += 0.05
        i = Math.min(1, i)
      }, 50)
      if (i >= 1) {
        clearInterval(initId)
      }
    }, 50)
  }
}
