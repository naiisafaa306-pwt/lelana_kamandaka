/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 02 — KI AJAR WINARONG
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

        screens.forEach(screen => {

            screen.classList.toggle(
                "active",
                screen.id === id
            );

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       SAFE CLICK
       ===================================================== */

    function safeClick(id, handler) {

        const element =
            document.getElementById(id);


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
                    JSON.parse(saved);

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


        /* =================================================
           LOKASI 02 TETAP TERBUKA
           JIKA CHAPTER 01 SUDAH SELESAI
           ================================================= */

        if (
            progress.completedChapters.includes(
                1
            ) &&
            !progress.unlockedLocations.includes(
                2
            )
        ) {

            progress.unlockedLocations.push(
                2
            );

        }


        return progress;

    }


    /* =====================================================
       SIMPAN PROGRESS
       ===================================================== */

    function saveProgress(progress) {

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

    function addXp(amount) {

        const progress =
            getProgress();


        progress.xp +=
            amount;


        saveProgress(
            progress
        );

    }


    function addBasa(amount) {

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
       SCREEN 01
       OPENING → DIALOG
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
       SCREEN 02
       DIALOG → TRANSITION
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
       AUDIO DIALOG
       ===================================================== */

    const dialogueText =
        "Yen kowe kepengin nemokake jodhomu, le, " +
        "kudu gelem ninggalake uripmu minangka putra raja. " +
        "Nyuwun pitutur, Ki Ajar. Kula siap nglakoni " +
        "apa wae sing kedah kula lakoni.";


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
                0.88;


            utterance.pitch =
                1;


            window.speechSynthesis.speak(
                utterance
            );

        }
    );


    /* =====================================================
       SCREEN 03
       TRANSITION → SINAU BASA
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
       SINAU BASA
       ===================================================== */

    window.speakBasa =
        function(word) {

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
                    word
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
       SCREEN 04
       SINAU BASA → QUIZ
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
       QUIZ BASA
       ===================================================== */

    const quizQuestion =
        document.getElementById(
            "quizQuestion"
        );


    const quizQuestionNumber =
        document.getElementById(
            "quizQuestionNumber"
        );


    const quizProgressFill =
        document.getElementById(
            "quizProgressFill"
        );


    const quizFeedback =
        document.getElementById(
            "quizFeedback"
        );


    const quizOptions = [
        ...document.querySelectorAll(
            ".quiz-option"
        )
    ];


    const btnNextQuiz =
        document.getElementById(
            "btnNextQuiz"
        );


    const quizQuestions = [

        {
            question:
                'Apa arti kata "Pitutur"?',

            options: [
                "Nasihat / petuah",
                "Perjalanan",
                "Menyamar",
                "Saya"
            ],

            answer: 0
        },


        {
            question:
                'Apa arti kata "Lampah"?',

            options: [
                "Nama orang",
                "Perjalanan / langkah",
                "Nasihat",
                "Kerajaan"
            ],

            answer: 1
        },


        {
            question:
                'Apa arti kata "Nyamar"?',

            options: [
                "Menyamar",
                "Berangkat",
                "Berbicara",
                "Menolong"
            ],

            answer: 0
        },


        {
            question:
                'Apa arti kata "Kula"?',

            options: [
                "Ayah",
                "Guru",
                "Saya",
                "Teman"
            ],

            answer: 2
        }

    ];


    let currentQuizQuestion =
        0;


    let quizAnswered =
        false;


    let quizScore =
        0;


    /* =====================================================
       UPDATE QUIZ
       ===================================================== */

    function updateQuiz() {

        const currentQuestion =
            quizQuestions[
                currentQuizQuestion
            ];


        if (!currentQuestion) {
            return;
        }


        quizAnswered =
            false;


        if (quizQuestion) {

            quizQuestion.textContent =
                currentQuestion.question;

        }


        if (quizQuestionNumber) {

            quizQuestionNumber.textContent =
                `PERTANYAAN ${
                    String(
                        currentQuizQuestion + 1
                    ).padStart(
                        2,
                        "0"
                    )
                } / ${
                    quizQuestions.length
                }`;

        }


        if (quizProgressFill) {

            const progress =
                (
                    (
                        currentQuizQuestion
                        + 1
                    )
                    /
                    quizQuestions.length
                )
                *
                100;


            quizProgressFill.style.width =
                `${progress}%`;

        }


        quizOptions.forEach(
            (
                option,
                index
            ) => {

                option.classList.remove(
                    "correct",
                    "wrong",
                    "selected"
                );


                option.disabled =
                    false;


                const text =
                    option.querySelector(
                        "span:not(.quiz-option-letter)"
                    );


                if (text) {

                    text.textContent =
                        currentQuestion.options[
                            index
                        ];

                }


                option.dataset.answer =
                    currentQuestion.options[
                        index
                    ];

            }
        );


        if (quizFeedback) {

            quizFeedback.textContent =
                "";


            quizFeedback.className =
                "";

        }


        if (btnNextQuiz) {

            btnNextQuiz.disabled =
                true;


            btnNextQuiz.textContent =
                currentQuizQuestion ===
                quizQuestions.length - 1

                    ? "SELESAI →"

                    : "SOAL BERIKUTNYA →";

        }

    }


    /* =====================================================
       JAWAB QUIZ
       ===================================================== */

    quizOptions.forEach(
        (
            option,
            index
        ) => {

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


                    const currentQuestion =
                        quizQuestions[
                            currentQuizQuestion
                        ];


                    quizOptions.forEach(
                        item => {

                            item.disabled =
                                true;

                        }
                    );


                    if (
                        index ===
                        currentQuestion.answer
                    ) {

                        option.classList.add(
                            "correct"
                        );


                        if (quizFeedback) {

                            quizFeedback.textContent =
                                "Benar! Jawaban kamu tepat.";


                            quizFeedback.className =
                                "correct";

                        }


                        addXp(
                            10
                        );


                        quizScore++;

                    }

                    else {

                        option.classList.add(
                            "wrong"
                        );


                        quizOptions[
                            currentQuestion.answer
                        ].classList.add(
                            "correct"
                        );


                        if (quizFeedback) {

                            quizFeedback.textContent =
                                "Belum tepat. Jawaban yang benar sudah ditandai.";


                            quizFeedback.className =
                                "wrong";

                        }

                    }


                    if (btnNextQuiz) {

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

        currentQuizQuestion =
            0;


        quizScore =
            0;


        quizAnswered =
            false;


        updateQuiz();

    }


    /* =====================================================
       SOAL BERIKUTNYA
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
                currentQuizQuestion <
                quizQuestions.length - 1
            ) {

                currentQuizQuestion++;


                updateQuiz();

                return;

            }


            /* =============================================
               QUIZ SELESAI
               ============================================= */

            const progress =
                getProgress();


            progress.quizCompleted =
                true;


            saveProgress(
                progress
            );


            showScreen(
                "story-sayembara-story"
            );

        }
    );


    /* =====================================================
       GAMEPLAY 02
       SAYEMBARA — PETUAH KI AJAR WINARONG
       ===================================================== */

    const sayembaraDropzone =
        document.getElementById(
            "sayembaraDropzone"
        );


    const sayembaraOptions = [
        ...document.querySelectorAll(
            ".sayembara-option"
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
       EMPAT JAWABAN BENAR
       ===================================================== */

    const correctSayembaraAnswers = [
        "rakyat",
        "keraton",
        "sayembara",
        "nama",
        "pasirluhur"
    ];


    const acceptedSayembaraAnswers = [
        "rakyat",
        "keraton",
        "sayembara",
        "nama",
        "pasirluhur"
    ];


    let selectedSayembaraAnswers =
        [];


    let sayembaraCompleted =
        false;


    /* =====================================================
       ACAK POSISI PILIHAN SAYEMBARA
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
            let index = options.length - 1;
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
       BUAT SLOT 1–4 DI DALAM DROPZONE
       ===================================================== */

    function getSayembaraSlots() {

        if (!sayembaraDropzone) {
            return [];
        }


        return [
            ...sayembaraDropzone.querySelectorAll(
                ".sayembara-slot"
            )
        ];

    }


    function ensureSayembaraSlots() {

        if (!sayembaraDropzone) {
            return;
        }


        const existingSlots =
            getSayembaraSlots();


        if (
            existingSlots.length >= 4
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
       AMBIL DATA-ANSWER
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

        return acceptedSayembaraAnswers
            .includes(
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

        if (!sayembaraFeedback) {
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

        if (!btnNextSayembara) {
            return;
        }


        btnNextSayembara.disabled =
            selectedSayembaraAnswers.length !==
            4;

    }


    /* =====================================================
       ISI SLOT
       ===================================================== */

    function putAnswerIntoSlot(
        option
    ) {

        if (!sayembaraDropzone) {
            return false;
        }


        const answer =
            getAnswerValue(
                option
            );


        if (!answer) {
            return false;
        }


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
            slots[slotIndex];


        if (!slot) {
            return false;
        }


        selectedSayembaraAnswers.push(
            answer
        );


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


        copy.type =
            "button";


        const slotContent =
            slot.querySelector(
                ".sayembara-slot-content"
            );


        if (slotContent) {

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

    if (sayembaraDropzone) {

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


                const option =
                    sayembaraOptions.find(
                        item =>
                            getAnswerValue(
                                item
                            ) === answer
                    );


                if (!option) {
                    return;
                }


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


        ensureSayembaraSlots();


        const slots =
            getSayembaraSlots();


        slots.forEach(
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
       SCREEN 06
       CERITA → SAYEMBARA
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
       SAYEMBARA → SELESAI
       ===================================================== */

    safeClick(
        "btnNextSayembara",
        () => {

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


            if (
                sayembaraCompleted
            ) {

                return;

            }


            sayembaraCompleted =
                true;


            /* =============================================
               REWARD GAMEPLAY 02
               ============================================= */

            updateReward(
                25,
                5
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
               COMPLETE GAMEPLAY 02
               LANGSUNG UNLOCK LOKASI 03
               ============================================= */

            completeGameplay02();


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
                    "+25 XP";

            }


            if (
                sayembaraBasaReward
            ) {

                sayembaraBasaReward.textContent =
                    "+5 BASA";

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
       COMPLETE GAMEPLAY 02
       ===================================================== */

    function completeGameplay02() {

        const progress =
            getProgress();


        /* =============================================
           CHAPTER 02 SELESAI
           ============================================= */

        if (
            !progress.completedChapters.includes(
                2
            )
        ) {

            progress.completedChapters.push(
                2
            );

        }


        /* =============================================
           LOKASI 02 SELESAI
           ============================================= */

        if (
            !progress.completedLocations.includes(
                2
            )
        ) {

            progress.completedLocations.push(
                2
            );

        }


        /* =============================================
           UNLOCK LOKASI 03
           ============================================= */

        if (
            !progress.unlockedLocations.includes(
                3
            )
        ) {

            progress.unlockedLocations.push(
                3
            );

        }


        /* =============================================
           CHAPTER BERIKUTNYA
           ============================================= */

        progress.currentChapter =
            3;


        /* =============================================
           HILANGKAN DUPLIKAT
           ============================================= */

        progress.completedChapters = [
            ...new Set(
                progress.completedChapters
            )
        ];


        progress.completedLocations = [
            ...new Set(
                progress.completedLocations
            )
        ];


        progress.unlockedLocations = [
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
            "Gameplay 02 — Ki Ajar Winarong selesai."
        );


        console.log(
            "Progress:",
            progress
        );


        console.log(
            "Lokasi 03 terbuka."
        );

    }


    /* =====================================================
       SCREEN COMPLETE → PETA
       ===================================================== */

    safeClick(
        "btnContinueChapter",
        () => {

            /*
             * Pastikan Gameplay 02 sudah selesai
             * sebelum kembali ke peta.
             */

            completeGameplay02();


            window.location.href =
                "../../peta.html";

        }
    );


    /* =====================================================
       INIT
       ===================================================== */

    updateHud();


    ensureSayembaraSlots();


    updateSayembaraNextButton();


    updateQuiz();


    /* =====================================================
       INIT REWARD DISPLAY
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
            "+25 XP";

    }


    if (
        initialSayembaraBasaReward
    ) {

        initialSayembaraBasaReward.textContent =
            "+5 BASA";

    }


    if (
        initialChapterXpReward
    ) {

        initialChapterXpReward.textContent =
            "+25 XP";

    }


    if (
        initialChapterBasaReward
    ) {

        initialChapterBasaReward.textContent =
            "+5 BASA";

    }


    /* =====================================================
       CONSOLE INFO
       ===================================================== */

    console.log(
        "Gameplay 02 — Ki Ajar Winarong berhasil dimuat."
    );


    console.log(
        "Alur: Opening → Dialog → Transition → Sinau Basa → Quiz → Cerita → Sayembara → Selesai."
    );


})();