/**
 * Entry Point — MAHSA: A Journey Written in Stars
 */
import { ParallaxController } from './effects/parallax.js';
import { ParticleSystem } from './effects/particles.js';
import { SceneManager } from './core/scene-manager.js';
import { NavigationController } from './core/navigation.js';
import { runPreloader } from './core/preloader.js';
import { AudioController, initPrimaryButtons } from './interactions/buttons.js';
import { initGardenInteractions } from './interactions/garden-interactions.js';
import { initBirthdayInteractions } from './interactions/birthday-interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  const cosmosCanvas = document.getElementById('cosmos-canvas');
  const fxCanvas = document.getElementById('fx-canvas');
  const gsapInstance = window.gsap || null;

  const parallax = new ParallaxController();
  const particleSystem = new ParticleSystem(cosmosCanvas, fxCanvas, parallax);
  const sceneManager = new SceneManager(gsapInstance, particleSystem);
  const navigation = new NavigationController(sceneManager);
  const audioCtrl = new AudioController();

  sceneManager.attachNavigation(navigation);

  initPrimaryButtons(sceneManager, audioCtrl);
  initGardenInteractions(audioCtrl, particleSystem);
  initBirthdayInteractions(sceneManager, particleSystem, audioCtrl);

  function animate() {
    particleSystem.tick();
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  runPreloader(() => {
    sceneManager.start();
  });
});
