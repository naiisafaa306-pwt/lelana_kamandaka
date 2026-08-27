document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("siteNavbar");
    const toggle = document.getElementById("navbarToggle");
    const extra = document.getElementById("navbarExtra");

    if (!navbar || !toggle || !extra) {
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
       DROPDOWN PETA + BASA
       ===================================================== */

    toggle.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen =
            extra.classList.contains("open");

        if (isOpen) {

            extra.classList.remove("open");
            toggle.classList.remove("active");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

        } else {

            extra.classList.add("open");
            toggle.classList.add("active");

            toggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });


    /* =====================================================
       KLIK DI LUAR NAVBAR
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (!navbar.contains(event.target)) {

                extra.classList.remove("open");
                toggle.classList.remove("active");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       KLIK PETA / BASA
       ===================================================== */

    extra.querySelectorAll("a").forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    extra.classList.remove("open");
                    toggle.classList.remove("active");

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );


    /* =====================================================
       ESC
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                extra.classList.remove("open");
                toggle.classList.remove("active");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});