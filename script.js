/* =========================================================
   INSIDE YOUR BODY
   INTERACTIVE ACTIVITIES
   ========================================================= */


/* =========================================================
   BUILD THE BODY ACTIVITY
   ========================================================= */

// The correct order
const correctOrder = [
    "cell",
    "tissue",
    "organ",
    "system"
];

// Keep track of the student's progress
let currentStep = 0;

// Find the elements we need from the HTML
const gameCards = document.querySelectorAll(".game-card");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const gameFeedback = document.getElementById("game-feedback");
const resetButton = document.getElementById("reset-game");


/* ---------- WHAT HAPPENS WHEN A CARD IS CLICKED ---------- */

gameCards.forEach(card => {

    card.addEventListener("click", function () {

        // Don't allow a card that was already completed to be clicked
        if (card.classList.contains("completed")) {
            return;
        }

        const selectedAnswer = card.dataset.answer;

        // Check whether the student chose the correct answer
        if (selectedAnswer === correctOrder[currentStep]) {

            // Make the card look completed
            card.classList.add("completed");

            // Move to the next step
            currentStep++;

            // Update progress
            updateProgress();

            // Give feedback
            if (currentStep < correctOrder.length) {

                const nextAnswers = {
                    tissue: "tissue",
                    organ: "organ",
                    system: "organ system"
                };

                const next = correctOrder[currentStep];

                if (next === "tissue") {
                    gameFeedback.textContent =
                        "Nice! 🎉 Now find what groups of cells form.";
                }

                else if (next === "organ") {
                    gameFeedback.textContent =
                        "Great! 🧩 Now find what tissues work together.";
                }

                else if (next === "system") {
                    gameFeedback.textContent =
                        "Almost there! 🫀 Now find what organs work together.";
                }

            }

            // The student finished!
            else {

                gameFeedback.textContent =
                    "🎉 Amazing! You built the organization of the body!";

                gameFeedback.style.background = "#eaf8ef";

                gameFeedback.style.color = "#28734b";
            }

        }

        // The answer was not correct
        else {

            gameFeedback.textContent =
                "Not quite! 🤔 Think about what comes first: what is the smallest level?";

            // Small animation to show the card was incorrect
            card.classList.add("shake");

            setTimeout(() => {
                card.classList.remove("shake");
            }, 400);
        }

    });

});


/* =========================================================
   UPDATE THE PROGRESS BAR
   ========================================================= */

function updateProgress() {

    progressText.textContent =
        currentStep + " / " + correctOrder.length;

    const percentage =
        (currentStep / correctOrder.length) * 100;

    progressFill.style.width = percentage + "%";
}


/* =========================================================
   RESET THE GAME
   ========================================================= */

resetButton.addEventListener("click", function () {

    // Start from the beginning
    currentStep = 0;

    // Remove completed appearance from every card
    gameCards.forEach(card => {
        card.classList.remove("completed");
    });

    // Reset progress
    updateProgress();

    // Reset feedback
    gameFeedback.textContent =
        "Choose your first card!";

    gameFeedback.style.background = "";
    gameFeedback.style.color = "";
});


/* =========================================================
   PAGE LOAD
   ========================================================= */

// Make sure the progress bar starts at zero
updateProgress();
