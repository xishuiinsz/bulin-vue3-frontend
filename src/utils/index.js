// 手写防抖函数
const myDebounced = (fun, wait = 300) => {
  if (typeof fun !== 'function') {
    throw new TypeError('第1个入参请传入函数！')
  }
  if (isNaN(wait)) {
    throw new TypeError('第2个入参请传入数值！')
  }
  let timer
  return (...args) => {
    timer && clearTimeout(timer)
    timer = setTimeout(fun, wait, ...args)
  }
}

const getRangeInteger = (min, max) => {
  if (min > max) {
    [min, max] = [max, min] // 交换
  }
  min = Math.floor(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { myDebounced, getRangeInteger }
