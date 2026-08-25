/* =========================================================
   LELANA KAMANDAKA
   HOME LOCATION CONTROLLER
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

const HOME_PROGRESS_KEY =
    "lelanaKamandakaProgress";


/* =========================================================
   DATA LOKASI
   ========================================================= */

const homeLocations = [

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
   DEFAULT PROGRESS
   ========================================================= */

const defaultHomeProgress = {

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
   LOAD PROGRESS
   ========================================================= */

function loadHomeProgress() {

    let savedProgress = null;


    try {

        const saved =
            sessionStorage.getItem(
                HOME_PROGRESS_KEY
            );


        if (saved) {

            savedProgress =
                JSON.parse(saved);

        }

    }

    catch (error) {

        console.warn(
            "Progress tidak dapat dibaca.",
            error
        );

    }


    const progress = {

        ...defaultHomeProgress,

        ...(savedProgress || {})

    };


    /* =========================================
       PASTIKAN ARRAY
       ========================================= */

    if (
        !Array.isArray(
            progress.completedChapters
        )
    ) {

        progress.completedChapters = [];

    }


    if (
        !Array.isArray(
            progress.completedLocations
        )
    ) {

        progress.completedLocations = [];

    }


    if (
        !Array.isArray(
            progress.unlockedLocations
        )
    ) {

        progress.unlockedLocations = [1];

    }


    /* =========================================
       LOKASI 1 SELALU TERBUKA
       ========================================= */

    if (
        !progress.unlockedLocations.includes(1)
    ) {

        progress.unlockedLocations.unshift(1);

    }


    return progress;

}


/* =========================================================
   APPLY HOME LOCATION STATE
   ========================================================= */

function updateHomeLocations() {

    const progress =
        loadHomeProgress();


    document
        .querySelectorAll(
            ".home-location"
        )
        .forEach(
            function(button) {

                const locationId =
                    Number(
                        button.dataset.location
                    );


                const location =
                    homeLocations.find(
                        function(item) {

                            return (
                                item.id ===
                                locationId
                            );

                        }
                    );


                if (!location) {

                    return;

                }


                const isUnlocked =
                    progress.unlockedLocations.includes(
                        locationId
                    );


                /* =================================
                   HAPUS STATE LAMA
                   ================================= */

                button.classList.remove(
                    "location-unlocked",
                    "location-locked"
                );


                /* =================================
                   LOKASI TERBUKA
                   ================================= */

                if (isUnlocked) {

                    button.classList.add(
                        "location-unlocked"
                    );


                    button.setAttribute(
                        "aria-disabled",
                        "false"
                    );


                    button.setAttribute(
                        "aria-label",
                        `${location.name} — Lokasi terbuka`
                    );


                    button.dataset.status =
                        "unlocked";

                }


                /* =================================
                   LOKASI TERKUNCI
                   ================================= */

                else {

                    button.classList.add(
                        "location-locked"
                    );


                    button.setAttribute(
                        "aria-disabled",
                        "true"
                    );


                    button.setAttribute(
                        "aria-label",
                        `${location.name} — Lokasi terkunci`
                    );


                    button.dataset.status =
                        "locked";

                }

            }
        );

}


/* =========================================================
   WARNING LOKASI TERKUNCI
   ========================================================= */

function showLockedLocationMessage(
    locationId
) {

    const location =
        homeLocations.find(
            function(item) {

                return (
                    item.id ===
                    locationId
                );

            }
        );


    if (!location) {

        return;

    }


    const previousLocation =
        homeLocations.find(
            function(item) {

                return (
                    item.id ===
                    locationId - 1
                );

            }
        );


    const previousName =
        previousLocation
            ? previousLocation.name
            : "lokasi sebelumnya";


    /*
       Gunakan alert sederhana dulu.
       Nanti kalau mau bisa diganti
       dengan modal custom sesuai desain website.
    */

    alert(
        `Lokasi "${location.name}" masih terkunci.\n\n` +
        `Selesaikan perjalanan di "${previousName}" ` +
        `terlebih dahulu untuk membuka lokasi ini.`
    );

}


/* =========================================================
   KLIK HOME LOCATION
   ========================================================= */

function setupHomeLocationEvents() {

    const buttons =
        document.querySelectorAll(
            ".home-location"
        );


    if (!buttons.length) {

        return;

    }


    buttons.forEach(
        function(button) {

            /*
               Jangan pasang event listener
               berkali-kali.
            */

            if (
                button.dataset.homeLocationReady ===
                "true"
            ) {

                return;

            }


            button.dataset.homeLocationReady =
                "true";


            button.addEventListener(
                "click",
                function() {

                    const locationId =
                        Number(
                            this.dataset.location
                        );


                    const location =
                        homeLocations.find(
                            function(item) {

                                return (
                                    item.id ===
                                    locationId
                                );

                            }
                        );


                    if (!location) {

                        return;

                    }


                    /* =================================
                       AMBIL PROGRESS TERBARU
                       ================================= */

                    const progress =
                        loadHomeProgress();


                    const isUnlocked =
                        progress
                            .unlockedLocations
                            .includes(
                                locationId
                            );


                    /* =================================
                       TERKUNCI
                       ================================= */

                    if (!isUnlocked) {

                        this.classList.remove(
                            "home-location-shake"
                        );


                        /*
                           Memaksa browser
                           menjalankan ulang animasi.
                        */

                        void this.offsetWidth;


                        this.classList.add(
                            "home-location-shake"
                        );


                        showLockedLocationMessage(
                            locationId
                        );


                        return;

                    }


                    /* =================================
                       TERBUKA
                       ================================= */

                    window.location.href =
                        location.gameplay;

                }
            );

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeHomeLocations() {

    updateHomeLocations();

    setupHomeLocationEvents();

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
        initializeHomeLocations
    );

}

else {

    initializeHomeLocations();

}


/* =========================================================
   UPDATE OTOMATIS SAAT KEMBALI KE TAB
   ========================================================= */

window.addEventListener(
    "pageshow",
    function() {

        updateHomeLocations();

    }
);


/* =========================================================
   UPDATE SAAT TAB KEMBALI AKTIF
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    function() {

        if (
            document.visibilityState ===
            "visible"
        ) {

            updateHomeLocations();

        }

    }
);