// 自定义函数
function customeSort(arr) {
  const arrTemp = []
  const arrNew = [...arr]
  function mySort(arr) {
    if (arr.length === 1) {
      const [num] = arr
      arrTemp.unshift(num)
    } else {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index] > arr[index + 1]) {
          const temp = arr[index]
          arr[index] = arr[index + 1]
          arr[index + 1] = temp
        }
      }
      const el = arr.pop()
      arrTemp.unshift(el)
      mySort(arr)
    }
  }
  mySort(arrNew)
  return arrTemp
}

export default customeSort
