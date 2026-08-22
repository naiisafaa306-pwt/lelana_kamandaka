/* ==========================================
   SCREEN 02 — STORY INTRO CONTROLLER
   ========================================== */

import { state } from '../state.js';
import { audioController } from '../components/audioController.js';

const INTRO_SLIDES = [
  {
    illustration: 'assets/images/bg_kamandaka_intro.png',
    text: 'Di antara kehidupan istana, hiduplah Raden Kamandaka, seorang pemuda yang kelak membawa takdirnya menuju sebuah perjalanan panjang...'
  },
  {
    illustration: 'assets/images/bg_pajajaran.png',
    text: 'Sebuah keputusan membawanya meninggalkan tanah Pajajaran. Langkah demi langkah, Kamandaka menyusuri jalan menuju tempat yang belum ia kenal...'
  },
  {
    illustration: 'assets/images/bg_forest_hero.png',
    text: 'Pengembaraan ini bukan sekadar melintasi hutan dan sungai, melainkan menyatu dengan kehangatan <span class="basa-word-highlight">Basa Banyumasan</span> dan budayanya.'
  }
];

export function initStoryScreen() {
  let currentSlide = 0;

  const textEl       = document.getElementById('story-text-body');
  const illustImg    = document.getElementById('story-illustration-img');
  const nextBtn      = document.getElementById('btn-story-next');
  const skipBtn      = document.getElementById('btn-story-skip');

  function renderSlide(index) {
    const slide = INTRO_SLIDES[index];
    if (!slide) return;

    // Fade image out, swap src, fade back in
    if (illustImg) {
      illustImg.classList.add('fade-out');
      setTimeout(() => {
        illustImg.src = slide.illustration;
        illustImg.classList.remove('fade-out');
      }, 200);
    }

    if (textEl) textEl.innerHTML = slide.text;

    // Update button label on last slide
    if (nextBtn) {
      nextBtn.textContent = index < INTRO_SLIDES.length - 1
        ? 'LANJUT \u00a0\u2192'
        : 'MULAI PETUALANGAN \u00a0\u2192';
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      audioController.playSfx('click');
      if (currentSlide < INTRO_SLIDES.length - 1) {
        currentSlide++;
        renderSlide(currentSlide);
      } else {
        state.setScreen('map');
      }
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      audioController.playSfx('click');
      state.setScreen('map');
    });
  }

  renderSlide(0);
}
