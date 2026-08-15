/* ==========================================
   MAIN NAVIGATION
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

const startButton =
    document.getElementById("start-button");

const momentsSection =
    document.getElementById("moments");

const adventuresSection =
    document.getElementById("adventures");

const storySection = 
    document.getElementById("our-story");

const finalSection =
    document.getElementById("final-section");

const messageSection = 
    document.getElementById("little-message");

const adventuresButton = 
    document.getElementById("go-to-adventures");

const storyButton = 
    document.getElementById("go-to-story");

const messageButton = 
    document.getElementById("go-to-message");

const finalButton =
    document.getElementById("go-to-final");    


/* ==========================================
   NAVIGATION STATE
========================================== */

const navigationSections = [
    momentsSection,
    adventuresSection,
    storySection
].filter(Boolean);

let currentSectionIndex = 0;

let isNavigating = false;


/* ==========================================
   GO TO SECTION
========================================== */

function goToSection(section) {

    if (!section) {
        return;
    }

    const index =
        navigationSections.indexOf(section);

    if (index !== -1) {
        currentSectionIndex = index;
    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ==========================================
   START BUTTON
========================================== */

if (startButton) {

    startButton.addEventListener(
        "click",
        () => {

            createHeartBurst();

            setTimeout(() => {

                goToSection(momentsSection);

            }, 500);

        }
    );

}


/* ==========================================
   ADVENTURES BUTTON
========================================== */

if (adventuresButton) {

    adventuresButton.addEventListener(
        "click",
        () => {

            goToSection(
                adventuresSection
            );

        }
    );

}


/* ==========================================
   OUR STORY BUTTON
========================================== */

if (storyButton) {

    storyButton.addEventListener(
        "click",
        () => {

            goToSection(
                storySection
            );

        }
    );

}

/* ==========================================
   A LITTLE MESSAGE BUTTON
========================================== */

if (messageButton) {

    messageButton.addEventListener(
        "click",
        () => {

            if (!messageSection) {
                return;
            }

            messageSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}

/* ==========================================
   FINAL SECTION BUTTON
========================================== */

if (finalButton) {

    finalButton.addEventListener(
        "click",
        () => {

            if (!finalSection) {
                return;
            }

            finalSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

}

/* ==========================================
   WHEEL NAVIGATION
========================================== */

window.addEventListener(
    "wheel",
    (event) => {

        /*
         * IMPORTANT:
         *
         * Once Our Story is active,
         * completely release the wheel.
         *
         * This allows the entire timeline
         * to scroll normally.
         */

        if (
            currentSectionIndex ===
            navigationSections.indexOf(
                storySection
            )
        ) {

            return;

        }


        /*
         * Ignore small wheel movements.
         */

        if (
            Math.abs(event.deltaY) < 20
        ) {

            return;

        }


        /*
         * Prevent normal scrolling only
         * while navigating between the
         * first three sections.
         */

        event.preventDefault();


        if (isNavigating) {

            return;

        }


        if (event.deltaY > 0) {

            navigateNext();

        } else {

            navigatePrevious();

        }

    },
    {
        passive: false
    }
);


/* ==========================================
   NEXT SECTION
========================================== */

function navigateNext() {

    if (isNavigating) {
        return;
    }


    const nextIndex =
        currentSectionIndex + 1;


    if (
        nextIndex >=
        navigationSections.length
    ) {

        return;

    }


    navigateToIndex(nextIndex);

}


/* ==========================================
   PREVIOUS SECTION
========================================== */

function navigatePrevious() {

    if (isNavigating) {
        return;
    }


    const previousIndex =
        currentSectionIndex - 1;


    if (previousIndex < 0) {

        return;

    }


    navigateToIndex(previousIndex);

}


/* ==========================================
   NAVIGATE BY INDEX
========================================== */

function navigateToIndex(index) {

    if (
        index < 0 ||
        index >= navigationSections.length
    ) {

        return;

    }


    const section =
        navigationSections[index];


    if (!section) {
        return;
    }


    isNavigating = true;

    currentSectionIndex = index;


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    /*
     * Prevent the next wheel event
     * from immediately jumping again.
     */

    setTimeout(() => {

        isNavigating = false;

    }, 900);

}


/* ==========================================
   TOUCH NAVIGATION
========================================== */

let touchStartY = 0;


window.addEventListener(
    "touchstart",
    (event) => {

        /*
         * Do nothing inside Our Story.
         *
         * This is important for the timeline
         * on mobile.
         */

        if (
            isInsideStory(event.target)
        ) {

            touchStartY = null;

            return;

        }


        if (
            event.touches.length !== 1
        ) {

            return;

        }


        touchStartY =
            event.touches[0].clientY;

    },
    {
        passive: true
    }
);


window.addEventListener(
    "touchend",
    (event) => {

        /*
         * Our Story gets normal native
         * scrolling/swiping.
         */

        if (
            isInsideStory(event.target)
        ) {

            return;

        }


        if (
            touchStartY === null
        ) {

            return;

        }


        if (
            touchStartY === 0
        ) {

            return;

        }


        const touchEndY =
            event.changedTouches[0].clientY;


        const difference =
            touchStartY - touchEndY;


        /*
         * Ignore small movements.
         */

        if (
            Math.abs(difference) < 60
        ) {

            return;

        }


        if (isNavigating) {

            return;

        }


        /*
         * Swipe up
         */

        if (difference > 0) {

            navigateNext();

        }


        /*
         * Swipe down
         */

        else {

            navigatePrevious();

        }


        touchStartY = 0;

    },
    {
        passive: true
    }
);


/* ==========================================
   DETECT OUR STORY
========================================== */

function isInsideStory(element) {

    if (!storySection) {

        return false;

    }


    return storySection.contains(
        element
    );

}


/* ==========================================
   UPDATE CURRENT SECTION
========================================== */

if (navigationSections.length > 0) {

    const sectionObserver =
        new IntersectionObserver(

            (entries) => {

                /*
                 * Don't update the navigation
                 * state while we are performing
                 * a controlled transition.
                 */

                if (isNavigating) {

                    return;

                }


                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            const index =
                                navigationSections.indexOf(
                                    entry.target
                                );


                            if (
                                index !== -1
                            ) {

                                currentSectionIndex =
                                    index;

                            }

                        }

                    }
                );

            },

            {
                threshold: 0.6
            }

        );


    navigationSections.forEach(
        (section) => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* ==========================================
   HEART BURST
========================================== */

function createHeartBurst() {

    const hearts = [
        "❤️",
        "💕",
        "💗",
        "🥰",
        "✨"
    ];


    if (!startButton) {

        return;

    }


    const buttonRect =
        startButton.getBoundingClientRect();


    const centerX =
        buttonRect.left +
        buttonRect.width / 2;


    const centerY =
        buttonRect.top +
        buttonRect.height / 2;


    for (let i = 0; i < 12; i++) {

        const heart =
            document.createElement("span");


        heart.classList.add(
            "click-heart"
        );


        heart.textContent =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.left =
            `${centerX}px`;


        heart.style.top =
            `${centerY}px`;


        heart.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 250}px`
        );


        heart.style.setProperty(
            "--y",
            `${(Math.random() - 0.5) * 180}px`
        );


        document.body.appendChild(
            heart
        );


        setTimeout(() => {

            heart.remove();

        }, 1000);

    }

}


/* ==========================================
   MOMENTS OBSERVER
========================================== */

if (momentsSection) {

    const momentsObserver =
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
                threshold: 0.2
            }

        );


    momentsObserver.observe(
        momentsSection
    );

}


/* ==========================================
   ADVENTURES OBSERVER
========================================== */

if (adventuresSection) {

    const adventuresObserver =
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
                threshold: 0.2
            }

        );


    adventuresObserver.observe(
        adventuresSection
    );

}

/* ==========================================
   MESSAGE OBSERVER
========================================== */

if (messageSection) {

    const messageObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                    }

                });

            },

            {
                threshold: 0.2
            }

        );

    messageObserver.observe(messageSection);

}