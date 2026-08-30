/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 08 — SAWANGAN
   MENDESKRIPSIKAN LINGKUNGAN
   ========================================================= */


/* =========================================================
   GAME CONFIGURATION
   ========================================================= */

const GAMEPLAY_LEVEL = 8;

const GAMEPLAY_NAME = "Sawangan";

const GAMEPLAY_XP_REWARD = 100;

const GAMEPLAY_BASA_REWARD = 25;

const MAX_XP = 1000;


/* =========================================================
   CORRECT VOCABULARY
   ========================================================= */

const CORRECT_VOCABULARY = [
    "wit",
    "gunung",
    "kali",
    "omah"
];


/* =========================================================
   CORRECT SENTENCE
   ========================================================= */

const CORRECT_SENTENCE = [
    "Ana",
    "wit",
    "ing",
    "pinggir",
    "kali."
];


/* =========================================================
   GAME STATE
   ========================================================= */

const gameState = {

    currentScreen: "screen01",

    selectedVocabulary: [],

    sentenceWords: [],

    vocabularyCompleted: false,

    sentenceCompleted: false,

    rewardClaimed: false

};


/* =========================================================
   DOM HELPERS
   ========================================================= */

function getElement(id) {

    return document.getElementById(id);

}


function getAll(selector) {

    return Array.from(
        document.querySelectorAll(selector)
    );

}


/* =========================================================
   PLAYER DATA
   ========================================================= */

function getStoredPlayerData() {

    const defaultData = {

        level: GAMEPLAY_LEVEL,

        xp: 0,

        basa: 0,

        completedLevels: []

    };


    try {

        const stored =
            localStorage.getItem(
                "lelanaKamandakaPlayer"
            );


        if (!stored) {

            return defaultData;

        }


        const parsed =
            JSON.parse(stored);


        return {

            ...defaultData,

            ...parsed,

            level: GAMEPLAY_LEVEL

        };

    }

    catch (error) {

        return defaultData;

    }

}


/* =========================================================
   SAVE PLAYER DATA
   ========================================================= */

function savePlayerData(data) {

    try {

        localStorage.setItem(
            "lelanaKamandakaPlayer",
            JSON.stringify(data)
        );

    }

    catch (error) {

        console.warn(
            "Data pemain tidak dapat disimpan.",
            error
        );

    }

}


/* =========================================================
   UPDATE PLAYER HUD
   ========================================================= */

function updatePlayerHUD() {

    const data =
        getStoredPlayerData();


    const playerLevel =
        getElement("playerLevel");


    const playerXpTop =
        getElement("playerXpTop");


    const playerXpBar =
        getElement("playerXpBar");


    const playerXpBottom =
        getElement("playerXpBottom");


    const playerBasa =
        getElement("playerBasa");


    if (playerLevel) {

        playerLevel.textContent =
            `Level ${String(GAMEPLAY_LEVEL).padStart(2, "0")}`;

    }


    if (playerXpTop) {

        playerXpTop.textContent =
            `${data.xp} XP`;

    }


    if (playerXpBar) {

        const percentage =
            Math.min(
                100,
                Math.max(
                    0,
                    (data.xp / MAX_XP) * 100
                )
            );


        playerXpBar.style.width =
            `${percentage}%`;

    }


    if (playerXpBottom) {

        playerXpBottom.textContent =
            `${data.xp.toLocaleString("id-ID")} / ${MAX_XP.toLocaleString("id-ID")} XP`;

    }


    if (playerBasa) {

        playerBasa.textContent =
            data.basa.toLocaleString("id-ID");

    }

}


/* =========================================================
   ADD XP
   ========================================================= */

function addXP(amount) {

    const data =
        getStoredPlayerData();


    data.xp =
        Math.min(
            MAX_XP,
            data.xp + amount
        );


    savePlayerData(data);

    updatePlayerHUD();

}


/* =========================================================
   ADD BASA
   ========================================================= */

function addBasa(amount) {

    const data =
        getStoredPlayerData();


    data.basa += amount;


    savePlayerData(data);

    updatePlayerHUD();

}


/* =========================================================
   MARK LEVEL COMPLETED
   ========================================================= */

function markLevelCompleted() {

    const data =
        getStoredPlayerData();


    if (!Array.isArray(
        data.completedLevels
    )) {

        data.completedLevels = [];

    }


    if (
        !data.completedLevels.includes(
            GAMEPLAY_LEVEL
        )
    ) {

        data.completedLevels.push(
            GAMEPLAY_LEVEL
        );

    }


    savePlayerData(data);

}


/* =========================================================
   REWARD
   ========================================================= */

function claimReward() {

    if (gameState.rewardClaimed) {

        return;

    }


    const data =
        getStoredPlayerData();


    const alreadyCompleted =
        Array.isArray(
            data.completedLevels
        ) &&
        data.completedLevels.includes(
            GAMEPLAY_LEVEL
        );


    if (!alreadyCompleted) {

        addXP(
            GAMEPLAY_XP_REWARD
        );

        addBasa(
            GAMEPLAY_BASA_REWARD
        );

        markLevelCompleted();

    }


    gameState.rewardClaimed = true;

    updatePlayerHUD();

}


/* =========================================================
   SCREEN NAVIGATION
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
   GENERIC NEXT SCREEN BUTTONS
   ========================================================= */

function setupNextScreenButtons() {

    const buttons =
        getAll(
            "[data-next-screen]"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const nextScreen =
                        button.dataset.nextScreen;


                    if (!nextScreen) {

                        return;

                    }


                    showScreen(
                        nextScreen
                    );

                }
            );

        }
    );

}


/* =========================================================
   START JOURNEY
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
   OBSERVATION
   ========================================================= */

function setupObservation() {

    const button =
        getElement(
            "observationReadyButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            showScreen(
                "screen03"
            );

        }
    );

}


/* =========================================================
   VOCABULARY ELEMENTS
   ========================================================= */

const vocabularyCards =
    () =>
        getAll(
            ".vocabulary-card"
        );


/* =========================================================
   RENDER SELECTED WORDS
   ========================================================= */

function renderSelectedVocabulary() {

    const list =
        getElement(
            "selectedWordList"
        );


    const counter =
        getElement(
            "selectedWordCount"
        );


    if (counter) {

        counter.textContent =
            `${gameState.selectedVocabulary.length} / ${CORRECT_VOCABULARY.length}`;

    }


    if (!list) {

        return;

    }


    list.innerHTML = "";


    gameState.selectedVocabulary
        .forEach(
            word => {

                const chip =
                    document.createElement(
                        "span"
                    );


                chip.className =
                    "selected-word-chip";


                chip.textContent =
                    capitalizeWord(word);


                list.appendChild(
                    chip
                );

            }
        );

}


/* =========================================================
   CAPITALIZE
   ========================================================= */

function capitalizeWord(word) {

    if (!word) {

        return "";

    }


    return (
        word.charAt(0).toUpperCase() +
        word.slice(1)
    );

}


/* =========================================================
   VOCABULARY FEEDBACK
   ========================================================= */

function setVocabularyFeedback(
    message,
    type = ""
) {

    const feedback =
        getElement(
            "vocabularyFeedback"
        );


    if (!feedback) {

        return;

    }


    feedback.textContent =
        message;


    feedback.classList.remove(
        "success",
        "error"
    );


    if (type) {

        feedback.classList.add(
            type
        );

    }

}


/* =========================================================
   TOGGLE VOCABULARY
   ========================================================= */

function toggleVocabularyCard(
    card
) {

    const word =
        card.dataset.word;


    const isCorrect =
        card.dataset.correct === "true";


    if (!word) {

        return;

    }


    if (!isCorrect) {

        card.classList.add(
            "wrong"
        );


        setVocabularyFeedback(
            "Tembung kuwi ora cocog karo gambar. Coba maneh.",
            "error"
        );


        setTimeout(
            () => {

                card.classList.remove(
                    "wrong"
                );

                setVocabularyFeedback(
                    "Pilih kabeh tembung sing cocog."
                );

            },
            900
        );


        return;

    }


    const index =
        gameState.selectedVocabulary
            .indexOf(word);


    if (index !== -1) {

        gameState.selectedVocabulary
            .splice(
                index,
                1
            );


        card.classList.remove(
            "selected"
        );

    }

    else {

        if (
            gameState.selectedVocabulary.length >=
            CORRECT_VOCABULARY.length
        ) {

            setVocabularyFeedback(
                "Kabeh kosakata sing bener wis dipilih.",
                "success"
            );

            return;

        }


        gameState.selectedVocabulary
            .push(word);


        card.classList.add(
            "selected"
        );

    }


    renderSelectedVocabulary();


    if (
        gameState.selectedVocabulary.length ===
        CORRECT_VOCABULARY.length
    ) {

        setVocabularyFeedback(
            "Apik! Kabeh kosakata sing cocog wis dipilih.",
            "success"
        );

    }

    else {

        setVocabularyFeedback(
            `Saiki wis milih ${gameState.selectedVocabulary.length} kosakata.`
        );

    }

}


/* =========================================================
   SETUP VOCABULARY
   ========================================================= */

function setupVocabulary() {

    vocabularyCards()
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        toggleVocabularyCard(
                            card
                        );

                    }
                );

            }
        );


    const confirmButton =
        getElement(
            "confirmVocabularyButton"
        );


    if (!confirmButton) {

        return;

    }


    confirmButton.addEventListener(
        "click",
        () => {

            validateVocabulary();

        }
    );

}


/* =========================================================
   SORT ARRAYS
   ========================================================= */

function sortedCopy(array) {

    return [...array].sort();

}


/* =========================================================
   COMPARE ARRAYS
   ========================================================= */

function arraysEqual(
    first,
    second
) {

    const a =
        sortedCopy(first);


    const b =
        sortedCopy(second);


    if (a.length !== b.length) {

        return false;

    }


    return a.every(
        (
            value,
            index
        ) =>
            value === b[index]
    );

}


/* =========================================================
   VALIDATE VOCABULARY
   ========================================================= */

function validateVocabulary() {

    if (
        gameState.selectedVocabulary.length !==
        CORRECT_VOCABULARY.length
    ) {

        setVocabularyFeedback(
            "Pilih kabeh papat kosakata sing cocog karo gambar.",
            "error"
        );

        return;

    }


    if (
        !arraysEqual(
            gameState.selectedVocabulary,
            CORRECT_VOCABULARY
        )
    ) {

        setVocabularyFeedback(
            "Isih ana kosakata sing durung cocog. Priksa maneh.",
            "error"
        );

        return;

    }


    gameState.vocabularyCompleted =
        true;


    setVocabularyFeedback(
        "Bener! Saiki kowe siap nyusun ukara.",
        "success"
    );


    setTimeout(
        () => {

            showScreen(
                "screen04"
            );

        },
        500
    );

}


/* =========================================================
   SENTENCE WORD BANK
   ========================================================= */

function getSentenceWordButtons() {

    return getAll(
        ".sentence-word"
    );

}


/* =========================================================
   RENDER SENTENCE
   ========================================================= */

function renderSentence() {

    const slots =
        getElement(
            "sentenceSlots"
        );


    if (!slots) {

        return;

    }


    slots.innerHTML = "";


    if (
        gameState.sentenceWords.length === 0
    ) {

        const placeholder =
            document.createElement(
                "div"
            );


        placeholder.className =
            "sentence-placeholder";


        placeholder.textContent =
            "Klik tembung ing ngisor kanggo nyusun ukara.";


        slots.appendChild(
            placeholder
        );


        return;

    }


    gameState.sentenceWords
        .forEach(
            word => {

                const slot =
                    document.createElement(
                        "div"
                    );


                slot.className =
                    "sentence-slot";


                slot.textContent =
                    word;


                slots.appendChild(
                    slot
                );

            }
        );

}


/* =========================================================
   UPDATE WORD BANK STATE
   ========================================================= */

function updateWordBank() {

    const buttons =
        getSentenceWordButtons();


    buttons.forEach(
        button => {

            const word =
                button.dataset.word;


            const used =
                gameState.sentenceWords
                    .includes(word);


            button.classList.toggle(
                "used",
                used
            );


            button.disabled =
                used;

        }
    );

}


/* =========================================================
   ADD SENTENCE WORD
   ========================================================= */

function addSentenceWord(
    button
) {

    const word =
        button.dataset.word;


    if (!word) {

        return;

    }


    if (
        gameState.sentenceWords
            .includes(word)
    ) {

        return;

    }


    gameState.sentenceWords
        .push(word);


    renderSentence();

    updateWordBank();

    setSentenceFeedback(
        `Tembung "${word}" wis ditambahake.`
    );

}


/* =========================================================
   SENTENCE FEEDBACK
   ========================================================= */

function setSentenceFeedback(
    message,
    type = ""
) {

    const feedback =
        getElement(
            "sentenceFeedback"
        );


    if (!feedback) {

        return;

    }


    feedback.textContent =
        message;


    feedback.classList.remove(
        "success",
        "error"
    );


    if (type) {

        feedback.classList.add(
            type
        );

    }

}


/* =========================================================
   CLEAR SENTENCE
   ========================================================= */

function clearSentence() {

    gameState.sentenceWords =
        [];


    renderSentence();

    updateWordBank();

    setSentenceFeedback(
        "Ukara wis direset. Susun maneh saka awal."
    );

}


/* =========================================================
   SETUP SENTENCE BUILDER
   ========================================================= */

function setupSentenceBuilder() {

    getSentenceWordButtons()
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        addSentenceWord(
                            button
                        );

                    }
                );

            }
        );


    const clearButton =
        getElement(
            "clearSentenceButton"
        );


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            clearSentence
        );

    }


    const checkButton =
        getElement(
            "checkSentenceButton"
        );


    if (checkButton) {

        checkButton.addEventListener(
            "click",
            validateSentence
        );

    }


    renderSentence();

    updateWordBank();

}


/* =========================================================
   RESET SENTENCE FOR RETRY
   ========================================================= */

function resetSentenceForRetry() {

    gameState.sentenceWords = [];

    renderSentence();

    updateWordBank();

}


/* =========================================================
   VALIDATE SENTENCE
   ========================================================= */

function validateSentence() {

    /* -----------------------------------------------------
       BELUM MEMILIH KATA
       ----------------------------------------------------- */

    if (
        gameState.sentenceWords.length === 0
    ) {

        setSentenceFeedback(
            "Ayo pilih tembung dhisik.",
            "error"
        );

        return;

    }


    /* -----------------------------------------------------
       CEK JUMLAH KATA
       ----------------------------------------------------- */

    if (
        gameState.sentenceWords.length !==
        CORRECT_SENTENCE.length
    ) {

        setSentenceFeedback(
            "Ukara durung lengkap. Gunakake tembung sing dibutuhake.",
            "error"
        );


        /* -------------------------------------------------
           SETELAH SALAH → KEMBALI MENCOBA
           ------------------------------------------------- */

        setTimeout(
            () => {

                resetSentenceForRetry();

                setSentenceFeedback(
                    "Coba maneh. Susun ukara saka awal."
                );

            },
            900
        );


        return;

    }


    /* -----------------------------------------------------
       CEK URUTAN KATA
       ----------------------------------------------------- */

    const current =
        gameState.sentenceWords;


    const correct =
        current.every(
            (
                word,
                index
            ) =>
                word ===
                CORRECT_SENTENCE[index]
        );


    /* -----------------------------------------------------
       JIKA SALAH
       ----------------------------------------------------- */

    if (!correct) {

        setSentenceFeedback(
            "✕ Urutane isih salah. Coba maneh.",
            "error"
        );


        /* -------------------------------------------------
           JEDA SEBENTAR AGAR PEMAIN MELIHAT FEEDBACK
           ------------------------------------------------- */

        setTimeout(
            () => {

                resetSentenceForRetry();

                setSentenceFeedback(
                    "Coba maneh. Susun tembung kanthi urutan sing bener."
                );

            },
            900
        );


        return;

    }


    /* -----------------------------------------------------
       JIKA BENAR
       ----------------------------------------------------- */

    gameState.sentenceCompleted =
        true;


    setSentenceFeedback(
        "✓ Bener! Ana wit ing pinggir kali.",
        "success"
    );


    /* -----------------------------------------------------
       LANJUT KE SCREEN BERIKUTNYA
       ----------------------------------------------------- */

    setTimeout(
        () => {

            showScreen(
                "screen05"
            );

        },
        650
    );

}


/* =========================================================
   TRANSLATION SCREEN
   ========================================================= */

function setupTranslationScreen() {

    const button =
        getElement(
            "finishLearningButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        () => {

            if (
                !gameState.sentenceCompleted
            ) {

                return;

            }


            showScreen(
                "screen06"
            );


            claimReward();

        }
    );

}


/* =========================================================
   FINISH SCREEN
   ========================================================= */

function setupFinishScreen() {

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

            claimReward();

        }
    );

}


/* =========================================================
   PREVENT ACCIDENTAL FORM SUBMIT
   ========================================================= */

function preventButtonSubmit() {

    getAll("button")
        .forEach(
            button => {

                if (!button.getAttribute(
                    "type"
                )) {

                    button.setAttribute(
                        "type",
                        "button"
                    );

                }

            }
        );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeGameplay() {

    updatePlayerHUD();

    preventButtonSubmit();

    setupNextScreenButtons();

    setupStartButton();

    setupObservation();

    setupVocabulary();

    setupSentenceBuilder();

    setupTranslationScreen();

    setupFinishScreen();

}


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeGameplay
);


/* =========================================================
   DEBUG HELPERS
   ========================================================= */

window.LelanaGameplay08 = {

    state: gameState,

    showScreen,

    claimReward,

    resetGameplay: function () {

        gameState.currentScreen =
            "screen01";

        gameState.selectedVocabulary =
            [];

        gameState.sentenceWords =
            [];

        gameState.vocabularyCompleted =
            false;

        gameState.sentenceCompleted =
            false;

        gameState.rewardClaimed =
            false;


        vocabularyCards()
            .forEach(
                card => {

                    card.classList.remove(
                        "selected",
                        "wrong"
                    );

                }
            );


        renderSelectedVocabulary();

        renderSentence();

        updateWordBank();

        showScreen(
            "screen01"
        );

    }

};


/* =========================================================
   END
   ========================================================= */