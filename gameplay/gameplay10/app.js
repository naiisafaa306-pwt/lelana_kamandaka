/* ============================================================
   LELANA KAMANDAKA
   GAMEPLAY 10 — DESA ROSARI
   FINAL BASA CHALLENGE

   VERSI FINAL

   ALUR:
   OPENING
      ↓
   TAHAP 01 — KOSAKATA
      ↓
   TAHAP 02 — UNGGAH-UNGGUH
      ↓
   TAHAP 03 — KATA KERJA
      ↓
   TAHAP 04 — SUSUN KALIMAT
      ↓
   TAHAP 05 — PEMAHAMAN
      ↓
   FINISH

   ATURAN JAWABAN:
   - Jawaban benar  → terkunci → LANJUT aktif
   - Jawaban salah  → terkunci → LANJUT tetap aktif
   - Setelah memilih jawaban, tidak boleh mengganti jawaban
   - Tidak ada retry pada pertanyaan
   - Reload halaman selalu kembali ke OPENING
   ============================================================ */


/* ============================================================
   01. STRICT MODE
   ============================================================ */

"use strict";


/* ============================================================
   02. GAME CONFIGURATION
   ============================================================ */

const GAMEPLAY_LEVEL = 10;

const GAMEPLAY_NAME = "Desa Rosari";

const GAMEPLAY_TYPE = "Final Basa Challenge";

const GAMEPLAY_TOTAL_STAGES = 5;

const GAMEPLAY_XP_REWARD = 100;

const GAMEPLAY_BASA_REWARD = 25;


/* ============================================================
   03. SCREEN CONFIGURATION
   ============================================================ */

const SCREEN_OPENING = "screen01";

const SCREEN_STAGE_01 = "screen02";

const SCREEN_STAGE_02 = "screen03";

const SCREEN_STAGE_03 = "screen04";

const SCREEN_STAGE_04 = "screen05";

const SCREEN_STAGE_05 = "screen06";

const SCREEN_FINISH = "screen07";


/* ============================================================
   04. DOM READY
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    initializeGameplay();

});


/* ============================================================
   05. MAIN INITIALIZATION
   ============================================================ */

function initializeGameplay() {

    /*
       PENTING:

       Kita SENGAJA tidak membaca screen dari localStorage.

       Jadi kalau sebelumnya user berhenti di:
       - Tahap 02
       - Tahap 03
       - Tahap 04
       - Tahap 05
       - Finish

       lalu halaman di-refresh,

       halaman akan selalu kembali ke:

       SCREEN 01 — OPENING
    */

    forceOpeningScreen();


    /*
       Inisialisasi semua bagian gameplay.
    */

    setupOpeningButton();

    setupVocabularyQuestion();

    setupUnggahQuestion();

    setupVerbQuestion();

    setupSentenceQuestion();

    setupDialogQuestion();

    setupFinishButton();

    initializePlayerHUD();

    updateJourneyProgress(1);

}


/* ============================================================
   06. FORCE OPENING SCREEN
   ============================================================ */

function forceOpeningScreen() {

    const screens = document.querySelectorAll(".game-screen");

    if (!screens || screens.length === 0) {

        console.error(
            "Gameplay 10: Tidak ditemukan .game-screen"
        );

        return;

    }


    /*
       Hapus active dari SEMUA screen.
    */

    screens.forEach(function (screen) {

        screen.classList.remove("active");

    });


    /*
       Tampilkan opening.
    */

    const openingScreen = document.getElementById(
        SCREEN_OPENING
    );


    if (openingScreen) {

        openingScreen.classList.add("active");

    }


    /*
       Pastikan screen lain benar-benar tersembunyi
       jika CSS project memiliki konflik.
    */

    screens.forEach(function (screen) {

        if (screen.id !== SCREEN_OPENING) {

            screen.classList.remove("active");

        }

    });

}


/* ============================================================
   07. GENERIC SCREEN SWITCHER
   ============================================================ */

function showScreen(screenId, journeyStage) {

    const screens = document.querySelectorAll(".game-screen");


    if (!screens || screens.length === 0) {

        return;

    }


    /*
       Nonaktifkan semua screen.
    */

    screens.forEach(function (screen) {

        screen.classList.remove("active");

    });


    /*
       Cari screen tujuan.
    */

    const targetScreen = document.getElementById(screenId);


    if (!targetScreen) {

        console.error(
            "Gameplay 10: Screen tidak ditemukan:",
            screenId
        );

        return;

    }


    /*
       Aktifkan screen tujuan.
    */

    targetScreen.classList.add("active");


    /*
       Update nomor perjalanan.
    */

    if (
        typeof journeyStage === "number" &&
        journeyStage >= 1 &&
        journeyStage <= GAMEPLAY_TOTAL_STAGES
    ) {

        updateJourneyProgress(journeyStage);

    }


    /*
       Scroll kembali ke atas.
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ============================================================
   08. JOURNEY PROGRESS
   ============================================================ */

function updateJourneyProgress(stage) {

    const journeyProgress = document.getElementById(
        "journeyProgress"
    );


    if (!journeyProgress) {

        return;

    }


    const formattedStage = String(stage).padStart(2, "0");

    const formattedTotal = String(
        GAMEPLAY_TOTAL_STAGES
    ).padStart(2, "0");


    journeyProgress.textContent =
        formattedStage + " / " + formattedTotal;

}


/* ============================================================
   09. OPENING BUTTON
   ============================================================ */

function setupOpeningButton() {

    const startButton = document.getElementById(
        "startJourneyButton"
    );


    if (!startButton) {

        console.warn(
            "Gameplay 10: startJourneyButton tidak ditemukan."
        );

        return;

    }


    /*
       Hindari event listener dobel.
    */

    startButton.addEventListener("click", function () {

        /*
           Mulai dari Tahap 01.
        */

        resetStageOne();

        showScreen(
            SCREEN_STAGE_01,
            1
        );

    });

}


/* ============================================================
   10. STAGE ONE RESET
   ============================================================ */

function resetStageOne() {

    const options = document.querySelectorAll(
        '.quiz-option[data-question="vocabulary"]'
    );


    options.forEach(function (option) {

        option.disabled = false;

        option.classList.remove(
            "selected",
            "correct",
            "wrong",
            "answered"
        );

    });


    const feedback = document.getElementById(
        "feedbackVocabulary"
    );


    if (feedback) {

        feedback.textContent = "";

        feedback.className = "quiz-feedback";

    }


    const nextButton = document.getElementById(
        "nextVocabulary"
    );


    if (nextButton) {

        nextButton.disabled = true;

    }

}


/* ============================================================
   11. GENERIC QUIZ LOCK FUNCTION
   ============================================================ */

function lockQuizOptions(
    questionName,
    selectedOption
) {

    const options = document.querySelectorAll(
        '.quiz-option[data-question="' +
        questionName +
        '"]'
    );


    options.forEach(function (option) {

        /*
           SEMUA pilihan dikunci.

           Ini bagian penting agar setelah salah,
           user tidak bisa memilih jawaban lain.
        */

        option.disabled = true;


        /*
           Tambahkan class answered.
        */

        option.classList.add("answered");

    });


    /*
       Tandai pilihan yang dipilih.
    */

    if (selectedOption) {

        selectedOption.classList.add("selected");

    }

}


/* ============================================================
   12. VOCABULARY QUESTION
   ============================================================ */

function setupVocabularyQuestion() {

    const options = document.querySelectorAll(
        '.quiz-option[data-question="vocabulary"]'
    );


    const feedback = document.getElementById(
        "feedbackVocabulary"
    );


    const nextButton = document.getElementById(
        "nextVocabulary"
    );


    if (!options.length) {

        return;

    }


    if (!nextButton) {

        return;

    }


    /*
       Pastikan awalnya disabled.
    */

    nextButton.disabled = true;


    options.forEach(function (option) {

        option.addEventListener("click", function () {

            /*
               Jika sudah pernah dijawab,
               jangan izinkan klik lagi.
            */

            if (option.disabled) {

                return;

            }


            /*
               Kunci SEMUA pilihan.
            */

            lockQuizOptions(
                "vocabulary",
                option
            );


            const answer =
                option.dataset.answer;


            if (answer === "correct") {

                /*
                   Jawaban BENAR.
                */

                option.classList.add("correct");


                if (feedback) {

                    feedback.textContent =
                        "Jawabanmu bener! Omah tegese rumah.";

                    feedback.classList.add(
                        "is-correct"
                    );

                }

            } else {

                /*
                   Jawaban SALAH.

                   Tidak mencari jawaban lain.
                   Tidak membuka pilihan lain.
                */

                option.classList.add("wrong");


                if (feedback) {

                    feedback.textContent =
                        "Jawabanmu durung bener.";

                    feedback.classList.add(
                        "is-wrong"
                    );

                }

            }


            /*
               PENTING:

               Baik BENAR maupun SALAH,
               tombol LANJUT selalu aktif.
            */

            nextButton.disabled = false;

        });

    });


    /*
       Tombol lanjut tahap 01.
    */

    nextButton.addEventListener("click", function () {

        if (nextButton.disabled) {

            return;

        }


        resetStageTwo();


        showScreen(
            SCREEN_STAGE_02,
            2
        );

    });

}


/* ============================================================
   13. STAGE TWO RESET
   ============================================================ */

function resetStageTwo() {

    const options = document.querySelectorAll(
        '.quiz-option[data-question="unggah"]'
    );


    options.forEach(function (option) {

        option.disabled = false;

        option.classList.remove(
            "selected",
            "correct",
            "wrong",
            "answered"
        );

    });


    const feedback = document.getElementById(
        "feedbackUnggah"
    );


    if (feedback) {

        feedback.textContent = "";

        feedback.className = "quiz-feedback";

    }


    const nextButton = document.getElementById(
        "nextUnggah"
    );


    if (nextButton) {

        nextButton.disabled = true;

    }

}


/* ============================================================
   14. UNGGAH-UNGGUH QUESTION
   ============================================================ */

function setupUnggahQuestion() {

    const options = document.querySelectorAll(
        '.quiz-option[data-question="unggah"]'
    );


    const feedback = document.getElementById(
        "feedbackUnggah"
    );


    const nextButton = document.getElementById(
        "nextUnggah"
    );


    if (!options.length || !nextButton) {

        return;

    }


    nextButton.disabled = true;


    options.forEach(function (option) {

        option.addEventListener("click", function () {

            /*
               Jangan izinkan perubahan jawaban.
            */

            if (option.disabled) {

                return;

            }


            /*
               Kunci semua pilihan.
            */

            lockQuizOptions(
                "unggah",
                option
            );


            const answer =
                option.dataset.answer;


            if (answer === "correct") {

                option.classList.add("correct");


                if (feedback) {

                    feedback.textContent =
                        "Bener! Kanggo wong sing luwih tuwa, nggunakake basa krama luwih trep.";

                    feedback.classList.add(
                        "is-correct"
                    );

                }

            } else {

                option.classList.add("wrong");


                if (feedback) {

                    feedback.textContent =
                        "Jawabanmu durung bener.";

                    feedback.classList.add(
                        "is-wrong"
                    );

                }

            }


            /*
               Salah ataupun benar:
               LANJUT tetap bisa ditekan.
            */

            nextButton.disabled = false;

        });

    });


    nextButton.addEventListener("click", function () {

        if (nextButton.disabled) {

            return;

        }


        resetStageThree();


        showScreen(
            SCREEN_STAGE_03,
            3
        );

    });

}


/* ============================================================
   15. STAGE THREE RESET
   ============================================================ */

function resetStageThree() {

    const options = document.querySelectorAll(
        '.quiz-option[data-question="verb"]'
    );


    options.forEach(function (option) {

        option.disabled = false;

        option.classList.remove(
            "selected",
            "correct",
            "wrong",
            "answered"
        );

    });


    const feedback = document.getElementById(
        "feedbackVerb"
    );


    if (feedback) {

        feedback.textContent = "";

        feedback.className = "quiz-feedback";

    }


    const nextButton = document.getElementById(
        "nextVerb"
    );


    if (nextButton) {

        nextButton.disabled = true;

    }

}


/* ============================================================
   16. VERB QUESTION
   ============================================================ */

function setupVerbQuestion() {

    const options = document.querySelectorAll(
        '.quiz-option[data-question="verb"]'
    );


    const feedback = document.getElementById(
        "feedbackVerb"
    );


    const nextButton = document.getElementById(
        "nextVerb"
    );


    if (!options.length || !nextButton) {

        return;

    }


    nextButton.disabled = true;


    options.forEach(function (option) {

        option.addEventListener("click", function () {

            /*
               Jangan izinkan memilih lagi.
            */

            if (option.disabled) {

                return;

            }


            lockQuizOptions(
                "verb",
                option
            );


            const answer =
                option.dataset.answer;


            if (answer === "correct") {

                option.classList.add("correct");


                if (feedback) {

                    feedback.textContent =
                        "Bener! Mlaku artine berjalan.";

                    feedback.classList.add(
                        "is-correct"
                    );

                }

            } else {

                option.classList.add("wrong");


                if (feedback) {

                    feedback.textContent =
                        "Jawabanmu durung bener.";

                    feedback.classList.add(
                        "is-wrong"
                    );

                }

            }


            /*
               Tetap aktif meskipun salah.
            */

            nextButton.disabled = false;

        });

    });


    nextButton.addEventListener("click", function () {

        if (nextButton.disabled) {

            return;

        }


        resetSentenceStage();


        showScreen(
            SCREEN_STAGE_04,
            4
        );

    });

}


/* ============================================================
   17. SENTENCE STAGE VARIABLES
   ============================================================ */

let sentenceSelectedWords = [];

let sentenceAlreadyChecked = false;


/* ============================================================
   18. RESET SENTENCE STAGE
   ============================================================ */

function resetSentenceStage() {

    sentenceSelectedWords = [];

    sentenceAlreadyChecked = false;


    const wordButtons = document.querySelectorAll(
        ".sentence-word"
    );


    wordButtons.forEach(function (button) {

        button.disabled = false;

        button.classList.remove(
            "selected",
            "used",
            "answered"
        );

    });


    const answerArea = document.getElementById(
        "sentenceAnswer"
    );


    if (answerArea) {

        answerArea.textContent = "";

    }


    const result = document.getElementById(
        "sentenceResult"
    );


    if (result) {

        result.textContent =
            "Pilih tembung kanthi urutan sing bener.";

        result.className = "sentence-result";

    }


    const feedback = document.getElementById(
        "feedbackSentence"
    );


    if (feedback) {

        feedback.textContent = "";

        feedback.className = "quiz-feedback";

    }


    const checkButton = document.getElementById(
        "checkSentence"
    );


    if (checkButton) {

        checkButton.disabled = true;

        /*
           Kembalikan teks tombol.
        */

        const spans =
            checkButton.querySelectorAll("span");


        if (spans.length > 0) {

            spans[0].textContent =
                "PERIKSA JAWABAN";

        }

    }

}


/* ============================================================
   19. SENTENCE QUESTION
   ============================================================ */

function setupSentenceQuestion() {

    const wordButtons = document.querySelectorAll(
        ".sentence-word"
    );


    const answerArea = document.getElementById(
        "sentenceAnswer"
    );


    const checkButton = document.getElementById(
        "checkSentence"
    );


    const resetButton = document.getElementById(
        "resetSentence"
    );


    if (!wordButtons.length) {

        return;

    }


    /*
       Klik kata.
    */

    wordButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            /*
               Kalau sudah diperiksa,
               tidak boleh memilih lagi.
            */

            if (sentenceAlreadyChecked) {

                return;

            }


            /*
               Kalau tombol sudah disabled,
               jangan lakukan apa-apa.
            */

            if (button.disabled) {

                return;

            }


            const word =
                button.dataset.word;


            if (!word) {

                return;

            }


            /*
               Tambahkan kata ke urutan.
            */

            sentenceSelectedWords.push(word);


            /*
               Tandai tombol sudah dipakai.
            */

            button.disabled = true;

            button.classList.add("selected");

            button.classList.add("used");


            /*
               Tampilkan urutan jawaban.
            */

            if (answerArea) {

                answerArea.textContent =
                    sentenceSelectedWords.join(" ");

            }


            /*
               Jika semua kata sudah dipilih,
               aktifkan tombol periksa.
            */

            if (
                sentenceSelectedWords.length ===
                wordButtons.length
            ) {

                if (checkButton) {

                    checkButton.disabled = false;

                }

            }

        });

    });


    /*
       Tombol ULANGI.

       Tombol ini hanya untuk sebelum jawaban
       diperiksa.
    */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                /*
                   Kalau sudah diperiksa,
                   jangan izinkan reset.

                   Karena aturan gameplay:
                   satu pertanyaan = satu kesempatan.
                */

                if (sentenceAlreadyChecked) {

                    return;

                }


                resetSentenceStage();

            }
        );

    }


    /*
       Tombol PERIKSA JAWABAN.
    */

    if (checkButton) {

        checkButton.addEventListener(
            "click",
            function () {

                /*
                   Kalau sudah diperiksa,
                   tombol sekarang berfungsi sebagai LANJUT.
                */

                if (sentenceAlreadyChecked) {

                    showScreen(
                        SCREEN_STAGE_05,
                        5
                    );

                    resetStageFive();

                    return;

                }


                /*
                   Belum lengkap?
                   Jangan periksa.
                */

                if (
                    sentenceSelectedWords.length !==
                    wordButtons.length
                ) {

                    return;

                }


                /*
                   Kunci tahap ini.
                */

                sentenceAlreadyChecked = true;


                wordButtons.forEach(
                    function (button) {

                        button.disabled = true;

                        button.classList.add(
                            "answered"
                        );

                    }
                );


                /*
                   Jawaban yang benar:
                   
                   Kamandaka
                   mlaku
                   menyang
                   Pasir Luhur
                */

                const correctOrder = [
                    "Kamandaka",
                    "mlaku",
                    "menyang",
                    "Pasir Luhur"
                ];


                const isCorrect =
                    compareSentence(
                        sentenceSelectedWords,
                        correctOrder
                    );


                const feedback =
                    document.getElementById(
                        "feedbackSentence"
                    );


                const result =
                    document.getElementById(
                        "sentenceResult"
                    );


                if (isCorrect) {

                    /*
                       BENAR
                    */

                    if (result) {

                        result.textContent =
                            "Ukara wis bener.";

                        result.classList.add(
                            "is-correct"
                        );

                    }


                    if (feedback) {

                        feedback.textContent =
                            "Bener! Ukara: Kamandaka mlaku menyang Pasir Luhur.";

                        feedback.classList.add(
                            "is-correct"
                        );

                    }

                } else {

                    /*
                       SALAH

                       Tidak boleh memilih ulang.
                    */

                    if (result) {

                        result.textContent =
                            "Urutan jawabanmu durung bener.";

                        result.classList.add(
                            "is-wrong"
                        );

                    }


                    if (feedback) {

                        feedback.textContent =
                            "Jawabanmu durung bener, nanging kowe bisa lanjut menyang tahap sabanjure.";

                        feedback.classList.add(
                            "is-wrong"
                        );

                    }

                }


                /*
                   Setelah diperiksa,
                   tombol berubah menjadi LANJUT.
                */

                const spans =
                    checkButton.querySelectorAll(
                        "span"
                    );


                if (spans.length > 0) {

                    spans[0].textContent =
                        "LANJUT";

                }


                /*
                   Aktifkan tombol.

                   BENAR  → aktif
                   SALAH  → aktif
                */

                checkButton.disabled = false;

            }
        );

    }

}


/* ============================================================
   20. SENTENCE COMPARISON
   ============================================================ */

function compareSentence(
    selected,
    correct
) {

    if (!Array.isArray(selected)) {

        return false;

    }


    if (!Array.isArray(correct)) {

        return false;

    }


    if (selected.length !== correct.length) {

        return false;

    }


    for (
        let index = 0;
        index < correct.length;
        index++
    ) {

        if (
            selected[index] !==
            correct[index]
        ) {

            return false;

        }

    }


    return true;

}


/* ============================================================
   21. STAGE FIVE RESET
   ============================================================ */

function resetStageFive() {

    const options = document.querySelectorAll(
        '.quiz-option[data-question="dialog"]'
    );


    options.forEach(function (option) {

        option.disabled = false;

        option.classList.remove(
            "selected",
            "correct",
            "wrong",
            "answered"
        );

    });


    const feedback = document.getElementById(
        "feedbackDialog"
    );


    if (feedback) {

        feedback.textContent = "";

        feedback.className = "quiz-feedback";

    }


    const finishButton =
        document.getElementById(
            "finishChallenge"
        );


    if (finishButton) {

        finishButton.disabled = true;

    }

}


/* ============================================================
   22. DIALOG QUESTION
   ============================================================ */

function setupDialogQuestion() {

    const options = document.querySelectorAll(
        '.quiz-option[data-question="dialog"]'
    );


    const feedback = document.getElementById(
        "feedbackDialog"
    );


    const finishButton =
        document.getElementById(
            "finishChallenge"
        );


    if (!options.length || !finishButton) {

        return;

    }


    finishButton.disabled = true;


    options.forEach(function (option) {

        option.addEventListener("click", function () {

            /*
               Tidak boleh memilih lagi.
            */

            if (option.disabled) {

                return;

            }


            /*
               Kunci semua pilihan.
            */

            lockQuizOptions(
                "dialog",
                option
            );


            const answer =
                option.dataset.answer;


            if (answer === "correct") {

                option.classList.add("correct");


                if (feedback) {

                    feedback.textContent =
                        "Bener! Wong tuwa mendoakan lan ngelingake Kamandaka supaya ati-ati.";

                    feedback.classList.add(
                        "is-correct"
                    );

                }

            } else {

                option.classList.add("wrong");


                if (feedback) {

                    feedback.textContent =
                        "Jawabanmu durung bener.";

                    feedback.classList.add(
                        "is-wrong"
                    );

                }

            }


            /*
               Tahap terakhir:
               tombol selesai selalu aktif,
               baik benar maupun salah.
            */

            finishButton.disabled = false;

        });

    });


    /*
       Tombol selesai.
    */

    finishButton.addEventListener(
        "click",
        function () {

            if (finishButton.disabled) {

                return;

            }


            completeGameplay();

        }
    );

}


/* ============================================================
   23. COMPLETE GAMEPLAY
   ============================================================ */

function completeGameplay() {

    /*
       Tampilkan finish.
    */

    showScreen(
        SCREEN_FINISH,
        GAMEPLAY_TOTAL_STAGES
    );


    /*
       Update reward.
    */

    updateRewardDisplay();


    /*
       Berikan reward hanya satu kali.
    */

    grantGameplayReward();

}


/* ============================================================
   24. REWARD DISPLAY
   ============================================================ */

function updateRewardDisplay() {

    const rewardXp =
        document.getElementById(
            "gameplayRewardXp"
        );


    if (rewardXp) {

        rewardXp.textContent =
            "+" +
            GAMEPLAY_XP_REWARD +
            " XP";

    }

}


/* ============================================================
   25. REWARD STORAGE KEY
   ============================================================ */

const REWARD_STORAGE_KEY =
    "lelana_kamandaka_gameplay10_rewarded";


/* ============================================================
   26. GET NUMBER FROM STORAGE
   ============================================================ */

function getStoredNumber(
    key,
    fallback
) {

    const raw =
        localStorage.getItem(key);


    if (raw === null) {

        return fallback;

    }


    const number =
        Number(raw);


    if (Number.isNaN(number)) {

        return fallback;

    }


    return number;

}


/* ============================================================
   27. SET NUMBER TO STORAGE
   ============================================================ */

function setStoredNumber(
    key,
    value
) {

    try {

        localStorage.setItem(
            key,
            String(value)
        );

    } catch (error) {

        console.warn(
            "Tidak dapat menyimpan data:",
            error
        );

    }

}


/* ============================================================
   28. GRANT GAMEPLAY REWARD
   ============================================================ */

function grantGameplayReward() {

    /*
       Cek apakah Gameplay 10 sudah pernah memberikan reward.
    */

    const alreadyRewarded =
        localStorage.getItem(
            REWARD_STORAGE_KEY
        );


    if (alreadyRewarded === "true") {

        /*
           Jangan tambahkan reward dua kali.
        */

        updatePlayerHUD();

        return;

    }


    /*
       Ambil XP saat ini.
    */

    let currentXp =
        getStoredNumber(
            "lelana_kamandaka_xp",
            0
        );


    /*
       Tambahkan XP.
    */

    currentXp += GAMEPLAY_XP_REWARD;


    /*
       Ambil Basa saat ini.
    */

    let currentBasa =
        getStoredNumber(
            "lelana_kamandaka_basa",
            0
        );


    /*
       Tambahkan Basa.
    */

    currentBasa += GAMEPLAY_BASA_REWARD;


    /*
       Simpan.
    */

    setStoredNumber(
        "lelana_kamandaka_xp",
        currentXp
    );


    setStoredNumber(
        "lelana_kamandaka_basa",
        currentBasa
    );


    /*
       Tandai reward Gameplay 10 sudah diberikan.
    */

    localStorage.setItem(
        REWARD_STORAGE_KEY,
        "true"
    );


    /*
       Update tampilan HUD.
    */

    updatePlayerHUD();

}


/* ============================================================
   29. PLAYER HUD INITIALIZATION
   ============================================================ */

function initializePlayerHUD() {

    /*
       Jangan menghapus data player yang sudah ada.

       Kita hanya membaca data yang tersimpan.
    */

    updatePlayerHUD();

}


/* ============================================================
   30. UPDATE PLAYER HUD
   ============================================================ */

function updatePlayerHUD() {

    const playerLevel =
        document.getElementById(
            "playerLevel"
        );


    const playerXpTop =
        document.getElementById(
            "playerXpTop"
        );


    const playerXpBottom =
        document.getElementById(
            "playerXpBottom"
        );


    const playerXpBar =
        document.getElementById(
            "playerXpBar"
        );


    const playerBasa =
        document.getElementById(
            "playerBasa"
        );


    /*
       XP.
    */

    const xp =
        getStoredNumber(
            "lelana_kamandaka_xp",
            0
        );


    /*
       Basa.
    */

    const basa =
        getStoredNumber(
            "lelana_kamandaka_basa",
            0
        );


    /*
       Level gameplay tetap Level 10.
    */

    if (playerLevel) {

        playerLevel.textContent =
            "Level " +
            GAMEPLAY_LEVEL;

    }


    /*
       XP top.
    */

    if (playerXpTop) {

        playerXpTop.textContent =
            xp +
            " XP";

    }


    /*
       XP bottom.

       Batas tampilan dibuat 1.000 XP.
    */

    if (playerXpBottom) {

        playerXpBottom.textContent =
            xp +
            " / 1.000 XP";

    }


    /*
       XP progress bar.
    */

    if (playerXpBar) {

        let percentage =
            (xp / 1000) * 100;


        if (percentage < 0) {

            percentage = 0;

        }


        if (percentage > 100) {

            percentage = 100;

        }


        playerXpBar.style.width =
            percentage + "%";

    }


    /*
       BASA.
    */

    if (playerBasa) {

        playerBasa.textContent =
            basa;

    }

}


/* ============================================================
   31. FINISH BUTTON
   ============================================================ */

function setupFinishButton() {

    const finishButton =
        document.getElementById(
            "finishJourneyButton"
        );


    if (!finishButton) {

        return;

    }


    finishButton.addEventListener(
        "click",
        function () {

            /*
               Tidak perlu mengubah screen lagi.

               Link HTML akan membawa user
               ke ../../peta.html
            */

        }
    );

}


/* ============================================================
   32. PROTECTION AGAINST ACCIDENTAL FORM SUBMISSION
   ============================================================ */

document.addEventListener(
    "keydown",
    function (event) {

        /*
           ENTER tidak boleh menyebabkan
           form / button berpindah secara
           tidak sengaja.

           Tetapi jika fokus sedang pada button,
           browser tetap menangani tombol secara normal.
        */

        if (event.key !== "Enter") {

            return;

        }

    }
);


/* ============================================================
   33. PREVENT DOUBLE CLICK ON QUIZ
   ============================================================ */

function preventRepeatedAnswer(
    option
) {

    if (!option) {

        return true;

    }


    if (
        option.disabled ||
        option.classList.contains("answered")
    ) {

        return true;

    }


    return false;

}


/* ============================================================
   34. SAFE TEXT HELPER
   ============================================================ */

function setText(
    element,
    text
) {

    if (!element) {

        return;

    }


    element.textContent = text;

}


/* ============================================================
   35. SAFE CLASS HELPER
   ============================================================ */

function addClass(
    element,
    className
) {

    if (!element) {

        return;

    }


    if (!className) {

        return;

    }


    element.classList.add(className);

}


/* ============================================================
   36. REMOVE CLASS HELPER
   ============================================================ */

function removeClass(
    element,
    className
) {

    if (!element) {

        return;

    }


    if (!className) {

        return;

    }


    element.classList.remove(className);

}


/* ============================================================
   37. DEBUG INFORMATION
   ============================================================ */

function gameplayDebug() {

    console.log(
        "=========================================="
    );

    console.log(
        "LELANA KAMANDAKA — GAMEPLAY 10"
    );

    console.log(
        "Nama:",
        GAMEPLAY_NAME
    );

    console.log(
        "Level:",
        GAMEPLAY_LEVEL
    );

    console.log(
        "Total tahap:",
        GAMEPLAY_TOTAL_STAGES
    );

    console.log(
        "XP reward:",
        GAMEPLAY_XP_REWARD
    );

    console.log(
        "Basa reward:",
        GAMEPLAY_BASA_REWARD
    );

    console.log(
        "=========================================="
    );

}


/* ============================================================
   38. RUN DEBUG
   ============================================================ */

gameplayDebug();


/* ============================================================
   39. BROWSER PAGE SHOW PROTECTION
   ============================================================ */

window.addEventListener(
    "pageshow",
    function (event) {

        /*
           Kalau browser menggunakan back-forward cache,
           pastikan halaman Gameplay 10 tidak kembali
           dalam kondisi screen lama.

           HANYA jalankan jika halaman memang
           baru dimuat dari cache.
        */

        if (event.persisted) {

            forceOpeningScreen();

            updateJourneyProgress(1);

        }

    }
);


/* ============================================================
   40. FINAL SAFETY CHECK
   ============================================================ */

window.addEventListener(
    "load",
    function () {

        /*
           Pastikan opening benar-benar aktif
           setelah semua resource selesai dimuat.

           Ini sengaja TIDAK membaca localStorage screen.
        */

        const opening =
            document.getElementById(
                SCREEN_OPENING
            );


        const stageOne =
            document.getElementById(
                SCREEN_STAGE_01
            );


        if (
            opening &&
            stageOne
        ) {

            const activeScreens =
                document.querySelectorAll(
                    ".game-screen.active"
                );


            /*
               Jika tidak ada active,
               tampilkan opening.
            */

            if (activeScreens.length === 0) {

                forceOpeningScreen();

            }

        }

    }
);


/* ============================================================
   41. FINAL GAMEPLAY STATE
   ============================================================ */

/*
   Tidak ada:

       localStorage.getItem("currentScreen")

   Tidak ada:

       localStorage.getItem("gameplay10Screen")

   Tidak ada:

       localStorage.getItem("currentStage")

   Tidak ada:

       resumeLastScreen()

   Karena Gameplay 10 HARUS selalu dimulai
   dari halaman Opening ketika halaman dibuka.
*/


/* ============================================================
   42. FINAL ANSWER RULE
   ============================================================ */

/*
   Untuk SEMUA pilihan quiz:

       klik pilihan
           ↓
       pilihan diproses
           ↓
       SEMUA pilihan disabled
           ↓
       jika benar:
           class correct
           tombol lanjut aktif

       jika salah:
           class wrong
           tombol lanjut tetap aktif

   Jadi:

       SALAH
         ↓
       TIDAK BISA PILIH LAIN
         ↓
       LANJUT
         ↓
       SOAL BERIKUTNYA
*/


/* ============================================================
   43. FINAL SENTENCE RULE
   ============================================================ */

/*
   Tahap susun kalimat:

       pilih kata
          ↓
       semua kata lengkap
          ↓
       PERIKSA JAWABAN
          ↓
       jawaban dinilai
          ↓
       semua kata dikunci
          ↓
       tombol berubah menjadi LANJUT
          ↓
       tahap 05
*/


/* ============================================================
   44. FINAL COMPLETION RULE
   ============================================================ */

/*
   Tahap 05:

       pilih jawaban
          ↓
       semua pilihan dikunci
          ↓
       tombol SELESAIKAN CHALLENGE aktif
          ↓
       Finish
          ↓
       +100 XP
       +25 BASA
*/


/* ============================================================
   45. END OF GAMEPLAY 10
   ============================================================ */