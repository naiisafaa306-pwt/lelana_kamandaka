/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 03 — PASIR LUHUR
   ========================================================= */

(() => {

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


    function safeClick(id, handler) {

        const element =
            document.getElementById(id);


        if (element) {

            element.addEventListener(
                "click",
                handler
            );

        }

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

            resetDragGame();


            showScreen(
                "story-sayembara"
            );

        }
    );


    /* =====================================================
       SCREEN 07 → SCREEN 08
       SELESAI GAMEPLAY 03
       ===================================================== */

    safeClick(
        "btnNextSayembara",
        () => {

            /*
             * Harus memilih tepat 4 pilihan.
             */

            if (
                selectedSteps.size !== 4
            ) {

                return;

            }


            /*
             * Cek semua jawaban.
             */

            const values =
                [...selectedSteps];


            const allCorrect =
                values.length === 4 &&
                values.every(
                    value =>
                        correctSteps.has(
                            value
                        )
                );


            /*
             * Kalau salah,
             * tidak boleh lanjut.
             */

            if (
                !allCorrect
            ) {

                return;

            }


            /* =================================================
               REWARD GAMEPLAY 03
               ================================================= */

            updateReward(
                50,
                10
            );


            /* =================================================
               SIMPAN PROGRESS
               SESUAI SISTEM MAP ENGINE
               ================================================= */

            completeGameplay03();


            /* =================================================
               MASUK SCREEN 08
               ================================================= */

            showScreen(
                "story-chapter-08"
            );

        }
    );


    /* =====================================================
       COMPLETE GAMEPLAY 03
       ===================================================== */

    function completeGameplay03() {

        let progress = {};


        /* =================================================
           AMBIL PROGRESS LAMA
           ================================================= */

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
           STRUKTUR DEFAULT
           SAMA DENGAN MAP ENGINE
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
           TANDAI CHAPTER 03 SELESAI
           ================================================= */

        if (
            !progress.completedChapters.includes(
                3
            )
        ) {

            progress.completedChapters.push(
                3
            );

        }


        /* =================================================
           TANDAI LOKASI 03 SELESAI
           ================================================= */

        if (
            !progress.completedLocations.includes(
                3
            )
        ) {

            progress.completedLocations.push(
                3
            );

        }


        /* =================================================
           BUKA LOKASI 04
           KALI LOGAWA
           ================================================= */

        if (
            !progress.unlockedLocations.includes(
                4
            )
        ) {

            progress.unlockedLocations.push(
                4
            );

        }


        /* =================================================
           CHAPTER BERIKUTNYA
           ================================================= */

        progress.currentChapter =
            4;


        /* =================================================
           HILANGKAN DUPLIKAT
           ================================================= */

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


        /* =================================================
           URUTKAN
           ================================================= */

        progress.completedChapters.sort(
            (a, b) => a - b
        );


        progress.completedLocations.sort(
            (a, b) => a - b
        );


        progress.unlockedLocations.sort(
            (a, b) => a - b
        );


        /* =================================================
           SIMPAN KE SESSION STORAGE
           ================================================= */

        try {

            sessionStorage.setItem(
                MAP_PROGRESS_KEY,
                JSON.stringify(progress)
            );


            console.log(
                "Gameplay 03 selesai."
            );


            console.log(
                "Progress:",
                progress
            );


            console.log(
                "Lokasi 04 terbuka."
            );

        }
        catch (error) {

            console.warn(
                "Progress tidak dapat disimpan.",
                error
            );

        }

    }


    /* =====================================================
       SCREEN 08 → PETA
       ===================================================== */

    safeClick(
        "btnContinueChapter",
        () => {

            window.location.href =
                "../../peta.html";

        }
    );


    /* =====================================================
       AUDIO / TEXT TO SPEECH
       ===================================================== */

    const dialogueText =
        "Wis tekan wewengkon Pasir Luhur. " +
        "Saka kadohan, Kamandaka ndeleng papan " +
        "sing beda karo panggonan sing wis dilakoni " +
        "sadurunge. Iki Pasir Luhur. Saiki aku kudu " +
        "ngati-ati, nyamar minangka wong biasa lan " +
        "sinau ngenali papan iki sadurunge nerusake " +
        "lampahku.";


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
        function(text) {

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
       QUIZ BASA
       ===================================================== */

    const quizQuestions = [

        {

            question:
                'Apa arti kata "Wewengkon"?',

            answers: [

                "Wilayah / daerah",

                "Rumah",

                "Berangkat",

                "Teman"

            ],

            correct:
                "Wilayah / daerah"

        },


        {

            question:
                'Apa arti kata "Mlebu"?',

            answers: [

                "Keluar",

                "Masuk",

                "Berjalan",

                "Berbicara"

            ],

            correct:
                "Masuk"

        },


        {

            question:
                'Apa arti kata "Ngati-ati"?',

            answers: [

                "Bergegas",

                "Bermain",

                "Berhati-hati",

                "Berkumpul"

            ],

            correct:
                "Berhati-hati"

        },


        {

            question:
                'Apa arti kata "Lampah"?',

            answers: [

                "Perjalanan / langkah",

                "Kerajaan",

                "Rumah",

                "Nama orang"

            ],

            correct:
                "Perjalanan / langkah"

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

        const item =
            quizQuestions[
                quizIndex
            ];


        if (!item) {

            return;

        }


        quizAnswered =
            false;


        if (quizQuestion) {

            quizQuestion.textContent =
                item.question;

        }


        if (quizNumber) {

            quizNumber.textContent =
                `PERTANYAAN ${
                    String(
                        quizIndex + 1
                    ).padStart(2, "0")
                } / ${
                    quizQuestions.length
                }`;

        }


        if (quizFill) {

            quizFill.style.width =
                `${
                    (
                        (
                            quizIndex + 1
                        ) /
                        quizQuestions.length
                    ) * 100
                }%`;

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


                const span =
                    button.querySelector(
                        "span:last-child"
                    );


                if (span) {

                    span.textContent =
                        item.answers[index];

                }


                button.dataset.answer =
                    item.answers[index];

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

                    /*
                     * Setelah menjawab,
                     * soal langsung terkunci.
                     */

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


                    /*
                     * SEMUA PILIHAN DIKUNCI.
                     */

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
                        chosen === correct
                    ) {

                        button.classList.add(
                            "correct"
                        );


                        if (quizFeedback) {

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


                        if (quizFeedback) {

                            quizFeedback.textContent =
                                `Belum tepat. Jawaban yang benar: ${correct}.`;

                            quizFeedback.style.color =
                                "#9b4d3f";

                        }

                    }


                    /*
                     * Tombol berikutnya aktif.
                     */

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
       DRAG & DROP
       ===================================================== */

    const dropzone =
        document.getElementById(
            "sayembaraDropzone"
        );


    const feedback =
        document.getElementById(
            "sayembaraFeedback"
        );


    const nextSayembara =
        document.getElementById(
            "btnNextSayembara"
        );


    const optionButtons = [
        ...document.querySelectorAll(
            ".sayembara-option"
        )
    ];


    /* =====================================================
       JAWABAN BENAR
       ===================================================== */

    const correctSteps =
        new Set([

            "masuk",

            "amati",

            "nyamar",

            "lampah"

        ]);


    const selectedSteps =
        new Set();


    /*
     * STATUS GAME
     *
     * false = masih bisa memilih
     * true  = sudah memilih 4
     *        dan game terkunci
     */

    let dragAnswered =
        false;


    /* =====================================================
       OPTION DRAG
       ===================================================== */

    optionButtons.forEach(
        option => {

            /* =============================================
               DRAG START
               ============================================= */

            option.addEventListener(
                "dragstart",
                event => {

                    /*
                     * Kalau sudah terkunci,
                     * tidak boleh drag.
                     */

                    if (
                        dragAnswered
                    ) {

                        event.preventDefault();

                        return;

                    }


                    /*
                     * Kalau sudah masuk,
                     * tidak boleh drag lagi.
                     */

                    if (
                        option.classList.contains(
                            "used"
                        )
                    ) {

                        event.preventDefault();

                        return;

                    }


                    event.dataTransfer.setData(
                        "text/plain",
                        option.dataset.answer
                    );


                    event.dataTransfer.effectAllowed =
                        "move";


                    option.classList.add(
                        "dragging"
                    );

                }
            );


            /* =============================================
               DRAG END
               ============================================= */

            option.addEventListener(
                "dragend",
                () => {

                    option.classList.remove(
                        "dragging"
                    );

                }
            );


            /* =============================================
               KLIK PILIHAN
               ============================================= */

            option.addEventListener(
                "click",
                () => {

                    /*
                     * Kalau game sudah dikunci,
                     * klik tidak bekerja.
                     */

                    if (
                        dragAnswered
                    ) {

                        return;

                    }


                    /*
                     * Kalau sudah masuk ke kotak,
                     * klik lagi untuk mengeluarkan.
                     */

                    if (
                        option.classList.contains(
                            "used"
                        )
                    ) {

                        removeDropItem(
                            option.dataset.answer,
                            option
                        );


                        return;

                    }


                    /*
                     * Masukkan ke kotak.
                     */

                    addDropItem(
                        option.dataset.answer,
                        option
                    );

                }
            );

        }
    );


    /* =====================================================
       DROPZONE
       ===================================================== */

    if (dropzone) {

        dropzone.addEventListener(
            "dragover",
            event => {

                /*
                 * Kalau sudah dikunci,
                 * tidak menerima drag.
                 */

                if (
                    dragAnswered
                ) {

                    return;

                }


                event.preventDefault();


                event.dataTransfer.dropEffect =
                    "move";


                dropzone.classList.add(
                    "drag-over"
                );

            }
        );


        dropzone.addEventListener(
            "dragleave",
            event => {

                if (
                    event.relatedTarget &&
                    dropzone.contains(
                        event.relatedTarget
                    )
                ) {

                    return;

                }


                dropzone.classList.remove(
                    "drag-over"
                );

            }
        );


        dropzone.addEventListener(
            "drop",
            event => {

                /*
                 * Kalau sudah dikunci,
                 * tidak menerima drop.
                 */

                if (
                    dragAnswered
                ) {

                    return;

                }


                event.preventDefault();


                dropzone.classList.remove(
                    "drag-over"
                );


                const key =
                    event.dataTransfer.getData(
                        "text/plain"
                    );


                if (!key) {

                    return;

                }


                const option =
                    optionButtons.find(
                        item =>
                            item.dataset.answer ===
                            key
                    );


                if (!option) {

                    return;

                }


                /*
                 * Jangan masukkan pilihan
                 * yang sudah digunakan.
                 */

                if (
                    option.classList.contains(
                        "used"
                    )
                ) {

                    return;

                }


                addDropItem(
                    key,
                    option
                );

            }
        );

    }


    /* =====================================================
       TAMBAH ITEM KE DROPZONE
       ===================================================== */

    function addDropItem(
        key,
        option
    ) {

        /*
         * Kalau sudah terkunci,
         * tidak boleh menambah.
         */

        if (
            dragAnswered
        ) {

            return;

        }


        /*
         * Tidak boleh kosong.
         */

        if (!key) {

            return;

        }


        /*
         * Tidak boleh duplikat.
         */

        if (
            selectedSteps.has(
                key
            )
        ) {

            return;

        }


        /*
         * Masukkan pilihan.
         */

        selectedSteps.add(
            key
        );


        /*
         * Tandai pilihan asal.
         */

        if (option) {

            option.classList.add(
                "used"
            );

        }


        /* =================================================
           HOLDER
           ================================================= */

        let holder =
            dropzone.querySelector(
                ".dropped-items"
            );


        if (!holder) {

            holder =
                document.createElement(
                    "div"
                );


            holder.className =
                "dropped-items";


            dropzone.innerHTML =
                "";


            dropzone.appendChild(
                holder
            );

        }


        /* =================================================
           BUAT KOTAK ITEM
           ================================================= */

        const chip =
            document.createElement(
                "div"
            );


        chip.className =
            "dropped-item";


        chip.dataset.answer =
            key;


        chip.textContent =
            labelFor(key);


        chip.setAttribute(
            "role",
            "button"
        );


        chip.setAttribute(
            "tabindex",
            "0"
        );


        chip.title =
            "Klik untuk menghapus";


        /* =================================================
           KLIK KOTAK → HAPUS
           SELAMA BELUM TERKUNCI
           ================================================= */

        chip.addEventListener(
            "click",
            () => {

                if (
                    dragAnswered
                ) {

                    return;

                }


                removeDropItem(
                    key,
                    option
                );

            }
        );


        /* =================================================
           KEYBOARD
           ================================================= */

        chip.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Enter" ||
                    event.key ===
                    " "
                ) {

                    event.preventDefault();


                    if (
                        dragAnswered
                    ) {

                        return;

                    }


                    removeDropItem(
                        key,
                        option
                    );

                }

            }
        );


        holder.appendChild(
            chip
        );


        dropzone.classList.add(
            "has-items"
        );


        /*
         * Cek apakah sudah 4.
         */

        checkDragGame();

    }


    /* =====================================================
       HAPUS ITEM DARI DROPZONE
       ===================================================== */

    function removeDropItem(
        key,
        option
    ) {

        /*
         * Kalau sudah terkunci,
         * tidak boleh menghapus.
         */

        if (
            dragAnswered
        ) {

            return;

        }


        selectedSteps.delete(
            key
        );


        /*
         * Kembalikan pilihan asal.
         */

        if (option) {

            option.classList.remove(
                "used",
                "correct",
                "wrong"
            );

        }


        /*
         * Cari kotak item.
         */

        const chip =
            dropzone.querySelector(
                `.dropped-item[data-answer="${key}"]`
            );


        if (chip) {

            chip.remove();

        }


        /*
         * Kalau kosong,
         * kembalikan placeholder.
         */

        if (
            selectedSteps.size === 0
        ) {

            resetDropzoneVisual();

        }


        /*
         * Cek kembali.
         */

        checkDragGame();

    }


    /* =====================================================
       LABEL
       ===================================================== */

    function labelFor(key) {

        const labels = {

            masuk:
                "Memasuki Pasir Luhur",

            amati:
                "Mengamati Sekitar",

            nyamar:
                "Menjaga Penyamaran",

            lampah:
                "Melanjutkan Lampah",

            mahkota:
                "Memakai Mahkota Raja",

            pulang:
                "Kembali ke Kerajaan",

            tergesa:
                "Tergesa-gesa Memasuki Kota"

        };


        return (
            labels[key] ||
            key
        );

    }


    /* =====================================================
       CEK GAME DRAG
       ===================================================== */

    function checkDragGame() {

        const values =
            [...selectedSteps];


        /* =================================================
           BELUM 4
           ================================================= */

        if (
            values.length < 4
        ) {

            if (feedback) {

                feedback.textContent =
                    `Pilih ${
                        4 - values.length
                    } langkah lagi.`;

                feedback.style.color =
                    "#777660";

            }


            if (nextSayembara) {

                nextSayembara.disabled =
                    true;


                nextSayembara.classList.remove(
                    "ready"
                );

            }


            return;

        }


        /* =================================================
           SUDAH 4
           
           LANGSUNG KUNCI
           ================================================= */

        dragAnswered =
            true;


        /*
         * Semua pilihan luar dikunci.
         */

        optionButtons.forEach(
            option => {

                option.draggable =
                    false;


                option.disabled =
                    true;

            }
        );


        /* =================================================
           CEK BENAR / SALAH
           ================================================= */

        const allCorrect =
            values.length === 4 &&
            values.every(
                value =>
                    correctSteps.has(
                        value
                    )
            );


        /* =================================================
           BENAR
           ================================================= */

        if (
            allCorrect
        ) {

            if (feedback) {

                feedback.textContent =
                    "Benar! Kamu memahami langkah Kamandaka di Pasir Luhur.";

                feedback.style.color =
                    "#3f713c";

            }


            /*
             * Tandai semua kotak sebagai benar.
             */

            if (dropzone) {

                dropzone
                    .querySelectorAll(
                        ".dropped-item"
                    )
                    .forEach(
                        item => {

                            item.classList.add(
                                "correct"
                            );

                        }
                    );

            }


            /*
             * Tombol lanjut aktif.
             */

            if (nextSayembara) {

                nextSayembara.disabled =
                    false;


                nextSayembara.classList.add(
                    "ready"
                );

            }

        }


        /* =================================================
           SALAH
           ================================================= */

        else {

            if (feedback) {

                feedback.textContent =
                    "Susunan langkah belum tepat.";

                feedback.style.color =
                    "#9b4d3f";

            }


            /*
             * Tandai yang benar dan salah.
             */

            if (dropzone) {

                dropzone
                    .querySelectorAll(
                        ".dropped-item"
                    )
                    .forEach(
                        item => {

                            const key =
                                item.dataset.answer;


                            if (
                                correctSteps.has(
                                    key
                                )
                            ) {

                                item.classList.add(
                                    "correct"
                                );

                            }

                            else {

                                item.classList.add(
                                    "wrong"
                                );

                            }

                        }
                    );

            }


            /*
             * SALAH = TETAP TERKUNCI.
             *
             * Tidak bisa:
             * - klik pilihan lain
             * - drag pilihan lain
             * - hapus pilihan
             * - memperbaiki jawaban
             */

            if (nextSayembara) {

                nextSayembara.disabled =
                    true;


                nextSayembara.classList.remove(
                    "ready"
                );

            }

        }

    }


    /* =====================================================
       RESET DROPZONE
       ===================================================== */

    function resetDropzoneVisual() {

        if (!dropzone) {

            return;

        }


        dropzone.innerHTML = `

            <div class="sayembara-dropzone-placeholder">

                <span>
                    LETAKKAN LANGKAH
                </span>

                <strong>
                    PERJALANAN
                </strong>

                <small>
                    Tarik 4 langkah yang benar ke area ini
                </small>

            </div>

        `;


        dropzone.classList.remove(
            "has-items",
            "drag-over"
        );

    }


    /* =====================================================
       RESET DRAG GAME
       ===================================================== */

    function resetDragGame() {

        selectedSteps.clear();


        dragAnswered =
            false;


        if (feedback) {

            feedback.textContent =
                "";

            feedback.style.color =
                "";

        }


        if (nextSayembara) {

            nextSayembara.disabled =
                true;


            nextSayembara.classList.remove(
                "ready"
            );

        }


        optionButtons.forEach(
            option => {

                option.classList.remove(
                    "used",
                    "correct",
                    "wrong",
                    "dragging"
                );


                option.disabled =
                    false;


                option.draggable =
                    true;

            }
        );


        resetDropzoneVisual();

    }


    /* =====================================================
       HUD
       ===================================================== */

    function getNumber(id) {

        const element =
            document.getElementById(
                id
            );


        if (!element) {

            return 0;

        }


        return Number(
            element.textContent
        ) || 0;

    }


    /* =====================================================
       TAMBAH XP
       ===================================================== */

    function addXp(amount) {

        const element =
            document.getElementById(
                "hudXp"
            );


        if (!element) {

            return;

        }


        element.textContent =
            getNumber(
                "hudXp"
            ) +
            amount;

    }


    /* =====================================================
       TAMBAH BASA
       ===================================================== */

    function addBasa(amount) {

        const element =
            document.getElementById(
                "hudBasa"
            );


        if (!element) {

            return;

        }


        element.textContent =
            getNumber(
                "hudBasa"
            ) +
            amount;

    }


    /* =====================================================
       UPDATE REWARD
       ===================================================== */

    function updateReward(
        xp,
        basa
    ) {

        addXp(
            xp
        );


        addBasa(
            basa
        );


        const xpReward =
            document.getElementById(
                "chapterXpReward"
            );


        const basaReward =
            document.getElementById(
                "chapterBasaReward"
            );


        if (xpReward) {

            xpReward.textContent =
                `+${xp} XP`;

        }


        if (basaReward) {

            basaReward.textContent =
                `+${basa} BASA`;

        }

    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

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


    if (opening) {

        opening.classList.add(
            "active"
        );

    }

})();