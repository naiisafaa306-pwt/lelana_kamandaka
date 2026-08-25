/* =========================================================
   GAMEPLAY 02 — KI AJAR WINARONG
   ========================================================= */

(() => {
  const screens = [...document.querySelectorAll(".story-screen")];

  const showScreen = (id) => {
    screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const safeClick = (id, handler) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", handler);
  };

  safeClick("btnBeginStory", () => showScreen("story-dialog"));

  safeClick("btnNextStory", () => showScreen("story-gameplay"));

  safeClick("btnStartGameplay", () => showScreen("story-learning-basa"));

  safeClick("btnStartQuizBasa", () => {
    resetQuiz();
    showScreen("story-quiz-basa");
  });

  safeClick("btnStartSayembara", () => {
    resetDragGame();
    showScreen("story-sayembara");
  });

  safeClick("btnNextSayembara", () => {
    updateReward(50, 10);
    showScreen("story-chapter-08");
  });

  safeClick("btnContinueChapter", () => {
    // Ganti tujuan ini kalau gameplay03 sudah dibuat.
    window.location.href = "../gameplay03/index.html";
  });

  /* =========================
     AUDIO / TEXT TO SPEECH
     ========================= */
  const dialogueText =
    "Yen kowe kepengin nemokake jodhomu, le, kudu gelem ninggalake uripmu minangka putra raja. Nyuwun pitutur, Ki Ajar. Kula siap nglakoni apa wae sing kedah kula lakoni.";

  safeClick("btnListen", () => {
    if (!("speechSynthesis" in window)) {
      alert("Browser ini belum mendukung fitur suara.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(dialogueText);
    utterance.lang = "id-ID";
    utterance.rate = 0.88;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  });

  window.speakBasa = function(text) {
    if (!("speechSynthesis" in window)) {
      alert("Browser ini belum mendukung fitur suara.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.78;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  /* =========================
     QUIZ BASA
     ========================= */
  const quizQuestions = [
    {
      question: 'Apa arti kata "Pitutur"?',
      answers: ["Nasihat / petuah", "Perjalanan", "Menyamar", "Saya"],
      correct: "Nasihat / petuah"
    },
    {
      question: 'Apa arti kata "Lampah"?',
      answers: ["Nama orang", "Perjalanan / langkah", "Nasihat", "Kerajaan"],
      correct: "Perjalanan / langkah"
    },
    {
      question: 'Apa arti kata "Nyamar"?',
      answers: ["Menyamar", "Berangkat", "Berbicara", "Menolong"],
      correct: "Menyamar"
    },
    {
      question: 'Apa arti kata "Kula"?',
      answers: ["Ayah", "Guru", "Saya", "Teman"],
      correct: "Saya"
    }
  ];

  let quizIndex = 0;
  let quizAnswered = false;

  const quizQuestion = document.getElementById("quizQuestion");
  const quizNumber = document.getElementById("quizQuestionNumber");
  const quizFill = document.getElementById("quizProgressFill");
  const quizFeedback = document.getElementById("quizFeedback");
  const btnNextQuiz = document.getElementById("btnNextQuiz");
  const quizOptions = [...document.querySelectorAll(".quiz-option")];

  function renderQuiz() {
    const item = quizQuestions[quizIndex];
    if (!item) return;

    quizAnswered = false;
    quizQuestion.textContent = item.question;
    quizNumber.textContent =
      `PERTANYAAN ${String(quizIndex + 1).padStart(2, "0")} / ${quizQuestions.length}`;
    quizFill.style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
    quizFeedback.textContent = "";
    quizFeedback.style.color = "";
    btnNextQuiz.disabled = true;
    btnNextQuiz.textContent =
      quizIndex === quizQuestions.length - 1 ? "SELESAI →" : "SOAL BERIKUTNYA →";

    quizOptions.forEach((button, i) => {
      button.classList.remove("selected", "correct", "wrong");
      button.disabled = false;
      const span = button.querySelector("span:last-child");
      if (span) span.textContent = item.answers[i];
      button.dataset.answer = item.answers[i];
    });
  }

  quizOptions.forEach(button => {
    button.addEventListener("click", () => {
      if (quizAnswered) return;

      quizAnswered = true;
      const chosen = button.dataset.answer;
      const correct = quizQuestions[quizIndex].correct;

      quizOptions.forEach(option => option.disabled = true);

      if (chosen === correct) {
        button.classList.add("correct");
        quizFeedback.textContent = "Benar! Jawabanmu tepat.";
        quizFeedback.style.color = "#3f713c";
        addXp(10);
      } else {
        button.classList.add("wrong");
        const correctButton = quizOptions.find(o => o.dataset.answer === correct);
        if (correctButton) correctButton.classList.add("correct");
        quizFeedback.textContent = `Belum tepat. Jawaban yang benar: ${correct}.`;
        quizFeedback.style.color = "#9b4d3f";
      }

      btnNextQuiz.disabled = false;
    });
  });

  safeClick("btnNextQuiz", () => {
    if (!quizAnswered) return;

    if (quizIndex < quizQuestions.length - 1) {
      quizIndex++;
      renderQuiz();
    } else {
      showScreen("story-sayembara-story");
    }
  });

  function resetQuiz() {
    quizIndex = 0;
    renderQuiz();
  }

  /* =========================
     DRAG & DROP
     ========================= */
  const dropzone = document.getElementById("sayembaraDropzone");
  const feedback = document.getElementById("sayembaraFeedback");
  const nextSayembara = document.getElementById("btnNextSayembara");
  const optionButtons = [...document.querySelectorAll(".sayembara-option")];

  const correctSteps = new Set(["pakaian", "rakyat", "nama", "pasirluhur"]);
  const selectedSteps = new Set();

  optionButtons.forEach(option => {
    option.addEventListener("dragstart", event => {
      event.dataTransfer.setData("text/plain", option.dataset.answer);
      option.classList.add("dragging");
    });

    option.addEventListener("dragend", () => option.classList.remove("dragging"));

    // Klik juga didukung agar game tetap nyaman di HP.
    option.addEventListener("click", () => {
      addDropItem(option.dataset.answer, option);
    });
  });

  if (dropzone) {
    dropzone.addEventListener("dragover", event => {
      event.preventDefault();
      dropzone.classList.add("dragover");
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("dragover");
    });

    dropzone.addEventListener("drop", event => {
      event.preventDefault();
      dropzone.classList.remove("dragover");
      const key = event.dataTransfer.getData("text/plain");
      const option = optionButtons.find(item => item.dataset.answer === key);
      addDropItem(key, option);
    });
  }

  function addDropItem(key, option) {
    if (!key || selectedSteps.has(key)) return;

    selectedSteps.add(key);
    if (option) option.classList.add("used");

    if (selectedSteps.size === 1) {
      dropzone.innerHTML = '<div class="dropped-items"></div>';
    }

    const holder = dropzone.querySelector(".dropped-items");
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "dropped-item";
    chip.dataset.answer = key;
    chip.textContent = labelFor(key);
    chip.title = "Klik untuk menghapus";

    chip.addEventListener("click", () => {
      selectedSteps.delete(key);
      if (option) option.classList.remove("used");
      chip.remove();

      if (selectedSteps.size === 0) {
        dropzone.innerHTML = `
          <div class="sayembara-dropzone-placeholder">
            <span>LETAKKAN LANGKAH</span>
            <strong>PERJALANAN</strong>
            <small>Tarik 4 langkah yang benar ke area ini</small>
          </div>`;
      }
      checkDragGame();
    });

    holder.appendChild(chip);
    checkDragGame();
  }

  function labelFor(key) {
    const labels = {
      pakaian: "Lepas pakaian kebesaran",
      rakyat: "Hidup sebagai rakyat",
      nama: "Nama Raden Kamandaka",
      pasirluhur: "Menuju Pasir Luhur",
      keraton: "Kembali ke keraton",
      mahkota: "Memakai mahkota raja",
      sayembara: "Mengadakan sayembara"
    };
    return labels[key] || key;
  }

  function checkDragGame() {
    const values = [...selectedSteps];

    if (values.length < 4) {
      feedback.textContent = `Pilih ${4 - values.length} langkah lagi.`;
      feedback.style.color = "#777660";
      nextSayembara.disabled = true;
      return;
    }

    const allCorrect =
      values.length === 4 && values.every(value => correctSteps.has(value));

    if (allCorrect) {
      feedback.textContent = "Benar! Kamu memahami petunjuk Ki Ajar Winarong.";
      feedback.style.color = "#3f713c";
      nextSayembara.disabled = false;
    } else {
      feedback.textContent = "Masih ada langkah yang keliru. Hapus pilihan yang salah lalu coba lagi.";
      feedback.style.color = "#9b4d3f";
      nextSayembara.disabled = true;
    }
  }

  function resetDragGame() {
    selectedSteps.clear();
    feedback.textContent = "";
    nextSayembara.disabled = true;

    optionButtons.forEach(option => {
      option.classList.remove("used");
    });

    dropzone.innerHTML = `
      <div class="sayembara-dropzone-placeholder">
        <span>LETAKKAN LANGKAH</span>
        <strong>PERJALANAN</strong>
        <small>Tarik 4 langkah yang benar ke area ini</small>
      </div>`;
  }

  /* =========================
     HUD
     ========================= */
  function getNumber(id) {
    const el = document.getElementById(id);
    return el ? Number(el.textContent) || 0 : 0;
  }

  function addXp(amount) {
    const el = document.getElementById("hudXp");
    if (el) el.textContent = getNumber("hudXp") + amount;
  }

  function addBasa(amount) {
    const el = document.getElementById("hudBasa");
    if (el) el.textContent = getNumber("hudBasa") + amount;
  }

  function updateReward(xp, basa) {
    addXp(xp);
    addBasa(basa);
    const xpReward = document.getElementById("chapterXpReward");
    const basaReward = document.getElementById("chapterBasaReward");
    if (xpReward) xpReward.textContent = `+${xp} XP`;
    if (basaReward) basaReward.textContent = `+${basa} BASA`;
  }

  resetQuiz();
})();
