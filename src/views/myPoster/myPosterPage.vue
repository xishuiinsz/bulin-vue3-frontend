<template>
  <div class="my-poster-container">
    <el-container>
      <el-aside class="poster-tool-list" width="200px">
      </el-aside>
      <el-main class="poster-work-bench">
        <div @mousedown.stop="workbenchMousedown" class="workbench">
          <layersComponent :layer-list="workbenchList" />
        </div>
        <div class="toolbar">
          <el-button @click="doGroup">组合</el-button>
          <el-button @click="deGroup">解除组合</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, provide, getCurrentInstance } from 'vue'
import { layerList } from './data'
import layersComponent from './layersComponent.vue';
const workbenchList = reactive(layerList)
import('./myPoster.scss')

const getWorkbench = () => {
  const workbench = document.querySelector('.workbench');
  if (workbench) {
    return workbench
  }
  return null;
}
const clearLayersActive = () => {
  workbenchList.length && workbenchList.forEach(layer => Object.assign(layer, { isActive: false }))
}

const workbenchMousedown = (e) => {
  e.stopPropagation();
  const workbench = getWorkbench()
  if (workbench) {
    if (workbench === e.target) {
      clearLayersActive();
      return;
    }
    const getWorkbenchChild = (element) => {
      if (Array.from(workbench.children).includes(element)) {
        return element
      } else {
        return getWorkbenchChild(element.parentElement)
      }
    }
    const layerItem = getWorkbenchChild(e.target)
    if (layerItem) {
      if (!e.ctrlKey) {
        clearLayersActive()
      }
      const { id } = layerItem.dataset
      const data = workbenchList.find(item => item.id === id)
      Object.assign(data, { isActive: !data.isActive })
      const mousemoveHandler = (e) => {
        const { movementX, movementY } = e
        data.left += movementX
        data.top += movementY
      }
      const mouseupHandler = (e) => {
        document.removeEventListener('mousemove', mousemoveHandler)
        document.removeEventListener('mouseup', mouseupHandler)
      }
      document.addEventListener('mousemove', mousemoveHandler)
      document.addEventListener('mouseup', mouseupHandler)
    }
  }
}

const doGroup = () => {
  const activeLayers = workbenchList.filter(item => item.isActive)
  if (activeLayers.length < 2) {
    return;
  }
  const minLeft = Math.min(...activeLayers.map(item => item.left))
  const minTop = Math.min(...activeLayers.map(item => item.top))
  const maxLeft = Math.max(...activeLayers.map(item => item.left + item.width))
  const maxTop = Math.max(...activeLayers.map(item => item.top + item.height))
  activeLayers.forEach(layer => {
    Object.assign(layer, { isActive: false })
  })
  const children = activeLayers.map(item => {
    const child = { ...item, left: item.left - minLeft, top: item.top - minTop };
    return child
  })
  const sorted = activeLayers.map(item => activeLayers.indexOf(item)).sort((a, b) => b - a)
  sorted.forEach(index => { workbenchList.splice(index, 1) })
  const newLayer = {
    id: '' + Date.now(),
    type: 'group',
    isActive: true,
    left: minLeft,
    top: minTop,
    width: maxLeft - minLeft,
    height: maxTop - minTop,
    children
  }
  workbenchList.push(newLayer)
}
const deGroup = () => {
  const activeLayers = workbenchList.filter(item => item.isActive)
  if (activeLayers.length === 1 && activeLayers[0].type === 'group') {
    const { left, top, children } = activeLayers[0]
    const newLayers = children.map(item => {
      const _item = { ...item, left: item.left + left, top: item.top + top }
      return _item
    })
    const index = workbenchList.findIndex(item => item.isActive)
    workbenchList.splice(index, 1)
    newLayers.forEach(layer => {
      const _layer = Object.assign(layer, { isActive: true, })
      workbenchList.push(_layer)
    })
  }
}
</script>
<script>
export default {
  name: 'MyPosterPage'
}
</script>
