const offsetX = 0
const offsetY = 10
export const state = {
  game: {
    layersOpacity: 1,
    score: 0,
    startBreaksCount: 0,
    endBreaksCount: 0,
    lowestY: 0
  },
  stage: {
    config: {
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth,
      widt: document.documentElement.clientWidth * 2 / 3 - 2 * offsetX,
      height: document.documentElement.clientHeight - 2 * offsetY
    }
  },
  border: {
    config: {
      points: [],
      stroke: '#0095ee',
      strokeWidth: 2,
      fill: '#eeeeee',
      closed: true
    }
  },
  ball: {
    config: {
      x: 0,
      y: 0,
      radius: 5,
      fill: '#000000'
    }
  },
  paddle: {
    config: {
      x: 0,
      y: 0,
      width: 220,
      height: 20,
      fill: '#0095ee'
    }
  },
  breaks: [],
  breaksAttr: {
    rows: 3,
    width: 80,
    height: 20,
    offsetX: 1,
    offsetY: 1
  },
  gameOver: {
    config: {
      x: document.documentElement.clientWidth / 2 - 360,
      y: document.documentElement.clientHeight / 2 - 100,
      textAlign: 'center',
      verticalAlign: 'center',
      opacity: 1,
      text: 'Game, как говорится, over...',
      fontFamily: 'Arial',
      fontSize: 55,
      fill: '#880000',
      shadowColor: '#000000',
      shadowBlur: 10,
      shadowOpacity: 1,
      shadowOffset: [10, 10]
    }
  }
}
