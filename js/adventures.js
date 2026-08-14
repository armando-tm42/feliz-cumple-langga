/* ==========================================
   ADVENTURES
========================================== */


const adventures = [

    {
        type: "image",
        source: "assets/images/adventure-1.jpeg",
        title: "Our special spot",
        description:
            "kweba became one of our special places, we have done many memories here"
    },

    {
        source: "assets/images/adventure-2.jpeg",
        title: "Mesavirre ☺️",
        description:
            "Oh Mesavirre, this is one of our most intimate places, I think here we learned more about each other, either if we were just talking, crying or being passionate I will cherish every single moment here"
    },

    {
        type: "image",
        source: "assets/images/adventure-3.jpeg",
        title: "UAE!! 😱",
        description:
            "I will keep your trip to Dubai as one of our special memories ever, you got to know my days, the places I used to visit and how was life for me there, we will return someday there is still many things to do and places to visit"
    },

    {
        type: "image",
        source: "assets/images/adventure-4.jpeg",
        title: "Shopping time 💅",
        description:
            "I lost the count of the mall we visited so far hehehe, even if we went there just to see because we did not have money that did not stop us from making special moments like this one"
    },

    {
        type: "video",
        source: "assets/images/adventure-5.mp4",
        title: "Casa 🏠",
        description:
            "Balay, I think there is no words to describe how many memories we have here, either only us or with your family is an special place I will keep on my heart"
    }

];


let currentAdventure = 0;


const adventureTrack =
    document.getElementById("adventure-track");

const adventureNumber =
    document.getElementById("adventure-number");

const adventureTotal =
    document.getElementById("adventure-total");

const adventureDots =
    document.getElementById("adventure-dots");

const previousAdventure =
    document.getElementById("previous-adventure");

const nextAdventure =
    document.getElementById("next-adventure");


/* ==========================================
   CREATE CARDS
========================================== */

function createAdventureCards() {

    adventures.forEach((adventure, index) => {

        const card =
            document.createElement("article");

        card.classList.add("adventure-card");

        card.dataset.index = index;

        let mediaElement;


        if (adventure.type === "video") {

            mediaElement = `
                <video
                    class="adventure-media"
                    src="${adventure.source}"
                    muted
                    playsinline
                    preload="metadata"
                    controls
                ></video>
            `;

        } else {

            mediaElement = `
                <img
                    class="adventure-media"
                    src="${adventure.source}"
                    alt="${adventure.title}"
                >
            `;

        }

        card.innerHTML = `

            <div class="adventure-card-inner">


                <!-- FRONT -->

                <div class="adventure-card-front">

                    ${mediaElement}


                    <div class="adventure-card-overlay">

                        <span>
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                    </div>

                </div>


                <!-- BACK -->

                <div class="adventure-card-back">

                    <span class="adventure-card-number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>
                        ${adventure.title}
                    </h3>

                    <p>
                        ${adventure.description}
                    </p>

                    <span class="adventure-heart">
                        ❤️
                    </span>

                </div>

            </div>

        `;


        card.addEventListener(
            "click",
            (event) => {

                /*
                * If the user is interacting
                * with a video, don't flip the card.
                */

                if (
                    event.target.closest("video")
                ) {
                    return;
                }


                if (
                    index !== currentAdventure
                ) {
                    return;
                }


                card.classList.toggle(
                    "flipped"
                );


                const video =
                    card.querySelector("video");


                if (video) {

                    if (
                        card.classList.contains("flipped")
                    ) {

                        video.pause();

                    }

                }

            }
        );


        adventureTrack.appendChild(card);

    });


    adventureTotal.textContent =
        String(adventures.length).padStart(2, "0");

}


/* ==========================================
   CREATE DOTS
========================================== */

function createAdventureDots() {

    adventures.forEach(
        (_, index) => {

            const dot =
                document.createElement("button");

            dot.classList.add(
                "adventure-dot"
            );

            dot.setAttribute(
                "aria-label",
                `Go to adventure ${index + 1}`
            );


            dot.addEventListener(
                "click",
                () => {

                    showAdventure(index);

                }
            );


            adventureDots.appendChild(dot);

        }
    );

}


/* ==========================================
   SHOW ADVENTURE
========================================== */

function showAdventure(index) {

    if (index < 0) {

        index = adventures.length - 1;

    }

    if (index >= adventures.length) {

        index = 0;

    }


    currentAdventure = index;


    const cards =
        document.querySelectorAll(
            ".adventure-card"
        );


    cards.forEach(
        (card, cardIndex) => {

            card.classList.remove(
                "active",
                "previous",
                "next",
                "flipped"
            );


            const video =
                card.querySelector("video");


            /* Pause every video */

            if (video) {

                video.pause();

                video.currentTime = 0;

                card.classList.remove(
                    "video-playing"
                );

            }


            if (cardIndex === currentAdventure) {

                card.classList.add("active");


                if (video) {

                    video.pause();

                    video.currentTime = 0;

                    card.classList.remove(
                        "video-playing"
                    );

                }

            }


            else if (
                cardIndex ===
                currentAdventure - 1
            ) {

                card.classList.add("previous");

            }


            else if (
                cardIndex ===
                currentAdventure + 1
            ) {

                card.classList.add("next");

            }

        }
    );


    /* Update number */

    adventureNumber.textContent =
        String(currentAdventure + 1)
            .padStart(2, "0");


    /* Update dots */

    const dots =
        document.querySelectorAll(
            ".adventure-dot"
        );


    dots.forEach(
        (dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentAdventure
            );

        }
    );

}

/* ==========================================
   NAVIGATION
========================================== */

previousAdventure.addEventListener(
    "click",
    () => {

        showAdventure(
            currentAdventure - 1
        );

    }
);


nextAdventure.addEventListener(
    "click",
    () => {

        showAdventure(
            currentAdventure + 1
        );

    }
);


/* ==========================================
   INITIALIZE
========================================== */

createAdventureCards();

createAdventureDots();

showAdventure(0);