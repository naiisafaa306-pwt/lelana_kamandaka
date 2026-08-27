/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 08 — SAWANGAN
   APP.JS
   ========================================================= */


/* =========================================================
   GAME PROGRESS
   ========================================================= */

const MAP_PROGRESS_KEY =
    "lelanaKamandakaProgress";


const gameProgress = {

    currentChapter: 8,

    totalChapters: 10,

    xp: 0,

    basa: 0,

    quizCompleted: false,

    sayembaraCompleted: false,

    completedChapters: [],

    completedLocations: [],

    unlockedLocations: [1, 8]

};


/* =========================================================
   SCREEN
   ========================================================= */

const storyOpening =
    document.getElementById(
        "story-opening"
    );


const storyDialog =
    document.getElementById(
        "story-dialog"
    );


const storyGameplay =
    document.getElementById(
        "story-gameplay"
    );


const storyLearningBasa =
    document.getElementById(
        "story-learning-basa"
    );


const storyQuizBasa =
    document.getElementById(
        "story-quiz-basa"
    );


const storySayembaraStory =
    document.getElementById(
        "story-sayembara-story"
    );


const storySayembara =
    document.getElementById(
        "story-sayembara"
    );


const storyChapter08 =
    document.getElementById(
        "story-chapter-08"
    );


/* =========================================================
   BUTTON
   ========================================================= */

const btnBeginStory =
    document.getElementById(
        "btnBeginStory"
    );


const btnNextStory =
    document.getElementById(
        "btnNextStory"
    );


const btnListen =
    document.getElementById(
        "btnListen"
    );


const btnStartGameplay =
    document.getElementById(
        "btnStartGameplay"
    );


const btnStartQuizBasa =
    document.getElementById(
        "btnStartQuizBasa"
    );


const btnNextQuiz =
    document.getElementById(
        "btnNextQuiz"
    );


const btnStartSayembara =
    document.getElementById(
        "btnStartSayembara"
    );


const btnNextSayembara =
    document.getElementById(
        "btnNextSayembara"
    );


const btnContinueChapter =
    document.getElementById(
        "btnContinueChapter"
    );


/* =========================================================
   HUD
   ========================================================= */

const hudChapter =
    document.getElementById(
        "hudChapter"
    );


const hudXp =
    document.getElementById(
        "hudXp"
    );


const hudBasa =
    document.getElementById(
        "hudBasa"
    );


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
        ).padStart(
            2,
            "0"
        );


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
            ).padStart(
                2,
                "0"
            );

    }

}


/* =========================================================
   UPDATE CHAPTER PROGRESS
   ========================================================= */

function updateChapterProgress() {

    const current =
        String(
            gameProgress.currentChapter
        ).padStart(
            2,
            "0"
        );


    const total =
        String(
            gameProgress.totalChapters
        ).padStart(
            2,
            "0"
        );


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
            JSON.stringify(
                savedProgress
            )
        );


        console.log(
            "Progress Gameplay 08 disimpan:",
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


    if (!saved) {

        gameProgress.currentChapter =
            8;

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
            [1, 8];

        return;

    }


    try {

        const parsed =
            JSON.parse(saved);


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
         * Gameplay ini selalu Chapter 08.
         */

        gameProgress.currentChapter =
            8;


        /*
         * Pastikan lokasi 01 dan 08
         * tetap tersedia.
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


        if (
            !gameProgress.unlockedLocations.includes(
                8
            )
        ) {

            gameProgress.unlockedLocations.push(
                8
            );

        }

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
        document.createElement(
            "div"
        );


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

function addXP(
    amount
) {

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

}


/* =========================================================
   BASA
   ========================================================= */

function addBasa(
    amount
) {

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

}


/* =========================================================
   SINAU BASA REWARD
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


    addXP(
        5
    );


    addBasa(
        1
    );

}


/* =========================================================
   QUIZ REWARD
   ========================================================= */

function giveQuizCorrectReward() {

    addXP(
        10
    );


    addBasa(
        5
    );

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


    addXP(
        20
    );


    addBasa(
        10
    );


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


    addXP(
        25
    );


    addBasa(
        5
    );


    gameProgress.sayembaraCompleted =
        true;

}


/* =========================================================
   SCREEN 08 REWARD DISPLAY
   ========================================================= */

function updateChapterRewardDisplay() {

    if (chapterXpReward) {

        chapterXpReward.textContent =
            "+50 XP";

    }


    if (chapterBasaReward) {

        chapterBasaReward.textContent =
            "+10 BASA";

    }

}


/* =========================================================
   SHOW STORY SCREEN
   ========================================================= */

function showStoryScreen(
    screen
) {

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
   SCREEN 01 → SCREEN 02
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
   SCREEN 02 → SCREEN 03
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
   SCREEN 02 — DENGARKAN
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


            let text =
                "";


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
   SCREEN 03 → SCREEN 04
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
   TEXT TO SPEECH BASA
   ========================================================= */

function speakBasa(
    word
) {

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


    let text =
        "";


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
                "Badhé. Artinya akan atau hendak.";

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
            "Memohon restu",
            "Akan"
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
            "Akan"
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
            "Akan",

        options: [
            "Akan",
            "Ayah",
            "Saya",
            "Memohon restu"
        ],

        feedbackCorrect:
            "Benar! Badhé berarti akan atau hendak.",

        feedbackWrong:
            "Belum tepat. Badhé berarti akan atau hendak."

    },


    {

        question:
            'Apa arti dari kata "Rama"?',

        answer:
            "Ayah",

        options: [
            "Ayah",
            "Saya",
            "Akan",
            "Memohon restu"
        ],

        feedbackCorrect:
            "Benar! Rama merupakan sapaan untuk ayah.",

        feedbackWrong:
            "Belum tepat. Rama merupakan sapaan untuk ayah."

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

function shuffleArray(
    array
) {

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
                *
                (i + 1)
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
                ).padStart(
                    2,
                    "0"
                )
            } / ${
                String(
                    quizData.length
                ).padStart(
                    2,
                    "0"
                )
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
            *
            100;


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
        function (
            option,
            index
        ) {

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
    function (
        option
    ) {

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


                /* =========================================
                   BENAR
                   ========================================= */

                if (
                    answer ===
                    currentQuestion.answer
                ) {

                    selectedAnswer =
                        true;


                    quizScore++;


                    giveQuizCorrectReward();


                    option.classList.add(
                        "correct"
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


                    quizOptions.forEach(
                        function (
                            item
                        ) {

                            item.disabled =
                                true;

                        }
                    );


                    if (btnNextQuiz) {

                        btnNextQuiz.disabled =
                            false;

                    }

                }


                /* =========================================
                   SALAH
                   ========================================= */

                else {

                    selectedAnswer =
                        true;


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


                    quizOptions.forEach(
                        function (
                            item
                        ) {

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


                    quizOptions.forEach(
                        function (
                            item
                        ) {

                            item.disabled =
                                true;

                        }
                    );


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
   SCREEN 04 → SCREEN 05
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
   SCREEN 06 → SCREEN 07
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


const sayembaraFeedback =
    document.getElementById(
        "sayembaraFeedback"
    );


/* =========================================================
   SAYEMBARA DATA
   ========================================================= */

const correctSayembara = [

    "basa",

    "petunjuk",

    "teliti",

    "tenang"

];


const wrongSayembara = [

    "tergesa",

    "abaikan",

    "asal"

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
        function (
            option
        ) {

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
                function (
                    item
                ) {

                    item.remove();

                }
            );


        sayembaraDropzone.classList.remove(
            "has-items",
            "complete",
            "drag-over"
        );

    }


    if (sayembaraFeedback) {

        sayembaraFeedback.textContent =
            "";


        sayembaraFeedback.classList.remove(
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
    function (
        option
    ) {

        option.addEventListener(
            "dragstart",
            function (
                event
            ) {

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
        function (
            event
        ) {

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
        function (
            event
        ) {

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
        function (
            event
        ) {

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


            if (
                selectedSayembara.includes(
                    answer
                )
            ) {

                return;

            }


            const option =
                Array.from(
                    sayembaraOptions
                ).find(
                    function (
                        item
                    ) {

                        return (
                            item.dataset.answer ===
                            answer
                        );

                    }
                );


            if (!option) {

                return;

            }


            selectedSayembara.push(
                answer
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
                "sayembara-dropped";


            dropped.dataset.answer =
                answer;


            dropped.textContent =
                option.innerText
                    .replace(
                        /\s+/g,
                        " "
                    )
                    .trim();


            sayembaraDropzone.appendChild(
                dropped
            );


            sayembaraDropzone.classList.add(
                "has-items"
            );


            checkSayembara();

        }
    );

}


/* =========================================================
   CHECK SAYEMBARA
   ========================================================= */

function checkSayembara() {

    if (
        selectedSayembara.length <
        4
    ) {

        return;

    }


    const selectedCorrect =
        selectedSayembara.filter(
            function (
                answer
            ) {

                return correctSayembara.includes(
                    answer
                );

            }
        );


    const selectedWrong =
        selectedSayembara.filter(
            function (
                answer
            ) {

                return wrongSayembara.includes(
                    answer
                );

            }
        );


    if (
        selectedCorrect.length ===
        4 &&
        selectedWrong.length ===
        0
    ) {

        if (sayembaraFeedback) {

            sayembaraFeedback.textContent =
                "Benar! Kamandaka memilih langkah yang tepat di Sawangan.";


            sayembaraFeedback.classList.remove(
                "wrong"
            );


            sayembaraFeedback.classList.add(
                "correct",
                "show"
            );

        }


        if (sayembaraDropzone) {

            sayembaraDropzone.classList.add(
                "complete"
            );

        }


        sayembaraOptions.forEach(
            function (
                option
            ) {

                option.classList.remove(
                    "wrong"
                );


                option.classList.add(
                    "correct"
                );

            }
        );


        if (btnNextSayembara) {

            btnNextSayembara.disabled =
                false;


            btnNextSayembara.classList.add(
                "ready"
            );

        }

    }


    else {

        if (sayembaraFeedback) {

            sayembaraFeedback.textContent =
                "Belum tepat. Perhatikan kembali langkah Kamandaka sebelum melanjutkan.";


            sayembaraFeedback.classList.remove(
                "correct"
            );


            sayembaraFeedback.classList.add(
                "wrong",
                "show"
            );

        }


        selectedSayembara.forEach(
            function (
                answer
            ) {

                const option =
                    Array.from(
                        sayembaraOptions
                    ).find(
                        function (
                            item
                        ) {

                            return (
                                item.dataset.answer ===
                                answer
                            );

                        }
                    );


                if (
                    option &&
                    wrongSayembara.includes(
                        answer
                    )
                ) {

                    option.classList.add(
                        "wrong",
                        "shake"
                    );

                }

            }
        );


        setTimeout(
            function () {

                resetSayembara();

            },
            900
        );

    }

}


/* =========================================================
   SCREEN 07 → SCREEN 08
   ========================================================= */

if (btnNextSayembara) {

    btnNextSayembara.addEventListener(
        "click",
        function () {

            if (
                btnNextSayembara.disabled
            ) {

                return;

            }


            giveSayembaraReward();


            updateChapterRewardDisplay();


            showStoryScreen(
                storyChapter08
            );

        }
    );

}


/* =========================================================
   AUDIO FINAL
   ========================================================= */

const finalDialogueText =

    "Sawise ngrampungake perjalanan ing Sawangan, " +

    "Kamandaka siap nerusake lampah. " +

    "Saben tembung lan tandha sing ditemokake " +

    "dadi bagian penting saka perjalanan sabanjure.";


/* =========================================================
   COMPLETE GAMEPLAY 08
   ========================================================= */

function completeGameplay08() {

    const progress =
        getProgress();


    /* =====================================================
       CHAPTER 08 SELESAI
       ===================================================== */

    if (
        !progress.completedChapters.includes(
            8
        )
    ) {

        progress.completedChapters.push(
            8
        );

    }


    /* =====================================================
       LOKASI 08 SELESAI
       ===================================================== */

    if (
        !progress.completedLocations.includes(
            8
        )
    ) {

        progress.completedLocations.push(
            8
        );

    }


    /* =====================================================
       BUKA LOKASI 09
       KALI SERAYU
       ===================================================== */

    if (
        !progress.unlockedLocations.includes(
            9
        )
    ) {

        progress.unlockedLocations.push(
            9
        );

    }


    /* =====================================================
       CHAPTER BERIKUTNYA
       ===================================================== */

    progress.currentChapter =
        9;


    /* =====================================================
       HILANGKAN DUPLIKAT
       ===================================================== */

    progress.completedChapters = [

        ...new Set(
            progress.completedChapters
        )

    ];


    progress.completedLocations = [

        ...new Set(
            progress.completedLocations
        )

    ];


    progress.unlockedLocations = [

        ...new Set(
            progress.unlockedLocations
        )

    ];


    /* =====================================================
       SORT
       ===================================================== */

    progress.completedChapters.sort(
        (a, b) =>
            a - b
    );


    progress.completedLocations.sort(
        (a, b) =>
            a - b
    );


    progress.unlockedLocations.sort(
        (a, b) =>
            a - b
    );


    /* =====================================================
       SIMPAN
       ===================================================== */

    saveProgress(
        progress
    );


    console.log(
        "================================="
    );


    console.log(
        "GAMEPLAY 08 SELESAI"
    );


    console.log(
        "Sawangan selesai."
    );


    console.log(
        "Kali Serayu terbuka."
    );


    console.log(
        "Progress:",
        progress
    );


    console.log(
        "================================="
    );

}


/* =========================================================
   GET PROGRESS
   ========================================================= */

function getProgress() {

    try {

        const saved =
            sessionStorage.getItem(
                MAP_PROGRESS_KEY
            );


        if (!saved) {

            return {

                currentChapter: 8,

                totalChapters: 10,

                xp:
                    gameProgress.xp,

                basa:
                    gameProgress.basa,

                quizCompleted:
                    gameProgress.quizCompleted,

                sayembaraCompleted:
                    gameProgress.sayembaraCompleted,

                completedChapters:
                    [
                        ...gameProgress.completedChapters
                    ],

                completedLocations:
                    [
                        ...gameProgress.completedLocations
                    ],

                unlockedLocations:
                    [
                        ...gameProgress.unlockedLocations
                    ]

            };

        }


        return {

            ...gameProgress,

            ...JSON.parse(
                saved
            )

        };

    }

    catch (error) {

        console.error(
            "Gagal mendapatkan progress:",
            error
        );


        return {

            ...gameProgress

        };

    }

}


/* =========================================================
   SAVE PROGRESS OBJECT
   ========================================================= */

function saveProgress(
    progress
) {

    try {

        sessionStorage.setItem(
            MAP_PROGRESS_KEY,
            JSON.stringify(
                progress
            )
        );


        gameProgress.currentChapter =
            progress.currentChapter;


        gameProgress.xp =
            progress.xp;


        gameProgress.basa =
            progress.basa;


        gameProgress.completedChapters =
            progress.completedChapters;


        gameProgress.completedLocations =
            progress.completedLocations;


        gameProgress.unlockedLocations =
            progress.unlockedLocations;


        updateHUD();

    }

    catch (error) {

        console.error(
            "Gagal menyimpan progress:",
            error
        );

    }

}


/* =========================================================
   SCREEN 08 → PETA
   ========================================================= */

if (btnContinueChapter) {

    btnContinueChapter.addEventListener(
        "click",
        function () {

            completeGameplay08();


            window.location.href =
                "../../peta.html";

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

loadGameProgress();


updateHUD();


updateChapterProgress();


updateChapterRewardDisplay();


loadQuizQuestion();


console.log(
    "Lelana Kamandaka — Gameplay 08 Sawangan siap."
);