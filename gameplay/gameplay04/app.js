/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 04 — KALI LOGAWA
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
       SCREEN
       ===================================================== */

    const screens = [
        ...document.querySelectorAll(".story-screen")
    ];


    function showScreen(id) {

        screens.forEach(
            screen => {

                screen.classList.toggle(
                    "active",
                    screen.id === id
                );

            }
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       SAFE CLICK
       ===================================================== */

    function safeClick(
        id,
        handler
    ) {

        const element =
            document.getElementById(
                id
            );


        if (!element) {

            return;

        }


        element.addEventListener(
            "click",
            handler
        );

    }


    /* =====================================================
       STORAGE — AMBIL PROGRESS
       ===================================================== */

    function getProgress() {

        let progress = {};


        try {

            const saved =
                sessionStorage.getItem(
                    MAP_PROGRESS_KEY
                );


            if (saved) {

                progress =
                    JSON.parse(
                        saved
                    );

            }

        }

        catch (error) {

            console.warn(
                "Progress lama tidak dapat dibaca.",
                error
            );

        }


        /* =================================================
           DEFAULT
           ================================================= */

        if (
            typeof progress.currentChapter !==
            "number"
        ) {

            progress.currentChapter =
                1;

        }


        if (
            typeof progress.totalChapters !==
            "number"
        ) {

            progress.totalChapters =
                10;

        }


        if (
            typeof progress.xp !==
            "number"
        ) {

            progress.xp =
                0;

        }


        if (
            typeof progress.basa !==
            "number"
        ) {

            progress.basa =
                0;

        }


        if (
            typeof progress.quizCompleted !==
            "boolean"
        ) {

            progress.quizCompleted =
                false;

        }


        if (
            typeof progress.sayembaraCompleted !==
            "boolean"
        ) {

            progress.sayembaraCompleted =
                false;

        }


        if (
            !Array.isArray(
                progress.completedChapters
            )
        ) {

            progress.completedChapters =
                [];

        }


        if (
            !Array.isArray(
                progress.completedLocations
            )
        ) {

            progress.completedLocations =
                [];

        }


        if (
            !Array.isArray(
                progress.unlockedLocations
            )
        ) {

            progress.unlockedLocations =
                [1];

        }


        /* =================================================
           PAJAJARAN SELALU TERBUKA
           ================================================= */

        if (
            !progress.unlockedLocations.includes(
                1
            )
        ) {

            progress.unlockedLocations.unshift(
                1
            );

        }


        return progress;

    }


    /* =====================================================
       SIMPAN PROGRESS
       ===================================================== */

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


            updateHud();

        }

        catch (error) {

            console.warn(
                "Progress tidak dapat disimpan.",
                error
            );

        }

    }


    /* =====================================================
       HUD
       ===================================================== */

    const hudXp =
        document.getElementById(
            "hudXp"
        );


    const hudBasa =
        document.getElementById(
            "hudBasa"
        );


    function updateHud() {

        const progress =
            getProgress();


        if (hudXp) {

            hudXp.textContent =
                progress.xp;

        }


        if (hudBasa) {

            hudBasa.textContent =
                progress.basa;

        }

    }


    /* =====================================================
       REWARD
       ===================================================== */

    function addXp(
        amount
    ) {

        const progress =
            getProgress();


        progress.xp +=
            amount;


        saveProgress(
            progress
        );

    }


    function addBasa(
        amount
    ) {

        const progress =
            getProgress();


        progress.basa +=
            amount;


        saveProgress(
            progress
        );

    }


    function updateReward(
        xpAmount,
        basaAmount
    ) {

        const progress =
            getProgress();


        progress.xp +=
            xpAmount;


        progress.basa +=
            basaAmount;


        saveProgress(
            progress
        );

    }


    /* =====================================================
       SCREEN 01 → SCREEN 02
       ===================================================== */

    safeClick(
        "btnBeginStory",
        () => {

            showScreen(
                "story-dialog"
            );

        }
    );


    /* =====================================================
       SCREEN 02 → SCREEN 03
       ===================================================== */

    safeClick(
        "btnNextStory",
        () => {

            showScreen(
                "story-gameplay"
            );

        }
    );


    /* =====================================================
       SCREEN 03 → SCREEN 04
       ===================================================== */

    safeClick(
        "btnStartGameplay",
        () => {

            showScreen(
                "story-learning-basa"
            );

        }
    );


    /* =====================================================
       SCREEN 04 → SCREEN 05
       ===================================================== */

    safeClick(
        "btnStartQuizBasa",
        () => {

            resetQuiz();


            showScreen(
                "story-quiz-basa"
            );

        }
    );


    /* =====================================================
       QUIZ DATA
       ===================================================== */

    const quizQuestions = [

        {

            question:
                'Apa arti kata "Kali"?',

            answers: [
                "Sungai",
                "Rumah",
                "Jalan",
                "Gunung"
            ],

            correct:
                "Sungai"

        },


        {

            question:
                'Apa arti kata "Ngangkap"?',

            answers: [
                "Menangkap",
                "Berjalan",
                "Menyelam",
                "Bertemu"
            ],

            correct:
                "Menangkap"

        },


        {

            question:
                'Apa arti kata "Iwak"?',

            answers: [
                "Burung",
                "Ikan",
                "Pohon",
                "Batu"
            ],

            correct:
                "Ikan"

        },


        {

            question:
                'Apa arti kata "Nggatekna"?',

            answers: [
                "Meninggalkan",
                "Memanggil",
                "Memperhatikan",
                "Menangkap"
            ],

            correct:
                "Memperhatikan"

        }

    ];


    let quizIndex =
        0;


    let quizAnswered =
        false;


    const quizQuestion =
        document.getElementById(
            "quizQuestion"
        );


    const quizNumber =
        document.getElementById(
            "quizQuestionNumber"
        );


    const quizFill =
        document.getElementById(
            "quizProgressFill"
        );


    const quizFeedback =
        document.getElementById(
            "quizFeedback"
        );


    const btnNextQuiz =
        document.getElementById(
            "btnNextQuiz"
        );


    const quizOptions = [
        ...document.querySelectorAll(
            ".quiz-option"
        )
    ];


    /* =====================================================
       RENDER QUIZ
       ===================================================== */

    function renderQuiz() {

        const question =
            quizQuestions[
                quizIndex
            ];


        if (!question) {

            return;

        }


        quizAnswered =
            false;


        if (quizQuestion) {

            quizQuestion.textContent =
                question.question;

        }


        if (quizNumber) {

            quizNumber.textContent =
                `PERTANYAAN ${
                    String(
                        quizIndex + 1
                    ).padStart(
                        2,
                        "0"
                    )
                } / ${
                    quizQuestions.length
                }`;

        }


        if (quizFill) {

            const progress =
                (
                    (
                        quizIndex + 1
                    ) /
                    quizQuestions.length
                ) * 100;


            quizFill.style.width =
                `${progress}%`;

        }


        if (quizFeedback) {

            quizFeedback.textContent =
                "";


            quizFeedback.style.color =
                "";

        }


        if (btnNextQuiz) {

            btnNextQuiz.disabled =
                true;


            btnNextQuiz.textContent =
                quizIndex ===
                quizQuestions.length - 1

                    ? "SELESAI →"

                    : "SOAL BERIKUTNYA →";

        }


        quizOptions.forEach(
            (
                button,
                index
            ) => {

                button.classList.remove(
                    "selected",
                    "correct",
                    "wrong"
                );


                button.disabled =
                    false;


                const text =
                    button.querySelector(
                        "span:last-child"
                    );


                if (text) {

                    text.textContent =
                        question.answers[
                            index
                        ];

                }


                button.dataset.answer =
                    question.answers[
                        index
                    ];

            }
        );

    }


    /* =====================================================
       KLIK JAWABAN QUIZ
       ===================================================== */

    quizOptions.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        quizAnswered
                    ) {

                        return;

                    }


                    quizAnswered =
                        true;


                    const chosen =
                        button.dataset.answer;


                    const correct =
                        quizQuestions[
                            quizIndex
                        ].correct;


                    quizOptions.forEach(
                        option => {

                            option.disabled =
                                true;

                        }
                    );


                    /* =========================
                       BENAR
                       ========================= */

                    if (
                        chosen ===
                        correct
                    ) {

                        button.classList.add(
                            "correct"
                        );


                        if (
                            quizFeedback
                        ) {

                            quizFeedback.textContent =
                                "Benar! Jawabanmu tepat.";


                            quizFeedback.style.color =
                                "#3f713c";

                        }


                        addXp(
                            10
                        );

                    }


                    /* =========================
                       SALAH
                       ========================= */

                    else {

                        button.classList.add(
                            "wrong"
                        );


                        const correctButton =
                            quizOptions.find(
                                option =>
                                    option.dataset.answer ===
                                    correct
                            );


                        if (
                            correctButton
                        ) {

                            correctButton.classList.add(
                                "correct"
                            );

                        }


                        if (
                            quizFeedback
                        ) {

                            quizFeedback.textContent =
                                `Belum tepat. Jawaban yang benar: ${correct}.`;


                            quizFeedback.style.color =
                                "#9b4d3f";

                        }

                    }


                    if (
                        btnNextQuiz
                    ) {

                        btnNextQuiz.disabled =
                            false;

                    }

                }
            );

        }
    );


    /* =====================================================
       RESET QUIZ
       ===================================================== */

    function resetQuiz() {

        quizIndex =
            0;


        quizAnswered =
            false;


        renderQuiz();

    }


    /* =====================================================
       SCREEN 05 → SCREEN 06
       ===================================================== */

    safeClick(
        "btnNextQuiz",
        () => {

            if (
                !quizAnswered
            ) {

                return;

            }


            if (
                quizIndex <
                quizQuestions.length - 1
            ) {

                quizIndex++;


                renderQuiz();

            }

            else {

                showScreen(
                    "story-pasir-story"
                );

            }

        }
    );


    /* =====================================================
       SCREEN 06 → SCREEN 07
       ===================================================== */

    safeClick(
        "btnStartSayembara",
        () => {

            resetSayembara();


            showScreen(
                "story-sayembara"
            );

        }
    );


    /* =====================================================
       GAMEPLAY 04 — SAYEMBARA KALI LOGAWA
       ===================================================== */

    const sayembaraDropzone =
        document.getElementById(
            "sayembaraDropzone"
        );


    const sayembaraOptions = [
        ...document.querySelectorAll(
            "#story-sayembara .sayembara-option"
        )
    ];


    const sayembaraFeedback =
        document.getElementById(
            "sayembaraFeedback"
        );


    const btnNextSayembara =
        document.getElementById(
            "btnNextSayembara"
        );


    /* =====================================================
       EMPAT JAWABAN BENAR GAMEPLAY 04
       ===================================================== */

    const correctSayembaraAnswers = [
        "tiba",
        "upacara",
        "amati",
        "ciptoroso"
    ];


    const acceptedSayembaraAnswers = [
        "tiba",
        "upacara",
        "amati",
        "ciptoroso"
    ];


    let selectedSayembaraAnswers =
        [];


    let sayembaraCompleted =
        false;


    /* =====================================================
       ACAK POSISI PILIHAN
       ===================================================== */

    function shuffleSayembaraOptions() {

        const optionsContainer =
            document.querySelector(
                ".sayembara-options"
            );


        if (!optionsContainer) {

            return;

        }


        const options = [
            ...optionsContainer.querySelectorAll(
                ".sayembara-option"
            )
        ];


        for (
            let index =
                options.length - 1;

            index > 0;

            index--
        ) {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    (index + 1)
                );


            optionsContainer.insertBefore(
                options[randomIndex],
                options[index]
            );


            const temp =
                options[index];


            options[index] =
                options[randomIndex];


            options[randomIndex] =
                temp;

        }

    }


    /* =====================================================
       SLOT 1–4
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


    function ensureSayembaraSlots() {

        if (
            !sayembaraDropzone
        ) {

            return;

        }


        const existingSlots =
            getSayembaraSlots();


        if (
            existingSlots.length >=
            4
        ) {

            return;

        }


        sayembaraDropzone.innerHTML =
            "";


        for (
            let index =
                0;

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


            slot.innerHTML = `
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
       DATA ANSWER
       ===================================================== */

    function getAnswerValue(
        option
    ) {

        if (!option) {

            return "";

        }


        return (
            option.dataset.answer ||
            ""
        )
            .trim()
            .toLowerCase();

    }


    /* =====================================================
       CEK JAWABAN
       ===================================================== */

    function isCorrectSayembaraAnswer(
        answer
    ) {

        return acceptedSayembaraAnswers.includes(
            answer
        );

    }


    /* =====================================================
       FEEDBACK
       ===================================================== */

    function setSayembaraFeedback(
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


        sayembaraFeedback.className =
            "sayembara-feedback";


        if (type) {

            sayembaraFeedback.classList.add(
                type
            );

        }

    }


    /* =====================================================
       UPDATE TOMBOL LANJUT
       ===================================================== */

    function updateSayembaraNextButton() {

        if (
            !btnNextSayembara
        ) {

            return;

        }


        btnNextSayembara.disabled =
            selectedSayembaraAnswers.length !==
            4;

    }


    /* =====================================================
       MASUKKAN JAWABAN KE SLOT
       ===================================================== */

    function putAnswerIntoSlot(
        option
    ) {

        if (
            !sayembaraDropzone
        ) {

            return false;

        }


        const answer =
            getAnswerValue(
                option
            );


        if (!answer) {

            return false;

        }


        /* =================================================
           JANGAN BOLEH DUPLIKAT
           ================================================= */

        if (
            selectedSayembaraAnswers.includes(
                answer
            )
        ) {

            setSayembaraFeedback(
                "Pilihan ini sudah dimasukkan.",
                "wrong"
            );


            return false;

        }


        /* =================================================
           HANYA JAWABAN BENAR
           ================================================= */

        if (
            !isCorrectSayembaraAnswer(
                answer
            )
        ) {

            setSayembaraFeedback(
                "Belum tepat. Pilihan tersebut merupakan pengecoh. Coba pilih langkah yang benar.",
                "wrong"
            );


            return false;

        }


        /* =================================================
           MAKSIMAL 4
           ================================================= */

        if (
            selectedSayembaraAnswers.length >=
            4
        ) {

            return false;

        }


        const slots =
            getSayembaraSlots();


        const slotIndex =
            selectedSayembaraAnswers.length;


        const slot =
            slots[
                slotIndex
            ];


        if (!slot) {

            return false;

        }


        /* =================================================
           SIMPAN JAWABAN
           ================================================= */

        selectedSayembaraAnswers.push(
            answer
        );


        /* =================================================
           BUAT COPY KARTU
           KARTU ASLI TIDAK DIPINDAHKAN
           ================================================= */

        const copy =
            option.cloneNode(
                true
            );


        copy.classList.add(
            "sayembara-slot-card"
        );


        copy.removeAttribute(
            "draggable"
        );


        copy.setAttribute(
            "aria-hidden",
            "true"
        );


        copy.removeAttribute(
            "id"
        );


        const slotContent =
            slot.querySelector(
                ".sayembara-slot-content"
            );


        if (
            slotContent
        ) {

            slotContent.innerHTML =
                "";


            slotContent.appendChild(
                copy
            );

        }

        else {

            slot.appendChild(
                copy
            );

        }


        /* =================================================
           KUNCI KARTU ASLI
           ================================================= */

        option.classList.add(
            "selected"
        );


        option.dataset.selected =
            "true";


        option.setAttribute(
            "aria-disabled",
            "true"
        );


        option.draggable =
            false;


        option.style.pointerEvents =
            "none";


        /* =================================================
           FEEDBACK
           ================================================= */

        if (
            selectedSayembaraAnswers.length <
            4
        ) {

            setSayembaraFeedback(
                "Benar! Langkah ini sudah dimasukkan ke perjalanan.",
                "correct"
            );

        }

        else {

            setSayembaraFeedback(
                "Benar! Semua 4 langkah yang tepat sudah dipilih.",
                "correct"
            );

        }


        updateSayembaraNextButton();


        return true;

    }


    /* =====================================================
       CLICK FALLBACK
       ===================================================== */

    sayembaraOptions.forEach(
        option => {

            option.addEventListener(
                "click",
                () => {

                    if (
                        option.dataset.selected ===
                        "true"
                    ) {

                        return;

                    }


                    putAnswerIntoSlot(
                        option
                    );

                }
            );

        }
    );


    /* =====================================================
       DRAG START
       ===================================================== */

    sayembaraOptions.forEach(
        option => {

            option.setAttribute(
                "draggable",
                "true"
            );


            option.addEventListener(
                "dragstart",
                event => {

                    if (
                        option.dataset.selected ===
                        "true"
                    ) {

                        event.preventDefault();

                        return;

                    }


                    const answer =
                        getAnswerValue(
                            option
                        );


                    event.dataTransfer.effectAllowed =
                        "copy";


                    event.dataTransfer.setData(
                        "text/plain",
                        answer
                    );


                    event.dataTransfer.setData(
                        "application/x-sayembara-answer",
                        answer
                    );


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

                }
            );

        }
    );


    /* =====================================================
       DRAG OVER DROPZONE
       ===================================================== */

    if (
        sayembaraDropzone
    ) {

        sayembaraDropzone.addEventListener(
            "dragover",
            event => {

                event.preventDefault();


                event.dataTransfer.dropEffect =
                    "copy";


                sayembaraDropzone.classList.add(
                    "drag-over"
                );

            }
        );


        /* =================================================
           DRAG LEAVE
           ================================================= */

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


        /* =================================================
           DROP
           ================================================= */

        sayembaraDropzone.addEventListener(
            "drop",
            event => {

                event.preventDefault();


                sayembaraDropzone.classList.remove(
                    "drag-over"
                );


                const answer =
                    (
                        event.dataTransfer.getData(
                            "application/x-sayembara-answer"
                        ) ||
                        event.dataTransfer.getData(
                            "text/plain"
                        ) ||
                        ""
                    )
                    .trim()
                    .toLowerCase();


                if (!answer) {

                    return;

                }


                /* =========================================
                   CARI KARTU ASLI
                   ========================================= */

                const option =
                    sayembaraOptions.find(
                        item =>
                            getAnswerValue(
                                item
                            ) ===
                            answer
                    );


                if (!option) {

                    return;

                }


                /* =========================================
                   DROP TIDAK MEMINDAHKAN KARTU ASLI
                   ========================================= */

                putAnswerIntoSlot(
                    option
                );

            }
        );

    }


    /* =====================================================
       RESET SAYEMBARA
       ===================================================== */

    function resetSayembara() {

        selectedSayembaraAnswers =
            [];


        sayembaraCompleted =
            false;


        /* =================================================
           BUAT SLOT
           ================================================= */

        ensureSayembaraSlots();


        const slots =
            getSayembaraSlots();


        slots.forEach(
            slot => {

                const content =
                    slot.querySelector(
                        ".sayembara-slot-content"
                    );


                if (
                    content
                ) {

                    content.innerHTML =
                        "";

                }

            }
        );


        /* =================================================
           RESET KARTU
           ================================================= */

        sayembaraOptions.forEach(
            option => {

                option.classList.remove(
                    "selected",
                    "dragging"
                );


                delete option.dataset.selected;


                option.setAttribute(
                    "draggable",
                    "true"
                );


                option.removeAttribute(
                    "aria-disabled"
                );


                option.style.pointerEvents =
                    "";

            }
        );


        /* =================================================
           ACAK ULANG
           ================================================= */

        shuffleSayembaraOptions();


        if (
            sayembaraDropzone
        ) {

            sayembaraDropzone.classList.remove(
                "drag-over"
            );

        }


        setSayembaraFeedback(
            "",
            ""
        );


        updateSayembaraNextButton();

    }


    /* =====================================================
       SCREEN 07 → SCREEN 08
       ===================================================== */

    safeClick(
        "btnNextSayembara",
        () => {

            /* =============================================
               HARUS 4 JAWABAN
               ============================================= */

            if (
                selectedSayembaraAnswers.length !==
                4
            ) {

                setSayembaraFeedback(
                    "Pilih 4 langkah yang benar terlebih dahulu.",
                    "wrong"
                );


                return;

            }


            /* =============================================
               JANGAN REWARD DUA KALI
               ============================================= */

            if (
                sayembaraCompleted
            ) {

                return;

            }


            sayembaraCompleted =
                true;


            /* =============================================
               REWARD GAMEPLAY 04
               ============================================= */

            updateReward(
                50,
                10
            );


            /* =============================================
               SIMPAN STATUS SAYEMBARA
               ============================================= */

            const progress =
                getProgress();


            progress.sayembaraCompleted =
                true;


            saveProgress(
                progress
            );


            /* =============================================
               SELESAIKAN GAMEPLAY 04
               ============================================= */

            completeGameplay04();


            /* =============================================
               UPDATE REWARD DISPLAY
               ============================================= */

            const sayembaraXpReward =
                document.getElementById(
                    "sayembaraXpReward"
                );


            const sayembaraBasaReward =
                document.getElementById(
                    "sayembaraBasaReward"
                );


            if (
                sayembaraXpReward
            ) {

                sayembaraXpReward.textContent =
                    "+50 XP";

            }


            if (
                sayembaraBasaReward
            ) {

                sayembaraBasaReward.textContent =
                    "+10 BASA";

            }


            /* =============================================
               TAMPILKAN SCREEN SELESAI
               ============================================= */

            if (
                document.getElementById(
                    "story-chapter-08"
                )
            ) {

                showScreen(
                    "story-chapter-08"
                );

            }

        }
    );


    /* =====================================================
       COMPLETE GAMEPLAY 04
       ===================================================== */

    function completeGameplay04() {

        const progress =
            getProgress();


        /* =============================================
           CHAPTER 04 SELESAI
           ============================================= */

        if (
            !progress.completedChapters.includes(
                4
            )
        ) {

            progress.completedChapters.push(
                4
            );

        }


        /* =============================================
           LOKASI 04 SELESAI
           ============================================= */

        if (
            !progress.completedLocations.includes(
                4
            )
        ) {

            progress.completedLocations.push(
                4
            );

        }


        /* =============================================
           UNLOCK LOKASI 05
           ============================================= */

        if (
            !progress.unlockedLocations.includes(
                5
            )
        ) {

            progress.unlockedLocations.push(
                5
            );

        }


        /* =============================================
           CHAPTER BERIKUTNYA
           ============================================= */

        progress.currentChapter =
            5;


        /* =============================================
           HILANGKAN DUPLIKAT
           ============================================= */

        progress.completedChapters =
            [
                ...new Set(
                    progress.completedChapters
                )
            ];


        progress.completedLocations =
            [
                ...new Set(
                    progress.completedLocations
                )
            ];


        progress.unlockedLocations =
            [
                ...new Set(
                    progress.unlockedLocations
                )
            ];


        /* =============================================
           URUTKAN
           ============================================= */

        progress.completedChapters.sort(
            (a, b) => a - b
        );


        progress.completedLocations.sort(
            (a, b) => a - b
        );


        progress.unlockedLocations.sort(
            (a, b) => a - b
        );


        /* =============================================
           SIMPAN
           ============================================= */

        saveProgress(
            progress
        );


        console.log(
            "Gameplay 04 — Kali Logawa selesai."
        );


        console.log(
            "Progress:",
            progress
        );


        console.log(
            "Lokasi 05 terbuka."
        );

    }


    /* =====================================================
       SCREEN 08 → PETA
       ===================================================== */

    safeClick(
        "btnContinueChapter",
        () => {

            /*
             * Pastikan Gameplay 04
             * benar-benar selesai.
             */

            completeGameplay04();


            window.location.href =
                "../../peta.html";

        }
    );


    /* =====================================================
       AUDIO DIALOG
       ===================================================== */

    const dialogueText =
        "Sawise nerusake lampah, Kamandaka tekan " +
        "ing Kali Logawa. Ing kana ana upacara " +
        "kanggo nangkep iwak sing ndadekake " +
        "papan kasebut dadi rame. Kamandaka " +
        "nggatekake kedadeyan ing papan kasebut " +
        "lan banjur ketemu karo Dewi Ciptoroso.";


    safeClick(
        "btnListen",
        () => {

            if (
                !(
                    "speechSynthesis"
                    in window
                )
            ) {

                alert(
                    "Browser ini belum mendukung fitur suara."
                );


                return;

            }


            window.speechSynthesis.cancel();


            const utterance =
                new SpeechSynthesisUtterance(
                    dialogueText
                );


            utterance.lang =
                "id-ID";


            utterance.rate =
                0.86;


            utterance.pitch =
                1;


            window.speechSynthesis.speak(
                utterance
            );

        }
    );


    /* =====================================================
       AUDIO BASA
       ===================================================== */

    window.speakBasa =
        function(
            text
        ) {

            if (
                !(
                    "speechSynthesis"
                    in window
                )
            ) {

                alert(
                    "Browser ini belum mendukung fitur suara."
                );


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
                0.78;


            utterance.pitch =
                1;


            window.speechSynthesis.speak(
                utterance
            );

        };


    /* =====================================================
       INITIALIZE
       ===================================================== */

    updateHud();


    ensureSayembaraSlots();


    updateSayembaraNextButton();


    resetQuiz();


    /* =====================================================
       PASTIKAN SCREEN PERTAMA
       ===================================================== */

    screens.forEach(
        screen => {

            screen.classList.remove(
                "active"
            );

        }
    );


    const opening =
        document.getElementById(
            "story-opening"
        );


    if (
        opening
    ) {

        opening.classList.add(
            "active"
        );

    }


    /* =====================================================
       INITIAL REWARD DISPLAY
       ===================================================== */

    const initialSayembaraXpReward =
        document.getElementById(
            "sayembaraXpReward"
        );


    const initialSayembaraBasaReward =
        document.getElementById(
            "sayembaraBasaReward"
        );


    const initialChapterXpReward =
        document.getElementById(
            "chapterXpReward"
        );


    const initialChapterBasaReward =
        document.getElementById(
            "chapterBasaReward"
        );


    if (
        initialSayembaraXpReward
    ) {

        initialSayembaraXpReward.textContent =
            "+50 XP";

    }


    if (
        initialSayembaraBasaReward
    ) {

        initialSayembaraBasaReward.textContent =
            "+10 BASA";

    }


    if (
        initialChapterXpReward
    ) {

        initialChapterXpReward.textContent =
            "+50 XP";

    }


    if (
        initialChapterBasaReward
    ) {

        initialChapterBasaReward.textContent =
            "+10 BASA";

    }


    console.log(
        "Lelana Kamandaka — Gameplay 04 siap."
    );


})();