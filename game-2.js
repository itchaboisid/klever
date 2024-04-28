const gamePlayer = document.getElementById('player');
const gameBoardContainer = document.getElementById('boardCellGrid');
const encounterPositions = new Set();
const maximumEncounters = 40;
const gameQuestionPrompt = document.getElementById('questionPrompt');
const currentGameQuestion = document.getElementById('gameTwoQuestion');
const answerButtons_GAMETWO = document.querySelectorAll('.questionAnswers');
const rollDiceButton = document.getElementById('rollDiceButton');
let lastQuestionIndex_GAMETWO = null;
let currentQuestionIndex_GAMETWO = 0;
let playerCurrentPosition = 1;
let portalPairs = [];

const gameQuestions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "Berlin"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the largest mammal?",
        answers: ["Elephant", "Giraffe"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Mars", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the capital of Japan?",
        answers: ["Tokyo", "Seoul"],
        correctAnswer: "Tokyo"
    },
    {
        question: "What is the tallest mountain on Earth?",
        answers: ["Mount Everest", "Kangchenjunga"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "Which gas do plants primarily use for photosynthesis?",
        answers: ["Oxygen", "Nitrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["H2O", "NaCl"],
        correctAnswer: "H2O"
    },
    {
        question: "Which famous scientist formulated the theory of relativity?",
        answers: ["Isaac Newton", "Galileo Galilei"],
        correctAnswer: "Albert Einstein"
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["CO2", "NaCl"],
        correctAnswer: "H2O"
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["William Shakespeare", "Charles Dickens"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Au", "Fe"],
        correctAnswer: "Au"
    },
    {
        question: "Which planet is known as the 'Morning Star'?",
        answers: ["Venus", "Mars"],
        correctAnswer: "Venus"
    },
    {
        question: "What is the main ingredient in guacamole?",
        answers: ["Avocado", "Onion"],
        correctAnswer: "Avocado"
    },
    {
        question: "What is the currency of Japan?",
        answers: ["Yen", "Euro"],
        correctAnswer: "Yen"
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Leonardo da Vinci", "Vincent van Gogh"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the process by which plants make their own food called?",
        answers: ["Photosynthesis", "Transpiration"],
        correctAnswer: "Photosynthesis"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: ["Japan", "India"],
        correctAnswer: "Japan"
    },
    {
        question: "What is the chemical symbol for iron?",
        answers: ["Fe", "Ag"],
        correctAnswer: "Fe"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "Stephen King"],
        correctAnswer: "Harper Lee"
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        answers: ["Lion", "Elephant"],
        correctAnswer: "Lion"
    },
    {
        question: "What is the largest desert in the world?",
        answers: ["Sahara Desert", "Arabian Desert"],
        correctAnswer: "Sahara Desert"
    },
    {
        question: "Who discovered penicillin?",
        answers: ["Alexander Fleming", "Marie Curie"],
        correctAnswer: "Alexander Fleming"
    },
    {
        question: "What is the chemical symbol for silver?",
        answers: ["Ag", "Fe"],
        correctAnswer: "Ag"
    },
    {
        question: "Which country is known as the 'Land of Fire and Ice'?",
        answers: ["Iceland", "Norway"],
        correctAnswer: "Iceland"
    },
    {
        question: "Who wrote '1984'?",
        answers: ["George Orwell", "Ernest Hemingway"],
        correctAnswer: "George Orwell"
    },
    {
        question: "What is the process of converting sugar into alcohol called?",
        answers: ["Fermentation", "Evaporation"],
        correctAnswer: "Fermentation"
    },
    {
        question: "Which gas is most abundant in the Earth's atmosphere?",
        answers: ["Nitrogen", "Carbon Dioxide"],
        correctAnswer: "Nitrogen"
    },
    {
        question: "Who painted 'The Starry Night'?",
        answers: ["Vincent van Gogh", "Leonardo da Vinci"],
        correctAnswer: "Vincent van Gogh"
    },
    {
        question: "What is the largest organ in the human body?",
        answers: ["Skin", "Heart"],
        correctAnswer: "Skin"
    },
    {
        question: "What is the chemical symbol for sodium?",
        answers: ["Na", "Cl"],
        correctAnswer: "Na"
    },
    {
        question: "Who is credited with inventing the telephone?",
        answers: ["Alexander Graham Bell", "Nikola Tesla"],
        correctAnswer: "Alexander Graham Bell"
    },
    {
        question: "What is the only mammal capable of true flight?",
        answers: ["Bat", "Pterosaur"],
        correctAnswer: "Bat"
    },
    {
        question: "Who wrote 'The Great Gatsby'?",
        answers: ["F. Scott Fitzgerald", "Mark Twain"],
        correctAnswer: "F. Scott Fitzgerald"
    },
    {
        question: "Which city is known as the 'City of Love'?",
        answers: ["Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the chemical symbol for carbon?",
        answers: ["C", "Ca"],
        correctAnswer: "C"
    },
    {
        question: "Who discovered the theory of evolution by natural selection?",
        answers: ["Charles Darwin", "Alfred Wallace"],
        correctAnswer: "Charles Darwin"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Diamond", "Graphite"],
        correctAnswer: "Diamond"
    }
];

function displayCurrentQuestion() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * gameQuestions.length);
    } while (newIndex === lastQuestionIndex_GAMETWO);

    lastQuestionIndex_GAMETWO = newIndex;
    currentQuestionIndex_GAMETWO = newIndex;
    const currentQuestion = gameQuestions[newIndex];
    currentGameQuestion.textContent = currentQuestion.question;
    currentQuestion.answers.forEach((answer, index) => {
        answerButtons_GAMETWO[index].textContent = answer;
    });
}

answerButtons_GAMETWO.forEach(button => {
    button.addEventListener("click", checkSelectedAnswer);
});

function checkSelectedAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const currentQuestion = gameQuestions[currentQuestionIndex_GAMETWO];

    if (selectedAnswer === currentQuestion.correctAnswer) {
        gameQuestionPrompt.style.display = 'none';
        updateCoins(20);
    } else {
        gameQuestionPrompt.style.display = 'none';
        if (userCoins - 10 >= 0) {
            updateCoins(-10);
        }
        movePlayerBack();
        updatePlayerPosition(playerCurrentPosition);
    }
}

function movePlayerBack() {
    const stepsBack = Math.floor(Math.random() * 3) + 1;
    playerCurrentPosition = Math.max(1, playerCurrentPosition - stepsBack);
}

function initializeGameBoard() {
    generateEncounters();
    generatePortals();
    generateCells();
}

function generateEncounters() {
    while (encounterPositions.size < maximumEncounters) {
        const randomIndex = Math.floor(Math.random() * 99) + 1;
        if (!encounterPositions.has(randomIndex)) {
            encounterPositions.add(randomIndex);
        }
    }
}

function generatePortals() {
    const colors = ["#2E5EAA", "#690808", "#008000", "#FFFF00", "#800080", "#FFA500", "#FFC0CB", "#808080", "#00FFFF", "#5F9EA0"];
    let availablePositions = Array.from({length: 98}, (_, i) => i + 2);

    for (let i = 0; i < 10; i++) {
        let pair = {};
        for (let j = 0; j < 2; j++) {
            let index = Math.floor(Math.random() * availablePositions.length);
            let position = availablePositions.splice(index, 1)[0];
            
            availablePositions = availablePositions.filter(p => Math.abs(p - position) > 1);

            if (j === 0) {
                pair.position1 = position;
            } else {
                pair.position2 = position;
            }
        }
        pair.color = colors[i];
        portalPairs.push(pair);
    }
}

function generateCells() {
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('boardCell', `cell-${i}`);
        const row = Math.ceil(i / 10);
        const col = i % 10 === 0 ? 10 : i % 10;
        cell.classList.add((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ? 'even' : 'odd');
        gameBoardContainer.appendChild(cell);

        const portal = portalPairs.find(p => p.position1 === i || p.position2 === i);
        if (portal) {
            cell.classList.add('portal');
            cell.style.backgroundColor = portal.color;
        }

        if (encounterPositions.has(i)) {
            cell.classList.add('encounter');
        }

        if (i === 1) {
            cell.appendChild(gamePlayer);
        }

        if (i === 100) {
            cell.classList.add('finish');
        }
    }
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function movePlayerAfterDiceRoll() {
    const roll = rollDice();
    let newPosition = playerCurrentPosition + roll;
    const maxPosition = 100;

    if (newPosition >= maxPosition) {
        newPosition = maxPosition;
        updatePlayerPosition(newPosition);
        setTimeout(() => {
            gameIsOver(true, gameTwo);
        }, 1000);
    } else {
        updatePlayerPosition(newPosition);
        playerCurrentPosition = newPosition;

        const portal = portalPairs.find(p => p.position1 === newPosition || p.position2 === newPosition);
        if (portal) {
            rollDiceButton.disabled = true;
            setTimeout(() => {
                newPosition = newPosition === portal.position1 ? portal.position2 : portal.position1;
                updatePlayerPosition(newPosition);
                playerCurrentPosition = newPosition;
                rollDiceButton.disabled = false;
            }, 750);
        } else if (encounterPositions.has(newPosition)) {
            gameQuestionPrompt.style.display = 'block';
            displayCurrentQuestion();
        }
    }
}

function updatePlayerPosition(newPosition) {
    const cellSize = gameBoardContainer.offsetWidth / 10;
    const row = Math.ceil(newPosition / 10);
    const col = newPosition % 10 === 0 ? 10 : newPosition % 10;

    const newLeft = Math.round((col - 1) * cellSize + (cellSize - gamePlayer.offsetWidth) / 2);
    const newTop = Math.round((row - 1) * cellSize + (cellSize - gamePlayer.offsetHeight) / 2);

    gamePlayer.style.left = `${newLeft}px`;
    gamePlayer.style.top = `${newTop}px`;
}

function resetPlayerPosition() {
    const firstCellLeft = 0;
    const firstCellTop = 0;

    gamePlayer.style.left = `${firstCellLeft}px`;
    gamePlayer.style.top = `${firstCellTop}px`;
}