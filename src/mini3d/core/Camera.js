import { PerspectiveCamera } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
export class Camera {
  constructor({ sizes, scene, canvas }) {
    this.sizes = sizes
    this.scene = scene
    this.canvas = canvas
    this.setInstance()
    this.setControls()
  }
  setInstance() {
    let aspect = this.sizes.width / this.sizes.height
    this.instance = new PerspectiveCamera(45, aspect, 0.1, 2000)
    this.instance.position.set(10, 10, 10)

    this.scene.add(this.instance)
  }
  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
    this.controls.update()
  }
  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }
  update() {
    this.controls.update()
  }
  destroy() {
    this.controls.dispose()
  }
}
