/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 02 — KI AJAR WINARONG
   APP.JS
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

    const FINAL_XP_REWARD =
        100;

    const FINAL_BASA_REWARD =
        20;


    /* =========================================================
       SCREEN
       ========================================================= */

    const screens = [
        ...document.querySelectorAll(
            ".game-screen"
        )
    ];


    const screen01 =
        document.getElementById(
            "screen01"
        );

    const screen02 =
        document.getElementById(
            "screen02"
        );

    const screen03 =
        document.getElementById(
            "screen03"
        );

    const screen04 =
        document.getElementById(
            "screen04"
        );

    const screen05 =
        document.getElementById(
            "screen05"
        );


    /* =========================================================
       BUTTON
       ========================================================= */

    const startJourneyButton =
        document.getElementById(
            "startJourneyButton"
        );

    const dialogNextButton =
        document.getElementById(
            "dialogNextButton"
        );

    const materialNextButton =
        document.getElementById(
            "materialNextButton"
        );

    const quizNextButton =
        document.getElementById(
            "quizNextButton"
        );

    const finishJourneyButton =
        document.getElementById(
            "finishJourneyButton"
        );


    /* =========================================================
       DIALOG
       ========================================================= */

    const dialogFeedback =
        document.getElementById(
            "dialogFeedback"
        );

    const dialogCorrectButton =
        document.querySelector(
            '[data-action="dialog-correct"]'
        );

    const dialogWrongButton =
        document.querySelector(
            '[data-action="dialog-wrong"]'
        );


    /* =========================================================
       QUIZ
       ========================================================= */

    const quizOptions = [
        ...document.querySelectorAll(
            "#quizOptions .gameplay-choice-button"
        )
    ];

    const quizFeedback =
        document.getElementById(
            "quizFeedback"
        );


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


    const gameplayProgressText =
        document.getElementById(
            "gameplayProgressText"
        );


    /* =========================================================
       STATE
       ========================================================= */

    let progress = null;

    let dialogAnswered =
        false;

    let quizAnswered =
        false;

    let quizCorrect =
        false;

    let finished =
        false;


    /* =========================================================
       DEFAULT PROGRESS
       ========================================================= */

    function createDefaultProgress() {

        return {

            currentChapter: 1,

            totalChapters:
                TOTAL_CHAPTERS,

            xp: 0,

            basa: 0,

            quizCompleted: false,

            completedChapters: [],

            completedLocations: [],

            unlockedLocations: [1]

        };

    }


    /* =========================================================
       NORMALIZE ARRAY
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
            (a, b) =>
                a - b
        );

    }


    /* =========================================================
       LOAD PROGRESS
       ========================================================= */

    function loadProgress() {

        let saved = null;

        /*
         * PRIORITAS:
         * localStorage karena map engine
         * menggunakan storage ini.
         */

        try {

            saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

        }
        catch (error) {

            console.warn(
                "localStorage tidak dapat dibaca.",
                error
            );

        }


        /*
         * BACKUP:
         * kalau localStorage kosong,
         * cek sessionStorage.
         */

        if (!saved) {

            try {

                saved =
                    sessionStorage.getItem(
                        STORAGE_KEY
                    );

            }
            catch (error) {

                console.warn(
                    "sessionStorage tidak dapat dibaca.",
                    error
                );

            }

        }


        let data =
            createDefaultProgress();


        if (saved) {

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
            catch (error) {

                console.warn(
                    "Progress lama rusak. Menggunakan progress baru.",
                    error
                );

            }

        }


        /*
         * NORMALISASI
         */

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


        /*
         * Lokasi 01 selalu terbuka.
         */

        if (
            !data.unlockedLocations.includes(
                1
            )
        ) {

            data.unlockedLocations.push(
                1
            );

        }


        /*
         * Kalau Chapter 01 selesai,
         * Lokasi 02 harus terbuka.
         */

        if (
            data.completedChapters.includes(
                1
            ) &&
            !data.unlockedLocations.includes(
                2
            )
        ) {

            data.unlockedLocations.push(
                2
            );

        }


        /*
         * Rapikan lagi.
         */

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

        if (!progress) {
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


        /*
         * STORAGE UTAMA
         */

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    data
                )
            );

        }
        catch (error) {

            console.error(
                "Gagal menyimpan localStorage.",
                error
            );

        }


        /*
         * Sinkronkan sessionStorage
         * supaya halaman lama tetap kompatibel.
         */

        try {

            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    data
                )
            );

        }
        catch (error) {

            console.warn(
                "Gagal menyinkronkan sessionStorage.",
                error
            );

        }


        console.log(
            "Progress Gameplay 02 tersimpan:",
            data
        );

    }


    /* =========================================================
       SHOW SCREEN
       ========================================================= */

    function showScreen(
        target
    ) {

        if (!target) {
            return;
        }


        /*
         * HANYA GAME SCREEN
         *
         * Navbar dan sidebar TIDAK disentuh.
         */

        screens.forEach(
            screen => {

                screen.classList.toggle(
                    "active",
                    screen === target
                );

            }
        );


        /*
         * Scroll hanya area halaman.
         */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        updateHUD();

    }


    /* =========================================================
       LEVEL HUD
       ========================================================= */

    function updateLevelHUD() {

        if (playerLevel) {

            playerLevel.textContent =
                "Level 02";

        }

    }


    /* =========================================================
       XP HUD
       ========================================================= */

    function updateXPHUD() {

        const xp =
            Number(
                progress?.xp
            ) || 0;


        /*
         * Level Gameplay 02 tetap Level 02.
         * XP tetap merupakan XP global pemain.
         */

        if (playerXpTop) {

            playerXpTop.textContent =
                `${xp} XP`;

        }


        if (playerXpBottom) {

            playerXpBottom.textContent =
                `${xp.toLocaleString("id-ID")} / 1.000 XP`;

        }


        if (playerXpBar) {

            const percentage =
                Math.min(
                    (xp / 1000) * 100,
                    100
                );

            playerXpBar.style.width =
                `${percentage}%`;

        }

    }


    /* =========================================================
       GAMEPLAY PROGRESS
       ========================================================= */

    function updateGameplayProgress() {

        if (
            !gameplayProgressText
        ) {

            return;

        }


        let completed =
            0;


        if (
            dialogAnswered
        ) {

            completed++;

        }


        if (
            quizAnswered
        ) {

            completed++;

        }


        if (
            finished
        ) {

            completed = 4;

        }


        gameplayProgressText.textContent =
            `${completed} / 4`;

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
            ) ||
            amount <= 0
        ) {

            return;

        }


        progress.xp +=
            amount;


        updateHUD();

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
            ) ||
            amount <= 0
        ) {

            return;

        }


        progress.basa +=
            amount;


        updateHUD();

    }


    /* =========================================================
       SCREEN 01
       OPENING
       ↓
       SCREEN 02
       ========================================================= */

    if (
        startJourneyButton
    ) {

        startJourneyButton.addEventListener(
            "click",
            () => {

                showScreen(
                    screen02
                );

            }
        );

    }


    /* =========================================================
       DIALOG — JAWABAN BENAR
       ========================================================= */

    if (
        dialogCorrectButton
    ) {

        dialogCorrectButton.addEventListener(
            "click",
            () => {

                if (
                    dialogAnswered
                ) {

                    return;

                }


                dialogAnswered =
                    true;


                dialogCorrectButton.classList.add(
                    "correct"
                );


                if (
                    dialogWrongButton
                ) {

                    dialogWrongButton.disabled =
                        true;

                }


                if (
                    dialogFeedback
                ) {

                    dialogFeedback.style.display =
                        "block";

                    dialogFeedback.classList.add(
                        "show",
                        "correct"
                    );

                    dialogFeedback.textContent =
                        "Benar. \"Asma kula Kamandaka\" lebih sopan digunakan ketika berbicara kepada orang yang lebih tua.";

                }


                if (
                    dialogNextButton
                ) {

                    dialogNextButton.disabled =
                        false;

                }


                updateGameplayProgress();

            }
        );

    }


    /* =========================================================
       DIALOG — JAWABAN SALAH
       ========================================================= */

    if (
        dialogWrongButton
    ) {

        dialogWrongButton.addEventListener(
            "click",
            () => {

                if (
                    dialogAnswered
                ) {

                    return;

                }


                dialogAnswered =
                    true;


                dialogWrongButton.classList.add(
                    "wrong"
                );


                if (
                    dialogCorrectButton
                ) {

                    dialogCorrectButton.classList.add(
                        "correct"
                    );

                    dialogCorrectButton.disabled =
                        true;

                }


                if (
                    dialogFeedback
                ) {

                    dialogFeedback.style.display =
                        "block";

                    dialogFeedback.classList.add(
                        "show",
                        "wrong"
                    );

                    dialogFeedback.textContent =
                        "Belum tepat. Saat berbicara kepada orang yang lebih tua, gunakan bentuk bahasa yang lebih sopan.";

                }


                if (
                    dialogNextButton
                ) {

                    dialogNextButton.disabled =
                        false;

                }


                updateGameplayProgress();

            }
        );

    }


    /* =========================================================
       DIALOG NEXT
       ↓
       SCREEN 03
       ========================================================= */

    if (
        dialogNextButton
    ) {

        dialogNextButton.addEventListener(
            "click",
            () => {

                if (
                    !dialogAnswered
                ) {

                    return;

                }


                showScreen(
                    screen03
                );

            }
        );

    }


    /* =========================================================
       MATERIAL BASA
       SCREEN 03
       ↓
       SCREEN 04
       ========================================================= */

    if (
        materialNextButton
    ) {

        materialNextButton.addEventListener(
            "click",
            () => {

                showScreen(
                    screen04
                );

            }
        );

    }


    /* =========================================================
       QUIZ
       ========================================================= */

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


                    quizAnswered =
                        true;


                    const answer =
                        option.dataset.answer;


                    quizCorrect =
                        answer ===
                        "correct";


                    /*
                     * Kunci semua pilihan.
                     */

                    quizOptions.forEach(
                        item => {

                            item.disabled =
                                true;

                        }
                    );


                    /*
                     * BENAR
                     */

                    if (
                        quizCorrect
                    ) {

                        option.classList.add(
                            "correct"
                        );


                        if (
                            quizFeedback
                        ) {

                            quizFeedback.style.display =
                                "block";

                            quizFeedback.classList.add(
                                "show",
                                "correct"
                            );

                            quizFeedback.textContent =
                                "Benar. \"Asma kula Kamandaka\" adalah kalimat yang lebih sopan.";

                        }

                    }


                    /*
                     * SALAH
                     */

                    else {

                        option.classList.add(
                            "wrong"
                        );


                        const correctOption =
                            quizOptions.find(
                                item =>
                                    item.dataset.answer ===
                                    "correct"
                            );


                        if (
                            correctOption
                        ) {

                            correctOption.classList.add(
                                "correct"
                            );

                        }


                        if (
                            quizFeedback
                        ) {

                            quizFeedback.style.display =
                                "block";

                            quizFeedback.classList.add(
                                "show",
                                "wrong"
                            );

                            quizFeedback.textContent =
                                "Belum tepat. Kalimat yang lebih sopan adalah \"Asma kula Kamandaka.\"";

                        }

                    }


                    /*
                     * Reward hanya sekali.
                     *
                     * Jangan beri reward setiap klik.
                     */

                    if (
                        quizCorrect
                    ) {

                        progress.basa +=
                            5;

                        progress.xp +=
                            10;

                    }


                    progress.quizCompleted =
                        true;


                    saveProgress();

                    updateHUD();


                    if (
                        quizNextButton
                    ) {

                        quizNextButton.disabled =
                            false;

                    }

                }
            );

        }
    );


    /* =========================================================
       QUIZ NEXT
       ↓
       SCREEN 05
       ========================================================= */

    if (
        quizNextButton
    ) {

        quizNextButton.addEventListener(
            "click",
            () => {

                if (
                    !quizAnswered
                ) {

                    return;

                }


                showFinishScreen();

            }
        );

    }


    /* =========================================================
       FINISH SCREEN
       ========================================================= */

    function showFinishScreen() {

        if (
            finished
        ) {

            showScreen(
                screen05
            );

            return;

        }


        finished =
            true;


        /*
         * Reward akhir Gameplay 02
         *
         * +100 XP
         * +20 BASA
         */

        addXP(
            FINAL_XP_REWARD
        );

        addBasa(
            FINAL_BASA_REWARD
        );


        /* =====================================================
           CHAPTER 02 SELESAI
           ===================================================== */

        if (
            !progress.completedChapters.includes(
                CURRENT_LOCATION
            )
        ) {

            progress.completedChapters.push(
                CURRENT_LOCATION
            );

        }


        /* =====================================================
           LOKASI 02 SELESAI
           ===================================================== */

        if (
            !progress.completedLocations.includes(
                CURRENT_LOCATION
            )
        ) {

            progress.completedLocations.push(
                CURRENT_LOCATION
            );

        }


        /* =====================================================
           UNLOCK LOKASI 03
           PASIR LUHUR
           ===================================================== */

        if (
            !progress.unlockedLocations.includes(
                NEXT_LOCATION
            )
        ) {

            progress.unlockedLocations.push(
                NEXT_LOCATION
            );

        }


        /* =====================================================
           CHAPTER BERIKUTNYA
           ===================================================== */

        progress.currentChapter =
            NEXT_LOCATION;


        /* =====================================================
           RAPIIHKAN DATA
           ===================================================== */

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


        /* =====================================================
           SIMPAN SEBELUM PINDAH SCREEN
           ===================================================== */

        saveProgress();


        updateHUD();


        /*
         * Update reward text kalau element tersedia.
         */

        const rewardElements =
            document.querySelectorAll(
                ".gameplay-finish strong"
            );


        rewardElements.forEach(
            element => {

                const text =
                    element.textContent.trim();


                if (
                    text.includes(
                        "XP"
                    )
                ) {

                    element.textContent =
                        "+100 XP";

                }

                if (
                    text.includes(
                        "BASA"
                    )
                ) {

                    element.textContent =
                        "+20 BASA";

                }

            }
        );


        showScreen(
            screen05
        );


        console.log(
            "================================"
        );

        console.log(
            "GAMEPLAY 02 SELESAI"
        );

        console.log(
            "Ki Ajar Winarong selesai."
        );

        console.log(
            "Pasir Luhur terbuka."
        );

        console.log(
            "Progress:",
            progress
        );

        console.log(
            "================================"
        );

    }


    /* =========================================================
       KEMBALI KE PETA
       ========================================================= */

    if (
        finishJourneyButton
    ) {

        finishJourneyButton.addEventListener(
            "click",
            event => {

                /*
                 * Pastikan progress sudah disimpan.
                 */

                saveProgress();

                /*
                 * Jangan ubah navbar/sidebar.
                 * Hanya pindah ke peta.
                 */

                event.preventDefault();

                window.location.href =
                    "../../peta.html";

            }
        );

    }


    /* =========================================================
       INITIALIZE
       ========================================================= */

    function initializeGame() {

        progress =
            loadProgress();


        /*
         * Gameplay 02 = Level 02
         */

        updateLevelHUD();


        /*
         * HUD memakai XP global.
         */

        updateXPHUD();


        /*
         * Progress awal gameplay.
         */

        updateGameplayProgress();


        /*
         * Pastikan hanya screen01
         * yang terlihat.
         *
         * NAVBAR DAN SIDEBAR TIDAK DISENTUH.
         */

        screens.forEach(
            screen => {

                screen.classList.remove(
                    "active"
                );

            }
        );


        showScreen(
            screen01
        );


        /*
         * Tombol dialog belum bisa lanjut.
         */

        if (
            dialogNextButton
        ) {

            dialogNextButton.disabled =
                true;

        }


        /*
         * Tombol quiz belum bisa lanjut.
         */

        if (
            quizNextButton
        ) {

            quizNextButton.disabled =
                true;

        }


        /*
         * Feedback disembunyikan.
         */

        if (
            dialogFeedback
        ) {

            dialogFeedback.style.display =
                "none";

        }


        if (
            quizFeedback
        ) {

            quizFeedback.style.display =
                "none";

        }


        console.log(
            "Lelana Kamandaka — Gameplay 02 siap."
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
            "Unlocked:",
            progress.unlockedLocations
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