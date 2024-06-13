import { Box3, Vector3 } from "three"
/**
 * uuid
 * @param len 长度
 * @param radix 调整长度
 * @returns
 */
export function uuid(len = 10, radix = 62) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
  var uuid = [],
    i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    var r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-"
    uuid[14] = "4"

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join("")
}
/**
 * 获取网格的包围盒
 * @param {Object3D} group 网格对象
 * @returns
 */
export function getBoundBox(group) {
  // 计算实际宽高
  var size = new Vector3()

  // 包围盒计算模型对象的大小和位置
  var box3 = new Box3()
  box3.expandByObject(group) // 计算模型包围盒
  var boxSize = new Vector3()
  box3.getSize(boxSize) // 计算包围盒尺寸
  var center = new Vector3()
  box3.getCenter(center) // 计算一个层级模型对应包围盒的几何体中心坐标
  let obj = {
    box3,
    boxSize,
    center,
  }
  if (group.geometry) {
    group.geometry.computeBoundingBox()
    group.geometry.computeBoundingSphere()
    const { max, min } = group.geometry.boundingBox
    size.x = max.x - min.x
    size.y = max.y - min.y
    size.z = max.z - min.z
    obj.size = size
  }
  return obj
}
/**
 * 转换geoJson数据,将单个数组转为多维数组
 * @param {*} worldData geo数据
 * @returns
 */
export const transfromMapGeoJSON = (data) => {
  let worldData = JSON.parse(data)
  let features = worldData.features
  for (let i = 0; i < features.length; i++) {
    const element = features[i]
    if (element.geometry.type === "Polygon") {
      element.geometry.coordinates = [element.geometry.coordinates]
    }
  }
  return worldData
}
/**
 * 转换路网数据，跟世界数据保持一致的格式
 * @param {*} roadData
 * @returns
 */
export const transformGeoRoad = (roadData) => {
  let features = roadData.features
  for (let i = 0; i < features.length; i++) {
    const element = features[i]
    //LineString处理跟MultiLineString一样的数据结构
    if (element.geometry.type === "LineString") {
      element.geometry.coordinates = [[element.geometry.coordinates]]
    } else {
      element.geometry.coordinates = [element.geometry.coordinates]
    }
  }
  return roadData
}
// 克隆
export function deepClone(target, map = new Map()) {
  // target 不能为空，并且是一个对象
  if (target != null && isObject(target)) {
    // 在克隆数据前，进行判断是否克隆过,已克隆就返回克隆的值
    let cache = map.get(target)
    if (cache) {
      return cache
    }
    // 判断是否为数组
    const isArray = Array.isArray(target)
    let result = isArray ? [] : {}
    // 将新结果存入缓存中
    cache = map.set(target, result)
    // 如果是数组
    if (isArray) {
      // 循环数组，
      target.forEach((item, index) => {
        // 如果item是对象，再次递归
        result[index] = deepClone(item, cache)
      })
    } else {
      // 如果是对象
      Object.keys(target).forEach((key) => {
        if (isObject(result[key])) {
          result[key] = deepClone(target[key], cache)
        } else {
          result[key] = target[key]
        }
      })
    }
    return result
  } else {
    return target
  }
}
// 合并
export function deepMerge(target, source) {
  target = deepClone(target)
  for (let key in source) {
    if (key in target) {
      // 对象的处理
      if (isObject(source[key])) {
        if (!isObject(target[key])) {
          target[key] = source[key]
        } else {
          target[key] = deepMerge(target[key], source[key])
        }
      } else {
        target[key] = source[key]
      }
    } else {
      target[key] = source[key]
    }
  }
  return target
}
