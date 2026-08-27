document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("siteNavbar");
    const toggle = document.getElementById("navbarToggle");
    const menu = document.getElementById("navbarMenu");
    const extra = document.getElementById("navbarExtra");

    if (!navbar) {
        return;
    }


    /* =====================================================
       NAVBAR SCROLL
       ===================================================== */

    function handleScroll() {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    handleScroll();

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    /* =====================================================
       HAMBURGER / DROPDOWN
       ===================================================== */

    if (toggle && extra) {

        toggle.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen =
                navbar.classList.contains("menu-open");

            if (isOpen) {

                navbar.classList.remove("menu-open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                navbar.classList.add("menu-open");

                toggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    }


    /* =====================================================
       TUTUP MENU KETIKA KLIK DI LUAR NAVBAR
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (!navbar.contains(event.target)) {

                navbar.classList.remove("menu-open");

                if (toggle) {

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       TUTUP MENU KETIKA KLIK LINK
       ===================================================== */

    const allLinks =
        navbar.querySelectorAll("a");

    allLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navbar.classList.remove(
                    "menu-open"
                );

                if (toggle) {

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    });


    /* =====================================================
       ESC UNTUK MENUTUP MENU
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                navbar.classList.remove(
                    "menu-open"
                );

                if (toggle) {

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

});