'use strict';

Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Product.allProducts = [];
var productnumber = document.getElementById('productnumber');
var btn = document.getElementById('addtocart');
var products = document.getElementById('products');
var itemList = document.getElementById('item-list');


//constructor function for all products
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  Product.allProducts.push(this);
}

// instantiating new Products with a for loop
for (var i = 0; i < Product.names.length; i++) {
  if (Product.names[i] === 'usb') {
    new Product(Product.names[i], 'images/' + Product.names[i] + '.gif');
  } else {
    new Product(Product.names[i], 'images/' + Product.names[i] + '.jpg');
  }
}

if(localStorage.productnumber) {
  var quantity = localStorage.productnumber.split(',');
} else {
  var quantity = [];
}

if(locaStorage.item) {
  var item = localStorage.products.split(',');
} else {
  var item = [];
}

function save() {
  quantity.push(productnumber.value);
  console.log('quantity: ' + productnumber.value);
  item.push(products.value);
  console.log('item is: ' + products.value);
}

function create() {
  var selection = products.value;
  var liEl = document.createElement('li');
  liEl.appendChild(document.createTextNode(selection));
  itemList.appendChild(liEl);
  selection.value = null;
  // a delete button
  //
}

