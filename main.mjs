import products from "./products.mjs";

// ------------------------------------------------
// ------------ HTML ELEMENTS ---------------------
// ------------------------------------------------

const productsListDiv = document.querySelector('#products-list');
// const cartSummaryDiv = document.querySelector('#cart-summary');
const productsSortDiv = document.querySelector('#filter-products');

const categoryFilterRadios = document.querySelectorAll('[name="categoryFilter"]');
const priceRangeSlider = document.querySelector('#priceRange');
const currentRangeValue = document.querySelector('#currentRangeValue'); // priset som skrivs ut vid slidern

const sweetRadio = document.querySelector('#sweet-radio')
const sourRadio = document.querySelector('#sour-radio')
const veganRadio = document.querySelector('#vegan-radio')
const allRadio = document.querySelector('#all-radio')
/*
let filteredProducts = [...products];
let filteredProductsInPriceRange = [];
*/
const today = new Date();

// ------------------------------------------------
// ------------ SHOW PRODUCTS IN CART -------------
// ------------------------------------------------

const cart = document.querySelector('#cart-summary');

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

  updateAndPrintCart();
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
  updateAndPrintCart();
}

// ------------ SKRIVA UT PRODUKTER I KORGEN -------------
function updateAndPrintCart() {
  /*
  ATT GÖRA
  x en container i html (id/html-element) där produkterna skrivs ut
  x produkter som har minst 1 i antal: filter (for-loop)
  x loop för att skriva ut produkterna
  x totalsumma
  x om det inte finns några produkter så ska det skrivas ut att varukorgen är tom
  */

  // Alternativ 1: använda filter-funktionen i arrayer
  // const purchasedProducts = products.filter((product) => product.amount > 0);

  // Alternativ 2: for-loop
  const purchasedProducts = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.amount > 0) {
      purchasedProducts.push(product);
    }
  }


  // Räkna ut total summa
  let shippingCost = 0;
  const totalSum = purchasedProducts.reduce((total, product) => {
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

  // Räkna ut procent-kostnad på frakten
  const shippingPrice = (totalSum) => {
    return totalSum * 0.10;
  };

  // Räkna ut total frakt
  const calculateTotalShipping = (totalSum) => {
    return shippingPrice(totalSum) + 25;
  };

  // Sätter frakt
  let totalShipping;
  if (shippingAmount < 15) {
    totalShipping = calculateTotalShipping(totalSum);
    // console.log(`shippingPrice: ${shippingPrice(totalSum)} kr`);
    // console.log(`Total frakt: ${totalShipping} kr`);
  } else {
    totalShipping = 0; // mer än 15st = gratis
  }

  // Räkna ut totalsumman
  const totalOrderSum = totalSum + totalShipping;


  // ------------------------------------------------
  // ------------ DISCOUNTS -------------
  // ------------------------------------------------
  function mondayDiscount() {
    /* Måndagsrabatt
    x är det måndag?
    x om det inte är måndag > return
    x är det mellan 03:00 och 10:00? (&& och ===)
    x om det inte är det > return
    - annars > 10 % rabatt på beställningssumman (visa i sammanfattningen)
    */
   
    if (today.getDay() != 1) { // om det inte är måndag
      return
    } else if (today.getHours() >= 10) { // om klockan är mer än 10
      return
    } else if (today.getHours() >= 3)  { // om klockan är mer än 03
      console.log('Det är måndag morgon, så du får 10 % rabatt på din beställning:', totalOrderSum * 0.1, 'kr. Totalsumman blir:', totalOrderSum * 0.9, 'kr.');
    }
  }
  mondayDiscount();

  
  function bulkDiscount() {
    /* mängdrabatt (filter/find)
     x kolla antalet munkar för varje produkt
     - om värdet är mindre än 10 > return
     - om värdet 'antal munkar' för ett visst namn/produkt är mer än tio > 10% rabatt på summan av den munken
    */

    const purchasedProductsBulk = products.filter((product) => product.amount > 9);

    console.log('bulk', purchasedProductsBulk);

  }
  bulkDiscount();


  function weekendRaise() {
    /* helghöjning
      x är det fredag, lördag, söndag, eller måndag?
      x om det är fredag innan 15:00 > return
      x om det är måndag efter 03:00 > return
      - annars > 15% extra pris på produkterna
    */

    if (today.getDay() == 2 || today.getDay() == 3 || today.getDay() == 4) { // om det inte är helg
      return
    } else if (today.getDay() == 5 && today.getHours() <= 15) { // om det är fredag innan kl 15
      return
    } else if (today.getDay() == 1 && today.getHours() >= 3) { // om det är måndag efter kl 03
      return
    } else {
      console.log('Hemlig prishöjning:', totalOrderSum * 0.15, 'kr. Totalsumman blir:', totalOrderSum * 1.15, 'kr.');
    }
  }
  weekendRaise();



  // Kontrollera vilka produkter vi har i consolen
  console.log('purchased', purchasedProducts);

  // Skriva ut produkter
  cart.innerHTML = ''; // Rensa div
  purchasedProducts.forEach(product => {
    cart.innerHTML += `
      <div class="cart-item">
        <img src="${product.img.url}" alt="${product.img.alt}">
        <span class="cart-name">${product.name}: </span> ${product.amount} st - ${product.amount * product.price} kr
      </div>
    `;
  });

  // Skriva ut totalsumma och frakt i cart
  cart.innerHTML +=`
    <div class="cart-total">
      <span>Pris: ${totalSum} kr </span>
      <span>Frakt: ${totalShipping} kr </span>
      <span class="total-order-sum">Totalt: ${totalOrderSum} kr</span>
    </div>
  `;
}


// ------------------------------------------------
// ------------ PRINT PRODUCTS IN HTML ------------
// ------------------------------------------------

// Skriva ut rating
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

function printProductsList(productList) {
  // rensa div
  let newHTML = ``;

  productList.forEach(product => {
    newHTML += `
      <article class="product">
        <h3>${product.name}</h3>
        <img src="${product.img.url}" alt="${product.img.alt}">
        <span>${product.price} kr</span>
        <p>Omdöme: ${getRatingHtml(product.rating)}</p>
        <div>
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
// ------------ FILTER PRODUCTS -------------------
// ------------------------------------------------

function filterProducts() {
  let filteredProducts = [...products];

  // Uppdatera filteredProducts utfirån val gjorda i gränssnittet
  // const selectedCategory = document.querySelector('input[name="categoryFilter"]:checked').value; // säger vilken kategori som är vald 
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
// ------------ VALIDATE FORM -------------------
// ------------------------------------------------
function validateAdress() {
  let adress = document.getElementById("adress").value;

  if (adress.length === 0) {
    adressError.innerHTML = "*";
    return false;
  }
  adressError.innerHTML = '<i class="fa-solid fa-check"></i>';
  return true;
}

function validateZip() {
  let zipCode = document.getElementById("zip").value;

  if (zipCode.length === 0) {
    zipError.innerHTML = "*";
    return false;
  }
  zipError.innerHTML = '<i class="fa-solid fa-check"></i>';
  return true;
}

function validateCity() {
  let city = document.getElementById("city").value;

  if (city.length === 0) {
    cityError.innerHTML = "*";
    return false;
  }
  cityError.innerHTML = '<i class="fa-solid fa-check"></i>';
  return true;
}

function validatePhone() {
  let phone = document.getElementById("phone").value;

  if (phone.length === 0) {
    phoneError.innerHTML = "*";
    return false;
  }

  if (!phone.match(/^[0-9]{10}$/)) {
    phoneError.innerHTML = "Endast siffror";
    return false;
  }

  phoneError.innerHTML = '<i class="fa-solid fa-check"></i>';
  return true;
}
validateInput('address'); // Skicka in vilket ID som ska kollas
validateInput('zip');
validateInput('city');
validateInput('phone', 'phoneNumber'); // Id + specialfall


// ------------------------------------------------
// ------------ PAYMENT -------------------
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

// Default options
let selectedPaymentOption = 'card';

// REGEX
const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/);
const creditCardNumberRegEx = new RegExp(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/); // MasterCard

// Add event listeners
inputs.forEach(input => {
  input.addEventListener('focusout', activateOrderButton);
  input.addEventListener('change', activateOrderButton);
});

cardInvoiceRadios.forEach(radioBtn => {
  radioBtn.addEventListener('change', switchPaymentMethod);
});

/**
 * Switches between invoice payment method and
 * card payment method. Toggles their visibility.
 */
function switchPaymentMethod(e) {
  invoiceOption.classList.toggle('hidden');
  cardOption.classList.toggle('hidden');

  selectedPaymentOption = e.target.value;
}

function isPersonalIdNumberValid() {
  return personalIdRegEx.exec(personalID.value);
}

/**
 * Activate order button if all fields are
 * correctly filled.
 */
function activateOrderButton() {
  orderBtn.setAttribute('disabled', '');

  if (selectedPaymentOption === 'invoice' && !isPersonalIdNumberValid()) {
    return;
  }
  
  if (selectedPaymentOption === 'card') {
    // Check card number
    if (creditCardNumberRegEx.exec(creditCardNumber.value) === null) {
      console.warn('Credit card number not valid.');
      return;
    }

    // Check card year
    let year = Number(creditCardYear.value);
    const today = new Date();
    const shortYear = Number(String(today.getFullYear()).substring(2));

    if (year > shortYear + 2 || year < shortYear) {
      console.warn('Credit card year not valid.');
      return;
    }

    // Check card month
    let month = Number(creditCardMonth.value);
    const shortMonth = Number(String(today.getMonth()).padStart(2, '0'));

    if (month > 12 || (month <= shortMonth && year == shortYear)) {
      console.warn('Credit card month not valid.')
    }

    // Check card CVC
    if (creditCardCvc.value.length !== 3) {
      console.warn('CVC not valid.');
      return;
    }
  }

  orderBtn.removeAttribute('disabled');
}