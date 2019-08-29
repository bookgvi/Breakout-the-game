const offsetX = 10
const offsetY = 10
export const state = {
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
      radius: 10,
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
    width: 80,
    height: 20,
    offsetX: 35,
    offsetY: 30,
    isStatus: true
  }
}
