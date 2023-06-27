require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');

// IIFE
// Immediately Invoked Function Expression
(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Women Clothes', picture:'https://imgur.com/yDOPADJ.png', sortOrder: 10},
    {name: 'Men Clothes', picture:'https://imgur.com/IpHOXx5.png', sortOrder: 20},
    {name: 'Toys and Collectibles', picture:'https://imgur.com/xDeCJuQ.png', sortOrder: 30},
    {name: 'Accessories', picture:'https://imgur.com/XUmWKRm.png', sortOrder: 40},
    {name: 'Home', picture:'https://imgur.com/DvqGQ2I.png', sortOrder: 50},
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Kytties T-Shirt', picture: 'https://imgur.com/wrF3Fpg.jpg', category: categories[0], price: 15.95, stock: 10},
    {name: 'The Ramones T-Shirt', picture: 'https://imgur.com/1Qpg1VI.jpg', category: categories[0], price: 15.95, stock: 10},
    {name: 'NOFX Tank-Top', picture: 'https://imgur.com/nGXs8Zq.jpg', category: categories[0], price: 15.95, stock: 10},
    {name: 'White Coat', picture: 'https://imgur.com/H5eQV2M.jpg', category: categories[0], price: 79.95, stock: 10},
    {name: 'Green Jumpsuit', picture: 'https://imgur.com/rreGqco.jpg', category: categories[0], price: 20.95, stock: 10},
    {name: 'Black Skirt', picture: 'https://imgur.com/ZfTZjqF.jpg', category: categories[0], price: 15.95, stock: 10},
    {name: 'Pink Hoddie', picture: 'https://imgur.com/ZE817XC.jpg', category: categories[0], price: 30.00, stock: 10},
    {name: 'Black Dress', picture: 'https://imgur.com/eRbzod2.jpg', category: categories[0], price: 29.95, stock: 10},
    {name: 'Mon Blue Jeans', picture: 'https://imgur.com/rtghzWq.jpg', category: categories[0], price: 39.95, stock: 10},
    {name: 'Cats Shirt', picture: 'https://imgur.com/KZQ9OJc.jpg', category: categories[1], price: 29.95, stock: 10},
    {name: 'Dinosaurs Shirt', picture: 'https://imgur.com/OuAU1AR.jpg', category: categories[1], price: 29.95, stock: 10},
    {name: 'Planets T-Shirt', picture: 'https://imgur.com/qE4YagC.jpg', category: categories[1], price: 15.95, stock: 10},
    {name: 'Beach T-Shirt', picture: 'https://imgur.com/wyT5Gx1.jpg', category: categories[1], price: 15.95, stock: 10},
    {name: 'Dinosaurs will Die Shorts', picture: 'https://imgur.com/eAqesMP.jpg', category: categories[1], price: 17.95, stock: 10},
    {name: 'Blue Jeans', picture: 'https://imgur.com/Is4olJk.jpg', category: categories[1], price: 39.95, stock: 10},
    {name: 'Astronaut Shorts', picture: 'https://imgur.com/NMEDuc3.jpg', category: categories[1], price: 17.95, stock: 10},
    {name: 'Happy Face Hoodie', picture: 'https://imgur.com/tqk9tmU.jpg', category: categories[1], price: 40.95, stock: 10},
    {name: 'Black Suit', picture: 'https://imgur.com/Du3PXwh.jpg', category: categories[1], price: 230.95, stock: 10},
    {name: 'Wampa', picture: 'https://imgur.com/ywmGIv8.jpg', category: categories[2], price: 25.95, stock: 10},
    {name: 'Lego R2D2', picture: 'https://imgur.com/BOnZEa7.jpg', category: categories[2], price: 159.95, stock: 10},
    {name: 'Wooden Trooper', picture: 'https://imgur.com/nppfe8L.jpg', category: categories[2], price: 59.95, stock: 10},
    {name: 'Kuchi', picture: 'https://imgur.com/ZZHU8y8.jpg', category: categories[2], price: 20.95, stock: 10},
    {name: 'Louise', picture: 'https://imgur.com/3MfZ8Vn.jpg', category: categories[2], price: 20.95, stock: 10},
    {name: 'Chewbacca Plush', picture: 'https://imgur.com/Cgi89gk.jpg', category: categories[2], price: 29.95, stock: 10},
    {name: 'Chip and Dale', picture: 'https://imgur.com/y0KKB5n.jpg', category: categories[2], price: 20.95, stock: 10},
    {name: 'Mini Pops', picture: 'https://imgur.com/Y69ZpEy.jpg', category: categories[2], price: 200.95, stock: 10},
    {name: 'Princess Snow White', picture: 'https://imgur.com/NbyGS8P.jpg', category: categories[2], price: 3.95, stock: 10},
    {name: 'Minie Bow', picture: 'https://imgur.com/cx7ULQI.jpg', category: categories[3], price: 29.95, stock: 10},
    {name: 'Pin Collection', picture: 'https://imgur.com/Lt8lGgT.jpg', category: categories[3], price: 299.95, stock: 10},
    {name: 'Purple Beanie', picture: 'https://imgur.com/iaa7sNc.jpg', category: categories[3], price: 5.95, stock: 10},
    {name: 'Cat Sunglasses', picture: 'https://imgur.com/R9GclkB.jpg', category: categories[3], price: 29.95, stock: 10},
    {name: 'Cat Hat', picture: 'https://imgur.com/IxBmbBS.jpg', category: categories[3], price: 15.95, stock: 10},
    {name: 'Black Backpack', picture: 'https://imgur.com/PClOtIH.jpg', category: categories[3], price: 69.95, stock: 10},
    {name: 'White Handbag', picture: 'https://imgur.com/yycdndE.jpg', category: categories[3], price: 39.95, stock: 10},
    {name: 'Vader Backpack', picture: 'https://imgur.com/plCo8Te.jpg', category: categories[3], price: 69.95, stock: 10},
    {name: 'Epcot purse', picture: 'https://imgur.com/FKye0Yo.jpg', category: categories[3], price: 59.95, stock: 10},
    {name: 'Cat Planter', picture: 'https://imgur.com/63YYQGU.jpg', category: categories[4], price: 5.95, stock: 10},
    {name: 'Salt and Pepper Light Sabers', picture: 'https://imgur.com/Ms0bZw6.jpg', category: categories[4], price: 29.95, stock: 10},
    {name: 'Popcorn Maker', picture: 'https://imgur.com/wiByFFI.jpg', category: categories[4], price: 99.95, stock: 10},
    {name: 'Vacuum', picture: 'https://imgur.com/ArW3Lqr.jpg', category: categories[4], price: 89.95, stock: 10},
    {name: 'Dinosaur Blanket', picture: 'https://imgur.com/iptUbK5.jpg', category: categories[4], price: 19.95, stock: 10},
    {name: 'Chick Clock', picture: 'https://imgur.com/Fxgxojc.jpg', category: categories[4], price: 9.95, stock: 10},
    
  ]);

  console.log(items)

  process.exit();

})();
