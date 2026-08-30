/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 05 — DESA PANAGIH
   UNGGAH-UNGGUH ING MASYARAKAT
   ========================================================= */

(() => {

    "use strict";


    /* =========================================================
       CONFIG
       ========================================================= */

    const STORAGE_KEY =
        "lelanaKamandakaProgress";

    const CURRENT_LOCATION =
        5;

    const CURRENT_LEVEL =
        5;

    const NEXT_LOCATION =
        6;

    const TOTAL_CHAPTERS =
        10;

    const TOTAL_QUESTIONS =
        5;

    const QUESTION_XP_REWARD =
        20;

    const QUESTION_BASA_REWARD =
        4;


    /* =========================================================
       ELEMENTS
       ========================================================= */

    const startGameplay =
        document.getElementById(
            "startGameplay"
        );

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

    const gameplayPrimary =
        document.getElementById(
            "gameplayPrimary"
        );

    const gameplaySecondary =
        document.getElementById(
            "gameplaySecondary"
        );

    const gameplayAnswers =
        document.getElementById(
            "gameplayAnswers"
        );

    const gameplayQuestionTitle =
        document.getElementById(
            "gameplayQuestionTitle"
        );

    const gameplayQuestionText =
        document.getElementById(
            "gameplayQuestionText"
        );

    const gameplayDialogTitle =
        document.getElementById(
            "gameplayDialogTitle"
        );

    const gameplayProgressText =
        document.getElementById(
            "gameplayProgressText"
        );

    const gameplaySituationLabel =
        document.getElementById(
            "gameplaySituationLabel"
        );

    const gameplaySteps = [
        ...document.querySelectorAll(
            ".lk-gameplay-step"
        )
    ];

    const gameplayFinish =
        document.getElementById(
            "gameplayFinish"
        );

    const gameplayHero =
        document.getElementById(
            "gameplayHero"
        );

    const gameplayInfoGrid =
        document.querySelector(
            ".gameplay-info-grid"
        );

    const gameplayPanel =
        document.querySelector(
            ".gameplay-panel"
        );


    /* =========================================================
       STATE
       ========================================================= */

    let progress =
        loadProgress();

    let currentQuestion =
        0;

    let selectedAnswer =
        null;

    let answeredQuestions =
        0;

    let score =
        0;

    let lastQuizXP =
        0;

    let lastQuizBasa =
        0;

    let challengeFinished =
        false;


    /* =========================================================
       QUESTION DATA
       ========================================================= */

    const questions = [

        {
            number: 1,

            situation:
                "SESEPUH",

            title:
                "Bertemu sesepuh",

            text:
                "Kamandaka bertemu seorang sesepuh desa. Ia ingin bertanya tentang arah jalan. Kalimat manakah yang paling tepat?",

            answers: [

                {
                    label: "A",

                    text:
                        "Nyuwun pangapunten, kula badhe takon.",

                    value: "correct"
                },

                {
                    label: "B",

                    text:
                        "Nuwun sewu, aku arep takon.",

                    value: "wrong"
                },

                {
                    label: "C",

                    text:
                        "Pak, aku arep takon dalan.",

                    value: "wrong"
                }

            ]
        },


        {
            number: 2,

            situation:
                "PENDUDUK",

            title:
                "Berbicara kepada penduduk",

            text:
                "Seorang penduduk desa membantu Kamandaka mencari jalan. Ungkapan manakah yang paling sesuai digunakan?",

            answers: [

                {
                    label: "A",

                    text:
                        "Kula nyuwun tulung nggih.",

                    value: "correct"
                },

                {
                    label: "B",

                    text:
                        "Aku njaluk tulung ya.",

                    value: "wrong"
                },

                {
                    label: "C",

                    text:
                        "Tulung aku nggih.",

                    value: "wrong"
                }

            ]
        },


        {
            number: 3,

            situation:
                "TEMAN",

            title:
                "Berbicara kepada teman",

            text:
                "Kamandaka berbicara dengan teman sebayanya. Ia ingin mengajak temannya melanjutkan perjalanan. Kalimat yang paling sesuai adalah ...",

            answers: [

                {
                    label: "A",

                    text:
                        "Aku arep nerusake perjalanan.",

                    value: "correct"
                },

                {
                    label: "B",

                    text:
                        "Kula badhe nerusake lelampahan.",

                    value: "wrong"
                },

                {
                    label: "C",

                    text:
                        "Panjenengan badhe tindak?",

                    value: "wrong"
                }

            ]
        },


        {
            number: 4,

            situation:
                "SESEPUH",

            title:
                "Meminta izin",

            text:
                "Kamandaka hendak meninggalkan desa setelah mendapat bantuan dari seorang sesepuh. Ungkapan yang paling sopan adalah ...",

            answers: [

                {
                    label: "A",

                    text:
                        "Aku lunga dhisik, nggih.",

                    value: "wrong"
                },

                {
                    label: "B",

                    text:
                        "Kula nyuwun pamit, Ki.",

                    value: "correct"
                },

                {
                    label: "C",

                    text:
                        "Aku pamit sek.",

                    value: "wrong"
                }

            ]
        },


        {
            number: 5,

            situation:
                "ANAK CILIK",

            title:
                "Berbicara kepada anak kecil",

            text:
                "Kamandaka bertemu seorang anak kecil di desa. Ia ingin bertanya apakah anak itu mengetahui jalan menuju sungai. Kalimat yang paling sesuai adalah ...",

            answers: [

                {
                    label: "A",

                    text:
                        "Kamu ngerti dalan menyang kali ora?",

                    value: "correct"
                },

                {
                    label: "B",

                    text:
                        "Panjenengan mangertos dalan menyang kali?",

                    value: "wrong"
                },

                {
                    label: "C",

                    text:
                        "Nyuwun pangapunten, kula badhe takon.",

                    value: "wrong"
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
                CURRENT_LEVEL,

            totalChapters:
                TOTAL_CHAPTERS,

            xp:
                0,

            basa:
                0,

            completedChapters:
                [],

            completedLocations:
                [],

            unlockedLocations:
                [1],

            gameplay05Completed:
                false

        };

    }


    /* =========================================================
       LOAD PROGRESS
       ========================================================= */

    function loadProgress() {

        let data =
            createDefaultProgress();

        try {

            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!saved) {

                return data;

            }

            const parsed =
                JSON.parse(
                    saved
                );

            if (
                parsed &&
                typeof parsed === "object"
            ) {

                data = {
                    ...data,
                    ...parsed
                };

            }

        }

        catch (error) {

            console.warn(
                "Progress tidak dapat dibaca.",
                error
            );

        }

        data.xp =
            Number(data.xp) || 0;

        data.basa =
            Number(data.basa) || 0;

        if (
            !Array.isArray(
                data.completedChapters
            )
        ) {

            data.completedChapters =
                [];

        }

        if (
            !Array.isArray(
                data.completedLocations
            )
        ) {

            data.completedLocations =
                [];

        }

        if (
            !Array.isArray(
                data.unlockedLocations
            )
        ) {

            data.unlockedLocations =
                [1];

        }

        return data;

    }


    /* =========================================================
       SAVE PROGRESS
       ========================================================= */

    function saveProgress() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    progress
                )
            );

        }

        catch (error) {

            console.warn(
                "Progress gagal disimpan.",
                error
            );

        }

    }


    /* =========================================================
       START
       ========================================================= */

    function openGameplay() {

        currentQuestion =
            0;

        selectedAnswer =
            null;

        answeredQuestions =
            0;

        score =
            0;

        lastQuizXP =
            0;

        lastQuizBasa =
            0;

        challengeFinished =
            false;


        if (gameplayHero) {

            gameplayHero.style.display =
                "none";

        }

        if (gameplayInfoGrid) {

            gameplayInfoGrid.style.display =
                "none";

        }

        if (gameplayPanel) {

            gameplayPanel.style.display =
                "none";

        }

        if (gameplayFinish) {

            gameplayFinish.style.display =
                "none";

        }


        gameplayModal.classList.add(
            "show"
        );

        gameplayModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "lk-gameplay-modal-open"
        );


        renderQuestion();

    }


    /* =========================================================
       CLOSE
       ========================================================= */

    function closeGameplay() {

        gameplayModal.classList.remove(
            "show"
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

        if (!question) {

            return;

        }


        selectedAnswer =
            null;


        gameplayDialogTitle.textContent =
            "Desa Panagih";


        gameplayQuestionTitle.textContent =
            question.title;


        gameplayQuestionText.textContent =
            question.text;


        gameplaySituationLabel.textContent =
            question.situation;


        renderAnswers(
            question.answers
        );


        gameplayPrimary.disabled =
            true;

        gameplayPrimary.innerHTML = `
            <span>JAWAB</span>
            <span>→</span>
        `;


        gameplaySecondary.textContent =
            currentQuestion === 0
                ? "Tutup"
                : "← Kembali";


        updateSteps();


        if (gameplayModal) {

            const dialog =
                gameplayModal.querySelector(
                    ".lk-gameplay-dialog"
                );

            if (dialog) {

                dialog.scrollTop =
                    0;

            }

        }

    }


    /* =========================================================
       RENDER ANSWERS
       ========================================================= */

    function renderAnswers(
        answers
    ) {

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

        const buttons =
            [
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


        gameplayPrimary.disabled =
            false;

    }


    /* =========================================================
       ANSWER QUESTION
       ========================================================= */

    function answerQuestion() {

        if (!selectedAnswer) {

            return;

        }


        const buttons =
            [
                ...gameplayAnswers.querySelectorAll(
                    ".gameplay-choice-button"
                )
            ];


        buttons.forEach(
            button => {

                button.disabled =
                    true;

            }
        );


        const isCorrect =
            selectedAnswer.dataset.answer ===
            "correct";


        if (isCorrect) {

            selectedAnswer.classList.remove(
                "selected"
            );

            selectedAnswer.classList.add(
                "correct"
            );


            score++;


            progress.xp +=
                QUESTION_XP_REWARD;

            progress.basa +=
                QUESTION_BASA_REWARD;


            lastQuizXP =
                score *
                QUESTION_XP_REWARD;

            lastQuizBasa =
                score *
                QUESTION_BASA_REWARD;

        }

        else {

            selectedAnswer.classList.remove(
                "selected"
            );

            selectedAnswer.classList.add(
                "wrong"
            );


            const correctButton =
                buttons.find(
                    button =>
                        button.dataset.answer ===
                        "correct"
                );


            if (correctButton) {

                correctButton.classList.add(
                    "correct"
                );

            }

        }


        answeredQuestions++;


        saveProgress();


        updateProgressText();


        updateSteps();


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

    function handlePrimary() {

        const selected =
            gameplayAnswers.querySelector(
                ".gameplay-choice-button.selected"
            );


        if (selected) {

            selectedAnswer =
                selected;

            answerQuestion();

            return;

        }


        const answered =
            gameplayAnswers.querySelector(
                ".gameplay-choice-button.correct, .gameplay-choice-button.wrong"
            );


        if (answered) {

            nextQuestion();

        }

    }


    /* =========================================================
       SECONDARY BUTTON
       ========================================================= */

    function handleSecondary() {

        const alreadyAnswered =
            gameplayAnswers.querySelector(
                ".gameplay-choice-button.correct, .gameplay-choice-button.wrong"
            );


        if (
            currentQuestion > 0 &&
            !alreadyAnswered
        ) {

            currentQuestion--;

            renderQuestion();

            return;

        }


        closeGameplay();

        if (gameplayHero) {

            gameplayHero.style.display =
                "block";

        }

    }


    /* =========================================================
       PROGRESS
       ========================================================= */

    function updateProgressText() {

        if (!gameplayProgressText) {

            return;

        }


        if (challengeFinished) {

            gameplayProgressText.textContent =
                "05 / 05";

            return;

        }


        const current =
            Math.min(
                currentQuestion + 1,
                TOTAL_QUESTIONS
            );


        gameplayProgressText.textContent =
            `${String(current).padStart(2, "0")} / 05`;

    }


    /* =========================================================
       STEP INDICATOR
       ========================================================= */

    function updateSteps() {

        gameplaySteps.forEach(
            (
                step,
                index
            ) => {

                step.classList.remove(
                    "active",
                    "completed"
                );


                if (
                    index ===
                    currentQuestion
                ) {

                    step.classList.add(
                        "active"
                    );

                }


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
       FINISH
       ========================================================= */

    function finishChallenge() {

        if (challengeFinished) {

            return;

        }


        challengeFinished =
            true;


        progress.gameplay05Completed =
            true;


        if (
            !progress.completedLocations.includes(
                CURRENT_LOCATION
            )
        ) {

            progress.completedLocations.push(
                CURRENT_LOCATION
            );

        }


        if (
            !progress.completedChapters.includes(
                CURRENT_CHAPTER
            )
        ) {

            progress.completedChapters.push(
                CURRENT_LEVEL
            );

        }


        if (
            !progress.unlockedLocations.includes(
                NEXT_LOCATION
            )
        ) {

            progress.unlockedLocations.push(
                NEXT_LOCATION
            );

        }


        saveProgress();


        closeGameplay();


        if (gameplayHero) {

            gameplayHero.style.display =
                "none";

        }


        if (gameplayFinish) {

            gameplayFinish.style.display =
                "block";

            gameplayFinish.classList.add(
                "active"
            );

        }


        updateProgressText();

    }


    /* =========================================================
       EVENTS
       ========================================================= */

    if (startGameplay) {

        startGameplay.addEventListener(
            "click",
            openGameplay
        );

    }


    if (gameplayPrimary) {

        gameplayPrimary.addEventListener(
            "click",
            handlePrimary
        );

    }


    if (gameplaySecondary) {

        gameplaySecondary.addEventListener(
            "click",
            handleSecondary
        );

    }


    if (gameplayClose) {

        gameplayClose.addEventListener(
            "click",
            closeGameplay
        );

    }


    if (gameplayOverlay) {

        gameplayOverlay.addEventListener(
            "click",
            closeGameplay
        );

    }


    /* =========================================================
       INITIAL
       ========================================================= */

    updateProgressText();


    console.log(
        "Gameplay 05 — Desa Panagih berhasil dimuat."
    );

})();