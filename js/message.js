/* ==========================================
   A LITTLE MESSAGE
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

const letterEnvelope =
    document.getElementById("letter-envelope");

const openLetterButton =
    document.getElementById("open-letter-button");

const loveLetter =
    document.getElementById("love-letter");

const messageNext =
    document.getElementById("message-next");


/* ==========================================
   OPEN LETTER
========================================== */

function openLetter() {

    if (!letterEnvelope || !loveLetter) {
        return;
    }

    /* Prevent opening multiple times */

    if (letterEnvelope.classList.contains("open")) {
        return;
    }

    /* Open envelope */

    letterEnvelope.classList.add("open");


    /* Update button */

    if (openLetterButton) {

        const buttonText =
            openLetterButton.querySelector("span");

        if (buttonText) {

            buttonText.textContent =
                "My Letter ❤️";

        }

    }


    /* Show letter */

    setTimeout(() => {

        loveLetter.classList.add("visible");

    }, 700);


    /* Show continue */

    if (messageNext) {

        setTimeout(() => {

            messageNext.classList.add("visible");

        }, 1700);

    }

}


/* Button */

if (openLetterButton) {

    openLetterButton.addEventListener(
        "click",
        openLetter
    );

}


/* Envelope */

if (letterEnvelope) {

    letterEnvelope.addEventListener(
        "click",
        openLetter
    );

}