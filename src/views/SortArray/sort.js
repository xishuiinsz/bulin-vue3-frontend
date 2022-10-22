// 自定义函数
function customeSort(arr) {
  let arrTemp = []
  function mySort(arr) {
    const arrNew = [...arr]
    for (let index = 0; index < arrNew.length; index++) {
      if (arrNew[index] > arrNew[index + 1]) {
        const temp = arrNew[index]
        arrNew[index] = arrNew[index + 1]
        arrNew[index + 1] = temp
      }
    }
    arrTemp = arrNew
  }

  for (let index = 0; index < arr.length - 1; index++) {
    arrTemp.length ? mySort(arrTemp) : mySort(arr)
  }

  return arrTemp
}

export default customeSort
