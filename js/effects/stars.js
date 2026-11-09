/**
 * Twinkling Starfield + Periodic Shooting Stars for Night Sky Scenes
 */
import { randomRange } from '../utils/helpers.js';
import { Device } from '../utils/device.js';

export class StarfieldEffect {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.intensity = 1.0;
    this.init();
  }

  init() {
    const mult = Device.getParticleMultiplier();
    const count = Math.floor(110 * mult);
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random() * 0.78,
        radius: randomRange(0.6, 2.0),
        depth: randomRange(0.2, 1.0),
        alpha: randomRange(0.25, 0.9),
        twinkleSpeed: randomRange(0.012, 0.035),
        phase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.7 ? '#FFF4D0' : '#E8EEFF'
      });
    }
  }

  setIntensity(val) {
    this.intensity = val;
  }

  spawnShootingStar(width, height) {
    if (Device.prefersReducedMotion()) return;
    this.shootingStars.push({
      x: randomRange(width * 0.15, width * 0.85),
      y: randomRange(height * 0.06, height * 0.32),
      vx: randomRange(-7.5, -4.2),
      vy: randomRange(2.2, 4.4),
      life: 1.0,
      decay: randomRange(0.016, 0.026)
    });
  }

  render(width, height, pointerOffset = { x: 0, y: 0 }, time = 0) {
    if (this.intensity <= 0.02) return;
    const ctx = this.ctx;
    ctx.save();

    if (this.intensity > 0.65 && Math.random() < 0.007 && this.shootingStars.length < 2) {
      this.spawnShootingStar(width, height);
    }

    for (const s of this.stars) {
      const px = (s.x * width) + (pointerOffset.x * 20 * s.depth);
      const py = (s.y * height) + (pointerOffset.y * 14 * s.depth);
      const twinkle = 0.55 + 0.45 * Math.sin(time * s.twinkleSpeed + s.phase);
      const alpha = s.alpha * twinkle * this.intensity;

      ctx.beginPath();
      ctx.fillStyle = s.hue;
      ctx.globalAlpha = alpha;
      ctx.arc((px + width) % width, (py + height) % height, s.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const st = this.shootingStars[i];
      st.x += st.vx;
      st.y += st.vy;
      st.life -= st.decay;
      if (st.life <= 0) {
        this.shootingStars.splice(i, 1);
        continue;
      }
      const tailX = st.x - st.vx * 11;
      const tailY = st.y - st.vy * 11;
      const grad = ctx.createLinearGradient(st.x, st.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 248, 220, ${st.life * this.intensity})`);
      grad.addColorStop(1, 'rgba(255, 248, 220, 0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(st.x, st.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    }

    ctx.restore();
  }
}
