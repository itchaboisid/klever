const paymentPage = document.querySelector('#paymentPage');
const paymentModal = document.querySelector('#paymentModal');
const paymentPanel = document.querySelector('#paymentPanel');
const paymentStatus = document.querySelector('#paymentStatus');
const paymentState = document.querySelector('#paymentState');
const selectedProductHeader = document.querySelector('#selectedProductHeader');
const selectedProduct = document.querySelector('#selectedProduct');
const bundleContent = document.querySelector('#bundleContent');
const proceedButtonPanel = document.querySelector('#proceedButtonPanel');
const proceedButton = document.querySelector('#proceedButton');
const coinsBundleGrid = document.querySelector('#coinsBundleGrid');

// BUNDLES
const bundles = document.querySelectorAll('.coinsBundle');
const selectedProductImg = document.getElementById('bundleImg');
const selectedProductInfo = document.getElementById('bundleInfo');
const selectedProductPrice = document.getElementById('bundlePrice');

// Shop Tabs
const storeTab = document.querySelector('#storeTab');
const payTab = document.querySelector('#payTab');
const completeTab = document.querySelector('#completeTab');
const prevTab = document.querySelector('#prevTab');

// Shop Parts
const shopPanel = document.querySelector('#shopPanel');
const shopPay = document.querySelector('#shopPay');
const shopThanks = document.querySelector('#shopThanks');
const otherPaymentMethods = document.querySelector('#otherPaymentMethods');

// Keys
const adminKeyField = document.querySelector('#adminKey');
const creditKeyField = document.querySelector('#creditKey');
let ADMIN_KEYS = ['Admin', 'Admin2', 'Admin3', 'Admin4', 'Admin5'];
let CREDIT_KEYS = ['Credit', 'Credit2', 'Credit3', 'Credit4', 'Credit5'];
let ADMIN_KEYS_MATCHED = false;
let CREDIT_KEYS_MATCHED = false;

function closeShop() {
    modePage.style.position = 'relative';
    paymentPage.style.display = 'none';
    resetShop();
}

function resetShop() {
    shopPanel.style.display = 'flex';
    coinsBundleGrid.style.display = 'grid';
    paymentPanel.style.flex = '0 0 30%';
    paymentPanel.style.marginRight = '1rem';
    shopPay.style.display = 'none';
    shopThanks.style.display = 'none';
    otherPaymentMethods.style.display = 'none';
    paymentState.style.display = 'block';
    paymentStatus.style.display = 'none';
    proceedButtonPanel.style.display = 'none';
}

function buyCoins() {
    modePage.style.position = 'absolute';
    paymentPage.style.display = 'flex';
    shopTab(storeTab);
}

document.addEventListener('DOMContentLoaded', function() {
    const bundles = document.querySelectorAll('.coinsBundle');
    const selectedProductImg = document.getElementById('bundleImg');
    const selectedProductInfo = document.getElementById('bundleInfo');
    const selectedProductPrice = document.getElementById('bundlePrice');

    bundles.forEach(bundle => {
        bundle.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const infoText = this.querySelector('.bundleInfo').textContent;
            const priceText = this.querySelector('.bundlePrice').textContent;

            selectedProductImg.src = imgSrc;
            selectedProductInfo.textContent = infoText;
            selectedProductPrice.textContent = priceText;

            paymentState.style.display = 'none';
            paymentStatus.style.display = 'flex';
            proceedButtonPanel.style.display = 'flex';
        });
    });
});

function shopTab(tab) {
    const allTabs = [storeTab, payTab, completeTab];
    allTabs.forEach(tab => tab.classList.remove('active-tab'));

    switch (tab) {
        case storeTab:
        case payTab:
        case completeTab:
            tab.classList.add('active-tab');
            tab === payTab ? prevTab.style.display = 'flex' : prevTab.style.display = 'none';
            break;
        default:
            throw new Error('Invalid tab: ' + tab);
    }
}

function previousShopTab() {
    resetShop();
    buyCoins();
}

function checkout() {
    setupPaymentPage();
}

function setupPaymentPage() {
    shopTab(payTab);
    shopPanel.style.display = 'none';
    paymentPanel.style.flex = '1';
    shopPay.style.display = 'flex';
    coinsBundleGrid.style.display = 'none';
    otherPaymentMethods.style.display = 'flex';
}

function thankYouPage() {
    shopTab(completeTab);
    shopThanks.style.display = 'flex';
    shopPanel.style.display = 'none';
    paymentPanel.style.flex = '1';
    paymentPanel.style.marginRight = '0';
    shopPay.style.display = 'none';
    coinsBundleGrid.style.display = 'none';
    otherPaymentMethods.style.display = 'none';
}

function confirmPurchase() {
    checkKeys();
    if (ADMIN_KEYS_MATCHED && CREDIT_KEYS_MATCHED) {
        let coinAmountText = selectedProductInfo.textContent;
        let coinAmount = parseInt(coinAmountText.replace(/[^0-9]/g, ''), 10);
        shopTab(completeTab);
        updateCoins(coinAmount);
        thankYouPage();
    }
}

function checkKeys() {
    try {
        let adminKey = adminKeyField.value.toLowerCase();
        let creditKey = creditKeyField.value.toLowerCase();
        ADMIN_KEYS_MATCHED = ADMIN_KEYS.map(key => key.toLowerCase()).includes(adminKey);
        CREDIT_KEYS_MATCHED = CREDIT_KEYS.map(key => key.toLowerCase()).includes(creditKey);
    }
    catch (e) {
        console.error('Keys check failed:', e.message);
        throw new Error('Keys check failed');
    }
}