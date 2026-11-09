/**
 * Lightweight Preloader ensuring fonts & opening scene are ready
 */
export function runPreloader(onReady) {
  const preloader = document.getElementById('preloader');
  const finish = () => {
    if (preloader && !preloader.classList.contains('is-loaded')) {
      preloader.classList.add('is-loaded');
    }
    if (onReady) onReady();
  };

  if (document.readyState === 'complete') {
    setTimeout(finish, 350);
  } else {
    window.addEventListener('load', () => setTimeout(finish, 350), { once: true });
    setTimeout(finish, 1800);
  }
}
