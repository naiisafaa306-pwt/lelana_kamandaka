/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 01 — PAJAJARAN
   APP.JS
   ========================================================= */


/* =========================================================
   GAME PROGRESS
   ========================================================= */

const MAP_PROGRESS_KEY =
    "lelanaKamandakaProgress";


const gameProgress = {

    currentChapter: 1,

    totalChapters: 10,

    xp: 0,

    basa: 0,

    quizCompleted: false,

    sayembaraCompleted: false,

    completedChapters: [],

    completedLocations: [],

    unlockedLocations: [1]

};


/* =========================================================
   SCREEN
   ========================================================= */

const storyOpening =
    document.getElementById("story-opening");

const storyDialog =
    document.getElementById("story-dialog");

const storyGameplay =
    document.getElementById("story-gameplay");

const storyLearningBasa =
    document.getElementById("story-learning-basa");

const storyQuizBasa =
    document.getElementById("story-quiz-basa");

const storySayembaraStory =
    document.getElementById("story-sayembara-story");

const storySayembara =
    document.getElementById("story-sayembara");

const storyChapter08 =
    document.getElementById("story-chapter-08");


/* =========================================================
   BUTTON
   ========================================================= */

const btnBeginStory =
    document.getElementById("btnBeginStory");

const btnNextStory =
    document.getElementById("btnNextStory");

const btnListen =
    document.getElementById("btnListen");

const btnStartGameplay =
    document.getElementById("btnStartGameplay");

const btnStartQuizBasa =
    document.getElementById("btnStartQuizBasa");

const btnNextQuiz =
    document.getElementById("btnNextQuiz");

const btnStartSayembara =
    document.getElementById("btnStartSayembara");

const btnNextSayembara =
    document.getElementById("btnNextSayembara");

const btnContinueChapter =
    document.getElementById("btnContinueChapter");


/* =========================================================
   HUD GLOBAL
   ========================================================= */

const hudChapter =
    document.getElementById("hudChapter");

const hudXp =
    document.getElementById("hudXp");

const hudBasa =
    document.getElementById("hudBasa");


/* =========================================================
   SCREEN 08 ELEMENT
   ========================================================= */

const chapterCurrentNumber =
    document.getElementById(
        "chapterCurrentNumber"
    );

const chapterTotalNumber =
    document.getElementById(
        "chapterTotalNumber"
    );

const chapterXpReward =
    document.getElementById(
        "chapterXpReward"
    );

const chapterBasaReward =
    document.getElementById(
        "chapterBasaReward"
    );


/* =========================================================
   UPDATE HUD
   ========================================================= */

function updateHUD() {

    const current =
        String(
            gameProgress.currentChapter
        ).padStart(2, "0");


    if (hudChapter) {

        hudChapter.textContent =
            current;

    }


    if (hudXp) {

        hudXp.textContent =
            gameProgress.xp;

    }


    if (hudBasa) {

        hudBasa.textContent =
            gameProgress.basa;

    }


    if (chapterCurrentNumber) {

        chapterCurrentNumber.textContent =
            current;

    }


    if (chapterTotalNumber) {

        chapterTotalNumber.textContent =
            String(
                gameProgress.totalChapters
            ).padStart(2, "0");

    }

}


/* =========================================================
   UPDATE CHAPTER PROGRESS
   ========================================================= */

function updateChapterProgress() {

    const current =
        String(
            gameProgress.currentChapter
        ).padStart(2, "0");


    const total =
        String(
            gameProgress.totalChapters
        ).padStart(2, "0");


    if (hudChapter) {

        hudChapter.textContent =
            current;

    }


    if (chapterCurrentNumber) {

        chapterCurrentNumber.textContent =
            current;

    }


    if (chapterTotalNumber) {

        chapterTotalNumber.textContent =
            total;

    }

}


/* =========================================================
   SAVE PROGRESS
   ========================================================= */

function saveGameProgress() {

    const savedProgress = {

        currentChapter:
            gameProgress.currentChapter,

        totalChapters:
            gameProgress.totalChapters,

        xp:
            gameProgress.xp,

        basa:
            gameProgress.basa,

        quizCompleted:
            gameProgress.quizCompleted,

        sayembaraCompleted:
            gameProgress.sayembaraCompleted,

        completedChapters:
            Array.isArray(
                gameProgress.completedChapters
            )
                ? gameProgress.completedChapters
                : [],

        completedLocations:
            Array.isArray(
                gameProgress.completedLocations
            )
                ? gameProgress.completedLocations
                : [],

        unlockedLocations:
            Array.isArray(
                gameProgress.unlockedLocations
            )
                ? gameProgress.unlockedLocations
                : [1]

    };


    try {

        sessionStorage.setItem(
            MAP_PROGRESS_KEY,
            JSON.stringify(savedProgress)
        );


        console.log(
            "Progress berhasil disimpan ke sessionStorage:",
            savedProgress
        );

    }

    catch (error) {

        console.error(
            "Gagal menyimpan progress:",
            error
        );

    }

}


/* =========================================================
   LOAD PROGRESS
   ========================================================= */

function loadGameProgress() {

    let saved = null;


    try {

        saved =
            sessionStorage.getItem(
                MAP_PROGRESS_KEY
            );

    }

    catch (error) {

        console.warn(
            "sessionStorage tidak dapat dibaca:",
            error
        );

        return;

    }


    /*
     * Kalau tidak ada progress di session ini,
     * tetap gunakan progress awal.
     */

    if (!saved) {

        gameProgress.currentChapter =
            1;

        gameProgress.xp =
            0;

        gameProgress.basa =
            0;

        gameProgress.quizCompleted =
            false;

        gameProgress.sayembaraCompleted =
            false;

        gameProgress.completedChapters =
            [];

        gameProgress.completedLocations =
            [];

        gameProgress.unlockedLocations =
            [1];

        return;

    }


    try {

        const parsed =
            JSON.parse(saved);


        if (
            typeof parsed.currentChapter ===
            "number"
        ) {

            gameProgress.currentChapter =
                parsed.currentChapter;

        }


        if (
            typeof parsed.xp ===
            "number"
        ) {

            gameProgress.xp =
                parsed.xp;

        }


        if (
            typeof parsed.basa ===
            "number"
        ) {

            gameProgress.basa =
                parsed.basa;

        }


        if (
            typeof parsed.quizCompleted ===
            "boolean"
        ) {

            gameProgress.quizCompleted =
                parsed.quizCompleted;

        }


        if (
            typeof parsed.sayembaraCompleted ===
            "boolean"
        ) {

            gameProgress.sayembaraCompleted =
                parsed.sayembaraCompleted;

        }


        if (
            Array.isArray(
                parsed.completedChapters
            )
        ) {

            gameProgress.completedChapters =
                parsed.completedChapters;

        }


        if (
            Array.isArray(
                parsed.completedLocations
            )
        ) {

            gameProgress.completedLocations =
                parsed.completedLocations;

        }


        if (
            Array.isArray(
                parsed.unlockedLocations
            )
        ) {

            gameProgress.unlockedLocations =
                parsed.unlockedLocations;

        }


        /*
         * Pajajaran selalu terbuka.
         */

        if (
            !gameProgress.unlockedLocations.includes(
                1
            )
        ) {

            gameProgress.unlockedLocations.unshift(
                1
            );

        }


        console.log(
            "Progress berhasil dimuat dari sessionStorage:",
            gameProgress
        );

    }

    catch (error) {

        console.error(
            "Gagal membaca progress:",
            error
        );

    }

}


/* =========================================================
   REWARD POPUP
   ========================================================= */

function showRewardPopup(
    text,
    type
) {

    const oldPopup =
        document.querySelector(
            ".gameplay-reward-popup"
        );


    if (oldPopup) {

        oldPopup.remove();

    }


    const popup =
        document.createElement("div");


    popup.className =
        "gameplay-reward-popup";


    popup.classList.add(
        type
    );


    popup.textContent =
        text;


    document.body.appendChild(
        popup
    );


    requestAnimationFrame(
        function () {

            popup.classList.add(
                "show"
            );

        }
    );


    setTimeout(
        function () {

            popup.classList.remove(
                "show"
            );


            setTimeout(
                function () {

                    if (
                        popup.parentNode
                    ) {

                        popup.remove();

                    }

                },
                300
            );

        },
        1400
    );

}


/* =========================================================
   XP
   ========================================================= */

function addXP(amount) {

    if (
        typeof amount !== "number" ||
        amount <= 0
    ) {

        return;

    }


    gameProgress.xp +=
        amount;


    updateHUD();


    showRewardPopup(
        `+${amount} XP`,
        "xp"
    );


    console.log(
        `+${amount} XP | Total XP: ${gameProgress.xp}`
    );

}


/* =========================================================
   BASA
   ========================================================= */

function addBasa(amount) {

    if (
        typeof amount !== "number" ||
        amount <= 0
    ) {

        return;

    }


    gameProgress.basa +=
        amount;


    updateHUD();


    showRewardPopup(
        `+${amount} BASA`,
        "basa"
    );


    console.log(
        `+${amount} BASA | Total BASA: ${gameProgress.basa}`
    );

}


/* =========================================================
   SCREEN 04 REWARD
   ========================================================= */

let basaLearningRewardGiven =
    false;


function giveBasaLearningReward() {

    if (
        basaLearningRewardGiven
    ) {

        return;

    }


    basaLearningRewardGiven =
        true;


    addXP(5);

    addBasa(1);

}


/* =========================================================
   QUIZ REWARD
   ========================================================= */

function giveQuizCorrectReward() {

    addXP(10);

    addBasa(5);

}


/* =========================================================
   QUIZ COMPLETION REWARD
   ========================================================= */

let quizCompletionRewardGiven =
    false;


function giveQuizCompletionReward() {

    if (
        quizCompletionRewardGiven
    ) {

        return;

    }


    quizCompletionRewardGiven =
        true;


    addXP(20);

    addBasa(10);


    gameProgress.quizCompleted =
        true;

}


/* =========================================================
   SAYEMBARA REWARD
   ========================================================= */

let sayembaraRewardGiven =
    false;


function giveSayembaraReward() {

    if (
        sayembaraRewardGiven
    ) {

        return;

    }


    sayembaraRewardGiven =
        true;


    addXP(25);

    addBasa(5);


    gameProgress.sayembaraCompleted =
        true;

}


/* =========================================================
   SCREEN 08 REWARD DISPLAY
   ========================================================= */

function updateChapterRewardDisplay() {

    if (chapterXpReward) {

        chapterXpReward.textContent =
            "+25 XP";

    }


    if (chapterBasaReward) {

        chapterBasaReward.textContent =
            "+5 BASA";

    }

}


/* =========================================================
   SHOW STORY SCREEN
   ========================================================= */

function showStoryScreen(screen) {

    if (!screen) {

        console.error(
            "Screen yang dituju tidak ditemukan."
        );

        return;

    }


    document
        .querySelectorAll(
            ".story-screen"
        )
        .forEach(
            function (section) {

                section.classList.remove(
                    "active"
                );

            }
        );


    screen.classList.add(
        "active"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    updateHUD();

}


/* =========================================================
   SCREEN 01
   OPENING
   ↓
   SCREEN 02
   ========================================================= */

if (btnBeginStory) {

    btnBeginStory.addEventListener(
        "click",
        function () {

            showStoryScreen(
                storyDialog
            );

        }
    );

}


/* =========================================================
   SCREEN 02
   DIALOG
   ↓
   SCREEN 03
   ========================================================= */

if (btnNextStory) {

    btnNextStory.addEventListener(
        "click",
        function () {

            showStoryScreen(
                storyGameplay
            );

        }
    );

}


/* =========================================================
   SCREEN 02
   DENGARKAN
   ========================================================= */

if (btnListen) {

    btnListen.addEventListener(
        "click",
        function () {

            if (
                !(
                    "speechSynthesis"
                    in window
                )
            ) {

                alert(
                    "Fitur suara tidak tersedia di browser ini."
                );

                return;

            }


            const dialogs =
                document.querySelectorAll(
                    "#story-dialog .dialog-text"
                );


            let text = "";


            dialogs.forEach(
                function (dialog) {

                    text +=
                        dialog.textContent.trim()
                        + " ";

                }
            );


            if (
                !text.trim()
            ) {

                return;

            }


            window.speechSynthesis.cancel();


            const utterance =
                new SpeechSynthesisUtterance(
                    text
                );


            utterance.lang =
                "id-ID";


            utterance.rate =
                0.9;


            utterance.pitch =
                1;


            window.speechSynthesis.speak(
                utterance
            );

        }
    );

}


/* =========================================================
   SCREEN 03
   ↓
   SCREEN 04
   ========================================================= */

if (btnStartGameplay) {

    btnStartGameplay.addEventListener(
        "click",
        function () {

            giveBasaLearningReward();


            showStoryScreen(
                storyLearningBasa
            );

        }
    );

}


/* =========================================================
   SCREEN 04
   TEXT TO SPEECH BASA
   ========================================================= */

function speakBasa(word) {

    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        alert(
            "Fitur suara tidak tersedia di browser ini."
        );

        return;

    }


    let text = "";


    switch (word) {

        case "kula":

            text =
                "Kula. Artinya saya.";

            break;


        case "nyuwun pangestu":

            text =
                "Nyuwun pangestu. Artinya memohon restu.";

            break;


        case "badhe":

            text =
                "Badhe. Artinya akan atau hendak.";

            break;


        case "rama":

            text =
                "Rama. Artinya ayah.";

            break;


        default:

            text =
                word;

    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.lang =
        "id-ID";


    utterance.rate =
        0.85;


    utterance.pitch =
        1;


    window.speechSynthesis.speak(
        utterance
    );

}


/* =========================================================
   QUIZ DATA
   ========================================================= */

const quizData = [

    {

        question:
            'Apa arti dari kata "Kula"?',

        answer:
            "Saya",

        options: [

            "Saya",

            "Ayah",

            "Akan / hendak",

            "Memohon restu"

        ],

        feedbackCorrect:
            "Benar! Kula berarti saya.",

        feedbackWrong:
            "Belum tepat. Kula berarti saya."

    },


    {

        question:
            'Apa arti dari "Nyuwun Pangestu"?',

        answer:
            "Memohon restu",

        options: [

            "Memohon restu",

            "Saya",

            "Ayah",

            "Akan / hendak"

        ],

        feedbackCorrect:
            "Benar! Nyuwun Pangestu berarti memohon restu.",

        feedbackWrong:
            "Belum tepat. Nyuwun Pangestu berarti memohon restu."

    },


    {

        question:
            'Apa arti dari kata "Badhé"?',

        answer:
            "Akan / hendak",

        options: [

            "Akan / hendak",

            "Memohon restu",

            "Ayah",

            "Saya"

        ],

        feedbackCorrect:
            "Benar! Badhé berarti akan atau hendak.",

        feedbackWrong:
            "Belum tepat. Badhé berarti akan atau hendak."

    },


    {

        question:
            'Dalam percakapan dengan ayahnya, apa arti "Rama"?',

        answer:
            "Ayah",

        options: [

            "Ayah",

            "Saya",

            "Memohon restu",

            "Akan / hendak"

        ],

        feedbackCorrect:
            "Benar! Rama digunakan untuk menyebut ayah.",

        feedbackWrong:
            "Belum tepat. Rama berarti ayah."

    }

];


/* =========================================================
   ELEMENT QUIZ
   ========================================================= */

const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );

const quizOptions =
    document.querySelectorAll(
        "#story-quiz-basa .quiz-option"
    );

const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );

const quizQuestionNumber =
    document.getElementById(
        "quizQuestionNumber"
    );

const quizProgressFill =
    document.getElementById(
        "quizProgressFill"
    );


/* =========================================================
   STATE QUIZ
   ========================================================= */

let currentQuizIndex =
    0;

let quizScore =
    0;

let selectedAnswer =
    false;


/* =========================================================
   SHUFFLE
   ========================================================= */

function shuffleArray(array) {

    const shuffled =
        [...array];


    for (
        let i =
            shuffled.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random()
                * (i + 1)
            );


        [
            shuffled[i],
            shuffled[j]
        ] =
        [
            shuffled[j],
            shuffled[i]
        ];

    }


    return shuffled;

}


/* =========================================================
   LOAD QUIZ QUESTION
   ========================================================= */

function loadQuizQuestion() {

    if (
        !quizQuestion ||
        !quizOptions.length
    ) {

        return;

    }


    const currentQuestion =
        quizData[
            currentQuizIndex
        ];


    if (!currentQuestion) {

        return;

    }


    selectedAnswer =
        false;


    if (quizFeedback) {

        quizFeedback.textContent =
            "";


        quizFeedback.classList.remove(
            "correct",
            "wrong",
            "show"
        );

    }


    if (btnNextQuiz) {

        btnNextQuiz.disabled =
            true;


        btnNextQuiz.textContent =

            currentQuizIndex ===
            quizData.length - 1

                ? "SELESAIKAN QUIZ →"

                : "SOAL BERIKUTNYA →";

    }


    if (quizQuestionNumber) {

        quizQuestionNumber.textContent =

            `PERTANYAAN ${
                String(
                    currentQuizIndex + 1
                ).padStart(2, "0")
            } / ${
                String(
                    quizData.length
                ).padStart(2, "0")
            }`;

    }


    if (quizProgressFill) {

        const progress =
            (
                (
                    currentQuizIndex + 1
                )
                /
                quizData.length
            )
            * 100;


        quizProgressFill.style.width =
            `${progress}%`;

    }


    quizQuestion.textContent =
        currentQuestion.question;


    const shuffledOptions =
        shuffleArray(
            currentQuestion.options
        );


    quizOptions.forEach(
        function (option, index) {

            const answer =
                shuffledOptions[index];


            const answerText =
                option.querySelector(
                    "span:last-child"
                );


            const letter =
                option.querySelector(
                    ".quiz-option-letter"
                );


            option.classList.remove(
                "correct",
                "wrong",
                "selected"
            );


            option.disabled =
                false;


            option.dataset.answer =
                answer;


            if (answerText) {

                answerText.textContent =
                    answer;

            }


            if (letter) {

                letter.textContent =
                    String.fromCharCode(
                        65 + index
                    );

            }

        }
    );

}

/* =========================================================
   QUIZ PILIHAN
   ========================================================= */

quizOptions.forEach(
    function (option) {

        option.addEventListener(
            "click",
            function () {

                if (
                    selectedAnswer
                ) {

                    return;

                }


                const currentQuestion =
                    quizData[
                        currentQuizIndex
                    ];


                if (!currentQuestion) {

                    return;

                }


                const answer =
                    option.dataset.answer;


                /* =====================================
                   BENAR
                   ===================================== */

                if (
                    answer ===
                    currentQuestion.answer
                ) {

                    selectedAnswer =
                        true;


                    quizScore++;


                    giveQuizCorrectReward();


                    option.classList.remove(
                        "wrong"
                    );


                    option.classList.add(
                        "correct"
                    );


                    quizOptions.forEach(
                        function (item) {

                            if (
                                item.dataset.answer ===
                                currentQuestion.answer
                            ) {

                                item.classList.add(
                                    "correct"
                                );

                            }

                        }
                    );


                    if (quizFeedback) {

                        quizFeedback.textContent =
                            currentQuestion.feedbackCorrect;


                        quizFeedback.classList.remove(
                            "wrong"
                        );


                        quizFeedback.classList.add(
                            "correct",
                            "show"
                        );

                    }


                    /*
                     * Kunci semua pilihan
                     */

                    quizOptions.forEach(
                        function (item) {

                            item.disabled =
                                true;

                        }
                    );


                    if (btnNextQuiz) {

                        btnNextQuiz.disabled =
                            false;

                    }

                }


                /* =====================================
                   SALAH
                   ===================================== */

                else {

                    /*
                     * Begitu salah,
                     * soal langsung dikunci.
                     */

                    selectedAnswer =
                        true;


                    option.classList.remove(
                        "correct"
                    );


                    option.classList.add(
                        "wrong"
                    );


                    if (quizFeedback) {

                        quizFeedback.textContent =
                            currentQuestion.feedbackWrong;


                        quizFeedback.classList.remove(
                            "correct"
                        );


                        quizFeedback.classList.add(
                            "wrong",
                            "show"
                        );

                    }


                    /*
                     * Tampilkan jawaban yang benar
                     */

                    quizOptions.forEach(
                        function (item) {

                            if (
                                item.dataset.answer ===
                                currentQuestion.answer
                            ) {

                                item.classList.add(
                                    "correct"
                                );

                            }

                        }
                    );


                    /*
                     * Kunci semua pilihan
                     */

                    quizOptions.forEach(
                        function (item) {

                            item.disabled =
                                true;

                        }
                    );


                    /*
                     * Izinkan lanjut ke soal berikutnya
                     */

                    if (btnNextQuiz) {

                        btnNextQuiz.disabled =
                            false;

                    }

                }

            }
        );

    }
);

/* =========================================================
   SCREEN 04
   ↓
   SCREEN 05
   ========================================================= */

if (btnStartQuizBasa) {

    btnStartQuizBasa.addEventListener(
        "click",
        function () {

            currentQuizIndex =
                0;


            quizScore =
                0;


            quizCompletionRewardGiven =
                false;


            showStoryScreen(
                storyQuizBasa
            );


            loadQuizQuestion();

        }
    );

}


/* =========================================================
   QUIZ NEXT
   ========================================================= */

if (btnNextQuiz) {

    btnNextQuiz.addEventListener(
        "click",
        function () {

            if (
                selectedAnswer ===
                "quiz-finished"
            ) {

                showStoryScreen(
                    storySayembaraStory
                );


                return;

            }


            if (
                !selectedAnswer
            ) {

                return;

            }


            if (
                currentQuizIndex <
                quizData.length - 1
            ) {

                currentQuizIndex++;


                loadQuizQuestion();


                return;

            }


            showQuizResult();

        }
    );

}


/* =========================================================
   HASIL QUIZ
   ========================================================= */

function showQuizResult() {

    giveQuizCompletionReward();


    if (quizFeedback) {

        quizFeedback.classList.remove(
            "wrong"
        );


        quizFeedback.classList.add(
            "correct",
            "show"
        );


        quizFeedback.innerHTML =

            `
            <strong>Quiz selesai!</strong>
            <br>
            Kamu menjawab benar
            <strong>
                ${quizScore} dari ${quizData.length}
            </strong>
            soal.
            <br><br>
            <strong>
                +20 XP · +10 Basa
            </strong>
            `;

    }


    if (btnNextQuiz) {

        btnNextQuiz.disabled =
            false;


        btnNextQuiz.textContent =
            "LANJUT KE CERITA →";

    }


    selectedAnswer =
        "quiz-finished";

}


/* =========================================================
   SCREEN 06
   ↓
   SCREEN 07
   ========================================================= */

if (btnStartSayembara) {

    btnStartSayembara.addEventListener(
        "click",
        function () {

            resetSayembara();


            showStoryScreen(
                storySayembara
            );

        }
    );

}


/* =========================================================
   SAYEMBARA ELEMENT
   ========================================================= */

const sayembaraDropzone =
    document.getElementById(
        "sayembaraDropzone"
    );

const sayembaraOptions =
    document.querySelectorAll(
        "#story-sayembara .sayembara-option"
    );


/* =========================================================
   SAYEMBARA DATA
   ========================================================= */

const correctSayembara = [

    "putri",

    "mori",

    "kuda",

    "beras"

];


const wrongSayembara = [

    "gajah",

    "batik",

    "gula"

];


let selectedSayembara =
    [];


/* =========================================================
   RESET SAYEMBARA
   ========================================================= */

function resetSayembara() {

    selectedSayembara =
        [];


    sayembaraOptions.forEach(
        function (option) {

            option.classList.remove(
                "used",
                "correct",
                "wrong",
                "shake",
                "dragging"
            );


            option.setAttribute(
                "draggable",
                "true"
            );

        }
    );


    if (sayembaraDropzone) {

        sayembaraDropzone
            .querySelectorAll(
                ".sayembara-dropped"
            )
            .forEach(
                function (item) {

                    item.remove();

                }
            );


        sayembaraDropzone.classList.remove(
            "has-items",
            "complete",
            "drag-over"
        );

    }


    const feedback =
        document.getElementById(
            "sayembaraFeedback"
        );


    if (feedback) {

        feedback.textContent =
            "";


        feedback.classList.remove(
            "correct",
            "wrong",
            "show"
        );

    }


    if (btnNextSayembara) {

        btnNextSayembara.disabled =
            true;


        btnNextSayembara.classList.remove(
            "ready"
        );

    }

}


/* =========================================================
   DRAG START
   ========================================================= */

sayembaraOptions.forEach(
    function (option) {

        option.addEventListener(
            "dragstart",
            function (event) {

                if (
                    option.classList.contains(
                        "used"
                    )
                ) {

                    event.preventDefault();

                    return;

                }


                const answer =
                    option.dataset.answer;


                event.dataTransfer.setData(
                    "text/plain",
                    answer
                );


                event.dataTransfer.effectAllowed =
                    "move";


                option.classList.add(
                    "dragging"
                );

            }
        );


        option.addEventListener(
            "dragend",
            function () {

                option.classList.remove(
                    "dragging"
                );

            }
        );

    }
);


/* =========================================================
   DROPZONE
   ========================================================= */

if (sayembaraDropzone) {

    sayembaraDropzone.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();


            event.dataTransfer.dropEffect =
                "move";


            sayembaraDropzone.classList.add(
                "drag-over"
            );

        }
    );


    sayembaraDropzone.addEventListener(
        "dragleave",
        function (event) {

            if (
                event.relatedTarget &&
                sayembaraDropzone.contains(
                    event.relatedTarget
                )
            ) {

                return;

            }


            sayembaraDropzone.classList.remove(
                "drag-over"
            );

        }
    );


    sayembaraDropzone.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();


            sayembaraDropzone.classList.remove(
                "drag-over"
            );


            const answer =
                event.dataTransfer.getData(
                    "text/plain"
                );


            if (!answer) {

                return;

            }


            const option =
                document.querySelector(
                    `#story-sayembara .sayembara-option[data-answer="${answer}"]`
                );


            if (!option) {

                return;

            }


            if (
                option.classList.contains(
                    "used"
                )
            ) {

                return;

            }


            const isCorrect =
                correctSayembara.includes(
                    answer
                );


            if (!isCorrect) {

                handleWrongSayembara(
                    option
                );


                return;

            }


            handleCorrectSayembara(
                option,
                answer
            );

        }
    );

}


/* =========================================================
   SAYEMBARA SALAH
   ========================================================= */

function handleWrongSayembara(
    option
) {

    option.classList.remove(
        "correct"
    );


    option.classList.add(
        "wrong"
    );


    option.classList.remove(
        "shake"
    );


    void option.offsetWidth;


    option.classList.add(
        "shake"
    );


    showSayembaraFeedback(
        "Belum tepat. Coba pilih syarat yang lain.",
        "wrong"
    );


    setTimeout(
        function () {

            option.classList.remove(
                "wrong",
                "shake"
            );

        },
        700
    );

}


/* =========================================================
   SAYEMBARA BENAR
   ========================================================= */

function handleCorrectSayembara(
    option,
    answer
) {

    const alreadySelected =
        selectedSayembara.some(
            function (item) {

                return (
                    item.answer ===
                    answer
                );

            }
        );


    if (
        alreadySelected
    ) {

        return;

    }


    selectedSayembara.push({

        answer:
            answer,

        text:
            option.innerText.trim()

    });


    option.classList.remove(
        "wrong",
        "shake"
    );


    option.classList.add(
        "used"
    );


    option.setAttribute(
        "draggable",
        "false"
    );


    const dropped =
        document.createElement(
            "div"
        );


    dropped.className =
        "sayembara-dropped correct";


    dropped.dataset.answer =
        answer;


    dropped.textContent =
        option.innerText.trim();


    sayembaraDropzone.appendChild(
        dropped
    );


    sayembaraDropzone.classList.add(
        "has-items"
    );


    showSayembaraFeedback(
        "Benar! Syarat ini termasuk dalam sayembara.",
        "correct"
    );


    updateSayembaraNextButton();

}


/* =========================================================
   SAYEMBARA FEEDBACK
   ========================================================= */

function showSayembaraFeedback(
    message,
    type
) {

    const feedback =
        document.getElementById(
            "sayembaraFeedback"
        );


    if (!feedback) {

        return;

    }


    feedback.textContent =
        message;


    feedback.classList.remove(
        "correct",
        "wrong",
        "show"
    );


    feedback.classList.add(
        type
    );


    requestAnimationFrame(
        function () {

            feedback.classList.add(
                "show"
            );

        }
    );

}


/* =========================================================
   UPDATE TOMBOL SAYEMBARA
   ========================================================= */

function updateSayembaraNextButton() {

    if (!btnNextSayembara) {

        return;

    }


    const complete =
        selectedSayembara.length ===
        correctSayembara.length;


    btnNextSayembara.disabled =
        !complete;


    if (complete) {

        btnNextSayembara.classList.add(
            "ready"
        );

    }

    else {

        btnNextSayembara.classList.remove(
            "ready"
        );

    }

}


/* =========================================================
   VERIFY SAYEMBARA
   ========================================================= */

function verifySayembara() {

    const selectedAnswers =
        selectedSayembara.map(
            function (item) {

                return item.answer;

            }
        );


    if (
        selectedAnswers.length !==
        correctSayembara.length
    ) {

        return false;

    }


    return correctSayembara.every(
        function (answer) {

            return selectedAnswers.includes(
                answer
            );

        }
    );

}


/* =========================================================
   HASIL SAYEMBARA
   ========================================================= */

function showSayembaraResult(
    isCorrect
) {

    if (!sayembaraDropzone) {

        return;

    }


    const droppedItems =
        sayembaraDropzone.querySelectorAll(
            ".sayembara-dropped"
        );


    if (isCorrect) {

        droppedItems.forEach(
            function (item) {

                item.classList.remove(
                    "wrong"
                );


                item.classList.add(
                    "correct"
                );

            }
        );


        sayembaraDropzone.classList.add(
            "complete"
        );


        showSayembaraFeedback(
            "Benar! Semua syarat sayembara sudah tepat.",
            "correct"
        );

    }

    else {

        droppedItems.forEach(
            function (item) {

                item.classList.remove(
                    "correct",
                    "wrong"
                );


                if (
                    correctSayembara.includes(
                        item.dataset.answer
                    )
                ) {

                    item.classList.add(
                        "correct"
                    );

                }

                else {

                    item.classList.add(
                        "wrong"
                    );

                }

            }
        );


        showSayembaraFeedback(
            "Belum tepat. Pilih kembali syarat yang benar.",
            "wrong"
        );

    }

}


/* =========================================================
   SCREEN 07
   ↓
   SCREEN 08
   ========================================================= */

if (btnNextSayembara) {

    btnNextSayembara.addEventListener(
        "click",
        function () {

            if (
                selectedSayembara.length !==
                correctSayembara.length
            ) {

                return;

            }


            const isCorrect =
                verifySayembara();


            showSayembaraResult(
                isCorrect
            );


            if (!isCorrect) {

                return;

            }


            giveSayembaraReward();


            setTimeout(
                function () {

                    updateChapterProgress();

                    updateChapterRewardDisplay();

                    updateHUD();


                    showStoryScreen(
                        storyChapter08
                    );

                },
                900
            );

        }
    );

}


/* =========================================================
   SCREEN 08
   SELESAI GAMEPLAY 01
   ↓
   UNLOCK KI AJAR WINARONG
   ↓
   KEMBALI KE PETA
   ========================================================= */

if (btnContinueChapter) {

    btnContinueChapter.addEventListener(
        "click",
        function () {

            /* =========================================
               GAMEPLAY 01 SELESAI
               ========================================= */

            gameProgress.currentChapter =
                2;


            /* =========================================
               BAB 01 SELESAI
               ========================================= */

            if (
                !Array.isArray(
                    gameProgress.completedChapters
                )
            ) {

                gameProgress.completedChapters =
                    [];

            }


            if (
                !gameProgress.completedChapters.includes(
                    1
                )
            ) {

                gameProgress.completedChapters.push(
                    1
                );

            }


            /* =========================================
               LOKASI 01 SELESAI
               ========================================= */

            if (
                !Array.isArray(
                    gameProgress.completedLocations
                )
            ) {

                gameProgress.completedLocations =
                    [];

            }


            if (
                !gameProgress.completedLocations.includes(
                    1
                )
            ) {

                gameProgress.completedLocations.push(
                    1
                );

            }


            /* =========================================
               UNLOCK LOKASI 01
               ========================================= */

            if (
                !Array.isArray(
                    gameProgress.unlockedLocations
                )
            ) {

                gameProgress.unlockedLocations =
                    [1];

            }


            if (
                !gameProgress.unlockedLocations.includes(
                    1
                )
            ) {

                gameProgress.unlockedLocations.push(
                    1
                );

            }


            /* =========================================
               UNLOCK LOKASI 02
               KI AJAR WINARONG
               ========================================= */

            if (
                !gameProgress.unlockedLocations.includes(
                    2
                )
            ) {

                gameProgress.unlockedLocations.push(
                    2
                );

            }


            /* =========================================
               SIMPAN PROGRESS
               ========================================= */

            saveGameProgress();


            /* =========================================
               UPDATE HUD
               ========================================= */

            updateChapterProgress();

            updateHUD();


            /* =========================================
               DEBUG
               ========================================= */

            console.log(
                "================================="
            );

            console.log(
                "GAMEPLAY 01 SELESAI"
            );

            console.log(
                "Pajajaran selesai."
            );

            console.log(
                "Ki Ajar Winarong terbuka."
            );

            console.log(
                "Unlocked Locations:",
                gameProgress.unlockedLocations
            );

            console.log(
                "Completed Chapters:",
                gameProgress.completedChapters
            );

            console.log(
                "Completed Locations:",
                gameProgress.completedLocations
            );

            console.log(
                "Progress disimpan di sessionStorage."
            );

            console.log(
                "Kembali ke Peta Lelana."
            );

            console.log(
                "================================="
            );


            /* =========================================
               KEMBALI KE PETA
               ========================================= */

            window.location.href =
                "../../peta.html";

        }
    );

}


/* =========================================================
   INITIALIZE GAME
   ========================================================= */

function initializeGame() {

    /*
     * Load progress dari sessionStorage.
     *
     * Kalau tab baru:
     * tidak ada data → mulai dari Bab 01.
     *
     * Kalau masih dalam tab yang sama:
     * progress tetap dipakai.
     */

    loadGameProgress();


    /*
     * Update tampilan.
     */

    updateChapterProgress();

    updateChapterRewardDisplay();

    updateHUD();


    /*
     * Pastikan hanya screen opening
     * yang aktif saat gameplay 01 dibuka.
     */

    document
        .querySelectorAll(
            ".story-screen"
        )
        .forEach(
            function (section) {

                section.classList.remove(
                    "active"
                );

            }
        );


    showStoryScreen(
        storyOpening
    );


    console.log(
        "Lelana Kamandaka — Gameplay 01 siap."
    );

}


/* =========================================================
   DOM READY
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeGame
    );

}

else {

    initializeGame();

}