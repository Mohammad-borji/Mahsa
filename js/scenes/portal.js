/**
 * SCENE 03 — THE GOLDEN GATE
 */
export const PortalScene = {
  onEnter(gsapInstance) {
    const scene = document.getElementById('scene-03');
    if (!scene || !gsapInstance) return;
    const arch = scene.querySelector('.portal-arch-container');
    const texts = scene.querySelectorAll('.eyebrow-label, .cinematic-quote');
    const btn = scene.querySelector('#btn-enter-gate');

    gsapInstance.fromTo(arch,
      { opacity: 0, scale: 0.86 },
      { opacity: 1, scale: 1, duration: 1.35, ease: 'power3.out' }
    );
    gsapInstance.fromTo(texts,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 1.15, stagger: 0.22, delay: 0.2, ease: 'power2.out' }
    );
    gsapInstance.fromTo(btn,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 1.0, delay: 0.6, ease: 'power2.out' }
    );
  }
};
