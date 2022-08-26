export default [
  {
    type: 'text',
    attrs: {
      id: '1',
      x: 20,
      y: 60,
      text: '你好，中国！',
      fontSize: 18,
      fontFamily:
        "'PingFang SC', 'Helvetica Neue', Helvetica, 'microsoft yahei', arial, STHeiTi, sans-serif",
      fill: '#555',
      width: 300,
      padding: 20,
      align: 'center',
      draggable: true
    }
  },
  {
    type: 'circle',
    attrs: {
      id: '2',
      x: 150,
      y: 150,
      radius: 70,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    }
  },
  {
    type: 'image',
    attrs: {
      id: '3',
      x: 250,
      y: 250,
      image: null,
      width: 300,
      height: 400,
      draggable: true
    }
  }
]
