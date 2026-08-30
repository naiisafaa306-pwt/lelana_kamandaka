/* =========================================================
   LELANA KAMANDAKA
   NAVBAR.JS

   GLOBAL NAVBAR + SIDEBAR

   Dipakai oleh seluruh halaman:
   - index.html
   - peta.html
   - catatan.html
   - basa.html
   - pencapaian.html
   - intro/intro.html
   - intro/intro2.html
   - intro/intro3.html
   - intro/intro4.html
   - gameplay/*
   ========================================================= */


/* =========================================================
   CONFIG
   ========================================================= */

const NAVBAR_FILE = "/navbar.html";

const NAVBAR_CSS_FILE =
    "/css/components/navbar.css";


/*
 * Storage progress pemain.
 */

const PROGRESS_KEY =
    "lelanaKamandakaProgress";



/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadNavbar();

    }
);



/* =========================================================
   LOAD NAVBAR CSS
   ========================================================= */

function loadNavbarCSS() {

    /*
     * Jangan membuat CSS baru.
     *
     * Fungsi ini hanya memastikan
     * navbar.css GLOBAL yang sudah ada
     * benar-benar dimuat.
     */

    const existing =
        document.querySelector(
            'link[data-global-navbar-css="true"]'
        );


    /*
     * Kalau sudah pernah dimuat,
     * jangan membuat link tambahan.
     */

    if (existing) {

        return;

    }


    /*
     * Cek apakah navbar.css sudah
     * dimuat oleh halaman.
     */

    const stylesheets =
        document.querySelectorAll(
            'link[rel="stylesheet"]'
        );


    let alreadyLoaded = false;


    stylesheets.forEach(
        function (link) {

            const href =
                link.getAttribute("href");


            if (
                href &&
                (
                    href === NAVBAR_CSS_FILE ||
                    href.endsWith(
                        "/css/components/navbar.css"
                    )
                )
            ) {

                alreadyLoaded = true;

                link.setAttribute(
                    "data-global-navbar-css",
                    "true"
                );

            }

        }
    );


    /*
     * Kalau sudah ada,
     * tidak perlu membuat link lagi.
     */

    if (alreadyLoaded) {

        return;

    }


    /*
     * Kalau belum ada,
     * muat navbar.css GLOBAL.
     */

    const style =
        document.createElement(
            "link"
        );


    style.rel =
        "stylesheet";


    style.href =
        NAVBAR_CSS_FILE;


    style.setAttribute(
        "data-global-navbar-css",
        "true"
    );


    document.head.appendChild(
        style
    );

}



/* =========================================================
   LOAD NAVBAR
   ========================================================= */

async function loadNavbar() {

    const container =
        document.getElementById(
            "globalNavbar"
        );


    /*
     * Kalau halaman tidak mempunyai
     * #globalNavbar, jangan lakukan apa-apa.
     */

    if (!container) {

        console.warn(
            "Element #globalNavbar tidak ditemukan."
        );

        return;

    }


    try {

        /*
         * Pastikan CSS GLOBAL navbar
         * tersedia terlebih dahulu.
         */

        loadNavbarCSS();


        /*
         * navbar.html selalu berasal
         * dari ROOT PROJECT.
         */

        const navbarURL =
            new URL(
                NAVBAR_FILE,
                window.location.origin
            );


        /*
         * Cache bust.
         */

        navbarURL.searchParams.set(
            "v",
            Date.now().toString()
        );


        /*
         * Fetch navbar.
         */

        const response =
            await fetch(
                navbarURL.href,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        /*
         * Cek response.
         */

        if (!response.ok) {

            throw new Error(
                "navbar.html gagal dimuat: " +
                response.status +
                " " +
                response.statusText
            );

        }


        /*
         * Ambil HTML navbar.
         */

        const html =
            await response.text();


        /*
         * Masukkan navbar ke halaman.
         */

        container.innerHTML =
            html;


        /*
         * #globalNavbar sendiri tidak boleh
         * mengganggu layout global.
         *
         * Navbar dan sidebar tetap menggunakan
         * positioning dari navbar.css.
         */

        container.style.display =
            "contents";


        /*
         * Pastikan CSS navbar tetap aktif
         * setelah HTML dimasukkan.
         */

        loadNavbarCSS();


        /*
         * Setelah navbar masuk,
         * jalankan semua fungsi global.
         */

        setActivePage();

        loadPlayerProgress();

        setupNavbarActions();


        console.log(
            "Navbar berhasil dimuat dari:",
            navbarURL.href
        );

    }

    catch (error) {

        console.error(
            "Gagal memuat navbar:",
            error
        );

    }

}



/* =========================================================
   DETEKSI HALAMAN
   ========================================================= */

function getCurrentPage() {

    /*
     * Ambil pathname halaman saat ini.
     */

    const pathname =
        window.location.pathname
            .toLowerCase();


    /* =====================================================
       INTRO
       ===================================================== */

    /*
     * Semua halaman di dalam folder /intro/
     * dianggap sebagai halaman INTRO.
     */

    if (
        pathname.includes(
            "/intro/"
        )
    ) {

        return "intro";

    }



    /* =====================================================
       GAMEPLAY
       ===================================================== */

    /*
     * Semua halaman di dalam /gameplay/
     * dianggap sebagai Gameplay.
     */

    if (
        pathname.includes(
            "/gameplay/"
        )
    ) {

        return "gameplay";

    }



    /* =====================================================
       PETA
       ===================================================== */

    if (
        pathname.endsWith(
            "/peta.html"
        )
    ) {

        return "peta";

    }



    /* =====================================================
       CATATAN
       ===================================================== */

    if (
        pathname.endsWith(
            "/catatan.html"
        )
    ) {

        return "catatan";

    }



    /* =====================================================
       PENCAPAIAN
       ===================================================== */

    if (
        pathname.endsWith(
            "/pencapaian.html"
        )
    ) {

        return "pencapaian";

    }



    /* =====================================================
       BERANDA
       ===================================================== */

    if (
        pathname === "/" ||
        pathname.endsWith(
            "/index.html"
        )
    ) {

        return "index";

    }



    /* =====================================================
       HALAMAN LAIN
       ===================================================== */

    return "";

}



/* =========================================================
   ACTIVE PAGE
   ========================================================= */

function setActivePage() {

    const currentPage =
        getCurrentPage();


    const allLinks =
        document.querySelectorAll(
            "[data-page]"
        );


    /*
     * Bersihkan active state
     * dari SEMUA link terlebih dahulu.
     */

    allLinks.forEach(
        function (link) {

            link.classList.remove(
                "active"
            );


            link.removeAttribute(
                "aria-current"
            );

        }
    );


    /*
     * Kalau currentPage kosong,
     * jangan aktifkan apa pun.
     */

    if (!currentPage) {

        return;

    }


    /*
     * Cari semua link dengan
     * data-page yang sesuai.
     */

    const activeLinks =
        document.querySelectorAll(
            `[data-page="${currentPage}"]`
        );


    /*
     * Aktifkan semua link tersebut.
     */

    activeLinks.forEach(
        function (link) {

            link.classList.add(
                "active"
            );


            link.setAttribute(
                "aria-current",
                "page"
            );

        }
    );

}



/* =========================================================
   PLAYER PROGRESS
   ========================================================= */

function loadPlayerProgress() {

    let progress = null;


    /* =====================================================
       BACA LOCAL STORAGE
       ===================================================== */

    try {

        const saved =
            localStorage.getItem(
                PROGRESS_KEY
            );


        if (saved) {

            progress =
                JSON.parse(
                    saved
                );

        }

    }

    catch (error) {

        console.error(
            "Gagal membaca progress pemain:",
            error
        );

    }



    /* =====================================================
       DEFAULT PROGRESS
       ===================================================== */

    if (!progress) {

        progress = {

            currentChapter: 1,

            xp: 0,

            basa: 0

        };

    }



    /* =====================================================
       XP
       ===================================================== */

    const xp =
        Number(
            progress.xp
        ) || 0;



    /* =====================================================
       LEVEL
       ===================================================== */

    const level =
        Math.floor(
            xp / 1000
        ) + 1;



    /* =====================================================
       CURRENT XP
       ===================================================== */

    const currentXP =
        xp % 1000;



    /* =====================================================
       UPDATE LEVEL
       ===================================================== */

    updateElement(
        "globalPlayerLevel",
        `Level ${String(level).padStart(2, "0")}`
    );



    /* =====================================================
       UPDATE TOTAL XP
       ===================================================== */

    updateElement(
        "globalPlayerXP",
        `${xp.toLocaleString("id-ID")} XP`
    );



    /* =====================================================
       UPDATE XP BOTTOM
       ===================================================== */

    updateElement(
        "globalPlayerXPBottom",
        `${currentXP.toLocaleString("id-ID")} / 1.000 XP`
    );



    /* =====================================================
       XP BAR
       ===================================================== */

    const xpBar =
        document.getElementById(
            "globalPlayerXPBar"
        );


    if (xpBar) {

        const percentage =
            Math.min(
                (currentXP / 1000) * 100,
                100
            );


        xpBar.style.width =
            `${percentage}%`;

    }

}



/* =========================================================
   UPDATE ELEMENT
   ========================================================= */

function updateElement(
    id,
    text
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            text;

    }

}



/* =========================================================
   NAVBAR ACTIONS
   ========================================================= */

function setupNavbarActions() {

    /*
     * Ambil tombol action
     * setelah navbar selesai dimuat.
     */

    const actions =
        document.querySelectorAll(
            ".lk-action"
        );



    /* =====================================================
       NOTIFICATION
       ===================================================== */

    if (
        actions[0]
    ) {

        actions[0].addEventListener(
            "click",
            function () {

                console.log(
                    "Tombol notifikasi diklik."
                );

            }
        );

    }



    /* =====================================================
       SETTINGS
       ===================================================== */

    if (
        actions[1]
    ) {

        actions[1].addEventListener(
            "click",
            function () {

                console.log(
                    "Tombol pengaturan diklik."
                );

            }
        );

    }

}



/* =========================================================
   STORAGE EVENT
   ========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        /*
         * Kalau progress berubah
         * dari tab/window lain,
         * update navbar.
         */

        if (
            event.key ===
            PROGRESS_KEY
        ) {

            loadPlayerProgress();

        }

    }
);



/* =========================================================
   PAGE SHOW
   ========================================================= */

window.addEventListener(
    "pageshow",
    function () {

        /*
         * Kalau navbar sudah tersedia,
         * refresh progress dan active page.
         */

        if (
            document.querySelector(
                ".lk-sidebar"
            )
        ) {

            loadPlayerProgress();

            setActivePage();

        }

    }
);



/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    function () {

        /*
         * Ketika halaman kembali terlihat,
         * update progress.
         */

        if (
            !document.hidden
        ) {

            loadPlayerProgress();

            setActivePage();

        }

    }
);