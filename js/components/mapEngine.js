// =========================================================
// LELANA KAMANDAKA
// MAP ENGINE
// OTOMATIS 10 LOKASI
// =========================================================

(function () {

    "use strict";


    // =====================================================
    // CONFIG
    // =====================================================

    const STORAGE_KEY =
        "lelanaKamandakaProgress";

    const TOTAL_LOCATIONS =
        10;


    // =====================================================
    // DATA 10 LOKASI
    // =====================================================

    const mapLocations = [

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


    // =====================================================
    // DATA JALUR
    // =====================================================

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


    // =====================================================
    // DEFAULT PROGRESS
    // =====================================================

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


    // =====================================================
    // ANGKA VALID
    // =====================================================

    function toNumber(value) {

        const number =
            Number(value);

        if (
            !Number.isInteger(number) ||
            number < 1 ||
            number > TOTAL_LOCATIONS
        ) {

            return null;

        }

        return number;

    }


    // =====================================================
    // NORMALIZE ARRAY
    // =====================================================

    function normalizeArray(
        value
    ) {

        if (
            !Array.isArray(value)
        ) {

            return [];

        }

        return [

            ...new Set(

                value
                    .map(Number)
                    .filter(
                        number =>
                            Number.isInteger(number) &&
                            number >= 1 &&
                            number <= TOTAL_LOCATIONS
                    )

            )

        ].sort(
            (a, b) =>
                a - b
        );

    }


    // =====================================================
    // LOAD PROGRESS
    // =====================================================

    function loadMapProgress() {

        let saved = null;


        try {

            saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

        }

        catch (error) {

            console.warn(
                "LocalStorage tidak dapat dibaca.",
                error
            );

        }


        let progress = {

            ...defaultProgress

        };


        if (saved) {

            try {

                const parsed =
                    JSON.parse(saved);

                progress = {

                    ...progress,

                    ...parsed

                };

            }

            catch (error) {

                console.warn(
                    "Progress lama tidak dapat dibaca.",
                    error
                );

            }

        }


        // =================================================
        // NORMALIZE
        // =================================================

        progress.completedChapters =
            normalizeArray(
                progress.completedChapters
            );


        progress.completedLocations =
            normalizeArray(
                progress.completedLocations
            );


        progress.unlockedLocations =
            normalizeArray(
                progress.unlockedLocations
            );


        // =================================================
        // SINKRONISASI CHAPTER DAN LOCATION
        // =================================================

        progress.completedChapters
            .forEach(
                id => {

                    if (
                        !progress.completedLocations
                            .includes(id)
                    ) {

                        progress.completedLocations
                            .push(id);

                    }

                }
            );


        progress.completedLocations
            .forEach(
                id => {

                    if (
                        !progress.completedChapters
                            .includes(id)
                    ) {

                        progress.completedChapters
                            .push(id);

                    }

                }
            );


        progress.completedChapters =
            normalizeArray(
                progress.completedChapters
            );


        progress.completedLocations =
            normalizeArray(
                progress.completedLocations
            );


        // =================================================
        // HITUNG UNLOCK OTOMATIS
        // =================================================

        const unlocked = [1];


        for (
            let id = 2;
            id <= TOTAL_LOCATIONS;
            id++
        ) {

            const previous =
                id - 1;


            if (
                progress.completedLocations
                    .includes(previous)
            ) {

                unlocked.push(id);

            }

            else {

                break;

            }

        }


        progress.unlockedLocations =
            unlocked;


        // =================================================
        // CURRENT CHAPTER
        // =================================================

        if (
            progress.completedLocations.length
            > 0
        ) {

            const highest =
                Math.max(
                    ...progress.completedLocations
                );


            progress.currentChapter =
                Math.min(
                    highest + 1,
                    TOTAL_LOCATIONS
                );

        }

        else {

            progress.currentChapter =
                1;

        }


        progress.totalChapters =
            TOTAL_LOCATIONS;


        // =================================================
        // SIMPAN NORMALIZED DATA
        // =================================================

        saveMapProgress(
            progress
        );


        return progress;

    }


    // =====================================================
    // SAVE PROGRESS
    // =====================================================

    function saveMapProgress(
        progress
    ) {

        try {

            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify(
                    progress
                )

            );

        }

        catch (error) {

            console.warn(
                "Progress tidak dapat disimpan.",
                error
            );

        }

    }


    // =====================================================
    // CEK SELESAI
    // =====================================================

    function isLocationCompleted(
        progress,
        locationId
    ) {

        return (

            progress.completedLocations
                .includes(locationId)

            ||

            progress.completedChapters
                .includes(locationId)

        );

    }


    // =====================================================
    // CEK TERBUKA
    // =====================================================

    function isLocationUnlocked(
        progress,
        locationId
    ) {

        if (
            locationId === 1
        ) {

            return true;

        }


        return isLocationCompleted(

            progress,

            locationId - 1

        );

    }


    // =====================================================
    // UPDATE LOKASI
    // =====================================================

    function updateLocations(
        progress
    ) {

        mapLocations.forEach(
            location => {

                const element =
                    document.querySelector(

                        `.map-location[data-location="${location.id}"]`

                    );


                if (!element) {

                    return;

                }


                const image =
                    element.querySelector(
                        "img"
                    );


                const completed =
                    isLocationCompleted(

                        progress,

                        location.id

                    );


                const unlocked =
                    isLocationUnlocked(

                        progress,

                        location.id

                    );


                // =================================================
                // RESET
                // =================================================

                element.classList.remove(
                    "locked",
                    "unlocked",
                    "completed"
                );


                // =================================================
                // SELESAI
                // =================================================

                if (
                    completed
                ) {

                    element.classList.add(
                        "completed",
                        "unlocked"
                    );


                    if (image) {

                        image.src =
                            "assets/map/location.png";

                    }


                    element.setAttribute(
                        "aria-label",
                        `${location.name} — Selesai`
                    );


                    element.setAttribute(
                        "aria-disabled",
                        "false"
                    );


                    /*
                     * PENTING:
                     * simpan URL ke element.
                     */

                    element.dataset.gameplay =
                        location.gameplay;


                    return;

                }


                // =================================================
                // TERBUKA
                // =================================================

                if (
                    unlocked
                ) {

                    element.classList.add(
                        "unlocked"
                    );


                    if (image) {

                        image.src =
                            "assets/map/location.png";

                    }


                    element.setAttribute(
                        "aria-label",
                        `${location.name} — Lokasi terbuka`
                    );


                    element.setAttribute(
                        "aria-disabled",
                        "false"
                    );


                    /*
                     * PENTING:
                     * lokasi 02–10 berupa BUTTON,
                     * jadi kita berikan URL secara
                     * otomatis lewat dataset.
                     */

                    element.dataset.gameplay =
                        location.gameplay;


                    return;

                }


                // =================================================
                // TERKUNCI
                // =================================================

                element.classList.add(
                    "locked"
                );


                if (image) {

                    image.src =
                        "assets/map/gembok.png";

                }


                element.setAttribute(
                    "aria-label",
                    `${location.name} — Terkunci`
                );


                element.setAttribute(
                    "aria-disabled",
                    "true"
                );


                element.dataset.gameplay =
                    location.gameplay;

            }
        );

    }


    // =====================================================
    // UPDATE ROUTE
    // =====================================================

    function updateRoutes(
        progress
    ) {

        mapRoutes.forEach(
            route => {

                const element =
                    document.getElementById(
                        route.element
                    );


                if (!element) {

                    return;

                }


                const fromCompleted =
                    isLocationCompleted(

                        progress,

                        route.from

                    );


                const toUnlocked =
                    isLocationUnlocked(

                        progress,

                        route.to

                    );


                element.classList.remove(
                    "completed",
                    "locked"
                );


                if (
                    fromCompleted &&
                    toUnlocked
                ) {

                    element.classList.add(
                        "completed"
                    );


                    element.style.opacity =
                        "1";

                }

                else {

                    element.classList.add(
                        "locked"
                    );


                    element.style.opacity =
                        "0.25";

                }

            }
        );

    }


    // =====================================================
    // ⭐ FIX UTAMA
    // KLIK LOKASI
    // =====================================================

    function setupLocationEvents() {

        document
            .querySelectorAll(
                ".map-location"
            )
            .forEach(
                element => {

                    /*
                     * Hapus listener lama dengan
                     * cloning element.
                     *
                     * Tidak diperlukan kalau engine
                     * hanya dipanggil sekali.
                     */


                    element.addEventListener(

                        "click",

                        function (event) {

                            const locationId =
                                toNumber(
                                    this.dataset.location
                                );


                            if (
                                locationId === null
                            ) {

                                event.preventDefault();

                                return;

                            }


                            const progress =
                                loadMapProgress();


                            const unlocked =
                                isLocationUnlocked(

                                    progress,

                                    locationId

                                );


                            // =========================================
                            // MASIH TERKUNCI
                            // =========================================

                            if (
                                !unlocked
                            ) {

                                event.preventDefault();


                                this.classList.remove(
                                    "locked-shake"
                                );


                                void this.offsetWidth;


                                this.classList.add(
                                    "locked-shake"
                                );


                                return;

                            }


                            // =========================================
                            // SUDAH TERBUKA
                            // =========================================

                            /*
                             * Kalau element adalah <a>
                             * dan punya href, biarkan normal.
                             */

                            if (
                                this.tagName
                                    .toLowerCase() ===
                                "a"
                            ) {

                                return;

                            }


                            /*
                             * Kalau element adalah BUTTON,
                             * navigasikan secara manual.
                             */

                            const location =
                                mapLocations.find(
                                    item =>
                                        item.id ===
                                        locationId
                                );


                            if (
                                !location
                            ) {

                                event.preventDefault();

                                return;

                            }


                            event.preventDefault();


                            /*
                             * INI YANG MEMBUAT
                             * BUTTON 02–10 BISA DIBUKA.
                             */

                            window.location.href =
                                location.gameplay;

                        }

                    );

                }
            );

    }


    // =====================================================
    // COMPLETE CHAPTER
    // =====================================================

    function completeChapter(
        chapterNumber
    ) {

        const id =
            toNumber(
                chapterNumber
            );


        if (
            id === null
        ) {

            return loadMapProgress();

        }


        const progress =
            loadMapProgress();


        // =================================================
        // CHAPTER SELESAI
        // =================================================

        if (
            !progress.completedChapters
                .includes(id)
        ) {

            progress.completedChapters
                .push(id);

        }


        // =================================================
        // LOCATION SELESAI
        // =================================================

        if (
            !progress.completedLocations
                .includes(id)
        ) {

            progress.completedLocations
                .push(id);

        }


        // =================================================
        // NORMALIZE
        // =================================================

        progress.completedChapters =
            normalizeArray(
                progress.completedChapters
            );


        progress.completedLocations =
            normalizeArray(
                progress.completedLocations
            );


        // =================================================
        // UNLOCK OTOMATIS
        // =================================================

        const unlocked = [1];


        for (
            let locationId = 2;
            locationId <= TOTAL_LOCATIONS;
            locationId++
        ) {

            if (
                progress.completedLocations
                    .includes(
                        locationId - 1
                    )
            ) {

                unlocked.push(
                    locationId
                );

            }

            else {

                break;

            }

        }


        progress.unlockedLocations =
            unlocked;


        // =================================================
        // NEXT CHAPTER
        // =================================================

        if (
            id < TOTAL_LOCATIONS
        ) {

            progress.currentChapter =
                id + 1;

        }

        else {

            progress.currentChapter =
                TOTAL_LOCATIONS;

        }


        // =================================================
        // SAVE
        // =================================================

        saveMapProgress(
            progress
        );


        // =================================================
        // REFRESH
        // =================================================

        updateLocations(
            progress
        );

        updateRoutes(
            progress
        );


        // =================================================
        // EVENT
        // =================================================

        window.dispatchEvent(

            new CustomEvent(
                "lelanaProgressUpdated",
                {
                    detail:
                        progress
                }
            )

        );


        return progress;

    }


    // =====================================================
    // REFRESH MAP
    // =====================================================

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


    // =====================================================
    // RESET PROGRESS
    // =====================================================

    function resetProgress() {

        const progress = {

            ...defaultProgress,

            completedChapters: [],

            completedLocations: [],

            unlockedLocations: [1],

            currentChapter: 1

        };


        saveMapProgress(
            progress
        );


        updateLocations(
            progress
        );


        updateRoutes(
            progress
        );


        return progress;

    }


    // =====================================================
    // PUBLIC API
    // =====================================================

    window.LelanaMap = {

        loadMapProgress,

        saveMapProgress,

        completeChapter,

        refreshMap,

        updateLocations,

        updateRoutes,

        isLocationCompleted:
            function (id) {

                const progress =
                    loadMapProgress();

                return isLocationCompleted(
                    progress,
                    Number(id)
                );

            },

        isLocationUnlocked:
            function (id) {

                const progress =
                    loadMapProgress();

                return isLocationUnlocked(
                    progress,
                    Number(id)
                );

            },

        resetProgress

    };


    // =====================================================
    // INITIALIZE
    // =====================================================

    function initializeMap() {

        const progress =
            loadMapProgress();


        updateLocations(
            progress
        );


        updateRoutes(
            progress
        );


        setupLocationEvents();


        console.log(
            "======================================"
        );

        console.log(
            "LELANA KAMANDAKA MAP ENGINE"
        );

        console.log(
            "10 LOKASI AKTIF"
        );

        console.log(
            "Progress:",
            progress
        );

        console.log(
            "======================================"
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeMap
        );

    }

    else {

        initializeMap();

    }


})();