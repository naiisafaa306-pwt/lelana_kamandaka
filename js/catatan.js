/* =========================================================
   LELANA KAMANDAKA
   CATATAN.JS
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

const MAP_PROGRESS_KEY =
    "lelanaKamandakaProgress";


/* =========================================================
   DEFAULT PROGRESS
   ========================================================= */

const defaultProgress = {

    currentChapter: 1,

    totalChapters: 10,

    xp: 0,

    basa: 0,

    quizCompleted: false,

    sayembaraCompleted: false,

    completedChapters: [],

    completedLocations: [],

    unlockedLocations: [1]

};


/* =========================================================
   AMBIL PROGRESS
   ========================================================= */

function getGameProgress() {

    let savedProgress = null;


    try {

        const saved =
            localStorage.getItem(
                MAP_PROGRESS_KEY
            );


        if (saved) {

            savedProgress =
                JSON.parse(saved);

        }

    }

    catch (error) {

        console.error(
            "Gagal membaca progress:",
            error
        );

    }


    const progress = {

        ...defaultProgress,

        ...(savedProgress || {})

    };


    /*
     * Pastikan array tidak rusak.
     */

    if (
        !Array.isArray(
            progress.unlockedLocations
        )
    ) {

        progress.unlockedLocations =
            [1];

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
            progress.completedChapters
        )
    ) {

        progress.completedChapters =
            [];

    }


    /*
     * LOKASI 01 SELALU TERBUKA.
     */

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


/* =========================================================
   ELEMENT
   ========================================================= */

const catatanGrid =
    document.getElementById(
        "catatanGrid"
    );


const catatanEmpty =
    document.getElementById(
        "catatanEmpty"
    );


const catatanSectionTitle =
    document.getElementById(
        "catatanSectionTitle"
    );


const catatanTabs =
    document.querySelectorAll(
        ".catatan-tab"
    );


/* =========================================================
   KATEGORI AKTIF
   ========================================================= */

let activeCategory =
    "semua";


/* =========================================================
   TENTUKAN LEVEL CATATAN
   =========================================================

   Setiap kartu catatan mempunyai nomor.

   Kartu 01–02:
   Terbuka sejak lokasi 01.

   Kartu 03–04:
   Terbuka sejak lokasi 02.

   Kartu 05–06:
   Terbuka sejak lokasi 03.

   Kartu 07–08:
   Terbuka sejak lokasi 04.

   Kartu 09–10:
   Terbuka sejak lokasi 05.

   Kartu 11–12:
   Terbuka sejak lokasi 06.

   Kartu 13:
   Terbuka sejak lokasi 07.

   Kartu 14:
   Terbuka sejak lokasi 08.

   Jadi semakin jauh perjalanan,
   semakin banyak catatan yang muncul.
   ========================================================= */

function getRequiredLocation(
    cardNumber
) {

    if (
        cardNumber <= 2
    ) {

        return 1;

    }


    if (
        cardNumber <= 4
    ) {

        return 2;

    }


    if (
        cardNumber <= 6
    ) {

        return 3;

    }


    if (
        cardNumber <= 8
    ) {

        return 4;

    }


    if (
        cardNumber <= 10
    ) {

        return 5;

    }


    if (
        cardNumber <= 12
    ) {

        return 6;

    }


    if (
        cardNumber === 13
    ) {

        return 7;

    }


    return 8;

}


/* =========================================================
   CEK CATATAN TERBUKA
   ========================================================= */

function isCatatanUnlocked(
    cardNumber,
    progress
) {

    const requiredLocation =
        getRequiredLocation(
            cardNumber
        );


    return progress
        .unlockedLocations
        .includes(
            requiredLocation
        );

}


/* =========================================================
   CEK CATATAN SELESAI
   ========================================================= */

function isCatatanCompleted(
    cardNumber,
    progress
) {

    const requiredLocation =
        getRequiredLocation(
            cardNumber
        );


    return progress
        .completedLocations
        .includes(
            requiredLocation
        );

}


/* =========================================================
   BUAT NOMOR KARTU
   ========================================================= */

function getCardNumber(
    card
) {

    const numberElement =
        card.querySelector(
            ".catatan-card-number"
        );


    if (!numberElement) {

        return 0;

    }


    const number =
        parseInt(
            numberElement.textContent.trim(),
            10
        );


    return Number.isNaN(
        number
    )
        ? 0
        : number;

}


/* =========================================================
   AMBIL NAMA CATATAN
   ========================================================= */

function getCardTitle(
    card
) {

    const title =
        card.querySelector(
            "h3"
        );


    return title
        ? title.textContent.trim()
        : "Catatan";

}


/* =========================================================
   BERSIHKAN STATUS LAMA
   ========================================================= */

function removeOldLock(
    card
) {

    card.classList.remove(
        "catatan-card-locked",
        "catatan-card-unlocked",
        "catatan-card-completed"
    );


    const oldLock =
        card.querySelector(
            ".catatan-lock-overlay"
        );


    if (oldLock) {

        oldLock.remove();

    }


    const oldStatus =
        card.querySelector(
            ".catatan-card-status"
        );


    if (oldStatus) {

        oldStatus.remove();

    }

}


/* =========================================================
   TAMBAHKAN STATUS
   ========================================================= */

function createStatus(
    text
) {

    const status =
        document.createElement(
            "span"
        );


    status.className =
        "catatan-card-status";


    status.textContent =
        text;


    return status;

}


/* =========================================================
   LOCK KARTU
   ========================================================= */

function lockCard(
    card,
    requiredLocation
) {

    removeOldLock(
        card
    );


    card.classList.add(
        "catatan-card-locked"
    );


    /*
     * Simpan judul asli.
     */

    const title =
        getCardTitle(
            card
        );


    /*
     * Sembunyikan isi asli.
     */

    const content =
        card.querySelector(
            ".catatan-card-content"
        );


    if (content) {

        /*
         * Jangan hapus HTML asli.
         * Kita hanya membuatnya tidak terlihat
         * melalui atribut.
         */

        content.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /*
     * Overlay lock.
     */

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "catatan-lock-overlay";


    overlay.innerHTML = `

        <div class="catatan-lock-icon">
            🔒
        </div>

        <span class="catatan-lock-label">
            TERKUNCI
        </span>

        <strong>
            Catatan belum ditemukan
        </strong>

        <small>
            Selesaikan perjalanan hingga
            lokasi ${String(
                requiredLocation
            ).padStart(2, "0")}
            untuk membukanya.
        </small>

    `;


    card.appendChild(
        overlay
    );


    /*
     * Status.
     */

    card.appendChild(
        createStatus(
            "TERKUNCI"
        )
    );


    /*
     * Accessibility.
     */

    card.setAttribute(
        "aria-label",
        `${title} — terkunci`
    );

}


/* =========================================================
   UNLOCK KARTU
   ========================================================= */

function unlockCard(
    card,
    completed
) {

    removeOldLock(
        card
    );


    card.classList.add(
        completed
            ? "catatan-card-completed"
            : "catatan-card-unlocked"
    );


    const content =
        card.querySelector(
            ".catatan-card-content"
        );


    if (content) {

        content.removeAttribute(
            "aria-hidden"
        );

    }


    /*
     * Status.
     */

    card.appendChild(

        createStatus(

            completed
                ? "SELESAI"
                : "TERBUKA"

        )

    );


    /*
     * Accessibility.
     */

    card.setAttribute(
        "aria-label",
        completed
            ? `${getCardTitle(card)} — selesai`
            : `${getCardTitle(card)} — terbuka`
    );

}


/* =========================================================
   UPDATE SEMUA KARTU
   ========================================================= */

function updateCatatanCards() {

    if (!catatanGrid) {

        return;

    }


    const progress =
        getGameProgress();


    const cards =
        catatanGrid.querySelectorAll(
            ".catatan-card"
        );


    cards.forEach(
        function (
            card
        ) {

            const cardNumber =
                getCardNumber(
                    card
                );


            if (!cardNumber) {

                return;

            }


            const unlocked =
                isCatatanUnlocked(
                    cardNumber,
                    progress
                );


            const completed =
                isCatatanCompleted(
                    cardNumber,
                    progress
                );


            if (unlocked) {

                unlockCard(
                    card,
                    completed
                );

            }

            else {

                lockCard(
                    card,
                    getRequiredLocation(
                        cardNumber
                    )
                );

            }

        }
    );


    filterCards(
        activeCategory
    );

}


/* =========================================================
   FILTER
   ========================================================= */

function filterCards(
    category
) {

    if (!catatanGrid) {

        return;

    }


    const cards =
        catatanGrid.querySelectorAll(
            ".catatan-card"
        );


    let visibleCount =
        0;


    cards.forEach(
        function (
            card
        ) {

            const cardCategory =
                card.dataset.category;


            const match =
                category === "semua" ||
                cardCategory === category;


            if (match) {

                card.style.display =
                    "";

                visibleCount++;

            }

            else {

                card.style.display =
                    "none";

            }

        }
    );


    /*
     * Empty hanya muncul kalau
     * kategori memang tidak punya kartu.
     */

    if (catatanEmpty) {

        catatanEmpty.style.display =
            visibleCount === 0
                ? ""
                : "none";

    }


    updateSectionTitle(
        category
    );

}


/* =========================================================
   JUDUL SECTION
   ========================================================= */

function updateSectionTitle(
    category
) {

    if (!catatanSectionTitle) {

        return;

    }


    const titles = {

        semua:
            "Catatan yang Telah Ditemukan",

        tokoh:
            "Tokoh dalam Perjalanan",

        tempat:
            "Tempat yang Telah Ditemui",

        budaya:
            "Jejak Budaya",

        basa:
            "Kosakata Basa",

        cerita:
            "Potongan Cerita"

    };


    catatanSectionTitle.textContent =
        titles[
            category
        ] ||
        titles.semua;

}


/* =========================================================
   TAB
   ========================================================= */

function activateTab(
    selectedTab
) {

    catatanTabs.forEach(
        function (
            tab
        ) {

            const isActive =
                tab === selectedTab;


            tab.classList.toggle(
                "active",
                isActive
            );


            tab.setAttribute(
                "aria-selected",
                isActive
                    ? "true"
                    : "false"
            );

        }
    );


    activeCategory =
        selectedTab.dataset.category ||
        "semua";


    filterCards(
        activeCategory
    );

}


catatanTabs.forEach(
    function (
        tab
    ) {

        tab.addEventListener(
            "click",
            function () {

                activateTab(
                    tab
                );

            }
        );

    }
);


/* =========================================================
   SINKRONISASI SAAT STORAGE BERUBAH
   ========================================================= */

window.addEventListener(
    "storage",
    function (
        event
    ) {

        if (
            event.key ===
            MAP_PROGRESS_KEY
        ) {

            updateCatatanCards();

        }

    }
);


/* =========================================================
   SINKRONISASI SAAT KEMBALI KE HALAMAN
   ========================================================= */

window.addEventListener(
    "pageshow",
    function () {

        updateCatatanCards();

    }
);


/* =========================================================
   INIT
   ========================================================= */

function initializeCatatan() {

    updateCatatanCards();


    /*
     * SEMUA sebagai default.
     */

    const defaultTab =
        document.querySelector(
            '.catatan-tab[data-category="semua"]'
        );


    if (defaultTab) {

        activateTab(
            defaultTab
        );

    }


    console.log(
        "================================"
    );

    console.log(
        "CATATAN LELANA KAMANDAKA"
    );

    console.log(
        getGameProgress()
    );

    console.log(
        "================================"
    );

}


/* =========================================================
   DOM READY
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeCatatan
    );

}

else {

    initializeCatatan();

}