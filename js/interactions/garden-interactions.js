/**
 * Enchanted Garden real flower illumination & hidden crescent moon stone interactions
 */
export function initGardenInteractions(audioCtrl, particleSystem) {
  const flowers = document.querySelectorAll('.flower-node');
  const whisperEl = document.getElementById('garden-whisper-text');
  const hiddenMoon = document.getElementById('garden-secret-moon');

  flowers.forEach((flower, idx) => {
    const activateFlower = (e) => {
      flower.classList.add('is-lit');
      const note = flower.getAttribute('data-bloom-note');
      if (whisperEl && note) {
        whisperEl.textContent = note;
      }
      if (particleSystem && e && e.clientX) {
        const nx = e.clientX / Math.max(1, window.innerWidth);
        const ny = e.clientY / Math.max(1, window.innerHeight);
        particleSystem.petals.spawnBloomBurst(nx, ny);
      }
      if (audioCtrl) audioCtrl.playSoftNote(523.25 + idx * 65);
    };

    flower.addEventListener('pointerenter', activateFlower);
    flower.addEventListener('click', activateFlower);
  });

  if (hiddenMoon) {
    // Subtle visual response on the mossy crescent moon stone — no explanatory text
    const triggerSecretMoon = (e) => {
      e.stopPropagation();
      hiddenMoon.classList.add('is-discovered');
      if (particleSystem && e && e.clientX) {
        const nx = e.clientX / Math.max(1, window.innerWidth);
        const ny = e.clientY / Math.max(1, window.innerHeight);
        particleSystem.petals.spawnBloomBurst(nx, ny, 'rgba(255, 244, 208, 0.95)');
      }
      if (audioCtrl) audioCtrl.playSoftNote(880);
    };
    hiddenMoon.addEventListener('pointerenter', triggerSecretMoon);
    hiddenMoon.addEventListener('click', triggerSecretMoon);
  }
}
