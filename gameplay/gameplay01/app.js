// Game State
let gameState = {
  basa: 0,
  xp: 0,
  bab: "1/10",
  currentScreen: 1,
  selectedAnswer: null,
  quizAnswered: false,
  
  // New States for Part 2
  droppedItems: [],
  correctSayembaraItems: ["drag-item-1", "drag-item-2"], // 40 Putri Kembar, 1000 Kodi Mori
  sortOrder: [],
  correctSortOrder: ["sort-sungai", "sort-hutan", "sort-desa", "sort-persawahan"], // Sungai -> Hutan -> Desa -> Persawahan
  selectedSemadiAnswer: null,
  semadiAnswered: false
};

// Target elements
const statBasa = document.getElementById("stat-basa");
const statXp = document.getElementById("stat-xp");
const statusBar = document.getElementById("game-status-bar");
const btnQuizNext = document.getElementById("btn-quiz-next");
const quizFeedback = document.getElementById("quiz-feedback");

// Drag & Drop Elements
const sayembaraDropzone = document.getElementById("sayembara-dropzone");
const droppedContainer = document.getElementById("dropped-items");
const btnDdNext = document.getElementById("btn-dd-next");
const ddFeedback = document.getElementById("dd-feedback");

// Sorting Elements
const sortRack = document.getElementById("sort-rack");
const btnSortNext = document.getElementById("btn-sort-next");
const sortFeedback = document.getElementById("sort-feedback");

// Semadi Quiz Elements
const btnSemadiNext = document.getElementById("btn-semadi-next");
const semadiFeedback = document.getElementById("quiz-semadi-feedback");

// Screen transitions
function goToScreen(screenNumber) {
  // Hide all screens
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active-screen");
  });

  // Show active screen
  const targetScreen = document.getElementById(`screen-${screenNumber}`);
  if (targetScreen) {
    targetScreen.classList.add("active-screen");
    gameState.currentScreen = screenNumber;
  }

  // Manage visibility of status bar (only visible on gameplay/dialog screens)
  if (screenNumber === 1 || screenNumber === 2) {
    statusBar.style.display = "flex";
  } else {
    statusBar.style.display = "none";
  }

  // Track scroll position
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Simulated Speech Synthesis (Javanese & Indonesian text)
function simulateTTS(type) {
  let utteranceText = "";
  let langCode = "id-ID"; // fallback

  switch (type) {
    case 'dialog':
      utteranceText = "Prabu Siliwangi berkata: Angger Banyakcatra, apa sing dadi karepmu? Banyakcatra menjawab: Nyuwun pangestu, Rama. Kula badhe nglajengaken lampah.";
      break;
    case 'kula':
      utteranceText = "Kula. Artinya: Saya.";
      break;
    case 'nyuwun pangestu':
      utteranceText = "Nyuwun pangestu. Artinya: Memohon Restu.";
      break;
    case 'badhe':
      utteranceText = "Badhe. Artinya: Akan atau Hendak.";
      break;
    case 'rama':
      utteranceText = "Rama. Artinya: Ayah.";
      break;
    default:
      utteranceText = "Lelana Kamandaka.";
  }

  // Web Speech API
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const synth = new SpeechSynthesisUtterance(utteranceText);
    synth.lang = langCode;
    synth.rate = 0.9;
    window.speechSynthesis.speak(synth);
  } else {
    alert(`📢 Suara (Simulasi): "${utteranceText}"`);
  }
}

// Option Selection in Screen 4 (Quiz)
function selectOption(buttonElement) {
  if (gameState.quizAnswered) return;

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.classList.remove("selected-option");
  });

  buttonElement.classList.add("selected-option");
  gameState.selectedAnswer = buttonElement.getAttribute("data-option");
  btnQuizNext.classList.remove("disabled-btn");
}

// Submit Quiz Answer
function submitQuizAnswer() {
  if (gameState.quizAnswered) {
    goToScreen(5);
    return;
  }

  if (!gameState.selectedAnswer) return;

  const correctAnswer = "B";

  if (gameState.selectedAnswer === correctAnswer) {
    gameState.basa += 10;
    gameState.xp += 10;
    updateStats();

    quizFeedback.innerHTML = "✨ Benar! Poin Basa +10, XP +10";
    quizFeedback.className = "quiz-feedback-text correct-feedback";
    
    document.querySelectorAll(".option-btn").forEach(btn => {
      if (btn.getAttribute("data-option") === correctAnswer) {
        btn.classList.add("correct-option");
      }
    });
  } else {
    quizFeedback.innerHTML = "❌ Kurang tepat. Silakan coba lagi.";
    quizFeedback.className = "quiz-feedback-text wrong-feedback";

    document.querySelectorAll(".option-btn").forEach(btn => {
      if (btn.getAttribute("data-option") === gameState.selectedAnswer) {
        btn.classList.add("wrong-option");
      }
      if (btn.getAttribute("data-option") === correctAnswer) {
        btn.classList.add("correct-option");
      }
    });
  }

  gameState.quizAnswered = true;
  btnQuizNext.innerHTML = 'LANJUT <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M5 12h14M12 5l7 7-7 7"/></svg>';
}

// ================= DRAG & DROP LOGIC (SCREEN 6) =================

function allowDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.add("drag-hover");
}

function handleDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.target.classList.add("dragging");
}

document.addEventListener("dragend", (event) => {
  if (event.target.classList.contains("drag-card")) {
    event.target.classList.remove("dragging");
  }
  document.querySelectorAll(".dropzone-box, .slot-target").forEach(el => {
    el.classList.remove("drag-hover");
  });
});

function handleDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-hover");
  const itemId = event.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(itemId);

  if (draggedElement && !gameState.droppedItems.includes(itemId)) {
    moveCardToDropzone(draggedElement);
  }
}

// Click to move fallback for mobile/non-drag devices
function handleCardClick(cardElement) {
  const itemId = cardElement.id;
  if (!gameState.droppedItems.includes(itemId)) {
    moveCardToDropzone(cardElement);
  } else {
    // Return back to shelf
    const shelf = document.querySelector(".draggable-shelf");
    shelf.appendChild(cardElement);
    gameState.droppedItems = gameState.droppedItems.filter(id => id !== itemId);
    validateDragDropRequirements();
  }
}

function moveCardToDropzone(element) {
  const container = document.getElementById("dropped-items");
  container.appendChild(element);
  
  if (!gameState.droppedItems.includes(element.id)) {
    gameState.droppedItems.push(element.id);
  }

  // Hide placeholder if cards exist
  const placeholder = document.querySelector(".dropzone-placeholder-text");
  if (placeholder) placeholder.style.display = "none";

  validateDragDropRequirements();
}

function validateDragDropRequirements() {
  const hasCorrect = gameState.correctSayembaraItems.every(item => gameState.droppedItems.includes(item));
  const hasWrong = gameState.droppedItems.some(item => !gameState.correctSayembaraItems.includes(item));

  if (hasCorrect && !hasWrong) {
    btnDdNext.classList.remove("disabled-btn");
    ddFeedback.innerHTML = "✨ Syarat sayembara sangat tepat!";
    ddFeedback.className = "dd-feedback-text correct-feedback";
  } else if (gameState.droppedItems.length > 0) {
    btnDdNext.classList.add("disabled-btn");
    ddFeedback.innerHTML = "❌ Beberapa syarat belum sesuai sayembara Sang Prabu.";
    ddFeedback.className = "dd-feedback-text wrong-feedback";
  } else {
    btnDdNext.classList.add("disabled-btn");
    ddFeedback.innerHTML = "";
    const placeholder = document.querySelector(".dropzone-placeholder-text");
    if (placeholder) placeholder.style.display = "block";
  }
}

function submitDragDrop() {
  goToScreen(7);
}

// ================= SORTING LOGIC (SCREEN 8) =================

function handleSortDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function handleSortDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-hover");
  const cardId = event.dataTransfer.getData("text/plain");
  const cardElement = document.getElementById(cardId);
  const targetSlot = event.currentTarget;

  if (cardElement && targetSlot.children.length <= 1) {
    targetSlot.appendChild(cardElement);
  }
}

function handleSortClick(cardElement) {
  const slots = document.querySelectorAll(".slot-target");
  let placed = false;
  
  for (let slot of slots) {
    if (slot.children.length === 1) {
      slot.appendChild(cardElement);
      placed = true;
      break;
    }
  }

  if (!placed && cardElement.parentElement.classList.contains("slot-target")) {
    document.getElementById("sort-rack").appendChild(cardElement);
  }
}

function checkSortingOrder() {
  const slots = document.querySelectorAll(".slot-target");
  let currentOrder = [];
  let allFilled = true;

  slots.forEach(slot => {
    const card = slot.querySelector(".sort-card-item");
    if (card) {
      currentOrder.push(card.id);
    } else {
      allFilled = false;
    }
  });

  if (!allFilled) {
    sortFeedback.innerHTML = "⚠️ Harap isi semua slot urutan terlebih dahulu.";
    sortFeedback.className = "sort-feedback-text wrong-feedback";
    return;
  }

  const isCorrect = currentOrder.every((val, index) => val === gameState.correctSortOrder[index]);

  if (isCorrect) {
    gameState.xp += 15;
    updateStats();
    sortFeedback.innerHTML = "✨ Urutan perjalanan tepat! Poin XP +15.";
    sortFeedback.className = "sort-feedback-text correct-feedback";
    btnSortNext.classList.remove("disabled-btn");
  } else {
    sortFeedback.innerHTML = "❌ Urutan perjalanan kurang tepat. Silakan susun ulang.";
    sortFeedback.className = "sort-feedback-text wrong-feedback";
    btnSortNext.classList.add("disabled-btn");
  }
}

// ================= SEMADI KUIS LOGIC (SCREEN 10) =================

function selectSemadiOption(buttonElement) {
  if (gameState.semadiAnswered) return;

  document.querySelectorAll(".semadi-opt-btn").forEach(btn => {
    btn.classList.remove("semadi-selected");
  });

  buttonElement.classList.add("semadi-selected");
  gameState.selectedSemadiAnswer = buttonElement.getAttribute("data-option");
  btnSemadiNext.classList.remove("disabled-btn");
}

function submitSemadiAnswer() {
  if (gameState.semadiAnswered) {
    resetGame();
    return;
  }

  if (!gameState.selectedSemadiAnswer) return;

  const correctAnswer = "C";

  if (gameState.selectedSemadiAnswer === correctAnswer) {
    gameState.xp += 20;
    updateStats();

    semadiFeedback.innerHTML = "✨ Tepat sekali! Poin XP +20";
    semadiFeedback.className = "quiz-feedback-text correct-feedback";

    document.querySelectorAll(".semadi-opt-btn").forEach(btn => {
      if (btn.getAttribute("data-option") === correctAnswer) {
        btn.classList.add("semadi-correct");
      }
    });
  } else {
    semadiFeedback.innerHTML = "❌ Kurang tepat. Sang Raden bertapa untuk memohon petunjuk Dewata.";
    semadiFeedback.className = "quiz-feedback-text wrong-feedback";

    document.querySelectorAll(".semadi-opt-btn").forEach(btn => {
      if (btn.getAttribute("data-option") === gameState.selectedSemadiAnswer) {
        btn.classList.add("semadi-wrong");
      }
      if (btn.getAttribute("data-option") === correctAnswer) {
        btn.classList.add("semadi-correct");
      }
    });
  }

  gameState.semadiAnswered = true;
  btnSemadiNext.innerHTML = 'MULAI LAGI <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>';
}

// Update Stats display
function updateStats() {
  statBasa.textContent = gameState.basa;
  statXp.textContent = gameState.xp;
}

// Reset Game / Replay
function resetGame() {
  gameState.basa = 0;
  gameState.xp = 0;
  gameState.selectedAnswer = null;
  gameState.quizAnswered = false;
  
  // Reset Part 2
  gameState.droppedItems = [];
  gameState.selectedSemadiAnswer = null;
  gameState.semadiAnswered = false;

  updateStats();

  // Reset UIs
  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.classList.remove("selected-option", "correct-option", "wrong-option");
  });
  btnQuizNext.classList.add("disabled-btn");
  btnQuizNext.innerHTML = 'LANJUT <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M5 12h14M12 5l7 7-7 7"/></svg>';
  quizFeedback.innerHTML = "";
  quizFeedback.className = "quiz-feedback-text";

  // Reset Drag & Drop cards
  const shelf = document.querySelector(".draggable-shelf");
  document.querySelectorAll(".drag-card").forEach(card => {
    shelf.appendChild(card);
  });
  const placeholder = document.querySelector(".dropzone-placeholder-text");
  if (placeholder) placeholder.style.display = "block";
  btnDdNext.classList.add("disabled-btn");
  ddFeedback.innerHTML = "";

  // Reset Sorting cards
  const rack = document.getElementById("sort-rack");
  document.querySelectorAll(".sort-card-item").forEach(card => {
    rack.appendChild(card);
  });
  btnSortNext.classList.add("disabled-btn");
  sortFeedback.innerHTML = "";

  // Reset Semadi Quiz
  document.querySelectorAll(".semadi-opt-btn").forEach(btn => {
    btn.classList.remove("semadi-selected", "semadi-correct", "semadi-wrong");
  });
  btnSemadiNext.classList.add("disabled-btn");
  btnSemadiNext.innerHTML = 'SELESAI <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
  semadiFeedback.innerHTML = "";

  goToScreen(1);
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  goToScreen(1);
});
