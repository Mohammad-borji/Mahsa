/**
 * SCENE 02 — THE ENCHANTED GARDEN
 */
export const GardenScene = {
  onEnter(gsapInstance) {
    const scene = document.getElementById('scene-02');
    if (!scene || !gsapInstance) return;
    const texts = scene.querySelectorAll('.eyebrow-label, .cinematic-quote');
    const flowers = scene.querySelectorAll('.flower-node');
    const action = scene.querySelector('.scene-actions-bottom');

    gsapInstance.fromTo(texts,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.25, ease: 'power3.out' }
    );
    gsapInstance.fromTo(flowers,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.0, stagger: 0.1, delay: 0.25, ease: 'back.out(1.6)' }
    );
    gsapInstance.fromTo(action,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 1.0, delay: 0.55, ease: 'power2.out' }
    );
  }
};
