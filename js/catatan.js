/* =========================================================
   CATATAN — LEVEL SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".catatan-card");

    const tabs = document.querySelectorAll(".catatan-tab");

    const empty = document.getElementById("catatanEmpty");

    const levelText = document.getElementById("catatanLevel");

    const progressFill =
        document.getElementById("catatanProgressFill");

    const progressText =
        document.getElementById("catatanProgressText");


    /* =====================================================
       LEVEL PEMAIN
       ===================================================== */

    /*
       Untuk sementara Level 01.

       Nanti kalau sistem peta sudah punya level,
       angka ini bisa diambil dari localStorage.
    */

    let currentLevel =
        parseInt(
            localStorage.getItem("kamandakaLevel")
        ) || 1;


    /* Batas */

    currentLevel =
        Math.max(
            1,
            Math.min(currentLevel, 10)
        );


    /* =====================================================
       UPDATE LEVEL
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

            } else {

                const nextLevel =
                    currentLevel + 1;

                progressText.textContent =
                    `Lanjutkan perjalanan menuju Level ${String(nextLevel).padStart(2, "0")} untuk menemukan catatan baru.`;

            }

        }

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


            /*
             * Kalau level pemain sudah mencukupi,
             * card dibuka.
             */

            if (currentLevel >= requiredLevel) {

                card.classList.remove("locked");


                /*
                 * Kalau card belum punya isi normal,
                 * buat status sederhana.
                 */

                if (
                    !card.querySelector(
                        ".catatan-card-content"
                    )
                ) {

                    const number =
                        document.createElement("div");

                    number.className =
                        "catatan-card-number";

                    number.textContent =
                        "—";


                    const content =
                        document.createElement("div");

                    content.className =
                        "catatan-card-content";


                    const category =
                        document.createElement("span");

                    category.className =
                        "catatan-card-category";

                    category.textContent =
                        card.dataset.category.toUpperCase();


                    const title =
                        document.createElement("h3");

                    title.textContent =
                        "Catatan Baru";


                    const description =
                        document.createElement("p");

                    description.textContent =
                        "Catatan ini telah ditemukan dalam perjalanan Lelana Kamandaka.";


                    const status =
                        document.createElement("div");

                    status.className =
                        "catatan-card-status";

                    status.textContent =
                        "TERBUKA";


                    content.appendChild(category);
                    content.appendChild(title);
                    content.appendChild(description);
                    content.appendChild(status);

                    card.appendChild(number);
                    card.appendChild(content);

                }


                /*
                 * Lock dihapus dari tampilan.
                 */

                const lock =
                    card.querySelector(".catatan-lock");

                if (lock) {

                    lock.remove();

                }

            }


            /*
             * Kalau belum mencapai level,
             * card tetap locked.
             */

            else {

                card.classList.add("locked");

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

            } else {

                card.style.display = "none";

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
                tab.dataset.category === category;

            tab.classList.toggle(
                "active",
                active
            );

            tab.setAttribute(
                "aria-selected",
                active ? "true" : "false"
            );

        });

    }


    /* =====================================================
       TAB EVENT
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
       INIT
       ===================================================== */

    updateLevel();

    updateCards();

    filterCards("semua");

});