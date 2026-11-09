/**
 * Smooth pointer & gyroscope parallax controller
 */
import { lerp } from '../utils/helpers.js';
import { Device } from '../utils/device.js';

export class ParallaxController {
  constructor() {
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.rawX = 0.5;
    this.rawY = 0.5;
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('pointermove', (e) => {
      this.rawX = e.clientX / Math.max(1, window.innerWidth);
      this.rawY = e.clientY / Math.max(1, window.innerHeight);
      this.targetX = (this.rawX - 0.5) * 2;
      this.targetY = (this.rawY - 0.5) * 2;
    }, { passive: true });
  }

  update() {
    if (Device.prefersReducedMotion()) {
      this.currentX = 0;
      this.currentY = 0;
      return;
    }
    this.currentX = lerp(this.currentX, this.targetX, 0.06);
    this.currentY = lerp(this.currentY, this.targetY, 0.06);

    const activeBackdrop = document.querySelector('.scene.is-active .scene-backdrop');
    if (activeBackdrop) {
      const tx = -this.currentX * 14;
      const ty = -this.currentY * 10;
      activeBackdrop.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(1.04)`;
    }
  }
}
