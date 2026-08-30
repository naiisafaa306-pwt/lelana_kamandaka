/* =========================================================
   LELANA KAMANDAKA
   OPENING / BERANDA CONTROLLER

   ATURAN PROGRESS:
   ---------------------------------------------------------
   1. Lokasi 01 selalu TERBUKA
   2. Lokasi berikutnya terbuka jika lokasi sebelumnya SELESAI
   3. Lokasi TERKUNCI       -> icon gembok
   4. Lokasi TERBUKA        -> icon_journey
   5. Lokasi SELESAI        -> icon_journey

   SUMBER PROGRESS UTAMA:
   localStorage
   key: lelanaKamandakaProgress

   SINKRON DENGAN:
   - mapEngine.js
   - gameplay 01 - 10
   ========================================================= */


/* =========================================================
   STATE
   ========================================================= */

import { state } from "./state.js";


/* =========================================================
   STORAGE KEY
   ========================================================= */

const GAMEPLAY_PROGRESS_KEY =
    "lelanaKamandakaProgress";


/* =========================================================
   ASSET PATH
   =========================================================

   PENTING:
   opening.js berada di folder /js/

   Tetapi path asset dihitung dari halaman HTML
   yang sedang dibuka.

   Jika index.html berada di root:

   LELANA_KAMANDAKA_WEB/
   ├── index.html
   ├── js/
   │   └── opening.js
   └── assets/
       ├── icons/
       │   └── icon_journey.png
       └── map/
           └── gembok.png

   Maka path yang BENAR adalah:

   assets/icons/icon_journey.png
   assets/map/gembok.png

   BUKAN ../assets/...
   ========================================================= */

const JOURNEY_ICON =
    "assets/icons/icon_journey.png";

const LOCK_ICON =
    "assets/map/gembok.png";


/* =========================================================
   DATA LOKASI
   ========================================================= */

const LOCATIONS = [

    {
        id: 1,
        name: "Pajajaran",
        gameplay: "gameplay/gameplay01/index.html",
        image: "assets/backgrounds/pajajaran.png"
    },

    {
        id: 2,
        name: "Ki Ajar Winarong",
        gameplay: "gameplay/gameplay02/index.html",
        image: "assets/backgrounds/ki_ajar_winarong.png"
    },

    {
        id: 3,
        name: "Pasir Luhur",
        gameplay: "gameplay/gameplay03/index.html",
        image: "assets/backgrounds/pasir_luhur.png"
    },

    {
        id: 4,
        name: "Kali Logawa",
        gameplay: "gameplay/gameplay04/index.html",
        image: "assets/backgrounds/kali_logawa.png"
    },

    {
        id: 5,
        name: "Desa Panagih",
        gameplay: "gameplay/gameplay05/index.html",
        image: "assets/backgrounds/desa_panagih.png"
    },

    {
        id: 6,
        name: "Goa Jatijajar",
        gameplay: "gameplay/gameplay06/index.html",
        image: "assets/backgrounds/goa_jatijajar.png"
    },

    {
        id: 7,
        name: "Batur Agung",
        gameplay: "gameplay/gameplay07/index.html",
        image: "assets/backgrounds/batur_agung.png"
    },

    {
        id: 8,
        name: "Sawangan",
        gameplay: "gameplay/gameplay08/index.html",
        image: "assets/backgrounds/sawangan.png"
    },

    {
        id: 9,
        name: "Kali Serayu",
        gameplay: "gameplay/gameplay09/index.html",
        image: "assets/backgrounds/kali_serayu.png"
    },

    {
        id: 10,
        name: "Desa Rosari",
        gameplay: "gameplay/gameplay10/index.html",
        image: "assets/backgrounds/desa_rosari.png"
    }

];


/* =========================================================
   ROUTE
   ========================================================= */

const INTRO_ROUTE =
    "intro/intro.html";


const FIRST_GAMEPLAY_ROUTE =
    "gameplay/gameplay01/index.html";


/* =========================================================
   DEFAULT PROGRESS
   ========================================================= */

const DEFAULT_PROGRESS = {

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
   NORMALIZE ID
   ========================================================= */

function normalizeId(value) {

    const number =
        Number(value);


    if (
        Number.isFinite(number) &&
        number >= 1 &&
        number <= LOCATIONS.length
    ) {

        return number;

    }


    return null;

}


/* =========================================================
   NORMALIZE ARRAY
   ========================================================= */

function normalizeIdArray(array) {

    if (!Array.isArray(array)) {

        return [];

    }


    return [

        ...new Set(

            array
                .map(normalizeId)
                .filter(
                    value =>
                        value !== null
                )

        )

    ].sort(
        (a, b) =>
            a - b
    );

}


/* =========================================================
   READ GAMEPLAY PROGRESS
   ========================================================= */

function getGameplayProgress() {

    try {

        const saved =
            localStorage.getItem(
                GAMEPLAY_PROGRESS_KEY
            );


        /*
           BELUM ADA PROGRESS
        */

        if (!saved) {

            return {

                ...DEFAULT_PROGRESS,

                completedLocations: [],

                completedChapters: [],

                unlockedLocations: [1]

            };

        }


        const parsed =
            JSON.parse(saved);


        /*
           DATA TIDAK VALID
        */

        if (
            !parsed ||
            typeof parsed !== "object"
        ) {

            return {

                ...DEFAULT_PROGRESS,

                completedLocations: [],

                completedChapters: [],

                unlockedLocations: [1]

            };

        }


        /*
           GABUNGKAN DENGAN DEFAULT
        */

        const progress = {

            ...DEFAULT_PROGRESS,

            ...parsed

        };


        /* =====================================================
           NORMALIZE COMPLETED LOCATIONS
           ===================================================== */

        progress.completedLocations =
            normalizeIdArray(
                progress.completedLocations
            );


        /* =====================================================
           NORMALIZE COMPLETED CHAPTERS
           ===================================================== */

        progress.completedChapters =
            normalizeIdArray(
                progress.completedChapters
            );


        /* =====================================================
           CHAPTER SELESAI = LOKASI SELESAI
           ===================================================== */

        progress.completedChapters.forEach(
            chapterId => {

                if (
                    !progress.completedLocations.includes(
                        chapterId
                    )
                ) {

                    progress.completedLocations.push(
                        chapterId
                    );

                }

            }
        );


        progress.completedLocations =
            normalizeIdArray(
                progress.completedLocations
            );


        /* =====================================================
           HITUNG UNLOCK SECARA BERURUTAN
           =====================================================

           Lokasi 01 selalu terbuka.

           Jika 01 selesai:
           02 terbuka.

           Jika 02 selesai:
           03 terbuka.

           dst.
           ===================================================== */

        const unlocked =
            [1];


        for (
            let locationId = 2;
            locationId <= LOCATIONS.length;
            locationId++
        ) {

            const previousLocation =
                locationId - 1;


            const previousCompleted =
                progress.completedLocations.includes(
                    previousLocation
                );


            if (previousCompleted) {

                unlocked.push(
                    locationId
                );

            }

            else {

                /*
                   Berhenti di lokasi pertama
                   yang belum terbuka.
                */

                break;

            }

        }


        progress.unlockedLocations =
            unlocked;


        /* =====================================================
           HITUNG CURRENT CHAPTER
           ===================================================== */

        if (
            progress.completedLocations.length === 0
        ) {

            progress.currentChapter =
                1;

        }

        else {

            /*
               Cari lokasi selesai tertinggi.
            */

            const highestCompleted =
                Math.max(
                    ...progress.completedLocations
                );


            if (
                highestCompleted >=
                LOCATIONS.length
            ) {

                progress.currentChapter =
                    LOCATIONS.length;

            }

            else {

                progress.currentChapter =
                    highestCompleted + 1;

            }

        }


        return progress;

    }

    catch (error) {

        console.warn(
            "Progress gameplay tidak dapat dibaca:",
            error
        );


        return {

            ...DEFAULT_PROGRESS,

            completedLocations: [],

            completedChapters: [],

            unlockedLocations: [1]

        };

    }

}


/* =========================================================
   GET COMPLETED LOCATIONS
   ========================================================= */

function getCompletedLocations() {

    const progress =
        getGameplayProgress();


    return progress.completedLocations;

}


/* =========================================================
   GET UNLOCKED LOCATIONS
   ========================================================= */

function getUnlockedLocations() {

    const progress =
        getGameplayProgress();


    return progress.unlockedLocations;

}


/* =========================================================
   GET ACTIVE LOCATION ID
   ========================================================= */

function getActiveLocationId() {

    const progress =
        getGameplayProgress();


    const completed =
        progress.completedLocations;


    /*
       BELUM ADA YANG SELESAI
       → LOKASI 01 AKTIF
    */

    if (
        completed.length === 0
    ) {

        return 1;

    }


    const highestCompleted =
        Math.max(
            ...completed
        );


    /*
       SEMUA SELESAI
       → tetap lokasi 10
    */

    if (
        highestCompleted >=
        LOCATIONS.length
    ) {

        return LOCATIONS.length;

    }


    /*
       Lokasi berikutnya menjadi aktif.
    */

    return highestCompleted + 1;

}


/* =========================================================
   GET ACTIVE LOCATION
   ========================================================= */

function getActiveLocation() {

    const activeId =
        getActiveLocationId();


    return LOCATIONS.find(
        location =>
            location.id === activeId
    );

}


/* =========================================================
   LOCATION COMPLETED
   ========================================================= */

function isLocationCompleted(
    locationId
) {

    const id =
        normalizeId(locationId);


    if (!id) {

        return false;

    }


    const progress =
        getGameplayProgress();


    return progress.completedLocations.includes(
        id
    );

}


/* =========================================================
   LOCATION UNLOCKED
   ========================================================= */

function isLocationUnlocked(
    locationId
) {

    const id =
        normalizeId(locationId);


    if (!id) {

        return false;

    }


    /*
       LOKASI 01 SELALU TERBUKA
    */

    if (
        id === 1
    ) {

        return true;

    }


    /*
       Lokasi berikutnya terbuka
       jika lokasi sebelumnya selesai.
    */

    return isLocationCompleted(
        id - 1
    );

}


/* =========================================================
   LOCATION STATUS
   ========================================================= */

function getLocationStatus(
    locationId
) {

    /*
       SELESAI
    */

    if (
        isLocationCompleted(
            locationId
        )
    ) {

        return "done";

    }


    /*
       SUDAH TERBUKA
       tetapi belum selesai.
    */

    if (
        isLocationUnlocked(
            locationId
        )
    ) {

        return "active";

    }


    /*
       BELUM TERBUKA
    */

    return "locked";

}


/* =========================================================
   SET JOURNEY ICON
   ========================================================= */

function setJourneyIcon(
    image,
    node,
    status
) {

    if (!image || !node) {

        return;

    }


    /*
       =====================================================
       DONE
       =====================================================

       Sudah selesai:
       icon_journey
       ===================================================== */

    if (
        status === "done"
    ) {

        image.src =
            JOURNEY_ICON;

        image.alt =
            "Lokasi selesai";

        image.style.opacity =
            "1";

        node.style.opacity =
            "1";

        node.setAttribute(
            "aria-label",
            "Lokasi selesai"
        );

        return;

    }


    /*
       =====================================================
       ACTIVE
       =====================================================

       Sudah terbuka:
       icon_journey
       ===================================================== */

    if (
        status === "active"
    ) {

        image.src =
            JOURNEY_ICON;

        image.alt =
            "Lokasi terbuka";

        image.style.opacity =
            "1";

        node.style.opacity =
            "1";

        node.setAttribute(
            "aria-label",
            "Lokasi terbuka"
        );

        return;

    }


    /*
       =====================================================
       LOCKED
       =====================================================

       Belum terbuka:
       gembok
       ===================================================== */

    image.src =
        LOCK_ICON;

    image.alt =
        "Lokasi terkunci";

    image.style.opacity =
        "0.55";

    node.style.opacity =
        "0.65";

    node.setAttribute(
        "aria-label",
        "Lokasi terkunci"
    );

}


/* =========================================================
   UPDATE JOURNEY
   ========================================================= */

function updateJourney() {

    const locations =
        document.querySelectorAll(
            ".lk-location"
        );


    locations.forEach(
        (locationElement, index) => {

            const locationId =
                index + 1;


            const status =
                getLocationStatus(
                    locationId
                );


            /* =================================================
               HAPUS STATUS LAMA
               ================================================= */

            locationElement.classList.remove(
                "active",
                "done",
                "locked"
            );


            /* =================================================
               PASANG STATUS BARU
               ================================================= */

            locationElement.classList.add(
                status
            );


            /* =================================================
               STATUS TEXT
               ================================================= */

            const statusText =
                locationElement.querySelector(
                    "small"
                );


            if (statusText) {

                if (
                    status === "done"
                ) {

                    statusText.textContent =
                        "✓ Selesai";

                }

                else if (
                    status === "active"
                ) {

                    statusText.textContent =
                        "Aktif";

                }

                else {

                    statusText.textContent =
                        "Terkunci";

                }

            }


            /* =================================================
               NODE
               ================================================= */

            const node =
                locationElement.querySelector(
                    ".lk-node"
                );


            if (!node) {

                return;

            }


            /* =================================================
               ICON
               ================================================= */

            const image =
                node.querySelector(
                    "img"
                );


            /*
               Kalau ada <img>, ubah icon
               berdasarkan status.
            */

            if (image) {

                setJourneyIcon(
                    image,
                    node,
                    status
                );

            }


            /*
               Kalau tidak ada img,
               tetap atur opacity node.
            */

            else {

                if (
                    status === "locked"
                ) {

                    node.style.opacity =
                        "0.65";

                }

                else {

                    node.style.opacity =
                        "1";

                }

            }

        }
    );

}


/* =========================================================
   UPDATE LOCATION NUMBERS
   ========================================================= */

function updateLocationNumbers() {

    const numbers =
        document.querySelectorAll(
            ".lk-location-number"
        );


    numbers.forEach(
        (numberElement, index) => {

            const locationId =
                index + 1;


            const status =
                getLocationStatus(
                    locationId
                );


            numberElement.classList.remove(
                "active",
                "done",
                "locked"
            );


            numberElement.classList.add(
                status
            );

        }
    );

}


/* =========================================================
   UPDATE ACTIVE LOCATION
   ========================================================= */

function updateActiveLocation() {

    const activeLocation =
        getActiveLocation();


    if (!activeLocation) {

        return;

    }


    /* =====================================================
       NAMA LOKASI
       ===================================================== */

    const title =
        document.querySelector(
            "#activeLocationName"
        );


    if (title) {

        title.textContent =
            activeLocation.name;

    }


    /* =====================================================
       GAMBAR LOKASI
       ===================================================== */

    const image =
        document.querySelector(
            "#activeLocationImage"
        );


    if (
        image &&
        activeLocation.image
    ) {

        image.src =
            activeLocation.image;

        image.alt =
            activeLocation.name;

    }


    /* =====================================================
       TOMBOL MAIN SEKARANG
       ===================================================== */

    const button =
        document.querySelector(
            "#activeLocationButton"
        );


    if (button) {

        button.href =
            activeLocation.gameplay;

        button.dataset.location =
            activeLocation.id;

    }

}


/* =========================================================
   UPDATE PROGRESS TITLE
   ========================================================= */

function updateProgressTitle() {

    const progress =
        getGameplayProgress();


    const completedCount =
        progress.completedLocations.length;


    const total =
        LOCATIONS.length;


    const element =
        document.querySelector(
            "#locationProgressText"
        );


    if (element) {

        element.textContent =
            `${completedCount} / ${total} Lokasi Selesai`;

    }

}


/* =========================================================
   UPDATE XP
   ========================================================= */

function updateXP() {

    const progress =
        getGameplayProgress();


    const totalXP =
        Number(
            progress.xp || 0
        );


    const maxXP =
        1000;


    const percentage =
        Math.min(
            (totalXP / maxXP) * 100,
            100
        );


    /* =====================================================
       NAVBAR XP BAR
       ===================================================== */

    const navbarBar =
        document.querySelector(
            "#playerXpBar"
        );


    if (navbarBar) {

        navbarBar.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       STATUS XP BAR
       ===================================================== */

    const statusBar =
        document.querySelector(
            "#statusXpBar"
        );


    if (statusBar) {

        statusBar.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       XP TEXT ATAS
       ===================================================== */

    const xpTop =
        document.querySelector(
            "#playerXpTop"
        );


    if (xpTop) {

        xpTop.textContent =
            `${totalXP} XP`;

    }


    /* =====================================================
       XP TEXT BAWAH
       ===================================================== */

    const xpBottom =
        document.querySelector(
            "#playerXpBottom"
        );


    if (xpBottom) {

        xpBottom.textContent =
            `${totalXP.toLocaleString("id-ID")} / 1.000 XP`;

    }


    /* =====================================================
       STATUS XP
       ===================================================== */

    const statusXP =
        document.querySelector(
            "#statusXpText"
        );


    if (statusXP) {

        statusXP.textContent =
            `${totalXP.toLocaleString("id-ID")} / 1.000 XP`;

    }


    /* =====================================================
       HOME XP
       ===================================================== */

    const homeXP =
        document.querySelector(
            "#homeXp"
        );


    if (homeXP) {

        homeXP.textContent =
            totalXP;

    }

}


/* =========================================================
   UPDATE LEVEL
   ========================================================= */

function updateLevel() {

    const progress =
        getGameplayProgress();


    const totalXP =
        Number(
            progress.xp || 0
        );


    /*
       0 - 299     = Level 01
       300 - 599   = Level 02
       600 - 899   = Level 03
       dst.
    */

    const level =
        Math.min(
            Math.floor(
                totalXP / 300
            ) + 1,
            10
        );


    const levelText =
        String(level)
            .padStart(
                2,
                "0"
            );


    /* =====================================================
       NAVBAR
       ===================================================== */

    const navbarLevel =
        document.querySelector(
            "#playerLevel"
        );


    if (navbarLevel) {

        navbarLevel.textContent =
            `Level ${levelText}`;

    }


    /* =====================================================
       STATUS
       ===================================================== */

    const statusLevel =
        document.querySelector(
            "#statusLevel"
        );


    if (statusLevel) {

        statusLevel.textContent =
            levelText;

    }

}


/* =========================================================
   UPDATE HOME PROGRESS
   ========================================================= */

function updateHomeProgress() {

    const progress =
        getGameplayProgress();


    const completedCount =
        progress.completedLocations.length;


    const total =
        LOCATIONS.length;


    /* =====================================================
       CURRENT NUMBER
       ===================================================== */

    const current =
        document.querySelector(
            "#homeProgressCurrent"
        );


    if (current) {

        current.textContent =
            String(
                completedCount
            ).padStart(
                2,
                "0"
            );

    }


    /* =====================================================
       PROGRESS BAR
       ===================================================== */

    const fill =
        document.querySelector(
            "#homeProgressFill"
        );


    if (fill) {

        const percentage =
            Math.min(
                (
                    completedCount /
                    total
                ) * 100,
                100
            );


        fill.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       TEXT
       ===================================================== */

    const text =
        document.querySelector(
            "#homeProgressText"
        );


    const activeLocation =
        getActiveLocation();


    if (
        text &&
        activeLocation
    ) {

        if (
            completedCount >= total
        ) {

            text.textContent =
                "Kabeh lokasi wis rampung";

        }

        else {

            text.textContent =
                `${activeLocation.name} terbuka`;

        }

    }

}


/* =========================================================
   UPDATE HOME STATS
   ========================================================= */

function updateHomeStats() {

    const progress =
        getGameplayProgress();


    /* =====================================================
       XP
       ===================================================== */

    const xp =
        document.querySelector(
            "#homeXp"
        );


    if (xp) {

        xp.textContent =
            Number(
                progress.xp || 0
            );

    }


    /* =====================================================
       BASA
       ===================================================== */

    const basa =
        document.querySelector(
            "#homeBasa"
        );


    if (basa) {

        basa.textContent =
            Number(
                progress.basa || 0
            );

    }

}


/* =========================================================
   UPDATE ACTIVITY
   ========================================================= */

function updateActivity() {

    const progress =
        getGameplayProgress();


    const activeLocation =
        getActiveLocation();


    const completedCount =
        progress.completedLocations.length;


    /* =====================================================
       JOURNEY
       ===================================================== */

    const journeyTitle =
        document.querySelector(
            "#activityJourneyTitle"
        );


    const journeyText =
        document.querySelector(
            "#activityJourneyText"
        );


    if (
        journeyTitle &&
        journeyText
    ) {

        if (
            completedCount === 0
        ) {

            journeyTitle.textContent =
                "Perjalanan durung dimulai";

            journeyText.textContent =
                "Miwiti saka Pajajaran";

        }

        else if (
            activeLocation
        ) {

            journeyTitle.textContent =
                `Menuju ${activeLocation.name}`;

            journeyText.textContent =
                `${completedCount} lokasi telah diselesaikan`;

        }

    }


    /* =====================================================
       BASA
       ===================================================== */

    const basaTitle =
        document.querySelector(
            "#activityBasaTitle"
        );


    const basaText =
        document.querySelector(
            "#activityBasaText"
        );


    if (
        basaTitle &&
        basaText
    ) {

        const basaCount =
            Number(
                progress.basa || 0
            );


        if (
            basaCount > 0
        ) {

            basaTitle.textContent =
                `${basaCount} kosakata dikumpulkan`;

            basaText.textContent =
                "Terus sinau Basa Banyumasan";

        }

        else {

            basaTitle.textContent =
                "Durung ana kosakata anyar";

            basaText.textContent =
                "Sinau Basa Banyumasan";

        }

    }


    /* =====================================================
       ACHIEVEMENT
       ===================================================== */

    const achievementText =
        document.querySelector(
            "#activityAchievementText"
        );


    if (achievementText) {

        if (
            completedCount > 0
        ) {

            achievementText.textContent =
                `${completedCount} lokasi telah diselesaikan.`;

        }

        else {

            achievementText.textContent =
                "Progress gameplay tercatat otomatis.";

        }

    }

}


/* =========================================================
   RENDER
   ========================================================= */

function render() {

    /*
       Setiap render membaca ulang
       localStorage.

       Jadi perubahan progress dari
       gameplay akan langsung digunakan
       saat Beranda dibuka kembali.
    */

    updateJourney();

    updateLocationNumbers();

    updateActiveLocation();

    updateProgressTitle();

    updateXP();

    updateLevel();

    updateHomeProgress();

    updateHomeStats();

    updateActivity();

}


/* =========================================================
   OPEN INTRO
   ========================================================= */

function openIntro() {

    sessionStorage.setItem(
        "lelana_selected_location",
        "1"
    );


    sessionStorage.setItem(
        "lelana_intro_source",
        "opening"
    );


    window.location.href =
        INTRO_ROUTE;

}


/* =========================================================
   SETUP PRIMARY BUTTON
   ========================================================= */

function setupContinueButton() {

    const buttons =
        document.querySelectorAll(
            ".lk-primary-button"
        );


    buttons.forEach(
        button => {

            if (
                button.dataset.openingReady ===
                "true"
            ) {

                return;

            }


            button.dataset.openingReady =
                "true";


            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openIntro();

                }
            );

        }
    );

}


/* =========================================================
   SETUP ACTIVE LOCATION BUTTON
   ========================================================= */

function setupActiveLocationButton() {

    const button =
        document.querySelector(
            "#activeLocationButton"
        );


    if (!button) {

        return;

    }


    if (
        button.dataset.openingReady ===
        "true"
    ) {

        return;

    }


    button.dataset.openingReady =
        "true";


    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const activeLocation =
                getActiveLocation();


            if (!activeLocation) {

                return;

            }


            /*
               Pastikan lokasi benar-benar terbuka.
            */

            if (
                !isLocationUnlocked(
                    activeLocation.id
                )
            ) {

                return;

            }


            sessionStorage.setItem(
                "lelana_selected_location",
                String(
                    activeLocation.id
                )
            );


            window.location.href =
                activeLocation.gameplay;

        }
    );

}


/* =========================================================
   SETUP JOURNEY CLICK
   ========================================================= */

function setupJourneyClick() {

    const locations =
        document.querySelectorAll(
            ".lk-location"
        );


    locations.forEach(
        (element, index) => {

            if (
                element.dataset.openingReady ===
                "true"
            ) {

                return;

            }


            element.dataset.openingReady =
                "true";


            element.addEventListener(
                "click",
                function () {

                    const locationId =
                        index + 1;


                    const status =
                        getLocationStatus(
                            locationId
                        );


                    /*
                       =================================================
                       TERKUNCI
                       ================================================= */

                    if (
                        status === "locked"
                    ) {

                        const location =
                            LOCATIONS.find(
                                item =>
                                    item.id ===
                                    locationId
                            );


                        const previous =
                            LOCATIONS.find(
                                item =>
                                    item.id ===
                                    locationId - 1
                            );


                        alert(

                            `Lokasi "${location ? location.name : "ini"}" masih terkunci.\n\n` +

                            `Selesaikan "${previous ? previous.name : "lokasi sebelumnya"}" terlebih dahulu.`

                        );


                        return;

                    }


                    /*
                       =================================================
                       TERBUKA / SELESAI
                       ================================================= */

                    const location =
                        LOCATIONS.find(
                            item =>
                                item.id ===
                                locationId
                        );


                    if (!location) {

                        return;

                    }


                    sessionStorage.setItem(
                        "lelana_selected_location",
                        String(
                            locationId
                        )
                    );


                    window.location.href =
                        location.gameplay;

                }
            );

        }
    );

}


/* =========================================================
   REFRESH FROM GAMEPLAY
   ========================================================= */

function refreshFromGameplay() {

    const progress =
        getGameplayProgress();


    /*
       Sinkronisasi tambahan ke state.

       localStorage tetap menjadi
       sumber progress utama.
    */

    if (state) {

        state.playerXp =
            Number(
                progress.xp || 0
            );


        state.unlockedLocationIndex =
            Math.max(
                0,
                getActiveLocationId() - 1
            );

    }


    render();


    return progress;

}


/* =========================================================
   STATE CHANGE
   ========================================================= */

if (
    state &&
    typeof state.subscribe ===
    "function"
) {

    state.subscribe(
        function () {

            /*
               Jangan menggunakan nilai unlock
               dari state sebagai sumber utama.

               render membaca localStorage lagi.
            */

            render();

        }
    );

}


/* =========================================================
   PAGE SHOW
   ========================================================= */

window.addEventListener(
    "pageshow",
    function () {

        refreshFromGameplay();

    }
);


/* =========================================================
   FOCUS
   ========================================================= */

window.addEventListener(
    "focus",
    function () {

        refreshFromGameplay();

    }
);


/* =========================================================
   VISIBILITY CHANGE
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.visibilityState ===
            "visible"
        ) {

            refreshFromGameplay();

        }

    }
);


/* =========================================================
   STORAGE CHANGE
   ========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
            GAMEPLAY_PROGRESS_KEY
        ) {

            refreshFromGameplay();

        }

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

function init() {

    /*
       JANGAN RESET PROGRESS.

       Progress dibaca dari localStorage.
    */

    refreshFromGameplay();

    setupContinueButton();

    setupActiveLocationButton();

    setupJourneyClick();

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
        init
    );

}

else {

    init();

}


/* =========================================================
   PUBLIC API
   ========================================================= */

window.LelanaOpening = {

    render,

    refreshFromGameplay,

    openIntro,

    getLocationStatus,

    getActiveLocation,

    getActiveLocationId,

    getCompletedLocations,

    getUnlockedLocations,

    isLocationCompleted,

    isLocationUnlocked,

    locations:
        LOCATIONS

};