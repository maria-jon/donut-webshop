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
  - kolla antalet munkar i varukorg
  - om det är mer än 15 > return
  - om det är mindre än 15 > 25 kr + 10% av totalsumma
  */

  const shippingAmount = purchasedProducts.reduce((total, product) => {
    return total + product.amount;
  }, 0 )
  console.log(shippingAmount);

  const shippingPrice = (num1, num2) => totalSum * 0.10;
  const totalShipping = (num1, num2) => shippingPrice + 25;

  if(shippingAmount > 14) {
    return
    console.log('gratis');
  } else {
    shippingPrice();
    console.log(shippingPrice(), 'kr');
  }

  function addShipping() {
  
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

  // Print products
  cart.innerHTML = ''; // Empty div of previous content
  purchasedProducts.forEach(product => {
    cart.innerHTML += `
      <div class="cart-item">
        <img src="${product.img.url}" alt="${product.img.alt}">
        <span class="cart-name">${product.name}: </span> ${product.amount} st - ${product.amount * product.price} kr
      </div>
    `;
  });

  // Display total sum in the cart
  cart.innerHTML +=`
    <div class="cart-total">
      Totalpris: ${totalSum} kr
    </div>
  `;
}

// ------------------------------------------------
// ------------ PRINT PRODUCTS IN HTML ------------
// ------------------------------------------------

function getRatingHtml(rating) {
  // Calculate number of full stars
  const fullStars = Math.floor(rating);
  // Check if there's a half star
  const hasHalfStar = rating % 1 !== 0;
  // Calculate empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let html = '';

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    html += `
    <span class="material-icons">
      star
    </span>`;
  }

  // Add half star if applicable
  if (hasHalfStar) {
    html += `
    <span class="material-icons">
      star_half
    </span>`;
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    html += `
    <span class="material-icons">
      star_border
    </span>`;
  }

  return html;
}

function printProductsList() {
  // Clear div of products
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

// Print products 
printProductsList();

// Increase amount
function increaseProductCount(e) {
  const productId = Number(e.target.id.replace('increase-', ''));
  // console.log('clicked on button with id', productId);
  // Find product in array 
  const foundProductIndex = products.findIndex(product => product.id === productId);
  // console.log('found product at index', foundProductIndex);

  // If product does not exist, error in console
  // and stop rest of code
  if (foundProductIndex === -1) {
    console.error('Det finns ingen sådan produkt i produktlistan! Kolla att id:t är rätt.');
    return;
  }

  // Increase amount with +1
  products[foundProductIndex].amount += 1;

  printProductsList();

  updateAndPrintCart();
}

// Decrease amount
function decreaseProductCount(e) {
  const productId = Number(e.target.id.replace('decrease-', ''));
  // console.log('clicked on button with id', productId);
  // Find product in array 
  const foundProductIndex = products.findIndex(product => product.id === productId);
  // console.log('found product at index', foundProductIndex);

  // If product does not exist, error in console
  // and stop rest of code
  if (foundProductIndex === -1) {
    console.error('Det finns ingen sådan produkt i produktlistan! Kolla att id:t är rätt.');
    return;
  }

  // Decrease amount with -1
  products[foundProductIndex].amount -= 1;

  printProductsList();
  updateAndPrintCart();
}

// ------------------------------------------------
// ------------ FILTER PRODUCTS -------------------
// ------------------------------------------------

products.sort((product1, product2) => {return product1.price > product2.price});
console.table(products);

// ------------ CART SUMMARY ------------

/* TO DO
x en container i html där produkterna skrivs ut
- produkter som har minst 1 i antal: filter (for-loop)
- loop för att skriva ut produkterna 
- totalsumma
- om det inte finns några produkter så ska det skrivas ut att varukorgen är tom

/*
function printCartSummary() {
  // Clear div of products
  cartSummaryDiv.innerHTML = '';

  products.forEach(product => {
    // Create list item
    const listItem = document.createElement('div');
    listItem.className = 'product-item';

    listItem.innerHTML = `
        <span>${product.name}</span>
        <span>${product.price} kr</span>
        <span>${product.amount}</span>
        <button onclick="decreaseProductCount(${product.id})">-</button>
        <span>${product.amount}</span>
        <button onclick="increaseProductCount(${product.id})">+</button>
    `;
    // Append item to the product list div
    cartSummaryDiv.appendChild(listItem);
  });

  cartSummaryDiv.innerHTML = newHTML;
}


printCartSummary();

*/