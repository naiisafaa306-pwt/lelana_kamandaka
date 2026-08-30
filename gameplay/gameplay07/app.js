/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 07 — BATUR AGUNG
   MEMBENTUK KALIMAT
   ========================================================= */


/* =========================================================
   STORAGE KEY
   ========================================================= */

const STORAGE_KEY = "lelanaKamandakaGameplay07";


/* =========================================================
   GAME DATA
   ========================================================= */

const sentenceData = [

    {
        id: 1,

        words: [
            "Kamandaka",
            "mlaku",
            "menyang",
            "gunung"
        ],

        answer: [
            "Kamandaka",
            "mlaku",
            "menyang",
            "gunung"
        ],

        translation:
            "Kamandaka berjalan menuju gunung."
    },

    {
        id: 2,

        words: [
            "Kamandaka",
            "nggawa",
            "bekal"
        ],

        answer: [
            "Kamandaka",
            "nggawa",
            "bekal"
        ],

        translation:
            "Kamandaka membawa bekal."
    },

    {
        id: 3,

        words: [
            "Kamandaka",
            "nerusake",
            "lelampahan"
        ],

        answer: [
            "Kamandaka",
            "nerusake",
            "lelampahan"
        ],

        translation:
            "Kamandaka melanjutkan perjalanan."
    }

];


/* =========================================================
   GAME STATE
   ========================================================= */

const gameState = {

    currentScreen:
        "screen01",

    currentSentence:
        0,

    selectedWords:
        [],

    completedSentences:
        0,

    xp:
        0,

    basa:
        0,

    finished:
        false

};


/* =========================================================
   DOM HELPERS
   ========================================================= */

function getElement(id) {

    return document.getElementById(id);

}


function getAll(selector) {

    return document.querySelectorAll(selector);

}


/* =========================================================
   STORAGE
   ========================================================= */

function loadGameState() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {

            return;

        }

        const parsed =
            JSON.parse(saved);

        if (
            typeof parsed !== "object" ||
            parsed === null
        ) {

            return;

        }

        gameState.xp =
            Number(parsed.xp) || 0;

        gameState.basa =
            Number(parsed.basa) || 0;

        if (
            parsed.finished === true
        ) {

            gameState.finished = true;

        }

    } catch (error) {

        console.warn(
            "Gameplay 07 state tidak dapat dimuat.",
            error
        );

    }

}


function saveGameState() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                xp:
                    gameState.xp,

                basa:
                    gameState.basa,

                finished:
                    gameState.finished
            })
        );

    } catch (error) {

        console.warn(
            "Gameplay 07 state tidak dapat disimpan.",
            error
        );

    }

}


/* =========================================================
   PLAYER HUD
   ========================================================= */

function updatePlayerHud() {

    const level =
        getElement("playerLevel");

    const xpTop =
        getElement("playerXpTop");

    const xpBar =
        getElement("playerXpBar");

    const xpBottom =
        getElement("playerXpBottom");

    const basa =
        getElement("playerBasa");


    if (level) {

        level.textContent =
            "Level 07";

    }


    if (xpTop) {

        xpTop.textContent =
            `${gameState.xp} XP`;

    }


    if (xpBottom) {

        xpBottom.textContent =
            `${gameState.xp} / 1.000 XP`;

    }


    if (xpBar) {

        const percentage =
            Math.min(
                100,
                Math.max(
                    0,
                    gameState.xp / 10
                )
            );

        xpBar.style.width =
            `${percentage}%`;

    }


    if (basa) {

        basa.textContent =
            gameState.basa;

    }

}


/* =========================================================
   SCREEN MANAGEMENT
   ========================================================= */

function showScreen(screenId) {

    const screens =
        getAll(".game-screen");

    screens.forEach(
        screen => {

            screen.classList.remove(
                "active"
            );

        }
    );


    const target =
        getElement(screenId);

    if (!target) {

        console.warn(
            `Screen ${screenId} tidak ditemukan.`
        );

        return;

    }


    target.classList.add(
        "active"
    );


    gameState.currentScreen =
        screenId;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   GENERIC NEXT SCREEN
   ========================================================= */

function setupScreenButtons() {

    const buttons =
        getAll(
            "[data-next-screen]"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const next =
                        button.dataset.nextScreen;

                    if (!next) {

                        return;

                    }

                    showScreen(next);

                    if (
                        next === "screen03"
                    ) {

                        initializeSentence(
                            0
                        );

                    }

                    if (
                        next === "screen04"
                    ) {

                        initializeSentence(
                            1
                        );

                    }

                    if (
                        next === "screen05"
                    ) {

                        initializeSentence(
                            2
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   SENTENCE ELEMENT CONFIG
   ========================================================= */

const sentenceUi = [

    {

        answerArea:
            "answerArea",

        placeholder:
            "answerPlaceholder",

        feedback:
            "feedbackArea",

        wordBank:
            "wordBank",

        check:
            "checkSentenceButton",

        reset:
            "resetSentenceButton"

    },

    {

        answerArea:
            "answerArea02",

        placeholder:
            "answerPlaceholder02",

        feedback:
            "feedbackArea02",

        wordBank:
            "wordBank02",

        check:
            "checkSentenceButton02",

        reset:
            "resetSentenceButton02"

    },

    {

        answerArea:
            "answerArea03",

        placeholder:
            "answerPlaceholder03",

        feedback:
            "feedbackArea03",

        wordBank:
            "wordBank03",

        check:
            "checkSentenceButton03",

        reset:
            "resetSentenceButton03"

    }

];


/* =========================================================
   CURRENT SENTENCE DATA
   ========================================================= */

function getCurrentSentenceData() {

    return sentenceData[
        gameState.currentSentence
    ];

}


function getCurrentSentenceUi() {

    return sentenceUi[
        gameState.currentSentence
    ];

}


/* =========================================================
   INITIALIZE SENTENCE
   ========================================================= */

function initializeSentence(index) {

    if (
        index < 0 ||
        index >= sentenceData.length
    ) {

        return;

    }


    gameState.currentSentence =
        index;

    gameState.selectedWords =
        [];


    renderWordBank();

    renderAnswerArea();

    clearFeedback();

}


/* =========================================================
   SHUFFLE
   ========================================================= */

function shuffleArray(array) {

    const result =
        [...array];

    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            result[i],
            result[j]
        ] = [
            result[j],
            result[i]
        ];

    }

    return result;

}


/* =========================================================
   WORD BANK
   ========================================================= */

function renderWordBank() {

    const ui =
        getCurrentSentenceUi();

    const data =
        getCurrentSentenceData();

    const bank =
        getElement(
            ui.wordBank
        );

    if (!bank) {

        return;

    }


    bank.innerHTML = "";


    const shuffled =
        shuffleArray(
            data.words
        );


    shuffled.forEach(
        (word, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "word-button";

            button.dataset.word =
                word;

            button.dataset.index =
                String(index);

            button.textContent =
                word;


            if (
                gameState.selectedWords.includes(
                    word
                )
            ) {

                button.classList.add(
                    "used"
                );

                button.disabled =
                    true;

            }


            button.addEventListener(
                "click",
                () => {

                    selectWord(word);

                }
            );


            bank.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   SELECT WORD
   ========================================================= */

function selectWord(word) {

    const data =
        getCurrentSentenceData();


    const alreadySelected =
        gameState.selectedWords.includes(
            word
        );


    if (alreadySelected) {

        return;

    }


    if (
        gameState.selectedWords.length >=
        data.words.length
    ) {

        return;

    }


    gameState.selectedWords.push(
        word
    );


    renderAnswerArea();

    renderWordBank();

    clearFeedback();


    if (
        gameState.selectedWords.length ===
        data.words.length
    ) {

        enableCheckButton();

    }

}


/* =========================================================
   RENDER ANSWER
   ========================================================= */

function renderAnswerArea() {

    const ui =
        getCurrentSentenceUi();

    const area =
        getElement(
            ui.answerArea
        );

    const placeholder =
        getElement(
            ui.placeholder
        );


    if (!area) {

        return;

    }


    area.innerHTML = "";


    if (
        gameState.selectedWords.length === 0
    ) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "answer-placeholder";

        empty.textContent =
            "Pilih tembung ing ngisor iki...";

        area.appendChild(
            empty
        );

        return;

    }


    gameState.selectedWords.forEach(
        (word, index) => {

            const item =
                document.createElement(
                    "button"
                );

            item.type =
                "button";

            item.className =
                "answer-word";

            item.dataset.index =
                String(index);

            item.title =
                "Klik kanggo menghapus tembung iki";


            const text =
                document.createElement(
                    "span"
                );

            text.textContent =
                word;


            const number =
                document.createElement(
                    "small"
                );

            number.textContent =
                String(index + 1);


            item.appendChild(
                text
            );

            item.appendChild(
                number
            );


            item.addEventListener(
                "click",
                () => {

                    removeWord(index);

                }
            );


            area.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   REMOVE WORD
   ========================================================= */

function removeWord(index) {

    if (
        index < 0 ||
        index >= gameState.selectedWords.length
    ) {

        return;

    }


    gameState.selectedWords.splice(
        index,
        1
    );


    renderAnswerArea();

    renderWordBank();

    clearFeedback();

}


/* =========================================================
   RESET SENTENCE
   ========================================================= */

function resetSentence() {

    gameState.selectedWords =
        [];

    renderAnswerArea();

    renderWordBank();

    clearFeedback();

    disableCheckButton();

}


/* =========================================================
   FEEDBACK
   ========================================================= */

function clearFeedback() {

    const ui =
        getCurrentSentenceUi();

    const area =
        getElement(
            ui.feedback
        );


    if (!area) {

        return;

    }


    area.innerHTML =
        "";

}


/* =========================================================
   SHOW FEEDBACK
   ========================================================= */

function showFeedback(
    type,
    title,
    message
) {

    const ui =
        getCurrentSentenceUi();

    const area =
        getElement(
            ui.feedback
        );


    if (!area) {

        return;

    }


    area.innerHTML = "";


    const box =
        document.createElement(
            "div"
        );

    box.className =
        `feedback-message ${type}`;


    const strong =
        document.createElement(
            "strong"
        );

    strong.textContent =
        title;


    const text =
        document.createElement(
            "span"
        );

    text.textContent =
        message;


    box.appendChild(
        strong
    );

    box.appendChild(
        text
    );


    area.appendChild(
        box
    );

}


/* =========================================================
   CHECK BUTTON STATE
   ========================================================= */

function enableCheckButton() {

    const ui =
        getCurrentSentenceUi();

    const button =
        getElement(
            ui.check
        );


    if (button) {

        button.disabled =
            false;

    }

}


function disableCheckButton() {

    const ui =
        getCurrentSentenceUi();

    const button =
        getElement(
            ui.check
        );


    if (button) {

        button.disabled =
            false;

    }

}


/* =========================================================
   CHECK SENTENCE
   ========================================================= */

function checkSentence() {

    const data =
        getCurrentSentenceData();


    if (
        gameState.selectedWords.length !==
        data.answer.length
    ) {

        showFeedback(
            "error",
            "Belum lengkap.",
            "Pilih kabeh tembung nganti ukara rampung."
        );

        return;

    }


    const correct =
        gameState.selectedWords.every(
            (word, index) => {

                return (
                    word ===
                    data.answer[index]
                );

            }
        );


    if (correct) {

        handleCorrectSentence();

        return;

    }


    handleWrongSentence();

}


/* =========================================================
   WRONG ANSWER
   ========================================================= */

function handleWrongSentence() {

    showFeedback(
        "error",
        "Urutane durung trep.",
        "Coba maneh. Gatekna subyek, tumindak, lan katrangan panggonan."
    );


    const area =
        getCurrentSentenceUi().answerArea;

    const answerArea =
        getElement(area);


    if (answerArea) {

        answerArea.animate(
            [
                {
                    transform:
                        "translateX(0)"
                },

                {
                    transform:
                        "translateX(-5px)"
                },

                {
                    transform:
                        "translateX(5px)"
                },

                {
                    transform:
                        "translateX(0)"
                }
            ],
            {
                duration: 250
            }
        );

    }

}


/* =========================================================
   CORRECT ANSWER
   ========================================================= */

function handleCorrectSentence() {

    const data =
        getCurrentSentenceData();


    showFeedback(
        "success",
        "Bener!",
        data.translation
    );


    gameState.completedSentences =
        Math.max(
            gameState.completedSentences,
            gameState.currentSentence + 1
        );


    gameState.xp +=
        50;


    gameState.basa +=
        10;


    saveGameState();

    updatePlayerHud();


    lockCurrentSentence();


    window.setTimeout(
        () => {

            moveAfterCorrect();

        },
        850
    );

}


/* =========================================================
   LOCK CURRENT SENTENCE
   ========================================================= */

function lockCurrentSentence() {

    const ui =
        getCurrentSentenceUi();


    const buttons =
        getAll(
            `#${ui.wordBank} .word-button`
        );


    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    const answerButtons =
        getAll(
            `#${ui.answerArea} .answer-word`
        );


    answerButtons.forEach(
        button => {

            button.disabled =
                true;

            button.style.cursor =
                "default";

        }
    );


    const check =
        getElement(
            ui.check
        );


    if (check) {

        check.disabled =
            true;

    }

}


/* =========================================================
   MOVE AFTER CORRECT
   ========================================================= */

function moveAfterCorrect() {

    if (
        gameState.currentSentence === 0
    ) {

        showScreen(
            "screen04"
        );

        initializeSentence(
            1
        );

        return;

    }


    if (
        gameState.currentSentence === 1
    ) {

        showScreen(
            "screen05"
        );

        initializeSentence(
            2
        );

        return;

    }


    if (
        gameState.currentSentence === 2
    ) {

        finishGameplay();

    }

}


/* =========================================================
   FINISH GAMEPLAY
   ========================================================= */

function finishGameplay() {

    gameState.finished =
        true;


    gameState.xp +=
        0;


    gameState.basa +=
        0;


    saveGameState();

    updatePlayerHud();

    showScreen(
        "screen06"
    );

}


/* =========================================================
   SENTENCE BUTTON SETUP
   ========================================================= */

function setupSentenceControls() {

    sentenceUi.forEach(
        (ui, index) => {

            const check =
                getElement(
                    ui.check
                );

            const reset =
                getElement(
                    ui.reset
                );


            if (check) {

                check.addEventListener(
                    "click",
                    () => {

                        gameState.currentSentence =
                            index;

                        checkSentence();

                    }
                );

            }


            if (reset) {

                reset.addEventListener(
                    "click",
                    () => {

                        gameState.currentSentence =
                            index;

                        resetSentence();

                    }
                );

            }

        }
    );

}


/* =========================================================
   START BUTTON
   ========================================================= */

function setupStartButton() {

    const button =
        getElement(
            "startJourneyButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            showScreen(
                "screen02"
            );

        }
    );

}


/* =========================================================
   BEGIN SENTENCE BUTTON
   ========================================================= */

function setupBeginButton() {

    const button =
        getElement(
            "beginSentenceButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            initializeSentence(
                0
            );

            showScreen(
                "screen03"
            );

        }
    );

}


/* =========================================================
   FINISH LINK
   ========================================================= */

function setupFinishButton() {

    const button =
        getElement(
            "finishJourneyButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            saveGameState();

        }
    );

}


/* =========================================================
   PREVENT DOUBLE INITIALIZATION
   ========================================================= */

let initialized =
    false;


/* =========================================================
   INITIALIZE GAME
   ========================================================= */

function initializeGame() {

    if (initialized) {

        return;

    }


    initialized =
        true;


    loadGameState();

    updatePlayerHud();

    setupScreenButtons();

    setupStartButton();

    setupBeginButton();

    setupSentenceControls();

    setupFinishButton();


    showScreen(
        "screen01"
    );

}


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeGame
);