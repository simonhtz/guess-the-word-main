// GLOBAL VARIABLES:
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "man";

// Array for guessed letters:
const guessedLetters = [];

// Letter placeholder (●)
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

// Adding event listener to button
guessButton.addEventListener("click", function (e) {

    // Prevent default refresh:
    e.preventDefault();

    // Empty text messages
    message.innerText = "";

    // Make 'guess' the letter the player guesses:
    const guess = letterInput.value;

    // If the guess is correct, run the function:
    const goodGuess = playerInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }

    // Clear input field:
    letterInput.value = "";
});

// Check Player's Input
const playerInput = function (input) {

    // Regular expression (to specify the input letters to the alphabet*)
    const acceptedLetter = /[a-zA-Z]/;

    // Conditionnals
    if (input.length === 0) {
        message.innerText = "We need a letter from A to Z.";
    } else if (input.length > 1) {
        message.innerText = "Hey! That was more the one letter! Type ONE letter, remember?";

        // Does the input letter match the regular expression above?*
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "That's maybe a letter from YOUR alphabet, but not mine. Try again!";

        // If none applies, display letter:
    } else {
        return input;
    }
};

// Function to Capture Input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();

    // Every letter should be guessed only once:
    if (guessedLetters.includes(guess)) {
        message.innerText = "Hey, you've guessed this one before! Try again.";
    }

    // Add the letter to the guessed letters list:
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

// Show the guessed letters:
const showGuessedLetters = function() {

    //First clear list
    guessedLettersElement.innerHTML = "";

    // Create and add letters to list
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// Update word in progress
const updateWordInProgress =  function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");

    // If guessed letter is correct, reveal it:
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        }
        //if not, keep the (●):
        else {
            revealWord.push("●");
        }
    }
    // Reveal word:
    wordInProgress.innerText = revealWord.join("");
    ifWins();
};

// Check if player wins:
const ifWins = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};