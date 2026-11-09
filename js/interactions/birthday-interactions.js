/**
 * Golden Gate & Birthday Cake ("MAKE A WISH") interactions
 */
export function initBirthdayInteractions(sceneManager, particleSystem, audioCtrl) {
  // Scene 03 Gate hover/touch illumination
  const portalContainer = document.getElementById('portal-arch-interactive');
  const portalMeter = document.getElementById('portal-illumination-status');
  if (portalContainer) {
    const chargeGate = () => {
      portalContainer.classList.add('gate-charged');
      if (portalMeter) {
        portalMeter.textContent = 'The Golden Gate is illuminated — Ready to Enter';
      }
    };
    portalContainer.addEventListener('pointerenter', chargeGate);
    portalContainer.addEventListener('click', () => {
      chargeGate();
      sceneManager.goToScene(3, { viaPortal: true });
    });
  }

  // Scene 04 Make a Wish interaction
  const wishBtn = document.getElementById('btn-make-wish');
  const cakeWrapper = document.getElementById('cake-stage-wrapper');
  const cakeSvg = document.getElementById('birthday-cake-interactive');
  let wishInProgress = false;

  const triggerMakeAWish = () => {
    if (wishInProgress) return;
    wishInProgress = true;

    if (cakeWrapper) cakeWrapper.classList.add('wish-granted');
    if (wishBtn) {
      const span = wishBtn.querySelector('span');
      if (span) span.textContent = 'WISH SENT TO THE STARS ✨';
    }
    if (particleSystem) particleSystem.celebrateWish();
    if (audioCtrl) audioCtrl.playWishChord();

    setTimeout(() => {
      sceneManager.goToScene(4);
      setTimeout(() => {
        wishInProgress = false;
        if (cakeWrapper) cakeWrapper.classList.remove('wish-granted');
        if (wishBtn) {
          const span = wishBtn.querySelector('span');
          if (span) span.textContent = 'MAKE A WISH';
        }
      }, 1400);
    }, 1850);
  };

  if (wishBtn) wishBtn.addEventListener('click', triggerMakeAWish);
  if (cakeSvg) cakeSvg.addEventListener('click', triggerMakeAWish);
}
