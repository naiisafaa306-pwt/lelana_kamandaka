/* ==========================================
   SCREEN 04 — GAMEPLAY 01 (PAJAJARAN) CONTROLLER
   ========================================== */

import { DialogueEngine } from '../components/dialogueEngine.js';
import { PAJAJARAN_STORY } from '../data/pajajaranStory.js';
import { state } from '../state.js';
import { audioController } from '../components/audioController.js';

// Cinematic narration shown on the intro card before dialogue begins
const INTRO_NARRATION =
  '\u201cDi Kerajaan Pajajaran, Raden Banyakcatra telah beranjak dewasa. ' +
  'Sang Prabu mulai memikirkan masa depan kerajaan dan perjalanan putranya\u201d';

let dialogueEngineInstance = null;

export function initGameplayPajajaranScreen() {
  const introCard   = document.getElementById('gameplay-intro-card');
  const introText   = document.getElementById('gameplay-intro-text');
  const startBtn    = document.getElementById('btn-gameplay-start');
  const dialoguePanel = document.querySelector('#screen-gameplay .dialogue-panel');

  // Populate intro narration
  if (introText) introText.textContent = INTRO_NARRATION;

  // Hide dialogue panel until intro is dismissed
  if (dialoguePanel) dialoguePanel.style.display = 'none';

  // "MULAI PERJALANAN" dismisses intro card and starts dialogue
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      audioController.playSfx('click');
      if (introCard) introCard.classList.add('hidden');
      if (dialoguePanel) dialoguePanel.style.display = '';
      startDialogue();
    });
  }

  const backBtn = document.getElementById('btn-gameplay-back');
  if (backBtn) {
    backBtn.onclick = () => {
      audioController.playSfx('click');
      state.setScreen('map');
    };
  }
}

function startDialogue() {
  dialogueEngineInstance = new DialogueEngine('dialogue-entries', 'quiz-options-container');
  dialogueEngineInstance.loadScript(PAJAJARAN_STORY, () => {
    state.setScreen('map');
  });
}
