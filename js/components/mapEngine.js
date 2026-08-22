/* ==========================================
   INTERACTIVE MAP & 10-LOCATION PIN ENGINE
   ========================================== */

import { LOCATIONS } from '../data/locationsData.js';
import { state } from '../state.js';
import { audioController } from './audioController.js';

export class MapEngine {
  constructor(mapWrapperId, previewCardId) {
    this.mapWrapper = document.getElementById(mapWrapperId);
    this.previewCard = document.getElementById(previewCardId);
    this.selectedLocation = null;

    state.subscribe(() => {
      this.renderPath();
      this.renderPins();
    });
  }

  init() {
    this.renderPath();
    this.renderPins();
  }

  // Convert a percentage string like '18%' to a pixel number within containerSize
  _pctToPx(pctStr, containerSize) {
    return (parseFloat(pctStr) / 100) * containerSize;
  }

  renderPath() {
    if (!this.mapWrapper) return;

    // Remove existing path SVG
    const existing = this.mapWrapper.querySelector('.map-path-svg');
    if (existing) existing.remove();

    const currentUnlocked = state.unlockedLocationIndex;

    // No route lines when everything is locked (initial state with index 0
    // means only Pajajaran is active — no completed segments yet to draw)
    if (currentUnlocked < 1) return;

    const W = this.mapWrapper.offsetWidth  || 1440;
    const H = this.mapWrapper.offsetHeight || 940;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('map-path-svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    // Draw a white dashed segment only for each completed pair of consecutive
    // locations (i.e. both endpoints have been reached / unlocked).
    // The route follows the LOCATIONS array order (index 0 → 1 → 2 → … → 9).
    for (let i = 0; i < LOCATIONS.length - 1; i++) {
      // Only draw the segment if the *destination* pin is unlocked
      if (LOCATIONS[i + 1].index > currentUnlocked) break;

      const from = LOCATIONS[i];
      const to   = LOCATIONS[i + 1];

      const x1 = this._pctToPx(from.coords.x, W);
      const y1 = this._pctToPx(from.coords.y, H);
      const x2 = this._pctToPx(to.coords.x,   W);
      const y2 = this._pctToPx(to.coords.y,    H);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      line.classList.add('map-path-segment');

      svg.appendChild(line);
    }

    // Insert behind pins (prepend)
    this.mapWrapper.prepend(svg);
  }

  renderPins() {
    if (!this.mapWrapper) return;

    // Clear existing pins
    this.mapWrapper.querySelectorAll('.map-pin-wrapper').forEach(p => p.remove());

    const currentUnlocked = state.unlockedLocationIndex;

    LOCATIONS.forEach((loc) => {
      const isCompleted = loc.index < currentUnlocked;
      const isActive    = loc.index === currentUnlocked;
      const isLocked    = loc.index > currentUnlocked;

      const stateClass = isCompleted ? 'completed' : isActive ? 'active' : 'locked';

      const wrapper = document.createElement('div');
      wrapper.className = `map-pin-wrapper ${stateClass}`;
      wrapper.style.left = loc.coords.x;
      wrapper.style.top  = loc.coords.y;

      // Icon: gembok.png for locked, location.png for active/completed
      const iconSrc = isLocked
        ? 'assets/icons/gembok.png'
        : 'assets/icons/location.png';

      wrapper.innerHTML = `
        <img src="${iconSrc}" class="pin-icon" alt="${loc.name}" draggable="false">
        <span class="pin-label">${loc.name}</span>
      `;

      wrapper.addEventListener('click', () => {
        if (audioController && typeof audioController.playSfx === 'function') {
          audioController.playSfx('click');
        }
        this.selectLocation(loc, !isLocked);
      });

      this.mapWrapper.appendChild(wrapper);
    });
  }

  selectLocation(loc, isAccessible) {
    this.selectedLocation = loc;

    // Highlight selected pin
    this.mapWrapper.querySelectorAll('.map-pin-wrapper').forEach(p => p.classList.remove('selected'));
    const allPins = this.mapWrapper.querySelectorAll('.map-pin-wrapper');
    allPins.forEach(p => {
      if (p.style.left === loc.coords.x && p.style.top === loc.coords.y) {
        p.classList.add('selected');
      }
    });

    if (this.previewCard) {
      this.previewCard.classList.add('show');
      const titleEl  = document.getElementById('preview-title');
      const numEl    = document.getElementById('preview-number');
      const descEl   = document.getElementById('preview-desc');
      const actionBtn = document.getElementById('btn-start-location');

      if (titleEl)  titleEl.textContent  = loc.title;
      if (numEl)    numEl.textContent    = `LOKASI ${loc.number} / 10`;
      if (descEl)   descEl.textContent   = loc.desc;

      if (actionBtn) {
        if (isAccessible) {
          actionBtn.disabled   = false;
          actionBtn.textContent = 'Mulai Petualangan →';
          actionBtn.className  = 'btn-primary';
          actionBtn.onclick    = () => {
            state.activeLocationId = loc.id;
            state.setScreen('gameplay');
          };
        } else {
          actionBtn.disabled   = true;
          actionBtn.textContent = 'Masih Terkunci';
          actionBtn.className  = 'btn-secondary';
          actionBtn.onclick    = null;
        }
      }
    }
  }
}
