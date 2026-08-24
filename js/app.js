/* ==========================================
   MAIN APPLICATION BOOTSTRAPPER & ROUTER
   ========================================== */

import { state } from './state.js';
import { LeafCanvas } from './components/leafCanvas.js';
import { Navbar } from './components/navbar.js';
import { initOpeningScreen } from './screens/openingScreen.js';
import { initStoryScreen } from './screens/storyScreen.js';
import { initMapScreen } from './screens/mapScreen.js';
import { initGameplayPajajaranScreen } from './screens/gameplayPajajaran.js';
import { initJournalScreen, initAchievementScreen, setJournalCategory } from './screens/journalScreen.js';

class App {
  constructor() {
    this.leafCanvas = null;
    this.navbar = null;
  }

  init() {
    // 1. Initialize Canvas Background Particles
    this.leafCanvas = new LeafCanvas('leaf-canvas');

    // 2. Mount the single reusable navbar instance
    this.navbar = new Navbar({
      onNavigate: (screen) => {
        this.journalCategory = 'all';
        if (screen === 'journal') setJournalCategory('all');
        state.setScreen(screen);
      },
      onBasa: () => {
        this.journalCategory = 'basa';
        setJournalCategory('basa');
        state.setScreen('journal');
      }
    });
    this.navbar.mount(document.getElementById('navbar-root'));
    this.navbar.setAudioToggle(() => state.toggleAudio());

    // 3. Subscribe to App State Changes
    state.subscribe((s) => this.handleStateUpdate(s));

    // 4. Initialize Individual Screen Handlers
    initOpeningScreen();
    initStoryScreen();
    initMapScreen();

    // 5. Initial View Render
    this.handleStateUpdate(state);
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
    this.navbar?.update(s, s.currentScreen === 'journal' && this.journalCategory === 'basa' ? 'basa' : s.currentScreen);

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
