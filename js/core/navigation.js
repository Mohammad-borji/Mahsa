/**
 * Hybrid Navigation: Wheel Scroll, Touch Swipe, Keyboard, and Scene Progress Dots
 */
export class NavigationController {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.touchStartY = 0;
    this.lastWheelTime = 0;
    this.bindEvents();
  }

  bindEvents() {
    // Progress Indicator Dots
    const dots = document.querySelectorAll('.scene-dot');
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.getAttribute('data-scene-target'), 10);
        if (!Number.isNaN(target)) {
          this.sceneManager.goToScene(target);
        }
      });
    });

    // Controlled Wheel Scroll Progression
    window.addEventListener('wheel', (e) => {
      const now = Date.now();
      if (now - this.lastWheelTime < 1350) return;
      if (Math.abs(e.deltaY) < 38) return;

      this.lastWheelTime = now;
      if (e.deltaY > 0) {
        this.sceneManager.next();
      } else {
        this.sceneManager.prev();
      }
    }, { passive: true });

    // Touch Swipe Progression
    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        this.touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const dy = this.touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 65) return;
      if (dy > 0) {
        this.sceneManager.next();
      } else {
        this.sceneManager.prev();
      }
    }, { passive: true });

    // Keyboard Accessibility
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        this.sceneManager.next();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        this.sceneManager.prev();
      }
    });
  }

  updateIndicators(activeIndex) {
    const dots = document.querySelectorAll('.scene-dot');
    dots.forEach((dot, idx) => {
      const active = idx === activeIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', active ? 'step' : 'false');
    });
  }
}
