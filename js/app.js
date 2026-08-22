/* ==========================================
   MAIN APPLICATION BOOTSTRAPPER & ROUTER
   ========================================== */

import { state } from './state.js';
import { LeafCanvas } from './components/leafCanvas.js';
import { audioController } from './components/audioController.js';
import { initOpeningScreen } from './screens/openingScreen.js';
import { initStoryScreen } from './screens/storyScreen.js';
import { initMapScreen } from './screens/mapScreen.js';
import { initGameplayPajajaranScreen } from './screens/gameplayPajajaran.js';
import { initJournalScreen, initAchievementScreen } from './screens/journalScreen.js';

class App {
  constructor() {
    this.leafCanvas = null;
  }

  init() {
    // 1. Initialize Canvas Background Particles
    this.leafCanvas = new LeafCanvas('leaf-canvas');

    // 2. Setup Navbar Events
    this.setupNavbar();

    // 3. Subscribe to App State Changes
    state.subscribe((s) => this.handleStateUpdate(s));

    // 4. Initialize Individual Screen Handlers
    initOpeningScreen();
    initStoryScreen();
    initMapScreen();

    // 5. Initial View Render
    this.handleStateUpdate(state);
  }

  setupNavbar() {
    // Brand click returns to Home
    document.getElementById('nav-brand')?.addEventListener('click', () => {
      audioController.playSfx('click');
      state.setScreen('opening');
    });

    // Nav Item Clicks
    const navMapBtn = document.getElementById('nav-btn-map');
    const navJournalBtn = document.getElementById('nav-btn-journal');
    const navBasaBtn = document.getElementById('nav-btn-basa');
    const navAchievementBtn = document.getElementById('nav-btn-achievement');

    navMapBtn?.addEventListener('click', () => {
      audioController.playSfx('click');
      state.setScreen('map');
    });

    navJournalBtn?.addEventListener('click', () => {
      audioController.playSfx('click');
      state.setScreen('journal');
    });

    navBasaBtn?.addEventListener('click', () => {
      audioController.playSfx('click');
      state.setScreen('journal');
    });

    navAchievementBtn?.addEventListener('click', () => {
      audioController.playSfx('click');
      state.setScreen('achievement');
    });

    // Audio Toggle
    const audioBtn = document.getElementById('btn-audio-toggle');
    audioBtn?.addEventListener('click', () => {
      const isMuted = state.toggleAudio();
      audioBtn.textContent = isMuted ? 'Audio Off' : 'Audio On';
      audioBtn.title = isMuted ? 'Suara Dimatikan' : 'Suara Diaktifkan';
    });
  }

  handleStateUpdate(s) {
    // A. Switch Active Screen View
    const screens = document.querySelectorAll('.screen-view');
    screens.forEach(screen => {
      const isTarget = screen.id === `screen-${s.currentScreen}`;
      if (isTarget) {
        screen.classList.add('active');
      } else {
        screen.classList.remove('active');
      }
    });

    // B. Navbar Visibility — hidden on opening, story, and gameplay (immersive screens)
    const navbar = document.getElementById('global-navbar');
    if (navbar) {
      const hideOnScreens = ['opening', 'story', 'gameplay'];
      if (hideOnScreens.includes(s.currentScreen)) {
        navbar.style.display = 'none';
      } else {
        navbar.style.display = 'flex';
      }
    }

    // C. Highlight Active Nav Button
    document.querySelectorAll('.nav-item-btn').forEach(btn => btn.classList.remove('active'));
    if (s.currentScreen === 'map') document.getElementById('nav-btn-map')?.classList.add('active');
    if (s.currentScreen === 'journal') document.getElementById('nav-btn-journal')?.classList.add('active');
    if (s.currentScreen === 'achievement') document.getElementById('nav-btn-achievement')?.classList.add('active');

    // D. Update XP Counter
    const xpText = document.getElementById('nav-xp-counter');
    if (xpText) xpText.textContent = `${s.playerXp} XP`;

    // E. Screen-specific view updates
    if (s.currentScreen === 'map') {
      initMapScreen();
    } else if (s.currentScreen === 'gameplay') {
      initGameplayPajajaranScreen();
    } else if (s.currentScreen === 'journal') {
      initJournalScreen();
    } else if (s.currentScreen === 'achievement') {
      initAchievementScreen();
    }
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
