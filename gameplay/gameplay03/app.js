/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 03 — PASIR LUHUR
   ========================================================= */

(() => {

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

            if (!quizAnswered) {
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
             * Harus memilih tepat 4 langkah.
             */

            if (
                selectedSteps.size !== 4
            ) {

                return;

            }


            /*
             * Pastikan semua benar.
             */

            const values =
                [...selectedSteps];

            const allCorrect =
                values.length === 4 &&
                values.every(
                    value =>
                        correctSteps.has(value)
                );


            if (!allCorrect) {

                checkDragGame();

                return;

            }


            /*
             * Reward Gameplay 03
             */

            updateReward(
                50,
                10
            );


            /*
             * Tandai BAB 03 selesai.
             *
             * mapEngine.js akan menangani:
             *
             * completedChapters
             * completedLocations
             * unlockedLocations
             */

            if (
                typeof completeChapter ===
                "function"
            ) {

                completeChapter(3);

            }

            else {

                console.warn(
                    "completeChapter() tidak ditemukan."
                );

            }


            /*
             * Masuk ke Screen 08
             */

            showScreen(
                "story-chapter-08"
            );

        }
    );


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


    let quizIndex = 0;

    let quizAnswered = false;


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


                        addXp(10);

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

        quizIndex =
            0;

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


    /* =====================================================
       OPTION DRAG
       ===================================================== */

    optionButtons.forEach(
        option => {

            option.addEventListener(
                "dragstart",
                event => {

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


            /*
             * Klik juga bisa digunakan.
             */

            option.addEventListener(
                "click",
                () => {

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

        if (
            !key ||
            selectedSteps.has(key)
        ) {

            return;

        }


        selectedSteps.add(
            key
        );


        if (option) {

            option.classList.add(
                "used"
            );

        }


        /*
         * Buat container item
         */

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


        /*
         * Buat item
         */

        const chip =
            document.createElement(
                "button"
            );


        chip.type =
            "button";


        chip.className =
            "dropped-item";


        chip.dataset.answer =
            key;


        chip.textContent =
            labelFor(key);


        chip.title =
            "Klik untuk menghapus";


        /*
         * Klik item untuk menghapus
         */

        chip.addEventListener(
            "click",
            () => {

                selectedSteps.delete(
                    key
                );


                if (option) {

                    option.classList.remove(
                        "used"
                    );

                }


                chip.remove();


                if (
                    selectedSteps.size === 0
                ) {

                    resetDropzoneVisual();

                }


                checkDragGame();

            }
        );


        holder.appendChild(
            chip
        );


        /*
         * Tandai dropzone punya item
         */

        dropzone.classList.add(
            "has-items"
        );


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
       CEK GAME
       ===================================================== */

    function checkDragGame() {

        const values =
            [...selectedSteps];


        /*
         * Belum 4 pilihan
         */

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

            }


            return;

        }


        /*
         * Cek apakah semuanya benar
         */

        const allCorrect =
            values.length === 4 &&
            values.every(
                value =>
                    correctSteps.has(
                        value
                    )
            );


        if (allCorrect) {

            if (feedback) {

                feedback.textContent =
                    "Benar! Kamu memahami langkah Kamandaka di Pasir Luhur.";

                feedback.style.color =
                    "#3f713c";

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

            if (feedback) {

                feedback.textContent =
                    "Masih ada langkah yang keliru. Hapus pilihan yang salah lalu coba lagi.";

                feedback.style.color =
                    "#9b4d3f";

            }


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
                    "dragging"
                );

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
            getNumber("hudXp") +
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
            getNumber("hudBasa") +
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


    /*
     * Pastikan screen pertama yang aktif
     * adalah opening.
     */

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