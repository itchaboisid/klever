// ! Body
const bg = document.querySelector('#mainBody');
const background = document.querySelector('body');

// ! Pages
const landingPage = document.querySelector('#landingPage');
const nav = document.querySelector('#nav');
const loginPage = document.querySelector('#loginPage');

// ! Content Unavailable Page
const contentUnavailablePage = document.querySelector('#contentUnavailablePage');

// ! Loading Screen
const loadingScreen = document.querySelector('#loadingScreen');
const loadingText = document.querySelector('#loadingText');

// ! Intro Screen
const mainLoadingScreen = document.querySelector('#main-loading-screen');
const logoLoadingScreen = document.querySelector('#klever-loading-screen');

// ! Dialogue
const dialogueElement = document.querySelector('.dialogue');
let dialogueIndex = 0;
let dialogueIntervalId = null;

// ! Menu Buttons
const mainMenuStartButton = document.querySelector('#mainMenuStartButton');
const menuButtons = document.querySelectorAll('.menuButtons');

// ! Variables
let fieldDisabled = false;
let isMissingRequiredFields;
let fieldCheckInterval;
let userFailedLoginAttempts = 0;
let minutesLockedOut = 0;
let currentActiveGame = undefined;

// ! Login Details
const user = {
    "name": 'admin',
    "password": '123'
}

window.addEventListener('load', () => {
    LoadingScreen.hide();
    playLoadingScreenAnimation();
    handleShownDialogue();
    switchThemes();
    applyAnimationOnElement(nav, 'animate__fadeInDownBig');
});

const LoadingScreen = {
    show: (text = '') => {
        loadingScreen.style.display = 'block';
        if (text) {
            loadingText.textContent = text;
        }
    },
    hide: () => {
        loadingScreen.style.display = 'none';
    }
};

function contentUnavailable(currentPage) {
    nav.style.display = 'none';
    currentPage.style.display = 'none';
    contentUnavailablePage.style.display = 'flex';
}

function switchThemes() {
    bg.style.backgroundImage = 'var(--orange-gradient)';
    const themeSwitcher = document.querySelector('#theme');
    themeSwitcher.checked = false;
    const themedContents = document.querySelectorAll('.theme-content');

    themeSwitcher.addEventListener('change', function() {
        themedContents.forEach((themedContent) => {
            if (this.checked) {
                themedContent.classList.add('dark-mode');
                themedContent.classList.remove('light-mode');
                bg.style.backgroundImage = 'var(--blue-gradient)';
            } else {
                themedContent.classList.add('light-mode');
                themedContent.classList.remove('dark-mode');
                bg.style.backgroundImage = 'var(--orange-gradient)';
            }
        });
    });
}

function playLoadingScreenAnimation() {
    if (mainLoadingScreen && logoLoadingScreen) {
        mainLoadingScreen.style.display = 'flex';
        storyDialogueScreen.style.display = 'block';
        mainLoadingScreen.classList.add('mainLoaded');
        logoLoadingScreen.classList.add('logoLoaded');

        const mainAnimationEndHandler = (event) => {
            if (event.animationName === 'pageLoad') {
                mainLoadingScreen.style.display = 'none';
                logoLoadingScreen.style.display = 'none';
            }
            mainLoadingScreen.removeEventListener('animationend', mainAnimationEndHandler);
        };

        mainLoadingScreen.addEventListener('animationend', mainAnimationEndHandler);
    }
}

function playLoginAnimation() {
    if (window.matchMedia('(max-width: 602px)').matches) {
        addLoginPanelAnimationMobile(loginModal, loginPanel, 'animate__fadeIn', 'animate__backInUp');
    }
    else {
        applyAnimationOnElement(loginModal, 'animate__backInUp');
    }
}

function selectStartButtonOnPageLoad() {
    mainMenuStartButton.focus();
    menuButtons.forEach((button) => {
        button.addEventListener('mouseover', () => {
            mainMenuStartButton.blur();
        });
    });
}

function applyAnimationOnElement(element, animationName) {
    if (element instanceof Element && typeof animationName === 'string') {
        try {
            element.classList.add('animate__animated', animationName);
            const animationEndHandler = () => {
                element.classList.remove('animate__animated', animationName);
                element.removeEventListener('animationend', animationEndHandler);
            };
            element.addEventListener('animationend', animationEndHandler);
        } catch (error) {
            throw new Error("Invalid parameters: 'element' must be a DOM element and 'animationName' must be a string.");
        }
    } else {
        throw new Error("Invalid parameters: 'element' must be a DOM element and 'animationName' must be a string.");
    }
}

function applySwitchingAnimation(primaryElement, secondaryElement, primaryAnimation, secondaryAnimation) {
    try {
        if (primaryElement instanceof Element && secondaryElement instanceof Element && typeof primaryAnimation === 'string' && typeof secondaryAnimation === 'string') {
            primaryElement.classList.add('animate__animated', primaryAnimation);
            const primaryAnimationEndHandler = () => {
                primaryElement.classList.remove('animate__animated', primaryAnimation);
                primaryElement.removeEventListener('animationend', primaryAnimationEndHandler);
            };
            
            secondaryElement.classList.add('animate__animated', secondaryAnimation);
            const secondaryAnimationEndHandler = () => {
                secondaryElement.classList.remove('animate__animated', secondaryAnimation);
                secondaryElement.removeEventListener('animationend', secondaryAnimationEndHandler);
            };
            
            primaryElement.addEventListener('animationend', primaryAnimationEndHandler);
            secondaryElement.addEventListener('animationend', secondaryAnimationEndHandler);
            console.log('animation applied');
        }
        else {
            console.log('Invalid parameters : elements must be a DOM element and animations names must be strings.');
        }
    } 
    catch (e) {
        console.log(e.message, e.error);
    }
}

function backToMainMenu() {
    landingPage.style.display = 'flex';
    contentUnavailablePage.style.display = 'none';
    modePage.style.display = 'none';
    nav.style.display = 'none';
}

function logOut() {
    if (currentActiveGame) {
        closeGame(currentActiveGame);
        loginPage.style.display = 'block';
        nav.style.display = 'none';
        modePage.style.display = 'none';
        clearLoginDetails();
        playLoginAnimation();
        currentActiveGame = undefined; // Reset the current active game
    }
    else {
        loginPage.style.display = 'block';
        nav.style.display = 'none';
        landingPage.style.display = 'none';
        clearLoginDetails();
        playLoginAnimation();
    }
}

function playGame() {
    landingPage.style.display = 'none';
    LoadingScreen.show('Redirecting..');
    setTimeout(() => {
        LoadingScreen.hide();
        nav.style.display = 'flex';
        gameModeSelection();
    }, 1000);
}