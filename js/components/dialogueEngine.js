/* ==========================================
   DIALOGUE & LANGUAGE QUIZ RUNNER ENGINE
   ========================================== */

import { state } from '../state.js';
import { audioController } from './audioController.js';

export class DialogueEngine {
  constructor(containerId, optionsContainerId) {
    this.entriesBox  = document.getElementById(containerId);   // #dialogue-entries
    this.optionsBox  = document.getElementById(optionsContainerId);
    this.footerBox   = document.getElementById('dialogue-footer-box');
    this.script      = [];
    this.currentIndex = 0;
    this.onCompleteCallback = null;

    // Wire up audio button
    document.getElementById('btn-dialogue-audio')?.addEventListener('click', () => {
      audioController.playSfx('click');
    });
  }

  loadScript(scriptArray, onComplete) {
    this.script = scriptArray;
    this.currentIndex = 0;
    this.onCompleteCallback = onComplete;
    this.renderCurrentStep();
  }

  renderCurrentStep() {
    if (this.currentIndex >= this.script.length) {
      if (this.onCompleteCallback) this.onCompleteCallback();
      return;
    }

    const step = this.script[this.currentIndex];

    if (step.type === 'dialogue') {
      this.renderDialogueStep(step);
    } else if (step.type === 'quiz') {
      this.renderQuizStep(step);
    } else if (step.type === 'completion') {
      this.renderCompletionStep(step);
    }
  }

  // ── Helpers ──────────────────────────────────────

  // Build a single speaker entry element
  _buildEntry(speakerName, textHtml, isDim = false) {
    const entry = document.createElement('div');
    entry.className = `dialogue-entry${isDim ? ' dim' : ''}`;
    entry.innerHTML = `
      <div class="dialogue-entry-avatar" aria-hidden="true"></div>
      <div class="dialogue-entry-name">${speakerName}</div>
      <div class="dialogue-entry-text">${textHtml}</div>
    `;
    return entry;
  }

  // Get the previous dialogue step (for the "dim" top slot)
  _getPrevDialogue() {
    for (let i = this.currentIndex - 1; i >= 0; i--) {
      const s = this.script[i];
      if (s.type === 'dialogue') return s;
    }
    return null;
  }

  _updateHud() {
    const basaEl = document.getElementById('gameplay-basa-count');
    const xpEl   = document.getElementById('gameplay-xp-count');
    if (basaEl) basaEl.textContent = state.vocabList ? state.vocabList.length : 0;
    if (xpEl)   xpEl.textContent   = state.xp ?? 0;
  }

  // ── Step Renderers ────────────────────────────────

  renderDialogueStep(step) {
    if (!this.entriesBox) return;
    this.entriesBox.innerHTML = '';
    if (this.optionsBox)  this.optionsBox.innerHTML = '';

    // Top slot: previous speaker (dimmed), if any
    const prev = this._getPrevDialogue();
    if (prev) {
      this.entriesBox.appendChild(this._buildEntry(prev.speaker, prev.text, true));
    }

    // Bottom slot: current speaker (active)
    this.entriesBox.appendChild(this._buildEntry(step.speaker, step.text, false));

    // Footer: Lanjut button
    if (this.footerBox) {
      this.footerBox.innerHTML = '';
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn-primary';
      nextBtn.textContent = 'LANJUT →';
      nextBtn.addEventListener('click', () => {
        audioController.playSfx('click');
        this.nextStep();
      });
      this.footerBox.appendChild(nextBtn);
    }

    this._updateHud();
  }

  renderQuizStep(step) {
  renderQuizStep(step) {
    if (!this.entriesBox) return;
    this.entriesBox.innerHTML = '';

    // Show the previous dialogue entry dimmed for context
    const prev = this._getPrevDialogue();
    if (prev) this.entriesBox.appendChild(this._buildEntry(prev.speaker, prev.text, true));
    this.entriesBox.appendChild(
      this._buildEntry(step.speaker || 'Tantangan Bahasa', step.text, false)
    );

    if (this.footerBox)  this.footerBox.innerHTML = '';
    if (this.optionsBox) this.optionsBox.innerHTML = '';

    // Open challenge card modal overlay
    this._openChallengeCard(step);
    this._updateHud();
  }

  // ── Challenge Card Modal ──────────────────────────

  _openChallengeCard(step) {
    const modal       = document.getElementById('challenge-card-modal');
    const wordEl      = document.getElementById('challenge-basa-word');
    const phoneticEl  = document.getElementById('challenge-phonetic');
    const meaningEl   = document.getElementById('challenge-meaning');
    const contextEl   = document.getElementById('challenge-context');
    const optionsGrid = document.getElementById('challenge-options');
    const feedbackEl  = document.getElementById('challenge-feedback');
    const closeBtn    = document.getElementById('btn-challenge-close');

    if (!modal) return;

    if (wordEl)     wordEl.textContent     = step.basaWord   || '';
    if (phoneticEl) phoneticEl.textContent = step.phonetic   || '';
    if (meaningEl)  meaningEl.textContent  = step.meaning    ? `artinya: ${step.meaning}` : '';
    if (contextEl)  contextEl.innerHTML    = step.context    || '';

    if (feedbackEl) { feedbackEl.hidden = true; feedbackEl.innerHTML = ''; }
    if (optionsGrid) optionsGrid.innerHTML = '';

    if (optionsGrid && step.options) {
      step.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'challenge-option-btn';
        btn.textContent = opt.text;
        btn.addEventListener('click', () => this._handleChallengeSelection(btn, opt, step, modal));
        optionsGrid.appendChild(btn);
      });
    }

    if (closeBtn) {
      const newClose = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newClose, closeBtn);
      newClose.addEventListener('click', () => {
        modal.hidden = true;
        audioController.playSfx('click');
      });
    }

    modal.hidden = false;
  }

  _handleChallengeSelection(btnEl, optionObj, stepObj, modal) {
    document.querySelectorAll('#challenge-options .challenge-option-btn')
      .forEach(b => { b.disabled = true; });

    const feedbackEl = document.getElementById('challenge-feedback');

    if (optionObj.isCorrect) {
      btnEl.classList.add('correct');
      audioController.playSfx('success');

      state.addXp(50);
      if (stepObj.vocabUnlocked) state.addVocab(stepObj.vocabUnlocked);
      this._updateHud();

      if (feedbackEl) {
        feedbackEl.innerHTML = `
          <span class="challenge-feedback-text correct">✓ ${optionObj.feedback} (+50 XP)</span>
          <button class="btn-primary challenge-next-btn">LANJUT →</button>
        `;
        feedbackEl.hidden = false;
        feedbackEl.querySelector('.challenge-next-btn')?.addEventListener('click', () => {
          modal.hidden = true;
          audioController.playSfx('click');
          this.nextStep();
        });
      }
    } else {
      btnEl.classList.add('wrong');
      audioController.playSfx('click');

      if (feedbackEl) {
        feedbackEl.innerHTML = `
          <span class="challenge-feedback-text wrong">✕ ${optionObj.feedback}</span>
          <button class="btn-secondary challenge-retry-btn">Coba Lagi</button>
        `;
        feedbackEl.hidden = false;
        feedbackEl.querySelector('.challenge-retry-btn')?.addEventListener('click', () => {
          this._openChallengeCard(stepObj);
        });
      }
    }
  }

  handleQuizSelection(btnEl, optionObj, stepObj) {
    // Delegates to challenge card handler
    this._handleChallengeSelection(btnEl, optionObj, stepObj,
      document.getElementById('challenge-card-modal'));
  }

  renderCompletionStep(step) {
    state.addXp(step.xpEarned || 100);
    state.unlockNextLocation(step.nextLocationIndex);

    const modalBackdrop = document.getElementById('completion-modal');
    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      const titleEl  = document.getElementById('completion-modal-title');
      const descEl   = document.getElementById('completion-modal-desc');
      const rewardEl = document.getElementById('completion-modal-reward');

      if (titleEl)  titleEl.textContent  = step.title;
      if (descEl)   descEl.textContent   = step.desc;
      if (rewardEl) rewardEl.textContent = `+${step.xpEarned} XP & Lokasi "${step.nextLocationName}" Terbuka!`;

      document.getElementById('btn-completion-return')?.addEventListener('click', () => {
        modalBackdrop.classList.remove('active');
        state.setScreen('map');
      });
    }
  }

  nextStep() {
    this.currentIndex++;
    this.renderCurrentStep();
  }
}
