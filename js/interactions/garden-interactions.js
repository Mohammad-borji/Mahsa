/**
 * Enchanted Garden flower illumination & hidden crescent moon interactions
 */
export function initGardenInteractions(audioCtrl) {
  const flowers = document.querySelectorAll('.flower-node');
  const whisperEl = document.getElementById('garden-whisper-text');
  const hiddenMoon = document.getElementById('garden-secret-moon');

  flowers.forEach((flower) => {
    const activateFlower = () => {
      flower.classList.add('is-lit');
      const note = flower.getAttribute('data-bloom-note');
      if (whisperEl && note) {
        whisperEl.textContent = note;
      }
      if (audioCtrl) audioCtrl.playSoftNote();
    };

    flower.addEventListener('pointerenter', activateFlower);
    flower.addEventListener('click', activateFlower);
  });

  if (hiddenMoon) {
    // Subtle visual response only — no explanatory text per creative brief
    const triggerSecretMoon = (e) => {
      e.stopPropagation();
      hiddenMoon.classList.add('is-discovered');
      if (audioCtrl) audioCtrl.playSoftNote(880);
    };
    hiddenMoon.addEventListener('pointerenter', triggerSecretMoon);
    hiddenMoon.addEventListener('click', triggerSecretMoon);
  }
}
