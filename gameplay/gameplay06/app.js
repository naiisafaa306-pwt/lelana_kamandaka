/* ============================================================
   LELANA KAMANDAKA
   GAMEPLAY 06 — GOA JATIJAJAR
   MEMORY KOSAKATA
   APP.JS
   ============================================================ */

"use strict";


/* ============================================================
   DOM READY
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ======================================================
           01. CONFIG
           ====================================================== */

        const LEVEL =
            6;

        const LEVEL_CODE =
            "06";

        const LOCATION =
            "Goa Jatijajar";

        const TOTAL_PAIRS =
            6;

        const POINT_PER_MATCH =
            25;

        const WRONG_PENALTY =
            5;

        const COMPLETION_BONUS =
            50;

        const XP_REWARD =
            150;

        const BASA_REWARD =
            6;

        const WRONG_DELAY =
            900;

        const MAX_XP =
            1000;


        /* ======================================================
           02. STORAGE
           ====================================================== */

        const GLOBAL_STORAGE_KEY =
            "lelanaKamandakaProgress";

        const LEVEL_STORAGE_KEY =
            "lelana_kamandaka_level_06";

        const XP_STORAGE_KEY =
            "lelana_kamandaka_xp";

        const BASA_STORAGE_KEY =
            "lelana_kamandaka_basa";


        /* ======================================================
           03. DATA KOSAKATA
           ====================================================== */

        const VOCABULARY = [

            {
                id: "cahya",
                jawa: "CAHYA",
                indonesia: "CAHAYA"
            },

            {
                id: "watu",
                jawa: "WATU",
                indonesia: "BATU"
            },

            {
                id: "banyu",
                jawa: "BANYU",
                indonesia: "AIR"
            },

            {
                id: "alas",
                jawa: "ALAS",
                indonesia: "HUTAN"
            },

            {
                id: "wengi",
                jawa: "WENGI",
                indonesia: "MALAM"
            },

            {
                id: "esuk",
                jawa: "ESUK",
                indonesia: "PAGI"
            }

        ];


        /* ======================================================
           04. ELEMENT SCREEN
           ====================================================== */

        const screens =
            Array.from(
                document.querySelectorAll(
                    ".game-screen"
                )
            );


        const startJourneyButton =
            document.getElementById(
                "startJourneyButton"
            );


        const startMemoryButton =
            document.getElementById(
                "startMemoryButton"
            );


        const resetMemoryButton =
            document.getElementById(
                "resetMemoryButton"
            );


        const finishJourneyButton =
            document.getElementById(
                "finishJourneyButton"
            );


        /* ======================================================
           05. ELEMENT MEMORY
           ====================================================== */

        const memoryBoard =
            document.getElementById(
                "memoryBoard"
            );


        const memoryFeedback =
            document.getElementById(
                "memoryFeedback"
            );


        const matchedCount =
            document.getElementById(
                "matchedCount"
            );


        const attemptCount =
            document.getElementById(
                "attemptCount"
            );


        const scoreCount =
            document.getElementById(
                "scoreCount"
            );


        const finalPairs =
            document.getElementById(
                "finalPairs"
            );


        const finalAttempts =
            document.getElementById(
                "finalAttempts"
            );


        const finalScore =
            document.getElementById(
                "finalScore"
            );


        const gameplayRewardXp =
            document.getElementById(
                "gameplayRewardXp"
            );


        /* ======================================================
           06. PLAYER HUD
           ====================================================== */

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


        /* ======================================================
           07. GAME STATE
           ====================================================== */

        let selectedCards =
            [];

        let matchedPairs =
            0;

        let attempts =
            0;

        let score =
            0;

        let locked =
            false;

        let completed =
            false;

        let finishHandled =
            false;


        /* ======================================================
           08. STORAGE HELPERS
           ====================================================== */

        function readNumber(
            key,
            fallback
        ) {

            try {

                const raw =
                    localStorage.getItem(
                        key
                    );


                if (
                    raw === null ||
                    raw === ""
                ) {

                    return fallback;

                }


                const value =
                    Number(raw);


                if (
                    Number.isFinite(
                        value
                    )
                ) {

                    return value;

                }


                return fallback;

            }
            catch (error) {

                console.error(
                    "Gagal membaca angka:",
                    error
                );

                return fallback;

            }

        }


        function writeNumber(
            key,
            value
        ) {

            try {

                localStorage.setItem(
                    key,
                    String(value)
                );

                return true;

            }
            catch (error) {

                console.error(
                    "Gagal menyimpan angka:",
                    error
                );

                return false;

            }

        }


        function readObject(
            key,
            fallback
        ) {

            try {

                const raw =
                    localStorage.getItem(
                        key
                    );


                if (!raw) {

                    return fallback;

                }


                const parsed =
                    JSON.parse(
                        raw
                    );


                if (
                    parsed &&
                    typeof parsed ===
                        "object"
                ) {

                    return parsed;

                }


                return fallback;

            }
            catch (error) {

                console.error(
                    "Gagal membaca object:",
                    error
                );

                return fallback;

            }

        }


        function writeObject(
            key,
            value
        ) {

            try {

                localStorage.setItem(
                    key,
                    JSON.stringify(
                        value
                    )
                );

                return true;

            }
            catch (error) {

                console.error(
                    "Gagal menyimpan object:",
                    error
                );

                return false;

            }

        }


        /* ======================================================
           09. SCREEN NAVIGATION
           ====================================================== */

        function hideAllScreens() {

            screens.forEach(
                function (screen) {

                    screen.classList.remove(
                        "active"
                    );

                }
            );

        }


        function showScreen(
            screenId
        ) {

            const target =
                document.getElementById(
                    screenId
                );


            if (!target) {

                console.error(
                    "Screen tidak ditemukan:",
                    screenId
                );

                return false;

            }


            hideAllScreens();


            target.classList.add(
                "active"
            );


            document.body.classList.add(
                "is-gameplay-active"
            );


            window.scrollTo(
                0,
                0
            );


            return true;

        }


        function closeGameplay() {

            hideAllScreens();


            document.body.classList.remove(
                "is-gameplay-active"
            );


            const opening =
                document.getElementById(
                    "screen01"
                );


            if (opening) {

                opening.classList.add(
                    "active"
                );

            }


            window.scrollTo(
                0,
                0
            );

        }


        /* ======================================================
           10. START GAMEPLAY
           ====================================================== */

        if (
            startJourneyButton
        ) {

            startJourneyButton.addEventListener(
                "click",
                function () {

                    startLearningScreen();

                }
            );

        }


        function startLearningScreen() {

            resetMemoryStateOnly();


            showScreen(
                "screen02"
            );

        }


        /* ======================================================
           11. START MEMORY
           ====================================================== */

        if (
            startMemoryButton
        ) {

            startMemoryButton.addEventListener(
                "click",
                function () {

                    startMemoryGame();

                    showScreen(
                        "screen03"
                    );

                }
            );

        }


        function startMemoryGame() {

            selectedCards =
                [];

            matchedPairs =
                0;

            attempts =
                0;

            score =
                0;

            locked =
                false;

            completed =
                false;

            finishHandled =
                false;


            renderMemoryBoard();


            updateMemoryStats();


            setFeedback(
                "Pilih rong kartu kanggo nemokake pasangan.",
                ""
            );

        }


        /* ======================================================
           12. RESET MEMORY STATE
           ====================================================== */

        function resetMemoryStateOnly() {

            selectedCards =
                [];

            matchedPairs =
                0;

            attempts =
                0;

            score =
                0;

            locked =
                false;

            completed =
                false;

            finishHandled =
                false;

        }


        /* ======================================================
           13. SHUFFLE
           ====================================================== */

        function shuffle(
            array
        ) {

            const copy =
                Array.from(
                    array
                );


            for (
                let index =
                    copy.length - 1;

                index > 0;

                index -= 1
            ) {

                const randomIndex =
                    Math.floor(
                        Math.random() *
                        (
                            index + 1
                        )
                    );


                const temporary =
                    copy[index];


                copy[index] =
                    copy[randomIndex];


                copy[randomIndex] =
                    temporary;

            }


            return copy;

        }


        /* ======================================================
           14. BUILD CARDS
           ====================================================== */

        function buildCards() {

            const cards =
                [];


            VOCABULARY.forEach(
                function (item) {

                    cards.push({

                        pair:
                            item.id,

                        type:
                            "jawa",

                        word:
                            item.jawa

                    });


                    cards.push({

                        pair:
                            item.id,

                        type:
                            "indonesia",

                        word:
                            item.indonesia

                    });

                }
            );


            return shuffle(
                cards
            );

        }


        /* ======================================================
           15. CREATE CARD
           ====================================================== */

        function createCard(
            data,
            index
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "memory-card";


            button.dataset.pair =
                data.pair;


            button.dataset.type =
                data.type;


            button.dataset.word =
                data.word;


            button.dataset.index =
                String(index);


            button.setAttribute(
                "aria-label",
                "Kartu tertutup"
            );


            button.setAttribute(
                "aria-pressed",
                "false"
            );


            const inner =
                document.createElement(
                    "span"
                );


            inner.className =
                "memory-card-inner";


            const front =
                document.createElement(
                    "span"
                );


            front.className =
                "memory-card-front";


            front.textContent =
                "✦";


            const back =
                document.createElement(
                    "span"
                );


            back.className =
                "memory-card-back";


            back.textContent =
                data.word;


            inner.appendChild(
                front
            );


            inner.appendChild(
                back
            );


            button.appendChild(
                inner
            );


            button.addEventListener(
                "click",
                function () {

                    handleCardClick(
                        button
                    );

                }
            );


            return button;

        }


        /* ======================================================
           16. RENDER BOARD
           ====================================================== */

        function renderMemoryBoard() {

            if (!memoryBoard) {

                return;

            }


            memoryBoard.innerHTML =
                "";


            const cards =
                buildCards();


            cards.forEach(
                function (
                    cardData,
                    index
                ) {

                    const card =
                        createCard(
                            cardData,
                            index
                        );


                    memoryBoard.appendChild(
                        card
                    );

                }
            );

        }


        /* ======================================================
           17. OPEN CARD
           ====================================================== */

        function openCard(
            card
        ) {

            if (!card) {

                return;

            }


            card.classList.add(
                "is-flipped"
            );


            card.setAttribute(
                "aria-pressed",
                "true"
            );


            card.setAttribute(
                "aria-label",
                "Kartu " +
                card.dataset.word
            );

        }


        /* ======================================================
           18. CLOSE CARD
           ====================================================== */

        function closeCard(
            card
        ) {

            if (!card) {

                return;

            }


            card.classList.remove(
                "is-flipped"
            );


            card.classList.remove(
                "is-wrong"
            );


            card.setAttribute(
                "aria-pressed",
                "false"
            );


            card.setAttribute(
                "aria-label",
                "Kartu tertutup"
            );

        }


        /* ======================================================
           19. MATCHED CARD
           ====================================================== */

        function markMatched(
            card
        ) {

            if (!card) {

                return;

            }


            card.classList.add(
                "is-matched"
            );


            card.disabled =
                true;


            card.setAttribute(
                "aria-pressed",
                "true"
            );

        }


        /* ======================================================
           20. CHECK PAIR
           ====================================================== */

        function isPair(
            first,
            second
        ) {

            if (
                !first ||
                !second
            ) {

                return false;

            }


            return (
                first.dataset.pair ===
                second.dataset.pair
            );

        }


        /* ======================================================
           21. CARD CLICK
           ====================================================== */

        function handleCardClick(
            card
        ) {

            if (!card) {

                return;

            }


            if (locked) {

                return;

            }


            if (completed) {

                return;

            }


            if (
                card.classList.contains(
                    "is-flipped"
                )
            ) {

                return;

            }


            if (
                card.classList.contains(
                    "is-matched"
                )
            ) {

                return;

            }


            if (
                selectedCards.length >= 2
            ) {

                return;

            }


            openCard(
                card
            );


            selectedCards.push(
                card
            );


            if (
                selectedCards.length === 1
            ) {

                setFeedback(
                    "Saiki pilih kartu kapindho.",
                    ""
                );


                return;

            }


            attempts +=
                1;


            updateMemoryStats();


            const first =
                selectedCards[0];


            const second =
                selectedCards[1];


            if (
                isPair(
                    first,
                    second
                )
            ) {

                handleCorrectPair(
                    first,
                    second
                );

                return;

            }


            handleWrongPair(
                first,
                second
            );

        }


        /* ======================================================
           22. CORRECT PAIR
           ====================================================== */

        function handleCorrectPair(
            first,
            second
        ) {

            locked =
                true;


            markMatched(
                first
            );


            markMatched(
                second
            );


            matchedPairs +=
                1;


            score +=
                POINT_PER_MATCH;


            const pairData =
                VOCABULARY.find(
                    function (item) {

                        return (
                            item.id ===
                            first.dataset.pair
                        );

                    }
                );


            if (pairData) {

                setFeedback(
                    "Bener! " +
                    pairData.jawa +
                    " tegese " +
                    pairData.indonesia +
                    ".",
                    "success"
                );

            }
            else {

                setFeedback(
                    "Bener! Pasangan iki tepat.",
                    "success"
                );

            }


            selectedCards =
                [];


            locked =
                false;


            updateMemoryStats();


            if (
                matchedPairs >=
                TOTAL_PAIRS
            ) {

                score +=
                    COMPLETION_BONUS;


                updateMemoryStats();


                finishMemoryGame();

            }

        }


        /* ======================================================
           23. WRONG PAIR
           ====================================================== */

        function handleWrongPair(
            first,
            second
        ) {

            locked =
                true;


            score =
                Math.max(
                    0,
                    score -
                    WRONG_PENALTY
                );


            first.classList.add(
                "is-wrong"
            );


            second.classList.add(
                "is-wrong"
            );


            setFeedback(
                "Durung bener. Elinga maneh tegese tembung kasebut.",
                "error"
            );


            updateMemoryStats();


            window.setTimeout(
                function () {

                    closeCard(
                        first
                    );


                    closeCard(
                        second
                    );


                    selectedCards =
                        [];


                    locked =
                        false;


                    setFeedback(
                        "Coba maneh. Temokake pasangan Jawa lan Indonesia.",
                        ""
                    );

                },
                WRONG_DELAY
            );

        }


        /* ======================================================
           24. FEEDBACK
           ====================================================== */

        function setFeedback(
            message,
            type
        ) {

            if (!memoryFeedback) {

                return;

            }


            memoryFeedback.textContent =
                message;


            memoryFeedback.classList.remove(
                "success",
                "error"
            );


            if (type) {

                memoryFeedback.classList.add(
                    type
                );

            }

        }


        /* ======================================================
           25. MEMORY STATS
           ====================================================== */

        function updateMemoryStats() {

            if (matchedCount) {

                matchedCount.textContent =
                    String(
                        matchedPairs
                    );

            }


            if (attemptCount) {

                attemptCount.textContent =
                    String(
                        attempts
                    );

            }


            if (scoreCount) {

                scoreCount.textContent =
                    String(
                        score
                    );

            }


            if (finalPairs) {

                finalPairs.textContent =
                    String(
                        matchedPairs
                    );

            }


            if (finalAttempts) {

                finalAttempts.textContent =
                    String(
                        attempts
                    );

            }


            if (finalScore) {

                finalScore.textContent =
                    String(
                        score
                    );

            }

        }


        /* ======================================================
           26. FINISH MEMORY
           ====================================================== */

        function finishMemoryGame() {

            if (finishHandled) {

                return;

            }


            finishHandled =
                true;


            completed =
                true;


            locked =
                true;


            saveLevelCompletion();


            giveXpReward();


            giveBasaReward();


            if (
                gameplayRewardXp
            ) {

                gameplayRewardXp.textContent =
                    "+" +
                    XP_REWARD +
                    " XP";

            }


            updateMemoryStats();


            window.setTimeout(
                function () {

                    showScreen(
                        "screen04"
                    );

                },
                700
            );

        }


        /* ======================================================
           27. XP
           ====================================================== */

        function getCurrentXp() {

            return readNumber(
                XP_STORAGE_KEY,
                0
            );

        }


        function setCurrentXp(
            value
        ) {

            const safe =
                Math.max(
                    0,
                    Number(value) ||
                    0
                );


            writeNumber(
                XP_STORAGE_KEY,
                safe
            );


            updatePlayerHud();


            return safe;

        }


        function giveXpReward() {

            const levelData =
                readObject(
                    LEVEL_STORAGE_KEY,
                    {}
                );


            if (
                levelData &&
                levelData.completed
            ) {

                updatePlayerHud();

                return getCurrentXp();

            }


            const current =
                getCurrentXp();


            const next =
                current +
                XP_REWARD;


            setCurrentXp(
                next
            );


            return next;

        }


        /* ======================================================
           28. BASA
           ====================================================== */

        function getCurrentBasa() {

            return readNumber(
                BASA_STORAGE_KEY,
                0
            );

        }


        function giveBasaReward() {

            const levelData =
                readObject(
                    LEVEL_STORAGE_KEY,
                    {}
                );


            if (
                levelData &&
                levelData.basaRewardGiven
            ) {

                updatePlayerHud();

                return getCurrentBasa();

            }


            const current =
                getCurrentBasa();


            const next =
                current +
                BASA_REWARD;


            writeNumber(
                BASA_STORAGE_KEY,
                next
            );


            updatePlayerHud();


            return next;

        }


        /* ======================================================
           29. SAVE LEVEL COMPLETION
           ====================================================== */

        function saveLevelCompletion() {

            const payload = {

                level:
                    LEVEL,

                code:
                    LEVEL_CODE,

                location:
                    LOCATION,

                completed:
                    true,

                pairs:
                    matchedPairs,

                attempts:
                    attempts,

                score:
                    score,

                xpReward:
                    XP_REWARD,

                basaReward:
                    BASA_REWARD,

                basaRewardGiven:
                    true,

                completedAt:
                    new Date()
                        .toISOString()

            };


            writeObject(
                LEVEL_STORAGE_KEY,
                payload
            );


            const globalProgress =
                readObject(
                    GLOBAL_STORAGE_KEY,
                    {}
                );


            if (
                !Array.isArray(
                    globalProgress.completedLocations
                )
            ) {

                globalProgress.completedLocations =
                    [];

            }


            if (
                !globalProgress
                    .completedLocations
                    .includes(
                        LEVEL
                    )
            ) {

                globalProgress
                    .completedLocations
                    .push(
                        LEVEL
                    );

            }


            globalProgress.currentLocation =
                Math.max(
                    Number(
                        globalProgress.currentLocation ||
                        1
                    ),
                    LEVEL
                );


            globalProgress.level06 =
                payload;


            globalProgress.level =
                Math.max(
                    Number(
                        globalProgress.level ||
                        1
                    ),
                    LEVEL
                );


            globalProgress.xp =
                getCurrentXp();


            globalProgress.basa =
                getCurrentBasa();


            writeObject(
                GLOBAL_STORAGE_KEY,
                globalProgress
            );

        }


        /* ======================================================
           30. PLAYER HUD
           ====================================================== */

        function updatePlayerHud() {

            const xp =
                getCurrentXp();


            const basa =
                getCurrentBasa();


            const level =
    Math.max(
        6,
        Math.floor(
            xp /
            MAX_XP
        ) + 1
    );

            const currentLevelXp =
                xp %
                MAX_XP;


            const percentage =
                Math.min(
                    100,
                    (
                        currentLevelXp /
                        MAX_XP
                    ) *
                    100
                );


            if (
                playerLevel
            ) {

                playerLevel.textContent =
                    "Level " +
                    String(
                        level
                    ).padStart(
                        2,
                        "0"
                    );

            }


            if (
                playerXpTop
            ) {

                playerXpTop.textContent =
                    xp +
                    " XP";

            }


            if (
                playerXpBottom
            ) {

                playerXpBottom.textContent =
                    currentLevelXp
                        .toLocaleString(
                            "id-ID"
                        ) +
                    " / 1.000 XP";

            }


            if (
                playerXpBar
            ) {

                playerXpBar.style.width =
                    percentage +
                    "%";

            }


            if (
                playerBasa
            ) {

                playerBasa.textContent =
                    String(
                        basa
                    );

            }

        }


        /* ======================================================
           31. RESET GAME
           ====================================================== */

        if (
            resetMemoryButton
        ) {

            resetMemoryButton.addEventListener(
                "click",
                function () {

                    startMemoryGame();

                }
            );

        }


        /* ======================================================
           32. FINISH BUTTON
           ====================================================== */

        if (
            finishJourneyButton
        ) {

            finishJourneyButton.addEventListener(
                "click",
                function () {

                    saveLevelCompletion();

                }
            );

        }


        /* ======================================================
           33. ESCAPE
           ====================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !==
                    "Escape"
                ) {

                    return;

                }


                if (
                    document.body
                        .classList
                        .contains(
                            "is-gameplay-active"
                        )
                ) {

                    closeGameplay();

                }

            }
        );


        /* ======================================================
           34. INITIAL SCREEN
           ====================================================== */

        hideAllScreens();


        const initialScreen =
            document.getElementById(
                "screen01"
            );


        if (
            initialScreen
        ) {

            initialScreen.classList.add(
                "active"
            );

        }


        document.body.classList.remove(
            "is-gameplay-active"
        );


        /* ======================================================
           35. INITIAL HUD
           ====================================================== */

        updatePlayerHud();


        updateMemoryStats();


        /* ======================================================
           36. DEBUG
           ====================================================== */

        window.lelanaGameplay06 =
            {

                getState:
                    function () {

                        return {

                            level:
                                LEVEL,

                            location:
                                LOCATION,

                            matchedPairs:
                                matchedPairs,

                            attempts:
                                attempts,

                            score:
                                score,

                            completed:
                                completed,

                            xp:
                                getCurrentXp(),

                            basa:
                                getCurrentBasa()

                        };

                    },


                resetGame:
                    function () {

                        startMemoryGame();

                        showScreen(
                            "screen03"
                        );

                    },


                showScreen:
                    function (
                        screenId
                    ) {

                        showScreen(
                            screenId
                        );

                    }

            };


        /* ======================================================
           37. CONSOLE
           ====================================================== */

        console.log(
            "===================================="
        );


        console.log(
            "LELANA KAMANDAKA"
        );


        console.log(
            "Gameplay 06 — Goa Jatijajar"
        );


        console.log(
            "Memory Kosakata"
        );


        console.log(
            "Pasangan:",
            TOTAL_PAIRS
        );


        console.log(
            "Reward XP:",
            XP_REWARD
        );


        console.log(
            "Reward BASA:",
            BASA_REWARD
        );


        console.log(
            "Alur:"
        );


        console.log(
            "screen01 → screen02 → screen03 → screen04"
        );


        console.log(
            "Kosakata:"
        );


        VOCABULARY.forEach(
            function (item) {

                console.log(
                    item.jawa +
                    " ↔ " +
                    item.indonesia
                );

            }
        );


        console.log(
            "===================================="
        );


    }
);
