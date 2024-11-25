const products = [
  {
    id: 0,
    name: 'Jordgubbsmagi',
    price: 10,
    rating: 4,
    amount: 0,
    category: 'sweet',
    img: {
      url: "./images/annie-spratt-jstQCOhzyQA-unsplash.jpg",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
  {
    id: 1,
    name: 'Chokladfrossa',
    price: 20,
    rating: 3,
    amount: 0,
    category: 'sweet',
    img: {
      url: "./images/elena-koycheva-PFzy4N0_R3M-unsplash.jpg",
      width: 500,
      height: 500,
      alt: 'Two donuts'
    },
  },
  {
    id: 2,
    name: 'Honungsglädje',
    price: 30,
    rating: 1.5,
    amount: 0,
    category: 'sweet',
    img: {
      url: "./images/annie-spratt-jstQCOhzyQA-unsplash.jpg",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
  {
    id: 3,
    name: 'Regnbågsring',
    price: 35,
    rating: 4.5,
    amount: 0,
    category: 'sour',
    img: {
      url: "./images/annie-spratt-jstQCOhzyQA-unsplash.jpg",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
  {
    id: 4,
    name: 'Kanelfluff',
    price: 20,
    rating: 2.5,
    amount: 0,
    category: 'sweet',
    img: {
      url: "./images/annie-spratt-jstQCOhzyQA-unsplash.jpg",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
  {
    id: 5,
    name: 'Sockersöt',
    price: 10,
    rating: 3,
    amount: 0,
    category: 'vegan',
    img: {
      url: "./images/annie-spratt-jstQCOhzyQA-unsplash.jpg",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
  {
    id: 6,
    name: 'Vaniljdröm',
    price: 30,
    rating: 3.5,
    amount: 0,
    category: 'sweet',
    img: {
      url: "./images/annie-spratt-jstQCOhzyQA-unsplash.jpg",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
  {
    id: 7,
    name: 'Karamellsnurra',
    price: 35,
    rating: 4,
    amount: 0,
    category: 'vegan',
    img: {
      url: "./images/annie-spratt-jstQCOhzyQA-unsplash.jpg",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
  {
    id: 8,
    name: 'Päronpärla',
    price: 15,
    rating: 2,
    amount: 0,
    category: 'vegan',
    img: {
      url: "./images/annie-spratt-jstQCOhzyQA-unsplash.jpg",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
  {
    id: 9,
    name: 'Citronkyss',
    price: 25,
    rating: 4.5,
    amount: 0,
    category: 'sour',
    img: {
      url: "./images/annie-spratt-jstQCOhzyQA-unsplash.jpg",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
];

// ------------------------------------------------
// ------------ HTML ELEMENTS ---------------------
// ------------------------------------------------

const productsListDiv = document.querySelector('#products-list');
// const cartSummaryDiv = document.querySelector('#cart-summary');
const productsSortDiv = document.querySelector('#filter-products');

// const productsListing = document.querySelector('#productsListing');
const categoryFilterRadios = document.querySelectorAll('[name="categoryFilter"]');
const priceRangeSlider = document.querySelector('#priceRange');
const currentRangeValue = document.querySelector('#currentRangeValue'); // priset som skrivs ut vid slidern

// ------------------------------------------------
// ------------ SHOW PRODUCTS IN CART -------------
// ------------------------------------------------

const cart = document.querySelector('#cart-summary');
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
  const purchasedProducts = products.filter((product) => product.amount > 0);

  // Calculate total sum
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



  /*
  // Alternativ 2: for-loop
  const purchasedProducts = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.amount > 0) {
      purchasedProducts.push(product);
    }
  }
  */

  // Kontrollera vilka produkter vi har i consolen
  console.log(purchasedProducts);

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
      Pris: ${totalSum} kr
      Frakt: ${totalShipping} kr
    </div>
  `;
}

// ------------------------------------------------
// ------------ PRINT PRODUCTS IN HTML ------------
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

function printProductsList() {
  // rensa div
  let newHTML = ``;

  products.forEach(product => {
    newHTML += `
      <article class="product">
        <h3>${product.name}</h3>
        <img src="${product.img.url}" alt="${product.img.alt}">
        <span>${product.price} kr</span>
        <p>Omdöme: ${getRatingHtml(product.rating)}</p>
        <div>
          <button class="decrease" id="decrease-${product.id}">decrease</button>
          <input type="number" min="0" value="${product.amount}" id="input-${product.id}">
          <button class="increase" id="increase-${product.id}">increase</button>
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
printProductsList();

// Öka antal
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

  printProductsList();

  updateAndPrintCart();
}

// Minska antal 
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

  printProductsList();
  updateAndPrintCart();
}

// ------------------------------------------------
// ------------ FILTER PRODUCTS -------------------
// ------------------------------------------------

products.sort((product1, product2) => {return product1.price > product2.price});
console.table(products);

