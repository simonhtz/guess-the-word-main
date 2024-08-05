// GLOBAL VARIABLES:
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "mad";
// Array for guessed letters:
let guessedLetters = [];
let remainingGuesses = 8;

// get API
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    // Get a random word:
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

// Let's get ready to rumble!
getWord();

// Letter placeholder (●)
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

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
        showGuessedLetters();
        countRemainingGuesses(guess);
        updateWordInProgress(guessedLetters);
    }
};

// Show the guessed letters:
const showGuessedLetters = function () {

    //First clear list
    guessedLettersElement.innerHTML = "";

    // Create and add letters to list
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// Update word in progress:
const updateWordInProgress = function (guessedLetters) {
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

// Count remaining guesses:
const countRemainingGuesses = function (guess) {

    // Output message for correct/incorrect guess:
    const wordUp = word.toUpperCase();
    if (!wordUp.includes(guess)) {
        message.innerText = `No, there is no ${guess}. Try again!`;
        // Subtract 1 from remaining guesses:
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yes! ${guess} is a letter we're looking for.`;
    }

    // If they lose:
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word is <span class="highlight">${word}</span>.`
        startOver();
    }
    // 1 guess left:
    else if (remainingGuesses === 1) {
        remainingSpan.innerText = "Only ONE guess";
    }
    // How many left?
    else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// Check if player wins:
const ifWins = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        
        startOver();
    }
};

// Play again
const startOver = function () {
    guessButton.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    remaining.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

// Play again button:
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    guessedLetters = [];
    remainingGuesses = 8;
    remainingSpan.innerText = `${remainingGuesses} guesses`;

    // Get new word:
    getWord();

    // Show the right UI elements once more:
    guessButton.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    remaining.classList.remove("hide");
    playAgainButton.classList.add("hide");
});
