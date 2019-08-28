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
      width: 120,
      height: 20,
      fill: '#0095ee'
    }
  },
  breaks: [],
  breaksAttr: {
    width: 90,
    height: 20,
    offsetX: 15,
    offsetY: 15,
    isStatus: true
  }
}
