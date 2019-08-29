const offsetY = 10
export const state = {
  game: {
    layersOpacity: 0,
    score: 0,
    startBreaksCount: 0,
    endBreaksCount: 0,
    lowestY: 0
  },
  stage: {
    config: {
      x: 0,
      y: 0,
      border: document.documentElement.clientWidth * 2 / 3,
      width: document.documentElement.clientWidth,
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
      width: 200,
      height: 20,
      fill: '#0095ee',
      shadowColor: '#000000',
      shadowOffset: [10, 10],
      shadowBlur: 5
    }
  },
  breaks: [],
  breaksAttr: {
    rows: 4,
    width: 75,
    height: 20,
    offsetX: 2,
    offsetY: 2
  }
}
