/* =========================================================
   LELANA KAMANDAKA
   BASA SCREEN JAVASCRIPT
   =========================================================

   TANGGUNG JAWAB FILE INI:
   - Filter kategori kosakata
   - Pencarian kosakata
   - Menampilkan jumlah kata
   - Menampilkan level
   - Menampilkan progress belajar
   - Menangani kosakata terkunci
   - Sinkronisasi dengan state global jika tersedia
   - Animasi kartu
   - Empty state

   TIDAK MENANGANI:
   - Navbar
   - Sidebar
   - Mobile navbar
   - Navigasi global

   Navbar tetap ditangani oleh:
   /navbar.html
   /css/components/navbar.css
   /js/navbar.js
   ========================================================= */


/* =========================================================
   GLOBAL BASA STATE
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURATION
       ===================================================== */

    const BASA_CONFIG = {

        totalWords: 30,

        totalLevels: 10,

        defaultLevel: 1,

        defaultCategory: "semua",

        storageKey: "lelana_kamandaka_basa",

        animationDuration: 280

    };


    /* =====================================================
       DOM READY
       ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        initBasa();

    });


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initBasa() {

        const page = document.querySelector(".basa-page");

        if (!page) {
            return;
        }


        /* -------------------------------------------------
           Ambil elemen
           ------------------------------------------------- */

        const elements = getBasaElements();


        /* -------------------------------------------------
           Simpan elemen global agar mudah dipakai
           ------------------------------------------------- */

        window.LelanaBasa = {

            elements: elements,

            state: loadBasaState(),

            refresh: refreshBasa,

            filter: filterBasa,

            search: searchBasa

        };


        /* -------------------------------------------------
           Event listeners
           ------------------------------------------------- */

        bindCategoryTabs(elements);

        bindSearch(elements);

        bindVocabularyCards(elements);


        /* -------------------------------------------------
           Render awal
           ------------------------------------------------- */

        refreshBasa();


        /* -------------------------------------------------
           Animasi awal
           ------------------------------------------------- */

        animateBasaCards();


        /* -------------------------------------------------
           Sinkronisasi state
           ------------------------------------------------- */

        setupStateSynchronization();


        console.log(
            "[Lelana Kamandaka] Basa screen berhasil dimuat."
        );

    }



    /* =====================================================
       DOM ELEMENTS
       ===================================================== */

    function getBasaElements() {

        return {

            page:
                document.querySelector(".basa-page"),

            grid:
                document.getElementById("basaGrid"),

            search:
                document.getElementById("basaSearch"),

            empty:
                document.getElementById("basaEmpty"),

            level:
                document.getElementById("basaLevel"),

            progressFill:
                document.getElementById("basaProgressFill"),

            progressText:
                document.getElementById("basaProgressText"),

            wordCount:
                document.getElementById("basaWordCount"),

            sectionTitle:
                document.getElementById("basaSectionTitle"),

            tabs:
                Array.from(
                    document.querySelectorAll(".basa-tab")
                ),

            cards:
                Array.from(
                    document.querySelectorAll(".basa-card")
                )

        };

    }



    /* =====================================================
       DEFAULT STATE
       ===================================================== */

    function getDefaultBasaState() {

        return {

            level: BASA_CONFIG.defaultLevel,

            learnedWords: 6,

            unlockedWords: 6,

            activeCategory: BASA_CONFIG.defaultCategory,

            searchQuery: ""

        };

    }



    /* =====================================================
       LOAD STATE
       ===================================================== */

    function loadBasaState() {

        const defaultState = getDefaultBasaState();

        try {

            const saved =
                localStorage.getItem(
                    BASA_CONFIG.storageKey
                );


            if (!saved) {

                return defaultState;

            }


            const parsed = JSON.parse(saved);


            return {

                ...defaultState,

                ...parsed

            };

        } catch (error) {

            console.warn(
                "[Basa] State tidak dapat dibaca:",
                error
            );


            return defaultState;

        }

    }



    /* =====================================================
       SAVE STATE
       ===================================================== */

    function saveBasaState() {

        try {

            localStorage.setItem(

                BASA_CONFIG.storageKey,

                JSON.stringify(
                    window.LelanaBasa.state
                )

            );

        } catch (error) {

            console.warn(
                "[Basa] State tidak dapat disimpan:",
                error
            );

        }

    }



    /* =====================================================
       CATEGORY TABS
       ===================================================== */

    function bindCategoryTabs(elements) {

        if (!elements.tabs.length) {
            return;
        }


        elements.tabs.forEach(function (tab) {

            tab.addEventListener(
                "click",
                function () {

                    const category =
                        tab.dataset.category ||
                        BASA_CONFIG.defaultCategory;


                    setActiveCategory(
                        category,
                        elements
                    );

                }
            );

        });

    }



    /* =====================================================
       SET ACTIVE CATEGORY
       ===================================================== */

    function setActiveCategory(
        category,
        elements
    ) {

        window.LelanaBasa.state.activeCategory =
            category;


        elements.tabs.forEach(function (tab) {

            const isActive =
                tab.dataset.category === category;


            tab.classList.toggle(
                "active",
                isActive
            );


            tab.setAttribute(
                "aria-selected",
                isActive ? "true" : "false"
            );

        });


        saveBasaState();

        filterBasa();

    }



    /* =====================================================
       SEARCH
       ===================================================== */

    function bindSearch(elements) {

        if (!elements.search) {
            return;
        }


        elements.search.addEventListener(
            "input",
            function () {

                window.LelanaBasa.state.searchQuery =
                    elements.search.value.trim();


                filterBasa();

            }
        );


        elements.search.addEventListener(
            "search",
            function () {

                window.LelanaBasa.state.searchQuery =
                    elements.search.value.trim();


                filterBasa();

            }
        );

    }



    /* =====================================================
       SEARCH FUNCTION
       ===================================================== */

    function searchBasa(query) {

        const elements =
            window.LelanaBasa.elements;


        const cleanQuery =
            String(query || "")
                .trim()
                .toLowerCase();


        window.LelanaBasa.state.searchQuery =
            cleanQuery;


        if (elements.search) {

            elements.search.value = query || "";

        }


        filterBasa();

    }



    /* =====================================================
       FILTER + SEARCH
       ===================================================== */

    function filterBasa() {

        const elements =
            window.LelanaBasa.elements;


        if (!elements.grid) {
            return;
        }


        const category =
            window.LelanaBasa.state.activeCategory ||
            BASA_CONFIG.defaultCategory;


        const query =
            (
                window.LelanaBasa.state.searchQuery ||
                ""
            )
                .trim()
                .toLowerCase();


        let visibleCount = 0;


        elements.cards.forEach(function (card) {

            const isLocked =
                card.classList.contains(
                    "basa-card-locked"
                );


            /* ---------------------------------------------
               Kartu terkunci
               --------------------------------------------- */

            if (isLocked) {

                const cardCategory =
                    (
                        card.dataset.category ||
                        ""
                    ).toLowerCase();


                const categoryMatch =
                    category === "semua" ||
                    cardCategory === category;


                /*
                 * Kartu terkunci tetap disembunyikan
                 * ketika pencarian digunakan.
                 */

                const searchMatch =
                    query === "";


                const shouldShow =
                    categoryMatch &&
                    searchMatch;


                setCardVisibility(
                    card,
                    shouldShow
                );


                if (shouldShow) {
                    visibleCount++;
                }


                return;

            }


            /* ---------------------------------------------
               Data kartu
               --------------------------------------------- */

            const cardCategory =
                (
                    card.dataset.category ||
                    ""
                ).toLowerCase();


            const word =
                (
                    card.dataset.word ||
                    card.querySelector("h3")?.textContent ||
                    ""
                ).toLowerCase();


            const meaning =
                (
                    card.dataset.meaning ||
                    card.querySelector(
                        ".basa-card-meaning"
                    )?.textContent ||
                    ""
                ).toLowerCase();


            const categoryMatch =
                category === "semua" ||
                cardCategory === category;


            const searchMatch =
                query === "" ||
                word.includes(query) ||
                meaning.includes(query);


            const shouldShow =
                categoryMatch &&
                searchMatch;


            setCardVisibility(
                card,
                shouldShow
            );


            if (shouldShow) {

                visibleCount++;

            }

        });


        /* -------------------------------------------------
           Empty state
           ------------------------------------------------- */

        updateEmptyState(
            visibleCount,
            elements
        );


        /* -------------------------------------------------
           Section title
           ------------------------------------------------- */

        updateSectionTitle(
            category,
            query,
            elements
        );


        saveBasaState();

    }



    /* =====================================================
       CARD VISIBILITY
       ===================================================== */

    function setCardVisibility(
        card,
        visible
    ) {

        if (visible) {

            card.classList.remove(
                "is-hidden"
            );

            card.style.display = "";

        } else {

            card.classList.add(
                "is-hidden"
            );

            card.style.display = "none";

        }

    }



    /* =====================================================
       EMPTY STATE
       ===================================================== */

    function updateEmptyState(
        visibleCount,
        elements
    ) {

        if (!elements.empty) {
            return;
        }


        if (visibleCount === 0) {

            elements.empty.classList.add(
                "show"
            );

            elements.empty.style.display =
                "block";

        } else {

            elements.empty.classList.remove(
                "show"
            );

            elements.empty.style.display =
                "none";

        }

    }



    /* =====================================================
       SECTION TITLE
       ===================================================== */

    function updateSectionTitle(
        category,
        query,
        elements
    ) {

        if (!elements.sectionTitle) {
            return;
        }


        if (query) {

            elements.sectionTitle.textContent =
                "Hasil Pencarian";


            return;

        }


        const titles = {

            semua:
                "Kata yang Telah Dipelajari",

            sapaan:
                "Kosakata Sapaan",

            kehidupan:
                "Kosakata Kehidupan",

            alam:
                "Kosakata Alam",

            budaya:
                "Kosakata Budaya",

            perjalanan:
                "Kosakata Perjalanan"

        };


        elements.sectionTitle.textContent =
            titles[category] ||
            titles.semua;

    }



    /* =====================================================
       VOCABULARY CARDS
       ===================================================== */

    function bindVocabularyCards(elements) {

        elements.cards.forEach(function (card) {

            card.addEventListener(
                "click",
                function () {

                    if (
                        card.classList.contains(
                            "basa-card-locked"
                        )
                    ) {

                        showLockedMessage(
                            card
                        );

                        return;

                    }


                    markWordAsViewed(
                        card
                    );

                }
            );

        });

    }



    /* =====================================================
       MARK WORD VIEWED
       ===================================================== */

    function markWordAsViewed(card) {

        const word =
            card.dataset.word;


        if (!word) {
            return;
        }


        let viewedWords =
            getViewedWords();


        if (!viewedWords.includes(word)) {

            viewedWords.push(word);

            saveViewedWords(
                viewedWords
            );

        }


        /*
         * Hitung ulang jumlah kata
         */

        const cards =
            window.LelanaBasa.elements.cards
                .filter(function (item) {

                    return !item.classList.contains(
                        "basa-card-locked"
                    );

                });


        const availableWords =
            cards.length;


        const learnedWords =
            Math.min(
                Math.max(
                    viewedWords.length,
                    window.LelanaBasa.state.learnedWords || 0
                ),
                BASA_CONFIG.totalWords
            );


        window.LelanaBasa.state.learnedWords =
            learnedWords;


        window.LelanaBasa.state.unlockedWords =
            Math.max(
                window.LelanaBasa.state.unlockedWords || 0,
                availableWords
            );


        saveBasaState();

        updateProgress();

    }



    /* =====================================================
       VIEWED WORD STORAGE
       ===================================================== */

    function getViewedWords() {

        try {

            const saved =
                localStorage.getItem(
                    "lelana_kamandaka_basa_viewed"
                );


            if (!saved) {
                return [];
            }


            const parsed =
                JSON.parse(saved);


            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            return [];

        }

    }



    function saveViewedWords(words) {

        try {

            localStorage.setItem(

                "lelana_kamandaka_basa_viewed",

                JSON.stringify(words)

            );

        } catch (error) {

            console.warn(
                "[Basa] Gagal menyimpan kata:",
                error
            );

        }

    }



    /* =====================================================
       LOCKED WORD MESSAGE
       ===================================================== */

    function showLockedMessage(card) {

        card.classList.remove(
            "basa-lock-shake"
        );


        /*
         * Memaksa browser membaca ulang class
         * agar animasi dapat dimainkan kembali.
         */

        void card.offsetWidth;


        card.classList.add(
            "basa-lock-shake"
        );


        setTimeout(function () {

            card.classList.remove(
                "basa-lock-shake"
            );

        }, 500);


        /*
         * Gunakan dialog native hanya sebagai fallback.
         */

        if (
            typeof window.showBasaNotification ===
            "function"
        ) {

            window.showBasaNotification(
                "Kosakata ini masih terkunci. Lanjutkan perjalanan untuk menemukannya."
            );

        }

    }



    /* =====================================================
       PROGRESS
       ===================================================== */

    function updateProgress() {

        const elements =
            window.LelanaBasa.elements;


        const state =
            window.LelanaBasa.state;


        let level =
            Number(state.level) ||
            BASA_CONFIG.defaultLevel;


        let learnedWords =
            Number(state.learnedWords) ||
            0;


        let unlockedWords =
            Number(state.unlockedWords) ||
            0;


        /*
         * Batas aman
         */

        level =
            Math.max(
                1,
                Math.min(
                    BASA_CONFIG.totalLevels,
                    level
                )
            );


        learnedWords =
            Math.max(
                0,
                Math.min(
                    BASA_CONFIG.totalWords,
                    learnedWords
                )
            );


        unlockedWords =
            Math.max(
                0,
                Math.min(
                    BASA_CONFIG.totalWords,
                    unlockedWords
                )
            );


        /* -------------------------------------------------
           LEVEL
           ------------------------------------------------- */

        if (elements.level) {

            elements.level.textContent =
                "LEVEL " +
                String(level).padStart(2, "0") +
                " / " +
                BASA_CONFIG.totalLevels;

        }


        /* -------------------------------------------------
           PROGRESS
           -------------------------------------------------

           30 kata = 100%

           Setiap kata memberikan progress.
           ------------------------------------------------- */

        const progress =
            (
                learnedWords /
                BASA_CONFIG.totalWords
            ) * 100;


        const safeProgress =
            Math.max(
                0,
                Math.min(
                    100,
                    progress
                )
            );


        if (elements.progressFill) {

            elements.progressFill.style.width =
                safeProgress + "%";

        }


        /* -------------------------------------------------
           WORD COUNT
           ------------------------------------------------- */

        if (elements.wordCount) {

            elements.wordCount.textContent =
                learnedWords +
                " / " +
                BASA_CONFIG.totalWords +
                " KATA";

        }


        /* -------------------------------------------------
           PROGRESS TEXT
           ------------------------------------------------- */

        if (elements.progressText) {

            if (learnedWords <= 0) {

                elements.progressText.textContent =
                    "Temukan kosakata baru sepanjang perjalananmu.";

            } else if (
                learnedWords <
                BASA_CONFIG.totalWords
            ) {

                elements.progressText.textContent =
                    "Teruskan perjalananmu untuk menemukan kosakata baru.";

            } else {

                elements.progressText.textContent =
                    "Semua kosakata telah berhasil dipelajari.";

            }

        }


        /*
         * Simpan hasil akhir
         */

        state.level =
            level;

        state.learnedWords =
            learnedWords;

        state.unlockedWords =
            unlockedWords;


        saveBasaState();


        /*
         * Kirim event agar sistem lain,
         * termasuk sistem global jika tersedia,
         * dapat mengetahui perubahan progress.
         */

        document.dispatchEvent(
            new CustomEvent(
                "basaProgressUpdated",
                {
                    detail: {

                        level:
                            level,

                        learnedWords:
                            learnedWords,

                        unlockedWords:
                            unlockedWords,

                        progress:
                            safeProgress

                    }
                }
            )
        );

    }



    /* =====================================================
       REFRESH BASA
       ===================================================== */

    function refreshBasa() {

        if (!window.LelanaBasa) {
            return;
        }


        const elements =
            window.LelanaBasa.elements;


        const state =
            window.LelanaBasa.state;


        /* -------------------------------------------------
           Sinkronisasi tab
           ------------------------------------------------- */

        elements.tabs.forEach(function (tab) {

            const active =
                tab.dataset.category ===
                state.activeCategory;


            tab.classList.toggle(
                "active",
                active
            );


            tab.setAttribute(
                "aria-selected",
                active ? "true" : "false"
            );

        });


        /* -------------------------------------------------
           Sinkronisasi search
           ------------------------------------------------- */

        if (elements.search) {

            elements.search.value =
                state.searchQuery || "";

        }


        /* -------------------------------------------------
           Progress
           ------------------------------------------------- */

        updateProgress();


        /* -------------------------------------------------
           Filter
           ------------------------------------------------- */

        filterBasa();

    }



    /* =====================================================
       INITIAL CARD ANIMATION
       ===================================================== */

    function animateBasaCards() {

        const cards =
            document.querySelectorAll(
                ".basa-card"
            );


        cards.forEach(
            function (card, index) {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(14px)";


                setTimeout(
                    function () {

                        card.style.transition =
                            "opacity " +
                            BASA_CONFIG.animationDuration +
                            "ms ease, transform " +
                            BASA_CONFIG.animationDuration +
                            "ms ease";


                        card.style.opacity =
                            "1";


                        card.style.transform =
                            "translateY(0)";

                    },
                    80 + index * 45
                );

            }
        );

    }



    /* =====================================================
       STATE SYNCHRONIZATION
       ===================================================== */

    function setupStateSynchronization() {


        /* -------------------------------------------------
           Browser storage
           ------------------------------------------------- */

        window.addEventListener(
            "storage",
            function (event) {

                if (
                    event.key ===
                    BASA_CONFIG.storageKey
                ) {

                    window.LelanaBasa.state =
                        loadBasaState();


                    refreshBasa();

                }


                if (
                    event.key ===
                    "lelana_kamandaka_basa_viewed"
                ) {

                    updateLearnedWordsFromStorage();

                }

            }
        );


        /* -------------------------------------------------
           Event dari state global
           ------------------------------------------------- */

        document.addEventListener(
            "lelanaStateUpdated",
            function () {

                syncWithGlobalState();

            }
        );


        document.addEventListener(
            "gameProgressUpdated",
            function () {

                syncWithGlobalState();

            }
        );


        document.addEventListener(
            "levelUpdated",
            function () {

                syncWithGlobalState();

            }
        );


        /*
         * Coba sinkronisasi setelah seluruh
         * script halaman selesai.
         */

        setTimeout(
            function () {

                syncWithGlobalState();

            },
            150
        );

    }



    /* =====================================================
       GLOBAL STATE SYNC
       ===================================================== */

    function syncWithGlobalState() {

        /*
         * Jangan menghapus state Basa sendiri.
         *
         * Jika project memiliki state global,
         * kita hanya membaca nilai yang tersedia.
         */

        const globalState =
            window.LelanaState ||
            window.AppState ||
            window.gameState ||
            window.state;


        if (!globalState) {
            return;
        }


        let changed = false;


        /* -------------------------------------------------
           LEVEL
           ------------------------------------------------- */

        const globalLevel =
            Number(
                globalState.level ??
                globalState.playerLevel ??
                globalState.currentLevel
            );


        if (
            Number.isFinite(globalLevel) &&
            globalLevel > 0
        ) {

            if (
                window.LelanaBasa.state.level !==
                globalLevel
            ) {

                window.LelanaBasa.state.level =
                    Math.min(
                        BASA_CONFIG.totalLevels,
                        globalLevel
                    );


                changed = true;

            }

        }


        /* -------------------------------------------------
           BASA / WORD PROGRESS
           ------------------------------------------------- */

        const globalWords =
            Number(
                globalState.basaWords ??
                globalState.learnedWords ??
                globalState.wordsLearned
            );


        if (
            Number.isFinite(globalWords) &&
            globalWords >= 0
        ) {

            if (
                window.LelanaBasa.state.learnedWords !==
                globalWords
            ) {

                window.LelanaBasa.state.learnedWords =
                    Math.min(
                        BASA_CONFIG.totalWords,
                        globalWords
                    );


                changed = true;

            }

        }


        /* -------------------------------------------------
           UNLOCKED WORDS
           ------------------------------------------------- */

        const globalUnlocked =
            Number(
                globalState.basaUnlockedWords ??
                globalState.unlockedWords
            );


        if (
            Number.isFinite(globalUnlocked) &&
            globalUnlocked >= 0
        ) {

            if (
                window.LelanaBasa.state.unlockedWords !==
                globalUnlocked
            ) {

                window.LelanaBasa.state.unlockedWords =
                    Math.min(
                        BASA_CONFIG.totalWords,
                        globalUnlocked
                    );


                changed = true;

            }

        }


        if (changed) {

            saveBasaState();

            updateProgress();

        }

    }



    /* =====================================================
       UPDATE LEARNED WORDS FROM STORAGE
       ===================================================== */

    function updateLearnedWordsFromStorage() {

        const viewedWords =
            getViewedWords();


        const visibleCards =
            window.LelanaBasa.elements.cards
                .filter(function (card) {

                    return !card.classList.contains(
                        "basa-card-locked"
                    );

                });


        const validWords =
            visibleCards.map(function (card) {

                return (
                    card.dataset.word ||
                    ""
                ).toLowerCase();

            });


        const validViewedWords =
            viewedWords.filter(function (word) {

                return validWords.includes(
                    String(word).toLowerCase()
                );

            });


        window.LelanaBasa.state.learnedWords =
            Math.min(
                BASA_CONFIG.totalWords,
                Math.max(
                    window.LelanaBasa.state.learnedWords || 0,
                    validViewedWords.length
                )
            );


        saveBasaState();

        updateProgress();

    }



    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.LelanaBasaAPI = {

        refresh: function () {

            if (
                window.LelanaBasa &&
                typeof window.LelanaBasa.refresh ===
                "function"
            ) {

                window.LelanaBasa.refresh();

            }

        },


        filter: function (category) {

            if (
                window.LelanaBasa &&
                typeof window.LelanaBasa.filter ===
                "function"
            ) {

                setActiveCategory(
                    category,
                    window.LelanaBasa.elements
                );

            }

        },


        search: function (query) {

            if (
                window.LelanaBasa &&
                typeof window.LelanaBasa.search ===
                "function"
            ) {

                window.LelanaBasa.search(
                    query
                );

            }

        },


        getState: function () {

            if (
                window.LelanaBasa &&
                window.LelanaBasa.state
            ) {

                return {
                    ...window.LelanaBasa.state
                };

            }


            return null;

        },


        setLevel: function (level) {

            if (!window.LelanaBasa) {
                return;
            }


            const safeLevel =
                Math.max(
                    1,
                    Math.min(
                        BASA_CONFIG.totalLevels,
                        Number(level) || 1
                    )
                );


            window.LelanaBasa.state.level =
                safeLevel;


            saveBasaState();

            updateProgress();

        },


        setLearnedWords: function (count) {

            if (!window.LelanaBasa) {
                return;
            }


            const safeCount =
                Math.max(
                    0,
                    Math.min(
                        BASA_CONFIG.totalWords,
                        Number(count) || 0
                    )
                );


            window.LelanaBasa.state.learnedWords =
                safeCount;


            saveBasaState();

            updateProgress();

        },


        setUnlockedWords: function (count) {

            if (!window.LelanaBasa) {
                return;
            }


            const safeCount =
                Math.max(
                    0,
                    Math.min(
                        BASA_CONFIG.totalWords,
                        Number(count) || 0
                    )
                );


            window.LelanaBasa.state.unlockedWords =
                safeCount;


            saveBasaState();

            updateProgress();

        }

    };


})();