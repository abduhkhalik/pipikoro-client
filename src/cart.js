let basket = JSON.parse(localStorage.getItem('data')) || [];

// Variable
const cardsMenu = document.getElementById('cardsMenu');
const cartBody = document.getElementById('cart');
const cartContent = document.getElementById('cartContent');
const closeBtn = document.getElementById('btn-x');
const navCart = document.getElementById('navcart');
const label = document.getElementById('totalprice');
const hamburger = document.getElementById('hamburger');
const navItems = document.getElementById('navitems');
const user = document.querySelector('.dropdown-user');
const list = document.querySelector('.dropdown-list');
const checkout = document.getElementById('btn-checkout');
const checkoutMenu = document.getElementsByClassName('checkout-menu');
const navLink = document.getElementsByClassName('nav-link');

const navLinks = Array.from(navLink);

// Hamburger
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('hamburger-active');
  navItems.classList.toggle('hidden');
});

//  Navbar Menu DropDown
user.addEventListener('mouseover', ()=> {
  list.style.display = "block";
});

user.addEventListener('mouseout', ()=> {
  list.style.display = "none";
});

navCart.addEventListener('click', () => {
  cartBody.classList.remove('hidden')
});

closeBtn.addEventListener('click', () => {
  cartBody.classList.add('hidden')
});

let menuData = menuItemsData;

// menu view 
let generateMenu = () => {
  return (cardsMenu.innerHTML = menuData.map((x) => {
    let { id, img, name, price } = x;
    let search = basket.find((x) => x.id === id) || [];
    return `
    <div id=product-id-${id} class="menu-list">
      <ul role="list" class="-my-6 divide-y divide-gray-200">
        <li class="flex py-6">
          <div class="img-content-menu">
            <img src=${img} class="cart-img">
          </div>
          <div class="ml-4 flex flex-1 flex-col">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a id="cart-tittle" href="#">${name}</a>
              </h3>
              <p id="cart-price" ml-4">Rp.${price}</p>
            </div>
            <div class="px-4 py-2 flex items-center">
            <img id="logocart" class="w-[25px] mr-4" src="/Assets/cart3.svg" alt="cart">
            <img onclick="decrement(${id})" class="decrement" src="/Assets/minus.svg">
            <div id=${id} class="quantitys">
            ${search.item === undefined ? 0 : search.item}
            </div>
            <img onclick="increment(${id})" class="increment" src="/Assets/plus.svg">
          </div>
          </div>
        </li>
      </ul>
    </div>      
  `
  }).join(''))
};

generateMenu();

let GenerateCartItems = () => {
  if (basket.length !== 0) {
    return (cartContent.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let = search = menuData.find((y) => y.id === id) || [];
      return `
      <div class="checkout-menu flow-root">
      <ul role="list" class="-my-6 divide-y divide-gray-200">
        <li class="flex py-6">
          <div class="img-content-menu">
            <img src=${search.img} class="cart-img">
          </div>
          <div class="ml-4 flex flex-1 flex-col">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a id="cart-tittle" class="cart-tittle" href="#">${search.name}</a>
              </h3>
              <p id="cart-price" class="cart-price ml-4">Rp.${search.price}</p>
            </div>
            <div class="flex flex-1 items-end justify-between text-sm">
              <p id="quantity" class="quantity">Jumlah Item : ${item}</p>
              <div class="flex">
                <button onclick="removeItem(${id})" type="button"
                  class="font-medium text-slate-800 bg-gray-200 hover:text-teal-500">Remove</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>      
      `
    }).join(''))
  } else {
    cartContent.innerHTML = ``;
  }
};

GenerateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  };
  update(selectedItem.id);
  GenerateCartItems();
  localStorage.setItem('data', JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  };
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  GenerateCartItems();
  localStorage.setItem('data', JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  generateMenu();
  GenerateCartItems();
  TotalAmount();
  calculation();
};

let removeItem = (id) => {
  let selectedItem = id;

  basket = basket.filter((x) => x.id !== selectedItem.id);
  GenerateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem('data', JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let { item, id } = x;
      let = search = menuData.find((y) => y.id === id) || [];
      return item * search.price;
    }).reduce((x, y) => x + y, 0);
    label.innerHTML = `
      <div>Rp. ${amount}</div>   
       `
  } else return;
};

TotalAmount();

let calculation = () => {
  let cartAmount = document.getElementById('cartamount');
  cartAmount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

// Tombol Navigasi Menu
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const kategori = e.target.getAttribute("data-kategori");
    menuData = menuItemsData.filter((item) => item.kategori === kategori);
    generateMenu();
    GenerateCartItems();
  });
});

// Menampilkan nama pengguna jika login


// Client Ke Server
checkout.addEventListener('click', () => {
  const db = []
    let meja = document.getElementById("meja");
    let index = meja.selectedIndex;
  for (let i = 0; i < checkoutMenu.length; i++) {
    db.push({
      tittle: checkoutMenu[i].getElementsByClassName('cart-tittle')[0].textContent,
      price: checkoutMenu[i].getElementsByClassName('cart-price')[0].textContent,
      quantity: checkoutMenu[i].getElementsByClassName('quantity')[0].textContent,
      meja: meja.options[index].value
    });
  }

  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(db)
  })
    .then(response => {
      if (response.ok) {
        console.log('Data berhasil dikirim');
      }
    });
  console.log(db);
});



