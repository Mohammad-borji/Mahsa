/**
 * SCENE 05 — THE MOON AND THE MESSAGE
 */
export const FinalScene = {
  onEnter(gsapInstance) {
    const scene = document.getElementById('scene-05');
    if (!scene || !gsapInstance) return;
    const moon = scene.querySelector('.climax-moon-wrapper');
    const nameReveal = scene.querySelector('.climax-name-reveal');
    const latinReveal = scene.querySelector('.climax-name-latin');
    const panel = scene.querySelector('.message-glass-panel');
    const lines = scene.querySelectorAll('.persian-line');
    const signature = scene.querySelector('.final-signature');
    const replayBtn = scene.querySelector('#btn-replay-journey');

    gsapInstance.set(lines, { opacity: 0, y: 14 });
    gsapInstance.set(signature, { opacity: 0, y: 10 });

    const tl = gsapInstance.timeline();
    tl.fromTo(moon,
      { opacity: 0, scale: 0.8, y: -12 },
      { opacity: 1, scale: 1, y: 0, duration: 1.15, ease: 'power3.out' }
    )
    .fromTo([nameReveal, latinReveal],
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(panel,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
      '-=0.45'
    )
    .to(lines,
      { opacity: 1, y: 0, duration: 1.15, stagger: 0.72, ease: 'power2.out' },
      '-=0.2'
    )
    .to(signature,
      { opacity: 0.92, y: 0, duration: 1.0, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(replayBtn,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
      '-=0.4'
    );
  }
};
