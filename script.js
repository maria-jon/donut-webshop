const products = [
    {
      id: 0,
      name: 'Product 1',
      price: 10,
      rating: 4,
      amount: 0,
      category: 'sweet',
      img: {
        url: 'assets/images/assets/images/annie-spratt-jstQCOhzyQA-unsplash.jpg',
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
        url: 'assets/images/elena-koycheva-PFzy4N0_R3M-unsplash.jpg',
        width: 1000,
        height: 450,
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
        url: 'assets/images/assets/images/annie-spratt-jstQCOhzyQA-unsplash.jpg',
        width: 1000,
        height: 450,
        alt: 'Stack of donuts'
      },
    },
];

// ------------ HTML ELEMENTS ------------
  const productsListDiv = document.querySelector('#products-list');

// ------------ PRINT PRODUCTS IN HTML ------------

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
}

printProductsList();
