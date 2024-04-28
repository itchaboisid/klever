const dialogueContainer = [
    { // Intro
        dialogue: "Hello, friend! You have excellent timing! I required assistance with considering the issues facing my people and potential answers, let's go forward. Since he is the closest to our location, the mayor is our first stop",
        backgroundImage: 'url(../assets/images/scenes/intro.png)'
    },
    { // Scene 1
        dialogue: "I'm so glad you're here. How are things going for you guys? We were struck. A strong earthquake caused panic among the populace, which led to a stampede, while several kept their composure and knew what they were doing. And they're probably safe now",
        backgroundImage: 'url(../assets/images/scenes/1.png)'
    },
    {
        dialogue: "When an earthquake occurs, they know what to do. For the time being, everything is good around here. Go see who's working in the warehouse and get back to me",
        backgroundImage: 'url(../assets/images/scenes/1.png)'
    },
    { // Scene two
        dialogue: "Due to the factory's proximity to water, following the earthquake, there was a flash flood, which made the situation worse, swiftly. Thanks to the instructors, a lot of stuff was damaged but no one was hurt. Thanks to our preparations for flash floods, we were able to limit the number of casualties",
        backgroundImage: 'url(../assets/images/scenes/2.png)'
    },
    {
        dialogue: "Here are some of the things we did: we immediately fled to the higher floors in order to ground ourselves safely; we next steered clear of the floodwaters to avoid any potential hazards; and last, we left right away",
        backgroundImage: 'url(../assets/images/scenes/2.png)'
    },
    { // Scene three
        dialogue: "My family told me to move, and I should have listened to them. Right now, I've lost everything because the landslides that caused the collapse of the soil beneath my house and I am to blame for this; the soils are near a river, and the surface is rough",
        backgroundImage: 'url(../assets/images/scenes/3.png)'
    },
    {
        dialogue: "Let this serve as a reminder to those who may be intending to build a house in similar conditions to mine",
        backgroundImage: 'url(../assets/images/scenes/3.png)'
    },
    { // Scene four
        dialogue: "That's all the information from Brian's logs on disaster awareness, okay class. I'm going to now go over what you should do about the catastrophes that are displayed in the log",
        backgroundImage: 'url(../assets/images/scenes/4.png)'
    },
    {
        dialogue: "In the event of an earthquake, you should seek cover, avoid windows and power lines, and, if at all possible, stay outside in an open area",
        backgroundImage: 'url(../assets/images/scenes/4.png)'
    },
    {
        dialogue: "The second is a flash flood. In a flash flood, you should evacuate to the highest elevation you can find nearby and stay away from the water to avoid potential hazards",
        backgroundImage: 'url(../assets/images/scenes/4.png)'
    },
    {
        dialogue: "The third and final step is to evaluate the area where you wish to construct your home because there may be hidden dangers there that need to be carefully examined in order to stay safe",
        backgroundImage: 'url(../assets/images/scenes/4.png)'
    },
]

function showDialogue(page) {
    try {
        if (typeof page === 'number') {
            // If user suddenly goes back to the previous dialogue while the current one is still updating, it won't mix with the current one.
            if (dialogueIntervalId) {
                clearInterval(dialogueIntervalId);
                dialogueElement.textContent = '';
            }

            if (page > 0) {
                dialogueIndex++;
            } else {
                dialogueIndex--;
            }

            handleShownDialogue();
        } else {
            return console.log('Invalid Parameter: Expected parameter to be a number, got ' + typeof page);
        }
    } catch (e) {
        throw new error(e.message);
    }
}

function displayDialogue() {
    const currentDialogue = dialogueContainer[dialogueIndex];
    const words = currentDialogue?.dialogue.split(' ');
    let wordIndex = 0;
    let wordsPerInterval = 5;
    dialogueElement.textContent = '';
    document.body.style.backgroundImage = currentDialogue.backgroundImage;

    if (dialogueIntervalId) {
        clearInterval(dialogueIntervalId);
    }

    dialogueIntervalId = setInterval(() => {
        if (wordIndex < words.length) {
            const wordGroupSpan = document.createElement('span');
            const wordGroup = words.slice(wordIndex, wordIndex + wordsPerInterval).join(' ') + ' ';
            wordGroupSpan.textContent = wordGroup;
            applyAnimationOnElement(wordGroupSpan, 'animate__fadeIn');
            dialogueElement.appendChild(wordGroupSpan);
            wordIndex += wordsPerInterval;
        } else {
            clearInterval(dialogueIntervalId);
        }
    }, 250);
}

function finalDialogue() {
    storyDialogueScreen.style.display = 'none';
    loginPage.style.display = 'block';
    modePage.style.display = 'none';
    document.body.style.backgroundImage = 'none';
    dialogueIndex = 0;
    playLoginAnimation();
}

function handleShownDialogue() {
    if (dialogueIndex >= 0) {
        if (dialogueIndex >= dialogueContainer.length) {
            finalDialogue();
        } else {
            displayDialogue();
        }
    } else {
        return dialogueIndex = 0;
    }
}