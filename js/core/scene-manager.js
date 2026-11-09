/**
 * Master Scene Manager orchestrating the 5-scene journey
 */
import { IntroScene } from '../scenes/intro.js';
import { GardenScene } from '../scenes/garden.js';
import { PortalScene } from '../scenes/portal.js';
import { BirthdayScene } from '../scenes/birthday.js';
import { FinalScene } from '../scenes/final-scene.js';
import { TransitionController } from './transitions.js';

export class SceneManager {
  constructor(gsapInstance, particleSystem) {
    this.gsap = gsapInstance;
    this.particleSystem = particleSystem;
    this.transitions = new TransitionController(gsapInstance);
    this.scenes = Array.from(document.querySelectorAll('.scene'));
    this.sceneControllers = [IntroScene, GardenScene, PortalScene, BirthdayScene, FinalScene];
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.navigation = null;
  }

  attachNavigation(nav) {
    this.navigation = nav;
  }

  start() {
    this.currentIndex = 0;
    this.scenes.forEach((s, i) => s.classList.toggle('is-active', i === 0));
    if (this.particleSystem) this.particleSystem.configureForScene(0);
    if (this.navigation) this.navigation.updateIndicators(0);
    IntroScene.onEnter(this.gsap);
  }

  goToScene(targetIndex, options = {}) {
    if (this.isTransitioning) return;
    if (targetIndex < 0 || targetIndex >= this.scenes.length) return;
    if (targetIndex === this.currentIndex) return;

    this.isTransitioning = true;
    const currentEl = this.scenes[this.currentIndex];
    const nextEl = this.scenes[targetIndex];
    const direction = targetIndex > this.currentIndex ? 'forward' : 'backward';
    const viaPortal = options.viaPortal || (this.currentIndex === 2 && targetIndex === 3);

    this.transitions.transitionBetween(
      currentEl,
      nextEl,
      { direction, viaPortal },
      () => {
        this.currentIndex = targetIndex;
        if (this.particleSystem) this.particleSystem.configureForScene(targetIndex);
        if (this.navigation) this.navigation.updateIndicators(targetIndex);
        const ctrl = this.sceneControllers[targetIndex];
        if (ctrl && ctrl.onEnter) ctrl.onEnter(this.gsap);
      },
      () => {
        this.isTransitioning = false;
      }
    );
  }

  next() {
    if (this.currentIndex < this.scenes.length - 1) {
      this.goToScene(this.currentIndex + 1);
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.goToScene(this.currentIndex - 1);
    }
  }
}
