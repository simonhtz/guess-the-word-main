// GLOBAL VARIABLES
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// Letter Placeholder (●)
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

// Adding Event Listener to Button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = playerInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

// Check Player's Input
const playerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "We need a letter from A to Z.";
    } else if (input.length > 1) {
        message.innerText = "Only ONE letter, please!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "That's maybe a letter from YOUR alphabet, but not mine. Try again!";
    } else {
        return input;
    }
};

// Function to Capture Input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Hey, you've guessed this one before! Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};