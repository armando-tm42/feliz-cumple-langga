/* ==========================================
   A LITTLE MESSAGE
========================================== */


const messageSection =
    document.getElementById("little-message");

const letterEnvelope =
    document.getElementById("letter-envelope");

const openLetterButton =
    document.getElementById("open-letter-button");

const loveLetter =
    document.getElementById("love-letter");

const messageNext =
    document.getElementById("message-next");

const finalButton =
    document.getElementById("go-to-final");


/* ==========================================
   SECTION ENTRANCE
========================================== */

if (messageSection) {

    const messageObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    messageObserver.observe(
        messageSection
    );

}


/* ==========================================
   OPEN LETTER
========================================== */

if (openLetterButton) {

    openLetterButton.addEventListener(
        "click",
        () => {

            if (!letterEnvelope) {
                return;
            }


            letterEnvelope.classList.add(
                "open"
            );


            openLetterButton.style.opacity =
                "0";

            openLetterButton.style.pointerEvents =
                "none";


            setTimeout(() => {

                if (loveLetter) {

                    loveLetter.classList.add(
                        "visible"
                    );

                }

            }, 650);


            setTimeout(() => {

                if (messageNext) {

                    messageNext.classList.add(
                        "visible"
                    );

                }

            }, 1600);

        }
    );

}


/* ==========================================
   FINAL BUTTON
========================================== */

if (finalButton) {

    finalButton.addEventListener(
        "click",
        () => {

            const finalSection =
                document.getElementById(
                    "final-message"
                );


            if (finalSection) {

                finalSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}