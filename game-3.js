const gameThree = document.querySelector('#gameThree');
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".gameContainer");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let firstCard = false;
let secondCard = false;
let movesCount = 0, matchCount = 0;

const items = [
    { name: "tornado", image: "1.png" },
    { name: "tsunami", image: "8.png" },
    { name: "earthquake", image: "7.png" },
    { name: "fire", image: "6.png" },
    { name: "flash", image: "3.png" },
    { name: "land", image: "4.png" },
    { name: "typhoon", image: "2.png" },
    { name: "eruption", image: "5.png" },
];

const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves: </span>${movesCount}`;
};

const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">
                <img src="../assets/images/game-3/diss.png" class="card-placeholder-image" alt="Card Placeholder">
            </div>
            <div class="card-after">
                <img src="../assets/images/game-3/${cardValues[i].image}" class="image"/>
            </div>
        </div>
        `;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
    cards = document.querySelectorAll(".card-container");
    cards.forEach(card => {
        card.classList.remove("flipped", "matched"); // Reset card states
        card.addEventListener("click", handleCardClick);
    });
};

function handleCardClick() {
    if (!this.classList.contains("matched")) {
        if (!firstCard) {
            this.classList.add("flipped");
            firstCard = this;
            firstCardValue = this.getAttribute("data-card-value");
        } else if (this !== firstCard) {
            this.classList.add("flipped");
            movesCounter();
            secondCard = this;
            checkCardMatch();
        }
    }
}

function checkCardMatch() {
    let secondCardValue = secondCard.getAttribute("data-card-value");
    if (firstCardValue === secondCardValue) {
        handleMatch();
    } else {
        handleMismatch();
    }

    if (userHasNoCoins()) {
        gameIsOver(true, gameThree);
    }
}

function handleMatch() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard = false;
    matchCount += 1;
    updateCoins(40);
    if (matchCount === Math.floor(cards.length / 2)) {
        showGameOverScreen(true, gameThree);
    }
}

function handleMismatch() {
    let [tempFirst, tempSecond] = [firstCard, secondCard];
    firstCard = false;
    secondCard = false;
    if (userCoins - 20 >= 0) {
        updateCoins(-20);
    }
    setTimeout(() => {
        tempFirst.classList.remove("flipped");
        tempSecond.classList.remove("flipped");
    }, 600);
}

function restartGameThree() {
    matchCount = 0;
    movesCount = 0;
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    generateCards();
}

function generateCards() {
    let cardValues = generateRandom();
    matrixGenerator(cardValues);
};