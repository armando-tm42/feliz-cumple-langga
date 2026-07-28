const startButton = document.getElementById("start-button");
const momentsSection = document.getElementById("moments");


startButton.addEventListener("click", () => {

    createHeartBurst();

    setTimeout(() => {

        momentsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 500);

});


function createHeartBurst() {

    const hearts = [
        "❤️",
        "💕",
        "💗",
        "🥰",
        "✨"
    ];

    const buttonRect = startButton.getBoundingClientRect();

    const centerX =
        buttonRect.left + buttonRect.width / 2;

    const centerY =
        buttonRect.top + buttonRect.height / 2;


    for (let i = 0; i < 12; i++) {

        const heart = document.createElement("span");

        heart.classList.add("click-heart");

        heart.textContent =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;

        heart.style.setProperty(
            "--x",
            `${(Math.random() - 0.5) * 250}px`
        );

        heart.style.setProperty(
            "--y",
            `${(Math.random() - 0.5) * 180}px`
        );

        document.body.appendChild(heart);


        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

const momentsObserver = new IntersectionObserver(
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


momentsObserver.observe(momentsSection);