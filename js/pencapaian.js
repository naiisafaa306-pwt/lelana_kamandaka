/* =========================================================
   LELANA KAMANDAKA
   PENCAPAIAN
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

const ACHIEVEMENT_PROGRESS_KEY =
    "lelanaKamandakaProgress";


/* =========================================================
   LOAD PROGRESS
   ========================================================= */

function loadAchievementProgress() {

    const defaultProgress = {

        currentChapter: 1,

        totalChapters: 10,

        completedChapters: [],

        completedLocations: [],

        unlockedLocations: [1]

    };


    let savedProgress = null;


    try {

        const saved =
            sessionStorage.getItem(
                ACHIEVEMENT_PROGRESS_KEY
            );


        if (saved) {

            savedProgress =
                JSON.parse(saved);

        }

    }

    catch (error) {

        console.warn(
            "Progress pencapaian tidak dapat dibaca.",
            error
        );

    }


    const progress = {

        ...defaultProgress,

        ...(savedProgress || {})

    };


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


    return progress;

}


/* =========================================================
   UPDATE PROGRESS BAR
   ========================================================= */

function updateAchievementProgress(
    progress
) {

    const total =
        progress.totalChapters || 10;


    const completed =
        progress.completedChapters.length;


    const percentage =
        Math.min(
            (completed / total) * 100,
            100
        );


    const progressText =
        document.getElementById(
            "achievementProgressText"
        );


    const progressFill =
        document.getElementById(
            "achievementProgressFill"
        );


    const description =
        document.getElementById(
            "achievementProgressDescription"
        );


    if (progressText) {

        progressText.textContent =
            `${completed} / ${total}`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

    }


    if (description) {

        if (completed === 0) {

            description.textContent =
                "Mulai perjalanan untuk membuka pencapaian pertamamu.";

        }

        else if (completed < total) {

            description.textContent =
                `Kamu telah menyelesaikan ${completed} bagian perjalanan. Lanjutkan perjalanan untuk membuka pencapaian berikutnya.`;

        }

        else {

            description.textContent =
                "Seluruh perjalanan telah selesai. Semua pencapaian telah terbuka.";

        }

    }

}


/* =========================================================
   UPDATE ACHIEVEMENT CARDS
   ========================================================= */

function updateAchievementCards(
    progress
) {

    const cards =
        document.querySelectorAll(
            ".achievement-card"
        );


    const completed =
        progress.completedChapters || [];


    cards.forEach(
        function(card) {

            const achievementId =
                Number(
                    card.dataset.achievement
                );


            const isUnlocked =
                completed.includes(
                    achievementId
                );


            const status =
                card.querySelector(
                    ".achievement-card-status"
                );


            if (isUnlocked) {

                card.classList.add(
                    "unlocked"
                );


                if (status) {

                    status.textContent =
                        "TERBUKA";

                }

            }

            else {

                card.classList.remove(
                    "unlocked"
                );


                if (status) {

                    status.textContent =
                        "TERKUNCI";

                }

            }

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeAchievements() {

    const progress =
        loadAchievementProgress();


    updateAchievementProgress(
        progress
    );


    updateAchievementCards(
        progress
    );

}


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeAchievements();

    }
);