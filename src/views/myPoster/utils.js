export const getShageDataById = (id, shageList) => {
  let option
  for (let index = 0; index < shageList.length; index++) {
    const element = shageList[index]
    if (element.attrs && element.attrs.id === id) {
      option = element
      break
    }
    if (element.children && element.children.length) {
      return getShageDataById(id, element.children)
    }
  }
  return option
}

export const getMaxId = (layerList, id = '1') => {
  let _id = id
  layerList.forEach((layer) => {
    if (layer.attrs.id > _id) {
      _id = layer.attrs.id
    }
    if (layer.children && layer.children.length) {
      getMaxId(layer.children, _id)
    }
  })
  return _id
}

export const downloadURI = (uri, name = Date.now()) => {
  const link = document.createElement('a')
  link.download = name
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
