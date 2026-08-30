/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 01 — PAJAJARAN
   APP.JS

   ALUR:

   SCREEN 01
   PAJAJARAN
        ↓
   SCREEN 02
   PERIKSA BEKAL
        ↓
   BELAJAR KOSAKATA + QUIZ
        ↓
   SCREEN 03
   BACA SURAT
        ↓
   BELAJAR KALIMAT + QUIZ
        ↓
   SCREEN 04
   PERIKSA PETA
        ↓
   BELAJAR ARAH + QUIZ
        ↓
   SCREEN 05
   PAJAJARAN SELESAI
        ↓
   +100 XP
        ↓
   KI AJAR WINARONG UNLOCK
        ↓
   KEMBALI KE PETA

   CATATAN:
   - Tidak menggunakan popup.
   - Tidak membuat section gameplay baru.
   - Menggunakan screen01-screen05 dari HTML.
   - Setiap perpindahan mengganti screen.
   - Sidebar/navbar tetap terlihat.
   - Gameplay fullscreen pada area utama.
   - Progress tersimpan di localStorage.
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       CONFIG
       ===================================================== */

    const STORAGE_KEY = "lelanaKamandakaProgress";

    const XP_PER_LOCATION = 100;

    const MAX_XP = 1000;

    const CURRENT_LOCATION = 1;

    const NEXT_LOCATION = 2;

    const ASSET_PATH = "../../assets/decorations/";


    /* =====================================================
       SCREEN
       ===================================================== */

    const screens = {
        opening: document.getElementById("screen01"),
        bekal: document.getElementById("screen02"),
        surat: document.getElementById("screen03"),
        map: document.getElementById("screen04"),
        finish: document.getElementById("screen05")
    };


    /* =====================================================
       VALIDATE SCREEN
       ===================================================== */

    Object.entries(screens).forEach(([name, screen]) => {

        if (!screen) {

            console.warn(
                `Screen "${name}" tidak ditemukan di HTML.`
            );

        }

    });


    /* =====================================================
       TASK DATA
       ===================================================== */

    const tasks = [

        {
            id: "bekal",

            screen: "screen02",

            nextScreen: "screen03",

            title: "Periksa Bekal",

            label: "BEKAL PERJALANAN",

            image: `${ASSET_PATH}bekal.png`,

            words: [

                {
                    word: "Banyu",
                    meaning: "Air"
                },

                {
                    word: "Pangan",
                    meaning: "Makanan"
                },

                {
                    word: "Sandhangan",
                    meaning: "Pakaian"
                },

                {
                    word: "Obor",
                    meaning: "Penerangan"
                }

            ],

            question: "Apa tegese tembung “banyu”?",

            answers: [
                "Makanan",
                "Air",
                "Pakaian"
            ],

            correctAnswer: "Air"
        },


        {
            id: "surat",

            screen: "screen03",

            nextScreen: "screen04",

            title: "Baca Surat",

            label: "PESEN KANGGO KAMANDAKA",

            image: `${ASSET_PATH}surat.png`,

            words: [

                {
                    word: "Lelampahan",
                    meaning: "Perjalanan"
                },

                {
                    word: "Ngati-ati",
                    meaning: "Berhati-hati"
                },

                {
                    word: "Aja",
                    meaning: "Jangan"
                },

                {
                    word: "Kesusu",
                    meaning: "Terburu-buru"
                }

            ],

            story:
                "“Kamandaka, yen arep nerusake lelampahan, kudu ngati-ati lan aja kesusu.”",

            translation:
                "Kamandaka, jika ingin melanjutkan perjalanan, harus berhati-hati dan jangan terburu-buru.",

            question:
                "Apa tegese “aja kesusu”?",

            answers: [
                "Jangan berhenti",
                "Jangan berjalan",
                "Jangan terburu-buru"
            ],

            correctAnswer:
                "Jangan terburu-buru"
        },


        {
            id: "map",

            screen: "screen04",

            nextScreen: "screen05",

            title: "Periksa Peta",

            label: "PETA LELAMPAHAN",

            image: `${ASSET_PATH}map.png`,

            words: [

                {
                    word: "Wetan",
                    meaning: "Timur"
                },

                {
                    word: "Kulon",
                    meaning: "Barat"
                },

                {
                    word: "Lor",
                    meaning: "Utara"
                },

                {
                    word: "Kidul",
                    meaning: "Selatan"
                }

            ],

            question:
                "“Kamandaka kudu mlaku menyang wetan.” Menyang arah ngendi?",

            answers: [
                "Kulon",
                "Wetan",
                "Kidul"
            ],

            correctAnswer:
                "Wetan"
        }

    ];


    /* =====================================================
       STATE
       ===================================================== */

    let progress = loadProgress();

    let currentTask = null;

    let currentScreen = null;


    /* =====================================================
       LOAD PROGRESS
       ===================================================== */

    function loadProgress() {

        try {

            const saved =
                localStorage.getItem(STORAGE_KEY);


            if (!saved) {

                return createDefaultProgress();

            }


            const parsed =
                JSON.parse(saved);


            return {

                level:
                    Number(
                        parsed.level ?? 1
                    ),

                xp:
                    Number(
                        parsed.xp ?? 0
                    ),

                currentLocation:
                    Number(
                        parsed.currentLocation ?? 1
                    ),

                completedLocations:
                    Array.isArray(
                        parsed.completedLocations
                    )
                        ? parsed.completedLocations
                        : [],

                completedTasks:
                    parsed.completedTasks &&
                    typeof parsed.completedTasks === "object"
                        ? parsed.completedTasks
                        : {},

                locationTasks:
                    parsed.locationTasks &&
                    typeof parsed.locationTasks === "object"
                        ? parsed.locationTasks
                        : {},

                learnedWords:
                    parsed.learnedWords &&
                    typeof parsed.learnedWords === "object"
                        ? parsed.learnedWords
                        : {}

            };


        } catch (error) {

            console.error(
                "Gagal memuat progress:",
                error
            );

            return createDefaultProgress();

        }

    }


    /* =====================================================
       DEFAULT PROGRESS
       ===================================================== */

    function createDefaultProgress() {

        return {

            level: 1,

            xp: 0,

            currentLocation: 1,

            completedLocations: [],

            completedTasks: {},

            locationTasks: {},

            learnedWords: {}

        };

    }


    /* =====================================================
       SAVE PROGRESS
       ===================================================== */

    function saveProgress() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(progress)
            );

        } catch (error) {

            console.error(
                "Gagal menyimpan progress:",
                error
            );

        }

    }


    /* =====================================================
       INITIALIZE TASK STATE
       ===================================================== */

    function initializeTaskState() {

        if (
            !progress.locationTasks[
                CURRENT_LOCATION
            ]
        ) {

            progress.locationTasks[
                CURRENT_LOCATION
            ] = {};

        }


        tasks.forEach((task) => {

            if (
                typeof progress
                    .locationTasks[
                        CURRENT_LOCATION
                    ][
                        task.id
                    ] !==
                    "boolean"
            ) {

                progress
                    .locationTasks[
                        CURRENT_LOCATION
                    ][
                        task.id
                    ] = false;

            }

        });


        if (
            !Array.isArray(
                progress.completedTasks[
                    CURRENT_LOCATION
                ]
            )
        ) {

            progress.completedTasks[
                CURRENT_LOCATION
            ] = [];

        }


        saveProgress();

    }


    initializeTaskState();


    /* =====================================================
       INSTALL GAMEPLAY SCREEN STYLE
       =====================================================

       CSS ini hanya mengatur SISTEM SCREEN.
       Tampilan visual utama tetap berasal dari style.css.
       ===================================================== */

    function installGameplayScreenStyle() {

        const oldStyle =
            document.getElementById(
                "lelanaGameplayScreenStyle"
            );


        if (oldStyle) {

            oldStyle.remove();

        }


        const style =
            document.createElement("style");


        style.id =
            "lelanaGameplayScreenStyle";


        style.textContent = `

            /* =================================================
               SCREEN SYSTEM
               ================================================= */

            .game-screen {
                display: none !important;
                width: 100%;
            }


            .game-screen.active {
                display: block !important;
            }


            /* =================================================
               GAMEPLAY MODE
               ================================================= */

            body.is-gameplay-active {
                overflow: hidden !important;
            }


            body.is-gameplay-active
            .lk-navbar {
                visibility: visible !important;
                pointer-events: auto !important;
                z-index: 600 !important;
            }


            body.is-gameplay-active
            .lk-main {
                position: relative;
                z-index: 1;
            }


            body.is-gameplay-active
            .lk-content {
                position: static !important;
                width: 100% !important;
                max-width: none !important;
                min-height: 100vh !important;
                margin: 0 !important;
                padding: 0 !important;
            }


            /* =================================================
               ACTIVE SCREEN
               ================================================= */

            body.is-gameplay-active
            .game-screen.active {
                position: fixed !important;

                top: 78px !important;
                right: 0 !important;
                bottom: 0 !important;
                left: 212px !important;

                width: auto !important;
                height: calc(100vh - 78px) !important;
                min-height: calc(100vh - 78px) !important;

                margin: 0 !important;
                padding: 0 !important;

                overflow-y: auto !important;
                overflow-x: hidden !important;

                z-index: 500 !important;

                background: #f8f1df;
            }


            /* =================================================
               SCREEN INNER
               ================================================= */

            body.is-gameplay-active
            .game-screen.active
            .game-screen-inner {
                width: 100%;
                min-height: calc(100vh - 78px);
            }


            /* =================================================
               SCREEN 01
               ================================================= */

            body.is-gameplay-active
            #screen01
            .gameplay-hero {

                width: 100% !important;

                height: calc(100vh - 78px) !important;

                min-height: calc(100vh - 78px) !important;

                margin: 0 !important;

                border-radius: 0 !important;

            }


            body.is-gameplay-active
            #screen01
            .gameplay-hero-bg {

                width: 100% !important;

                height: 100% !important;

                object-fit: cover !important;

            }


            /* =================================================
               SCREEN 02-04
               ================================================= */

            body.is-gameplay-active
            .game-screen:not(#screen01)
            .game-screen-inner {

                position: relative;

                display: grid;

                grid-template-columns:
                    minmax(300px, .9fr)
                    minmax(350px, 1.1fr);

                align-items: center;

                gap: 40px;

                width: 100%;

                min-height: calc(100vh - 78px);

                padding: 60px 7vw;

                overflow: hidden;

                background:
                    radial-gradient(
                        circle at 75% 50%,
                        rgba(212,183,53,.14),
                        transparent 35%
                    ),
                    linear-gradient(
                        135deg,
                        #fffaf0,
                        #eee4cd
                    );

            }


            /* =================================================
               GAME TEXT
               ================================================= */

            body.is-gameplay-active
            .game-screen-text {

                max-width: 560px;

                min-width: 0;

            }


            .game-screen-label {

                display: block;

                color: #ad8920;

                font-size: 10px;

                font-weight: 800;

                letter-spacing: .18em;

            }


            body.is-gameplay-active
            .game-screen-text h1 {

                margin: 12px 0 18px;

                color: #172e14;

                font-family:
                    "Libre Caslon Text",
                    Georgia,
                    serif;

                font-size:
                    clamp(
                        44px,
                        5vw,
                        76px
                    );

                line-height: .98;

            }


            body.is-gameplay-active
            .game-screen-text p {

                max-width: 560px;

                color: #59452f;

                font-size: 15px;

                line-height: 1.8;

            }


            .game-screen-hint {

                margin-top: 12px;

                color: #806f58 !important;

                font-size: 11px !important;

                line-height: 1.6 !important;

            }


            /* =================================================
               STORY
               ================================================= */

            .game-screen-story {

                margin-top: 18px;

                padding: 18px 20px;

                border-left:
                    3px solid
                    #d4b735;

                border-radius:
                    0 10px 10px 0;

                background:
                    rgba(255,255,255,.62);

                color:
                    #4e3d2a;

                font-family:
                    "Libre Caslon Text",
                    Georgia,
                    serif;

                font-size: 15px;

                line-height: 1.75;

            }


            .game-screen-story strong {

                display: block;

            }


            .game-screen-translation {

                margin-top: 8px;

                color:
                    #806f58 !important;

                font-family:
                    "Hanken Grotesk",
                    Arial,
                    sans-serif;

                font-size:
                    11px !important;

                line-height:
                    1.6 !important;

            }


            /* =================================================
               VOCABULARY
               ================================================= */

            .game-screen-vocabulary {

                display: grid;

                grid-template-columns:
                    repeat(
                        2,
                        minmax(0, 1fr)
                    );

                gap: 8px;

                margin-top: 18px;

                max-width: 540px;

            }


            .game-vocab {

                padding:
                    11px 13px;

                border:
                    1px solid
                    rgba(23,61,25,.12);

                border-radius: 9px;

                background:
                    rgba(255,255,255,.60);

            }


            .game-vocab strong {

                display: block;

                color:
                    #173d19;

                font-size:
                    12px;

            }


            .game-vocab span {

                display: block;

                margin-top: 3px;

                color:
                    #7c6a51;

                font-size:
                    10px;

            }


            /* =================================================
               QUIZ
               ================================================= */

            .game-screen-quiz {

                margin-top: 18px;

                max-width: 560px;

                padding: 17px;

                border:
                    1px solid
                    rgba(23,61,25,.12);

                border-radius: 12px;

                background:
                    rgba(255,255,255,.68);

            }


            .game-screen-quiz-title {

                display: block;

                margin-bottom: 10px;

                color:
                    #173d19;

                font-size:
                    12px;

                font-weight:
                    800;

                line-height:
                    1.5;

            }


            .game-screen-answers {

                display: grid;

                grid-template-columns:
                    repeat(
                        3,
                        minmax(0,1fr)
                    );

                gap: 8px;

            }


            .game-screen-answer {

                min-height: 42px;

                padding:
                    8px 10px;

                border:
                    1px solid
                    rgba(23,61,25,.16);

                border-radius: 8px;

                color:
                    #36502f;

                background:
                    #fffdf6;

                cursor:
                    pointer;

                font-family:
                    inherit;

                font-size:
                    10px;

                font-weight:
                    700;

                line-height:
                    1.4;

                transition:
                    .2s ease;

            }


            .game-screen-answer:hover {

                border-color:
                    #b3942d;

                transform:
                    translateY(-2px);

            }


            .game-screen-answer:disabled {

                cursor:
                    default;

            }


            .game-screen-answer.correct {

                color:
                    #fff;

                background:
                    #38551e;

                border-color:
                    #38551e;

            }


            .game-screen-answer.wrong {

                color:
                    #713d2d;

                background:
                    #f2dfd4;

                border-color:
                    #bd8169;

            }


            .game-screen-feedback {

                display:
                    none;

                margin-top: 10px;

                padding:
                    9px 11px;

                border-radius: 8px;

                background:
                    rgba(212,183,53,.12);

                color:
                    #665329;

                font-size:
                    10px;

                line-height:
                    1.6;

            }


            .game-screen-feedback.show {

                display:
                    block;

            }


            /* =================================================
               VISUAL
               ================================================= */

            body.is-gameplay-active
            .game-screen-visual {

                display:
                    flex;

                align-items:
                    center;

                justify-content:
                    center;

                width:
                    100%;

                height:
                    100%;

                min-height:
                    420px;

            }


            body.is-gameplay-active
            .game-screen-visual img {

                display:
                    block;

                max-width:
                    90%;

                max-height:
                    72vh;

                width:
                    auto;

                height:
                    auto;

                object-fit:
                    contain;

                filter:
                    drop-shadow(
                        0 20px 30px
                        rgba(35,55,30,.18)
                    );

                animation:
                    lelanaArtFloat
                    5s ease-in-out infinite;

            }


            @keyframes lelanaArtFloat {

                0%,
                100% {

                    transform:
                        translateY(0);

                }

                50% {

                    transform:
                        translateY(-8px);

                }

            }


            /* =================================================
               ACTION
               ================================================= */

            body.is-gameplay-active
            .game-screen-action {

                position:
                    absolute;

                left:
                    7vw;

                bottom:
                    30px;

                z-index:
                    5;

            }


            .gameplay-screen-button {

                min-width:
                    230px;

                min-height:
                    52px;

                display:
                    inline-flex;

                align-items:
                    center;

                justify-content:
                    space-between;

                gap:
                    25px;

                padding:
                    0 20px;

                border:
                    1px solid
                    #173d19;

                border-radius:
                    10px;

                color:
                    #fff8d4;

                background:
                    #173d19;

                cursor:
                    pointer;

                font-size:
                    11px;

                font-weight:
                    800;

                letter-spacing:
                    .08em;

                transition:
                    .25s ease;

            }


            .gameplay-screen-button:hover {

                background:
                    #38551e;

                transform:
                    translateY(-2px);

                box-shadow:
                    0 12px 25px
                    rgba(20,50,20,.18);

            }


            .gameplay-screen-button:disabled {

                opacity:
                    .65;

                cursor:
                    default;

                transform:
                    none;

                box-shadow:
                    none;

            }


            .gameplay-screen-button span:last-child {

                font-size:
                    18px;

            }


            /* =================================================
               FINISH SCREEN
               ================================================= */

            body.is-gameplay-active
            #screen05
            .gameplay-finish {

                display:
                    flex !important;

                flex-direction:
                    column;

                align-items:
                    center;

                justify-content:
                    center;

                text-align:
                    center;

                width:
                    100%;

                height:
                    calc(100vh - 78px);

                min-height:
                    calc(100vh - 78px);

                padding:
                    50px;

                background:
                    radial-gradient(
                        circle at center,
                        rgba(212,183,53,.20),
                        transparent 45%
                    ),
                    linear-gradient(
                        135deg,
                        #fffaf0,
                        #eee4cd
                    );

            }


            body.is-gameplay-active
            #screen05
            .gameplay-finish-symbol {

                width:
                    70px;

                height:
                    70px;

                display:
                    grid;

                place-items:
                    center;

                margin:
                    0 auto 20px;

                border-radius:
                    50%;

                background:
                    #e9ce4e;

                color:
                    #183317;

                font-size:
                    30px;

                box-shadow:
                    0 12px 25px
                    rgba(112,92,20,.15);

            }


            body.is-gameplay-active
            #screen05
            .gameplay-finish h1 {

                margin:
                    12px 0 18px;

                color:
                    #172e14;

                font-family:
                    "Libre Caslon Text",
                    Georgia,
                    serif;

                font-size:
                    clamp(
                        44px,
                        6vw,
                        78px
                    );

                line-height:
                    .94;

            }


            body.is-gameplay-active
            #screen05
            .gameplay-finish p {

                max-width:
                    520px;

                color:
                    #59452f;

                font-size:
                    14px;

                line-height:
                    1.8;

            }


            body.is-gameplay-active
            #screen05
            .gameplay-reward {

                display:
                    flex;

                flex-direction:
                    column;

                align-items:
                    center;

                margin:
                    20px 0 25px;

            }


            body.is-gameplay-active
            #screen05
            .gameplay-reward span {

                color:
                    #ad8920;

                font-size:
                    9px;

                font-weight:
                    800;

                letter-spacing:
                    .18em;

            }


            body.is-gameplay-active
            #screen05
            .gameplay-reward strong {

                margin-top:
                    5px;

                color:
                    #173d19;

                font-family:
                    "Libre Caslon Text",
                    Georgia,
                    serif;

                font-size:
                    30px;

            }


            body.is-gameplay-active
            #screen05
            .gameplay-finish-button {

                min-width:
                    240px;

                min-height:
                    52px;

                display:
                    inline-flex;

                align-items:
                    center;

                justify-content:
                    space-between;

                gap:
                    25px;

                padding:
                    0 22px;

                border:
                    0;

                border-radius:
                    10px;

                color:
                    #fff8d4;

                background:
                    #173d19;

                cursor:
                    pointer;

                font-size:
                    11px;

                font-weight:
                    800;

                letter-spacing:
                    .08em;

                transition:
                    .25s ease;

            }


            body.is-gameplay-active
            #screen05
            .gameplay-finish-button:hover {

                background:
                    #38551e;

                transform:
                    translateY(-2px);

            }


            body.is-gameplay-active
            #screen05
            .gameplay-finish-button span:last-child {

                font-size:
                    18px;

            }


            /* =================================================
               SCREEN TRANSITION
               ================================================= */

            .game-screen.active {

                animation:
                    lelanaScreenIn
                    .4s
                    ease
                    both;

            }


            @keyframes lelanaScreenIn {

                from {

                    opacity:
                        0;

                    transform:
                        translateY(15px);

                }

                to {

                    opacity:
                        1;

                    transform:
                        translateY(0);

                }

            }


            /* =================================================
               MOBILE
               ================================================= */

            @media (max-width: 800px) {

                body.is-gameplay-active
                .game-screen.active {

                    left:
                        0 !important;

                }


                body.is-gameplay-active
                .game-screen:not(#screen01)
                .game-screen-inner {

                    grid-template-columns:
                        1fr;

                    min-height:
                        calc(100vh - 78px);

                    overflow-y:
                        auto;

                    padding:
                        40px 25px 110px;

                }


                body.is-gameplay-active
                .game-screen-visual {

                    min-height:
                        220px;

                    order:
                        -1;

                }


                body.is-gameplay-active
                .game-screen-visual img {

                    max-height:
                        32vh;

                }


                body.is-gameplay-active
                .game-screen-action {

                    left:
                        25px;

                    right:
                        25px;

                    bottom:
                        20px;

                }


                .gameplay-screen-button {

                    width:
                        100%;

                }


                .game-screen-vocabulary {

                    grid-template-columns:
                        1fr 1fr;

                }


                .game-screen-answers {

                    grid-template-columns:
                        1fr;

                }


                body.is-gameplay-active
                #screen05
                .gameplay-finish {

                    min-height:
                        calc(100vh - 78px);

                    height:
                        calc(100vh - 78px);

                    padding:
                        30px 20px;

                }

            }


            /* =================================================
               VERY SMALL MOBILE
               ================================================= */

            @media (max-width: 420px) {

                .game-screen-vocabulary {

                    grid-template-columns:
                        1fr;

                }


                .game-screen-quiz {

                    padding:
                        14px;

                }


                body.is-gameplay-active
                .game-screen-text h1 {

                    font-size:
                        42px;

                }


                body.is-gameplay-active
                #screen05
                .gameplay-finish h1 {

                    font-size:
                        43px;

                }

            }

        `;


        document.head.appendChild(style);

    }


    installGameplayScreenStyle();


    /* =====================================================
       HIDE ALL SCREENS
       ===================================================== */

    function hideAllScreens() {

        Object
            .values(screens)
            .forEach((screen) => {

                if (!screen) {
                    return;
                }

                screen.classList.remove("active");

            });

    }


    /* =====================================================
       SHOW SCREEN
       ===================================================== */

    function showScreen(screenId) {

        const target =
            document.getElementById(screenId);


        if (!target) {

            console.error(
                `Screen ${screenId} tidak ditemukan di HTML.`
            );

            return false;

        }


        hideAllScreens();


        target.classList.remove("active");


        /*
         * Force reflow supaya animasi screen
         * selalu berjalan ketika pindah.
         */

        void target.offsetWidth;


        target.classList.add("active");


        currentScreen =
            screenId;


        document.body.classList.add(
            "is-gameplay-active"
        );


        /*
         * Jangan scroll seluruh halaman.
         * Yang di-scroll adalah screen aktif.
         */

        target.scrollTop = 0;


        return true;

    }


    /* =====================================================
       CLOSE GAMEPLAY
       ===================================================== */

    function closeGameplay() {

        hideAllScreens();

        document.body.classList.remove(
            "is-gameplay-active"
        );

        currentScreen = null;

        currentTask = null;

        window.scrollTo(
            0,
            0
        );

    }


    /* =====================================================
       GET FIRST INCOMPLETE TASK
       ===================================================== */

    function getFirstIncompleteTask() {

        const locationTasks =
            progress.locationTasks[
                CURRENT_LOCATION
            ] || {};


        return tasks.find(
            (task) =>
                locationTasks[
                    task.id
                ] !== true
        ) || null;

    }


    /* =====================================================
       START JOURNEY
       ===================================================== */

    const startButton =
        document.getElementById(
            "startJourneyButton"
        );


    if (startButton) {

        startButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();


                progress.currentLocation =
                    CURRENT_LOCATION;


                if (
                    !progress.locationTasks[
                        CURRENT_LOCATION
                    ]
                ) {

                    progress.locationTasks[
                        CURRENT_LOCATION
                    ] = {};

                }


                /*
                 * Mulai dari task pertama:
                 * BEKAL.
                 */

                currentTask =
                    tasks[0];


                prepareTaskScreen(
                    currentTask
                );


                saveProgress();


                showScreen(
                    "screen02"
                );

            }
        );

    }


    /* =====================================================
       START TASK
       ===================================================== */

    function startTask(taskId) {

        const task =
            tasks.find(
                (item) =>
                    item.id === taskId
            );


        if (!task) {

            console.error(
                `Task ${taskId} tidak ditemukan.`
            );

            return;

        }


        currentTask =
            task;


        prepareTaskScreen(
            task
        );


        showScreen(
            task.screen
        );

    }


    /* =====================================================
       PREPARE TASK SCREEN
       ===================================================== */

    function prepareTaskScreen(task) {

        if (!task) {
            return;
        }


        const screen =
            document.getElementById(
                task.screen
            );


        if (!screen) {

            console.error(
                `Tidak menemukan ${task.screen}.`
            );

            return;

        }


        /* -------------------------------------------------
           IMAGE
           ------------------------------------------------- */

        const image =
            screen.querySelector(
                ".game-screen-visual img"
            );


        if (image) {

            image.src =
                task.image;

            image.alt =
                task.title;

        }


        /* -------------------------------------------------
           LABEL
           ------------------------------------------------- */

        const label =
            screen.querySelector(
                ".game-screen-label"
            );


        if (label) {

            label.textContent =
                task.label;

        }


        /* -------------------------------------------------
           TITLE
           ------------------------------------------------- */

        const title =
            screen.querySelector(
                ".game-screen-text h1"
            );


        if (title) {

            title.textContent =
                task.title;

        }


        /* -------------------------------------------------
           VOCABULARY
           ------------------------------------------------- */

        renderVocabulary(
            screen,
            task
        );


        /* -------------------------------------------------
           STORY
           ------------------------------------------------- */

        renderStory(
            screen,
            task
        );


        /* -------------------------------------------------
           QUIZ
           ------------------------------------------------- */

        renderQuiz(
            screen,
            task
        );


        /* -------------------------------------------------
           ACTION BUTTON
           ------------------------------------------------- */

        const action =
            screen.querySelector(
                ".game-screen-action"
            );


        if (action) {

            action.innerHTML = `

                <button
                    type="button"
                    class="gameplay-screen-button"
                    data-task-complete="${task.id}"
                    disabled
                >

                    <span>
                        Jawab dhisik
                    </span>

                    <span>
                        →
                    </span>

                </button>

            `;

        }


        bindTaskScreenEvents(
            screen,
            task
        );

    }


    /* =====================================================
       RENDER VOCABULARY
       ===================================================== */

    function renderVocabulary(screen, task) {

        const container =
            screen.querySelector(
                ".game-screen-vocabulary"
            );


        if (!container) {

            return;

        }


        container.innerHTML =
            task.words
                .map(
                    (item) => `

                        <div class="game-vocab">

                            <strong>
                                ${escapeHTML(item.word)}
                            </strong>

                            <span>
                                ${escapeHTML(item.meaning)}
                            </span>

                        </div>

                    `
                )
                .join("");

    }


    /* =====================================================
       RENDER STORY
       ===================================================== */

    function renderStory(screen, task) {

        let story =
            screen.querySelector(
                ".game-screen-story"
            );


        if (!story) {

            story =
                document.createElement(
                    "div"
                );


            story.className =
                "game-screen-story";


            const paragraph =
                screen.querySelector(
                    ".game-screen-text p"
                );


            if (paragraph) {

                paragraph.after(
                    story
                );

            }

        }


        if (!story) {
            return;
        }


        if (task.story) {

            story.innerHTML = `

                <strong>
                    ${escapeHTML(task.story)}
                </strong>

                <div class="game-screen-translation">
                    ${escapeHTML(task.translation || "")}
                </div>

            `;

            story.style.display =
                "block";

        } else {

            story.innerHTML = "";

            story.style.display =
                "none";

        }

    }


    /* =====================================================
       RENDER QUIZ
       ===================================================== */

    function renderQuiz(screen, task) {

        let quiz =
            screen.querySelector(
                ".game-screen-quiz"
            );


        if (!quiz) {

            quiz =
                document.createElement(
                    "div"
                );


            quiz.className =
                "game-screen-quiz";


            const vocabulary =
                screen.querySelector(
                    ".game-screen-vocabulary"
                );


            if (vocabulary) {

                vocabulary.after(
                    quiz
                );

            } else {

                const story =
                    screen.querySelector(
                        ".game-screen-story"
                    );


                if (story) {

                    story.after(
                        quiz
                    );

                } else {

                    const paragraph =
                        screen.querySelector(
                            ".game-screen-text p"
                        );


                    if (paragraph) {

                        paragraph.after(
                            quiz
                        );

                    }

                }

            }

        }


        if (!quiz) {
            return;
        }


        quiz.innerHTML = `

            <span class="game-screen-quiz-title">
                ${escapeHTML(task.question)}
            </span>


            <div class="game-screen-answers">

                ${task.answers
                    .map(
                        (answer) => `

                            <button
                                type="button"
                                class="game-screen-answer"
                                data-answer="${escapeHTML(answer)}"
                            >
                                ${escapeHTML(answer)}
                            </button>

                        `
                    )
                    .join("")}

            </div>


            <div
                class="game-screen-feedback"
                aria-live="polite"
            ></div>

        `;

    }


    /* =====================================================
       BIND TASK SCREEN EVENTS
       ===================================================== */

    function bindTaskScreenEvents(
        screen,
        task
    ) {

        /* -------------------------------------------------
           ANSWERS
           ------------------------------------------------- */

        screen
            .querySelectorAll(
                ".game-screen-answer"
            )
            .forEach(
                (button) => {

                    button.addEventListener(
                        "click",
                        () => {

                            handleAnswer(
                                screen,
                                task,
                                button
                            );

                        }
                    );

                }
            );


        /* -------------------------------------------------
           COMPLETE BUTTON
           ------------------------------------------------- */

        const completeButton =
            screen.querySelector(
                `[data-task-complete="${task.id}"]`
            );


        if (completeButton) {

            completeButton.addEventListener(
                "click",
                () => {

                    completeTask(
                        task.id
                    );

                }
            );

        }

    }


    /* =====================================================
       HANDLE ANSWER
       ===================================================== */

    function handleAnswer(
        screen,
        task,
        selectedButton
    ) {

        if (
            selectedButton.disabled
        ) {

            return;

        }


        const answer =
            selectedButton.dataset.answer;


        const feedback =
            screen.querySelector(
                ".game-screen-feedback"
            );


        const buttons =
            screen.querySelectorAll(
                ".game-screen-answer"
            );


        /*
         * Jawaban benar.
         */

        if (
            answer ===
            task.correctAnswer
        ) {

            buttons.forEach(
                (button) => {

                    button.disabled =
                        true;

                }
            );


            selectedButton.classList.add(
                "correct"
            );


            if (feedback) {

                feedback.textContent =
                    getCorrectFeedback(
                        task
                    );

                feedback.classList.add(
                    "show"
                );

            }


            /*
             * Kosakata masuk ke progress.
             */

            learnWords(
                task
            );


            /*
             * Aktifkan tombol lanjut.
             */

            const completeButton =
                screen.querySelector(
                    `[data-task-complete="${task.id}"]`
                );


            if (completeButton) {

                completeButton.disabled =
                    false;

                completeButton.innerHTML = `

                    <span>
                        Lanjut
                    </span>

                    <span>
                        →
                    </span>

                `;

            }

        }


        /*
         * Jawaban salah.
         */

        else {

            selectedButton.classList.add(
                "wrong"
            );


            if (feedback) {

                feedback.textContent =
                    getWrongFeedback(
                        task
                    );

                feedback.classList.add(
                    "show"
                );

            }


            /*
             * Setelah 900ms,
             * pilihan bisa dijawab lagi.
             */

            setTimeout(
                () => {

                    selectedButton.classList.remove(
                        "wrong"
                    );


                    if (feedback) {

                        feedback.classList.remove(
                            "show"
                        );

                    }

                },
                900
            );

        }

    }


    /* =====================================================
       CORRECT FEEDBACK
       ===================================================== */

    function getCorrectFeedback(task) {

        if (
            task.id ===
            "bekal"
        ) {

            return (
                "Bener! “Banyu” tegese air. " +
                "Kosakata iki penting nalika Kamandaka nyiapake bekal lelampahan."
            );

        }


        if (
            task.id ===
            "surat"
        ) {

            return (
                "Bener! “Aja kesusu” tegese jangan terburu-buru. " +
                "Pesan iki ngelingake Kamandaka supaya ngati-ati nalika lelampahan."
            );

        }


        if (
            task.id ===
            "map"
        ) {

            return (
                "Bener! “Wetan” tegese timur. " +
                "Kamandaka kudu ngerti arah supaya ora kesasar nalika nerusake lelampahan."
            );

        }


        return "Jawabanmu benar.";

    }


    /* =====================================================
       WRONG FEEDBACK
       ===================================================== */

    function getWrongFeedback(task) {

        if (
            task.id ===
            "bekal"
        ) {

            return (
                "Durung tepat. Elinga: “banyu” yaiku sing digunakake kanggo ngombe."
            );

        }


        if (
            task.id ===
            "surat"
        ) {

            return (
                "Durung tepat. Coba pahami tembung “kesusu”, yaiku melakukan sesuatu kanthi terburu-buru."
            );

        }


        if (
            task.id ===
            "map"
        ) {

            return (
                "Durung tepat. “Wetan” yaiku salah siji arah mata angin."
            );

        }


        return "Coba maneh.";

    }


    /* =====================================================
       LEARN WORDS
       ===================================================== */

    function learnWords(task) {

        if (
            !progress.learnedWords[
                CURRENT_LOCATION
            ]
        ) {

            progress.learnedWords[
                CURRENT_LOCATION
            ] = {};

        }


        task.words.forEach(
            (word) => {

                progress.learnedWords[
                    CURRENT_LOCATION
                ][
                    word.word
                ] =
                    word.meaning;

            }
        );


        saveProgress();

    }


    /* =====================================================
       TASK BUTTON FALLBACK
       ===================================================== */

    document
        .querySelectorAll(
            "[data-action]"
        )
        .forEach(
            (button) => {

                /*
                 * Hindari tombol yang sudah
                 * punya listener startJourney.
                 */

                if (
                    button.id ===
                    "startJourneyButton"
                ) {

                    return;

                }


                button.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        event.stopPropagation();


                        const action =
                            button.dataset.action;


                        if (
                            action === "bekal" ||
                            action === "surat" ||
                            action === "map"
                        ) {

                            startTask(
                                action
                            );

                        }

                    }
                );

            }
        );


    /* =====================================================
       COMPLETE TASK
       ===================================================== */

    function completeTask(taskId) {

        if (
            !progress.locationTasks[
                CURRENT_LOCATION
            ]
        ) {

            progress.locationTasks[
                CURRENT_LOCATION
            ] = {};

        }


        const taskIndex =
            tasks.findIndex(
                (task) =>
                    task.id === taskId
            );


        if (
            taskIndex === -1
        ) {

            return;

        }


        /*
         * Tidak boleh melewati task.
         */

        if (
            taskIndex > 0
        ) {

            const previousTask =
                tasks[
                    taskIndex - 1
                ];


            if (
                progress
                    .locationTasks[
                        CURRENT_LOCATION
                    ][
                        previousTask.id
                    ] !== true
            ) {

                return;

            }

        }


        /*
         * Jika sudah selesai,
         * jangan kasih XP lagi.
         */

        if (
            progress
                .locationTasks[
                    CURRENT_LOCATION
                ][
                    taskId
                ] === true
        ) {

            goToNextTask(
                taskId
            );

            return;

        }


        /*
         * Tandai task selesai.
         */

        progress
            .locationTasks[
                CURRENT_LOCATION
            ][
                taskId
            ] =
            true;


        if (
            !Array.isArray(
                progress.completedTasks[
                    CURRENT_LOCATION
                ]
            )
        ) {

            progress.completedTasks[
                CURRENT_LOCATION
            ] = [];

        }


        if (
            !progress.completedTasks[
                CURRENT_LOCATION
            ].includes(
                taskId
            )
        ) {

            progress.completedTasks[
                CURRENT_LOCATION
            ].push(
                taskId
            );

        }


        saveProgress();


        /*
         * Cek apakah semua task selesai.
         */

        const allCompleted =
            tasks.every(
                (task) =>
                    progress
                        .locationTasks[
                            CURRENT_LOCATION
                        ][
                            task.id
                        ] === true
            );


        if (
            allCompleted
        ) {

            finishLocation();

            return;

        }


        /*
         * Kalau belum selesai,
         * lanjut ke task berikutnya.
         */

        goToNextTask(
            taskId
        );

    }


    /* =====================================================
       GO TO NEXT TASK
       ===================================================== */

    function goToNextTask(taskId) {

        if (
            taskId ===
            "bekal"
        ) {

            startTask(
                "surat"
            );

            return;

        }


        if (
            taskId ===
            "surat"
        ) {

            startTask(
                "map"
            );

            return;

        }


        if (
            taskId ===
            "map"
        ) {

            finishLocation();

        }

    }


    /* =====================================================
       FINISH LOCATION
       ===================================================== */

    function finishLocation() {

        const alreadyCompleted =
            progress
                .completedLocations
                .includes(
                    CURRENT_LOCATION
                );


        /*
         * XP hanya diberikan satu kali.
         */

        if (
            !alreadyCompleted
        ) {

            progress
                .completedLocations
                .push(
                    CURRENT_LOCATION
                );


            addXP(
                XP_PER_LOCATION
            );

        }


        /*
         * Buka lokasi berikutnya.
         */

        progress.currentLocation =
            NEXT_LOCATION;


        saveProgress();


        updatePlayerUI();

        updateLocationUI();

        updateActiveLocation();


        /*
         * Siapkan finish screen.
         */

        updateFinishScreen();


        /*
         * Tampilkan screen05.
         */

        showScreen(
            "screen05"
        );

    }


    /* =====================================================
       ADD XP
       ===================================================== */

    function addXP(amount) {

        progress.xp +=
            amount;


        while (
            progress.xp >=
            MAX_XP
        ) {

            progress.xp -=
                MAX_XP;

            progress.level++;

        }


        updatePlayerUI();

    }


    /* =====================================================
       FINISH SCREEN UPDATE
       ===================================================== */

    function updateFinishScreen() {

        const finish =
            document.getElementById(
                "screen05"
            );


        if (!finish) {
            return;
        }


        const reward =
            finish.querySelector(
                ".gameplay-reward strong"
            );


        if (reward) {

            reward.textContent =
                "+100 XP";

        }


        const label =
            finish.querySelector(
                ".game-screen-label"
            );


        if (label) {

            label.textContent =
                "PAJAJARAN SELESAI";

        }


        const title =
            finish.querySelector(
                "h1"
            );


        if (title) {

            title.textContent =
                "Persiapan Rampung";

        }


        const paragraph =
            finish.querySelector(
                "p"
            );


        if (paragraph) {

            paragraph.textContent =
                "Bekal wis dipriksa, " +
                "surat wis diwaca, " +
                "lan peta wis dimangerteni. " +
                "Saiki Kamandaka wis siyap " +
                "nerusake lelampahan.";

        }

    }


    /* =====================================================
       FINISH BUTTON
       ===================================================== */

    const finishButton =
        document.getElementById(
            "finishJourneyButton"
        );


    if (finishButton) {

        finishButton.addEventListener(
            "click",
            () => {

                saveProgress();

            }
        );

    }


    /* =====================================================
       STATIC CHOICE BUTTON
       ===================================================== */

    document
        .querySelectorAll(
            ".gameplay-choice-button"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const choice =
                            button.dataset.choice;


                        if (
                            choice ===
                            "bekal"
                        ) {

                            startTask(
                                "bekal"
                            );

                        }


                        if (
                            choice ===
                            "surat"
                        ) {

                            startTask(
                                "surat"
                            );

                        }

                    }
                );

            }
        );


    /* =====================================================
       UPDATE PLAYER UI
       ===================================================== */

    function updatePlayerUI() {

        const levelElement =
            document.getElementById(
                "playerLevel"
            );


        const xpTopElement =
            document.getElementById(
                "playerXpTop"
            );


        const xpBottomElement =
            document.getElementById(
                "playerXpBottom"
            );


        const xpBarElement =
            document.getElementById(
                "playerXpBar"
            );


        const statusLevelElement =
            document.getElementById(
                "statusLevel"
            );


        const statusXpElement =
            document.getElementById(
                "statusXpText"
            );


        const statusXpBarElement =
            document.getElementById(
                "statusXpBar"
            );


        const levelText =
            String(
                progress.level
            ).padStart(
                2,
                "0"
            );


        const xpText =
            progress.xp.toLocaleString(
                "id-ID"
            );


        const percentage =
            Math.min(
                (
                    progress.xp /
                    MAX_XP
                ) * 100,
                100
            );


        if (levelElement) {

            levelElement.textContent =
                `Level ${levelText}`;

        }


        if (xpTopElement) {

            xpTopElement.textContent =
                `${progress.xp} XP`;

        }


        if (xpBottomElement) {

            xpBottomElement.textContent =
                `${xpText} / 1.000 XP`;

        }


        if (xpBarElement) {

            xpBarElement.style.width =
                `${percentage}%`;

        }


        if (statusLevelElement) {

            statusLevelElement.textContent =
                levelText;

        }


        if (statusXpElement) {

            statusXpElement.textContent =
                `${xpText} / 1.000 XP`;

        }


        if (statusXpBarElement) {

            statusXpBarElement.style.width =
                `${percentage}%`;

        }

    }


    /* =====================================================
       UPDATE LOCATION UI
       ===================================================== */

    function updateLocationUI() {

        const completed =
            progress
                .completedLocations
                .length;


        const progressText =
            document.getElementById(
                "locationProgressText"
            );


        if (progressText) {

            progressText.textContent =
                `${completed} / 10 Lokasi Selesai`;

        }


        document
            .querySelectorAll(
                ".lk-location-number"
            )
            .forEach(
                (element) => {

                    const number =
                        Number(
                            element.dataset
                                .locationNumber
                        );


                    element.classList.remove(
                        "completed"
                    );

                    element.classList.remove(
                        "active"
                    );


                    if (
                        progress
                            .completedLocations
                            .includes(
                                number
                            )
                    ) {

                        element.classList.add(
                            "completed"
                        );

                    }


                    if (
                        number ===
                        progress.currentLocation
                    ) {

                        element.classList.add(
                            "active"
                        );

                    }

                }
            );


        document
            .querySelectorAll(
                ".lk-location"
            )
            .forEach(
                (element) => {

                    const number =
                        Number(
                            element.dataset
                                .location
                        );


                    element.classList.remove(
                        "completed"
                    );

                    element.classList.remove(
                        "active"
                    );

                    element.classList.remove(
                        "locked"
                    );


                    if (
                        progress
                            .completedLocations
                            .includes(
                                number
                            )
                    ) {

                        element.classList.add(
                            "completed"
                        );

                    }

                    else if (
                        number ===
                        progress.currentLocation
                    ) {

                        element.classList.add(
                            "active"
                        );

                    }

                    else if (
                        number >
                        progress.currentLocation
                    ) {

                        element.classList.add(
                            "locked"
                        );

                    }

                }
            );

    }


    /* =====================================================
       UPDATE ACTIVE LOCATION
       ===================================================== */

    function updateActiveLocation() {

        const locationNames = {

            1:
                "Pajajaran",

            2:
                "Ki Ajar Winarong",

            3:
                "Pasir Luhur",

            4:
                "Kali Logawa",

            5:
                "Desa Panagih",

            6:
                "Goa Jatijajar",

            7:
                "Batur Agung",

            8:
                "Sawangan",

            9:
                "Kali Serayu",

            10:
                "Desa Rosari"

        };


        const locationName =
            document.getElementById(
                "activeLocationName"
            );


        if (locationName) {

            locationName.textContent =
                locationNames[
                    progress.currentLocation
                ]
                ||
                "Pajajaran";

        }

    }


    /* =====================================================
       ESC
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            if (
                document.body.classList.contains(
                    "is-gameplay-active"
                )
            ) {

                closeGameplay();

            }

        }
    );


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       INITIAL UI
       ===================================================== */

    updatePlayerUI();

    updateLocationUI();

    updateActiveLocation();


    /* =====================================================
       INITIAL SCREEN — WAJIB SCREEN 01
       =====================================================

       Ini bagian penting.

       Saat halaman Gameplay 01 dibuka,
       jangan pernah otomatis membuka screen05
       hanya karena localStorage pernah menyimpan
       lokasi 1 sebagai selesai.

       Gameplay 01 selalu dibuka dari screen01.
       ===================================================== */

    hideAllScreens();


    if (
        screens.opening
    ) {

        screens.opening.classList.add(
            "active"
        );

        currentScreen =
            "screen01";

    }


    /*
     * Jangan aktifkan fullscreen gameplay
     * sebelum tombol MULAI PERJALANAN ditekan.
     */

    document.body.classList.remove(
        "is-gameplay-active"
    );


    currentTask =
        null;


    /* =====================================================
       DEBUG
       ===================================================== */

    window.lelanaProgress =
        function () {

            console.table(
                progress
            );

            return progress;

        };


    window.resetLelanaProgress =
        function () {

            localStorage.removeItem(
                STORAGE_KEY
            );

            location.reload();

        };


    window.lelanaShowScreen =
        function (screenId) {

            showScreen(
                screenId
            );

        };


    console.log(
        "===================================="
    );

    console.log(
        "LELANA KAMANDAKA"
    );

    console.log(
        "Gameplay 01 — Pajajaran"
    );

    console.log(
        "SCREEN SYSTEM:"
    );

    console.log(
        "screen01 → screen02 → screen03 → screen04 → screen05"
    );

    console.log(
        "PEMBELAJARAN BASA:"
    );

    console.log(
        "Bekal → Kosakata"
    );

    console.log(
        "Surat → Pemahaman kalimat"
    );

    console.log(
        "Peta → Arah dan instruksi"
    );

    console.log(
        "Initial Screen:",
        currentScreen
    );

    console.log(
        "Progress:",
        progress
    );

    console.log(
        "===================================="
    );

});