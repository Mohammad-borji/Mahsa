/**
 * GSAP Cinematic Camera-Like Scene Transitions
 */
import { Device } from '../utils/device.js';

export class TransitionController {
  constructor(gsapInstance) {
    this.gsap = gsapInstance;
    this.flashOverlay = document.getElementById('light-transition-overlay');
  }

  transitionBetween(currentEl, nextEl, options = {}, onMidpoint, onComplete) {
    const reduced = Device.prefersReducedMotion();
    const gsap = this.gsap;

    if (!gsap || reduced) {
      if (currentEl) currentEl.classList.remove('is-active');
      if (nextEl) nextEl.classList.add('is-active');
      if (onMidpoint) onMidpoint();
      if (onComplete) onComplete();
      return;
    }

    if (options.viaPortal && this.flashOverlay) {
      const tl = gsap.timeline({
        onComplete: () => { if (onComplete) onComplete(); }
      });

      tl.to(currentEl, {
        scale: 1.32,
        opacity: 0,
        duration: 0.95,
        ease: 'power2.in'
      }, 0)
      .to(this.flashOverlay, {
        opacity: 0.94,
        duration: 0.65,
        ease: 'power2.in',
        onComplete: () => {
          currentEl.classList.remove('is-active');
          gsap.set(currentEl, { scale: 1, opacity: 0 });
          nextEl.classList.add('is-active');
          if (onMidpoint) onMidpoint();
        }
      }, 0.3)
      .fromTo(nextEl,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
        0.95
      )
      .to(this.flashOverlay, {
        opacity: 0,
        duration: 1.15,
        ease: 'power2.out'
      }, 0.95);
      return;
    }

    const forward = options.direction !== 'backward';
    const outScale = forward ? 1.16 : 0.9;
    const inStartScale = forward ? 0.92 : 1.12;

    const tl = gsap.timeline({
      onComplete: () => { if (onComplete) onComplete(); }
    });

    tl.to(currentEl, {
      scale: outScale,
      opacity: 0,
      duration: 0.88,
      ease: 'power2.inOut',
      onComplete: () => {
        currentEl.classList.remove('is-active');
        gsap.set(currentEl, { scale: 1, opacity: 0 });
        nextEl.classList.add('is-active');
        if (onMidpoint) onMidpoint();
      }
    })
    .fromTo(nextEl,
      { scale: inStartScale, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' },
      '-=0.25'
    );
  }
}
