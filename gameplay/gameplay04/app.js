"use strict";

/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 04 — KALI LOGAWA
   FINAL CLICK FIX
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("=================================");
    console.log("GAMEPLAY 04 APP.JS AKTIF");
    console.log("=================================");

    const screens = [
        "screen01",
        "screen01b",
        "screen02",
        "screen03",
        "screen04",
        "screen04b",
        "screen04c",
        "screen06"
    ];

    const stages = [
        {
            screen: "screen02",
            answer: "mlaku",
            meaning: "berjalan"
        },
        {
            screen: "screen03",
            answer: "mlumpat",
            meaning: "melompat"
        },
        {
            screen: "screen04",
            answer: "mlayu",
            meaning: "berlari"
        },
        {
            screen: "screen04b",
            answer: "mandheg",
            meaning: "berhenti"
        },
        {
            screen: "screen04c",
            answer: "nyabrang",
            meaning: "menyeberang"
        }
    ];

    let currentStage = 0;
    let locked = false;
    let timer = null;

    /* =====================================================
       SCREEN
       ===================================================== */

    function showScreen(id) {

        screens.forEach(screenId => {

            const screen =
                document.getElementById(screenId);

            if (!screen) return;

            screen.classList.remove("active");

            screen.style.display = "none";

        });


        const target =
            document.getElementById(id);

        if (!target) {

            console.error(
                "Screen tidak ditemukan:",
                id
            );

            return;
        }


        target.classList.add("active");

        target.style.display = "block";

        target.style.visibility = "visible";

        target.style.opacity = "1";

        target.style.pointerEvents = "auto";


        currentScreen = id;


        console.log(
            "SCREEN:",
            id
        );


        /*
         * Scroll ke bagian atas screen.
         */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /*
         * Pastikan tombol pada screen aktif
         * benar-benar bisa menerima pointer.
         */

        fixButtons(target);

    }


    let currentScreen = "screen01";


    /* =====================================================
       FIX BUTTON
       ===================================================== */

    function fixButtons(parent = document) {

        parent
            .querySelectorAll(".verb-choice")
            .forEach(button => {

                button.disabled = false;

                button.removeAttribute("disabled");

                button.style.pointerEvents = "auto";

                button.style.cursor = "pointer";

                button.style.position = "relative";

                button.style.zIndex = "999999";

                button.style.touchAction = "manipulation";

            });


        parent
            .querySelectorAll(".verb-choice-area")
            .forEach(area => {

                area.style.pointerEvents = "auto";

                area.style.position = "relative";

                area.style.zIndex = "999998";

            });


        parent
            .querySelectorAll(
                ".verb-overlay, .gameplay-hero-overlay"
            )
            .forEach(overlay => {

                overlay.style.pointerEvents = "none";

            });


        parent
            .querySelectorAll(".verb-background")
            .forEach(background => {

                background.style.pointerEvents = "none";

            });

    }


    /* =====================================================
       START
       ===================================================== */

    const startButton =
        document.getElementById(
            "startJourneyButton"
        );


    if (startButton) {

        startButton.disabled = false;

        startButton.style.pointerEvents = "auto";

        startButton.style.cursor = "pointer";

        startButton.style.position = "relative";

        startButton.style.zIndex = "999999";


        startButton.addEventListener(
            "click",
            startGame
        );

    }


    function startGame(event) {

        if (event) {

            event.preventDefault();

            event.stopPropagation();

        }


        console.log(
            "MULAI MENYEBERANG"
        );


        clearTimeout(timer);


        locked = true;


        showScreen("screen01b");


        /*
         * Memory hanya 1 detik.
         */

        timer = setTimeout(() => {

            locked = false;

            currentStage = 0;

            showStage();

        }, 1000);

    }


    /* =====================================================
       SHOW STAGE
       ===================================================== */

    function showStage() {

        if (
            currentStage >=
            stages.length
        ) {

            finishGame();

            return;
        }


        const stage =
            stages[currentStage];


        locked = false;


        showScreen(
            stage.screen
        );


        console.log(
            "STAGE:",
            currentStage + 1,
            stage.answer
        );


        /*
         * Reset semua tombol.
         */

        const screen =
            document.getElementById(
                stage.screen
            );


        if (!screen) return;


        screen
            .querySelectorAll(
                ".verb-choice"
            )
            .forEach(button => {

                button.disabled = false;

                button.removeAttribute(
                    "disabled"
                );

                button.classList.remove(
                    "correct",
                    "wrong",
                    "selected"
                );

                button.style.pointerEvents =
                    "auto";

                button.style.zIndex =
                    "999999";

            });


        fixButtons(screen);

    }


    /* =====================================================
       JAWABAN
       ===================================================== */

    function processAnswer(button) {

        if (!button) return;

        if (locked) {

            console.log(
                "GAME SEDANG LOCK"
            );

            return;

        }


        const stage =
            stages[currentStage];


        if (!stage) return;


        const word =
            (
                button.dataset.word ||
                button
                    .querySelector("span")
                    ?.textContent ||
                ""
            )
            .trim()
            .toLowerCase();


        console.log(
            "KLIK:",
            word
        );


        /*
         * BENAR
         */

        if (
            word ===
            stage.answer
        ) {

            correct(
                button,
                stage
            );

        }

        /*
         * SALAH
         */

        else {

            wrong(
                button,
                stage
            );

        }

    }


    /* =====================================================
       BENAR
       ===================================================== */

    function correct(
        button,
        stage
    ) {

        locked = true;


        button.classList.add(
            "correct"
        );

        button.classList.add(
            "selected"
        );


        /*
         * Matikan tombol setelah benar.
         */

        const screen =
            document.getElementById(
                stage.screen
            );


        if (screen) {

            screen
                .querySelectorAll(
                    ".verb-choice"
                )
                .forEach(item => {

                    item.disabled = true;

                });

        }


        /*
         * Feedback.
         */

        showFeedback(
            stage.screen,
            `Benar! "${stage.answer}" berarti ${stage.meaning}.`,
            "correct"
        );


        /*
         * Animasi Kamandaka.
         */

        animateCharacter(
            stage.screen,
            stage.answer
        );


        /*
         * Simpan kosakata.
         */

        saveWord(
            stage.answer,
            stage.meaning
        );


        /*
         * Lanjut.
         */

        clearTimeout(timer);


        timer = setTimeout(() => {

            currentStage++;

            showStage();

        }, 900);

    }


    /* =====================================================
       SALAH
       ===================================================== */

    function wrong(
        button,
        stage
    ) {

        button.classList.remove(
            "wrong"
        );


        void button.offsetWidth;


        button.classList.add(
            "wrong"
        );


        showFeedback(
            stage.screen,
            "Belum tepat. Coba lagi.",
            "wrong"
        );


        setTimeout(() => {

            button.classList.remove(
                "wrong"
            );

        }, 500);

    }


    /* =====================================================
       FEEDBACK
       ===================================================== */

    function showFeedback(
        screenId,
        text,
        type
    ) {

        const screen =
            document.getElementById(
                screenId
            );


        if (!screen) return;


        const feedback =
            screen.querySelector(
                ".logawa-feedback"
            );


        if (!feedback) {

            console.log(
                text
            );

            return;

        }


        feedback.textContent =
            text;


        feedback.classList.remove(
            "show",
            "correct",
            "wrong"
        );


        void feedback.offsetWidth;


        feedback.classList.add(
            type
        );


        feedback.classList.add(
            "show"
        );

    }


    /* =====================================================
       ANIMASI KARAKTER
       ===================================================== */

    function animateCharacter(
        screenId,
        word
    ) {

        const screen =
            document.getElementById(
                screenId
            );


        if (!screen) return;


        const character =
            screen.querySelector(
                ".verb-kamandaka"
            );


        if (!character) return;


        character.classList.remove(
            "walking",
            "jumping",
            "running",
            "stopped"
        );


        void character.offsetWidth;


        if (word === "mlaku") {

            character.classList.add(
                "walking"
            );

        }

        else if (
            word === "mlumpat"
        ) {

            character.classList.add(
                "jumping"
            );

        }

        else if (
            word === "mlayu"
        ) {

            character.classList.add(
                "running"
            );

        }

        else if (
            word === "mandheg"
        ) {

            character.classList.add(
                "stopped"
            );

        }

        else if (
            word === "nyabrang"
        ) {

            character.classList.add(
                "jumping"
            );

        }

    }


    /* =====================================================
       SIMPAN KOSAKATA
       ===================================================== */

    function saveWord(
        word,
        meaning
    ) {

        let words = [];


        try {

            words =
                JSON.parse(
                    localStorage.getItem(
                        "lelana_kosakata"
                    )
                ) || [];

        }

        catch (error) {

            words = [];

        }


        const exists =
            words.some(
                item =>
                    item.word === word
            );


        if (!exists) {

            words.push({
                word: word,
                meaning: meaning
            });

        }


        localStorage.setItem(
            "lelana_kosakata",
            JSON.stringify(words)
        );

    }


    /* =====================================================
       FINISH
       ===================================================== */

    function finishGame() {

        locked = true;


        showScreen(
            "screen06"
        );


        localStorage.setItem(
            "gameplay04_completed",
            "true"
        );


        localStorage.setItem(
            "gameplay04_xp",
            "100"
        );


        localStorage.setItem(
            "gameplay04_basa",
            "15"
        );


        console.log(
            "GAMEPLAY 04 SELESAI"
        );

    }


    /* =====================================================
       FINISH BUTTON
       ===================================================== */

    const finishButton =
        document.getElementById(
            "finishJourneyButton"
        );


    if (finishButton) {

        finishButton.style.pointerEvents =
            "auto";

        finishButton.style.cursor =
            "pointer";

        finishButton.style.position =
            "relative";

        finishButton.style.zIndex =
            "999999";

    }


    /* =====================================================
       INI FIX PALING PENTING
       =====================================================

       Tidak peduli element apa yang berada di atas
       tombol, kita cek posisi mouse terhadap tombol
       secara manual.

       Jadi klik tetap terdeteksi.
       ===================================================== */

    document.addEventListener(
        "pointerdown",
        function(event) {

            const x =
                event.clientX;

            const y =
                event.clientY;


            const buttons =
                document.querySelectorAll(
                    ".verb-choice"
                );


            for (
                const button of buttons
            ) {

                const rect =
                    button.getBoundingClientRect();


                const inside =
                    x >= rect.left &&
                    x <= rect.right &&
                    y >= rect.top &&
                    y <= rect.bottom;


                if (!inside) {
                    continue;
                }


                /*
                 * Pastikan tombol memang
                 * berada di screen aktif.
                 */

                const screen =
                    button.closest(
                        ".game-screen"
                    );


                if (
                    !screen ||
                    !screen.classList.contains(
                        "active"
                    )
                ) {

                    continue;

                }


                console.log(
                    "================================="
                );

                console.log(
                    "BUTTON TERDETEKSI MANUAL"
                );

                console.log(
                    "WORD:",
                    button.dataset.word
                );

                console.log(
                    "================================="
                );


                processAnswer(
                    button
                );


                /*
                 * Hentikan supaya event
                 * tidak diteruskan.
                 */

                event.preventDefault();

                event.stopPropagation();

                return;

            }

        },
        true
    );


    /* =====================================================
       CLICK FALLBACK
       ===================================================== */

    document.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest?.(
                    ".verb-choice"
                );


            if (!button) {
                return;
            }


            processAnswer(
                button
            );

        },
        true
    );


    /* =====================================================
       FIX TERUS-MENERUS
       ===================================================== */

    setInterval(() => {

        fixButtons();

    }, 300);


    /* =====================================================
       INIT
       ===================================================== */

    /*
     * Jangan otomatis lanjut ke stage.
     * Kalau screen02 sudah active dari HTML,
     * langsung bisa dimainkan.
     */

    const activeScreen =
        document.querySelector(
            ".game-screen.active"
        );


    if (activeScreen) {

        currentScreen =
            activeScreen.id;


        const stageIndex =
            stages.findIndex(
                stage =>
                    stage.screen ===
                    currentScreen
            );


        if (stageIndex >= 0) {

            currentStage =
                stageIndex;

            locked = false;

        }


        fixButtons(
            activeScreen
        );

    }


    /*
     * Kalau belum ada active screen,
     * tampilkan opening.
     */

    else {

        showScreen(
            "screen01"
        );

    }


    console.log(
        "FINAL CLICK FIX AKTIF"
    );

});