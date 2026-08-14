/* ==========================================
   OUR STORY
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

const storyElement =
    document.getElementById("our-story");

const storyAudio =
    document.getElementById("story-audio");

const storyMusicButton =
    document.getElementById("story-music-button");

const musicButtonText =
    document.getElementById("music-button-text");

const musicIcon =
    document.getElementById("music-icon");

const musicPlayer =
    document.getElementById("music-player");

const musicVisualizer =
    document.getElementById("music-visualizer");


/* ==========================================
   STORY ENTRANCE
========================================== */

if (storyElement) {

    const storyObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        storyElement.classList.add(
                            "visible"
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    storyObserver.observe(
        storyElement
    );

}


/* ==========================================
   STORY ITEMS
========================================== */

const storyItems =
    document.querySelectorAll(
        ".story-item"
    );


if (storyItems.length > 0) {

    const itemObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    storyItems.forEach((item) => {

        itemObserver.observe(item);

    });

}


/* ==========================================
   MUSIC
========================================== */

let musicPlaying = false;


/* ==========================================
   MUSIC BUTTON
========================================== */

if (
    storyMusicButton &&
    storyAudio
) {

    storyMusicButton.addEventListener(
        "click",
        async () => {

            try {

                if (storyAudio.paused) {

                    await storyAudio.play();

                } else {

                    storyAudio.pause();

                }

            } catch (error) {

                console.error(
                    "Could not control Our song:",
                    error
                );

            }

        }
    );

}


/* ==========================================
   AUDIO EVENTS
========================================== */

if (storyAudio) {


    storyAudio.addEventListener(
        "play",
        () => {

            musicPlaying = true;

            updateMusicUI();

        }
    );


    storyAudio.addEventListener(
        "pause",
        () => {

            musicPlaying = false;

            updateMusicUI();

        }
    );


    storyAudio.addEventListener(
        "ended",
        () => {

            musicPlaying = false;

            updateMusicUI();

        }
    );


    storyAudio.addEventListener(
        "error",
        () => {

            console.error(
                "There was an error loading Our song.",
                storyAudio.error
            );

        }
    );

}


/* ==========================================
   MUSIC UI
========================================== */

function updateMusicUI() {

    if (!storyMusicButton) {
        return;
    }


    if (musicPlaying) {

        if (musicButtonText) {

            musicButtonText.textContent =
                "Pause a nice song";

        }


        if (musicIcon) {

            musicIcon.textContent =
                "❚❚";

        }


        storyMusicButton.classList.add(
            "playing"
        );


        if (musicPlayer) {

            musicPlayer.classList.add(
                "active"
            );

        }


        if (musicVisualizer) {

            musicVisualizer.classList.add(
                "playing"
            );

        }

    } else {

        if (musicButtonText) {

            musicButtonText.textContent =
                "Play a nice song";

        }


        if (musicIcon) {

            musicIcon.textContent =
                "♫";

        }


        storyMusicButton.classList.remove(
            "playing"
        );


        if (musicPlayer) {

            musicPlayer.classList.remove(
                "active"
            );

        }


        if (musicVisualizer) {

            musicVisualizer.classList.remove(
                "playing"
            );

        }

    }

}

/* ==========================================
   STORY ENDING
========================================== */

const storyEnding =
    document.querySelector(".story-ending");


if (storyEnding) {

    const endingObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        storyEnding.classList.add(
                            "visible"
                        );

                        endingObserver.unobserve(
                            storyEnding
                        );

                    }

                });

            },

            {
                threshold: 0.2
            }

        );


    endingObserver.observe(
        storyEnding
    );

}