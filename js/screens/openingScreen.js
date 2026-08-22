/* ==========================================
   SCREEN 01 — HOME / OPENING CONTROLLER
   ========================================== */

import { state } from '../state.js';
import { audioController } from '../components/audioController.js';

export function initOpeningScreen() {
  const startBtn = document.getElementById('btn-start-journey');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      audioController.playSfx('click');
      state.setScreen('story');
    });
  }
}
