/**
 * Device & capability detection utilities
 */
export const Device = {
  isMobile() {
    return window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
  },
  prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  getParticleMultiplier() {
    if (this.prefersReducedMotion()) return 0.25;
    return this.isMobile() ? 0.6 : 1.0;
  }
};
