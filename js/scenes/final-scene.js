/**
 * SCENE 05 — THE MOON AND THE MESSAGE
 */
export const FinalScene = {
  onEnter(gsapInstance) {
    const scene = document.getElementById('scene-05');
    if (!scene || !gsapInstance) return;
    const moon = scene.querySelector('.climax-moon-wrapper');
    const nameReveal = scene.querySelector('.climax-name-reveal');
    const panel = scene.querySelector('.message-glass-panel');
    const lines = scene.querySelectorAll('.persian-line');
    const signature = scene.querySelector('.final-signature');
    const replayBtn = scene.querySelector('#btn-replay-journey');

    gsapInstance.set(lines, { opacity: 0, y: 14 });
    gsapInstance.set(signature, { opacity: 0, y: 10 });

    const tl = gsapInstance.timeline();
    tl.fromTo(moon,
      { opacity: 0, scale: 0.82, y: -15 },
      { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: 'power3.out' }
    )
    .fromTo(nameReveal,
      { opacity: 0, letterSpacing: '0.52em', y: 16 },
      { opacity: 1, letterSpacing: '0.35em', y: 0, duration: 1.3, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo(panel,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
      '-=0.5'
    )
    .to(lines,
      { opacity: 1, y: 0, duration: 1.15, stagger: 0.75, ease: 'power2.out' },
      '-=0.2'
    )
    .to(signature,
      { opacity: 0.9, y: 0, duration: 1.0, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(replayBtn,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
      '-=0.4'
    );
  }
};
