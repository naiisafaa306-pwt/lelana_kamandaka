/* =========================================================
   LELANA KAMANDAKA
   PROFIL PEMBUAT
   APP.JS
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializePage();

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializePage() {

    initializeLoader();

    initializeHeader();

    initializeHomeButton();

    initializeSettings();

    initializeScrollTop();

    initializeRevealAnimation();

    initializeTeamCards();

    initializeKeyboard();

}


/* =========================================================
   LOADER
   ========================================================= */

function initializeLoader() {

    const loader =
        document.getElementById(
            "pageLoader"
        );

    if (!loader) {

        return;

    }


    window.addEventListener(
        "load",
        function () {

            setTimeout(
                function () {

                    loader.classList.add(
                        "hidden"
                    );

                },
                500
            );

        }
    );

}


/* =========================================================
   HEADER
   ========================================================= */

function initializeHeader() {

    const header =
        document.getElementById(
            "siteHeader"
        );

    if (!header) {

        return;

    }


    let lastScroll =
        window.scrollY;


    window.addEventListener(
        "scroll",
        function () {

            const currentScroll =
                window.scrollY;


            if (
                currentScroll >
                40
            ) {

                header.classList.add(
                    "header-scrolled"
                );

            } else {

                header.classList.remove(
                    "header-scrolled"
                );

            }


            lastScroll =
                currentScroll;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   HOME BUTTON
   ========================================================= */

function initializeHomeButton() {

    const homeButton =
        document.getElementById(
            "homeButton"
        );

    if (!homeButton) {

        return;

    }


    homeButton.addEventListener(
        "click",
        function () {

            goBackHome();

        }
    );

}


/* =========================================================
   GO BACK HOME
   ========================================================= */

function goBackHome() {

    const hasHistory =
        window.history.length > 1;


    const currentPath =
        window.location.pathname;


    const isIndexPage =
        currentPath.endsWith(
            "index.html"
        ) ||
        currentPath === "/" ||
        currentPath === "";


    if (
        hasHistory &&
        !isIndexPage
    ) {

        window.history.back();

        return;

    }


    const homeUrl =
        "beranda.html";


    try {

        window.location.href =
            homeUrl;

    } catch (error) {

        window.location.href =
            "index.html";

    }

}


/* =========================================================
   SETTINGS
   ========================================================= */

function initializeSettings() {

    const settingsButton =
        document.getElementById(
            "settingsButton"
        );

    const settingsPanel =
        document.getElementById(
            "settingsPanel"
        );

    const settingsOverlay =
        document.getElementById(
            "settingsOverlay"
        );

    const settingsClose =
        document.getElementById(
            "settingsClose"
        );


    if (
        !settingsButton ||
        !settingsPanel ||
        !settingsOverlay
    ) {

        return;

    }


    function openSettings() {

        settingsPanel.classList.add(
            "open"
        );

        settingsOverlay.classList.add(
            "open"
        );

        settingsPanel.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "settings-open"
        );

    }


    function closeSettings() {

        settingsPanel.classList.remove(
            "open"
        );

        settingsOverlay.classList.remove(
            "open"
        );

        settingsPanel.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "settings-open"
        );

    }


    settingsButton.addEventListener(
        "click",
        function () {

            openSettings();

        }
    );


    if (settingsClose) {

        settingsClose.addEventListener(
            "click",
            function () {

                closeSettings();

            }
        );

    }


    settingsOverlay.addEventListener(
        "click",
        function () {

            closeSettings();

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeSettings();

            }

        }
    );


    initializeOrnamentToggle();

    initializeAnimationToggle();

}


/* =========================================================
   ORNAMENT TOGGLE
   ========================================================= */

function initializeOrnamentToggle() {

    const toggle =
        document.getElementById(
            "ornamentToggle"
        );


    if (!toggle) {

        return;

    }


    let enabled =
        true;


    toggle.addEventListener(
        "click",
        function () {

            enabled =
                !enabled;


            toggle.classList.toggle(
                "active",
                enabled
            );


            const decorations =
                document.querySelectorAll(
                    ".background-decoration, .background-flower, .hero-pattern, .about-geometric-pattern, .about-floral, .about-bottom-pattern, .member-pattern, .member-decoration, .member-dots, .member-circle-pattern, .member-wayang-pattern, .member-wave-pattern, .purpose-pattern, .footer-decoration"
                );


            decorations.forEach(
                function (element) {

                    if (enabled) {

                        element.style.opacity =
                            "";

                    } else {

                        element.style.opacity =
                            "0";

                    }

                }
            );

        }
    );

}


/* =========================================================
   ANIMATION TOGGLE
   ========================================================= */

function initializeAnimationToggle() {

    const toggle =
        document.getElementById(
            "animationToggle"
        );


    if (!toggle) {

        return;

    }


    let enabled =
        true;


    toggle.addEventListener(
        "click",
        function () {

            enabled =
                !enabled;


            toggle.classList.toggle(
                "active",
                enabled
            );


            document.body.classList.toggle(
                "no-animation",
                !enabled
            );

        }
    );

}


/* =========================================================
   SCROLL TOP
   ========================================================= */

function initializeScrollTop() {

    const scrollButton =
        document.getElementById(
            "scrollTop"
        );


    if (!scrollButton) {

        return;

    }


    function updateScrollButton() {

        if (
            window.scrollY >
            500
        ) {

            scrollButton.classList.add(
                "show"
            );

        } else {

            scrollButton.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollButton,
        {
            passive: true
        }
    );


    scrollButton.addEventListener(
        "click",
        function () {

            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth"
                }
            );

        }
    );


    updateScrollButton();

}


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

function initializeRevealAnimation() {

    const elements =
        document.querySelectorAll(
            ".section-reveal"
        );


    if (
        !elements.length
    ) {

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            function (
                entries,
                observerInstance
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   TEAM CARDS
   ========================================================= */

function initializeTeamCards() {

    const cards =
        document.querySelectorAll(
            ".member-card"
        );


    if (!cards.length) {

        return;

    }


    cards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "member-hover"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "member-hover"
                    );

                }
            );


            card.addEventListener(
                "focus",
                function () {

                    card.classList.add(
                        "member-hover"
                    );

                },
                true
            );


            card.addEventListener(
                "blur",
                function () {

                    card.classList.remove(
                        "member-hover"
                    );

                },
                true
            );

        }
    );

}


/* =========================================================
   KEYBOARD
   ========================================================= */

function initializeKeyboard() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Home" &&
                event.ctrlKey
            ) {

                event.preventDefault();


                window.scrollTo(
                    {
                        top: 0,
                        behavior: "smooth"
                    }
                );

            }

        }
    );

}


/* =========================================================
   ACTIVE SECTION
   ========================================================= */

function initializeActiveSection() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    if (!sections.length) {

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active-section"
                            );

                        } else {

                            entry.target.classList.remove(
                                "active-section"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(
        function (section) {

            observer.observe(
                section
            );

        }
    );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

function initializeSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView(
                        {
                            behavior: "smooth",
                            block: "start"
                        }
                    );

                }
            );

        }
    );

}


/* =========================================================
   WINDOW LOAD
   ========================================================= */

window.addEventListener(
    "load",
    function () {

        initializeActiveSection();

        initializeSmoothLinks();

    }
);


/* =========================================================
   CONSOLE INFORMATION
   ========================================================= */

console.log(
    "%cLELANA KAMANDAKA",
    "color:#c99b32;font-size:20px;font-weight:bold;"
);

console.log(
    "%cProfil Pembuat berhasil dimuat.",
    "color:#005344;font-size:13px;"
);


/* =========================================================
   END OF APP.JS
   ========================================================= */