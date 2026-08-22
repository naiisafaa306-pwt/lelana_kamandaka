/* ==========================================
   GLOBAL APP STATE MANAGEMENT (SINGLETON)
   ========================================== */

import { INITIAL_VOCABULARY } from './data/vocabData.js';

const STORAGE_KEY = 'lelana_kamandaka_save_state_v1';

class AppState {
  constructor() {
    this.currentScreen = 'opening'; // 'opening' | 'story' | 'map' | 'gameplay' | 'journal' | 'achievement'
    this.unlockedLocationIndex = 0; // 0 = Pajajaran unlocked, 1 = Ki Ajar Winarong, etc.
    this.playerXp = 0;
    this.collectedVocab = [...INITIAL_VOCABULARY];
    this.audioMuted = false;
    this.activeLocationId = 'pajajaran';
    this.listeners = [];

    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.unlockedLocationIndex = parsed.unlockedLocationIndex ?? 0;
        this.playerXp = parsed.playerXp ?? 0;
        this.audioMuted = parsed.audioMuted ?? false;
        if (parsed.collectedVocab && Array.isArray(parsed.collectedVocab)) {
          this.collectedVocab = parsed.collectedVocab;
        }
      }
    } catch (e) {
      console.warn('Failed to load saved state from localStorage:', e);
    }
  }

  saveToStorage() {
    try {
      const dataToSave = {
        unlockedLocationIndex: this.unlockedLocationIndex,
        playerXp: this.playerXp,
        audioMuted: this.audioMuted,
        collectedVocab: this.collectedVocab
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn('Failed to save state to localStorage:', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
    this.saveToStorage();
  }

  setScreen(screenName) {
    if (this.currentScreen !== screenName) {
      this.currentScreen = screenName;
      this.notify();
    }
  }

  unlockNextLocation(newIndex) {
    if (newIndex > this.unlockedLocationIndex) {
      this.unlockedLocationIndex = newIndex;
      this.notify();
    }
  }

  addXp(amount) {
    this.playerXp += amount;
    this.notify();
  }

  addVocab(vocabObj) {
    const existing = this.collectedVocab.find(v => v.word.toLowerCase() === vocabObj.word.toLowerCase());
    if (!existing) {
      this.collectedVocab.push({
        id: 'vocab_' + Date.now(),
        ...vocabObj,
        discovered: true
      });
      this.notify();
    }
  }

  toggleAudio() {
    this.audioMuted = !this.audioMuted;
    this.notify();
    return this.audioMuted;
  }
}

export const state = new AppState();
