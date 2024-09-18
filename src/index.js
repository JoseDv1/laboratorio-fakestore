const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = new URL('https://api.escuelajs.co/api/v1/products');
let limit = 10;
let offset = 0;
let pagination = localStorage.setItem('pagination', 5);

const getData = async (URL, limit, offset) => {
  try {
    URL.searchParams.set('limit', limit ?? 10);
    URL.searchParams.set('offset', offset ?? 0);

    const res = await fetch(URL)
    let products = await res.json();

    if (products.length === 0) { 
      intersectionObserver.unobserve($observe);
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = `<h1>No hay más productos</h1>`;
      $app.appendChild(newItem);
      return;
    }

    let output = products.map(product => Card(product)).join('');
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output;
    $app.appendChild(newItem);

  } catch (error) {
    console.log(error);
  }
}


const loadData = () => {
  getData(API, limit, offset);
  offset += localStorage.getItem('pagination') ?? 5;
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

function Card(product) {
  const image = 'https://via.placeholder.com/640x480/'
  
  return `
    <article class="Card">
      <small>${product.id}</small>
      <img src="${image}" alt="${product.title}" />
      <h2>${product.title} <small>$${product.price}</small></h2>
    </article>
  `;
}