const gameSection = document.getElementById("gameSection");
const wordDisplay = document.getElementById("word");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const passButton = document.getElementById("passButton");
const wordCountDisplay = document.getElementById("wordCount");
const words = ["tornado", "typhoon", "earthquake", "floods", "tsunami", "volcano", "fire","emergency","warning","landslide","tsunami","evacuate","disaster","risk","supplies","prevention","calamity","resilience","awareness","forecast","knowledge","safety","rescue","medicine","recovery"];
let currentWordIndex = 0;
let wordCount = 0;

function restartGameFive() {
    resetGameFive();
}

function skipCurrentWord() {
    currentWordIndex++;
    if (currentWordIndex === words.length) {
        showGameOverScreen(true, gameFive);
        resetGameFive();
    } else {
        displayScrambledWord();
        guessInput.value = "";
    }
}

function scrambleWord(word) {
    let array = word.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

function resetGameFive() {
    currentWordIndex = 0;
    wordCount = 0;
    words.sort(() => Math.random() - 0.5);
    shuffledWords = words.slice();
    displayScrambledWord();
    wordCountDisplay.textContent = wordCount;
}

function displayScrambledWord() {
    wordDisplay.textContent = scrambleWord(words[currentWordIndex]);
}

function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    const currentWord = words[currentWordIndex];
    if (guess === currentWord) {
        wordCount++;
        wordCountDisplay.textContent = wordCount;
        currentWordIndex++;
        if (currentWordIndex === words.length) {
            showGameOverScreen(true, gameFive);
        } 
        else {
            displayScrambledWord();
            guessInput.value = "";
        }
    } else {
        alert("Invalid input. Try again.");
    }
}

function skipWord() {
    skipCurrentWord();
    displayScrambledWord();
    guessInput.value = "";
}

guessButton.addEventListener("click", checkGuess);
passButton.addEventListener("click", skipWord);