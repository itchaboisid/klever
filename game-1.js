const questionElement = document.querySelector("#questionText");
const answerButtons = document.querySelectorAll(".responseOptionButton");
const answerKeys = document.querySelectorAll(".answerKey");
const questionNumber = document.querySelector('#questionNumber');
const maxQuestions = 10;
let questionsAnswered = 0;
let currentQuestionIndex = 0;
let currentQuestionNumber = 1;
let quesNum = 1;

const questions = [
    {
        question: "Which of the following is a natural disaster in the Philippines?",
        answers: ["Volcanic Eruption", "Earthquake", "Flood", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "What should you do during a typhoon warning?",
        answers: ["Don't panic", "Prepare emergency kit", "Evacuate immediately", "Stay indoors"],
        correctAnswer: "Prepare emergency kit"
    },
    {
        question: "Which disaster is characterized by a sudden shaking of the ground?",
        answers: ["Tsunami", "Typhoon", "Flood", "Earthquake"],
        correctAnswer: "Earthquake"
    },
    {
        question: "What are you supposed to do during an earthquake?",
        answers: ["Drive during an earthquake", "Go near any live wires or debris", "Be sure to stay in a secure location until you are told it’s safe", "Return home"],
        correctAnswer: "Be sure to stay in a secure location until you are told it’s safe"
    },
    {
        question: "What are the essentials in an emergency kit?",
        answers: ["Cellphone", "TV", "Food", "Mouse"],
        correctAnswer: "Food"
    },
    {
        question: "Which of the following is a safe location to evacuate to during a tsunami warning?",
        answers: ["Beach", "Low-lying areas", "Elevated ground or designated evacuation centers", "Grocery Store"],
        correctAnswer: "Elevated ground or designated evacuation centers"
    },
    {
        question: "What causes flooding?",
        answers: ["Heavy rainfall", "Strong winds", "Tornado", "Earthquakes"],
        correctAnswer: "Heavy rainfall"
    },
    {
        question: "Which disaster is characterized by strong winds and heavy rainfall?",
        answers: ["Earthquake", "Typhoon", "Volcano eruption", "None of the above"],
        correctAnswer: "Typhoon"
    },
    {
        question: "Which government agency is responsible for issuing typhoon warnings in the Philippines?",
        answers: ["PAGASA", "DSWD", "DOH", "DENR"],
        correctAnswer: "PAGASA"
    },
    {
        question: "Which typhoon caused the highest number of damage in the Philippines?",
        answers: ["Yolanda (Haiyan)", "Ondoy (Ketsana)", "Rolly (Goni)", "Pepeng (Parma)"],
        correctAnswer: "Yolanda (Haiyan)"
    }
];

function displayQuestion() {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionNumber.textContent = quesNum;
    currentQuestion.answers.forEach((answer, index) => {
        answerKeys[index].textContent = answer;
    });
}

function moveToNextQuestion() {
    questionsAnswered++;
    quesNum++;
    if (questionsAnswered < maxQuestions) {
        displayQuestion();
    } else {
        gameIsOver(true, gameOne);
    }
}

function userHasNoCoins() {
    if (userCoins <= 0) {
        return true;
    }
    return false;
}

answerButtons.forEach(button => {
    button.addEventListener("click", checkAnswer);
    button.addEventListener("mouseover", () => {
        applyAnimationOnElement(button, 'animate__bounce');
    });
});

function checkAnswer(event) {
    const buttonElement = event.target.closest('.responseOptionButton');
    const answerKeyElement = buttonElement.querySelector('.answerKey');
    const selectedAnswer = answerKeyElement.textContent;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
        updateCoins(20);
    } else {
        if (userCoins - 10 >= 0) {
            updateCoins(-10);
        }
    }

    if (!userHasNoCoins()) {
        moveToNextQuestion();
    } else {
        gameIsOver(true, gameOne);
    }

    timerHandler('reset');
}