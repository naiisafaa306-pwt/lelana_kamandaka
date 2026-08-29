/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 08 — SAWANGAN
   APP.JS
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       STORAGE
       ===================================================== */

    const MAP_PROGRESS_KEY =
        "lelanaKamandakaProgress";


    /* =====================================================
       GAME PROGRESS
       ===================================================== */

    const gameProgress = {

        currentChapter: 8,

        totalChapters: 10,

        xp: 0,

        basa: 0,

        quizCompleted: false,

        sayembaraCompleted: false,

        completedChapters: [],

        completedLocations: [],

        unlockedLocations: [1]

    };


    /* =====================================================
       SCREEN
       ===================================================== */

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


    /* =====================================================
       BUTTON
       ===================================================== */

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


    /* =====================================================
       HUD
       ===================================================== */

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


    /* =====================================================
       CHAPTER REWARD
       ===================================================== */

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


    /* =====================================================
       UPDATE HUD
       ===================================================== */

    function updateHUD() {

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
                total;

        }

    }


    /* =====================================================
       UPDATE CHAPTER PROGRESS
       ===================================================== */

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


    /* =====================================================
       SAVE PROGRESS
       ===================================================== */

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

        }

        catch (error) {

            console.error(
                "Gagal menyimpan progress:",
                error
            );

        }

    }


    /* =====================================================
       LOAD PROGRESS
       ===================================================== */

    function loadGameProgress() {

        let savedProgress = null;


        try {

            savedProgress =
                sessionStorage.getItem(
                    MAP_PROGRESS_KEY
                );

        }

        catch (error) {

            console.warn(
                "sessionStorage tidak dapat dibaca:",
                error
            );

        }


        if (!savedProgress) {

            gameProgress.currentChapter =
                8;

            gameProgress.totalChapters =
                10;

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
                JSON.parse(
                    savedProgress
                );


            if (
                typeof parsed.currentChapter ===
                "number"
            ) {

                gameProgress.currentChapter =
                    parsed.currentChapter;

            }


            if (
                typeof parsed.totalChapters ===
                "number"
            ) {

                gameProgress.totalChapters =
                    parsed.totalChapters;

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

        }

        catch (error) {

            console.error(
                "Gagal membaca progress:",
                error
            );

        }


        if (
            !Array.isArray(
                gameProgress.completedChapters
            )
        ) {

            gameProgress.completedChapters =
                [];

        }


        if (
            !Array.isArray(
                gameProgress.completedLocations
            )
        ) {

            gameProgress.completedLocations =
                [];

        }


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

            gameProgress.unlockedLocations.unshift(
                1
            );

        }

    }


    /* =====================================================
       REWARD POPUP
       ===================================================== */

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


        if (type) {

            popup.classList.add(
                type
            );

        }


        popup.textContent =
            text;


        document.body.appendChild(
            popup
        );


        requestAnimationFrame(
            () => {

                popup.classList.add(
                    "show"
                );

            }
        );


        setTimeout(
            () => {

                popup.classList.remove(
                    "show"
                );


                setTimeout(
                    () => {

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


    /* =====================================================
       ADD XP
       ===================================================== */

    function addXP(amount) {

        if (
            typeof amount !==
            "number" ||
            amount <= 0
        ) {

            return;

        }


        gameProgress.xp +=
            amount;


        saveGameProgress();

        updateHUD();


        showRewardPopup(
            `+${amount} XP`,
            "xp"
        );

    }


    /* =====================================================
       ADD BASA
       ===================================================== */

    function addBasa(amount) {

        if (
            typeof amount !==
            "number" ||
            amount <= 0
        ) {

            return;

        }


        gameProgress.basa +=
            amount;


        saveGameProgress();

        updateHUD();


        showRewardPopup(
            `+${amount} BASA`,
            "basa"
        );

    }


    /* =====================================================
       SCREEN NAVIGATION
       ===================================================== */

    function showStoryScreen(
        screen
    ) {

        if (!screen) {

            console.error(
                "Screen tidak ditemukan."
            );

            return;

        }


        document
            .querySelectorAll(
                ".story-screen"
            )
            .forEach(
                section => {

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
            behavior: "smooth"
        });


        updateHUD();

    }


    /* =====================================================
       OPENING → DIALOG
       ===================================================== */

    if (btnBeginStory) {

        btnBeginStory.addEventListener(
            "click",
            () => {

                showStoryScreen(
                    storyDialog
                );

            }
        );

    }


    /* =====================================================
       DIALOG → TRANSITION
       ===================================================== */

    if (btnNextStory) {

        btnNextStory.addEventListener(
            "click",
            () => {

                showStoryScreen(
                    storyGameplay
                );

            }
        );

    }


    /* =====================================================
       AUDIO DIALOG
       ===================================================== */

    if (btnListen) {

        btnListen.addEventListener(
            "click",
            () => {

                if (
                    !(
                        "speechSynthesis"
                        in window
                    )
                ) {

                    alert(
                        "Fitur suara tidak tersedia di browser iki."
                    );

                    return;

                }


                const dialogs =
                    document.querySelectorAll(
                        "#story-dialog .dialog-text"
                    );


                let text = "";


                dialogs.forEach(
                    dialog => {

                        text +=
                            dialog
                                .textContent
                                .trim()
                            + " ";

                    }
                );


                if (!text.trim()) {

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


    /* =====================================================
       TRANSITION → LEARNING BASA
       ===================================================== */

    if (btnStartGameplay) {

        btnStartGameplay.addEventListener(
            "click",
            () => {

                showStoryScreen(
                    storyLearningBasa
                );

            }
        );

    }


    /* =====================================================
       SUARA KOSAKATA
       TIDAK ADA REWARD
       ===================================================== */

    window.speakBasa =
        function (word) {

            if (
                !(
                    "speechSynthesis"
                    in window
                )
            ) {

                alert(
                    "Fitur suara tidak tersedia di browser iki."
                );

                return;

            }


            if (!word) {

                return;

            }


            window.speechSynthesis.cancel();


            const utterance =
                new SpeechSynthesisUtterance(
                    word
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

        };


    /* =====================================================
       QUIZ DATA
       4 SOAL
       ===================================================== */

    const quizData = [

        {

            question:
                "Godaan kapisan sing muncul nalika Banyakcatra lagi tapa yaiku?",

            answer:
                "Macan",

            options: [

                "Ula gedhe",

                "Macan",

                "Kebo Kemali",

                "Memedi lan balung"

            ],

            feedbackCorrect:
                "Bener! Godaan kapisan sing muncul yaiku macan.",

            feedbackWrong:
                "Durung tepat. Godaan kapisan sing muncul yaiku macan."

        },


        {

            question:
                "Apa sing kedadeyan nalika ula gedhe teka nalika Banyakcatra lagi semadi?",

            answer:
                "Ula gedhe ngubengi awake",

            options: [

                "Ula gedhe ngubengi awake",

                "Ula gedhe nggawa Banyakcatra lunga",

                "Ula gedhe nyerang saka kadohan",

                "Ula gedhe malih dadi manungsa"

            ],

            feedbackCorrect:
                "Bener! Ula gedhe ngubengi awaké Banyakcatra.",

            feedbackWrong:
                "Durung tepat. Ula gedhe ngubengi awaké Banyakcatra."

        },


        {

            question:
                "Wujud medeni apa sing teka silih ganti nalika Banyakcatra nindakake semadi?",

            answer:
                "Memedi, balung, lan mayit",

            options: [

                "Manuk lan naga",

                "Memedi, balung, lan mayit",

                "Prajurit kerajaan",

                "Raksasa penjaga alas"

            ],

            feedbackCorrect:
                "Bener! Memedi, balung, lan mayit teka silih ganti.",

            feedbackWrong:
                "Durung tepat. Memedi, balung, lan mayit minangka wujud godaan."

        },


        {

            question:
                "Sapa sing dadi cobaan pungkasan lan paling nggegirisi kanggo Banyakcatra?",

            answer:
                "Kebo Kemali",

            options: [

                "Macan",

                "Ula gedhe",

                "Kebo Kemali",

                "Memedi lan balung"

            ],

            feedbackCorrect:
                "Bener! Kebo Kemali minangka cobaan pungkasan.",

            feedbackWrong:
                "Durung tepat. Cobaan pungkasan yaiku Kebo Kemali."

        }

    ];


    /* =====================================================
       QUIZ ELEMENT
       ===================================================== */

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


    let currentQuizIndex =
        0;


    let quizScore =
        0;


    let quizAnswered =
        false;


    /* =====================================================
       SHUFFLE
       ===================================================== */

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
                    * (i + 1)
                );


            [
                shuffled[i],
                shuffled[j]
            ] = [
                shuffled[j],
                shuffled[i]
            ];

        }


        return shuffled;

    }


    /* =====================================================
       LOAD QUIZ
       ===================================================== */

    function loadQuizQuestion() {

        const currentQuestion =
            quizData[
                currentQuizIndex
            ];


        if (
            !currentQuestion
        ) {

            return;

        }


        quizAnswered =
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

                    : "SOAL SABANJURE →";

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


        if (quizQuestion) {

            quizQuestion.textContent =
                currentQuestion.question;

        }


        const shuffledOptions =
            shuffleArray(
                currentQuestion.options
            );


        quizOptions.forEach(
            (
                option,
                index
            ) => {

                const answer =
                    shuffledOptions[index];


                option.dataset.answer =
                    answer;


                const text =
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


                if (text) {

                    text.textContent =
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


    /* =====================================================
       QUIZ CLICK
       ===================================================== */

    quizOptions.forEach(
        option => {

            option.addEventListener(
                "click",
                () => {

                    if (
                        quizAnswered
                    ) {

                        return;

                    }


                    const currentQuestion =
                        quizData[
                            currentQuizIndex
                        ];


                    if (
                        !currentQuestion
                    ) {

                        return;

                    }


                    const answer =
                        option.dataset.answer;


                    quizAnswered =
                        true;


                    const isCorrect =
                        answer ===
                        currentQuestion.answer;


                    /* =====================================
                       JAWABAN BENAR
                       +10 XP
                       +5 BASA
                       ===================================== */

                    if (isCorrect) {

                        quizScore++;


                        option.classList.add(
                            "correct"
                        );


                        addXP(
                            10
                        );


                        addBasa(
                            5
                        );


                        if (quizFeedback) {

                            quizFeedback.textContent =
                                currentQuestion
                                    .feedbackCorrect;


                            quizFeedback.classList.remove(
                                "wrong"
                            );


                            quizFeedback.classList.add(
                                "correct",
                                "show"
                            );

                        }

                    }


                    /* =====================================
                       JAWABAN SALAH
                       +0 XP
                       +0 BASA
                       ===================================== */

                    else {

                        option.classList.add(
                            "wrong"
                        );


                        if (quizFeedback) {

                            quizFeedback.textContent =
                                currentQuestion
                                    .feedbackWrong;


                            quizFeedback.classList.remove(
                                "correct"
                            );


                            quizFeedback.classList.add(
                                "wrong",
                                "show"
                            );

                        }


                        quizOptions.forEach(
                            item => {

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

                    }


                    /* =====================================
                       KUNCI PILIHAN
                       ===================================== */

                    quizOptions.forEach(
                        item => {

                            item.disabled =
                                true;

                        }
                    );


                    if (btnNextQuiz) {

                        btnNextQuiz.disabled =
                            false;

                    }

                }
            );

        }
    );


    /* =====================================================
       MULAI QUIZ
       ===================================================== */

    if (btnStartQuizBasa) {

        btnStartQuizBasa.addEventListener(
            "click",
            () => {

                currentQuizIndex =
                    0;


                quizScore =
                    0;


                quizAnswered =
                    false;


                gameProgress.quizCompleted =
                    false;


                showStoryScreen(
                    storyQuizBasa
                );


                loadQuizQuestion();

            }
        );

    }


    /* =====================================================
       NEXT QUIZ
       ===================================================== */

    if (btnNextQuiz) {

        btnNextQuiz.addEventListener(
            "click",
            () => {

                if (
                    !quizAnswered
                ) {

                    return;

                }


                /* =====================================
                   MASIH ADA SOAL
                   ===================================== */

                if (
                    currentQuizIndex <
                    quizData.length - 1
                ) {

                    currentQuizIndex++;


                    loadQuizQuestion();


                    return;

                }


                /* =====================================
                   4 SOAL SELESAI
                   TIDAK ADA BONUS REWARD
                   ===================================== */

                gameProgress.quizCompleted =
                    true;


                saveGameProgress();


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
                        <strong>Quiz rampung!</strong>
                        <br>
                        Wangsulanmu bener
                        <strong>
                            ${quizScore} saka ${quizData.length}
                        </strong>
                        soal.
                        <br><br>
                        <strong>
                            Ora ana bonus tambahan.
                        </strong>
                        `;

                }


                btnNextQuiz.disabled =
                    false;


                btnNextQuiz.textContent =
                    "LANJUT KE CERITA →";


                btnNextQuiz.dataset.finished =
                    "true";

            }
        );

    }


    /* =====================================================
       QUIZ FINISHED → CERITA
       ===================================================== */

    if (btnNextQuiz) {

        btnNextQuiz.addEventListener(
            "click",
            () => {

                if (
                    btnNextQuiz.dataset.finished !==
                    "true"
                ) {

                    return;

                }


                delete btnNextQuiz.dataset.finished;


                showStoryScreen(
                    storySayembaraStory
                );

            }
        );

    }


    /* =====================================================
       SAYEMBARA
       ===================================================== */

    const sayembaraDropzone =
        document.getElementById(
            "sayembaraDropzone"
        );


    const sayembaraFeedback =
        document.getElementById(
            "sayembaraFeedback"
        );


    const sayembaraOptions = [
        ...document.querySelectorAll(
            "#story-sayembara .sayembara-option"
        )
    ];


    /* =====================================================
       SAYEMBARA DATA
       ===================================================== */

    const correctSayembara =
        new Set([
            "tenang",
            "diam",
            "takut",
            "teguh"
        ]);


    const sayembaraLabels = {

        tenang:
            {
                title:
                    "TETEP TENANG",

                icon:
                    "✦"
            },

        diam:
            {
                title:
                    "TETEP MENENG",

                icon:
                    "◎"
            },

        takut:
            {
                title:
                    "NAHAN RASA WEDI",

                icon:
                    "◈"
            },

        teguh:
            {
                title:
                    "TETEP TEGUH",

                icon:
                    "♧"
            },

        lari:
            {
                title:
                    "MLAYU SAKA PAPAN",

                icon:
                    "◇"
            },

        lawan:
            {
                title:
                    "NGELAWAN COBAAN",

                icon:
                    "◌"
            },

        takluk:
            {
                title:
                    "NGLILANI RASA WEDI",

                icon:
                    "▱"
            }

    };


    /* =====================================================
       STATE SAYEMBARA
       ===================================================== */

    const selectedSayembara =
        new Set();


    let draggingSayembaraKey =
        null;


    let sayembaraAnswered =
        false;


    let sayembaraRewardGiven =
        false;


    /* =====================================================
       GET OPTION
       ===================================================== */

    function getSayembaraOption(
        key
    ) {

        return sayembaraOptions.find(
            option =>
                option.dataset.answer ===
                key
        );

    }


    /* =====================================================
       GET SLOT
       ===================================================== */

    function getSayembaraSlots() {

        if (
            !sayembaraDropzone
        ) {

            return [];

        }


        return [
            ...sayembaraDropzone.querySelectorAll(
                ".sayembara-slot"
            )
        ];

    }


    /* =====================================================
       BUAT 4 SLOT
       ===================================================== */

    function ensureSayembaraSlots() {

        if (
            !sayembaraDropzone
        ) {

            return;

        }


        const existingSlots =
            getSayembaraSlots();


        if (
            existingSlots.length ===
            4
        ) {

            return;

        }


        sayembaraDropzone.innerHTML =
            "";


        for (
            let index = 0;

            index < 4;

            index++
        ) {

            const slot =
                document.createElement(
                    "div"
                );


            slot.className =
                "sayembara-slot";


            slot.dataset.slot =
                String(
                    index + 1
                );


            slot.innerHTML =
                `
                <span class="sayembara-slot-number">
                    ${index + 1}
                </span>

                <div class="sayembara-slot-content"></div>
                `;


            sayembaraDropzone.appendChild(
                slot
            );

        }

    }


    /* =====================================================
       FEEDBACK SAYEMBARA
       ===================================================== */

    function showSayembaraFeedback(
        message,
        type
    ) {

        if (
            !sayembaraFeedback
        ) {

            return;

        }


        sayembaraFeedback.textContent =
            message;


        sayembaraFeedback.classList.remove(
            "correct",
            "wrong",
            "show"
        );


        if (type) {

            sayembaraFeedback.classList.add(
                type
            );

        }


        requestAnimationFrame(
            () => {

                sayembaraFeedback.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       UPDATE BUTTON SAYEMBARA
       ===================================================== */

    function updateSayembaraNextButton() {

        if (
            !btnNextSayembara
        ) {

            return;

        }


        const complete =
            selectedSayembara.size ===
            4;


        btnNextSayembara.disabled =
            !complete;


        btnNextSayembara.classList.toggle(
            "ready",
            complete
        );

    }


    /* =====================================================
       RESET SLOT
       ===================================================== */

    function resetSayembaraSlots() {

        ensureSayembaraSlots();


        getSayembaraSlots().forEach(
            slot => {

                const content =
                    slot.querySelector(
                        ".sayembara-slot-content"
                    );


                if (content) {

                    content.innerHTML =
                        "";

                }

            }
        );


        sayembaraDropzone.classList.remove(
            "has-items",
            "complete",
            "drag-over"
        );

    }


    /* =====================================================
       RESET SAYEMBARA
       ===================================================== */

    function resetSayembara() {

        selectedSayembara.clear();


        draggingSayembaraKey =
            null;


        sayembaraAnswered =
            false;


        sayembaraRewardGiven =
            false;


        ensureSayembaraSlots();


        resetSayembaraSlots();


        sayembaraOptions.forEach(
            option => {

                option.classList.remove(
                    "used",
                    "dragging",
                    "correct",
                    "wrong",
                    "shake"
                );


                option.disabled =
                    false;


                option.draggable =
                    true;


                option.dataset.selected =
                    "false";


                option.style.pointerEvents =
                    "";


                option.style.cursor =
                    "grab";

            }
        );


        if (
            sayembaraFeedback
        ) {

            sayembaraFeedback.textContent =
                "";


            sayembaraFeedback.classList.remove(
                "correct",
                "wrong",
                "show"
            );

        }


        updateSayembaraNextButton();

    }


    /* =====================================================
       SET LABEL SAYEMBARA
       ===================================================== */

    sayembaraOptions.forEach(
        option => {

            const key =
                option.dataset.answer;


            const data =
                sayembaraLabels[key];


            if (
                !data
            ) {

                return;

            }


            option.innerHTML =
                `
                <span class="sayembara-icon">
                    ${data.icon}
                </span>

                <strong>
                    ${data.title}
                </strong>
                `;

        }
    );


    /* =====================================================
       DRAG START
       ===================================================== */

    sayembaraOptions.forEach(
        option => {

            option.addEventListener(
                "dragstart",
                event => {

                    if (
                        option.classList.contains(
                            "used"
                        )
                    ) {

                        event.preventDefault();

                        return;

                    }


                    draggingSayembaraKey =
                        option.dataset.answer;


                    event.dataTransfer.setData(
                        "text/plain",
                        draggingSayembaraKey
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
                () => {

                    option.classList.remove(
                        "dragging"
                    );


                    draggingSayembaraKey =
                        null;

                }
            );


            /* =============================================
               KLIK JUGA BISA
               ============================================= */

            option.addEventListener(
                "click",
                () => {

                    if (
                        option.classList.contains(
                            "used"
                        )
                    ) {

                        return;

                    }


                    const key =
                        option.dataset.answer;


                    if (
                        correctSayembara.has(
                            key
                        )
                    ) {

                        addSayembaraCorrect(
                            key,
                            option
                        );

                    }

                    else {

                        showSayembaraWrong(
                            option
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       DRAG OVER
       ===================================================== */

    if (
        sayembaraDropzone
    ) {

        sayembaraDropzone.addEventListener(
            "dragover",
            event => {

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
            event => {

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
            event => {

                event.preventDefault();


                sayembaraDropzone.classList.remove(
                    "drag-over"
                );


                const key =
                    event.dataTransfer.getData(
                        "text/plain"
                    )
                    ||
                    draggingSayembaraKey;


                if (
                    !key
                ) {

                    return;

                }


                const option =
                    getSayembaraOption(
                        key
                    );


                if (
                    !option
                ) {

                    return;

                }


                if (
                    option.classList.contains(
                        "used"
                    )
                ) {

                    return;

                }


                if (
                    correctSayembara.has(
                        key
                    )
                ) {

                    addSayembaraCorrect(
                        key,
                        option
                    );

                }

                else {

                    showSayembaraWrong(
                        option
                    );

                }

            }
        );

    }


    /* =====================================================
       JAWABAN SAYEMBARA BENAR
       ===================================================== */

    function addSayembaraCorrect(
        key,
        option
    ) {

        if (
            sayembaraAnswered
        ) {

            return;

        }


        if (
            selectedSayembara.has(
                key
            )
        ) {

            return;

        }


        if (
            selectedSayembara.size >=
            4
        ) {

            return;

        }


        ensureSayembaraSlots();


        const slots =
            getSayembaraSlots();


        const slotIndex =
            selectedSayembara.size;


        const slot =
            slots[slotIndex];


        if (
            !slot
        ) {

            return;

        }


        selectedSayembara.add(
            key
        );


        /* =============================================
           MATIKAN PILIHAN ASLI
           ============================================= */

        option.classList.remove(
            "wrong",
            "shake"
        );


        option.classList.add(
            "used",
            "correct"
        );


        option.disabled =
            true;


        option.draggable =
            false;


        option.dataset.selected =
            "true";


        option.style.pointerEvents =
            "none";


        option.style.cursor =
            "default";


        /* =============================================
           COPY KE SLOT
           ============================================= */

        const slotContent =
            slot.querySelector(
                ".sayembara-slot-content"
            );


        if (
            slotContent
        ) {

            slotContent.innerHTML =
                "";


            const copy =
                option.cloneNode(
                    true
                );


            copy.classList.remove(
                "used",
                "dragging",
                "wrong",
                "shake"
            );


            copy.classList.add(
                "sayembara-slot-card"
            );


            copy.removeAttribute(
                "draggable"
            );


            copy.removeAttribute(
                "disabled"
            );


            copy.style.pointerEvents =
                "none";


            copy.setAttribute(
                "aria-hidden",
                "true"
            );


            slotContent.appendChild(
                copy
            );

        }


        sayembaraDropzone.classList.add(
            "has-items"
        );


        const remaining =
            4 -
            selectedSayembara.size;


        if (
            remaining > 0
        ) {

            showSayembaraFeedback(
                `Bener! Pilih ${remaining} sikap maneh.`,
                "correct"
            );

        }

        else {

            showSayembaraFeedback(
                "Bener! Kabeh 4 sikap sing tepat wis dipilih.",
                "correct"
            );

        }


        updateSayembaraNextButton();

    }


    /* =====================================================
       JAWABAN SAYEMBARA SALAH
       ===================================================== */

    function showSayembaraWrong(
        option
    ) {

        option.classList.remove(
            "correct"
        );


        option.classList.add(
            "wrong",
            "shake"
        );


        showSayembaraFeedback(
            "Durung tepat. Pilih sikap sing nuduhake keteguhan Banyakcatra.",
            "wrong"
        );


        setTimeout(
            () => {

                option.classList.remove(
                    "wrong",
                    "shake"
                );

            },
            700
        );

    }


    /* =====================================================
       SAYEMBARA NEXT
       ===================================================== */

    if (
        btnNextSayembara
    ) {

        btnNextSayembara.addEventListener(
            "click",
            () => {

                if (
                    selectedSayembara.size !==
                    4
                ) {

                    return;

                }


                if (
                    sayembaraAnswered
                ) {

                    return;

                }


                sayembaraAnswered =
                    true;


                sayembaraDropzone.classList.add(
                    "complete"
                );


                showSayembaraFeedback(
                    "Bener! Kabeh papat sikap wis nuduhake keteguhan Banyakcatra.",
                    "correct"
                );


                /* =====================================
                   SAYEMBARA REWARD
                   HANYA SEKALI
                   +50 XP
                   ===================================== */

                if (
                    !sayembaraRewardGiven
                ) {

                    sayembaraRewardGiven =
                        true;


                    addXP(
                        50
                    );


                    gameProgress.sayembaraCompleted =
                        true;


                    saveGameProgress();

                }


                btnNextSayembara.disabled =
                    true;


                setTimeout(
                    () => {

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


    /* =====================================================
       CHAPTER REWARD DISPLAY
       ===================================================== */

    function updateChapterRewardDisplay() {

        if (
            chapterXpReward
        ) {

            chapterXpReward.textContent =
                "+50 XP";

        }


        if (
            chapterBasaReward
        ) {

            chapterBasaReward.textContent =
                "PAKAIAN SAKTI";

        }

    }


    /* =====================================================
       CERITA → SAYEMBARA
       ===================================================== */

    if (
        btnStartSayembara
    ) {

        btnStartSayembara.addEventListener(
            "click",
            () => {

                resetSayembara();


                showStoryScreen(
                    storySayembara
                );

            }
        );

    }


    /* =====================================================
       CHAPTER 08 → PETA
       ===================================================== */

    if (
        btnContinueChapter
    ) {

        btnContinueChapter.addEventListener(
            "click",
            () => {

                /* =====================================
                   CHAPTER 08 SELESAI
                   ===================================== */

                gameProgress.currentChapter =
                    9;


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
                        8
                    )
                ) {

                    gameProgress.completedChapters.push(
                        8
                    );

                }


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
                        8
                    )
                ) {

                    gameProgress.completedLocations.push(
                        8
                    );

                }


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


                /* =====================================
                   BUKA LOKASI 09
                   ===================================== */

                if (
                    !gameProgress.unlockedLocations.includes(
                        9
                    )
                ) {

                    gameProgress.unlockedLocations.push(
                        9
                    );

                }


                /* =====================================
                   HILANGKAN DUPLIKAT
                   ===================================== */

                gameProgress.completedChapters =
                    [
                        ...new Set(
                            gameProgress.completedChapters
                        )
                    ];


                gameProgress.completedLocations =
                    [
                        ...new Set(
                            gameProgress.completedLocations
                        )
                    ];


                gameProgress.unlockedLocations =
                    [
                        ...new Set(
                            gameProgress.unlockedLocations
                        )
                    ];


                /* =====================================
                   URUTKAN
                   ===================================== */

                gameProgress.completedChapters.sort(
                    (a, b) =>
                        a - b
                );


                gameProgress.completedLocations.sort(
                    (a, b) =>
                        a - b
                );


                gameProgress.unlockedLocations.sort(
                    (a, b) =>
                        a - b
                );


                saveGameProgress();


                updateChapterProgress();

                updateHUD();


                window.location.href =
                    "../../peta.html";

            }
        );

    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initializeGame() {

        loadGameProgress();


        /*
         * Kalau Gameplay 08 dibuka langsung,
         * pastikan tetap berada di Bab 08.
         */

        if (
            !gameProgress.completedChapters.includes(
                8
            )
            &&
            gameProgress.currentChapter < 8
        ) {

            gameProgress.currentChapter =
                8;

        }


        updateChapterProgress();

        updateChapterRewardDisplay();

        updateHUD();


        /* =====================================
           BUAT 4 SLOT SAYEMBARA
           ===================================== */

        ensureSayembaraSlots();


        resetSayembara();


        /* =====================================
           SEMUA SCREEN NONAKTIF
           ===================================== */

        document
            .querySelectorAll(
                ".story-screen"
            )
            .forEach(
                section => {

                    section.classList.remove(
                        "active"
                    );

                }
            );


        /* =====================================
           MULAI DARI OPENING
           ===================================== */

        showStoryScreen(
            storyOpening
        );


        /* =====================================
           RESET QUIZ
           ===================================== */

        currentQuizIndex =
            0;


        quizScore =
            0;


        quizAnswered =
            false;


        console.log(
            "Lelana Kamandaka — Gameplay 08 Sawangan siap."
        );


        console.log(
            "Alur: Opening → Dialog → Transition → Sinau Basa → Quiz → Cerita → Sayembara → Anugerah Dewata."
        );


        console.log(
            "Quiz benar: +10 XP +5 BASA."
        );


        console.log(
            "Quiz salah: +0 XP +0 BASA."
        );


        console.log(
            "Tidak ada bonus tambahan setelah quiz selesai."
        );


        console.log(
            "Sayembara benar: +50 XP."
        );

    }


    /* =====================================================
       DOM READY
       ===================================================== */

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


})();