/**
 * Floating Organic Rose & Lily Petals + Interactive Bloom Bursts
 */
import { randomRange } from '../utils/helpers.js';
import { Device } from '../utils/device.js';

export class PetalsEffect {
  constructor(ctx) {
    this.ctx = ctx;
    this.petals = [];
    this.burstPetals = [];
    this.active = false;
    this.windBoost = 1.0;
    this.init();
  }

  init() {
    const mult = Device.getParticleMultiplier();
    const count = Math.floor(30 * mult);
    this.petals = [];
    const colors = [
      'rgba(232, 92, 130, 0.84)',
      'rgba(252, 185, 206, 0.86)',
      'rgba(255, 250, 242, 0.84)',
      'rgba(205, 48, 90, 0.78)'
    ];
    for (let i = 0; i < count; i++) {
      this.petals.push({
        x: Math.random(),
        y: Math.random(),
        size: randomRange(5.5, 11.5),
        speedY: randomRange(0.00035, 0.00085),
        speedX: randomRange(0.0002, 0.00075),
        angle: randomRange(0, Math.PI * 2),
        spin: randomRange(-0.018, 0.018),
        color: colors[i % colors.length]
      });
    }
  }

  triggerGust() {
    this.windBoost = 3.2;
  }

  spawnBloomBurst(normX, normY, color = 'rgba(255, 220, 185, 0.9)') {
    for (let i = 0; i < 14; i++) {
      const angle = randomRange(0, Math.PI * 2);
      const speed = randomRange(0.0012, 0.0042);
      this.burstPetals.push({
        x: normX,
        y: normY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.001,
        size: randomRange(3.5, 7.5),
        rot: randomRange(0, Math.PI * 2),
        spin: randomRange(-0.04, 0.04),
        life: 1.0,
        color
      });
    }
  }

  render(width, height, pointer = { x: 0, y: 0 }) {
    const ctx = this.ctx;
    ctx.save();

    if (this.active) {
      this.windBoost += (1.0 - this.windBoost) * 0.03;
      for (const p of this.petals) {
        p.y += p.speedY * this.windBoost;
        p.x += (p.speedX * this.windBoost) + (pointer.x * 0.0003);
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
    }

    for (let i = this.burstPetals.length - 1; i >= 0; i--) {
      const bp = this.burstPetals[i];
      bp.x += bp.vx;
      bp.y += bp.vy;
      bp.rot += bp.spin;
      bp.life -= 0.018;
      if (bp.life <= 0) {
        this.burstPetals.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.translate(bp.x * width, bp.y * height);
      ctx.rotate(bp.rot);
      ctx.globalAlpha = bp.life;
      ctx.fillStyle = bp.color;
      ctx.beginPath();
      ctx.arc(0, 0, bp.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  }
}
