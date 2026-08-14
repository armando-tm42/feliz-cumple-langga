const memories = [
    {
        image: "assets/images/moment-1.jpeg",
        caption: "Feliz navidad!!!. 😍"
    },
    {
        image: "assets/images/moment-2.jpeg",
        caption: "Beach time 🏖️"
    },
    {
        image: "assets/images/moment-3.jpeg",
        caption: "I really love to spend time with you, every single moment with you feels just right!"
    },
    {
        image: "assets/images/moment-4.jpeg",
        caption: "I love to see you happy and your smile reconfort me even in the toughest days. 🤎"
    },
    {
        image: "assets/images/moment-5.jpeg",
        caption: "You do not know how much joy and happiness have you bring to my life everyday is different ever since we are together. ❤️"
    }
];


let currentMemory = 0;


const mainImage = document.getElementById("main-memory-image");
const memoryNumber = document.getElementById("memory-number");
const memoryCaption = document.getElementById("moment-caption");

const previousButton = document.getElementById("previous-photo");
const nextButton = document.getElementById("next-photo");

const thumbnails = document.querySelectorAll(".thumbnail");


function showMemory(index) {

    currentMemory = index;

    const memory = memories[currentMemory];

    /*
        Small fade effect
    */

    mainImage.style.opacity = "0";

    setTimeout(() => {

        mainImage.src = memory.image;

        memoryCaption.textContent = memory.caption;

        memoryNumber.textContent =
            String(currentMemory + 1).padStart(2, "0");

        mainImage.style.opacity = "1";

    }, 200);


    /*
        Update active thumbnail
    */

    thumbnails.forEach((thumbnail, thumbnailIndex) => {

        thumbnail.classList.toggle(
            "active",
            thumbnailIndex === currentMemory
        );

    });
}


function showNextMemory() {

    const nextIndex =
        (currentMemory + 1) % memories.length;

    showMemory(nextIndex);
}


function showPreviousMemory() {

    const previousIndex =
        (currentMemory - 1 + memories.length)
        % memories.length;

    showMemory(previousIndex);
}


/*
    Arrow buttons
*/

nextButton.addEventListener(
    "click",
    showNextMemory
);

previousButton.addEventListener(
    "click",
    showPreviousMemory
);


/*
    Thumbnail buttons
*/

thumbnails.forEach((thumbnail, index) => {

    thumbnail.addEventListener(
        "click",
        () => showMemory(index)
    );

});