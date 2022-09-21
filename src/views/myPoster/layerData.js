export default [
  {
    type: 'Image',
    attrs: {
      id: '3',
      x: 250,
      y: 250,
      image: null,
      width: 300,
      height: 400,
      draggable: true
    }
  },
  {
    type: 'Circle',
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
    type: 'Text',
    attrs: {
      id: '1',
      x: 20,
      y: 60,
      text: '你好，中国！',
      fontSize: 18,
      fontFamily:
        "'PingFang SC', 'Helvetica Neue', Helvetica, 'microsoft yahei', arial, STHeiTi, sans-serif",
      fill: '#fff',
      width: 200,
      align: 'center',
      draggable: true
    }
  },
  {
    type: 'Group',
    attrs: {
      id: '4',
      draggable: true
    },
    children: [
      {
        type: 'Circle',
        attrs: {
          id: '5',
          x: 150,
          y: 150,
          radius: 70,
          fill: 'pink',
          stroke: 'black',
          strokeWidth: 4,
          draggable: false
        }
      },
      {
        type: 'Text',
        attrs: {
          id: '6',
          x: 70,
          y: 150,
          text: '你好，我在组合里',
          fontSize: 18,
          fontFamily:
            "'PingFang SC', 'Helvetica Neue', Helvetica, 'microsoft yahei', arial, STHeiTi, sans-serif",
          fill: 'blue',
          width: 200,
          align: 'center',
          draggable: false
        }
      }
    ]
  }
]
