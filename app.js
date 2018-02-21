'use strict';

Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

Product.allProducts = [];

var btn = document.getElementById('addtocart');
var checkout = document.getElementById('checkout');
var orderedItemList = document.getElementById('orderedItemList');

var orderedItem = [];

//instead of Cartitem renaming as OrderedItem
function OrderedItem(name, quantity) {
  this.name = name;
  this.quantity = quantity;
  orderedItem.push(this);
}

//constructor function for all products
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  Product.allProducts.push(this);
}

function displayOrderedItemList () {
  var liEl;
  var strOrderedItem = localStorage.getItem('orderedItem');
  var orderedItemStorage = JSON.parse(strOrderedItem);

  for (var i = 0; i<orderedItemStorage.length; i++){
    liEl = document.createElement('li');
    liEl.appendChild(document.createTextNode(orderedItemStorage[i].name + ' ' + orderedItemStorage[i].quantity));
    orderedItemList.appendChild(liEl);
  }
}

function storeLocalStorage(){
  var strOrderedItem = JSON.stringify(orderedItem);
  localStorage.setItem('orderedItem', strOrderedItem);
  console.log(strOrderedItem);
}

function displayCheckoutList() {

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// instantiating new Products with a for loop
for (var i = 0; i < Product.names.length; i++) {
  if (Product.names[i] === 'usb') {
    new Product(Product.names[i], 'images/' + Product.names[i] + '.gif');
  } else {
    new Product(Product.names[i], 'images/' + Product.names[i] + '.jpg');
  }
}

//check if an exisisting cart is present or not
if(localStorage.orderedItem) {
  var strOrderedItem= localStorage.getItem('orderedItem');
  var ordereditems = JSON.parse(strOrderedItem);
  console.log(ordereditems);
  for (var item of ordereditems) {
    console.log(item);
    new OrderedItem(item.name, item.quantity);
  }
  //call helper function to display cart list
  displayOrderedItemList();
}

// Add handler for add to cart button
function addToCartHandler(event) {

  event.preventDefault();
  var prodName = document.getElementById('products').value;
  var prodQuantity = parseInt(document.getElementById('quantity').value);

  if (!prodName) {
    return alert('Please select your product!');
  }

  if(!prodQuantity)
  {
    return alert('Please select your quantity!');
  }

  // Check the condition if cart is empty.
  if (orderedItem.length === 0){
    new OrderedItem(prodName, prodQuantity);
  }
  else{
    for (var j=0; j<orderedItem.length; j++){
      var found = false;
      // Check if the product already exists in the orderdItems by comparing names.
      if( prodName === orderedItem[j].name ){
      // There is a match, product already exists, update the quantity.
        orderedItem[j].quantity += prodQuantity;
        found = true;
      }
      else {
      // There was no match, means this is a new product being added to the orderedItem list
        new OrderedItem(prodName, prodQuantity);
        found = true;
        // break from the for loop - else we will add the quantity twice.
      }
      if (found){
        break;
      }
    }
  }

  // Update local storage
  storeLocalStorage();
  // Update display list.

}

//button is waiting to hear the click and then i call addtoCardHandler
btn.addEventListener('click', addToCartHandler);

// Add handler for checkout button - which should store all the data in local
// storage and then go to the cart.html page.
function checkoutHandler() {
  event.preventDefault();
  storeLocalStorage();
  window.open('cart.html','_self');
  displayCheckoutList();
}

checkout.addEventListener('click', checkoutHandler);
