/* =========================================================
   LELANA KAMANDAKA
   GAMEPLAY 03 — PASIR LUHUR

   JENIS GAME:
   Hidden Object + Materi Bahasa & Budaya Jawa

   TIDAK ADA QUIZ

   5 BENDA:
   1. Lentera
   2. Tongkat
   3. Tanda
   4. Pusaka
   5. Jejak
   ========================================================= */


/* =========================================================
   KONFIGURASI
   ========================================================= */

const GAMEPLAY_ID = 3;

const GAMEPLAY_PROGRESS_KEY =
    "lelanaKamandakaProgress";

const GAMEPLAY_COMPLETED_KEY =
    "lelanaGameplay03Completed";

const TOTAL_OBJECTS = 5;

const REWARD_XP = 100;

const REWARD_BASA = 20;


/* =========================================================
   OBJECT DATA
   ========================================================= */

const OBJECTS = [

    {
        id: "lentera",

        name: "Lentera",

        category:
            "Bahasa dan budaya Jawa",

        image:
            "../../assets/decorations/lentera.png",

        description:
            "Lentera merupakan alat penerangan yang digunakan ketika listrik belum tersedia secara luas. Dalam kehidupan masyarakat Jawa dahulu, penerangan seperti ini membantu menerangi rumah dan perjalanan ketika malam. Dalam budaya Jawa, lampu minyak sederhana juga dikenal dengan istilah senthir.",

        language:
            "<strong>Lentera</strong> — dalam bahasa Jawa dikenal juga dengan kata <strong>senthir</strong>, yaitu lampu minyak sederhana yang digunakan sebagai penerangan."
    },


    {
        id: "tongkat",

        name: "Tongkat",

        category:
            "Bahasa dan budaya Jawa",

        image:
            "../../assets/decorations/benda_perjalanan.png",

        description:
            "Tongkat dapat digunakan sebagai alat bantu ketika seseorang berjalan atau melakukan perjalanan melewati jalan yang sulit. Dalam kehidupan masyarakat Jawa, tongkat juga dapat digunakan sebagai pegangan atau penopang, terutama ketika seseorang membutuhkan bantuan saat berjalan.",

        language:
            "<strong>Tongkat</strong> — dalam bahasa Jawa dikenal dengan kata <strong>teken</strong>, yaitu tongkat yang digunakan sebagai pegangan atau penopang ketika berjalan."
    },


    {
        id: "tanda",

        name: "Tanda",

        category:
            "Bahasa dan budaya Jawa",

        image:
            "../../assets/decorations/tanda.png",

        description:
            "Tanda digunakan untuk memberikan petunjuk atau menunjukkan sesuatu. Dalam kehidupan masyarakat Jawa, penanda dapat digunakan untuk membantu seseorang mengenali arah, tempat, atau sesuatu yang dianggap penting.",

        language:
            "<strong>Tanda</strong> — dalam bahasa Jawa dapat disebut <strong>tenger</strong>, yaitu sesuatu yang menjadi penanda atau petunjuk."
    },


    {
        id: "pusaka",

        name: "Pusaka",

        category:
            "Bahasa dan budaya Jawa",

        image:
            "../../assets/decorations/pusaka.png",

        description:
            "Pusaka merupakan benda yang diwariskan dan memiliki nilai sejarah serta makna khusus. Dalam tradisi Jawa, pusaka dapat berupa keris dan benda warisan lainnya. Pusaka tidak hanya dipandang sebagai benda, tetapi juga menjadi bagian dari sejarah dan warisan keluarga.",

        language:
            "<strong>Pusaka</strong> — kata <strong>pusaka</strong> digunakan dalam bahasa Jawa untuk menyebut benda warisan yang memiliki nilai sejarah dan makna khusus."
    },


    {
        id: "jejak",

        name: "Jejak",

        category:
            "Bahasa dan budaya Jawa",

        image:
            "../../assets/decorations/jejak.png",

        description:
            "Jejak merupakan bekas yang ditinggalkan oleh seseorang, hewan, atau sesuatu yang bergerak. Dalam sebuah perjalanan, jejak dapat digunakan sebagai petunjuk untuk mengetahui siapa yang pernah melewati suatu tempat atau ke mana arah perjalanan.",

        language:
            "<strong>Jejak</strong> — dalam bahasa Jawa dikenal dengan kata <strong>tapak</strong>, yaitu bekas kaki atau bekas langkah."
    }

];


/* =========================================================
   STATE GAMEPLAY
   ========================================================= */

let foundObjects = [];

let currentObject = null;

let gameStarted = false;

let gameFinished = false;


/* =========================================================
   DOM ELEMENT
   ========================================================= */

let screen1 = null;

let gameScreen = null;

let infoScreen = null;

let finishScreen = null;

let startButton = null;

let infoContinueButton = null;

let infoCloseButton = null;

let finishButton = null;

let gameArea = null;

let foundCountElement = null;

let progressTextElement = null;

let progressBar = null;

let instructionElement = null;

let feedbackElement = null;


/* =========================================================
   GET DOM
   ========================================================= */

function cacheDOM() {

    screen1 =
        document.querySelector(
            "#screen1"
        );


    gameScreen =
        document.querySelector(
            "#gameScreen"
        );


    infoScreen =
        document.querySelector(
            "#infoScreen"
        );


    finishScreen =
        document.querySelector(
            "#finishScreen"
        );


    startButton =
        document.querySelector(
            "#startGameplay"
        );


    infoContinueButton =
        document.querySelector(
            "#infoContinue"
        );


    infoCloseButton =
        document.querySelector(
            "#objectModalClose"
        );


    finishButton =
        document.querySelector(
            "#finishGameplay"
        );


    gameArea =
        document.querySelector(
            "#gameArea"
        );


    foundCountElement =
        document.querySelector(
            "#foundCount"
        );


    progressTextElement =
        document.querySelector(
            "#gameplayProgressText"
        );


    progressBar =
        document.querySelector(
            "#gameplay03ProgressBar"
        );


    instructionElement =
        document.querySelector(
            "#instruction"
        );


    feedbackElement =
        document.querySelector(
            "#searchFeedback"
        );

}


/* =========================================================
   HIDE ALL SCREENS
   ========================================================= */

function hideAllScreens() {

    if (screen1) {

        screen1.style.display =
            "none";

        screen1.classList.remove(
            "active"
        );

    }


    if (gameScreen) {

        gameScreen.style.display =
            "none";

    }


    if (finishScreen) {

        finishScreen.style.display =
            "none";

    }


    closeInfo();

}


/* =========================================================
   SHOW SCREEN 1
   ========================================================= */

function showScreen1() {

    hideAllScreens();


    if (screen1) {

        screen1.style.display =
            "";

        screen1.classList.add(
            "active"
        );

    }


    gameStarted = false;

    gameFinished = false;

}


/* =========================================================
   SHOW GAME SCREEN
   ========================================================= */

function showGameScreen() {

    hideAllScreens();


    if (gameScreen) {

        gameScreen.style.display =
            "block";

    }


    gameStarted = true;

    gameFinished = false;


    updateProgressDisplay();

    updateInstruction();

}


/* =========================================================
   SHOW FINISH SCREEN
   ========================================================= */

function showFinishScreen() {

    hideAllScreens();


    if (finishScreen) {

        finishScreen.style.display =
            "block";

    }


    gameFinished = true;

    updateFinishReward();

}


/* =========================================================
   START GAME
   ========================================================= */

function startGame() {

    console.log(
        "Gameplay 03 dimulai."
    );


    foundObjects = [];

    currentObject = null;

    gameStarted = true;

    gameFinished = false;


    closeInfo();


    createSearchObjects();


    showGameScreen();


    updateProgressDisplay();


    updateInstruction();

}


/* =========================================================
   SETUP START BUTTON
   ========================================================= */

function setupStartButton() {

    if (!startButton) {

        console.warn(
            "Tombol #startGameplay tidak ditemukan."
        );

        return;

    }


    startButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            startGame();

        }
    );

}


/* =========================================================
   CREATE SEARCH OBJECTS
   ========================================================= */

function createSearchObjects() {

    if (!gameArea) {

        console.warn(
            "Area game #gameArea tidak ditemukan."
        );

        return;

    }


    /*
       Hapus benda lama.
    */

    gameArea
        .querySelectorAll(
            ".search-object"
        )
        .forEach(
            element => {

                element.remove();

            }
        );


    /*
       Posisi benda.

       Benda dibuat agak kecil supaya
       menyatu dengan lingkungan.
    */

    const positions = [

        {
            left: "18%",
            top: "28%",
            size: "58px"
        },

        {
            left: "42%",
            top: "63%",
            size: "54px"
        },

        {
            left: "63%",
            top: "31%",
            size: "48px"
        },

        {
            left: "77%",
            top: "57%",
            size: "56px"
        },

        {
            left: "29%",
            top: "73%",
            size: "50px"
        }

    ];


    OBJECTS.forEach(
        function (object, index) {

            const position =
                positions[index];


            /*
               Gunakan button agar benda
               dapat diklik.
            */

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            /*
               INI PENTING.

               CSS memakai .search-object,
               jadi class harus sama.
            */

            button.className =
                "search-object";


            button.dataset.objectId =
                object.id;


            button.setAttribute(
                "aria-label",
                "Temukan " + object.name
            );


            button.style.left =
                position.left;


            button.style.top =
                position.top;


            button.style.width =
                position.size;


            button.style.height =
                position.size;


            /*
               Gambar benda asli.
            */

            const image =
                document.createElement(
                    "img"
                );


            image.src =
                object.image;


            image.alt =
                object.name;


            image.draggable =
                false;


            /*
               Pastikan browser tidak
               memberi border button.
            */

            button.appendChild(
                image
            );


            /*
               Klik benda.
            */

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    handleObjectClick(
                        object.id,
                        button
                    );

                }
            );


            gameArea.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   HANDLE OBJECT CLICK
   ========================================================= */

function handleObjectClick(
    objectId,
    element
) {

    if (!gameStarted) {

        return;

    }


    if (gameFinished) {

        return;

    }


    if (
        foundObjects.includes(
            objectId
        )
    ) {

        return;

    }


    const object =
        OBJECTS.find(
            item =>
                item.id === objectId
        );


    if (!object) {

        return;

    }


    /*
       Simpan benda yang ditemukan.
    */

    foundObjects.push(
        objectId
    );


    currentObject =
        object;


    /*
       Hilangkan benda dari scene
       setelah diklik.
    */

    if (element) {

        element.classList.add(
            "found"
        );

        element.disabled =
            true;

    }


    /*
       Update progress.
    */

    updateProgressDisplay();


    /*
       Tampilkan penjelasan.
    */

    showObjectInfo(
        object
    );

}


/* =========================================================
   SHOW OBJECT INFORMATION
   ========================================================= */

function showObjectInfo(
    object
) {

    if (!infoScreen) {

        return;

    }


    const image =
        document.querySelector(
            "#infoObjectImage"
        );


    const category =
        document.querySelector(
            "#objectModalCategory"
        );


    const name =
        document.querySelector(
            "#infoObjectName"
        );


    const description =
        document.querySelector(
            "#infoObjectDescription"
        );


    const language =
        document.querySelector(
            "#infoObjectLanguage"
        );


    if (image) {

        image.src =
            object.image;

        image.alt =
            object.name;

    }


    if (category) {

        category.textContent =
            object.category;

    }


    if (name) {

        name.textContent =
            object.name;

    }


    if (description) {

        description.textContent =
            object.description;

    }


    if (language) {

        language.innerHTML =
            object.language;

    }


    infoScreen.classList.add(
        "show"
    );


    infoScreen.classList.add(
        "active"
    );


    infoScreen.setAttribute(
        "aria-hidden",
        "false"
    );


    infoScreen.style.display =
        "grid";


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE INFORMATION
   ========================================================= */

function closeInfo() {

    if (!infoScreen) {

        return;

    }


    infoScreen.classList.remove(
        "show"
    );


    infoScreen.classList.remove(
        "active"
    );


    infoScreen.setAttribute(
        "aria-hidden",
        "true"
    );


    infoScreen.style.display =
        "none";


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   CONTINUE AFTER INFORMATION
   ========================================================= */

function continueAfterInfo() {

    closeInfo();


    currentObject = null;


    updateProgressDisplay();


    /*
       Jika sudah menemukan semua benda,
       aktifkan tombol SELESAI.
    */

    if (
        foundObjects.length >=
        TOTAL_OBJECTS
    ) {

        enableFinishButton();

    }

}


/* =========================================================
   SETUP INFO BUTTONS
   ========================================================= */

function setupInfoButtons() {

    if (infoContinueButton) {

        infoContinueButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                continueAfterInfo();

            }
        );

    }


    if (infoCloseButton) {

        infoCloseButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeInfo();

            }
        );

    }


    if (infoScreen) {

        const backdrop =
            infoScreen.querySelector(
                "[data-modal-close]"
            );


        if (backdrop) {

            backdrop.addEventListener(
                "click",
                function () {

                    closeInfo();

                }
            );

        }

    }

}


/* =========================================================
   UPDATE PROGRESS
   ========================================================= */

function updateProgressDisplay() {

    const count =
        foundObjects.length;


    if (foundCountElement) {

        foundCountElement.textContent =
            count + " / " + TOTAL_OBJECTS;

    }


    if (progressTextElement) {

        const formatted =
            String(count)
                .padStart(
                    2,
                    "0"
                );


        progressTextElement.textContent =
            formatted + " / 05";

    }


    if (progressBar) {

        const percentage =
            Math.min(
                (
                    count /
                    TOTAL_OBJECTS
                ) * 100,
                100
            );


        progressBar.style.width =
            percentage + "%";

    }


    if (
        count >=
        TOTAL_OBJECTS
    ) {

        updateInstructionCompleted();

        enableFinishButton();

    }

}


/* =========================================================
   UPDATE INSTRUCTION
   ========================================================= */

function updateInstruction() {

    if (!instructionElement) {

        return;

    }


    instructionElement.textContent =
        "Temukan 5 benda yang tersembunyi di sekitar Pasir Luhur. Klik setiap benda yang kamu temukan untuk mempelajari kaitannya dengan bahasa dan budaya Jawa.";

}


/* =========================================================
   UPDATE COMPLETED INSTRUCTION
   ========================================================= */

function updateInstructionCompleted() {

    if (!instructionElement) {

        return;

    }


    instructionElement.textContent =
        "Semua benda telah ditemukan. Kamu dapat menyelesaikan tantangan ini.";

}


/* =========================================================
   ENABLE FINISH BUTTON
   ========================================================= */

function enableFinishButton() {

    if (!finishButton) {

        return;

    }


    finishButton.disabled =
        false;


    finishButton.classList.add(
        "ready"
    );

}


/* =========================================================
   SETUP FINISH BUTTON
   ========================================================= */

function setupFinishButton() {

    if (!finishButton) {

        console.warn(
            "Tombol #finishGameplay tidak ditemukan."
        );

        return;

    }


    finishButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            if (
                foundObjects.length <
                TOTAL_OBJECTS
            ) {

                showFeedback(
                    "Temukan semua 5 benda terlebih dahulu."
                );

                return;

            }


            completeGameplay();

        }
    );

}


/* =========================================================
   FEEDBACK
   ========================================================= */

function showFeedback(
    text
) {

    if (!feedbackElement) {

        return;

    }


    feedbackElement.textContent =
        text;


    feedbackElement.classList.add(
        "show"
    );


    window.clearTimeout(
        showFeedback.timeout
    );


    showFeedback.timeout =
        window.setTimeout(
            function () {

                feedbackElement.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   COMPLETE GAMEPLAY
   ========================================================= */

function completeGameplay() {

    if (gameFinished) {

        return;

    }


    gameFinished = true;


    saveGameplayCompletion();


    updateFinishReward();


    showFinishScreen();

}


/* =========================================================
   UPDATE FINISH REWARD
   ========================================================= */

function updateFinishReward() {

    const xp =
        document.querySelector(
            "#finishXP"
        );


    const basa =
        document.querySelector(
            "#finishBasa"
        );


    if (xp) {

        xp.textContent =
            "+" + REWARD_XP + " XP";

    }


    if (basa) {

        basa.textContent =
            "+" + REWARD_BASA + " BASA";

    }

}


/* =========================================================
   SAVE GAMEPLAY COMPLETION
   ========================================================= */

function saveGameplayCompletion() {

    /*
       Cegah hadiah diberikan dua kali.
    */

    const alreadyCompleted =
        localStorage.getItem(
            GAMEPLAY_COMPLETED_KEY
        ) === "true";


    if (alreadyCompleted) {

        return;

    }


    localStorage.setItem(
        GAMEPLAY_COMPLETED_KEY,
        "true"
    );


    /*
       Progress default.
    */

    let progress = {

        currentChapter: 1,

        totalChapters: 10,

        xp: 0,

        basa: 0,

        quizCompleted: false,

        sayembaraCompleted: false,

        completedChapters: [],

        completedLocations: [],

        unlockedLocations: [1]

    };


    /*
       Ambil progress yang sudah ada.
    */

    try {

        const saved =
            localStorage.getItem(
                GAMEPLAY_PROGRESS_KEY
            );


        if (saved) {

            const parsed =
                JSON.parse(
                    saved
                );


            if (
                parsed &&
                typeof parsed ===
                "object"
            ) {

                progress = {

                    ...progress,

                    ...parsed

                };

            }

        }

    }

    catch (error) {

        console.warn(
            "Progress lama tidak dapat dibaca:",
            error
        );

    }


    /*
       Tambahkan XP.
    */

    progress.xp =
        Number(
            progress.xp || 0
        ) +
        REWARD_XP;


    /*
       Tambahkan BASA.
    */

    progress.basa =
        Number(
            progress.basa || 0
        ) +
        REWARD_BASA;


    /*
       Completed locations.
    */

    if (
        !Array.isArray(
            progress.completedLocations
        )
    ) {

        progress.completedLocations =
            [];

    }


    if (
        !progress.completedLocations.includes(
            GAMEPLAY_ID
        )
    ) {

        progress.completedLocations.push(
            GAMEPLAY_ID
        );

    }


    /*
       Completed chapters.
    */

    if (
        !Array.isArray(
            progress.completedChapters
        )
    ) {

        progress.completedChapters =
            [];

    }


    if (
        !progress.completedChapters.includes(
            GAMEPLAY_ID
        )
    ) {

        progress.completedChapters.push(
            GAMEPLAY_ID
        );

    }


    /*
       Unlock lokasi berikutnya.
    */

    if (
        !Array.isArray(
            progress.unlockedLocations
        )
    ) {

        progress.unlockedLocations =
            [1];

    }


    const nextLocation =
        GAMEPLAY_ID + 1;


    if (
        nextLocation <= 10 &&
        !progress.unlockedLocations.includes(
            nextLocation
        )
    ) {

        progress.unlockedLocations.push(
            nextLocation
        );

    }


    /*
       Chapter berikutnya.
    */

    progress.currentChapter =
        Math.min(
            GAMEPLAY_ID + 1,
            10
        );


    /*
       Rapikan array angka.
    */

    progress.completedLocations =
        [
            ...new Set(
                progress.completedLocations
                    .map(Number)
                    .filter(
                        id =>
                            Number.isFinite(
                                id
                            )
                    )
            )
        ]
        .sort(
            (a, b) =>
                a - b
        );


    progress.completedChapters =
        [
            ...new Set(
                progress.completedChapters
                    .map(Number)
                    .filter(
                        id =>
                            Number.isFinite(
                                id
                            )
                    )
            )
        ]
        .sort(
            (a, b) =>
                a - b
        );


    progress.unlockedLocations =
        [
            ...new Set(
                progress.unlockedLocations
                    .map(Number)
                    .filter(
                        id =>
                            id >= 1 &&
                            id <= 10
                    )
            )
        ]
        .sort(
            (a, b) =>
                a - b
        );


    /*
       Simpan progress.
    */

    localStorage.setItem(
        GAMEPLAY_PROGRESS_KEY,
        JSON.stringify(
            progress
        )
    );


    console.log(
        "Gameplay 03 selesai.",
        progress
    );

}


/* =========================================================
   BACK TO MAP
   ========================================================= */

function setupBackMap() {

    const backLinks =
        document.querySelectorAll(
            'a[href="../../peta.html"]'
        );


    backLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    sessionStorage.setItem(
                        "lelana_selected_location",
                        "3"
                    );

                }
            );

        }
    );

}


/* =========================================================
   KEYBOARD
   ========================================================= */

function setupKeyboard() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeInfo();

            }

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function init() {

    console.log(
        "Lelana Kamandaka — Gameplay 03 siap."
    );


    cacheDOM();


    /*
       Saat halaman pertama dibuka,
       SELALU mulai dari Screen 1.
    */

    showScreen1();


    setupStartButton();

    setupInfoButtons();

    setupFinishButton();

    setupBackMap();

    setupKeyboard();


    updateProgressDisplay();


    console.log(
        "DOM Gameplay 03 berhasil dimuat."
    );

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
        init
    );

}

else {

    init();

}


/* =========================================================
   PUBLIC API
   ========================================================= */

window.LelanaGameplay03 = {

    startGame,

    completeGameplay,

    showScreen1,

    showGameScreen,

    showFinishScreen,

    showObjectInfo,

    getFoundObjects:
        function () {

            return [
                ...foundObjects
            ];

        },

    getObjects:
        function () {

            return [
                ...OBJECTS
            ];

        }

};