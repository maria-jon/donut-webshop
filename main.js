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

const categoryFilterRadios = document.querySelectorAll('[name="categoryFilter"]');
const priceRangeSlider = document.querySelector('#priceRange');
const currentRangeValue = document.querySelector('#currentRangeValue'); // priset som skrivs ut vid slidern

let filteredProducts = [...products];
let filteredProductsInPriceRange = [...products]; // alla produkter

const today = new Date();

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
  // const purchasedProducts = products.filter((product) => product.amount > 0);

  // Alternativ 2: for-loop
  const purchasedProducts = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.amount > 0) {
      purchasedProducts.push(product);
    }
  }


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

  // Räkna ut totalsumman
  const totalOrderSum = totalSum + totalShipping;

  /* helghöjning
  - är det fredag, lördag, söndag, eller måndag?
  - om det är fredag innan 15:00 > return
  - om det är måndag efter 03:00 > return
  - annars > 15% extra pris på produkterna
  */

  // ------------------------------------------------
  // ------------ MONDAY DISCOUNT -------------
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

  
/*
  function bulkDiscount() {
    /* mängdrabatt (filter/find)
     - kolla antalet munkar för varje produkt
     - om värdet är mindre än 10 > return
     - om värdet 'antal munkar' för ett visst namn/produkt är mer än tio > 10% rabatt på summan av den munken
    

    const purchasedProductsBulk = products.filter((product) => product.amount > 9);

    console.log('bulk', purchasedProductsBulk);

  }
  bulkDiscount();
*/


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
      <span>Totalt: ${totalOrderSum}</span>
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

  filteredProductsInPriceRange.forEach(product => {
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

/**
* Print product HTML.
*/

function renderProducts() {
	productsListDiv.innerHTML = '';
	
	filteredProductsInPriceRange.forEach((product) => { // lägg till InRange
		productsListDiv.innerHTML += `
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
  
  const increaseButtons = document.querySelectorAll('button.increase');
  increaseButtons.forEach(button => {
    button.addEventListener('click', increaseProductCount);
  });

  const decreaseButtons = document.querySelectorAll('button.decrease');
  decreaseButtons.forEach(button => {
    button.addEventListener('click', decreaseProductCount);
  });
}

// ändra price range
function changePriceRange() {
	const currentPrice = priceRangeSlider.value;
	currentRangeValue.innerHTML = currentPrice;
	// console.log(currentPrice); // output: det ändrade värdet när man drar i slidern
	
	filteredProductsInPriceRange = filteredProducts.filter((product) => product.price <= currentPrice);
	console.log(filteredProductsInPriceRange); // output: de objekt som stämmer överens med pris
	renderProducts(); // skriva ut listan på nytt
}


/**
* Update which products are shown
*/
// categories ['Sweet', 'Sour', 'Vegan']

function updateCategoryFilter(e) {
  const selectedCategory = e.currentTarget.value;
  if (selectedCategory === 'All') {
    filteredProducts = product;
  } else {
    filteredProducts = product.filter(prod => prod.category === selectedCategory);
  }
  changePriceRange();
}

/*
function updateCategoryFilter(e) {
	// Hämta värdet på vald radio button
	const selectedCategory = e.currentTraget.value;
	console.log(selectedCategory); 
	
	if (selectedCategory === 'all') {
		filteredProducts = [...products]; // copy reference
	} else {
		// töm filtered products på tidigare filtrering
		filteredProducts = [];
		
		// loopa igenom alla produkter
		for (let i = 0; i < products.length; i++) {
			const prod = products[i];
			
			// gör om kategorierna i varje produkt till lowercase
			const catsInLowercase = [];
			for (let j = 0; j < prod.category.length; j++) {
				catsInLowercase.push(prod.category[j].toLowerCase());
			}
			// kolla om vald kategori finns med i listan
			if (catsInLowercase.indexOf(selectedCategory) > -1) {
				filteredProducts.push(prod);
			}
		}
	}
	changePriceRange();
}
*/
// eventlyssnare för när man drar i slidern 
priceRangeSlider.addEventListener('input', changePriceRange);

// products.sort((product1, product2) => {return product1.price > product2.price});
// console.table(products);

/*
function updateCategoryFilter(e) {
  const selectedCat = e.currentTarget.value;
  if (selectedCat === 'All') {
    filteredProd = product;
  } else {
    filteredProd = product.filter(prod => prod.category === selectedCat);
  }
  changePriceRange();
}
*/