const offsetX = 10
const offsetY = 10
export const state = {
  game: {
    score: 0,
    startBreaksCount: 0,
    endBreaksCount: 0,
    lowestY: 0
  },
  stage: {
    config: {
      x: 0,
      y: 0,
      width: document.documentElement.clientWidth - 2 * offsetX,
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
      fill: '#0095ee'
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
    width: 180,
    height: 20,
    offsetX: 35,
    offsetY: 30
  }
}
