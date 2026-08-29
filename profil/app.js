/* ============================================================= */
/* LELANA KAMANDAKA */
/* PROFIL / PENGATURAN */
/* JAVASCRIPT */
/* ============================================================= */


/* ============================================================= */
/* DOM READY */
/* ============================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ===================================================== */
        /* AMBIL TOMBOL TUTUP */
        /* ===================================================== */

        const closeButton =
            document.getElementById(
                "closeButton"
            );


        /* ===================================================== */
        /* CEK TOMBOL */
        /* ===================================================== */

        if (
            closeButton
        ) {

            closeButton.addEventListener(
                "click",
                function () {

                    closeProfilePage();

                }
            );

        }


        /* ===================================================== */
        /* ESCAPE KEY */
        /* ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeProfilePage();

                }

            }
        );


        /* ===================================================== */
        /* TAMBAHKAN STATUS SIAP */
        /* ===================================================== */

        document.body.classList.add(
            "profile-loaded"
        );


        /* ===================================================== */
        /* INIT INTERACTION */
        /* ===================================================== */

        initializeProfileInteractions();


    }
);


/* ============================================================= */
/* CLOSE PROFILE PAGE */
/* ============================================================= */

function closeProfilePage() {

    /*
     * Kalau halaman profil dibuka dari Beranda,
     * history.back() akan membawa pengguna kembali
     * ke halaman sebelumnya.
     */

    if (
        window.history.length > 1
    ) {

        window.history.back();

        return;

    }


    /*
     * Jika tidak ada history,
     * kembali ke index.html di folder utama.
     */

    window.location.href =
        "../index.html";

}


/* ============================================================= */
/* INITIALIZE PROFILE INTERACTIONS */
/* ============================================================= */

function initializeProfileInteractions() {


    /* ========================================================= */
    /* MEMBER CARDS */
    /* ========================================================= */

    const memberCards =
        document.querySelectorAll(
            ".member-card"
        );


    memberCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "member-active"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "member-active"
                    );

                }
            );

        }
    );


    /* ========================================================= */
    /* MISSION ITEMS */
    /* ========================================================= */

    const missionItems =
        document.querySelectorAll(
            ".mission-item"
        );


    missionItems.forEach(
        function (item) {

            item.addEventListener(
                "mouseenter",
                function () {

                    item.classList.add(
                        "mission-active"
                    );

                }
            );


            item.addEventListener(
                "mouseleave",
                function () {

                    item.classList.remove(
                        "mission-active"
                    );

                }
            );

        }
    );


    /* ========================================================= */
    /* CLOSE BUTTON HOVER STATE */
    /* ========================================================= */

    const button =
        document.getElementById(
            "closeButton"
        );


    if (
        button
    ) {

        button.addEventListener(
            "mouseenter",
            function () {

                button.classList.add(
                    "close-active"
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            function () {

                button.classList.remove(
                    "close-active"
                );

            }
        );

    }

}


/* ============================================================= */
/* PREVENT INVALID EMPTY LINKS */
/* ============================================================= */

document.addEventListener(
    "click",
    function (event) {

        const target =
            event.target.closest(
                "a"
            );


        if (
            !target
        ) {

            return;

        }


        const href =
            target.getAttribute(
                "href"
            );


        if (
            href === "#"
        ) {

            event.preventDefault();

        }

    }
);


/* ============================================================= */
/* LOG PAGE READY */
/* ============================================================= */

console.log(
    "Lelana Kamandaka - halaman profil siap digunakan."
);