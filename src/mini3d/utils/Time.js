import { EventEmitter } from "./EventEmitter"
import * as THREE from "three"
export class Time extends EventEmitter {
  constructor() {
    super()

    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.clock = new THREE.Clock()
    this.timer = window.requestAnimationFrame(() => {
      this.tick()
    })
  }
  tick() {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start
    const delta = this.clock.getDelta()
    const elapsedTime = this.clock.getElapsedTime()
    this.emit("tick", delta, elapsedTime)
    if (this.stop) {
      window.cancelAnimationFrame(this.timer)
      return false
    }
    this.timer = window.requestAnimationFrame(() => {
      this.tick()
    })
  }
  destroy() {
    this.stop = true
    this.off("tick")
  }
}
