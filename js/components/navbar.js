/* ==========================================
   REUSABLE HEADER NAVIGATION COMPONENT
   ========================================== */

import { audioController } from './audioController.js';

export class Navbar {
  constructor({ onNavigate, onBasa }) {
    this.onNavigate = onNavigate;
    this.onBasa = onBasa;
    this.element = null;
  }

  mount(container) {
    if (!container || this.element) return;

    container.innerHTML = `
      <nav id="global-navbar" class="global-navbar" aria-label="Navigasi utama">
        <button id="nav-brand" class="nav-brand" type="button">
          <span class="nav-brand-title">Lelana Kamandaka</span>
        </button>

        <ul class="nav-links">
          <li><button id="nav-btn-map" class="nav-item-btn" type="button">Peta</button></li>
          <li><button id="nav-btn-journal" class="nav-item-btn" type="button">Catatan</button></li>
          <li><button id="nav-btn-basa" class="nav-item-btn" type="button">Basa</button></li>
          <li><button id="nav-btn-achievement" class="nav-item-btn" type="button">Pencapaian</button></li>
        </ul>

        <div class="nav-actions">
          <span class="nav-xp-badge"><span id="nav-xp-counter">0 XP</span></span>
          <button id="btn-audio-toggle" class="audio-toggle-btn" type="button" title="Pengaturan Suara">Audio On</button>
        </div>
      </nav>
    `;

    this.element = container.querySelector('#global-navbar');
    this.bindEvents();
  }

  bindEvents() {
    const navigate = (screen) => {
      audioController.playSfx('click');
      this.onNavigate(screen);
    };

    this.element.querySelector('#nav-brand')?.addEventListener('click', () => navigate('opening'));
    this.element.querySelector('#nav-btn-map')?.addEventListener('click', () => navigate('map'));
    this.element.querySelector('#nav-btn-journal')?.addEventListener('click', () => navigate('journal'));
    this.element.querySelector('#nav-btn-basa')?.addEventListener('click', () => {
      audioController.playSfx('click');
      this.onBasa();
    });
    this.element.querySelector('#nav-btn-achievement')?.addEventListener('click', () => navigate('achievement'));

    this.element.querySelector('#btn-audio-toggle')?.addEventListener('click', (event) => {
      const isMuted = this.onAudioToggle();
      event.currentTarget.textContent = isMuted ? 'Audio Off' : 'Audio On';
      event.currentTarget.title = isMuted ? 'Suara Dimatikan' : 'Suara Diaktifkan';
    });
  }

  onAudioToggle() {
    return this.audioToggle ? this.audioToggle() : false;
  }

  setAudioToggle(handler) {
    this.audioToggle = handler;
  }

  update(state, activeItem = state.currentScreen) {
    if (!this.element) return;

    const hidden = ['opening', 'story', 'gameplay'].includes(state.currentScreen);
    this.element.hidden = hidden;
    this.element.querySelectorAll('.nav-item-btn').forEach((button) => {
      button.classList.toggle('active', button.id === `nav-btn-${activeItem}`);
    });
    const xpText = this.element.querySelector('#nav-xp-counter');
    if (xpText) xpText.textContent = `${state.playerXp} XP`;
  }
}