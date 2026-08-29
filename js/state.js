/* =========================================================
   LELANA KAMANDAKA
   GLOBAL APP STATE MANAGEMENT
   SINGLETON
   ========================================================= */

import { INITIAL_VOCABULARY } from "./data/vocabData.js";


/* =========================================================
   STORAGE KEY
   ========================================================= */

/*
   INI ADALAH KEY UTAMA YANG SUDAH DIGUNAKAN
   OLEH GAMEPLAY 01, 02, 03, dst.
*/

const GAMEPLAY_PROGRESS_KEY =
    "lelanaKamandakaProgress";


/*
   Key tambahan untuk data aplikasi umum.

   Tidak digunakan untuk menentukan unlock lokasi.
*/

const APP_SETTINGS_KEY =
    "lelana_kamandaka_app_settings_v1";


/* =========================================================
   APP STATE
   ========================================================= */

class AppState {

    constructor() {

        /* ================================================
           SCREEN
           ================================================ */

        this.currentScreen =
            "opening";


        /* ================================================
           LOCATION
           ================================================ */

        /*
           0 = Pajajaran aktif
           1 = Ki Ajar Winarong aktif
           2 = Pasir Luhur aktif
           dst.
        */

        this.unlockedLocationIndex =
            0;


        /*
           ID lokasi yang sedang aktif.
        */

        this.activeLocationId =
            "pajajaran";


        /* ================================================
           PLAYER
           ================================================ */

        this.playerXp =
            0;


        /* ================================================
           VOCABULARY
           ================================================ */

        this.collectedVocab =
            [...INITIAL_VOCABULARY];


        /* ================================================
           AUDIO
           ================================================ */

        this.audioMuted =
            false;


        /* ================================================
           LISTENERS
           ================================================ */

        this.listeners = [];


        /* ================================================
           LOAD DATA
           ================================================ */

        this.loadFromStorage();

    }


    /* =====================================================
       GET GAMEPLAY PROGRESS
       ===================================================== */

    getGameplayProgress() {

        const defaultProgress = {

            currentChapter:
                1,

            totalChapters:
                10,

            xp:
                0,

            basa:
                0,

            quizCompleted:
                false,

            sayembaraCompleted:
                false,

            completedChapters:
                [],

            completedLocations:
                [],

            unlockedLocations:
                [1]

        };


        try {

            const saved =
                sessionStorage.getItem(
                    GAMEPLAY_PROGRESS_KEY
                );


            if (!saved) {

                return defaultProgress;

            }


            const parsed =
                JSON.parse(saved);


            return {

                ...defaultProgress,

                ...parsed

            };

        }

        catch (error) {

            console.warn(
                "Progress gameplay tidak dapat dibaca:",
                error
            );


            return defaultProgress;

        }

    }


    /* =====================================================
       LOAD FROM STORAGE
       ===================================================== */

    loadFromStorage() {

        /*
           ==================================================
           1. BACA PROGRESS DARI GAMEPLAY
           ==================================================
        */

        const gameplayProgress =
            this.getGameplayProgress();


        /* ================================================
           XP
           ================================================ */

        if (
            typeof gameplayProgress.xp ===
            "number"
        ) {

            this.playerXp =
                gameplayProgress.xp;

        }


        /* ================================================
           UNLOCKED LOCATION
           ================================================ */

        if (
            Array.isArray(
                gameplayProgress.unlockedLocations
            )
            &&
            gameplayProgress.unlockedLocations.length
            > 0
        ) {

            const unlockedLocations =
                gameplayProgress.unlockedLocations
                    .filter(
                        value =>
                            typeof value ===
                            "number"
                    )
                    .sort(
                        (a, b) =>
                            a - b
                    );


            /*
               Lokasi terakhir yang terbuka
               menentukan active index.

               [1]
                   → index 0

               [1,2]
                   → index 1

               [1,2,3]
                   → index 2
            */

            this.unlockedLocationIndex =
                Math.max(
                    0,
                    unlockedLocations[
                        unlockedLocations.length - 1
                    ] - 1
                );

        }

        else {

            this.unlockedLocationIndex =
                0;

        }


        /* ================================================
           ACTIVE LOCATION
           ================================================ */

        const activeLocation =
            this.unlockedLocationIndex + 1;


        const locationIds = {

            1: "pajajaran",

            2: "ki-ajar-winarong",

            3: "pasir-luhur",

            4: "kali-logawa",

            5: "desa-panagih",

            6: "goa-jatijajar",

            7: "batur-agung",

            8: "sawangan",

            9: "kali-serayu",

            10: "desa-rosari"

        };


        this.activeLocationId =
            locationIds[
                activeLocation
            ] ||
            "pajajaran";


        /*
           ==================================================
           2. BACA SETTINGS APLIKASI
           ==================================================
        */

        try {

            const savedSettings =
                localStorage.getItem(
                    APP_SETTINGS_KEY
                );


            if (savedSettings) {

                const parsedSettings =
                    JSON.parse(
                        savedSettings
                    );


                this.audioMuted =
                    parsedSettings.audioMuted ??
                    false;


                if (
                    Array.isArray(
                        parsedSettings.collectedVocab
                    )
                ) {

                    this.collectedVocab =
                        parsedSettings.collectedVocab;

                }

            }

        }

        catch (error) {

            console.warn(
                "Pengaturan aplikasi tidak dapat dibaca:",
                error
            );

        }

    }


    /* =====================================================
       SAVE TO STORAGE
       ===================================================== */

    saveToStorage() {

        /*
           ==================================================
           PROGRESS GAMEPLAY
           ==================================================
        */

        try {

            /*
               Ambil progress yang sudah ada.

               PENTING:
               Jangan membuat object baru yang cuma berisi
               XP dan unlock karena nanti data seperti
               completedLocations bisa hilang.
            */

            const progress =
                this.getGameplayProgress();


            /* ============================================
               UPDATE XP
               ============================================ */

            progress.xp =
                this.playerXp;


            /* ============================================
               UPDATE UNLOCK
               ============================================ */

            if (
                !Array.isArray(
                    progress.unlockedLocations
                )
            ) {

                progress.unlockedLocations =
                    [1];

            }


            const currentUnlockedId =
                this.unlockedLocationIndex + 1;


            if (
                !progress.unlockedLocations.includes(
                    currentUnlockedId
                )
            ) {

                progress.unlockedLocations.push(
                    currentUnlockedId
                );

            }


            /*
               Pastikan Pajajaran selalu terbuka.
            */

            if (
                !progress.unlockedLocations.includes(
                    1
                )
            ) {

                progress.unlockedLocations.unshift(
                    1
                );

            }


            /*
               Hilangkan duplikat.
            */

            progress.unlockedLocations = [
                ...new Set(
                    progress.unlockedLocations
                )
            ];


            /*
               Urutkan.
            */

            progress.unlockedLocations.sort(
                (a, b) =>
                    a - b
            );


            /* ============================================
               SIMPAN GAMEPLAY PROGRESS
               ============================================ */

            sessionStorage.setItem(
                GAMEPLAY_PROGRESS_KEY,
                JSON.stringify(
                    progress
                )
            );


            /*
               =================================================
               SETTINGS APLIKASI
               =================================================
            */

            const settings = {

                audioMuted:
                    this.audioMuted,

                collectedVocab:
                    this.collectedVocab

            };


            localStorage.setItem(
                APP_SETTINGS_KEY,
                JSON.stringify(
                    settings
                )
            );

        }

        catch (error) {

            console.warn(
                "State tidak dapat disimpan:",
                error
            );

        }

    }


    /* =====================================================
       SUBSCRIBE
       ===================================================== */

    subscribe(listener) {

        if (
            typeof listener !==
            "function"
        ) {

            return () => {};

        }


        this.listeners.push(
            listener
        );


        /*
           Return unsubscribe function.
        */

        return () => {

            this.listeners =
                this.listeners.filter(
                    item =>
                        item !== listener
                );

        };

    }


    /* =====================================================
       NOTIFY
       ===================================================== */

    notify() {

        /*
           Simpan terlebih dahulu.
        */

        this.saveToStorage();


        /*
           Beritahu semua halaman/component
           yang sedang mendengarkan perubahan.
        */

        this.listeners.forEach(
            listener => {

                try {

                    listener(
                        this
                    );

                }

                catch (error) {

                    console.warn(
                        "State listener error:",
                        error
                    );

                }

            }
        );

    }


    /* =====================================================
       SET SCREEN
       ===================================================== */

    setScreen(
        screenName
    ) {

        if (
            this.currentScreen ===
            screenName
        ) {

            return;

        }


        this.currentScreen =
            screenName;


        this.notify();

    }


    /* =====================================================
       UNLOCK NEXT LOCATION
       ===================================================== */

    unlockNextLocation(
        newIndex
    ) {

        if (
            typeof newIndex !==
            "number"
        ) {

            return;

        }


        if (
            newIndex <=
            this.unlockedLocationIndex
        ) {

            return;

        }


        this.unlockedLocationIndex =
            newIndex;


        /*
           Update active location.
        */

        const locationIds = {

            1: "pajajaran",

            2: "ki-ajar-winarong",

            3: "pasir-luhur",

            4: "kali-logawa",

            5: "desa-panagih",

            6: "goa-jatijajar",

            7: "batur-agung",

            8: "sawangan",

            9: "kali-serayu",

            10: "desa-rosari"

        };


        this.activeLocationId =
            locationIds[
                newIndex + 1
            ] ||
            this.activeLocationId;


        this.notify();

    }


    /* =====================================================
       ADD XP
       ===================================================== */

    addXp(
        amount
    ) {

        if (
            typeof amount !==
            "number"
        ) {

            return;

        }


        this.playerXp +=
            amount;


        /*
           Jangan sampai XP negatif.
        */

        if (
            this.playerXp < 0
        ) {

            this.playerXp =
                0;

        }


        this.notify();

    }


    /* =====================================================
       ADD VOCABULARY
       ===================================================== */

    addVocab(
        vocabObj
    ) {

        if (
            !vocabObj ||
            !vocabObj.word
        ) {

            return;

        }


        const existing =
            this.collectedVocab.find(
                vocab =>
                    vocab.word &&
                    vocab.word.toLowerCase() ===
                    vocabObj.word.toLowerCase()
            );


        if (existing) {

            return;

        }


        this.collectedVocab.push({

            id:
                "vocab_" +
                Date.now(),

            ...vocabObj,

            discovered:
                true

        });


        this.notify();

    }


    /* =====================================================
       TOGGLE AUDIO
       ===================================================== */

    toggleAudio() {

        this.audioMuted =
            !this.audioMuted;


        this.notify();


        return this.audioMuted;

    }


    /* =====================================================
       REFRESH FROM GAMEPLAY
       ===================================================== */

    refreshFromGameplay() {

        /*
           Dipakai ketika kembali dari gameplay
           ke halaman utama.

           Contoh:

           Gameplay 01 selesai
               ↓
           sessionStorage berubah
               ↓
           kembali ke index.html
               ↓
           refreshFromGameplay()
               ↓
           Beranda membaca unlock terbaru
        */

        const progress =
            this.getGameplayProgress();


        /* ================================================
           XP
           ================================================ */

        if (
            typeof progress.xp ===
            "number"
        ) {

            this.playerXp =
                progress.xp;

        }


        /* ================================================
           UNLOCK LOCATION
           ================================================ */

        if (
            Array.isArray(
                progress.unlockedLocations
            )
            &&
            progress.unlockedLocations.length
            > 0
        ) {

            const unlocked =
                progress.unlockedLocations
                    .filter(
                        id =>
                            typeof id ===
                            "number"
                    )
                    .sort(
                        (a, b) =>
                            a - b
                    );


            this.unlockedLocationIndex =
                Math.max(
                    0,
                    unlocked[
                        unlocked.length - 1
                    ] - 1
                );

        }


        /* ================================================
           ACTIVE LOCATION
           ================================================ */

        const locationIds = {

            1: "pajajaran",

            2: "ki-ajar-winarong",

            3: "pasir-luhur",

            4: "kali-logawa",

            5: "desa-panagih",

            6: "goa-jatijajar",

            7: "batur-agung",

            8: "sawangan",

            9: "kali-serayu",

            10: "desa-rosari"

        };


        this.activeLocationId =
            locationIds[
                this.unlockedLocationIndex + 1
            ] ||
            "pajajaran";


        /*
           Beritahu opening.js.
        */

        this.listeners.forEach(
            listener => {

                try {

                    listener(
                        this
                    );

                }

                catch (error) {

                    console.warn(
                        "State refresh listener error:",
                        error
                    );

                }

            }
        );

    }

}


/* =========================================================
   SINGLETON INSTANCE
   ========================================================= */

export const state =
    new AppState();