/* =========================================================
   GAMEPLAY 02 — KI AJAR WINARONG
   ========================================================= */

(() => {

    /* =========================================================
       NAVIGASI SCREEN
       ========================================================= */

    const screens = [
        ...document.querySelectorAll(".story-screen")
    ];


    const showScreen = (id) => {

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

    };


    const safeClick = (id, handler) => {

        const el =
            document.getElementById(id);


        if (el) {

            el.addEventListener(
                "click",
                handler
            );

        }

    };


    /* =========================================================
       NAVIGASI CERITA
       ========================================================= */

    safeClick(
        "btnBeginStory",
        () => {

            showScreen(
                "story-dialog"
            );

        }
    );


    safeClick(
        "btnNextStory",
        () => {

            showScreen(
                "story-gameplay"
            );

        }
    );


    safeClick(
        "btnStartGameplay",
        () => {

            showScreen(
                "story-learning-basa"
            );

        }
    );


    safeClick(
        "btnStartQuizBasa",
        () => {

            resetQuiz();

            showScreen(
                "story-quiz-basa"
            );

        }
    );


    safeClick(
        "btnStartSayembara",
        () => {

            resetDragGame();

            showScreen(
                "story-sayembara"
            );

        }
    );


    /* =========================================================
       SELESAI GAMEPLAY 02
       ========================================================= */

    safeClick(
        "btnNextSayembara",
        () => {

            /*
             * Harus tepat 4 pilihan.
             */

            if (
                selectedSteps.length !== 4
            ) {

                return;

            }


            /*
             * Pastikan semua pilihan benar.
             */

            const allCorrect =
                selectedSteps.every(
                    value =>
                        correctSteps.includes(
                            value
                        )
                );


            if (!allCorrect) {

                return;

            }


            /*
             * Reward Gameplay 02
             */

            updateReward(
                50,
                10
            );


            /*
             * Tandai chapter 02 selesai.
             *
             * mapEngine.js akan:
             *
             * completedChapters
             * completedLocations
             * unlockedLocations
             * currentChapter
             */

            if (
                typeof completeChapter ===
                "function"
            ) {

                completeChapter(2);

            }

            else {

                console.warn(
                    "completeChapter() tidak ditemukan."
                );

            }


            /*
             * Masuk ke screen selesai.
             */

            showScreen(
                "story-chapter-08"
            );

        }
    );


    /* =========================================================
       KEMBALI KE PETA
       ========================================================= */

    safeClick(
        "btnContinueChapter",
        () => {

            window.location.href =
                "../../peta.html";

        }
    );


    /* =========================================================
       AUDIO / TEXT TO SPEECH
       ========================================================= */

    const dialogueText =
        "Yen kowe kepengin nemokake jodhomu, le, kudu gelem ninggalake uripmu minangka putra raja. Nyuwun pitutur, Ki Ajar. Kula siap nglakoni apa wae sing kedah kula lakoni.";


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


    /* =========================================================
       AUDIO BASA
       ========================================================= */

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


    /* =========================================================
       QUIZ BASA
       ========================================================= */

    const quizQuestions = [

        {

            question:
                'Apa arti kata "Pitutur"?',

            answers: [

                "Nasihat / petuah",

                "Perjalanan",

                "Menyamar",

                "Saya"

            ],

            correct:
                "Nasihat / petuah"

        },


        {

            question:
                'Apa arti kata "Lampah"?',

            answers: [

                "Nama orang",

                "Perjalanan / langkah",

                "Nasihat",

                "Kerajaan"

            ],

            correct:
                "Perjalanan / langkah"

        },


        {

            question:
                'Apa arti kata "Nyamar"?',

            answers: [

                "Menyamar",

                "Berangkat",

                "Berbicara",

                "Menolong"

            ],

            correct:
                "Menyamar"

        },


        {

            question:
                'Apa arti kata "Kula"?',

            answers: [

                "Ayah",

                "Guru",

                "Saya",

                "Teman"

            ],

            correct:
                "Saya"

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


    /* =========================================================
       RENDER QUIZ
       ========================================================= */

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
                        (quizIndex + 1) /
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
            (button, index) => {

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


    /* =========================================================
       KLIK JAWABAN QUIZ
       ========================================================= */

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


                    /*
                     * Setelah menjawab,
                     * semua pilihan dikunci.
                     */

                    quizOptions.forEach(
                        option => {

                            option.disabled =
                                true;

                        }
                    );


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


    /* =========================================================
       NEXT QUIZ
       ========================================================= */

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
                    "story-sayembara-story"
                );

            }

        }
    );


    /* =========================================================
       RESET QUIZ
       ========================================================= */

    function resetQuiz() {

        quizIndex =
            0;


        quizAnswered =
            false;


        renderQuiz();

    }


    /* =========================================================
       DRAG & DROP SAYEMBARA
       ========================================================= */

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


    /* =========================================================
       JAWABAN BENAR
       ========================================================= */

    const correctSteps = [

        "pakaian",

        "rakyat",

        "nama",

        "pasirluhur"

    ];


    /* =========================================================
       PILIHAN YANG SUDAH MASUK
       ========================================================= */

    let selectedSteps = [];


    /* =========================================================
       OPTION DRAG
       ========================================================= */

    optionButtons.forEach(
        option => {

            option.addEventListener(
                "dragstart",
                event => {

                    /*
                     * Kalau pilihan sudah masuk,
                     * tidak bisa didrag lagi.
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


            option.addEventListener(
                "dragend",
                () => {

                    option.classList.remove(
                        "dragging"
                    );

                }
            );


            /* =================================================
               KLIK OPTION
               ================================================= */

            option.addEventListener(
                "click",
                () => {

                    const key =
                        option.dataset.answer;


                    /*
                     * Kalau sudah masuk,
                     * klik lagi tidak menambah duplikat.
                     *
                     * Item di dropzone yang digunakan
                     * untuk membatalkan.
                     */

                    if (
                        option.classList.contains(
                            "used"
                        )
                    ) {

                        return;

                    }


                    /*
                     * Kalau salah,
                     * jangan dimasukkan ke kotak.
                     */

                    if (
                        !correctSteps.includes(
                            key
                        )
                    ) {

                        showWrongOption(
                            option
                        );

                        return;

                    }


                    /*
                     * Kalau benar,
                     * masukkan ke kotak.
                     */

                    addDropItem(
                        key,
                        option
                    );

                }
            );

        }
    );


    /* =========================================================
       DROPZONE
       ========================================================= */

    if (dropzone) {

        dropzone.addEventListener(
            "dragover",
            event => {

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


                /*
                 * SALAH
                 * → tidak masuk dropzone.
                 */

                if (
                    !correctSteps.includes(
                        key
                    )
                ) {

                    showWrongOption(
                        option
                    );

                    return;

                }


                /*
                 * BENAR
                 * → masuk dropzone.
                 */

                addDropItem(
                    key,
                    option
                );

            }
        );

    }


    /* =========================================================
       TAMBAH ITEM KE DROPZONE
       ========================================================= */

    function addDropItem(
        key,
        option
    ) {

        /*
         * Jangan kosong.
         */

        if (!key) {

            return;

        }


        /*
         * Jangan duplikat.
         */

        if (
            selectedSteps.includes(
                key
            )
        ) {

            return;

        }


        /*
         * Maksimal 4 pilihan.
         */

        if (
            selectedSteps.length >= 4
        ) {

            return;

        }


        /*
         * Masukkan ke array.
         */

        selectedSteps.push(
            key
        );


        /*
         * Tandai option sumber
         * sebagai sudah digunakan.
         */

        if (option) {

            option.classList.add(
                "used"
            );


            option.setAttribute(
                "aria-disabled",
                "true"
            );

        }


        /*
         * Cari holder.
         */

        let holder =
            dropzone.querySelector(
                ".dropped-items"
            );


        /*
         * Kalau holder belum ada,
         * buat holder.
         */

        if (!holder) {

            holder =
                document.createElement(
                    "div"
                );


            holder.className =
                "dropped-items";


            /*
             * Hapus placeholder saja.
             */

            const placeholder =
                dropzone.querySelector(
                    ".sayembara-dropzone-placeholder"
                );


            if (placeholder) {

                placeholder.remove();

            }


            dropzone.appendChild(
                holder
            );

        }


        /*
         * Buat item.
         */

        const chip =
            document.createElement(
                "button"
            );


        chip.type =
            "button";


        chip.className =
            "dropped-item correct";


        chip.dataset.answer =
            key;


        /*
         * PENTING:
         *
         * Gunakan isi option asli.
         *
         * Jadi icon + tulisan ikut masuk
         * seperti Gameplay01.
         */

        chip.innerHTML =
            option.innerHTML;


        /*
         * Klik item dalam kotak
         * untuk membatalkan pilihan.
         */

        chip.title =
            "Klik untuk menghapus";


        chip.addEventListener(
            "click",
            () => {

                removeDropItem(
                    key,
                    option,
                    chip
                );

            }
        );


        holder.appendChild(
            chip
        );


        dropzone.classList.add(
            "has-items"
        );


        /*
         * Cek jumlah pilihan.
         */

        checkDragGame();

    }


    /* =========================================================
       HAPUS ITEM DARI DROPZONE
       ========================================================= */

    function removeDropItem(
        key,
        option,
        chip
    ) {

        /*
         * Hapus dari array.
         */

        const index =
            selectedSteps.indexOf(
                key
            );


        if (
            index !== -1
        ) {

            selectedSteps.splice(
                index,
                1
            );

        }


        /*
         * Kembalikan option asal.
         */

        if (option) {

            option.classList.remove(
                "used"
            );


            option.removeAttribute(
                "aria-disabled"
            );

        }


        /*
         * Hapus chip.
         */

        if (chip) {

            chip.remove();

        }

        else if (dropzone) {

            const existing =
                dropzone.querySelector(
                    `.dropped-item[data-answer="${key}"]`
                );


            if (existing) {

                existing.remove();

            }

        }


        /*
         * Kalau kosong,
         * tampilkan placeholder lagi.
         */

        if (
            selectedSteps.length === 0
        ) {

            resetDropzoneVisual();

        }


        /*
         * Cek ulang status.
         */

        checkDragGame();

    }


    /* =========================================================
       PILIHAN SALAH
       ========================================================= */

    function showWrongOption(
        option
    ) {

        if (!option) {

            return;

        }


        /*
         * Pilihan salah TIDAK dimasukkan
         * ke dropzone.
         */

        option.classList.remove(
            "wrong",
            "shake"
        );


        void option.offsetWidth;


        option.classList.add(
            "wrong",
            "shake"
        );


        if (feedback) {

            feedback.textContent =
                "Belum tepat. Coba pilih langkah yang lain.";


            feedback.style.color =
                "#9b4d3f";

        }


        /*
         * Kembalikan ke kondisi normal
         * setelah animasi.
         */

        setTimeout(
            () => {

                option.classList.remove(
                    "wrong",
                    "shake"
                );

            },
            600
        );

    }


    /* =========================================================
       CEK GAME
       ========================================================= */

    function checkDragGame() {

        const count =
            selectedSteps.length;


        /*
         * Belum 4 pilihan.
         */

        if (
            count < 4
        ) {

            if (feedback) {

                feedback.textContent =
                    `Pilih ${
                        4 - count
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


            if (dropzone) {

                dropzone.classList.remove(
                    "complete"
                );

            }


            return;

        }


        /*
         * Pastikan semuanya benar.
         */

        const allCorrect =
            selectedSteps.length === 4 &&
            selectedSteps.every(
                value =>
                    correctSteps.includes(
                        value
                    )
            );


        /*
         * SEMUA BENAR
         */

        if (allCorrect) {

            if (feedback) {

                feedback.textContent =
                    "Benar! Kamu memahami petunjuk Ki Ajar Winarong.";

                feedback.style.color =
                    "#3f713c";

            }


            if (dropzone) {

                dropzone.classList.add(
                    "complete"
                );


                dropzone
                    .querySelectorAll(
                        ".dropped-item"
                    )
                    .forEach(
                        item => {

                            item.classList.remove(
                                "wrong"
                            );


                            item.classList.add(
                                "correct"
                            );

                        }
                    );

            }


            if (nextSayembara) {

                nextSayembara.disabled =
                    false;

                nextSayembara.classList.add(
                    "ready"
                );

            }

        }

        else {

            /*
             * Secara normal kondisi ini
             * tidak akan terjadi karena
             * pilihan salah tidak pernah
             * dimasukkan ke dropzone.
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


    /* =========================================================
       RESET DROPZONE VISUAL
       ========================================================= */

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
            "drag-over",
            "dragover",
            "complete"
        );

    }


    /* =========================================================
       RESET DRAG GAME
       ========================================================= */

    function resetDragGame() {

        /*
         * Kosongkan pilihan.
         */

        selectedSteps = [];


        /*
         * Reset semua option.
         */

        optionButtons.forEach(
            option => {

                option.classList.remove(
                    "used",
                    "dragging",
                    "correct",
                    "wrong",
                    "shake"
                );


                option.disabled =
                    false;


                option.setAttribute(
                    "draggable",
                    "true"
                );


                option.removeAttribute(
                    "aria-disabled"
                );

            }
        );


        /*
         * Reset feedback.
         */

        if (feedback) {

            feedback.textContent =
                "";

            feedback.style.color =
                "";

        }


        /*
         * Reset tombol lanjut.
         */

        if (nextSayembara) {

            nextSayembara.disabled =
                true;

            nextSayembara.classList.remove(
                "ready"
            );

        }


        /*
         * Reset dropzone.
         */

        resetDropzoneVisual();

    }


    /* =========================================================
       HUD
       ========================================================= */

    function getNumber(id) {

        const el =
            document.getElementById(
                id
            );


        return el
            ? Number(
                el.textContent
            ) || 0

            : 0;

    }


    /* =========================================================
       TAMBAH XP
       ========================================================= */

    function addXp(
        amount
    ) {

        const el =
            document.getElementById(
                "hudXp"
            );


        if (el) {

            el.textContent =
                getNumber(
                    "hudXp"
                ) +
                amount;

        }

    }


    /* =========================================================
       TAMBAH BASA
       ========================================================= */

    function addBasa(
        amount
    ) {

        const el =
            document.getElementById(
                "hudBasa"
            );


        if (el) {

            el.textContent =
                getNumber(
                    "hudBasa"
                ) +
                amount;

        }

    }


    /* =========================================================
       UPDATE REWARD
       ========================================================= */

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


    /* =========================================================
       INITIALIZE
       ========================================================= */

    resetQuiz();

})();