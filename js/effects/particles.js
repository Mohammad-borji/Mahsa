/**
 * Master Canvas Coordinator combining Starfield, Petals, and Fireflies
 */
import { StarfieldEffect } from './stars.js';
import { PetalsEffect } from './petals.js';
import { FirefliesEffect } from './fireflies.js';

export class ParticleSystem {
  constructor(cosmosCanvas, fxCanvas, parallax) {
    this.cosmosCanvas = cosmosCanvas;
    this.fxCanvas = fxCanvas;
    this.fxCtx = fxCanvas.getContext('2d');
    this.parallax = parallax;

    this.starfield = new StarfieldEffect(cosmosCanvas);
    this.petals = new PetalsEffect(this.fxCtx);
    this.fireflies = new FirefliesEffect(this.fxCtx);

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.time = 0;
    this.paused = false;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('visibilitychange', () => {
      this.paused = document.hidden;
    });
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    for (const c of [this.cosmosCanvas, this.fxCanvas]) {
      c.width = this.width * dpr;
      c.height = this.height * dpr;
      const ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  configureForScene(sceneIndex) {
    if (sceneIndex === 0) {
      this.starfield.setIntensity(0.95);
      this.petals.active = false;
    } else if (sceneIndex === 1) {
      this.starfield.setIntensity(0.35);
      this.petals.active = true;
    } else if (sceneIndex === 2) {
      this.starfield.setIntensity(0.45);
      this.petals.active = false;
    } else if (sceneIndex === 3) {
      this.starfield.setIntensity(0.35);
      this.petals.active = true;
    } else if (sceneIndex === 4) {
      this.starfield.setIntensity(0.95);
      this.petals.active = false;
    }
  }

  celebrateWish() {
    this.petals.triggerGust();
    this.petals.spawnBloomBurst(0.5, 0.42, 'rgba(255, 240, 190, 0.95)');
    this.fireflies.burstOutward();
  }

  tick() {
    if (this.paused) return;
    this.time += 1;
    this.parallax.update();

    const cosmosCtx = this.cosmosCanvas.getContext('2d');
    cosmosCtx.clearRect(0, 0, this.width, this.height);
    this.fxCtx.clearRect(0, 0, this.width, this.height);

    const pOffset = { x: this.parallax.currentX, y: this.parallax.currentY };
    const pRaw = { rawX: this.parallax.rawX, rawY: this.parallax.rawY };

    this.starfield.render(this.width, this.height, pOffset, this.time);
    this.petals.render(this.width, this.height, pOffset);
    this.fireflies.render(this.width, this.height, pRaw, this.time);
  }
}
