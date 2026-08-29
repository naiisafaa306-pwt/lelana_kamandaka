/* =========================================================
   LELANA KAMANDAKA
   OPENING / BERANDA CONTROLLER
   ========================================================= */

import { state } from "./state.js";


/* =========================================================
   DATA LOKASI
   ========================================================= */

const LOCATIONS = [

    {
        id: 1,
        name: "Pajajaran",
        gameplay: "gameplay/gameplay01/index.html"
    },

    {
        id: 2,
        name: "Ki Ajar Winarong",
        gameplay: "gameplay/gameplay02/index.html"
    },

    {
        id: 3,
        name: "Pasir Luhur",
        gameplay: "gameplay/gameplay03/index.html"
    },

    {
        id: 4,
        name: "Kali Logawa",
        gameplay: "gameplay/gameplay04/index.html"
    },

    {
        id: 5,
        name: "Desa Panagih",
        gameplay: "gameplay/gameplay05/index.html"
    },

    {
        id: 6,
        name: "Goa Jatijajar",
        gameplay: "gameplay/gameplay06/index.html"
    },

    {
        id: 7,
        name: "Batur Agung",
        gameplay: "gameplay/gameplay07/index.html"
    },

    {
        id: 8,
        name: "Sawangan",
        gameplay: "gameplay/gameplay08/index.html"
    },

    {
        id: 9,
        name: "Kali Serayu",
        gameplay: "gameplay/gameplay09/index.html"
    },

    {
        id: 10,
        name: "Desa Rosari",
        gameplay: "gameplay/gameplay10/index.html"
    }

];


/* =========================================================
   ROUTE
   ========================================================= */

/*
   Intro menjadi pembuka sebelum Gameplay 01.
*/

const INTRO_ROUTE =
    "intro/intro.html";


/*
   Gameplay pertama.
*/

const FIRST_GAMEPLAY_ROUTE =
    "gameplay/gameplay01/index.html";


/* =========================================================
   HELPER
   ========================================================= */

function getActiveLocationId() {

    return (
        Number(state.unlockedLocationIndex || 0) + 1
    );

}


function getActiveLocation() {

    const activeId =
        getActiveLocationId();

    return LOCATIONS.find(
        location =>
            location.id === activeId
    );

}


/* =========================================================
   LOCATION STATUS
   ========================================================= */

/*
   unlockedLocationIndex:

   0 = Pajajaran aktif
   1 = Ki Ajar Winarong aktif
   2 = Pasir Luhur aktif
   dst.
*/

function getLocationStatus(locationId) {

    const activeIndex =
        getActiveLocationId();


    /*
       Lokasi sebelum lokasi aktif
       sudah selesai.
    */

    if (locationId < activeIndex) {

        return "done";

    }


    /*
       Lokasi yang sedang aktif.
    */

    if (locationId === activeIndex) {

        return "active";

    }


    /*
       Lokasi setelah lokasi aktif
       masih terkunci.
    */

    return "locked";

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


            /*
               Bersihkan status lama.
            */

            locationElement.classList.remove(
                "active",
                "done",
                "locked"
            );


            /*
               Tambahkan status baru.
            */

            locationElement.classList.add(
                status
            );


            /*
               Update tulisan status.
            */

            const statusText =
                locationElement.querySelector(
                    "small"
                );


            if (statusText) {

                if (status === "done") {

                    statusText.textContent =
                        "✓ Selesai";

                }

                else if (status === "active") {

                    statusText.textContent =
                        "Aktif";

                }

                else {

                    statusText.textContent =
                        "Terkunci";

                }

            }


            /*
               Update node / icon.
            */

            const node =
                locationElement.querySelector(
                    ".lk-node"
                );


            if (!node) {
                return;
            }


            const image =
                node.querySelector("img");


            /*
               LOCKED
            */

            if (status === "locked") {

                if (image) {

                    image.style.opacity =
                        "0.35";

                }

                node.style.opacity =
                    "0.6";

            }


            /*
               ACTIVE
            */

            else if (status === "active") {

                if (image) {

                    image.style.opacity =
                        "1";

                }

                node.style.opacity =
                    "1";

            }


            /*
               DONE
            */

            else if (status === "done") {

                if (image) {

                    image.style.opacity =
                        "1";

                }

                node.style.opacity =
                    "1";

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


    /*
       Nama lokasi aktif.
    */

    const title =
        document.querySelector(
            "#activeLocationName"
        );


    if (title) {

        title.textContent =
            activeLocation.name;

    }


    /*
       Gambar lokasi aktif.
    */

    const image =
        document.querySelector(
            "#activeLocationImage"
        );


    /*
       Saat ini Beranda memakai gambar
       Pajajaran sebagai default.

       Untuk lokasi berikutnya,
       gunakan mapping gambar jika tersedia.
    */

    const locationImages = {

        1: "assets/backgrounds/pajajaran.png",

        2: "assets/backgrounds/ki_ajar_winarong.png",

        3: "assets/backgrounds/pasir_luhur.png",

        4: "assets/backgrounds/kali_logawa.png",

        5: "assets/backgrounds/desa_panagih.png",

        6: "assets/backgrounds/goa_jatijajar.png",

        7: "assets/backgrounds/batur_agung.png",

        8: "assets/backgrounds/sawangan.png",

        9: "assets/backgrounds/kali_serayu.png",

        10: "assets/backgrounds/desa_rosari.png"

    };


    if (
        image &&
        locationImages[activeLocation.id]
    ) {

        image.src =
            locationImages[
                activeLocation.id
            ];

        image.alt =
            activeLocation.name;

    }


    /*
       Tombol Main Sekarang.
    */

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

    const completedCount =
        Number(
            state.unlockedLocationIndex || 0
        );


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

    const totalXP =
        Number(
            state.playerXp || 0
        );


    const maxXP =
        1000;


    const percentage =
        Math.min(
            (totalXP / maxXP) * 100,
            100
        );


    /*
       XP BAR NAVBAR
    */

    const navbarBar =
        document.querySelector(
            "#playerXpBar"
        );


    if (navbarBar) {

        navbarBar.style.width =
            `${percentage}%`;

    }


    /*
       XP BAR STATUS
    */

    const statusBar =
        document.querySelector(
            "#statusXpBar"
        );


    if (statusBar) {

        statusBar.style.width =
            `${percentage}%`;

    }


    /*
       XP TEXT ATAS
    */

    const xpTop =
        document.querySelector(
            "#playerXpTop"
        );


    if (xpTop) {

        xpTop.textContent =
            `${totalXP} XP`;

    }


    /*
       XP TEXT BAWAH
    */

    const xpBottom =
        document.querySelector(
            "#playerXpBottom"
        );


    if (xpBottom) {

        xpBottom.textContent =
            `${totalXP.toLocaleString("id-ID")} / 1.000 XP`;

    }


    /*
       XP STATUS
    */

    const statusXP =
        document.querySelector(
            "#statusXpText"
        );


    if (statusXP) {

        statusXP.textContent =
            `${totalXP.toLocaleString("id-ID")} / 1.000 XP`;

    }


    /*
       XP DI HOME
       Jika elemen tersedia.
    */

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

    /*
       Setiap 300 XP naik 1 level.

       Level awal = 01.
    */

    const level =
        Math.min(
            Math.floor(
                Number(
                    state.playerXp || 0
                ) / 300
            ) + 1,
            10
        );


    const levelText =
        String(level)
            .padStart(2, "0");


    /*
       NAVBAR
    */

    const navbarLevel =
        document.querySelector(
            "#playerLevel"
        );


    if (navbarLevel) {

        navbarLevel.textContent =
            `Level ${levelText}`;

    }


    /*
       STATUS
    */

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

    const activeId =
        getActiveLocationId();


    const total =
        LOCATIONS.length;


    const percentage =
        Math.min(
            (activeId / total) * 100,
            100
        );


    /*
       Nomor perjalanan.
    */

    const current =
        document.querySelector(
            "#homeProgressCurrent"
        );


    if (current) {

        current.textContent =
            String(activeId)
                .padStart(2, "0");

    }


    /*
       Progress bar.
    */

    const fill =
        document.querySelector(
            "#homeProgressFill"
        );


    if (fill) {

        fill.style.width =
            `${percentage}%`;

    }


    /*
       Nama lokasi.
    */

    const text =
        document.querySelector(
            "#homeProgressText"
        );


    const location =
        getActiveLocation();


    if (
        text &&
        location
    ) {

        text.textContent =
            `${location.name} terbuka`;

    }

}


/* =========================================================
   UPDATE HOME STATS
   ========================================================= */

function updateHomeStats() {

    const totalXP =
        Number(
            state.playerXp || 0
        );


    /*
       XP.
    */

    const xp =
        document.querySelector(
            "#homeXp"
        );


    if (xp) {

        xp.textContent =
            totalXP;

    }


    /*
       BASA.

       Ambil dari state jika tersedia.
       Kalau tidak ada, tetap 0.
    */

    const basa =
        document.querySelector(
            "#homeBasa"
        );


    if (basa) {

        const basaValue =
            Number(
                state.basaCount ||
                state.collectedBasa ||
                0
            );


        basa.textContent =
            basaValue;

    }

}


/* =========================================================
   UPDATE ACTIVITY
   ========================================================= */

function updateActivity() {

    const activeLocation =
        getActiveLocation();


    const activeId =
        getActiveLocationId();


    /*
       JOURNEY
    */

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

        if (activeId === 1) {

            journeyTitle.textContent =
                "Perjalanan durung dimulai";

            journeyText.textContent =
                "Miwiti saka Pajajaran";

        }

        else if (activeLocation) {

            journeyTitle.textContent =
                `Menuju ${activeLocation.name}`;

            journeyText.textContent =
                `${activeId - 1} lokasi telah diselesaikan`;

        }

    }


    /*
       BASA
    */

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
                state.basaCount ||
                state.collectedBasa ||
                0
            );


        if (basaCount > 0) {

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


    /*
       ACHIEVEMENT
    */

    const achievementText =
        document.querySelector(
            "#activityAchievementText"
        );


    if (achievementText) {

        const completed =
            Number(
                state.unlockedLocationIndex || 0
            );


        achievementText.textContent =
            completed > 0
                ? `${completed} lokasi telah diselesaikan.`
                : "Progress gameplay tercatat otomatis.";

    }

}


/* =========================================================
   RENDER
   ========================================================= */

function render() {

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

/*
   Fungsi khusus untuk tombol
   "Mulai Petualangan".

   BERANDA
        ↓
   INTRO 01
*/

function openIntro() {

    /*
       Simpan bahwa pemain memulai
       perjalanan dari lokasi pertama.
    */

    sessionStorage.setItem(
        "lelana_selected_location",
        "1"
    );


    /*
       Tandai bahwa intro sedang dibuka
       dari Beranda.
    */

    sessionStorage.setItem(
        "lelana_intro_source",
        "opening"
    );


    /*
       Masuk Intro.
    */

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

            /*
               Jangan pasang listener
               dua kali.
            */

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

            /*
               Jangan pasang listener
               lebih dari satu kali.
            */

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
                       LOCKED
                    */

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
                            `Lokasi "${location.name}" masih terkunci.\n\n` +
                            `Selesaikan "${previous ? previous.name : "lokasi sebelumnya"}" terlebih dahulu.`
                        );


                        return;

                    }


                    /*
                       Lokasi aktif / selesai
                       dapat dibuka.
                    */

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
                        String(locationId)
                    );


                    window.location.href =
                        location.gameplay;

                }
            );

        }
    );

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

        render();

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

            render();

        }

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

function init() {

    /*
       Jangan reset progress di sini.

       state.js yang menentukan progress.
    */

    render();

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

    openIntro,

    getLocationStatus,

    getActiveLocation,

    locations: LOCATIONS

};