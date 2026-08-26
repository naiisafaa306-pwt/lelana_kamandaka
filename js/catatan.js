/* =========================================================
   LELANA KAMANDAKA
   CATATAN JAVASCRIPT
   ========================================================= */


/* =========================================================
   ELEMENT
   ========================================================= */

const catatanTabs =
    document.querySelectorAll(
        ".catatan-tab"
    );


const catatanCards =
    document.querySelectorAll(
        ".catatan-card"
    );


const catatanSectionTitle =
    document.getElementById(
        "catatanSectionTitle"
    );


const catatanEmpty =
    document.getElementById(
        "catatanEmpty"
    );


/* =========================================================
   JUDUL KATEGORI
   ========================================================= */

const sectionTitles = {

    semua:
        "Catatan yang Telah Ditemukan",

    tokoh:
        "Tokoh yang Telah Ditemukan",

    tempat:
        "Tempat yang Telah Ditemukan",

    budaya:
        "Budaya yang Telah Ditemukan",

    basa:
        "Basa yang Telah Dipelajari",

    cerita:
        "Cerita yang Telah Ditemukan"

};


/* =========================================================
   FILTER CATATAN
   ========================================================= */

function filterCatatan(
    category
) {

    let visibleCards = 0;


    catatanCards.forEach(
        function(card) {

            const cardCategory =
                card.dataset.category;


            const isVisible =
                category === "semua" ||
                cardCategory === category;


            if (isVisible) {

                card.classList.remove(
                    "hidden"
                );

                visibleCards++;

            }

            else {

                card.classList.add(
                    "hidden"
                );

            }

        }
    );


    /* =============================================
       UPDATE JUDUL
       ============================================= */

    if (catatanSectionTitle) {

        catatanSectionTitle.style.opacity =
            "0";


        setTimeout(
            function() {

                catatanSectionTitle.textContent =
                    sectionTitles[category] ||
                    sectionTitles.semua;


                catatanSectionTitle.style.opacity =
                    "1";

            },
            120
        );

    }


    /* =============================================
       EMPTY STATE
       ============================================= */

    if (catatanEmpty) {

        if (visibleCards === 0) {

            catatanEmpty.classList.add(
                "show"
            );

        }

        else {

            catatanEmpty.classList.remove(
                "show"
            );

        }

    }

}


/* =========================================================
   ACTIVE TAB
   ========================================================= */

function setActiveTab(
    activeTab
) {

    catatanTabs.forEach(
        function(tab) {

            const isActive =
                tab === activeTab;


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

}


/* =========================================================
   TAB CLICK
   ========================================================= */

catatanTabs.forEach(
    function(tab) {

        tab.addEventListener(
            "click",
            function() {

                const category =
                    this.dataset.category;


                if (!category) {

                    return;

                }


                setActiveTab(
                    this
                );


                filterCatatan(
                    category
                );


                /* =================================
                   SCROLL HALUS KE KONTEN
                   ================================= */

                const content =
                    document.querySelector(
                        ".catatan-content"
                    );


                if (content) {

                    const navbar =
                        document.querySelector(
                            ".site-navbar"
                        );


                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;


                    const target =
                        content.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight -
                        25;


                    window.scrollTo({

                        top:
                            target,

                        behavior:
                            "smooth"

                    });

                }

            }
        );

    }
);


/* =========================================================
   NAVBAR SCROLL
   ========================================================= */

function setupNavbarScroll() {

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


/* =========================================================
   KEYBOARD NAVIGATION TAB
   ========================================================= */

catatanTabs.forEach(
    function(tab, index) {

        tab.addEventListener(
            "keydown",
            function(event) {

                let newIndex =
                    index;


                /* =============================
                   ARROW RIGHT
                   ============================= */

                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    newIndex =
                        (index + 1) %
                        catatanTabs.length;

                }


                /* =============================
                   ARROW LEFT
                   ============================= */

                else if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    newIndex =
                        (
                            index -
                            1 +
                            catatanTabs.length
                        ) %
                        catatanTabs.length;

                }


                /* =============================
                   ENTER / SPACE
                   ============================= */

                else if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    tab.click();

                    return;

                }

                else {

                    return;

                }


                event.preventDefault();


                catatanTabs[
                    newIndex
                ].focus();


                catatanTabs[
                    newIndex
                ].click();

            }
        );

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeCatatan() {

    /* =============================
       DEFAULT = SEMUA
       ============================= */

    filterCatatan(
        "semua"
    );


    /* =============================
       NAVBAR
       ============================= */

    setupNavbarScroll();

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