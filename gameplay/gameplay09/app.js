/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 09 — KALI SERAYU
   MEMAHAMI INSTRUKSI BASA JAWA
   ========================================================= */


/* =========================================================
   GAME CONFIGURATION
   ========================================================= */

const GAMEPLAY_LEVEL = 9;

const GAMEPLAY_NAME = "Kali Serayu";

const GAMEPLAY_XP_REWARD = 100;

const GAMEPLAY_BASA_REWARD = 25;

const GAMEPLAY_TOTAL_ROUNDS = 3;

const GAMEPLAY_TOTAL_SCREENS = 5;


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const STORAGE_PREFIX = "lelana_kamandaka";

const PLAYER_XP_KEY =
    `${STORAGE_PREFIX}_xp`;

const PLAYER_BASA_KEY =
    `${STORAGE_PREFIX}_basa`;

const GAMEPLAY_COMPLETED_KEY =
    `${STORAGE_PREFIX}_gameplay_${String(GAMEPLAY_LEVEL).padStart(2, "0")}_completed`;

const GAMEPLAY_PROGRESS_KEY =
    `${STORAGE_PREFIX}_gameplay_${String(GAMEPLAY_LEVEL).padStart(2, "0")}_progress`;


/* =========================================================
   DOM REFERENCES
   ========================================================= */

const screens =
    document.querySelectorAll(".game-screen");

const startJourneyButton =
    document.getElementById("startJourneyButton");

const finishJourneyButton =
    document.getElementById("finishJourneyButton");

const completionModal =
    document.getElementById("completionModal");

const completionClose =
    document.getElementById("completionClose");

const completionContinue =
    document.getElementById("completionContinue");

const completionText =
    document.getElementById("completionText");

const playerLevel =
    document.getElementById("playerLevel");

const playerXpTop =
    document.getElementById("playerXpTop");

const playerXpBar =
    document.getElementById("playerXpBar");

const playerXpBottom =
    document.getElementById("playerXpBottom");

const playerBasa =
    document.getElementById("playerBasa");

const gameplayRewardXp =
    document.getElementById("gameplayRewardXp");

const gameplayRewardBasa =
    document.getElementById("gameplayRewardBasa");


/* =========================================================
   GAME STATE
   ========================================================= */

const gameState = {

    currentScreen: "screen01",

    currentRound: 0,

    correctAnswers: 0,

    wrongAnswers: 0,

    completed: false,

    rewardGranted: false

};


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeGameplay
);


function initializeGameplay() {

    initializeHUD();

    initializeButtons();

    initializeDirectionButtons();

    initializeModal();

    initializeFinishButton();

    loadSavedProgress();

    updateRewardDisplay();

}


/* =========================================================
   HUD INITIALIZATION
   ========================================================= */

function initializeHUD() {

    if (playerLevel) {

        playerLevel.textContent =
            `Level ${String(GAMEPLAY_LEVEL).padStart(2, "0")}`;

    }

    updateHUD();

}


/* =========================================================
   BUTTON INITIALIZATION
   ========================================================= */

function initializeButtons() {

    if (startJourneyButton) {

        startJourneyButton.addEventListener(
            "click",
            function () {

                const nextScreen =
                    startJourneyButton.dataset.nextScreen ||
                    "screen02";

                gameState.currentRound = 0;

                saveProgress();

                showScreen(nextScreen);

            }
        );

    }

}


/* =========================================================
   DIRECTION BUTTON INITIALIZATION
   ========================================================= */

function initializeDirectionButtons() {

    const directionButtons =
        document.querySelectorAll(
            ".direction-button"
        );


    directionButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    handleDirectionAnswer(button);

                }
            );

        }
    );

}


/* =========================================================
   HANDLE DIRECTION ANSWER
   ========================================================= */

function handleDirectionAnswer(button) {

    if (!button) {

        return;

    }


    if (button.classList.contains("is-correct")) {

        return;

    }


    if (button.classList.contains("is-wrong")) {

        return;

    }


    const currentScreen =
        button.closest(".game-screen");


    if (!currentScreen) {

        return;

    }


    const isCorrect =
        button.dataset.correct === "true";


    const answer =
        button.dataset.answer || "";


    const feedback =
        currentScreen.querySelector(
            ".answer-feedback"
        );


    if (isCorrect) {

        processCorrectAnswer(
            button,
            answer,
            feedback
        );

    } else {

        processWrongAnswer(
            button,
            answer,
            feedback
        );

    }

}


/* =========================================================
   CORRECT ANSWER
   ========================================================= */

function processCorrectAnswer(
    button,
    answer,
    feedback
) {

    gameState.correctAnswers += 1;

    gameState.currentRound += 1;

    button.classList.add(
        "is-correct"
    );


    disableCurrentAnswerButtons();


    const message =
        getCorrectMessage(
            gameState.currentScreen,
            answer
        );


    showFeedback(
        feedback,
        message,
        "success"
    );


    saveProgress();


    window.setTimeout(
        function () {

            handleSuccessfulRound();

        },
        700
    );

}


/* =========================================================
   WRONG ANSWER
   ========================================================= */

function processWrongAnswer(
    button,
    answer,
    feedback
) {

    gameState.wrongAnswers += 1;

    button.classList.add(
        "is-wrong"
    );


    const message =
        getWrongMessage(
            gameState.currentScreen,
            answer
        );


    showFeedback(
        feedback,
        message,
        "error"
    );


    window.setTimeout(
        function () {

            button.classList.remove(
                "is-wrong"
            );

        },
        650
    );

}


/* =========================================================
   SUCCESSFUL ROUND
   ========================================================= */

function handleSuccessfulRound() {

    const current =
        gameState.currentScreen;


    if (current === "screen02") {

        showCompletionModal(
            "Bener!",
            "“Belok nengen” berarti Kamandaka harus belok ke arah kanan."
        );

        return;

    }


    if (current === "screen03") {

        showCompletionModal(
            "Tepat!",
            "Kata “aja” berarti jangan. Kamandaka tidak boleh memilih kiwa."
        );

        return;

    }


    if (current === "screen04") {

        showCompletionModal(
            "Bener!",
            "“Menyang maju” mengarahkan Kamandaka untuk bergerak maju."
        );

        return;

    }


    showNextScreen();

}


/* =========================================================
   GET CORRECT MESSAGE
   ========================================================= */

function getCorrectMessage(
    screen,
    answer
) {

    if (
        screen === "screen02" &&
        answer === "tengen"
    ) {

        return "Bener! “Tengen” berarti kanan.";

    }


    if (
        screen === "screen03" &&
        answer !== "kiwa"
    ) {

        return "Bener! Pilihanmu tidak melanggar larangan “aja menyang kiwa”.";

    }


    if (
        screen === "screen04" &&
        answer === "maju"
    ) {

        return "Bener! “Maju” berarti bergerak ke depan.";

    }


    return "Bener! Instruksi berhasil dipahami.";

}


/* =========================================================
   GET WRONG MESSAGE
   ========================================================= */

function getWrongMessage(
    screen,
    answer
) {

    if (
        screen === "screen02"
    ) {

        return "Durung bener. “Nengen” berarti kanan. Coba pilih arah tengen.";

    }


    if (
        screen === "screen03" &&
        answer === "kiwa"
    ) {

        return "Aja! “Aja menyang kiwa” berarti jangan menuju kiri. Pilih arah selain kiwa.";

    }


    if (
        screen === "screen04"
    ) {

        return "Durung bener. “Maju” berarti bergerak ke depan.";

    }


    return "Coba pahami kembali instruksinya.";

}


/* =========================================================
   SHOW FEEDBACK
   ========================================================= */

function showFeedback(
    element,
    message,
    type
) {

    if (!element) {

        return;

    }


    element.textContent =
        message;


    element.className =
        `answer-feedback show ${type}`;

}


/* =========================================================
   DISABLE CURRENT BUTTONS
   ========================================================= */

function disableCurrentAnswerButtons() {

    const screen =
        document.getElementById(
            gameState.currentScreen
        );


    if (!screen) {

        return;

    }


    const buttons =
        screen.querySelectorAll(
            ".direction-button"
        );


    buttons.forEach(
        function (button) {

            button.disabled = true;

            button.style.cursor =
                "default";

        }
    );

}


/* =========================================================
   SHOW NEXT SCREEN
   ========================================================= */

function showNextScreen() {

    if (
        gameState.currentScreen === "screen02"
    ) {

        resetScreenButtons("screen03");

        showScreen("screen03");

        return;

    }


    if (
        gameState.currentScreen === "screen03"
    ) {

        resetScreenButtons("screen04");

        showScreen("screen04");

        return;

    }


    if (
        gameState.currentScreen === "screen04"
    ) {

        showScreen("screen05");

        completeGameplay();

        return;

    }

}


/* =========================================================
   SHOW SCREEN
   ========================================================= */

function showScreen(screenId) {

    if (!screenId) {

        return;

    }


    screens.forEach(
        function (screen) {

            screen.classList.remove(
                "active"
            );

        }
    );


    const target =
        document.getElementById(
            screenId
        );


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


    saveProgress();

}


/* =========================================================
   RESET SCREEN BUTTONS
   ========================================================= */

function resetScreenButtons(
    screenId
) {

    const screen =
        document.getElementById(
            screenId
        );


    if (!screen) {

        return;

    }


    const buttons =
        screen.querySelectorAll(
            ".direction-button"
        );


    buttons.forEach(
        function (button) {

            button.disabled = false;

            button.classList.remove(
                "is-correct"
            );

            button.classList.remove(
                "is-wrong"
            );

            button.style.cursor =
                "";

        }
    );


    const feedback =
        screen.querySelector(
            ".answer-feedback"
        );


    if (feedback) {

        feedback.textContent =
            "";

        feedback.className =
            "answer-feedback";

    }

}


/* =========================================================
   MODAL INITIALIZATION
   ========================================================= */

function initializeModal() {

    if (completionClose) {

        completionClose.addEventListener(
            "click",
            closeCompletionModal
        );

    }


    if (completionContinue) {

        completionContinue.addEventListener(
            "click",
            function () {

                closeCompletionModal();

                showNextScreen();

            }
        );

    }


    if (completionModal) {

        completionModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.hasAttribute(
                        "data-close-modal"
                    )
                ) {

                    closeCompletionModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                completionModal &&
                completionModal.classList.contains("show")
            ) {

                closeCompletionModal();

            }

        }
    );

}


/* =========================================================
   SHOW COMPLETION MODAL
   ========================================================= */

function showCompletionModal(
    title,
    message
) {

    if (!completionModal) {

        return;

    }


    const titleElement =
        document.getElementById(
            "completionTitle"
        );


    if (titleElement) {

        titleElement.textContent =
            title;

    }


    if (completionText) {

        completionText.textContent =
            message;

    }


    completionModal.classList.add(
        "show"
    );


    completionModal.setAttribute(
        "aria-hidden",
        "false"
    );


    if (completionContinue) {

        window.setTimeout(
            function () {

                completionContinue.focus();

            },
            100
        );

    }

}


/* =========================================================
   CLOSE COMPLETION MODAL
   ========================================================= */

function closeCompletionModal() {

    if (!completionModal) {

        return;

    }


    completionModal.classList.remove(
        "show"
    );


    completionModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   COMPLETE GAMEPLAY
   ========================================================= */

function completeGameplay() {

    if (
        gameState.completed
    ) {

        return;

    }


    gameState.completed =
        true;


    const alreadyCompleted =
        localStorage.getItem(
            GAMEPLAY_COMPLETED_KEY
        ) === "true";


    if (!alreadyCompleted) {

        grantRewards();

    } else {

        gameState.rewardGranted =
            true;

    }


    localStorage.setItem(
        GAMEPLAY_COMPLETED_KEY,
        "true"
    );


    saveProgress();

    updateRewardDisplay();

}


/* =========================================================
   GRANT REWARDS
   ========================================================= */

function grantRewards() {

    let currentXP =
        getStoredNumber(
            PLAYER_XP_KEY,
            0
        );


    let currentBasa =
        getStoredNumber(
            PLAYER_BASA_KEY,
            0
        );


    currentXP +=
        GAMEPLAY_XP_REWARD;


    currentBasa +=
        GAMEPLAY_BASA_REWARD;


    localStorage.setItem(
        PLAYER_XP_KEY,
        String(currentXP)
    );


    localStorage.setItem(
        PLAYER_BASA_KEY,
        String(currentBasa)
    );


    gameState.rewardGranted =
        true;


    updateHUD();

}


/* =========================================================
   UPDATE HUD
   ========================================================= */

function updateHUD() {

    const xp =
        getStoredNumber(
            PLAYER_XP_KEY,
            0
        );


    const basa =
        getStoredNumber(
            PLAYER_BASA_KEY,
            0
        );


    if (playerLevel) {

        playerLevel.textContent =
            `Level ${String(GAMEPLAY_LEVEL).padStart(2, "0")}`;

    }


    if (playerXpTop) {

        playerXpTop.textContent =
            `${formatNumber(xp)} XP`;

    }


    if (playerXpBottom) {

        playerXpBottom.textContent =
            `${formatNumber(xp)} / 1.000 XP`;

    }


    if (playerXpBar) {

        const progress =
            Math.min(
                (xp / 1000) * 100,
                100
            );


        playerXpBar.style.width =
            `${progress}%`;

    }


    if (playerBasa) {

        playerBasa.textContent =
            formatNumber(basa);

    }

}


/* =========================================================
   UPDATE REWARD DISPLAY
   ========================================================= */

function updateRewardDisplay() {

    if (gameplayRewardXp) {

        gameplayRewardXp.textContent =
            `+${GAMEPLAY_XP_REWARD} XP`;

    }


    if (gameplayRewardBasa) {

        gameplayRewardBasa.textContent =
            `+${GAMEPLAY_BASA_REWARD} BASA`;

    }

}


/* =========================================================
   INITIALIZE FINISH BUTTON
   ========================================================= */

function initializeFinishButton() {

    if (!finishJourneyButton) {

        return;

    }


    finishJourneyButton.addEventListener(
        "click",
        function () {

            saveProgress();

        }
    );

}


/* =========================================================
   LOAD SAVED PROGRESS
   ========================================================= */

function loadSavedProgress() {

    const completed =
        localStorage.getItem(
            GAMEPLAY_COMPLETED_KEY
        ) === "true";


    const savedProgress =
        localStorage.getItem(
            GAMEPLAY_PROGRESS_KEY
        );


    if (completed) {

        gameState.completed =
            true;

    }


    if (!savedProgress) {

        return;

    }


    try {

        const parsed =
            JSON.parse(
                savedProgress
            );


        if (
            parsed &&
            typeof parsed === "object"
        ) {

            if (
                typeof parsed.correctAnswers ===
                "number"
            ) {

                gameState.correctAnswers =
                    parsed.correctAnswers;

            }


            if (
                typeof parsed.wrongAnswers ===
                "number"
            ) {

                gameState.wrongAnswers =
                    parsed.wrongAnswers;

            }


            if (
                typeof parsed.currentRound ===
                "number"
            ) {

                gameState.currentRound =
                    parsed.currentRound;

            }

        }

    } catch (error) {

        console.warn(
            "Progress Gameplay 09 tidak dapat dibaca.",
            error
        );

    }

}


/* =========================================================
   SAVE PROGRESS
   ========================================================= */

function saveProgress() {

    const data = {

        level:
            GAMEPLAY_LEVEL,

        name:
            GAMEPLAY_NAME,

        currentScreen:
            gameState.currentScreen,

        currentRound:
            gameState.currentRound,

        correctAnswers:
            gameState.correctAnswers,

        wrongAnswers:
            gameState.wrongAnswers,

        completed:
            gameState.completed,

        savedAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        GAMEPLAY_PROGRESS_KEY,
        JSON.stringify(data)
    );

}


/* =========================================================
   GET STORED NUMBER
   ========================================================= */

function getStoredNumber(
    key,
    fallback
) {

    const raw =
        localStorage.getItem(key);


    if (
        raw === null ||
        raw === ""
    ) {

        return fallback;

    }


    const value =
        Number(raw);


    if (
        Number.isNaN(value)
    ) {

        return fallback;

    }


    return value;

}


/* =========================================================
   FORMAT NUMBER
   ========================================================= */

function formatNumber(
    number
) {

    return new Intl.NumberFormat(
        "id-ID"
    ).format(number);

}


/* =========================================================
   DEBUG INFORMATION
   ========================================================= */

function getGameplayDebugInfo() {

    return {

        level:
            GAMEPLAY_LEVEL,

        name:
            GAMEPLAY_NAME,

        xpReward:
            GAMEPLAY_XP_REWARD,

        basaReward:
            GAMEPLAY_BASA_REWARD,

        totalRounds:
            GAMEPLAY_TOTAL_ROUNDS,

        totalScreens:
            GAMEPLAY_TOTAL_SCREENS,

        currentScreen:
            gameState.currentScreen,

        correctAnswers:
            gameState.correctAnswers,

        wrongAnswers:
            gameState.wrongAnswers,

        completed:
            gameState.completed,

        rewardGranted:
            gameState.rewardGranted

    };

}


/* =========================================================
   EXPOSE DEBUG
   ========================================================= */

window.LelanaGameplay09 = {

    getState:
        function () {

            return {
                ...gameState
            };

        },

    getConfig:
        function () {

            return {

                level:
                    GAMEPLAY_LEVEL,

                name:
                    GAMEPLAY_NAME,

                xp:
                    GAMEPLAY_XP_REWARD,

                basa:
                    GAMEPLAY_BASA_REWARD

            };

        },

    getDebugInfo:
        getGameplayDebugInfo,

    resetProgress:
        function () {

            localStorage.removeItem(
                GAMEPLAY_PROGRESS_KEY
            );

            localStorage.removeItem(
                GAMEPLAY_COMPLETED_KEY
            );

            gameState.currentScreen =
                "screen01";

            gameState.currentRound =
                0;

            gameState.correctAnswers =
                0;

            gameState.wrongAnswers =
                0;

            gameState.completed =
                false;

            gameState.rewardGranted =
                false;

            showScreen("screen01");

        }

};


/* =========================================================
   END
   ========================================================= */