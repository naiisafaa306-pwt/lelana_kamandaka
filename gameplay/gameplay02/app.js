/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 02 — KI AJAR WINARONG
   APP.JS

   SISTEM REWARD

   BENAR 1 SOAL
   +20 XP
   +4 BASA

   BENAR 2 SOAL
   +40 XP
   +8 BASA

   BENAR 3 SOAL
   +60 XP
   +12 BASA

   BENAR 4 SOAL
   +80 XP
   +16 BASA

   BENAR 5 SOAL
   +100 XP
   +20 BASA

   SALAH
   +0 XP
   +0 BASA

   TIDAK ADA BONUS TAMBAHAN DI AKHIR.
   ========================================================= */


(() => {

    "use strict";


    /* =========================================================
       CONFIG
       ========================================================= */

    const STORAGE_KEY =
        "lelanaKamandakaProgress";

    const CURRENT_LOCATION =
        2;

    const CURRENT_LEVEL =
        2;

    const NEXT_LOCATION =
        3;

    const TOTAL_CHAPTERS =
        10;

    const TOTAL_QUESTIONS =
        5;

    const QUESTION_XP_REWARD =
        20;

    const QUESTION_BASA_REWARD =
        4;


    /* =========================================================
       ELEMENT
       ========================================================= */

    const globalNavbar =
        document.getElementById(
            "globalNavbar"
        );


    /* =========================================================
       HERO
       ========================================================= */

    const gameplayHero =
        document.getElementById(
            "gameplayHero"
        );

    const startGameplay =
        document.getElementById(
            "startGameplay"
        );


    /* =========================================================
       INFORMATION
       ========================================================= */

    const gameplayInfoGrid =
        document.querySelector(
            ".gameplay-info-grid"
        );

    const gameplayPanel =
        document.querySelector(
            ".gameplay-panel"
        );


    /* =========================================================
       FINISH
       ========================================================= */

    const gameplayFinish =
        document.getElementById(
            "gameplayFinish"
        );


    /* =========================================================
       GAMEPLAY HEADER
       ========================================================= */

    const gameplayProgressText =
        document.getElementById(
            "gameplayProgressText"
        );


    /* =========================================================
       MODAL
       ========================================================= */

    const gameplayModal =
        document.getElementById(
            "gameplayModal"
        );

    const gameplayOverlay =
        document.getElementById(
            "gameplayOverlay"
        );

    const gameplayClose =
        document.getElementById(
            "gameplayClose"
        );


    /* =========================================================
       MODAL CONTENT
       ========================================================= */

    const gameplayDialogTitle =
        document.getElementById(
            "gameplayDialogTitle"
        );

    const gameplayQuestionImage =
        document.getElementById(
            "gameplayQuestionImage"
        );

    const gameplayQuestionTitle =
        document.getElementById(
            "gameplayQuestionTitle"
        );

    const gameplayQuestionText =
        document.getElementById(
            "gameplayQuestionText"
        );

    const gameplayAnswers =
        document.getElementById(
            "gameplayAnswers"
        );

    const gameplayPrimary =
        document.getElementById(
            "gameplayPrimary"
        );

    const gameplaySecondary =
        document.getElementById(
            "gameplaySecondary"
        );


    /* =========================================================
       MODAL PROGRESS
       ========================================================= */

    const gameplaySteps = [
        ...document.querySelectorAll(
            ".lk-gameplay-step"
        )
    ];


    /* =========================================================
       HUD
       ========================================================= */

    const playerLevel =
        document.getElementById(
            "playerLevel"
        );

    const playerXpTop =
        document.getElementById(
            "playerXpTop"
        );

    const playerXpBar =
        document.getElementById(
            "playerXpBar"
        );

    const playerXpBottom =
        document.getElementById(
            "playerXpBottom"
        );


    /* =========================================================
       STATE
       ========================================================= */

    let progress =
        null;

    let currentQuestion =
        0;

    let selectedAnswer =
        null;

    let answeredQuestions =
        0;

    let score =
        0;

    /*
       HASIL KUIS TERAKHIR

       Ini sengaja dipisahkan dari progress.xp.

       progress.xp
       = total XP pemain.

       lastQuizXP
       = XP yang diperoleh dari kuis TERAKHIR.

       Jadi halaman selesai tidak akan salah
       menampilkan total XP sebagai reward kuis.
    */

    let lastQuizScore =
        0;

    let lastQuizXP =
        0;

    let lastQuizBasa =
        0;

    let challengeStarted =
        false;

    let challengeFinished =
        false;


    /* =========================================================
       QUESTION DATA
       ========================================================= */

    const questions = [

        {
            number: 1,

            title:
                "Ungkapan yang paling sopan",

            text:
                "Kamandaka sedang berbicara kepada orang yang lebih tua. Ungkapan manakah yang paling tepat digunakan?",

            image:
                "../../assets/characters/ki_ajar_winarong.png",

            answers: [

                {
                    label:
                        "A",

                    text:
                        "Asma kula Kamandaka.",

                    value:
                        "correct"
                },

                {
                    label:
                        "B",

                    text:
                        "Jenengku Kamandaka.",

                    value:
                        "wrong"
                }

            ]

        },


        {
            number: 2,

            title:
                "Bahasa yang lebih sopan",

            text:
                "Ketika berbicara kepada Ki Ajar Winarong, kalimat manakah yang paling sopan?",

            image:
                "../../assets/characters/ki_ajar_winarong.png",

            answers: [

                {
                    label:
                        "A",

                    text:
                        "Kula nyuwun pangapunten, Ki Ajar.",

                    value:
                        "correct"
                },

                {
                    label:
                        "B",

                    text:
                        "Aku njaluk ngapura, Ki Ajar.",

                    value:
                        "wrong"
                }

            ]

        },


        {
            number: 3,

            title:
                "Meminta izin",

            text:
                "Kamandaka ingin meminta izin untuk melanjutkan perjalanan. Ungkapan yang paling tepat adalah ...",

            image:
                "../../assets/characters/ki_ajar_winarong.png",

            answers: [

                {
                    label:
                        "A",

                    text:
                        "Kula nyuwun pamit, Ki Ajar.",

                    value:
                        "correct"
                },

                {
                    label:
                        "B",

                    text:
                        "Aku lunga dhisik.",

                    value:
                        "wrong"
                }

            ]

        },


        {
            number: 4,

            title:
                "Ungkapan terima kasih",

            text:
                "Setelah mendapatkan bantuan dari Ki Ajar Winarong, Kamandaka ingin mengucapkan terima kasih dengan sopan. Jawaban yang tepat adalah ...",

            image:
                "../../assets/characters/ki_ajar_winarong.png",

            answers: [

                {
                    label:
                        "A",

                    text:
                        "Matur nuwun sanget, Ki Ajar.",

                    value:
                        "correct"
                },

                {
                    label:
                        "B",

                    text:
                        "Makasih, ya.",

                    value:
                        "wrong"
                }

            ]

        },


        {
            number: 5,

            title:
                "Berbicara kepada orang yang lebih tua",

            text:
                "Manakah kalimat yang menunjukkan sikap sopan ketika berbicara kepada Ki Ajar Winarong?",

            image:
                "../../assets/characters/ki_ajar_winarong.png",

            answers: [

                {
                    label:
                        "A",

                    text:
                        "Kula badhe nerusake lelampahan.",

                    value:
                        "correct"
                },

                {
                    label:
                        "B",

                    text:
                        "Aku arep nerusake perjalanan.",

                    value:
                        "wrong"
                }

            ]

        }

    ];


    /* =========================================================
       DEFAULT PROGRESS
       ========================================================= */

    function createDefaultProgress() {

        return {

            currentChapter:
                1,

            totalChapters:
                TOTAL_CHAPTERS,

            xp:
                0,

            basa:
                0,

            quizCompleted:
                false,

            completedChapters:
                [],

            completedLocations:
                [],

            unlockedLocations:
                [1]

        };

    }


    /* =========================================================
       ARRAY NORMALIZER
       ========================================================= */

    function uniqueSortedArray(
        value,
        fallback = []
    ) {

        if (
            !Array.isArray(value)
        ) {

            return [
                ...fallback
            ];

        }

        return [
            ...new Set(

                value
                    .map(Number)
                    .filter(
                        Number.isFinite
                    )

            )

        ].sort(
            (
                a,
                b
            ) =>
                a - b
        );

    }


    /* =========================================================
       LOAD PROGRESS
       ========================================================= */

    function loadProgress() {

        let saved =
            null;


        /* -----------------------------------------------------
           LOCAL STORAGE
           ----------------------------------------------------- */

        try {

            saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

        }

        catch (
            error
        ) {

            console.warn(
                "LocalStorage tidak dapat dibaca.",
                error
            );

        }


        /* -----------------------------------------------------
           SESSION STORAGE
           ----------------------------------------------------- */

        if (
            !saved
        ) {

            try {

                saved =
                    sessionStorage.getItem(
                        STORAGE_KEY
                    );

            }

            catch (
                error
            ) {

                console.warn(
                    "SessionStorage tidak dapat dibaca.",
                    error
                );

            }

        }


        /* -----------------------------------------------------
           DEFAULT
           ----------------------------------------------------- */

        let data =
            createDefaultProgress();


        /* -----------------------------------------------------
           PARSE
           ----------------------------------------------------- */

        if (
            saved
        ) {

            try {

                const parsed =
                    JSON.parse(
                        saved
                    );

                data = {

                    ...data,

                    ...parsed

                };

            }

            catch (
                error
            ) {

                console.warn(
                    "Progress lama tidak dapat dibaca. Menggunakan progress baru.",
                    error
                );

            }

        }


        /* -----------------------------------------------------
           NORMALIZE
           ----------------------------------------------------- */

        data.currentChapter =
            Number(
                data.currentChapter
            ) || 1;

        data.totalChapters =
            Number(
                data.totalChapters
            ) || TOTAL_CHAPTERS;

        data.xp =
            Number(
                data.xp
            ) || 0;

        data.basa =
            Number(
                data.basa
            ) || 0;

        data.quizCompleted =
            Boolean(
                data.quizCompleted
            );

        data.completedChapters =
            uniqueSortedArray(
                data.completedChapters
            );

        data.completedLocations =
            uniqueSortedArray(
                data.completedLocations
            );

        data.unlockedLocations =
            uniqueSortedArray(
                data.unlockedLocations,
                [1]
            );


        /* -----------------------------------------------------
           LOKASI 01 SELALU TERBUKA
           ----------------------------------------------------- */

        if (
            !data.unlockedLocations.includes(
                1
            )
        ) {

            data.unlockedLocations.push(
                1
            );

        }


        /* -----------------------------------------------------
           CHAPTER 01 SELESAI
           → LOKASI 02 TERBUKA
           ----------------------------------------------------- */

        if (

            data.completedChapters.includes(
                1
            )

            &&

            !data.unlockedLocations.includes(
                2
            )

        ) {

            data.unlockedLocations.push(
                2
            );

        }


        /* -----------------------------------------------------
           CHAPTER 02 SELESAI
           → LOKASI 03 TERBUKA
           ----------------------------------------------------- */

        if (

            data.completedChapters.includes(
                2
            )

            &&

            !data.unlockedLocations.includes(
                3
            )

        ) {

            data.unlockedLocations.push(
                3
            );

        }


        data.unlockedLocations =
            uniqueSortedArray(
                data.unlockedLocations
            );


        return data;

    }


    /* =========================================================
       SAVE PROGRESS
       ========================================================= */

    function saveProgress() {

        if (
            !progress
        ) {

            return;

        }


        progress.completedChapters =
            uniqueSortedArray(
                progress.completedChapters
            );

        progress.completedLocations =
            uniqueSortedArray(
                progress.completedLocations
            );

        progress.unlockedLocations =
            uniqueSortedArray(
                progress.unlockedLocations,
                [1]
            );


        const data = {

            currentChapter:
                Number(
                    progress.currentChapter
                ) || 1,

            totalChapters:
                TOTAL_CHAPTERS,

            xp:
                Number(
                    progress.xp
                ) || 0,

            basa:
                Number(
                    progress.basa
                ) || 0,

            quizCompleted:
                Boolean(
                    progress.quizCompleted
                ),

            completedChapters:
                progress.completedChapters,

            completedLocations:
                progress.completedLocations,

            unlockedLocations:
                progress.unlockedLocations

        };


        /* -----------------------------------------------------
           LOCAL STORAGE
           ----------------------------------------------------- */

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    data
                )
            );

        }

        catch (
            error
        ) {

            console.error(
                "Gagal menyimpan progress ke localStorage.",
                error
            );

        }


        /* -----------------------------------------------------
           SESSION STORAGE
           ----------------------------------------------------- */

        try {

            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    data
                )
            );

        }

        catch (
            error
        ) {

            console.warn(
                "Gagal menyimpan progress ke sessionStorage.",
                error
            );

        }

    }


    /* =========================================================
       HUD — LEVEL
       ========================================================= */

    function updateLevelHUD() {

        if (
            playerLevel
        ) {

            playerLevel.textContent =
                "Level 02";

        }

    }


    /* =========================================================
       HUD — XP
       ========================================================= */

    function updateXPHUD() {

        const xp =
            Number(
                progress?.xp
            ) || 0;


        if (
            playerXpTop
        ) {

            playerXpTop.textContent =
                `${xp} XP`;

        }


        if (
            playerXpBottom
        ) {

            playerXpBottom.textContent =
                `${xp.toLocaleString("id-ID")} / 1.000 XP`;

        }


        if (
            playerXpBar
        ) {

            const percentage =
                Math.min(
                    (
                        xp /
                        1000
                    ) * 100,

                    100
                );


            playerXpBar.style.width =
                `${percentage}%`;

        }

    }


    /* =========================================================
       GAMEPLAY HEADER PROGRESS
       ========================================================= */

    function updateGameplayProgress() {

        if (
            !gameplayProgressText
        ) {

            return;

        }


        if (
            challengeFinished
        ) {

            gameplayProgressText.textContent =
                "05 / 05";

            return;

        }


        const current =
            Math.min(
                answeredQuestions + 1,
                TOTAL_QUESTIONS
            );


        gameplayProgressText.textContent =
            `${String(current).padStart(2, "0")} / 05`;

    }


    /* =========================================================
       UPDATE HUD
       ========================================================= */

    function updateHUD() {

        updateLevelHUD();

        updateXPHUD();

        updateGameplayProgress();

    }


    /* =========================================================
       ADD XP
       ========================================================= */

    function addXP(
        amount
    ) {

        amount =
            Number(
                amount
            );


        if (

            !Number.isFinite(
                amount
            )

            ||

            amount <= 0

        ) {

            return;

        }


        progress.xp +=
            amount;


        updateXPHUD();

    }


    /* =========================================================
       ADD BASA
       ========================================================= */

    function addBasa(
        amount
    ) {

        amount =
            Number(
                amount
            );


        if (

            !Number.isFinite(
                amount
            )

            ||

            amount <= 0

        ) {

            return;

        }


        progress.basa +=
            amount;

    }


    /* =========================================================
       HERO TEXT
       ========================================================= */

    function updateHeroTexts() {

        const heroEyebrow =
            document.querySelector(
                ".gameplay-eyebrow"
            );

        const heroDescription =
            document.querySelector(
                ".gameplay-description"
            );

        const objectiveLabel =
            document.querySelector(
                ".gameplay-objective small"
            );

        const objectiveText =
            document.querySelector(
                ".gameplay-objective strong"
            );


        if (
            heroEyebrow
        ) {

            heroEyebrow.textContent =
                "PERTEMUAN DI PERJALANAN";

        }


        if (
            heroDescription
        ) {

            heroDescription.textContent =
                "Kamandaka melanjutkan perjalanan dan bertemu dengan Ki Ajar Winarong. Di tempat ini, ia belajar menggunakan bahasa yang sopan saat berkomunikasi dengan orang yang lebih tua.";

        }


        if (
            objectiveLabel
        ) {

            objectiveLabel.textContent =
                "TUJUAN";

        }


        if (
            objectiveText
        ) {

            objectiveText.textContent =
                "Jawab semua pertanyaan dengan benar.";

        }

    }


    /* =========================================================
       PREPARE PAGE
       ========================================================= */

    function preparePageLayout() {

        if (
            gameplayInfoGrid
        ) {

            gameplayInfoGrid.style.display =
                "none";

        }


        if (
            gameplayPanel
        ) {

            gameplayPanel.style.display =
                "none";

        }


        if (
            gameplayFinish
        ) {

            gameplayFinish.style.display =
                "none";

            gameplayFinish.classList.remove(
                "active"
            );

        }


        if (
            gameplayHero
        ) {

            gameplayHero.style.display =
                "block";

        }

    }


    /* =========================================================
       OPEN MODAL
       ========================================================= */

    function openGameplayModal() {

        if (
            !gameplayModal
        ) {

            console.error(
                "Element #gameplayModal tidak ditemukan."
            );

            return;

        }


        challengeStarted =
            true;

        currentQuestion =
            0;

        selectedAnswer =
            null;

        answeredQuestions =
            0;

        score =
            0;

        lastQuizScore =
            0;

        lastQuizXP =
            0;

        lastQuizBasa =
            0;

        challengeFinished =
            false;


        gameplayModal.classList.add(
            "show"
        );

        gameplayModal.classList.remove(
            "active"
        );

        gameplayModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "lk-gameplay-modal-open"
        );


        renderQuestion();

        updateGameplayProgress();

    }


    /* =========================================================
       CLOSE MODAL
       ========================================================= */

    function closeGameplayModal() {

        if (
            !gameplayModal
        ) {

            return;

        }


        gameplayModal.classList.remove(
            "show"
        );

        gameplayModal.classList.remove(
            "active"
        );

        gameplayModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "lk-gameplay-modal-open"
        );

    }


    /* =========================================================
       RENDER QUESTION
       ========================================================= */

    function renderQuestion() {

        const question =
            questions[
                currentQuestion
            ];


        if (
            !question
        ) {

            return;

        }


        selectedAnswer =
            null;


        /* -----------------------------------------------------
           TITLE
           ----------------------------------------------------- */

        if (
            gameplayDialogTitle
        ) {

            gameplayDialogTitle.textContent =
                "Ki Ajar Winarong";

        }


        /* -----------------------------------------------------
           IMAGE
           ----------------------------------------------------- */

        if (
            gameplayQuestionImage
        ) {

            gameplayQuestionImage.src =
                question.image;

            gameplayQuestionImage.alt =
                "Ilustrasi Ki Ajar Winarong";

            gameplayQuestionImage.style.display =
                "block";

            gameplayQuestionImage.onerror =
                () => {

                    console.error(
                        "Gambar pertanyaan tidak ditemukan:",
                        question.image
                    );

                };

        }


        /* -----------------------------------------------------
           QUESTION TITLE
           ----------------------------------------------------- */

        if (
            gameplayQuestionTitle
        ) {

            gameplayQuestionTitle.textContent =
                question.title;

        }


        /* -----------------------------------------------------
           QUESTION TEXT
           ----------------------------------------------------- */

        if (
            gameplayQuestionText
        ) {

            gameplayQuestionText.textContent =
                question.text;

        }


        /* -----------------------------------------------------
           ANSWERS
           ----------------------------------------------------- */

        renderAnswers(
            question.answers
        );


        /* -----------------------------------------------------
           PRIMARY BUTTON
           ----------------------------------------------------- */

        if (
            gameplayPrimary
        ) {

            gameplayPrimary.disabled =
                true;

            gameplayPrimary.classList.remove(
                "correct",
                "wrong"
            );

            gameplayPrimary.innerHTML = `
                <span>JAWAB</span>
                <span>→</span>
            `;

        }


        /* -----------------------------------------------------
           SECONDARY BUTTON
           ----------------------------------------------------- */

        if (
            gameplaySecondary
        ) {

            gameplaySecondary.textContent =
                "Kembali";

        }


        updateQuestionSteps();


        /* -----------------------------------------------------
           SCROLL MODAL KE ATAS
           ----------------------------------------------------- */

        const dialog =
            gameplayModal?.querySelector(
                ".lk-gameplay-dialog"
            );


        if (
            dialog
        ) {

            dialog.scrollTop =
                0;

        }

    }


    /* =========================================================
       RENDER ANSWERS
       ========================================================= */

    function renderAnswers(
        answers
    ) {

        if (
            !gameplayAnswers
        ) {

            return;

        }


        gameplayAnswers.innerHTML =
            "";


        answers.forEach(
            answer => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";

                button.className =
                    "gameplay-choice-button";

                button.dataset.answer =
                    answer.value;

                button.dataset.label =
                    answer.label;


                button.innerHTML = `

                    <span>
                        ${answer.label}
                    </span>

                    <strong>
                        ${answer.text}
                    </strong>

                `;


                button.addEventListener(
                    "click",
                    () => {

                        selectAnswer(
                            button
                        );

                    }
                );


                gameplayAnswers.appendChild(
                    button
                );

            }
        );

    }


    /* =========================================================
       SELECT ANSWER
       ========================================================= */

    function selectAnswer(
        button
    ) {

        if (
            !button
        ) {

            return;

        }


        if (
            button.disabled
        ) {

            return;

        }


        const buttons = [
            ...gameplayAnswers.querySelectorAll(
                ".gameplay-choice-button"
            )
        ];


        buttons.forEach(
            item => {

                item.classList.remove(
                    "selected"
                );

            }
        );


        button.classList.add(
            "selected"
        );


        selectedAnswer =
            button;


        if (
            gameplayPrimary
        ) {

            gameplayPrimary.disabled =
                false;

        }

    }


    /* =========================================================
       ANSWER QUESTION
       ========================================================= */

    function answerQuestion() {

        if (
            !selectedAnswer
        ) {

            return;

        }


        const buttons = [
            ...gameplayAnswers.querySelectorAll(
                ".gameplay-choice-button"
            )
        ];


        /* -----------------------------------------------------
           KUNCI SEMUA JAWABAN
           ----------------------------------------------------- */

        buttons.forEach(
            button => {

                button.disabled =
                    true;

            }
        );


        /* -----------------------------------------------------
           CEK JAWABAN
           ----------------------------------------------------- */

        const isCorrect =
            selectedAnswer.dataset.answer ===
            "correct";


        /* =====================================================
           BENAR
           ===================================================== */

        if (
            isCorrect
        ) {

            selectedAnswer.classList.remove(
                "selected"
            );

            selectedAnswer.classList.add(
                "correct"
            );


            /*
               JUMLAH BENAR BERTAMBAH
            */

            score++;


            /*
               SIMPAN HASIL KUIS SEMENTARA

               PENTING:
               lastQuizXP bukan total XP pemain.

               Ini hanya reward dari jawaban
               yang benar dalam kuis ini.
            */

            lastQuizScore =
                score;

            lastQuizXP =
                score *
                QUESTION_XP_REWARD;

            lastQuizBasa =
                score *
                QUESTION_BASA_REWARD;


            /*
               REWARD HANYA KARENA BENAR
            */

            addXP(
                QUESTION_XP_REWARD
            );

            addBasa(
                QUESTION_BASA_REWARD
            );

        }


        /* =====================================================
           SALAH
           ===================================================== */

        else {

            selectedAnswer.classList.remove(
                "selected"
            );

            selectedAnswer.classList.add(
                "wrong"
            );


            /*
               CARI JAWABAN BENAR
            */

            const correctButton =
                buttons.find(
                    button =>
                        button.dataset.answer ===
                        "correct"
                );


            if (
                correctButton
            ) {

                correctButton.classList.add(
                    "correct"
                );

            }

        }


        /*
           SOAL SELESAI
        */

        answeredQuestions++;


        /*
           SIMPAN PROGRESS
        */

        saveProgress();


        /*
           UPDATE HUD
        */

        updateHUD();


        /*
           BUTTON
        */

        if (
            gameplayPrimary
        ) {

            gameplayPrimary.disabled =
                false;


            if (
                currentQuestion <
                TOTAL_QUESTIONS - 1
            ) {

                gameplayPrimary.innerHTML = `
                    <span>LANJUT</span>
                    <span>→</span>
                `;

            }

            else {

                gameplayPrimary.innerHTML = `
                    <span>SELESAI</span>
                    <span>✓</span>
                `;

            }

        }


        updateQuestionSteps();


        /*
           PENTING:

           Jangan reset lastQuizScore,
           lastQuizXP, lastQuizBasa.

           Nilai ini dibutuhkan oleh
           halaman selesai.
        */

        selectedAnswer =
            null;

    }


    /* =========================================================
       NEXT QUESTION
       ========================================================= */

    function nextQuestion() {

        if (
            currentQuestion >=
            TOTAL_QUESTIONS - 1
        ) {

            finishChallenge();

            return;

        }


        currentQuestion++;

        renderQuestion();

    }


    /* =========================================================
       PRIMARY BUTTON
       ========================================================= */

    function handlePrimaryButton() {

        if (
            !gameplayAnswers
        ) {

            return;

        }


        const selected =
            gameplayAnswers.querySelector(
                ".gameplay-choice-button.selected"
            );


        /* -----------------------------------------------------
           BELUM MENJAWAB
           ----------------------------------------------------- */

        if (
            selected
        ) {

            selectedAnswer =
                selected;

            answerQuestion();

            return;

        }


        /* -----------------------------------------------------
           SUDAH MENJAWAB
           ----------------------------------------------------- */

        const answered =
            gameplayAnswers.querySelector(
                ".gameplay-choice-button.correct, .gameplay-choice-button.wrong"
            );


        if (
            answered
        ) {

            nextQuestion();

        }

    }


    /* =========================================================
       QUESTION STEPS
       ========================================================= */

    function updateQuestionSteps() {

        gameplaySteps.forEach(
            (
                step,
                index
            ) => {

                step.classList.remove(
                    "active",
                    "completed"
                );


                /*
                   SOAL AKTIF
                */

                if (
                    index ===
                    currentQuestion
                ) {

                    step.classList.add(
                        "active"
                    );

                }


                /*
                   SOAL SELESAI
                */

                if (
                    index <
                    answeredQuestions
                ) {

                    step.classList.add(
                        "completed"
                    );

                }

            }
        );

    }


    /* =========================================================
       FINISH CHALLENGE
       ========================================================= */

    function finishChallenge() {

        if (
            challengeFinished
        ) {

            return;

        }


        challengeFinished =
            true;


        /*
           QUIZ SELESAI
        */

        progress.quizCompleted =
            true;


        /*
           TIDAK ADA FINAL REWARD.

           Semua reward sudah diberikan
           langsung ketika jawaban benar.

           0 benar
           = +0 XP / +0 BASA

           1 benar
           = +20 XP / +4 BASA

           2 benar
           = +40 XP / +8 BASA

           3 benar
           = +60 XP / +12 BASA

           4 benar
           = +80 XP / +16 BASA

           5 benar
           = +100 XP / +20 BASA
        */


        /* -----------------------------------------------------
           CHAPTER 02 SELESAI
           ----------------------------------------------------- */

        if (
            !progress.completedChapters.includes(
                CURRENT_LOCATION
            )
        ) {

            progress.completedChapters.push(
                CURRENT_LOCATION
            );

        }


        /* -----------------------------------------------------
           LOKASI 02 SELESAI
           ----------------------------------------------------- */

        if (
            !progress.completedLocations.includes(
                CURRENT_LOCATION
            )
        ) {

            progress.completedLocations.push(
                CURRENT_LOCATION
            );

        }


        /* -----------------------------------------------------
           BUKA LOKASI 03
           ----------------------------------------------------- */

        if (
            !progress.unlockedLocations.includes(
                NEXT_LOCATION
            )
        ) {

            progress.unlockedLocations.push(
                NEXT_LOCATION
            );

        }


        /* -----------------------------------------------------
           CHAPTER BERIKUTNYA
           ----------------------------------------------------- */

        progress.currentChapter =
            NEXT_LOCATION;


        /* -----------------------------------------------------
           NORMALIZE
           ----------------------------------------------------- */

        progress.completedChapters =
            uniqueSortedArray(
                progress.completedChapters
            );

        progress.completedLocations =
            uniqueSortedArray(
                progress.completedLocations
            );

        progress.unlockedLocations =
            uniqueSortedArray(
                progress.unlockedLocations
            );


        /* -----------------------------------------------------
           SAVE
           ----------------------------------------------------- */

        saveProgress();


        /* -----------------------------------------------------
           UPDATE HUD
           ----------------------------------------------------- */

        updateHUD();


        /* -----------------------------------------------------
           CLOSE MODAL
           ----------------------------------------------------- */

        closeGameplayModal();


        /* -----------------------------------------------------
           SHOW FINISH
           ----------------------------------------------------- */

        showFinish();


        /* -----------------------------------------------------
           TAMPILKAN REWARD KUIS
           ----------------------------------------------------- */

        updateFinishReward();

    }


    /* =========================================================
       SHOW FINISH
       ========================================================= */

    function showFinish() {

        if (
            gameplayHero
        ) {

            gameplayHero.style.display =
                "none";

        }


        if (
            gameplayInfoGrid
        ) {

            gameplayInfoGrid.style.display =
                "none";

        }


        if (
            gameplayPanel
        ) {

            gameplayPanel.style.display =
                "none";

        }


        if (
            gameplayFinish
        ) {

            gameplayFinish.style.display =
                "flex";

            gameplayFinish.classList.add(
                "active"
            );

        }


        updateGameplayProgress();

    }


    /* =========================================================
       UPDATE FINISH REWARD
       ========================================================= */

    function updateFinishReward() {

        if (
            !gameplayFinish
        ) {

            return;

        }


        /*
           AMBIL REWARD DARI KUIS TERAKHIR.

           BUKAN FINAL_XP_REWARD.
           BUKAN FINAL_BASA_REWARD.

           Jadi hasil mengikuti jumlah benar.
        */

        const earnedXP =
            Number(
                lastQuizXP
            ) || 0;

        const earnedBasa =
            Number(
                lastQuizBasa
            ) || 0;

        const earnedScore =
            Number(
                lastQuizScore
            ) || 0;


        /*
           CARI SEMUA STRONG
           DI HALAMAN SELESAI
        */

        const rewardElements =
            gameplayFinish.querySelectorAll(
                "strong"
            );


        rewardElements.forEach(
            element => {

                const text =
                    element.textContent
                        .trim()
                        .toUpperCase();


                /*
                   XP
                */

                if (
                    text.includes(
                        "XP"
                    )
                ) {

                    element.textContent =
                        `+${earnedXP} XP`;

                }


                /*
                   BASA
                */

                else if (
                    text.includes(
                        "BASA"
                    )
                ) {

                    element.textContent =
                        `+${earnedBasa} BASA`;

                }

            }
        );


        /*
           KALAU INDEX HTML
           PUNYA DATA-SCORE
        */

        const scoreElements =
            gameplayFinish.querySelectorAll(
                "[data-score]"
            );


        scoreElements.forEach(
            element => {

                element.textContent =
                    `${earnedScore} / ${TOTAL_QUESTIONS}`;

            }
        );


        /*
           DEBUG CONSOLE
        */

        console.log(
            "================================"
        );

        console.log(
            "HASIL GAMEPLAY 02"
        );

        console.log(
            "Benar:",
            earnedScore,
            "/",
            TOTAL_QUESTIONS
        );

        console.log(
            "XP dari kuis:",
            earnedXP
        );

        console.log(
            "Basa dari kuis:",
            earnedBasa
        );

        console.log(
            "Total XP pemain:",
            progress?.xp
        );

        console.log(
            "Total Basa pemain:",
            progress?.basa
        );

        console.log(
            "================================"
        );

    }


    /* =========================================================
       UPDATE INDONESIAN TEXTS
       ========================================================= */

    function updateIndonesianTexts() {

        /*
           HERO
        */

        updateHeroTexts();


        /*
           HEADER
        */

        const locationLabel =
            document.querySelector(
                ".gameplay-location-label strong"
            );


        if (
            locationLabel
        ) {

            locationLabel.textContent =
                "Ki Ajar Winarong";

        }


        const locationSmall =
            document.querySelector(
                ".gameplay-location-label small"
            );


        if (
            locationSmall
        ) {

            locationSmall.textContent =
                "LOKASI 02";

        }


        /*
           INFO CARD
        */

        const infoCards =
            document.querySelectorAll(
                ".gameplay-card"
            );


        if (
            infoCards.length >= 2
        ) {

            /*
               CARD 01
            */

            const firstSmall =
                infoCards[0].querySelector(
                    "small"
                );

            const firstTitle =
                infoCards[0].querySelector(
                    "h2"
                );

            const firstText =
                infoCards[0].querySelector(
                    "p"
                );


            if (
                firstSmall
            ) {

                firstSmall.textContent =
                    "PETUNJUK";

            }


            if (
                firstTitle
            ) {

                firstTitle.textContent =
                    "Baca dengan teliti";

            }


            if (
                firstText
            ) {

                firstText.textContent =
                    "Baca setiap pertanyaan dengan teliti sebelum memilih jawaban.";

            }


            /*
               CARD 02
            */

            const secondSmall =
                infoCards[1].querySelector(
                    "small"
                );

            const secondTitle =
                infoCards[1].querySelector(
                    "h2"
                );

            const secondText =
                infoCards[1].querySelector(
                    "p"
                );


            if (
                secondSmall
            ) {

                secondSmall.textContent =
                    "HADIAH";

            }


            if (
                secondTitle
            ) {

                secondTitle.textContent =
                    "Dapatkan XP";

            }


            if (
                secondText
            ) {

                secondText.textContent =
                    "Jawaban yang benar memberikan XP dan Basa untuk melanjutkan perjalanan.";

            }

        }


        /*
           GAMEPLAY PANEL
        */

        const panelSmall =
            document.querySelector(
                ".gameplay-panel-heading small"
            );

        const panelTitle =
            document.querySelector(
                ".gameplay-panel-heading h2"
            );

        const panelText =
            document.querySelector(
                ".gameplay-panel-body > p"
            );


        if (
            panelSmall
        ) {

            panelSmall.textContent =
                "TANTANGAN";

        }


        if (
            panelTitle
        ) {

            panelTitle.textContent =
                "Pertanyaan Bahasa";

        }


        if (
            panelText
        ) {

            panelText.textContent =
                "Pilih jawaban yang paling tepat untuk setiap pertanyaan.";

        }


        /*
           FINISH
        */

        const finishLabel =
            document.querySelector(
                ".gameplay-finish .game-screen-label"
            );

        const finishTitle =
            document.querySelector(
                ".gameplay-finish h1"
            );

        const finishText =
            document.querySelector(
                ".gameplay-finish > p"
            );


        if (
            finishLabel
        ) {

            finishLabel.textContent =
                "TANTANGAN SELESAI";

        }


        if (
            finishTitle
        ) {

            finishTitle.textContent =
                "Selamat!";

        }


        if (
            finishText
        ) {

            finishText.textContent =
                "Kamu telah menyelesaikan tantangan di Ki Ajar Winarong.";

        }


        /*
           BACK BUTTON
        */

        const backButton =
            document.querySelector(
                ".gameplay-back span:last-child"
            );


        if (
            backButton
        ) {

            backButton.textContent =
                "KEMBALI KE PETA";

        }


        /*
           FINISH BUTTON
        */

        const finishButton =
            document.querySelector(
                ".gameplay-finish-button span:first-child"
            );


        if (
            finishButton
        ) {

            finishButton.textContent =
                "KEMBALI KE PETA";

        }

    }


    /* =========================================================
       CLOSE BUTTON
       ========================================================= */

    if (
        gameplayClose
    ) {

        gameplayClose.addEventListener(
            "click",
            () => {

                closeGameplayModal();

            }
        );

    }


    /* =========================================================
       OVERLAY
       ========================================================= */

    if (
        gameplayOverlay
    ) {

        gameplayOverlay.addEventListener(
            "click",
            () => {

                closeGameplayModal();

            }
        );

    }


    /* =========================================================
       SECONDARY BUTTON
       ========================================================= */

    if (
        gameplaySecondary
    ) {

        gameplaySecondary.addEventListener(
            "click",
            () => {

                closeGameplayModal();

            }
        );

    }


    /* =========================================================
       PRIMARY BUTTON
       ========================================================= */

    if (
        gameplayPrimary
    ) {

        gameplayPrimary.addEventListener(
            "click",
            () => {

                handlePrimaryButton();

            }
        );

    }


    /* =========================================================
       START GAMEPLAY
       ========================================================= */

    if (
        startGameplay
    ) {

        startGameplay.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openGameplayModal();

            }
        );

    }

    else {

        console.error(
            "Tombol #startGameplay tidak ditemukan."
        );

    }


    /* =========================================================
       ESC KEY
       ========================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                if (
                    gameplayModal &&

                    (
                        gameplayModal.classList.contains(
                            "show"
                        )

                        ||

                        gameplayModal.classList.contains(
                            "active"
                        )
                    )
                ) {

                    closeGameplayModal();

                }

            }

        }
    );


    /* =========================================================
       INITIALIZE
       ========================================================= */

    function initializeGame() {

        progress =
            loadProgress();


        challengeStarted =
            false;

        currentQuestion =
            0;

        selectedAnswer =
            null;

        answeredQuestions =
            0;

        score =
            0;

        lastQuizScore =
            0;

        lastQuizXP =
            0;

        lastQuizBasa =
            0;

        challengeFinished =
            false;


        /* -----------------------------------------------------
           PAGE
           ----------------------------------------------------- */

        preparePageLayout();


        /* -----------------------------------------------------
           INDONESIAN TEXT
           ----------------------------------------------------- */

        updateIndonesianTexts();


        /* -----------------------------------------------------
           HUD
           ----------------------------------------------------- */

        updateHUD();


        /* -----------------------------------------------------
           MODAL
           ----------------------------------------------------- */

        if (
            gameplayModal
        ) {

            gameplayModal.classList.remove(
                "active",
                "show"
            );

            gameplayModal.setAttribute(
                "aria-hidden",
                "true"
            );

        }


        /* -----------------------------------------------------
           FINISH
           ----------------------------------------------------- */

        if (
            gameplayFinish
        ) {

            gameplayFinish.style.display =
                "none";

            gameplayFinish.classList.remove(
                "active"
            );

        }


        /* -----------------------------------------------------
           HERO
           ----------------------------------------------------- */

        if (
            gameplayHero
        ) {

            gameplayHero.style.display =
                "block";

        }


        /* -----------------------------------------------------
           CONSOLE
           ----------------------------------------------------- */

        console.log(
            "================================"
        );

        console.log(
            "LELANA KAMANDAKA"
        );

        console.log(
            "GAMEPLAY 02 — KI AJAR WINARONG"
        );

        console.log(
            "Level:",
            CURRENT_LEVEL
        );

        console.log(
            "XP:",
            progress.xp
        );

        console.log(
            "Basa:",
            progress.basa
        );

        console.log(
            "Lokasi terbuka:",
            progress.unlockedLocations
        );

        console.log(
            "Pertanyaan:",
            questions.length
        );

        console.log(
            "Reward per benar:",
            `${QUESTION_XP_REWARD} XP + ${QUESTION_BASA_REWARD} BASA`
        );

        console.log(
            "Reward maksimal:",
            `${TOTAL_QUESTIONS * QUESTION_XP_REWARD} XP + ${TOTAL_QUESTIONS * QUESTION_BASA_REWARD} BASA`
        );

        console.log(
            "Tidak ada bonus final."
        );

        console.log(
            "================================"
        );

    }


    /* =========================================================
       START
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


})();