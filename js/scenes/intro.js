/**
 * SCENE 01 — THE BEGINNING
 */
export const IntroScene = {
  onEnter(gsapInstance) {
    const scene = document.getElementById('scene-01');
    if (!scene || !gsapInstance) return;
    const eyebrow = scene.querySelector('.eyebrow-label');
    const quote = scene.querySelector('.cinematic-quote');
    const btn = scene.querySelector('#btn-begin-journey');
    const cue = scene.querySelector('.scroll-cue');

    gsapInstance.fromTo([eyebrow, quote],
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 1.3, stagger: 0.3, ease: 'power3.out' }
    );
    gsapInstance.fromTo([btn, cue],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.1, delay: 0.75, stagger: 0.2, ease: 'power2.out' }
    );
  }
};
