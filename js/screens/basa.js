/* =========================================================
   LELANA KAMANDAKA
   BASA PAGE
   ========================================================= */


/* =========================================================
   NAVBAR
   ========================================================= */

const navbar =
    document.getElementById("siteNavbar");


function setupNavbar() {

    if (!navbar) {
        return;
    }


    function handleScroll() {

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        }

        else {

            navbar.classList.remove("scrolled");

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


setupNavbar();



/* =========================================================
   TEXT TO SPEECH
   ========================================================= */

function speakText(
    text,
    button = null
) {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Fitur suara tidak tersedia di browser ini."
        );

        return;

    }


    window.speechSynthesis.cancel();


    if (button) {

        button.classList.add(
            "speaking"
        );

    }


    const utterance =
        new SpeechSynthesisUtterance(
            text
        );


    utterance.lang =
        "id-ID";


    utterance.rate =
        0.85;


    utterance.pitch =
        1;


    utterance.onend =
        function () {

            if (button) {

                button.classList.remove(
                    "speaking"
                );

            }

        };


    utterance.onerror =
        function () {

            if (button) {

                button.classList.remove(
                    "speaking"
                );

            }

        };


    window.speechSynthesis.speak(
        utterance
    );

}



/* =========================================================
   KOSAKATA
   ========================================================= */

const vocabularySpeech = {

    "kula":
        "Kula. Artinya saya.",

    "nyuwun pangestu":
        "Nyuwun pangestu. Artinya memohon restu.",

    "badhe":
        "Badhé. Artinya akan atau hendak.",

    "rama":
        "Rama. Artinya ayah."

};


document
    .querySelectorAll(
        ".basa-speak"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const word =
                        this.dataset.word;


                    const text =
                        vocabularySpeech[
                            word
                        ] || word;


                    speakText(
                        text,
                        this
                    );

                }
            );

        }
    );



/* =========================================================
   CONTOH KALIMAT
   ========================================================= */

const btnSpeakExample =
    document.getElementById(
        "btnSpeakExample"
    );


if (btnSpeakExample) {

    btnSpeakExample.addEventListener(
        "click",
        function () {

            speakText(
                "Kula nyuwun pangestu badhé kesah, Rama.",
                this
            );

        }
    );

}