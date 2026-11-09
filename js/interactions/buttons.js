/**
 * Primary CTA buttons and independent Audio Controller
 */
export class AudioController {
  constructor() {
    this.enabled = false;
    this.ctx = null;
    this.loopTimer = null;
    this.externalAudio = new Audio('assets/audio/music/celestial-journey.wav');
    this.externalAudio.loop = true;
    this.externalAudio.volume = 0.35;
    this.externalAvailable = false;

    this.externalAudio.addEventListener('canplaythrough', () => {
      this.externalAvailable = true;
    }, { once: true });
    this.externalAudio.addEventListener('error', () => {
      this.externalAvailable = false;
    });
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.startAmbient();
    } else {
      this.stopAmbient();
    }
    return this.enabled;
  }

  startAmbient() {
    this.ensureContext();
    if (this.externalAvailable) {
      this.externalAudio.play().catch(() => this.startSynthLoop());
    } else {
      this.startSynthLoop();
    }
  }

  stopAmbient() {
    try { this.externalAudio.pause(); } catch (e) {}
    if (this.loopTimer) {
      clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
  }

  startSynthLoop() {
    if (this.loopTimer) clearInterval(this.loopTimer);
    const playPad = () => {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [220.0, 277.18, 329.63, 440.0];
      notes.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.018, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 3.9);
      });
    };
    playPad();
    this.loopTimer = setInterval(playPad, 3800);
  }

  playSoftNote(freq = 659.25) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 1.15);
  }

  playWishChord() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((f, idx) => {
      setTimeout(() => this.playSoftNote(f), idx * 110);
    });
  }
}

export function initPrimaryButtons(sceneManager, audioCtrl) {
  const btnBegin = document.getElementById('btn-begin-journey');
  const btnGardenNext = document.getElementById('btn-follow-pathway');
  const btnEnterGate = document.getElementById('btn-enter-gate');
  const btnReplay = document.getElementById('btn-replay-journey');
  const btnAudio = document.getElementById('btn-audio-toggle');

  if (btnBegin) btnBegin.addEventListener('click', () => sceneManager.goToScene(1));
  if (btnGardenNext) btnGardenNext.addEventListener('click', () => sceneManager.goToScene(2));
  if (btnEnterGate) btnEnterGate.addEventListener('click', () => sceneManager.goToScene(3, { viaPortal: true }));
  if (btnReplay) btnReplay.addEventListener('click', () => sceneManager.goToScene(0));

  if (btnAudio && audioCtrl) {
    btnAudio.addEventListener('click', () => {
      const playing = audioCtrl.toggle();
      btnAudio.classList.toggle('is-playing', playing);
      btnAudio.setAttribute('aria-pressed', playing ? 'true' : 'false');
      const label = btnAudio.querySelector('.audio-label-text');
      if (label) label.textContent = playing ? 'Sound On' : 'Muted';
      const iconOn = btnAudio.querySelector('.icon-sound-on');
      const iconOff = btnAudio.querySelector('.icon-sound-off');
      if (iconOn && iconOff) {
        iconOn.style.display = playing ? 'block' : 'none';
        iconOff.style.display = playing ? 'none' : 'block';
      }
    });
  }
}
