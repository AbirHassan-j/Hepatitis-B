/* =================================
   ACTIVITY 1
   NAME THE CELL PARTS
================================= */

const correctAnswers = {
    "1": "nucleus",
    "2": "mitochondria",
    "3": "mitochondria",
    "4": "mitochondria"
};

const questionButtons =
    document.querySelectorAll(".answer-buttons button");


questionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const question =
            button.parentElement.dataset.question;

        const selectedAnswer =
            button.dataset.answer;

        const correctAnswer =
            correctAnswers[question];

        const feedback =
            button.parentElement.parentElement
            .querySelector(".answer-feedback");


        if (selectedAnswer === correctAnswer) {

            button.classList.add("correct");

            feedback.textContent =
                "✅ Correct! Great job!";

            feedback.style.color = "green";

            button.parentElement
                .querySelectorAll("button")
                .forEach(btn => {
                    btn.disabled = true;
                });

        } else {

            button.classList.add("wrong");

            feedback.textContent =
                "❌ Not quite! Try again.";

            feedback.style.color = "#d33";

            setTimeout(() => {
                button.classList.remove("wrong");
            }, 600);

        }

    });

});


/* =================================
   ORGANELLE INFORMATION
================================= */

const organelleInfo = {

    "nucleus-info": {
        title: "🟣 Nucleus",
        text: "The nucleus is like the cell's control centre. It contains the cell's DNA, which has important instructions for the cell."
    },

    "mitochondria-info": {
        title: "🟠 Mitochondria",
        text: "Mitochondria help the cell make the energy it needs to carry out its activities."
    },

    "cytoplasm-info": {
        title: "🟢 Cytoplasm",
        text: "Cytoplasm is the jelly-like area inside the cell where many important cell activities happen."
    },

    "membrane-info": {
        title: "🟢 Cell Membrane",
        text: "The cell membrane surrounds the cell and helps control what enters and leaves the cell."
    }

};


const organelleCards =
    document.querySelectorAll(".organelle-card");

const infoBox =
    document.getElementById("organelle-info");


organelleCards.forEach(card => {

    card.addEventListener("click", () => {

        const infoName =
            card.dataset.info;

        const info =
            organelleInfo[infoName];

        infoBox.innerHTML = `
            <h3>${info.title}</h3>
            <p>${info.text}</p>
        `;

    });

});


/* =================================
   ACTIVITY 2
   CLICK THE ORGANELLE
================================= */

const clickTargets =
    document.querySelectorAll(".click-organelle");

const instruction =
    document.getElementById("click-instruction");

const clickFeedback =
    document.getElementById("click-feedback");

const scoreDisplay =
    document.getElementById("click-score");


const clickAnswers = [
    "nucleus",
    "mitochondria",
    "membrane",
    "cytoplasm"
];

let clickQuestion = 0;
let score = 0;


/* Cytoplasm is not directly drawn as a button,
   so the game uses the cell background for it. */

function updateClickQuestion() {

    if (clickQuestion >= clickAnswers.length) {

        instruction.innerHTML =
            "🎉 Mission complete! You found all the cell parts!";

        clickFeedback.textContent =
            "Amazing work! You are ready to explore the liver.";

        return;
    }


    const target =
        clickAnswers[clickQuestion];

    const displayName = {

        nucleus: "nucleus",

        mitochondria: "mitochondria",

        membrane: "cell membrane",

        cytoplasm: "cytoplasm"

    };


    instruction.innerHTML =
        `Find the <strong>${displayName[target]}</strong> in the cell!`;

}


/* Clickable organelles */

clickTargets.forEach(target => {

    target.addEventListener("click", () => {

        const clicked =
            target.dataset.target;

        const correct =
            clickAnswers[clickQuestion];


        if (clicked === correct) {

            score++;

            clickQuestion++;

            target.style.transform =
                "scale(1.2)";

            clickFeedback.textContent =
                "✅ Correct! Nice job!";

            clickFeedback.style.color =
                "green";

            setTimeout(() => {

                target.style.transform =
                    "";

                updateClickQuestion();

            }, 700);


        } else {

            clickFeedback.textContent =
                "❌ Not quite! Keep looking.";

            clickFeedback.style.color =
                "#d33";

        }


        scoreDisplay.textContent =
            `${score} / 4`;

    });

});


/* Start game */

updateClickQuestion();
