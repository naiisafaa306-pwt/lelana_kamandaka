/* ==========================================
   AUDIO CONTROLLER & SYNTHESIZER
   ========================================== */

import { state } from '../state.js';

class AudioController {
  constructor() {
    this.audioCtx = null;
    this.bgmOscillator = null;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playSfx(type) {
    if (state.audioMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;

    if (type === 'click') {
      // Soft woodblock tap
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      // Resonant Javanese Gong / Chime
      const freqs = [220, 330, 440, 550]; // Pelog pentatonic harmony
      freqs.forEach(freq => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
      });
    }
  }
}

export const audioController = new AudioController();
