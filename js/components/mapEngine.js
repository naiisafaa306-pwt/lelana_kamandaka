// =========================================================
// MAP ENGINE
// LELANA KAMANDAKA
// =========================================================


// =========================================================
// DATA LOKASI
// =========================================================

const mapLocations = [

    {
        id: 1,
        name: "Padjajaran",
        unlocked: true,
        gameplay: "gameplay/gameplay01/index.html"
    },

    {
        id: 2,
        name: "Ki Ajar Winarong",
        unlocked: false,
        gameplay: "gameplay/gameplay02/index.html"
    },

    {
        id: 3,
        name: "Pasir Luhur",
        unlocked: false,
        gameplay: "gameplay/gameplay03/index.html"
    },

    {
        id: 4,
        name: "Kali Logawa",
        unlocked: false,
        gameplay: "gameplay/gameplay04/index.html"
    },

    {
        id: 5,
        name: "Desa Panagih",
        unlocked: false,
        gameplay: "gameplay/gameplay05/index.html"
    },

    {
        id: 6,
        name: "Goa Jatijajar",
        unlocked: false,
        gameplay: "gameplay/gameplay06/index.html"
    },

    {
        id: 7,
        name: "Batur Agung",
        unlocked: false,
        gameplay: "gameplay/gameplay07/index.html"
    },

    {
        id: 8,
        name: "Sawangan",
        unlocked: false,
        gameplay: "gameplay/gameplay08/index.html"
    },

    {
        id: 9,
        name: "Kali Serayu",
        unlocked: false,
        gameplay: "gameplay/gameplay09/index.html"
    },

    {
        id: 10,
        name: "Desa Rosari",
        unlocked: false,
        gameplay: "gameplay/gameplay10/index.html"
    }

];



// =========================================================
// ROUTE DATA
// =========================================================

const mapRoutes = [

    {
        from: 1,
        to: 2,
        element: "route-1-2"
    },

    {
        from: 2,
        to: 3,
        element: "route-2-3"
    },

    {
        from: 3,
        to: 4,
        element: "route-3-4"
    },

    {
        from: 4,
        to: 5,
        element: "route-4-5"
    },

    {
        from: 5,
        to: 6,
        element: "route-5-6"
    },

    {
        from: 6,
        to: 7,
        element: "route-6-7"
    },

    {
        from: 7,
        to: 8,
        element: "route-7-8"
    },

    {
        from: 8,
        to: 9,
        element: "route-8-9"
    },

    {
        from: 9,
        to: 10,
        element: "route-9-10"
    }

];



// =========================================================
// INITIAL MAP STATE
// =========================================================

function initializeMap() {

    console.log("Map Engine berjalan.");

    console.log(
        "Jumlah lokasi:",
        mapLocations.length
    );

    console.log(
        "Jumlah jalur:",
        mapRoutes.length
    );

    updateLocations();

    updateRoutes();

}



// =========================================================
// UPDATE LOKASI
// =========================================================

function updateLocations() {

    mapLocations.forEach(location => {

        const element =
            document.querySelector(
                `.map-location[data-location="${location.id}"]`
            );


        if (!element) {
            return;
        }


        const image =
            element.querySelector("img");


        if (!image) {
            return;
        }


        // =============================================
        // LOKASI TERBUKA
        // =============================================

        if (location.unlocked) {

            element.classList.add("unlocked");

            element.classList.remove("locked");


            image.src =
                "assets/icons/lokasi.png";


            element.disabled = false;


            element.setAttribute(
                "aria-label",
                `${location.name} — Lokasi terbuka`
            );

        }


        // =============================================
        // LOKASI TERKUNCI
        // =============================================

        else {

            element.classList.add("locked");

            element.classList.remove("unlocked");


            image.src =
                "assets/icons/gembok.png";


            element.disabled = true;


            element.setAttribute(
                "aria-label",
                `${location.name} — Terkunci`
            );

        }

    });

}



// =========================================================
// UPDATE JALUR
// =========================================================

function updateRoutes() {

    mapRoutes.forEach(route => {

        const element =
            document.getElementById(
                route.element
            );


        if (!element) {
            return;
        }


        /*
            Jalur akan aktif kalau
            lokasi tujuan sudah terbuka.
        */

        const destination =
            mapLocations.find(
                location =>
                    location.id === route.to
            );


        if (
            destination &&
            destination.unlocked
        ) {

            element.classList.add(
                "completed"
            );

        } else {

            element.classList.remove(
                "completed"
            );

        }

    });

}



// =========================================================
// KLIK LOKASI
// =========================================================

function setupLocationEvents() {

    document
        .querySelectorAll(".map-location")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    const locationId =
                        Number(
                            this.dataset.location
                        );


                    const location =
                        mapLocations.find(
                            item =>
                                item.id === locationId
                        );


                    if (!location) {
                        return;
                    }


                    // =================================
                    // CEK TERKUNCI
                    // =================================

                    if (!location.unlocked) {

                        console.log(
                            `Lokasi ${locationId} masih terkunci.`
                        );

                        return;

                    }


                    // =================================
                    // LOKASI TERBUKA
                    // =================================

                    console.log(
                        `Membuka ${location.name}`
                    );


                    console.log(
                        `Menuju: ${location.gameplay}`
                    );


                    // =================================
                    // MASUK KE GAMEPLAY
                    // =================================

                    window.location.href =
                        location.gameplay;

                }

            );

        });

}



// =========================================================
// NAVBAR SCROLL
// =========================================================

function setupNavbar() {

    const navbar =
        document.getElementById(
            "siteNavbar"
        );


    if (!navbar) {
        return;
    }


    function handleScroll() {

        if (window.scrollY > 30) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

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
// INIT
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeMap();

        setupLocationEvents();

        setupNavbar();

    }
);