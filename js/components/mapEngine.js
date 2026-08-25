// =========================================================
// MAP ENGINE
// LELANA KAMANDAKA
// =========================================================


// =========================================================
// STORAGE KEY
// =========================================================

const MAP_PROGRESS_KEY =
    "lelanaKamandakaProgress";


// =========================================================
// DATA LOKASI
// =========================================================

const mapLocations = [

    {
        id: 1,
        name: "Padjajaran",
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


// =========================================================
// ROUTE DATA
// =========================================================

const mapRoutes = [

    {
        from: 1,
        to: 2,
        element: "route-1-2"
    },

    {
        from: 2,
        to: 3,
        element: "route-2-3"
    },

    {
        from: 3,
        to: 4,
        element: "route-3-4"
    },

    {
        from: 4,
        to: 5,
        element: "route-4-5"
    },

    {
        from: 5,
        to: 6,
        element: "route-5-6"
    },

    {
        from: 6,
        to: 7,
        element: "route-6-7"
    },

    {
        from: 7,
        to: 8,
        element: "route-7-8"
    },

    {
        from: 8,
        to: 9,
        element: "route-8-9"
    },

    {
        from: 9,
        to: 10,
        element: "route-9-10"
    }

];


// =========================================================
// DEFAULT PROGRESS
// =========================================================

const defaultMapProgress = {

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


// =========================================================
// LOAD PROGRESS
// =========================================================

function loadMapProgress() {

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

        console.warn(
            "Progress tidak dapat dibaca dari localStorage.",
            error
        );

    }


    const progress = {

        ...defaultMapProgress,

        ...(savedProgress || {})

    };


    // =====================================================
    // PASTIKAN ARRAY VALID
    // =====================================================

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


    // =====================================================
    // PAJAJARAN SELALU TERBUKA
    // =====================================================

    if (
        !progress.unlockedLocations.includes(1)
    ) {

        progress.unlockedLocations.unshift(1);

    }


    // =====================================================
    // SINKRONISASI COMPLETED LOCATIONS
    //
    // Kalau app.js lama menyimpan:
    //
    // completedLocations: [1]
    //
    // maka otomatis dianggap:
    //
    // completedChapters: [1]
    // =====================================================

    progress.completedLocations.forEach(
        function(locationId) {

            if (
                locationId >= 1 &&
                locationId <= 10 &&
                !progress.completedChapters.includes(
                    locationId
                )
            ) {

                progress.completedChapters.push(
                    locationId
                );

            }

        }
    );


    // =====================================================
    // SINKRONISASI UNLOCK BERDASARKAN CHAPTER
    //
    // BAB 01 selesai
    //     ↓
    // LOKASI 02 TERBUKA
    //
    // BAB 02 selesai
    //     ↓
    // LOKASI 03 TERBUKA
    //
    // dst.
    // =====================================================

    progress.completedChapters.forEach(
        function(chapter) {

            const nextLocation =
                chapter + 1;


            if (
                nextLocation <= 10
            ) {

                unlockLocation(
                    progress,
                    nextLocation
                );

            }

        }
    );


    // =====================================================
    // SINKRONISASI BERDASARKAN CURRENT CHAPTER
    //
    // Tidak langsung membuka semua chapter.
    // Hanya chapter yang benar-benar selesai
    // yang membuka lokasi berikutnya.
    // =====================================================

    if (
        progress.currentChapter > 1
    ) {

        for (
            let chapter = 1;
            chapter < progress.currentChapter;
            chapter++
        ) {

            if (
                progress.completedChapters.includes(
                    chapter
                )
            ) {

                unlockLocation(
                    progress,
                    chapter + 1
                );

            }

        }

    }


    // =====================================================
    // HAPUS DUPLIKAT
    // =====================================================

    progress.completedChapters =
        [...new Set(
            progress.completedChapters
        )];


    progress.completedLocations =
        [...new Set(
            progress.completedLocations
        )];


    progress.unlockedLocations =
        [...new Set(
            progress.unlockedLocations
        )];


    // =====================================================
    // URUTKAN
    // =====================================================

    progress.completedChapters.sort(
        function(a, b) {

            return a - b;

        }
    );


    progress.completedLocations.sort(
        function(a, b) {

            return a - b;

        }
    );


    progress.unlockedLocations.sort(
        function(a, b) {

            return a - b;

        }
    );


    // =====================================================
    // SIMPAN HASIL SINKRONISASI
    // =====================================================

    saveMapProgress(
        progress
    );


    return progress;

}


// =========================================================
// UNLOCK LOCATION
// =========================================================

function unlockLocation(
    progress,
    locationId
) {

    if (
        !progress.unlockedLocations.includes(
            locationId
        )
    ) {

        progress.unlockedLocations.push(
            locationId
        );

    }

}


// =========================================================
// MARK CHAPTER COMPLETED
// =========================================================

function completeChapter(
    chapterNumber
) {

    const progress =
        loadMapProgress();


    // =====================================================
    // TAMBAHKAN CHAPTER SELESAI
    // =====================================================

    if (
        !progress.completedChapters.includes(
            chapterNumber
        )
    ) {

        progress.completedChapters.push(
            chapterNumber
        );

    }


    // =====================================================
    // LOKASI YANG SELESAI
    // =====================================================

    if (
        !progress.completedLocations.includes(
            chapterNumber
        )
    ) {

        progress.completedLocations.push(
            chapterNumber
        );

    }


    // =====================================================
    // UNLOCK LOKASI BERIKUTNYA
    // =====================================================

    const nextLocation =
        chapterNumber + 1;


    if (
        nextLocation <= 10
    ) {

        unlockLocation(
            progress,
            nextLocation
        );

    }


    // =====================================================
    // CURRENT CHAPTER
    // =====================================================

    if (
        nextLocation <= 10
    ) {

        progress.currentChapter =
            nextLocation;

    }

    else {

        progress.currentChapter =
            10;

    }


    // =====================================================
    // SORT
    // =====================================================

    progress.completedChapters.sort(
        function(a, b) {

            return a - b;

        }
    );


    progress.completedLocations.sort(
        function(a, b) {

            return a - b;

        }
    );


    progress.unlockedLocations.sort(
        function(a, b) {

            return a - b;

        }
    );


    // =====================================================
    // SAVE
    // =====================================================

    saveMapProgress(
        progress
    );


    // =====================================================
    // UPDATE MAP
    // =====================================================

    updateLocations(
        progress
    );


    updateRoutes(
        progress
    );


    return progress;

}


// =========================================================
// SAVE PROGRESS
// =========================================================

function saveMapProgress(
    progress
) {

    try {

        localStorage.setItem(
            MAP_PROGRESS_KEY,
            JSON.stringify(progress)
        );


        console.log(
            "Progress berhasil disimpan:",
            progress
        );

    }

    catch (error) {

        console.warn(
            "Progress tidak dapat disimpan.",
            error
        );

    }

}


// =========================================================
// APPLY LOCATION STATE
// =========================================================

function applyLocationState(
    progress
) {

    mapLocations.forEach(
        function(location) {

            const element =
                document.querySelector(
                    `.map-location[data-location="${location.id}"]`
                );


            if (!element) {

                return;

            }


            const image =
                element.querySelector("img");


            if (!image) {

                return;

            }


            const isUnlocked =
                progress.unlockedLocations.includes(
                    location.id
                );


            // =================================================
            // LOKASI TERBUKA
            // =================================================

            if (isUnlocked) {

                element.classList.add(
                    "unlocked"
                );

                element.classList.remove(
                    "locked"
                );


                image.src =
                    "assets/icons/lokasi.png";


                element.disabled =
                    false;


                element.setAttribute(
                    "aria-disabled",
                    "false"
                );


                element.setAttribute(
                    "aria-label",
                    `${location.name} — Lokasi terbuka`
                );

            }


            // =================================================
            // LOKASI TERKUNCI
            // =================================================

            else {

                element.classList.add(
                    "locked"
                );

                element.classList.remove(
                    "unlocked"
                );


                image.src =
                    "assets/icons/gembok.png";


                element.disabled =
                    true;


                element.setAttribute(
                    "aria-disabled",
                    "true"
                );


                element.setAttribute(
                    "aria-label",
                    `${location.name} — Terkunci`
                );

            }

        }
    );

}


// =========================================================
// UPDATE LOCATIONS
// =========================================================

function updateLocations(
    progress
) {

    applyLocationState(
        progress
    );

}


// =========================================================
// UPDATE ROUTES
// =========================================================

function updateRoutes(
    progress
) {

    mapRoutes.forEach(
        function(route) {

            const element =
                document.getElementById(
                    route.element
                );


            if (!element) {

                return;

            }


            const fromUnlocked =
                progress.unlockedLocations.includes(
                    route.from
                );


            const toUnlocked =
                progress.unlockedLocations.includes(
                    route.to
                );


            // =================================================
            // JALUR AKTIF
            //
            // Lokasi awal DAN tujuan sudah terbuka.
            //
            // Jalur menjadi 100% opacity.
            // =================================================

            if (
                fromUnlocked &&
                toUnlocked
            ) {

                element.classList.add(
                    "completed"
                );

                element.classList.remove(
                    "locked"
                );


                element.style.opacity =
                    "1";

            }


            // =================================================
            // JALUR BELUM AKTIF
            // =================================================

            else {

                element.classList.remove(
                    "completed"
                );

                element.classList.add(
                    "locked"
                );


                element.style.opacity =
                    "0.25";

            }

        }
    );

}


// =========================================================
// KLIK LOKASI
// =========================================================

function setupLocationEvents(
    progress
) {

    document
        .querySelectorAll(
            ".map-location"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        const locationId =
                            Number(
                                this.dataset.location
                            );


                        const location =
                            mapLocations.find(
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


                        // =====================================
                        // CEK PROGRESS TERBARU
                        // =====================================

                        const latestProgress =
                            loadMapProgress();


                        const isUnlocked =
                            latestProgress
                                .unlockedLocations
                                .includes(
                                    locationId
                                );


                        // =====================================
                        // TERKUNCI
                        // =====================================

                        if (!isUnlocked) {

                            console.log(
                                `Lokasi ${locationId} masih terkunci.`
                            );


                            this.classList.remove(
                                "locked-shake"
                            );


                            void this.offsetWidth;


                            this.classList.add(
                                "locked-shake"
                            );


                            return;

                        }


                        // =====================================
                        // TERBUKA
                        // =====================================

                        console.log(
                            `Membuka ${location.name}`
                        );


                        console.log(
                            `Menuju: ${location.gameplay}`
                        );


                        window.location.href =
                            location.gameplay;

                    }
                );

            }
        );

}


// =========================================================
// NAVBAR SCROLL
// =========================================================

function setupNavbar() {

    const navbar =
        document.getElementById(
            "siteNavbar"
        );


    if (!navbar) {

        return;

    }


    function handleScroll() {

        if (
            window.scrollY > 30
        ) {

            navbar.classList.add(
                "scrolled"
            );

        }

        else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    handleScroll();


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );

}


// =========================================================
// REFRESH MAP
// =========================================================

function refreshMap() {

    const progress =
        loadMapProgress();


    updateLocations(
        progress
    );


    updateRoutes(
        progress
    );


    return progress;

}


// =========================================================
// INITIALIZE MAP
// =========================================================

function initializeMap() {

    console.log(
        "================================="
    );

    console.log(
        "LELANA KAMANDAKA — MAP ENGINE"
    );

    console.log(
        "================================="
    );


    console.log(
        "Jumlah lokasi:",
        mapLocations.length
    );


    console.log(
        "Jumlah jalur:",
        mapRoutes.length
    );


    const progress =
        loadMapProgress();


    console.log(
        "Progress map:",
        progress
    );


    updateLocations(
        progress
    );


    updateRoutes(
        progress
    );


    setupLocationEvents(
        progress
    );

}


// =========================================================
// INIT
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeMap();

        setupNavbar();

    }
);