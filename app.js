const form = document.querySelector('#items-form');
const itemsList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-items');
const filter = document.querySelector('#filter');
const productName = document.querySelector('.input-product');
const productDescription = document.querySelector('.area-description');
const qttItem = document.querySelector('.input-qtt');
const priceItem = document.querySelector('.input-price');

// Clear Items event
clearBtn.addEventListener('click', clearItems);
// DOM Load event
document.addEventListener('DOMContentLoaded', getItems);

function templateItem(data) {
  itemsList.insertAdjacentHTML(
    'beforeend',
    `
  <div class="collection-item">
  <a href="#" class="link-delete">
    <i class="fa fa-remove"></i>
  </a>
  <div class="item-name">${data.productName}</div>
  <div class="item-description">${data.productDescription}</div>
  <div class="item-qtt">${data.qttItem}</div>
  <div class="item-price">${data.priceItem}</div>
  </div> 
  `
  );
}
// Get Items from LS

function getItems() {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function (
    data = {
      productName: productName.value,
      productDescription: productDescription.value,
      qttItem: qttItem.value,
      priceItem: priceItem.value,
    }
  ) {
    itemsList.insertAdjacentHTML(
      'beforeend',
      `
    <div class="collection-item">
    <a href="#" class="link-delete">
      <i class="fa fa-remove"></i>
    </a>
    <div class="item-name">${data.productName}</div>
    <div class="item-description">${data.productDescription}</div>
    <div class="item-qtt">${data.qttItem}</div>
    <div class="item-price">${data.priceItem}</div>
    </div> 
    `
    );
  });
}

function addItem(e) {
  const data = {
    productName: productName.value,
    productDescription: productDescription.value,
    qttItem: qttItem.value,
    priceItem: priceItem.value,
  };

  e.preventDefault();

  templateItem(data);

  productName.value = '';
  productDescription.value = '';
  qttItem.value = null;
  priceItem.value = null;

  storeItemInLocalStorage(data);
}

function storeItemInLocalStorage(item) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.push(item);

  localStorage.setItem('items', JSON.stringify(items));
}

form.addEventListener('submit', addItem, false);

/* const saved = localStorage.getItem('item-collection');

if (saved) {
  itemsList.innerHTML = saved;
} */

itemsList.addEventListener('click', deleteItem);

// Remove Item
function deleteItem(e) {
  if (e.target.parentElement.classList.contains('link-delete')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeItemFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Local Storage
function removeItemFromLocalStorage(itemProduct) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function (item, index) {
    if (itemProduct.textContent === item) {
      item.splice(index, 1);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
}

// Clear Items
function clearItems() {
  itemsList.innerHTML = '';

  // Faster way
  /*  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  } */

  // Clear from Local Storage function call
  clearItemsFromLocalStorage();
}

//Clear items from Local Storage
function clearItemsFromLocalStorage() {
  localStorage.clear();
}
