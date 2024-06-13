<template>
  <div class="map-china">
    <canvas id="canvas"></canvas>
    <div class="map-btn-group">
      <div
        class="btn"
        :class="{ active: state.bar }"
        @click="setEffectToggle('bar')"
      >
        柱状图
      </div>
      <div
        class="btn"
        :class="{ active: state.flyLine }"
        @click="setEffectToggle('flyLine')"
      >
        飞线
      </div>
      <div
        class="btn"
        :class="{ active: state.scatter }"
        @click="setEffectToggle('scatter')"
      >
        散点图
      </div>
      <div
        class="btn"
        :class="{ active: state.card }"
        @click="setEffectToggle('card')"
      >
        标牌
      </div>
      <div
        class="btn"
        :class="{ active: state.particle }"
        @click="setEffectToggle('particle')"
      >
        粒子特效
      </div>
      <div
        class="btn"
        :class="{ active: state.path }"
        @click="setEffectToggle('path')"
      >
        路径轨迹
      </div>
      <div
        class="btn"
        :class="{ active: state.mirror }"
        @click="setEffectToggle('mirror')"
      >
        倒影
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive } from "vue";
import { World } from "./map";
let app = null;
const state = reactive({
  bar: true, // 柱状图
  flyLine: false, // 飞线
  scatter: false, // 散点图
  card: false, // 标牌
  particle: false, // 粒子
  mirror: false, // 倒影
  path: false, // 路径轨迹
});
const setEffectToggle = (type) => {
  // 设置按钮状态
  state[type] = !state[type];
  if (type === "bar") {
    app.barGroup.visible = state[type];
    app.labelGroup.visible = state[type];
    app.labelGroup.children.map((label) => {
      state[type] ? label.show() : label.hide();
    });
  }
  if (type === "particle") {
    app.particles.enable = state[type];
    app.particles.instance.visible = state[type];
  }
  if (type === "flyLine") {
    app.flyLineGroup.visible = state[type];
    app.flyLineFocusGroup.visible = state[type];
  }
  if (type === "scatter") {
    app.scatterGroup.visible = state[type];
  }
  if (type === "card") {
    app.badgeGroup.visible = state[type];
    app.badgeGroup.children.map((label) => {
      state[type] ? label.show() : label.hide();
    });
  }
  if (type === "mirror") {
    app.groundMirror.visible = state[type];
  }
  if (type === "path") {
    app.pathLineGroup.visible = state[type];
  }
};
onMounted(() => {
  app = new World(document.getElementById("canvas"), {
    geoProjectionCenter: [108.55, 34.32],
  });
});
onBeforeUnmount(() => {
  app && app.destroy();
});
</script>

<style lang="scss">
.badges-label {
  &-outline {
    position: absolute;
  }
  &-wrap {
    position: relative;
    padding: 10px 10px;
    background: #0e1937;
    border: 1px solid #1e7491;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
    // margin-bottom: 50px;
    bottom: 50px;
    span {
      color: #ffe70b;
    }
    &:after {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 10px;
      height: 10px;
      display: block;
      content: "";
      border-right: 2px solid #6cfffe;
      border-bottom: 2px solid #6cfffe;
    }
    &:before {
      position: absolute;
      left: 0;
      top: 0;
      width: 10px;
      height: 10px;
      display: block;
      content: "";
      border-left: 2px solid #6cfffe;
      border-top: 2px solid #6cfffe;
    }
    .icon {
      position: absolute;
      width: 27px;
      height: 20px;
      left: 50%;
      transform: translateX(-13px);
      bottom: -40px;
    }
  }
}
.map-btn-group {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  .btn {
    padding: 5px 12px;
    color: #fff;
    border: 1px solid #2bc4dc;
    margin-bottom: 10px;
    font-size: 12px;
    text-align: center;
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.3s;
    &.active {
      opacity: 1;
    }
  }
}
.provinces-name-label {
  &-wrap {
    color: #5fc6dc;
    opacity: 0;
    text-shadow: 1px 1px 0px #000;
  }
}
.provinces-label-style02 {
  &-wrap {
    transform: translate(0%, 200%);
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 40px;
  }
  .number {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    /* .unit {
      color: #fff;
      font-size: 12px;
      font-weight: 400;
      opacity: 0.5;
      padding-left: 5px;
    } */
  }

  .no {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7efbf6;
    /* text-shadow: 0px 0px 4px 0px #7efbf6; */
    text-shadow: 0 0 5px #7efbf6;
    font-size: 16px;
    /* font-weight: 700; */
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  .yellow {
    .no {
      color: #fef99e !important;
      text-shadow: 0 0 5px #fef99e !important;
    }
  }
}
.map-china {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#canvas {
  width: 100%;
  height: 100%;
  background: #000;
}
</style>
