/* =========================================================
   CATATAN — SISTEM LEVEL
   TERHUBUNG DENGAN PROGRESS PETA
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT
       ===================================================== */

    const cards =
        document.querySelectorAll(".catatan-card");

    const tabs =
        document.querySelectorAll(".catatan-tab");

    const empty =
        document.getElementById("catatanEmpty");

    const levelText =
        document.getElementById("catatanLevel");

    const progressFill =
        document.getElementById("catatanProgressFill");

    const progressText =
        document.getElementById("catatanProgressText");


    /* =====================================================
       STORAGE PETA
       ===================================================== */

    const MAP_PROGRESS_KEY =
        "lelanaKamandakaProgress";


    /* =====================================================
       DATA CATATAN
       ===================================================== */

    const catatanData = {

        /* =================================================
           TOKOH
           ================================================= */

        "tokoh-1": {
            number: "01",
            title: "Raden Kamandaka",
            description:
                "Pemuda dari Pajajaran yang menjadi tokoh utama dalam perjalanan Lelana Kamandaka."
        },

        "tokoh-2": {
            number: "02",
            title: "Ki Ajar Winarong",
            description:
                "Tokoh yang ditemui Kamandaka dalam perjalanan dan memberikan petunjuk penting untuk melanjutkan pengembaraan."
        },


        /* =================================================
           TEMPAT
           ================================================= */

        "tempat-2": {
            number: "03",
            title: "Pasir Luhur",
            description:
                "Pasir Luhur menjadi salah satu tempat penting yang didatangi Kamandaka dalam perjalanan Lelana."
        },

        "tempat-3": {
            number: "04",
            title: "Kali Logawa",
            description:
                "Kali Logawa menjadi bagian dari perjalanan Kamandaka sebelum melanjutkan langkahnya menuju tempat berikutnya."
        },

        "tempat-4": {
            number: "05",
            title: "Desa Panagih",
            description:
                "Desa Panagih menjadi salah satu persinggahan dalam perjalanan Kamandaka."
        },


        /* =================================================
           BUDAYA
           ================================================= */

        "budaya-5": {
            number: "06",
            title: "Budaya Banyumas",
            description:
                "Perjalanan Kamandaka memperkenalkan berbagai unsur budaya dan kehidupan masyarakat yang ditemuinya."
        },

        "budaya-6": {
            number: "07",
            title: "Jejak Budaya",
            description:
                "Berbagai jejak budaya menjadi bagian dari pengetahuan yang ditemukan sepanjang perjalanan."
        },


        /* =================================================
           BASA
           ================================================= */

        "basa-2": {
            number: "08",
            title: "Basa Jawa",
            description:
                "Kosakata dan ungkapan Basa Jawa yang ditemukan Kamandaka selama perjalanan."
        },

        "basa-3": {
            number: "09",
            title: "Unggah-Ungguh Basa",
            description:
                "Penggunaan bahasa yang sesuai dengan situasi dan lawan bicara menjadi bagian penting dalam perjalanan."
        },


        /* =================================================
           CERITA
           ================================================= */

        "cerita-1": {
            number: "10",
            title: "Awal Perjalanan",
            description:
                "Perjalanan Kamandaka dimulai dari Pajajaran ketika ia meninggalkan kehidupan lamanya untuk menjalani pengembaraan."
        },

        "cerita-2": {
            number: "11",
            title: "Pertemuan dengan Ki Ajar",
            description:
                "Pertemuan dengan Ki Ajar Winarong menjadi bagian penting dalam perjalanan Kamandaka."
        }

    };


    /* =====================================================
       AMBIL LEVEL DARI PETA
       ===================================================== */

    function getCurrentLevel() {

        try {

            const savedProgress =
                sessionStorage.getItem(
                    MAP_PROGRESS_KEY
                );


            /*
             * Kalau belum ada progress,
             * mulai dari Level 1.
             */

            if (!savedProgress) {

                return 1;

            }


            const progress =
                JSON.parse(savedProgress);


            /*
             * Peta menggunakan currentChapter
             * sebagai posisi perjalanan.
             */

            let level =
                parseInt(
                    progress.currentChapter
                );


            if (isNaN(level)) {

                level = 1;

            }


            /*
             * Batas Level 1–10
             */

            level =
                Math.max(
                    1,
                    Math.min(level, 10)
                );


            return level;

        }

        catch (error) {

            console.warn(
                "Gagal membaca progress peta:",
                error
            );

            return 1;

        }

    }


    /* =====================================================
       LEVEL SAAT INI
       ===================================================== */

    let currentLevel =
        getCurrentLevel();


    /* =====================================================
       UPDATE INFORMASI LEVEL
       ===================================================== */

    function updateLevel() {

        if (levelText) {

            levelText.textContent =
                `LEVEL ${String(currentLevel).padStart(2, "0")} / 10`;

        }


        if (progressFill) {

            const percentage =
                (currentLevel / 10) * 100;

            progressFill.style.width =
                `${percentage}%`;

        }


        if (progressText) {

            if (currentLevel >= 10) {

                progressText.textContent =
                    "Seluruh catatan perjalanan telah ditemukan.";

            }

            else {

                const nextLevel =
                    currentLevel + 1;

                progressText.textContent =
                    `Lanjutkan perjalanan menuju Level ${String(nextLevel).padStart(2, "0")} untuk menemukan catatan baru.`;

            }

        }

    }


    /* =====================================================
       MEMBUAT ISI CATATAN
       ===================================================== */

    function createCardContent(
        card,
        data
    ) {

        /*
         * Kalau isi sudah dibuat,
         * jangan dibuat lagi.
         */

        if (
            card.querySelector(
                ".catatan-card-content"
            )
        ) {

            return;

        }


        /* Nomor */

        const number =
            document.createElement("div");

        number.className =
            "catatan-card-number";

        number.textContent =
            data.number;


        /* Content */

        const content =
            document.createElement("div");

        content.className =
            "catatan-card-content";


        /* Category */

        const category =
            document.createElement("span");

        category.className =
            "catatan-card-category";

        category.textContent =
            card.dataset.category.toUpperCase();


        /* Title */

        const title =
            document.createElement("h3");

        title.textContent =
            data.title;


        /* Description */

        const description =
            document.createElement("p");

        description.textContent =
            data.description;


        /* Status */

        const status =
            document.createElement("div");

        status.className =
            "catatan-card-status";

        status.textContent =
            "TERBUKA";


        /* Masukkan ke content */

        content.appendChild(category);

        content.appendChild(title);

        content.appendChild(description);

        content.appendChild(status);


        /* Masukkan ke card */

        card.appendChild(number);

        card.appendChild(content);

    }


    /* =====================================================
       BUKA / KUNCI CARD
       ===================================================== */

    function updateCards() {

        cards.forEach(card => {

            const requiredLevel =
                parseInt(
                    card.dataset.level
                ) || 1;


            const category =
                card.dataset.category;


            /*
             * Buat ID data.
             *
             * Contoh:
             *
             * tokoh + 2
             * menjadi:
             * tokoh-2
             */

            const dataKey =
                `${category}-${requiredLevel}`;


            const data =
                catatanData[dataKey];


            /* =============================================
               LEVEL SUDAH DICAPAI
               ============================================= */

            if (
                currentLevel >=
                requiredLevel
            ) {

                card.classList.remove(
                    "locked"
                );


                /*
                 * Hapus gembok
                 */

                const lock =
                    card.querySelector(
                        ".catatan-lock"
                    );

                if (lock) {

                    lock.remove();

                }


                /*
                 * Kalau ada data catatan,
                 * masukkan isi catatan.
                 */

                if (data) {

                    createCardContent(
                        card,
                        data
                    );

                }

            }


            /* =============================================
               LEVEL BELUM DICAPAI
               ============================================= */

            else {

                card.classList.add(
                    "locked"
                );

            }

        });

    }


    /* =====================================================
       FILTER
       ===================================================== */

    function filterCards(category) {

        let visibleCards = 0;


        cards.forEach(card => {

            const cardCategory =
                card.dataset.category;


            const match =
                category === "semua" ||
                category === cardCategory;


            if (match) {

                card.style.display = "";

                visibleCards++;

            }

            else {

                card.style.display =
                    "none";

            }

        });


        if (empty) {

            empty.classList.toggle(
                "show",
                visibleCards === 0
            );

        }


        tabs.forEach(tab => {

            const active =
                tab.dataset.category ===
                category;


            tab.classList.toggle(
                "active",
                active
            );


            tab.setAttribute(
                "aria-selected",
                active
                    ? "true"
                    : "false"
            );

        });

    }


    /* =====================================================
       EVENT TAB
       ===================================================== */

    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                filterCards(
                    tab.dataset.category
                );

            }
        );

    });


    /* =====================================================
       INITIAL
       ===================================================== */

    updateLevel();

    updateCards();

    filterCards("semua");


    /* =====================================================
       AUTO UPDATE
       ===================================================== */

    setInterval(() => {

        const newLevel =
            getCurrentLevel();


        if (
            newLevel !==
            currentLevel
        ) {

            currentLevel =
                newLevel;

            updateLevel();

            updateCards();

        }

    }, 1000);

});