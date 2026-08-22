/* ==========================================
   SCREEN 06 — CATATAN LELANA & JOURNAL CONTROLLER
   ========================================== */

import { state } from '../state.js';
import { audioController } from '../components/audioController.js';

export function initJournalScreen() {
  const container = document.getElementById('journal-vocab-grid');
  const tabs = document.querySelectorAll('#journal-tab-group .tab-btn');
  let currentCategory = 'all';

  function renderVocabCards() {
    if (!container) return;
    container.innerHTML = '';

    const list = state.collectedVocab.filter(v => v.discovered);
    const filtered = currentCategory === 'all' ? list : list.filter(v => v.category === currentCategory);

    if (filtered.length === 0) {
      container.innerHTML = `<div style="color: var(--color-parchment); text-align: center; grid-column: 1/-1; padding: 32px;">Belum ada kosakata yang ditemukan dalam kategori ini. Lanjutkan petualanganmu!</div>`;
      return;
    }

    filtered.forEach(v => {
      const card = document.createElement('div');
      card.className = 'vocab-card';
      card.innerHTML = `
        <div class="vocab-header">
          <div class="vocab-word">${v.word}</div>
          <span class="vocab-type-badge">${v.type || 'Basa'}</span>
        </div>
        <div class="vocab-meaning">${v.meaning}</div>
        <div class="vocab-sentence">"${v.sentence}"</div>
        <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
          <button class="audio-btn">
            Dengar Audio
          </button>
        </div>
      `;

      card.querySelector('.audio-btn')?.addEventListener('click', () => {
        audioController.playSfx('success');
      });

      container.appendChild(card);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      audioController.playSfx('click');
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category || 'all';
      renderVocabCards();
    });
  });

  renderVocabCards();
}

export function initAchievementScreen() {
  const progressFill = document.getElementById('achievement-progress-fill');
  const locationCountEl = document.getElementById('achievement-location-count');
  const xpCountEl = document.getElementById('achievement-xp-count');
  const badgeGrid = document.getElementById('achievement-badge-grid');

  const unlockedCount = state.unlockedLocationIndex;
  const totalLocations = 10;
  const percent = Math.min(100, Math.round(((unlockedCount + 1) / totalLocations) * 100));

  if (progressFill) progressFill.style.width = `${percent}%`;
  if (locationCountEl) locationCountEl.textContent = `${unlockedCount + 1} / 10`;
  if (xpCountEl) xpCountEl.textContent = `${state.playerXp} XP`;

  const badges = [
    { name: 'Pengembara Muda', desc: 'Memulai perjalanan di Pajajaran', unlocked: unlockedCount >= 0 },
    { name: 'Murid Winarong', desc: 'Menuntut ilmu di Ki Ajar Winarong', unlocked: unlockedCount >= 1 },
    { name: 'Penjelajah Pasir Luhur', desc: 'Mencapai Kadipaten Pasir Luhur', unlocked: unlockedCount >= 2 },
    { name: 'Sahabat Logawa', desc: 'Menguasai dialog di Kali Logawa', unlocked: unlockedCount >= 3 },
    { name: 'Ksatria Banyumas', desc: 'Menyelesaikan seluruh 10 lokasi pengembaraan', unlocked: unlockedCount >= 9 }
  ];

  if (badgeGrid) {
    badgeGrid.innerHTML = '';
    badges.forEach(b => {
      const card = document.createElement('div');
      card.className = `badge-card ${b.unlocked ? 'unlocked' : ''}`;
      card.innerHTML = `
        <div class="badge-name">${b.name}</div>
        <div class="badge-desc">${b.desc}</div>
      `;
      badgeGrid.appendChild(card);
    });
  }
}
