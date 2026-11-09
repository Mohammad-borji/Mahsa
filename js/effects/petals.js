/**
 * Floating rose & lily petals for Scene 02 (Garden) & Scene 04 (Birthday Celebration)
 */
import { randomRange } from '../utils/helpers.js';
import { Device } from '../utils/device.js';

export class PetalsEffect {
  constructor(ctx) {
    this.ctx = ctx;
    this.petals = [];
    this.active = false;
    this.windBoost = 1.0;
    this.init();
  }

  init() {
    const mult = Device.getParticleMultiplier();
    const count = Math.floor(28 * mult);
    this.petals = [];
    const colors = [
      'rgba(232, 118, 148, 0.78)',
      'rgba(250, 185, 204, 0.82)',
      'rgba(252, 246, 236, 0.78)',
      'rgba(217, 75, 114, 0.72)'
    ];
    for (let i = 0; i < count; i++) {
      this.petals.push({
        x: Math.random(),
        y: Math.random(),
        size: randomRange(5, 10.5),
        speedY: randomRange(0.0003, 0.0008),
        speedX: randomRange(0.0002, 0.0007),
        angle: randomRange(0, Math.PI * 2),
        spin: randomRange(-0.015, 0.015),
        color: colors[i % colors.length]
      });
    }
  }

  triggerGust() {
    this.windBoost = 2.8;
  }

  render(width, height, pointer = { x: 0, y: 0 }) {
    if (!this.active) return;
    this.windBoost += (1.0 - this.windBoost) * 0.03;
    const ctx = this.ctx;
    ctx.save();
    for (const p of this.petals) {
      p.y += p.speedY * this.windBoost;
      p.x += (p.speedX * this.windBoost) + (pointer.x * 0.00025);
      p.angle += p.spin * this.windBoost;

      if (p.y > 1.06) { p.y = -0.05; p.x = Math.random(); }
      if (p.x > 1.06) p.x = -0.04;
      if (p.x < -0.06) p.x = 1.04;

      const x = p.x * width;
      const y = p.y * height;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.5, p.size * 0.85, p.size * 0.7, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.85, p.size * 0.7, -p.size * 0.85, -p.size * 0.5, 0, -p.size);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }
}
