class Item {
  constructor(productName, productDescription, qttItem, priceItem) {
    this.productName = productName;
    this.productDescription = productDescription;
    this.qttItem = qttItem;
    this.priceItem = priceItem;
  }
}

class UI {
  addItemToList(item) {
    const itemsList = document.querySelector('.collection');
    // Create card element
    const card = document.createElement('div');
    // Add Class to card element
    card.className = 'collection-item';
    // Insert Cards
    card.innerHTML = `
        <a href="#" class="link-delete">
        <i class="fa fa-remove"></i>
        </a>
        <div class="item-name">${item.productName}</div>
        <div class="item-description">${item.productDescription}</div>
        <div class="item-qtt">${item.qttItem}</div>
        <div class="item-price">${item.priceItem}</div> 
        `;

    itemsList.appendChild(card);
  }
  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classses
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const mainContainer = document.querySelector('.main-container');
    // Get collection
    const container = document.querySelector('.container');
    // Insert Alert
    mainContainer.insertBefore(div, container); //element, variable with class selected

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }
  deleteItem(target) {
    if (target.className === 'fa fa-remove') {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.querySelector('.input-product').value = '';
    document.querySelector('.area-description').value = '';
    document.querySelector('.input-qtt').value = null;
    document.querySelector('.input-price').value = null;
  }
}

// Local Storage Class

class Store {
  static getItems() {
    let items;
    if (localStorage.getItem('items') === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }

    return items;
  }

  static displayItems() {
    const items = Store.getItems();

    items.forEach((item) => {
      const ui = new UI();

      //Add item to UI
      ui.addItemToList(item);
    });
  }

  static addItem(item) {
    const items = Store.getItems();

    items.push(item);

    localStorage.setItem('items', JSON.stringify(items));
  }

  static removeItem(productName) {
    const items = Store.getItems();

    items.forEach((item, index) => {
      if (item.productName === productName) {
        items.splice(index, 1);
      }
    });

    localStorage.setItem('items', JSON.stringify(items));
  }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayItems);

// Event Listeners
document.querySelector('#items-form').addEventListener('submit', function (e) {
  // Get form values
  const productName = document.querySelector('.input-product').value,
    productDescription = document.querySelector('.area-description').value,
    qttItem = document.querySelector('.input-qtt').value,
    priceItem = document.querySelector('.input-price').value;

  // Instantiate Item
  const item = new Item(productName, productDescription, qttItem, priceItem);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (
    productName === '' ||
    productDescription === '' ||
    qttItem === '' ||
    priceItem === ''
  ) {
    // Error Alert
    ui.showAlert('Please fill in the fields', 'error');
  } else {
    // Add item to list
    ui.addItemToList(item);
    // Add item to localStorage
    Store.addItem(item);

    // Show success
    ui.showAlert('Product Registered !', 'success');

    // Clear Fields

    ui.clearFields();
  }

  e.preventDefault();
});

// Clear all Items
const clearBtn = document.querySelector('.clear-items');
const itemsList = document.querySelector('.collection');

clearBtn.addEventListener('click', clearItems);

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

// Event Listener for delete
document.querySelector('.collection').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();
  // Delete item
  ui.deleteItem(e.target);

  // Remove from LS
  Store.removeItem(e.target.parentElement.nextElementSibling.textContent);

  e.preventDefault();
});
