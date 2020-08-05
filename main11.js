// Difine Vars
const form = document.querySelector('#items-form');
const itemsList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-items');
const filter = document.querySelector('#filter');
const productName = document.querySelector('.input-product');
const productDescription = document.querySelector('.area-description');
const qttItem = document.querySelector('.input-qtt');
const priceItem = document.querySelector('.input-price');
const inProduct = [productName, productDescription, qttItem, priceItem];

//console.log(inProduct);

// Load all event listeners
loadEventListeners();

// Load all event listeners

function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getItems);
  // Add item event
  form.addEventListener('submit', addItem);
  // Delete item event
  itemsList.addEventListener('click', deleteItem);
  // Clear Items event
  clearBtn.addEventListener('click', clearItems);
  // filter Items event
  filter.addEventListener('keyup', filterItems);
}

// GetItems from Local Storage
function getItems() {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function (item) {
    // Create div element
    const div = document.createElement('div');
    // Add class
    div.className = 'collection-item';
    // create text node append to div
    div.appendChild(document.createTextNode(item));

    // Create p element
    const pDescription = document.createElement('p');
    // create text node append to div
    pDescription.appendChild(document.createTextNode(productDescription.value));

    // Create p element
    const pqtt = document.createElement('p');
    // create text node append to div
    pqtt.appendChild(document.createTextNode(qttItem.value));

    // Create p element
    const pPrice = document.createElement('p');
    // create text node append to div
    pPrice.appendChild(document.createTextNode(priceItem.value));

    //create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append elements
    div.appendChild(pDescription);
    pDescription.appendChild(pqtt);
    pqtt.appendChild(pPrice);
    pPrice.appendChild(link);

    // append div to main div collection
    itemsList.appendChild(div);
  });
}
// Add Item
function addItem(e) {
  if (productName.value === '') {
    alert('Fill out the empty field');
  }

  // Create div element
  const div = document.createElement('div');
  // Add class
  div.className = 'collection-item';
  // create text node append to div
  div.appendChild(document.createTextNode(productName.value));

  // Create p element
  const pDescription = document.createElement('p');
  // create text node append to div
  pDescription.appendChild(document.createTextNode(productDescription.value));

  // Create p element
  const pqtt = document.createElement('p');
  // create text node append to div
  pqtt.appendChild(document.createTextNode(qttItem.value));

  // Create p element
  const pPrice = document.createElement('p');
  // create text node append to div
  pPrice.appendChild(document.createTextNode(priceItem.value));

  //create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append elements
  div.appendChild(pDescription);
  pDescription.appendChild(pqtt);
  pqtt.appendChild(pPrice);
  pPrice.appendChild(link);

  // append div to main div collection
  itemsList.appendChild(div);

  // Store local storage
  storeIteminLocalstorage(productName.value, productDescription.value);

  //clear input
  productName.value = '';
  productDescription.value = '';

  e.preventDefault();
}

//store item
function storeIteminLocalstorage(item1) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.push(item1);

  localStorage.setItem('items', JSON.stringify(items));
}

// Remove Item
function deleteItem(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();

      // Remove from LS
      removeItemFromLocalStorage(
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement
      );
    }
  }
}

// Remove from Local Storage
function removeItemFromLocalStorage(item) {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }

  items.forEach(function (item) {
    if (item.textContent == item) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem('items', JSON.stringify(items));
}
// Clear Items
function clearItems() {
  // itemsList.innerHTML = '';

  // Faster
  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }

  // Clear from Local Storage
  clearItemsFromLocalStorage();
}

//Clear items from Local Storage
function clearItemsFromLocalStorage() {
  localStorage.clear();
}

// Filter Items
function filterItems(e) {
  const text = e.target.value.toLowerCase();

  document
    .querySelectorAll('.collection-item')
    .forEach(function (itemCollection) {
      const item = itemCollection.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        //if no match is -1
        itemCollection.style.display = 'block'; //is is no equal to -1 do this
      } else {
        itemCollection.style.display = 'none'; //if isn't match is the else and does not display
      }
    });
}
