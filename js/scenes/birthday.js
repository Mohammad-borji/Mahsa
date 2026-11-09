/**
 * SCENE 04 — THE BIRTHDAY CELEBRATION
 */
export const BirthdayScene = {
  onEnter(gsapInstance) {
    const scene = document.getElementById('scene-04');
    if (!scene || !gsapInstance) return;
    const sub = scene.querySelector('.birthday-heading-sub');
    const name = scene.querySelector('.birthday-heading-name');
    const latin = scene.querySelector('.birthday-heading-latin');
    const cake = scene.querySelector('.cake-stage-wrapper');
    const btn = scene.querySelector('#btn-make-wish');

    gsapInstance.fromTo([sub, name, latin],
      { opacity: 0, y: 22, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out' }
    );
    gsapInstance.fromTo(cake,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.3, delay: 0.2, ease: 'power3.out' }
    );
    gsapInstance.fromTo(btn,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 1.0, delay: 0.6, ease: 'power2.out' }
    );
  }
};
