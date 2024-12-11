import products from "./products.mjs";

// ------------------------------------------------
// ------------ HTML ELEMENT ---------------------
// ------------------------------------------------

const productsListDiv = document.querySelector('#products-list');

const categoryFilterRadios = document.querySelectorAll('[name="categoryFilter"]');
const priceRangeSlider = document.querySelector('#priceRange');
const currentRangeValue = document.querySelector('#currentRangeValue'); // priset som skrivs ut vid slidern

/*
let filteredProducts = [...products];
let filteredProductsInPriceRange = [];
*/

// ------------------------------------------------
// ------------ ÖPPNA VARUKORG -------------
// ------------------------------------------------

const cartBtn = document.getElementById('cartBtn');

cartBtn.addEventListener('click', () => {
  // toggla om varukorgen visas
  cart.classList.toggle('hidden');
});


// ------------------------------------------------
// ------------ VISA PRODUKTER I VARUKORG -------------
// ------------------------------------------------

// ------------ ÖKA ANTAL -------------
function increaseProductCount(e) {
  const productId = Number(e.target.id.replace('increase-', ''));
  // console.log('clicked on button with id', productId);
  // Hitta produkt i array
  const foundProductIndex = products.findIndex(product => product.id === productId);
  // console.log('found product at index', foundProductIndex);

  // Om produkten inte finns, visa felmeddelande
  // och pausa resten av koden
  if (foundProductIndex === -1) {
    console.error('Det finns ingen sådan produkt i produktlistan! Kolla att id:t är rätt.');
    return;
  }

  // Öka antal med +1
  products[foundProductIndex].amount += 1;

  printProductsList(products);
  updateAndPrintCart('cart', { title: 'Varukorgssammanställning'});
}

// ------------ MINSKA ANTAL -------------
function decreaseProductCount(e) {
  const productId = Number(e.target.id.replace('decrease-', ''));
  // console.log('clicked on button with id', productId);
  // Hitta produkt i array
  const foundProductIndex = products.findIndex(product => product.id === productId);
  // console.log('found product at index', foundProductIndex);

  // Om produkten inte finns, visa felmeddelande
  // och pausa resten av koden
  if (foundProductIndex === -1) {
    console.error('Det finns ingen sådan produkt i produktlistan! Kolla att id:t är rätt.');
    return;
  }

  // Minska antal med -1
  products[foundProductIndex].amount -= 1;

  printProductsList(products);
  updateAndPrintCart('cart', { title: 'Varukorgssammanställning'});
}

// ------------ SKRIVA UT PRODUKTER I KORGEN -------------


function updateAndPrintCart(outputContainerId, options = {}) {
  const {
    title = 'Varukorgssammanställning',
    titleSummary = 'I din varukorg just nu:',
    orderInfo = false
  } = options;

  const outputContainer = document.getElementById(outputContainerId);

  let shippingMessage = '';

  /*
  ATT GÖRA
  x en container i html (id/html-element) där produkterna skrivs ut
  x produkter som har minst 1 i antal: filter (for-loop)
  x loop för att skriva ut produkterna
  x totalsumma
  x om det inte finns några produkter så ska det skrivas ut att varukorgen är tom
  */
  
  if (!outputContainer) {
    console.error('Output container not found!');
    return;
  }

  let totalSum = 0;

  // Räkna ut antalet produkter i varukorgen
  const purchasedProducts = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.amount > 0) {
      purchasedProducts.push(product);
      // räkna ut totalsumman för produkten
      product.totalPrice = product.amount * product.price;
    }
  }

  if (purchasedProducts.length === 0) {
    return;
  }

  // Räkna ut total summa för köpet
  let shippingCost = 0;
  totalSum = purchasedProducts.reduce((total, product) => {
    return total + product.amount * product.price;
  }, shippingCost);

  /* frakt
  x kolla antalet munkar i varukorg
  x om det är mer än 15 > return
  x om det är mindre än 15 > 25 kr + 10% av totalsumma
  */


  // Räkna ut antal produkter i cart 
  const shippingAmount = purchasedProducts.reduce((total, product) => {
    return total + product.amount;
  }, 0);
  console.log(`Antal i cart: ${shippingAmount}`);

  // Räkna ut fraktkostnaden om mindre än 15 produkter
  const calculateTotalShipping = (totalSum) => totalSum * 0.10 + 25;
  let totalShipping = shippingAmount < 15 ? calculateTotalShipping(totalSum) : 0;


  if (totalShipping === 0) {
   shippingMessage += `<i>Gratis frakt!</i>`;
  }

  // Räkna ut totalsumman
  let totalOrderSum = totalSum + totalShipping;


  // ------------------------------------------------
  // ------------ RABATTER -------------
  // ------------------------------------------------

  let mondayMessage = '';

  function mondayDiscount() {
    /* Måndagsrabatt
    x är det måndag?
    x om det inte är måndag > return
    x är det mellan 03:00 och 10:00? (&& och ===)
    x om det inte är det > return
    - annars > 10 % rabatt på beställningssumman (visa i sammanfattningen)
    */

    const today = new Date(); 
    const isMonday = today.getDay() === 1;
    const isBetween3and10 = today.getHours() >= 3 && today.getHours() < 10;

    if (isMonday && isBetween3and10) {
      const discount = totalOrderSum * 0.10;
      totalOrderSum -= discount;
      mondayMessage += `<i>Måndagsrabatt: 10 % på hela beställningen!</i>`;
    }
  }
  mondayDiscount();

  let bulkMessage = '';

  function bulkDiscount() {
    /* mängdrabatt (filter/find)
     x kolla antalet munkar för varje produkt
     x om värdet är mindre än 10 > return
     x om värdet 'antal munkar' för ett visst namn/produkt är mer än tio > 10% rabatt på summan av den munken
    */
   purchasedProducts.forEach(product => {
    if (product.amount > 9) {
      const discount = product.totalPrice * 0.10;
      console.log(`Mängdrabatt för ${product.name}: - ${discount} kr`);
      product.totalPrice -= discount;
      totalOrderSum -= discount;
      totalSum -= discount;
      bulkMessage += `<i>Mängdrabatt för ${product.name}: - ${discount} kr</i><br>`;
    }
   });
  }
  bulkDiscount(purchasedProducts);

  disableInvoice(totalSum);


  // Kontrollera vilka produkter vi har i consolen
  console.log('purchased', purchasedProducts);

  let outputHtml = `
    <h2>${title}</h2>
    <i>${titleSummary}</i>
  `;

  // Skriva ut produkter
  purchasedProducts.forEach(product => {
    outputHtml += `
      <div class="cart-item">
        <div class="cart-name">
          <img src="${product.img.url}" alt="${product.img.alt}">
          <h3 class>${product.name}</h3> 
        </div>
        <div class="cart-info">
          <span class="product-description">${product.description}</span>
          <div class="cart-amount-price">
            <span>${product.amount} st</span>
            <span class="product-price">${product.totalPrice.toFixed(2)} kr</span>
          </div>
        </div>
      </div>
    `;
  });

  // Skriva ut totalsumma och frakt i cart
  outputHtml += `
    <div class="cart-total">
      <span>${mondayMessage}</span>
      <span>${bulkMessage}</span>
      <br>
      <span>Pris: ${totalSum.toFixed(2)} kr </span>
      <span>Frakt: ${totalShipping.toFixed(2)} kr <span>${shippingMessage}</span></span>
      <span class="total-order-sum">Totalt: ${totalOrderSum.toFixed(2)} kr</span>
    </div>
  `;

  let deliveryTime = '';

  function estDelivery() {
    const now = new Date();

    // Lägga till 30 minuter 
    const futureTime = new Date(now.getTime() + 30 * 60 * 1000);

    // Formattera tiden
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedTime = futureTime.toLocaleTimeString(undefined, options);

    deliveryTime = formattedTime;
  }

  if (orderInfo) {
    estDelivery();
    outputHtml += `
    <div class="order-info">
    <span>Leverans sker till din adress om ca 30 minuter. <br>
    Vi räknar med att vara hos dig runt klockan ${deliveryTime}.</span>
    </div>
    `;    
  }
  outputContainer.innerHTML = outputHtml;
}

// ------------------------------------------------
// ------------ SNEAKY HELG-ÖKNING ------------
// ------------------------------------------------

function weekendRaise(products) {
  const today = new Date(); 
  
  if (today.getDay() == 2 || today.getDay() == 3 || today.getDay() == 4) { // om det inte är helg
    return
  } else if (today.getDay() == 5 && today.getHours() <= 15) { // om det är fredag innan kl 15
    return
  } else if (today.getDay() == 1 && today.getHours() >= 3) { // om det är måndag efter kl 03
    return
  } else {products.forEach(product => { // 15% extra pris på produkterna
      const raise = product.price * 0.15;
      /// console.log(`Helghöjning ${product.name}: +${raise} kr`);
      product.price += raise;
    });
  }
}
weekendRaise(products);


// ------------------------------------------------
// ------------ SKRIVA UT RATING AV PRODUKTER ------------
// ------------------------------------------------
function getRatingHtml(rating) {
  // Räkna ut hur många hela stjärnor
  const fullStars = Math.floor(rating);
  // Kolla om det finns en halv stjärna
  const hasHalfStar = rating % 1 !== 0;
  // Räkna ut tomma stjärnor
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let html = '';

  // Lägger till hela stjärnor
  for (let i = 0; i < fullStars; i++) {
    html += `
    <span class="material-icons">
      star
    </span>`;
  }

  // Lägger till ev halva stjärnor
  if (hasHalfStar) {
    html += `
    <span class="material-icons">
      star_half
    </span>`;
  }

  // Lägger till tomma stjärnor
  for (let i = 0; i < emptyStars; i++) {
    html += `
    <span class="material-icons">
      star_border
    </span>`;
  }

  return html;
}

// ------------------------------------------------
// ------------ SKRIVA UT PRODUKTER I HTML ------------
// ------------------------------------------------

function printProductsList(productList) {
  // rensa div
  let newHTML = ``;

  productList.forEach(product => {
    newHTML += `
      <article class="product">
        <h3>${product.name}</h3>
        <div class="product-image">
          <img src="${product.img.url}" alt="${product.img.alt}">
        </div>
        <p class="product-description">${product.description}</p>
        <p>${getRatingHtml(product.rating)}</p>
        <span class="product-price">${product.price.toFixed(2)} kr</span> 
        <div class="change-amount">
          <button class="decrease" id="decrease-${product.id}">-</button>
          <input type="number" min="0" value="${product.amount}" id="input-${product.id}">
          <button class="increase" id="increase-${product.id}">+</button>
        </div>
      </article>
    `;
  });

  productsListDiv.innerHTML = newHTML;

  const increaseButtons = document.querySelectorAll('button.increase');
  increaseButtons.forEach(button => {
    button.addEventListener('click', increaseProductCount);
  });

  const decreaseButtons = document.querySelectorAll('button.decrease');
  decreaseButtons.forEach(button => {
    button.addEventListener('click', decreaseProductCount);
  });
}

// Skriver ut produkter
printProductsList(products);

// ------------------------------------------------
// ------------ FILTRERA PRODUKTER -------------------
// ------------------------------------------------

function filterProducts() {
  let filteredProducts = [...products];

  const selectedCategory =  document.querySelector('input[name="categoryFilter"]:checked').value; // säger vilken kategori som är vald 
  const selectedPrice = priceRangeSlider.value; // säger vilket pris som är valt 

  currentRangeValue.innerHTML = selectedPrice; // skriver ut valt pris

  filteredProducts = filteredProducts.filter(product => product.price <= selectedPrice); // filtrerar produkter från valt pris

  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory); // filtrerar produkter från kategori om det inte är 'all' 
  } 

  printProductsList(filteredProducts);
}


for (let i = 0; i < categoryFilterRadios.length; i++) {
	categoryFilterRadios[i].addEventListener('click', filterProducts);
}

// eventlyssnare för när man drar i slidern 
priceRangeSlider.addEventListener('input', filterProducts);

// ------------------------------------------------
// ------------ VALIDERA FORMULÄR -------------------
// ------------------------------------------------

let validForm = false;

function validateInput(inputElementId, checkSpecial = '') {
  // Generalisera _vilket_ input-id som hämtas från HTML-dokumentet
  const inputField = document.getElementById(inputElementId);
  let isValid = true;

  if (!inputField) {
    console.error(`Element with id ${inputElementId} not found.`);
    isValid = false;
  }
  // hitta rätt element
  const feedbackField = inputField.closest('label').querySelector('.error-message');
  
  if (!feedbackField) {
    console.error(`No feedback field found for input id ${inputElementId}`);
    isValid = false;
  }  

  const inputValue = inputField.value.trim();

  // Om vi har special-fall, som t.ex. telefonnummer
  let hasSpecialError = false;
  let customErrorMessage = '';
  
  // Om vi behöver kontrollera specialfall
  if (checkSpecial !== '') {
    
    // Kolla vilket specialfall
    switch(checkSpecial) {
      case 'phoneNumber':
        hasSpecialError = !/^[0-9]{10}$/.test(inputValue);
        customErrorMessage = 'Endast siffror.';
        isValid = false;
        break;
      case 'socialSecurityNumber':
        // Något annat
        break;
    }
  }
  
  // Skriv ut ev. felmeddelande eller check-mark
  if (inputValue.length === 0 || hasSpecialError) {
    feedbackField.innerHTML = `<i>* ${customErrorMessage || 'Fältet är obligatoriskt'}</i>`;
    isValid = false;
  } else {
    feedbackField.innerHTML = '<i class="fa fa-check"></i>';
    isValid = true;
  }

  if (isValid = true) {
    validForm = true;
  }
}

// Eventlyssnare för input
function attachRealTimeValidation(inputElementId, checkSpecial = '') {
  const inputField = document.getElementById(inputElementId);
  if (inputField) {
    inputField.addEventListener('input', () => validateInput(inputElementId, checkSpecial));
    inputField.addEventListener('blur', () => validateInput(inputElementId, checkSpecial));
  } else {
    console.error(`attachRealTimeValidation: Element-ID ${inputElementId} hittas inte.`);
  }
}

attachRealTimeValidation('first-name');
attachRealTimeValidation('last-name');
attachRealTimeValidation('address');
attachRealTimeValidation('zip');
attachRealTimeValidation('city');
attachRealTimeValidation('phone', 'phoneNumber');
attachRealTimeValidation('email');

// ------------------------------------------------
// ------------ BETALNING -------------------
// ------------------------------------------------

const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="payment-option"]'));
const inputs = [
  document.querySelector('#creditCardNumber'),
  document.querySelector('#creditCardYear'),
  document.querySelector('#creditCardMonth'),
  document.querySelector('#creditCardCvc'),
  document.querySelector('#personalID')
];

const invoiceOption = document.querySelector('#invoice');
const cardOption = document.querySelector('#card');
const orderBtn = document.querySelector('#orderBtn');

// Default-alternativ
let selectedPaymentOption = 'card';

// REGEX
const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/);
const creditCardNumberRegEx = new RegExp(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/); // MasterCard

// Eventlyssnare 
inputs.forEach(input => {
  input.addEventListener('focusout', activateOrderButton);
  input.addEventListener('change', activateOrderButton);
});

cardInvoiceRadios.forEach(radioBtn => {
  radioBtn.addEventListener('change', switchPaymentMethod);
});

/**
 * Byter betalningsmetod mellan faktura och kort 
 * Togglar ifall de visas eller ej
 */

function switchPaymentMethod(e) {
  invoiceOption.classList.toggle('hidden');
  cardOption.classList.toggle('hidden');

  selectedPaymentOption = e.target.value;
}


function disableInvoice(totalSum) {
  const invoiceRadio = document.getElementById('invoiceRadio');
  if (totalSum >= 800) {
    invoiceRadio.disabled = true;
  } else {
    invoiceRadio.disabled = false;
  }
}


function isPersonalIdNumberValid() {
  return personalIdRegEx.exec(personalID.value);
}

/** 
 * Aktiverar beställ-knappen om alla fält 
 * korrekt ifyllda.
 */

function activateOrderButton() {
  orderBtn.setAttribute('disabled', '');
  let isValid = true;

  if (selectedPaymentOption === 'invoice' && !isPersonalIdNumberValid()) {
    return;
  }
  
  if (selectedPaymentOption === 'card') {
    const feedbackCardNumber = creditCardNumber.closest('label').querySelector('.error-message');
    // Kolla kortnummer
    if (creditCardNumberRegEx.exec(creditCardNumber.value) === null) {
      console.warn('Credit card number not valid.');
      feedbackCardNumber.innerHTML = `<i>* Fyll i kortnummer.</i>`;
      isValid = false
    } else {
      feedbackCardNumber.innerHTML = '<i class="fa fa-check"></i>';
    }

    // Kolla kortår
    let year = Number(creditCardYear.value);
    const today = new Date();
    const shortYear = Number(String(today.getFullYear()).substring(2));

    const feedbackYear = document.getElementById('errorYear');

    if (year > shortYear + 2 || year < shortYear) {
      console.warn('Credit card year not valid.');
      feedbackYear.innerHTML = `<i>* Fyll i år.</i>`;
      isValid = false
    } else {
      feedbackYear.innerHTML = '<i class="fa fa-check"></i>';
    }

    const feedbackMonth = document.getElementById('errorMonth');

    // Kolla kortmånad
    let month = Number(creditCardMonth.value);
    const shortMonth = Number(String(today.getMonth()).padStart(2, '0'));
    
    if ((month > 12) || (month <= shortMonth && year == shortYear) || (month <= 0)) {
      console.warn('Credit card month not valid.');
      feedbackMonth.innerHTML = `<i>* Fyll i månad.</i>`;
      isValid = false
    } else {
      feedbackMonth.innerHTML = '<i class="fa fa-check"></i>';
    }

    const feedbackCvc = creditCardCvc.closest('label').querySelector('.error-message');
    // Kolla CVC
    if (creditCardCvc.value.length !== 3) {
      console.warn('CVC not valid.');
      feedbackCvc.innerHTML = `<i>* Fältet är obligatoriskt</i>`;
      isValid = false
    } else {
      feedbackCvc.innerHTML = '<i class="fa fa-check"></i>';
    }
  }

  if (isValid && validForm) {
    orderBtn.removeAttribute('disabled');
  }
}

// Attach event listener to the "Order" button
orderBtn.addEventListener('click', function(event) {
  event.preventDefault(); // hindrar sidan från att ladda om

  // skriver ut beställningsbekräftelsen
  updateAndPrintCart('orderSummary', { 
    title: 'Beställningsbekräftelse',
    titleSummary: 'Dina beställda varor:',
    orderInfo: true
  });
});

// ------------------------------------------------
// ------------ NOLLSTÄLLNINGS-TIMER -------------------
// ------------------------------------------------

let inactivityTimer;

function tooSlow() {
  const messageContainer = document.getElementById('timeoutMessage');
  if (messageContainer) {
    messageContainer.innerHTML = '<p>Du är för långsam, din session har avslutats!</p>';
    messageContainer.style.display = 'block';
  }

  // Nollställ formuläret
  const form = document.getElementById('orderForm');
  if (form) {
    form.reset();
  }

}

// 
function startInactivityTimer() {
  // Rensa nuvarande timer
  clearTimeout(inactivityTimer);

  // Ställ timer på 15 minuter (900,000 ms) (5000 ms = 5sek)
  inactivityTimer = setTimeout(tooSlow, 900000);
}

// Eventlyssnare för användaraktivitet
function setupInactivityListeners() {
  const form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('input', startInactivityTimer); // Reset timer on user input
    form.addEventListener('click', startInactivityTimer); // Reset timer on clicks
    form.addEventListener('mousemove', startInactivityTimer); // Optional: Reset timer on mouse move
  }
}

// Starta timer när sidan laddas in
document.addEventListener('DOMContentLoaded', () => {
  setupInactivityListeners();
  startInactivityTimer();
});