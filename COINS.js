const coinsElement = document.querySelector(".coins");
const coinIcon = document.querySelector(".coinIcon");
let userCoins = parseInt(coinsElement.textContent.replace(/,/g, ''));

function updateCoins(amount) {
    try { 
        const coinsElements = document.querySelectorAll(".coins");
        if (amount < 0) {
            coinsElements.forEach(coinsElement => {
                applyAnimationOnElement(coinsElement, 'animate__flash');
            });
        }
        else {
            coinsElements.forEach(coinsElement => {
                applyAnimationOnElement(coinIcon, 'animate__flip');
                applyAnimationOnElement(coinsElement, 'animate__heartBeat');
            });
        }
        userCoins += amount;
        coinsElements.forEach(coinsElement => {
            coinsElement.textContent = userCoins.toLocaleString();
        });
    }
    catch (e) {
        console.log('Error updating coins: ' + e.message);
        throw new Error('Error updating coins');
    }
}

function userHasNoCoins() {
    if (userCoins <= 0) {
        return true;
    }
    return false;
}