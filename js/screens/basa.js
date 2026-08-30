// =========================================================
// LELANA KAMANDAKA
// BASA ENGINE
// =========================================================


// =========================================================
// STORAGE
// =========================================================

const BASA_PROGRESS_KEY =
    "lelanaKamandakaProgress";

const BASA_LESSON_KEY =
    "lelanaKamandakaBasaProgress";


// =========================================================
// DEFAULT BASA PROGRESS
// =========================================================

const defaultBasaProgress = {

    currentLesson: 1,

    completedLessons: [],

    learnedWords: [],

    totalLessons: 10

};


// =========================================================
// BASA DATA
// =========================================================

const basaLessons = [

    {
        id: 1,
        title: "Sapaan Dasar",
        description:
            "Kosakata dasar untuk menyapa dan menerima seseorang.",
        words: [
            "Sugeng",
            "Monggo"
        ]
    },

    {
        id: 2,
        title: "Percakapan Sehari-hari",
        description:
            "Kosakata yang sering digunakan dalam percakapan.",
        words: [
            "Mangan",
            "Lunga"
        ]
    },

    {
        id: 3,
        title: "Ungkapan",
        description:
            "Ungkapan yang digunakan dalam kehidupan sehari-hari.",
        words: []
    },

    {
        id: 4,
        title: "Budaya",
        description:
            "Kosakata yang berkaitan dengan budaya Jawa.",
        words: []
    },

    {
        id: 5,
        title: "Tokoh",
        description:
            "Kosakata dan istilah yang berkaitan dengan tokoh cerita.",
        words: []
    },

    {
        id: 6,
        title: "Perjalanan",
        description:
            "Kosakata yang ditemukan sepanjang perjalanan.",
        words: []
    },

    {
        id: 7,
        title: "Alam",
        description:
            "Kosakata tentang alam dan lingkungan.",
        words: []
    },

    {
        id: 8,
        title: "Kehidupan",
        description:
            "Kosakata yang berkaitan dengan kehidupan masyarakat.",
        words: []
    },

    {
        id: 9,
        title: "Warisan",
        description:
            "Istilah yang berkaitan dengan warisan budaya.",
        words: []
    },

    {
        id: 10,
        title: "Piwulang",
        description:
            "Kosakata yang berkaitan dengan pesan dan pembelajaran.",
        words: []
    }

];


// =========================================================
// LOAD GLOBAL PROGRESS
// =========================================================

function loadGlobalProgress() {

    try {

        const saved =
            localStorage.getItem(
                BASA_PROGRESS_KEY
            );


        if (saved) {

            const progress =
                JSON.parse(saved);

            return progress;

        }

    }

    catch (error) {

        console.warn(
            "Progress utama tidak dapat dibaca.",
            error
        );

    }


    return {

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

}


// =========================================================
// LOAD BASA PROGRESS
// =========================================================

function loadBasaProgress() {

    let savedProgress =
        null;


    try {

        const saved =
            localStorage.getItem(
                BASA_LESSON_KEY
            );


        if (saved) {

            savedProgress =
                JSON.parse(saved);

        }

    }

    catch (error) {

        console.warn(
            "Progress Basa tidak dapat dibaca.",
            error
        );

    }


    const progress = {

        ...defaultBasaProgress,

        ...(savedProgress || {})

    };


    if (
        !Array.isArray(
            progress.completedLessons
        )
    ) {

        progress.completedLessons = [];

    }


    if (
        !Array.isArray(
            progress.learnedWords
        )
    ) {

        progress.learnedWords = [];

    }


    return progress;

}


// =========================================================
// SAVE BASA PROGRESS
// =========================================================

function saveBasaProgress(
    progress
) {

    try {

        localStorage.setItem(
            BASA_LESSON_KEY,
            JSON.stringify(progress)
        );

    }

    catch (error) {

        console.warn(
            "Progress Basa tidak dapat disimpan.",
            error
        );

    }

}


// =========================================================
// GET CURRENT CHAPTER
// =========================================================

function getCurrentChapter() {

    const globalProgress =
        loadGlobalProgress();


    let chapter =
        Number(
            globalProgress.currentChapter
        );


    if (
        !Number.isFinite(chapter)
    ) {

        chapter = 1;

    }


    if (chapter < 1) {

        chapter = 1;

    }


    if (chapter > 10) {

        chapter = 10;

    }


    return chapter;

}


// =========================================================
// GET UNLOCKED LESSON
// =========================================================

function isLessonUnlocked(
    lessonId
) {

    const currentChapter =
        getCurrentChapter();


    /*
       Lesson mengikuti progress perjalanan.

       Chapter 1
       -> Lesson 1 terbuka

       Chapter 2
       -> Lesson 1-2 terbuka

       dst.
    */

    return (
        lessonId <= currentChapter
    );

}


// =========================================================
// UPDATE BASA PROGRESS UI
// =========================================================

function updateBasaProgress() {

    const globalProgress =
        loadGlobalProgress();

    const currentChapter =
        getCurrentChapter();


    const levelElement =
        document.getElementById(
            "basaProgressLevel"
        );


    const fillElement =
        document.getElementById(
            "basaProgressFill"
        );


    const textElement =
        document.getElementById(
            "basaProgressText"
        );


    /*
       Progress perjalanan.
    */

    const percentage =
        Math.min(
            currentChapter / 10 * 100,
            100
        );


    if (levelElement) {

        levelElement.textContent =
            `LEVEL ${String(currentChapter).padStart(2, "0")} / 10`;

    }


    if (fillElement) {

        fillElement.style.width =
            `${percentage}%`;

    }


    if (textElement) {

        if (
            currentChapter >= 10
        ) {

            textElement.textContent =
                "Seluruh perjalanan telah terbuka. Lanjutkan mempelajari Basa.";

        }

        else {

            textElement.textContent =
                `Selesaikan perjalanan Level ${String(currentChapter).padStart(2, "0")} untuk membuka pelajaran berikutnya.`;

        }

    }


    updateNavbarXP(
        globalProgress
    );

}


// =========================================================
// UPDATE NAVBAR XP
// =========================================================

function updateNavbarXP(
    progress
) {

    const levelElement =
        document.getElementById(
            "navbarLevel"
        );


    const xpElement =
        document.getElementById(
            "navbarXP"
        );


    const xpTextElement =
        document.getElementById(
            "navbarXPText"
        );


    const xp =
        Number(progress.xp) || 0;


    const maxXP =
        1000;


    const percentage =
        Math.min(
            xp / maxXP * 100,
            100
        );


    const chapter =
        Number(
            progress.currentChapter
        ) || 1;


    if (levelElement) {

        levelElement.textContent =
            `Level ${String(chapter).padStart(2, "0")}`;

    }


    if (xpElement) {

        xpElement.style.width =
            `${percentage}%`;

    }


    if (xpTextElement) {

        xpTextElement.textContent =
            `${xp.toLocaleString("id-ID")} / 1.000 XP`;

    }

}


// =========================================================
// APPLY LESSON LOCK
// =========================================================

function updateLessonCards() {

    const currentChapter =
        getCurrentChapter();


    document
        .querySelectorAll(
            ".basa-word-card"
        )
        .forEach(
            function(card) {

                const level =
                    Number(
                        card.dataset.level
                    );


                if (
                    level <= currentChapter
                ) {

                    card.classList.remove(
                        "locked"
                    );

                    return;

                }


                /*
                   Jangan mengubah card
                   yang memang sudah dibangun
                   sebagai locked.
                */

                card.classList.add(
                    "locked"
                );

            }
        );

}


// =========================================================
// FILTER
// =========================================================

let activeCategory =
    "semua";


function setupCategoryFilter() {

    const tabs =
        document.querySelectorAll(
            ".basa-category-tab"
        );


    const cards =
        document.querySelectorAll(
            ".basa-word-card"
        );


    const empty =
        document.getElementById(
            "basaEmpty"
        );


    tabs.forEach(
        function(tab) {

            tab.addEventListener(
                "click",
                function() {

                    activeCategory =
                        this.dataset.category;


                    tabs.forEach(
                        function(item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );


                    let visibleCount =
                        0;


                    cards.forEach(
                        function(card) {

                            const category =
                                card.dataset.category;


                            const matches =
                                activeCategory ===
                                    "semua" ||
                                category ===
                                    activeCategory;


                            if (matches) {

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


                    if (empty) {

                        if (
                            visibleCount === 0
                        ) {

                            empty.classList.add(
                                "show"
                            );

                        }

                        else {

                            empty.classList.remove(
                                "show"
                            );

                        }

                    }

                }
            );

        }
    );

}


// =========================================================
// WORD AUDIO
// =========================================================

function speakWord(
    word
) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            word
        );


    /*
       Bahasa Indonesia digunakan
       sebagai fallback pengucapan.
    */

    utterance.lang =
        "id-ID";


    utterance.rate =
        0.8;


    utterance.pitch =
        1;


    window.speechSynthesis.speak(
        utterance
    );

}


// =========================================================
// SETUP SOUND
// =========================================================

function setupSoundButtons() {

    document
        .querySelectorAll(
            ".basa-sound-button"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        event.stopPropagation();


                        const word =
                            this.dataset.word;


                        if (!word) {

                            return;

                        }


                        speakWord(
                            word
                        );


                        this.classList.remove(
                            "playing"
                        );


                        void this.offsetWidth;


                        this.classList.add(
                            "playing"
                        );


                        setTimeout(
                            () => {

                                this.classList.remove(
                                    "playing"
                                );

                            },
                            600
                        );

                    }
                );

            }
        );

}


// =========================================================
// LEARN WORD
// =========================================================

function learnWord(
    word
) {

    if (!word) {

        return;

    }


    const progress =
        loadBasaProgress();


    if (
        !progress.learnedWords.includes(
            word
        )
    ) {

        progress.learnedWords.push(
            word
        );

    }


    saveBasaProgress(
        progress
    );

}


// =========================================================
// SETUP WORD CARDS
// =========================================================

function setupWordCards() {

    document
        .querySelectorAll(
            ".basa-word-card:not(.locked)"
        )
        .forEach(
            function(card) {

                card.addEventListener(
                    "click",
                    function(event) {

                        if (
                            event.target.closest(
                                ".basa-sound-button"
                            )
                        ) {

                            return;

                        }


                        const soundButton =
                            this.querySelector(
                                ".basa-sound-button"
                            );


                        if (!soundButton) {

                            return;

                        }


                        const word =
                            soundButton.dataset.word;


                        learnWord(
                            word
                        );

                    }
                );

            }
        );

}


// =========================================================
// COMPLETE LESSON
// =========================================================

function completeBasaLesson(
    lessonId
) {

    const progress =
        loadBasaProgress();


    if (
        !progress.completedLessons.includes(
            lessonId
        )
    ) {

        progress.completedLessons.push(
            lessonId
        );

    }


    progress.completedLessons.sort(
        function(a, b) {

            return a - b;

        }
    );


    progress.currentLesson =
        Math.min(
            lessonId + 1,
            progress.totalLessons
        );


    saveBasaProgress(
        progress
    );


    updateBasaProgress();

}


// =========================================================
// INFO
// =========================================================

function showBasaInfo() {

    const existing =
        document.querySelector(
            ".basa-info-overlay"
        );


    if (existing) {

        existing.remove();

        return;

    }


    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "basa-info-overlay";


    overlay.innerHTML = `

        <div class="basa-info-panel">

            <button
                type="button"
                class="basa-info-close"
                aria-label="Tutup"
            >
                ×
            </button>

            <span>
                TENTANG BASA
            </span>

            <h2>
                Belajar melalui perjalanan.
            </h2>

            <p>
                Halaman Basa berisi kosakata dan
                ungkapan yang membantu memahami
                dunia Lelana Kamandaka.
            </p>

            <p>
                Kosakata berikutnya akan terbuka
                mengikuti perkembangan perjalananmu.
            </p>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    const closeButton =
        overlay.querySelector(
            ".basa-info-close"
        );


    closeButton.addEventListener(
        "click",
        function() {

            overlay.remove();

        }
    );


    overlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target === overlay
            ) {

                overlay.remove();

            }

        }
    );

}


// =========================================================
// RESET BASA PROGRESS
// =========================================================

function resetBasaProgress() {

    const confirmed =
        window.confirm(
            "Apakah kamu ingin mengatur ulang progress belajar Basa?"
        );


    if (!confirmed) {

        return;

    }


    try {

        localStorage.removeItem(
            BASA_LESSON_KEY
        );

    }

    catch (error) {

        console.warn(
            "Progress Basa tidak dapat dihapus.",
            error
        );

    }


    location.reload();

}


// =========================================================
// NAVBAR MOBILE
// =========================================================

function setupBasaNavbar() {

    const toggle =
        document.getElementById(
            "navbarToggle"
        );


    const menu =
        document.getElementById(
            "navbarMobileMenu"
        );


    if (
        !toggle ||
        !menu
    ) {

        return;

    }


    toggle.addEventListener(
        "click",
        function() {

            const isOpen =
                menu.classList.toggle(
                    "open"
                );


            toggle.classList.toggle(
                "active",
                isOpen
            );


            toggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    menu
        .querySelectorAll("a")
        .forEach(
            function(link) {

                link.addEventListener(
                    "click",
                    function() {

                        menu.classList.remove(
                            "open"
                        );


                        toggle.classList.remove(
                            "active"
                        );


                        toggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );

}


// =========================================================
// NAVBAR SCROLL
// =========================================================

function setupBasaNavbarScroll() {

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
// ACTION BUTTON
// =========================================================

function setupBasaActions() {

    const resetButton =
        document.getElementById(
            "resetBasaProgress"
        );


    const infoButton =
        document.getElementById(
            "basaInfoButton"
        );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetBasaProgress
        );

    }


    if (infoButton) {

        infoButton.addEventListener(
            "click",
            showBasaInfo
        );

    }

}


// =========================================================
// INIT
// =========================================================

function initializeBasa() {

    updateBasaProgress();

    updateLessonCards();

    setupCategoryFilter();

    setupSoundButtons();

    setupWordCards();

    setupBasaNavbar();

    setupBasaNavbarScroll();

    setupBasaActions();

}


// =========================================================
// DOM READY
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeBasa();

    }
);