/**
 * Enchanted glowing fireflies & golden luminous motes
 */
import { randomRange } from '../utils/helpers.js';
import { Device } from '../utils/device.js';

export class FirefliesEffect {
  constructor(ctx) {
    this.ctx = ctx;
    this.flies = [];
    this.mode = 'subtle';
    this.init();
  }

  init() {
    const mult = Device.getParticleMultiplier();
    const count = Math.floor(38 * mult);
    this.flies = [];
    for (let i = 0; i < count; i++) {
      this.flies.push({
        x: Math.random(),
        y: Math.random(),
        vx: randomRange(-0.00035, 0.00035),
        vy: randomRange(-0.00045, -0.0001),
        radius: randomRange(1.4, 3.4),
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: randomRange(0.02, 0.05)
      });
    }
  }

  burstOutward() {
    for (const f of this.flies) {
      const dx = f.x - 0.5;
      const dy = f.y - 0.55;
      const dist = Math.max(0.08, Math.hypot(dx, dy));
      f.vx = (dx / dist) * randomRange(0.002, 0.005);
      f.vy = (dy / dist) * randomRange(0.002, 0.005);
    }
  }

  render(width, height, pointer = { rawX: 0.5, rawY: 0.5 }, time = 0) {
    const ctx = this.ctx;
    ctx.save();
    for (const f of this.flies) {
      f.x += f.vx;
      f.y += f.vy;
      f.vx *= 0.992;
      f.vy = f.vy * 0.992 - 0.000004;

      // Gentle pointer attraction
      const dx = pointer.rawX - f.x;
      const dy = pointer.rawY - f.y;
      const d = Math.hypot(dx, dy);
      if (d < 0.22 && d > 0.01) {
        f.x += (dx / d) * 0.00035;
        f.y += (dy / d) * 0.00035;
      }

      if (f.y < -0.05) { f.y = 1.04; f.x = Math.random(); f.vy = randomRange(-0.00045, -0.00015); }
      if (f.y > 1.06) f.y = -0.04;
      if (f.x < -0.05) f.x = 1.04;
      if (f.x > 1.05) f.x = -0.04;

      const pulse = 0.35 + 0.65 * Math.sin(time * f.pulseSpeed + f.phase);
      const px = f.x * width;
      const py = f.y * height;

      const grad = ctx.createRadialGradient(px, py, 0, px, py, f.radius * 4.5);
      grad.addColorStop(0, `rgba(255, 244, 200, ${0.88 * pulse})`);
      grad.addColorStop(0.45, `rgba(232, 201, 135, ${0.42 * pulse})`);
      grad.addColorStop(1, 'rgba(232, 201, 135, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, f.radius * 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}
