/**
 * Golden Gate & Birthday Cake ("یک آرزو کن") interactions
 */
export function initBirthdayInteractions(sceneManager, particleSystem, audioCtrl) {
  const portalContainer = document.getElementById('portal-arch-interactive');
  const portalMeter = document.getElementById('portal-illumination-status');
  if (portalContainer) {
    const chargeGate = () => {
      portalContainer.classList.add('gate-charged');
      if (portalMeter) {
        portalMeter.textContent = 'دروازه طلایی با نور کامل درخشید — آماده ورود به جشن ✨';
      }
      if (audioCtrl) audioCtrl.playSoftNote(783.99);
    };
    portalContainer.addEventListener('pointerenter', chargeGate);
    portalContainer.addEventListener('click', () => {
      chargeGate();
      sceneManager.goToScene(3, { viaPortal: true });
    });
  }

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
      if (span) span.textContent = 'آرزویت به سوی ستاره‌ها پرواز کرد ✨';
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
          if (span) span.textContent = 'یک آرزو کن ✨';
        }
      }, 1400);
    }, 1850);
  };

  if (wishBtn) wishBtn.addEventListener('click', triggerMakeAWish);
  if (cakeSvg) cakeSvg.addEventListener('click', triggerMakeAWish);
}
