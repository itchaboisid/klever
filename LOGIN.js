// ! Login Screen
const loginModal = document.querySelector('.loginModal');
const loginPanel = document.querySelector('.loginPanel');
const login = document.querySelector('#loginForm');
const loginContent = document.querySelector('#loginContent');

// ! Registration Screen
const registerContent = document.querySelector('#registerContent');
const register = document.querySelector('#registerForm');

// ! Login Fields
const userName = document.querySelector('#username');
const userPassword = document.querySelector('#password');
const form = document.querySelector('form');
const loginButton = document.querySelector('#loginButton');

// ! Notifications
const notificationMessage = document.querySelector('.notificationMessage');
const notificationStatus = document.querySelector('.notificationStatus');
const notificationContainer = document.querySelector('.notificationContainer');
const notificationIcon = document.querySelector('.notificationIcon');

// ! Notifications Array
const statusClasses = ['warning-status', 'success-status'];

function enableField() {
    fieldDisabled = false;
    handleFieldStateChange(true);
}

function disableField() {
    fieldDisabled = true;
    changeFieldAccessibility(false);
    displayNotification('disable-fields');
    setTimeout(() => {
        enableField();
        displayNotification('enable-fields');
    }, minutesLockedOut * 5000);
}

function lockdownField() {
    fieldDisabled = true;
    handleFieldStateChange(false);
    displayNotification('lock-fields');
}

function handleFieldStateChange(enable) {
    changeFieldAccessibility(enable);
}

function changeFieldAccessibility(enable) {
    try {
        if (typeof enable === 'boolean') {
            const isDisabled = !enable;
            userName.disabled = isDisabled;
            userPassword.disabled = isDisabled;
            loginButton.disabled = isDisabled;
        }
        else {
            return console.log('Invalid Parameter: Expected a boolean, got ' + typeof enable);
        }
    }
    catch (e) {
        throw new error(e.message);
    }
}

function updateFieldAccessibility(action) {
    switch (action) {
        case 'enable':
            return enableField();
        case 'disable':
            return disableField();
        case 'lockdown':
            return lockdownField();
        default:
            return console.log(`Unknown action "${action}"`);
    }
}

function userLoginTrigger() {
    if (!checkIfUserHasMissingRequirements()) {
        checkIfUserHasCorrectDetails();
    }
}

function userLoginHandler(valid, isMissingRequirements) {
    if (typeof valid === 'boolean' && typeof isMissingRequirements === 'boolean') {
            if (valid === true && isMissingRequirements === false) {
                userLoginValidator('valid');
            } else if (valid === false && isMissingRequirements === true) {
                userLoginValidator('missing-req');
            } else {
                userLoginValidator('invalid');
            }
        }
        else {
            return console.log('Invalid Parameter: Expected both to be boolean, got ' + typeof valid + ' and ' + typeof isMissingRequirements);
        }
}

const notificationMap = {
    'missing-requirements': {
        statusId: '#loginNotificationStatus',
        iconId: '#loginNotificationIcon',
        messageId: '#loginNotificationMessage',
        status: 'warning',
        iconType: 'warning',
        message: 'Please fill out the required fields',
        animClass: 'animate__wobble'
    },
    'invalid-login': {
        statusId: '#loginNotificationStatus',
        iconId: '#loginNotificationIcon',
        messageId: '#loginNotificationMessage',
        status: 'warning',
        iconType: 'warning',
        message: 'Incorrect username or password',
        animClass: 'animate__wobble'
    },
    'disable-fields': () => ({
        statusId: '#loginNotificationStatus',
        iconId: '#loginNotificationIcon',
        messageId: '#loginNotificationMessage',
        status: 'warning',
        iconType: 'lock-closed',
        message: `Incorrect, login disabled for ${minutesLockedOut} min(s)`,
        animClass: 'animate__wobble'
    }),
    'enable-fields': {
        statusId: '#loginNotificationStatus',
        iconId: '#loginNotificationIcon',
        messageId: '#loginNotificationMessage',
        status: 'success',
        iconType: 'information-circle-sharp',
        message: 'You may now enter your details again',
        animClass: 'animate__tada'
    },
    'lock-fields': {
        statusId: '#loginNotificationStatus',
        iconId: '#loginNotificationIcon',
        messageId: '#loginNotificationMessage',
        status: 'warning',
        iconType: 'lock-closed',
        message: 'Incorrect, login disabled completely',
        animClass: 'animate__bounce'
    },
};

const setNotificationStatus = (element, notificationIcon, status, iconName) => {
    if (element instanceof Element && notificationIcon instanceof Element && typeof status === 'string' && typeof iconName === 'string') {
        statusClasses.forEach(statusClass => {
            element.classList.remove(statusClass);
        });
        element.style.visibility = 'visible';
        element.style.display = 'flex';
        element.classList.add(`${status}-status`);
        notificationIcon.setAttribute('name', iconName);
    }
    else {
        throw new error(e.message);
    }
}

const showNotificationMessage = (element, msgContainer, msg) => {
    if (element instanceof Element && msgContainer instanceof Element && typeof msg === 'string') {
        element.addEventListener('mouseover', () => {
            msgContainer.textContent = msg;
        });
        element.addEventListener('mouseleave', () => {
            msgContainer.innerHTML = '';
        });
    }
    else {
        throw new error(e.message);
    }
}

function checkUserFailedLoginAttempts() {
    if (userFailedLoginAttempts > 2 && userFailedLoginAttempts < 5) {
        minutesLockedOut++;
        updateFieldAccessibility('disable');
    } else if (userFailedLoginAttempts >= 5) {
        updateFieldAccessibility('lockdown');
    }
}

function setNotificationProperties(notification, icon, container, status, iconType, message, animClass) {
    try {
        if (notification instanceof Element && icon instanceof Element && container instanceof Element && typeof status === 'string' && typeof iconType === 'string' && typeof message === 'string' && typeof animClass === 'string') {
            setNotificationStatus(notification, icon, status, iconType)
            showNotificationMessage(notification, container, message);
            applyAnimationOnElement(notification, animClass);
        }
        else {
            console.log('Invalid parameters:');
        }
    }
    catch (e) {
        throw new error(e.message);
    }
}

const displayNotificationHandler = (name) => {
    if (typeof name === 'string') {
        const notification = notificationMap[name];
        if (notification) {
            const { statusId, iconId, messageId, status, iconType, message, animClass } = notification;
            return setNotificationProperties(document.querySelector(statusId), document.querySelector(iconId), document.querySelector(messageId), status, iconType, message, animClass);
        } else {
            console.log(`Unknown notification name: ${name}`);
        }
    } else {
        throw new Error('Notification name must be a string');
    }
}
function displayNotification(name) {
    let notification = notificationMap[name];
    if (typeof notification === 'function') {
        notification = notification();
    }
    if (notification) {
        const { statusId, iconId, messageId, status, iconType, message, animClass } = notification;
        return setNotificationProperties(document.querySelector(statusId), document.querySelector(iconId), document.querySelector(messageId), status, iconType, message, animClass);
    } else {
        console.log(`Unknown notification name: ${name}`);
    }
}

function clearLoginDetails() {
    userFailedLoginAttempts = 0;
    minutesLockedOut = 0;
    userName.value = '';
    userPassword.value = '';
}

function userLoginPanel() {
    login.style.display = 'block';
    register.style.display = 'none';
    applySwitchingAnimation(loginContent, registerContent, 'animate__fadeInLeft', 'animate__fadeInRight');
}

function userRegistrationPanel() {
    login.style.display = 'none';
    register.style.display = 'block';
    applySwitchingAnimation(loginContent, registerContent, 'animate__fadeInLeft', 'animate__fadeInRight');
}

function showPassword() {
    let showPassword = document.querySelector(".showPasswordIcon");
    if (!fieldDisabled) {
        userPassword.type = userPassword.type === "password" ? "text" : "password";
        showPassword.name = userPassword.type === "text" ? "eye" : "eye-off";
    }
}

function checkIfUserHasMissingRequirements() {
    try {
        if (userName.value === "" || userPassword.value === "") {
            userLoginHandler(false, true);
            return true; // Explicitly return true when requirements are missing
        }
        return false; // Explicitly return false otherwise
    }
    catch (e) {
        throw new error(e.message);
    }
}

function checkIfUserHasCorrectDetails() {
    try {
        if (userName.value === user.name && userPassword.value === user.password) {
            return userLoginHandler(true, false);
        }
        else {
            return userLoginHandler(false, false);
        }
    }
    catch (e) {
        throw new error(e.message);
    }
}

function userLoginValidator(login) {
    switch (login) {
        case 'missing-req':
            displayNotification('missing-requirements');
            break;
        case 'invalid':
            userFailedLoginAttempts++;
            displayNotification('invalid-login');
            checkUserFailedLoginAttempts();
            break;
        case 'valid':
            notificationStatus.style.visibility = 'hidden';
            loginPage.style.display = 'none';
            landingPage.style.display = 'flex';
            selectStartButtonOnPageLoad();
            break;
        default:
            return console.log(`Unknown login status: ${login}`);
    }
}