/**
 * Multi-depth twinkling starfield layer for Scene 01 & Scene 05
 */
import { randomRange } from '../utils/helpers.js';
import { Device } from '../utils/device.js';

export class StarfieldEffect {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.shootingStar = null;
    this.intensity = 1.0;
    this.init();
  }

  init() {
    const mult = Device.getParticleMultiplier();
    const count = Math.floor(145 * mult);
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random() * 0.88,
        radius: randomRange(0.5, 2.1),
        depth: randomRange(0.2, 1.0),
        alpha: randomRange(0.25, 0.95),
        twinkleSpeed: randomRange(0.008, 0.028),
        phase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.78 ? '#FFF0C2' : (Math.random() > 0.5 ? '#E2E9FF' : '#F6E8FF')
      });
    }
  }

  setIntensity(val) {
    this.intensity = val;
  }

  render(width, height, pointerOffset = { x: 0, y: 0 }, time = 0) {
    if (this.intensity <= 0.02) return;
    const ctx = this.ctx;
    ctx.save();
    for (const s of this.stars) {
      const px = (s.x * width) + (pointerOffset.x * 18 * s.depth);
      const py = (s.y * height) + (pointerOffset.y * 12 * s.depth);
      const twinkle = 0.62 + 0.38 * Math.sin(time * s.twinkleSpeed + s.phase);
      const alpha = s.alpha * twinkle * this.intensity;

      ctx.beginPath();
      ctx.fillStyle = s.hue;
      ctx.globalAlpha = alpha;
      ctx.arc((px + width) % width, (py + height) % height, s.radius, 0, Math.PI * 2);
      ctx.fill();

      if (s.radius > 1.55 && alpha > 0.6) {
        ctx.beginPath();
        ctx.arc((px + width) % width, (py + height) % height, s.radius * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = s.hue;
        ctx.globalAlpha = alpha * 0.16;
        ctx.fill();
      }
    }
    ctx.restore();
  }
}
