// 自定义函数
function getNodeById(id, treeOption) {
  let node
  if (treeOption.id === id) {
    node = treeOption
  } else {
    if (treeOption.children && treeOption.children.length) {
      ;(function temp(list) {
        list.forEach((item) => {
          if (item.id === id) {
            node = item
          }
          if (item.children && item.children.length) {
            temp(item.children)
          }
        })
      })(treeOption.children)
    }
  }
  return node
}

export default getNodeById
