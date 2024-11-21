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
    category: 'sweet',
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
    category: 'sweet',
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
    category: 'sweet',
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
    category: 'sweet',
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
    category: 'sweet',
    img: {
      url: "./images/annie-spratt-jstQCOhzyQA-unsplash.jpg",
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
  // Rensa div:en på befintliga produkter innan utskrift av uppdaterad information

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

printProductsList();

function increaseProductCount(e) {
  const productId = Number(e.target.id.replace('increase-', ''));
  // console.log('clicked on button with id', productId);
  // Leta rätt på produkten i arrayen som har det id:t
  const foundProductIndex = products.findIndex(product => product.id === productId);
  // console.log('found product at index', foundProductIndex);

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
  // console.log('clicked on button with id', productId);
  // Leta rätt på produkten i arrayen som har det id:t
  const foundProductIndex = products.findIndex(product => product.id === productId);
  // console.log('found product at index', foundProductIndex);

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