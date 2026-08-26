/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 04 — KALI LOGAWA
   APP.JS
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

        const question =
            quizQuestions[quizIndex];

        if (!question) {
            return;
        }

        quizAnswered = false;


        if (quizQuestion) {

            quizQuestion.textContent =
                question.question;

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

            const progress =
                (
                    (quizIndex + 1) /
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
            (button, index) => {

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
                        question.answers[index];

                }


                button.dataset.answer =
                    question.answers[index];

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

                    if (quizAnswered) {
                        return;
                    }

                    quizAnswered = true;


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


                        if (correctButton) {

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

        quizIndex = 0;

        renderQuiz();

    }


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
       DRAG & DROP GAME
       ===================================================== */

    const dropzone =
        document.getElementById(
            "sayembaraDropzone"
        );


    const feedback =
        document.getElementById(
            "sayembaraFeedback"
        );


    const nextButton =
        document.getElementById(
            "btnNextSayembara"
        );


    const optionButtons = [
        ...document.querySelectorAll(
            "#story-sayembara .sayembara-option"
        )
    ];


    /* =====================================================
       JAWABAN YANG BENAR
       ===================================================== */

    const correctSteps =
        new Set([
            "tiba",
            "upacara",
            "amati",
            "ciptoroso"
        ]);


    /* =====================================================
       DATA PILIHAN
       ===================================================== */

    const stepLabels = {

        tiba:
            "Tiba di Kali Logawa",

        upacara:
            "Mengikuti Upacara",

        amati:
            "Mengamati Keadaan",

        ciptoroso:
            "Bertemu Dewi Ciptoroso",

        mahkota:
            "Memakai Mahkota Raja",

        pulang:
            "Kembali ke Pajajaran",

        tidur:
            "Tidur di Tepi Kali"

    };


    /* =====================================================
       PILIHAN YANG SUDAH MASUK
       ===================================================== */

    const selectedSteps =
        new Set();


    /* =====================================================
       DRAGGING KEY
       ===================================================== */

    let draggingKey = null;


    /* =====================================================
       LABEL
       ===================================================== */

    function getStepLabel(key) {

        return (
            stepLabels[key] ||
            key
        );

    }


    /* =====================================================
       DRAG START
       ===================================================== */

    optionButtons.forEach(
        option => {

            option.addEventListener(
                "dragstart",
                event => {

                    const key =
                        option.dataset.answer;


                    if (!key) {

                        event.preventDefault();

                        return;

                    }


                    if (
                        selectedSteps.has(key)
                    ) {

                        event.preventDefault();

                        return;

                    }


                    draggingKey =
                        key;


                    event.dataTransfer.effectAllowed =
                        "copy";


                    event.dataTransfer.setData(
                        "text/plain",
                        key
                    );


                    option.classList.add(
                        "dragging"
                    );

                }
            );


            /* =================================================
               DRAG END
               ================================================= */

            option.addEventListener(
                "dragend",
                () => {

                    option.classList.remove(
                        "dragging"
                    );

                    draggingKey =
                        null;

                }
            );


            /* =================================================
               CLICK FALLBACK
               ================================================= */

            option.addEventListener(
                "click",
                () => {

                    const key =
                        option.dataset.answer;


                    if (!key) {
                        return;
                    }


                    /*
                     * Kalau sudah dipilih,
                     * jangan ditambahkan lagi.
                     */

                    if (
                        selectedSteps.has(key)
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
    );


    /* =====================================================
       DROPZONE — DRAG OVER
       ===================================================== */

    if (dropzone) {

        dropzone.addEventListener(
            "dragover",
            event => {

                /*
                 * INI WAJIB.
                 * Tanpa preventDefault(),
                 * browser tidak mengizinkan drop.
                 */

                event.preventDefault();


                event.dataTransfer.dropEffect =
                    "copy";


                dropzone.classList.add(
                    "drag-over"
                );

            }
        );


        /* =================================================
           DROPZONE — DRAG ENTER
           ================================================= */

        dropzone.addEventListener(
            "dragenter",
            event => {

                event.preventDefault();

                dropzone.classList.add(
                    "drag-over"
                );

            }
        );


        /* =================================================
           DROPZONE — DRAG LEAVE
           ================================================= */

        dropzone.addEventListener(
            "dragleave",
            event => {

                /*
                 * Jangan langsung menghapus
                 * class ketika cursor berpindah
                 * ke elemen anak dropzone.
                 */

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


        /* =================================================
           DROPZONE — DROP
           ================================================= */

        dropzone.addEventListener(
            "drop",
            event => {

                event.preventDefault();


                dropzone.classList.remove(
                    "drag-over"
                );


                /*
                 * Ambil data dari dragstart.
                 */

                let key =
                    event.dataTransfer.getData(
                        "text/plain"
                    );


                /*
                 * Fallback kalau browser
                 * tidak mengirim data.
                 */

                if (!key) {

                    key =
                        draggingKey;

                }


                if (!key) {
                    return;
                }


                /*
                 * Cari tombol aslinya.
                 */

                const option =
                    optionButtons.find(
                        button =>
                            button.dataset.answer ===
                            key
                    );


                if (!option) {
                    return;
                }


                /*
                 * Masukkan ke dropzone.
                 */

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
         * Tidak boleh kosong.
         */

        if (!key) {
            return;
        }


        /*
         * Tidak boleh dipilih dua kali.
         */

        if (
            selectedSteps.has(key)
        ) {

            return;

        }


        /*
         * Maksimal 4 pilihan.
         */

        if (
            selectedSteps.size >= 4
        ) {

            showFeedback(
                "Kamu hanya boleh memilih 4 langkah.",
                "wrong"
            );

            return;

        }


        /*
         * Simpan pilihan.
         */

        selectedSteps.add(
            key
        );


        /*
         * Tandai tombol asal.
         */

        if (option) {

            option.classList.add(
                "used"
            );

            option.setAttribute(
                "draggable",
                "false"
            );

        }


        /*
         * Cari container item.
         */

        let holder =
            dropzone.querySelector(
                ".dropped-items"
            );


        /*
         * Kalau belum ada,
         * buat container.
         */

        if (!holder) {

            holder =
                document.createElement(
                    "div"
                );


            holder.className =
                "dropped-items";


            /*
             * Jangan menghapus
             * event listener dropzone.
             *
             * Kita hanya menghapus
             * isi visualnya.
             */

            dropzone
                .querySelectorAll(
                    ".sayembara-dropzone-placeholder"
                )
                .forEach(
                    placeholder =>
                        placeholder.remove()
                );


            dropzone.appendChild(
                holder
            );

        }


        /*
         * Buat item hasil drop.
         */

        const item =
            document.createElement(
                "button"
            );


        item.type =
            "button";


        item.className =
            "sayembara-dropped";


        item.dataset.answer =
            key;


        item.textContent =
            getStepLabel(key);


        item.title =
            "Klik untuk menghapus";


        /*
         * Kalau benar,
         * tampilkan sebagai benar.
         */

        if (
            correctSteps.has(key)
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


        /*
         * Klik item untuk menghapus.
         */

        item.addEventListener(
            "click",
            () => {

                removeDropItem(
                    key,
                    option,
                    item
                );

            }
        );


        holder.appendChild(
            item
        );


        dropzone.classList.add(
            "has-items"
        );


        /*
         * Cek hasil game.
         */

        checkDragGame();

    }


    /* =====================================================
       HAPUS ITEM DARI DROPZONE
       ===================================================== */

    function removeDropItem(
        key,
        option,
        item
    ) {

        /*
         * Hapus dari Set.
         */

        selectedSteps.delete(
            key
        );


        /*
         * Aktifkan kembali tombol.
         */

        if (option) {

            option.classList.remove(
                "used"
            );

            option.setAttribute(
                "draggable",
                "true"
            );

        }


        /*
         * Hapus item visual.
         */

        if (item) {

            item.remove();

        }


        /*
         * Kalau sudah kosong,
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
       FEEDBACK
       ===================================================== */

    function showFeedback(
        message,
        type
    ) {

        if (!feedback) {
            return;
        }


        feedback.textContent =
            message;


        feedback.classList.remove(
            "correct",
            "wrong",
            "show"
        );


        feedback.classList.add(
            type
        );


        requestAnimationFrame(
            () => {

                feedback.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       CEK GAME
       ===================================================== */

    function checkDragGame() {

        const values =
            [...selectedSteps];


        /*
         * BELUM 4.
         */

        if (
            values.length < 4
        ) {

            showFeedback(
                `Pilih ${
                    4 - values.length
                } langkah lagi.`,
                "wrong"
            );


            if (nextButton) {

                nextButton.disabled =
                    true;

                nextButton.classList.remove(
                    "ready"
                );

            }

            return;

        }


        /*
         * Sudah 4.
         * Sekarang cek semuanya.
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

            showFeedback(
                "Benar! Kamu memahami peristiwa penting di Kali Logawa.",
                "correct"
            );


            /*
             * Tandai semua item benar.
             */

            dropzone
                .querySelectorAll(
                    ".sayembara-dropped"
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


            if (nextButton) {

                nextButton.disabled =
                    false;

                nextButton.classList.add(
                    "ready"
                );

            }

        }

        else {

            showFeedback(
                "Masih ada langkah yang keliru. Hapus pilihan yang salah lalu coba lagi.",
                "wrong"
            );


            if (nextButton) {

                nextButton.disabled =
                    true;

                nextButton.classList.remove(
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


        /*
         * Hanya reset isi visual.
         */

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

        /*
         * Kosongkan data pilihan.
         */

        selectedSteps.clear();


        /*
         * Reset feedback.
         */

        if (feedback) {

            feedback.textContent =
                "";

            feedback.classList.remove(
                "correct",
                "wrong",
                "show"
            );

        }


        /*
         * Reset tombol lanjut.
         */

        if (nextButton) {

            nextButton.disabled =
                true;

            nextButton.classList.remove(
                "ready"
            );

        }


        /*
         * Reset semua tombol pilihan.
         */

        optionButtons.forEach(
            option => {

                option.classList.remove(
                    "used",
                    "dragging"
                );


                option.setAttribute(
                    "draggable",
                    "true"
                );

            }
        );


        /*
         * Reset dropzone.
         */

        resetDropzoneVisual();

    }


    /* =====================================================
       SCREEN 07 → SCREEN 08
       ===================================================== */

    safeClick(
        "btnNextSayembara",
        () => {

            /*
             * Harus tepat 4.
             */

            if (
                selectedSteps.size !== 4
            ) {

                return;

            }


            /*
             * Cek semua benar.
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


            if (!allCorrect) {

                checkDragGame();

                return;

            }


            /*
             * Reward.
             */

            updateReward(
                50,
                10
            );


            /*
             * Tandai chapter 04 selesai.
             */

            if (
                typeof completeChapter ===
                "function"
            ) {

                completeChapter(4);

            }

            else {

                console.warn(
                    "completeChapter() tidak ditemukan."
                );

            }


            /*
             * Masuk screen selesai.
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


        return (
            Number(
                element.textContent
            ) || 0
        );

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

        addXp(xp);

        addBasa(basa);


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
     * Pastikan hanya opening
     * yang aktif saat halaman dibuka.
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