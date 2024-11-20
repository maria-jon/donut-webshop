const products = [
  {
    id: 0,
    name: 'Product 1',
    price: 10,
    rating: 4,
    amount: 0,
    category: 'sweet',
    img: {
      url: "/assets/cat.png",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
  {
    id: 1,
    name: 'Product 2',
    price: 20,
    rating: 3,
    amount: 0,
    category: 'sweet',
    img: {
      url: "/assets/elena-koycheva-PFzy4N0_R3M-unsplash.jpg",
      width: 500,
      height: 500,
      alt: 'Two donuts'
    },
  },
  {
    id: 2,
    name: 'Product 3',
    price: 30,
    rating: 1.5,
    amount: 0,
    category: 'sweet',
    img: {
      url: "/assets/annie-spratt-jstQCOhzyQA-unsplash.jpg",
      width: 1000,
      height: 450,
      alt: 'Stack of donuts'
    },
  },
];

// ------------ HTML ELEMENTS ------------
const productsListDiv = document.querySelector('#products-list');

// ------------ PRINT PRODUCTS IN HTML ------------

function getRatingHtml(rating) {
  // If has half star rating; detect by checking for dot/decimal
  const isHalf = String(rating).indexOf('.');

  let html = '';
  for (let i = 0; i < rating; i++) {
    html += `<span>⭐</span>`;
  }
  if (isHalf !== -1) {
    html += `<span>💩</span>`; // should be half star
  }
  return html;
}

function printProductsList() {
  // Rensa div:en på befintliga produkter innan utskrift av uppdaterad information
  productsListDiv.innerHTML = '';

  products.forEach(product => {
    productsListDiv.innerHTML += `
      <article class="product">
        <h3>${product.name}</h3>
        <p>${product.price} kr</p>
        <p>Rating: ${getRatingHtml(product.rating)}</p>
        <img src="${product.img.url}" alt="${product.img.alt}">
        <div>
          <button class="decrease" id="decrease-${product.id}">decrease</button>
          <input type="number" min="0" value="${product.amount}" id="input-${product.id}">
          <button class="increase" id="increase-${product.id}">increase</button>
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

printProductsList();

function increaseProductCount(e) {
  const productId = Number(e.target.id.replace('increase-', ''));
  console.log('clicked on button with id', productId);
  // Leta rätt på produkten i arrayen som har det id:t
  const foundProductIndex = products.findIndex(product => product.id === productId);
  console.log('found product at index', foundProductIndex);

  // Om produkten inte finns, skriv ut felmeddelande i consolen
  // och avbryt att resten av koden körs med "return"
  if (foundProductIndex === -1) {
    console.error('Det finns ingen sådan produkt i produktlistan! Kolla att id:t är rätt.');
    return;
  }

  // öka dess amount med +1
  products[foundProductIndex].amount += 1;

  printProductsList();
}

function decreaseProductCount(e) {
  const productId = Number(e.target.id.replace('decrease-', ''));
  console.log('clicked on button with id', productId);
  // Leta rätt på produkten i arrayen som har det id:t
  const foundProductIndex = products.findIndex(product => product.id === productId);
  console.log('found product at index', foundProductIndex);

  // Om produkten inte finns, skriv ut felmeddelande i consolen
  // och avbryt att resten av koden körs med "return"
  if (foundProductIndex === -1) {
    console.error('Det finns ingen sådan produkt i produktlistan! Kolla att id:t är rätt.');
    return;
  }

  // minska dess amount med -1
  products[foundProductIndex].amount -= 1;

  printProductsList();
}