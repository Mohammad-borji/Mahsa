/**
 * Enchanted Golden Fireflies + Interactive Cursor Stardust Trail
 */
import { randomRange } from '../utils/helpers.js';
import { Device } from '../utils/device.js';

export class FirefliesEffect {
  constructor(ctx) {
    this.ctx = ctx;
    this.flies = [];
    this.trail = [];
    this.lastRawX = 0.5;
    this.lastRawY = 0.5;
    this.init();
  }

  init() {
    const mult = Device.getParticleMultiplier();
    const count = Math.floor(42 * mult);
    this.flies = [];
    for (let i = 0; i < count; i++) {
      this.flies.push({
        x: Math.random(),
        y: Math.random(),
        vx: randomRange(-0.00038, 0.00038),
        vy: randomRange(-0.00048, -0.0001),
        radius: randomRange(1.5, 3.6),
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: randomRange(0.025, 0.055)
      });
    }
  }

  burstOutward() {
    for (const f of this.flies) {
      const dx = f.x - 0.5;
      const dy = f.y - 0.5;
      const dist = Math.max(0.06, Math.hypot(dx, dy));
      f.vx = (dx / dist) * randomRange(0.0028, 0.0065);
      f.vy = (dy / dist) * randomRange(0.0028, 0.0065);
    }
  }

  render(width, height, pointer = { rawX: 0.5, rawY: 0.5 }, time = 0) {
    const ctx = this.ctx;
    ctx.save();

    // Spawn interactive stardust trail when pointer moves
    const moveDist = Math.hypot(pointer.rawX - this.lastRawX, pointer.rawY - this.lastRawY);
    if (moveDist > 0.004 && !Device.prefersReducedMotion()) {
      this.trail.push({
        x: pointer.rawX * width + randomRange(-8, 8),
        y: pointer.rawY * height + randomRange(-8, 8),
        vx: randomRange(-0.4, 0.4),
        vy: randomRange(-0.9, -0.2),
        r: randomRange(1.5, 3.2),
        life: 1.0
      });
      this.lastRawX = pointer.rawX;
      this.lastRawY = pointer.rawY;
    }

    for (let i = this.trail.length - 1; i >= 0; i--) {
      const tr = this.trail[i];
      tr.x += tr.vx;
      tr.y += tr.vy;
      tr.life -= 0.028;
      if (tr.life <= 0) {
        this.trail.splice(i, 1);
        continue;
      }
      const g = ctx.createRadialGradient(tr.x, tr.y, 0, tr.x, tr.y, tr.r * 3.5);
      g.addColorStop(0, `rgba(255, 248, 220, ${tr.life})`);
      g.addColorStop(0.5, `rgba(237, 208, 146, ${tr.life * 0.5})`);
      g.addColorStop(1, 'rgba(237, 208, 146, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(tr.x, tr.y, tr.r * 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const f of this.flies) {
      f.x += f.vx;
      f.y += f.vy;
      f.vx *= 0.992;
      f.vy = f.vy * 0.992 - 0.000004;

      const dx = pointer.rawX - f.x;
      const dy = pointer.rawY - f.y;
      const d = Math.hypot(dx, dy);
      if (d < 0.24 && d > 0.01) {
        f.x += (dx / d) * 0.0004;
        f.y += (dy / d) * 0.0004;
      }

      if (f.y < -0.05) { f.y = 1.04; f.x = Math.random(); f.vy = randomRange(-0.00045, -0.00015); }
      if (f.y > 1.06) f.y = -0.04;
      if (f.x < -0.05) f.x = 1.04;
      if (f.x > 1.05) f.x = -0.04;

      const pulse = 0.35 + 0.65 * Math.sin(time * f.pulseSpeed + f.phase);
      const px = f.x * width;
      const py = f.y * height;

      const grad = ctx.createRadialGradient(px, py, 0, px, py, f.radius * 4.8);
      grad.addColorStop(0, `rgba(255, 248, 210, ${0.92 * pulse})`);
      grad.addColorStop(0.45, `rgba(245, 198, 118, ${0.46 * pulse})`);
      grad.addColorStop(1, 'rgba(245, 198, 118, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, f.radius * 4.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}
