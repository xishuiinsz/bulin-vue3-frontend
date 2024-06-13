import {
  PointsMaterial,
  AdditiveBlending,
  BufferGeometry,
  BufferAttribute,
  Points,
  CanvasTexture,
} from "three";
/**
 * 网格地面
 */
export class Particles {
  /**
   *
   * @param {*} base this
   * @param {*} config
   */
  constructor({ time }, config = {}) {
    this.instance = null;
    this.time = time;
    this.enable = true;
    this.config = Object.assign(
      {
        num: 100, // 粒子数量
        range: 500, // 范围
        speed: 0.01,
        renderOrder: 99,
        dir: "up", // up-上  down-下
        material: new PointsMaterial({
          map: Particles.createTexture(),
          size: 20,
          color: 0xffffff,
          transparent: true,
          opacity: 1.0,
          depthTest: false,
          vertexColors: true,
          blending: AdditiveBlending,
          sizeAttenuation: true, // 指定点的大小是否因相机深度而衰减
        }),
      },
      config
    );

    this.create();
  }
  create() {
    const { range, speed, dir, material, num, renderOrder } = this.config;
    const position = []; // 位置
    const colors = []; // 颜色
    const velocities = []; // 速度
    for (let i = 0; i < num; i++) {
      // 生成粒子的随机初始位置
      position.push(
        Math.random() * range - range / 2,
        Math.random() * range - range / 2,
        Math.random() * range - range / 2
      );
      // 方向
      let dirVec = dir === "up" ? 1 : -1;
      // 插入速度
      velocities.push(
        Math.random() * dirVec,
        (0.1 + Math.random()) * dirVec,
        0.1 + Math.random() * dirVec
      );
      // 改变图片颜色随机亮度
      const color = material.color.clone();
      let hsl = {};
      color.getHSL(hsl);
      color.setHSL(hsl.h, hsl.s, hsl.l * Math.random());
      colors.push(color.r, color.g, color.b);
    }
    const geometry = new BufferGeometry();
    // 设置属性
    geometry.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(position), 3)
    );
    geometry.setAttribute(
      "velocities",
      new BufferAttribute(new Float32Array(velocities), 3)
    );
    geometry.setAttribute(
      "color",
      new BufferAttribute(new Float32Array(colors), 3)
    );

    this.instance = new Points(geometry, material);
    this.instance.renderOrder = renderOrder;
  }
  static createTexture() {
    let canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    let context = canvas.getContext("2d");
    let gradient = context.createRadialGradient(512, 512, 0, 512, 512, 512);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1024, 1024);
    const texture = new CanvasTexture(canvas);
    return texture;
  }
  update(delta, elapsedTime) {
    if (!this.instance) return false;
    const { range, speed, dir } = this.config;
    // 方向
    let dirVec = dir === "up" ? 1 : -1;
    let position = this.instance.geometry.getAttribute("position");
    let velocities = this.instance.geometry.getAttribute("velocities");
    const count = position.count;
    for (let i = 0; i < count; i++) {
      // 获取点得位置和速度
      let pos_x = position.getX(i);
      let pos_y = position.getY(i);
      let pos_z = position.getZ(i);
      // 获取速度
      let vel_x = velocities.getX(i);
      let vel_y = velocities.getY(i);
      let vel_z = velocities.getZ(i);
      // 位置移动：沿着xy左右摆动
      pos_x += Math.sin(vel_x * elapsedTime) * delta;
      // pos_y += Math.sin(vel_y * elapsedTime) * delta;
      pos_z += speed * dirVec; // 沿着z轴移动
      // 如果粒子超过边界，将其位置调整到底部
      if (pos_z > range / 2 && dirVec === 1) {
        pos_z = -range / 2;
      }
      if (pos_z < -range / 2 && dirVec == -1) {
        pos_z = range / 2;
      }
      position.setX(i, pos_x);
      // position.setY(i, pos_y);
      position.setZ(i, pos_z);
      // 设置速度值
      velocities.setX(i, vel_x);
      velocities.setY(i, vel_y);
    }
    // 更新位置和速度
    position.needsUpdate = true;
    velocities.needsUpdate = true;
  }
  // 设置父级，并运行
  setParent(parent) {
    parent.add(this.instance);
    this.time.on("tick", (delta, elapsedTime) => {
      if (this.enable) {
        this.update(delta, elapsedTime);
      }
    });
  }
}
