const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');

const lineItemSchema = new Schema({
    // Set qty to 1 when new item pushed into lineItems
    qty: { 
        type: Number, 
        default: 1 
    },
    item: itemSchema
}, {
    timestamps: true,
    // Add this to ensure virtuals are serialized
    // this is to make sure that we run res.json(items) we 
    // keep the virtuals so we can use them in the front end
    toJSON: { virtuals: true } 
});

// We will be able to call this function from the frontend
// to get back a total price for the order
lineItemSchema.virtual('extPrice').get(function () {
    // 'this' is bound to the lineItem subdocument
    return this.qty * this.item.price;
});

const orderSchema = new Schema({
    // An order belongs to a user
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // Makes sense to embed an order's line items
    lineItems: [lineItemSchema],
    // A user's unpaid order is their "cart"
    isPaid: { type: Boolean, default: false },
},{
    timestamps: true,
    toJSON: { virtuals: true }
});

// Add the following helpful virtuals to order documents
orderSchema.virtual('orderTotal').get(function () {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
  });
  
orderSchema.virtual('totalQty').get(function () {
    return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

orderSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase();
});

// statics are callable on the model, not an instance (document)
// getCart is kalesoup - whatever we want to call this function will be in the getCart place.
// If we wanted to call this getOrder we would jusr replace the name
orderSchema.statics.getCart = function(userId) {
    // 'this' is bound to the model (don't use an arrow function)
    // return the promise that resolves to a cart (the user's unpaid order)
    return this.findOneAndUpdate(
      // query
      { user: userId, isPaid: false },
      // update - in the case the order (cart) is upserted
      { user: userId },
      // upsert option creates the doc if it doesn't exist!
      { upsert: true, new: true }
    );
  };

// // Instance method for adding an item to a cart (unpaid order)
// orderSchema.methods.addItemToCart = async function(itemId) {
//     // 'this' keyword is bound to the cart (order doc)
//     const cart = this;
//     // Check if the item already exists in the cart
//     // if there is a line already (hotdog) we want to increase the number of items (hotdog)
//     // Mongoose id are unique so we HAVE TO use equals method to compare
//     const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
//     if (lineItem) {
//       // It already exists, so increase the qty
//       lineItem.qty += 1;
//     } else {
//         // if there is not line or !already a hotdog in there we want to add it 
//       // Get the item from the "catalog"
//       // Note how the mongoose.model method behaves as a getter when passed one arg vs. two
//       const Item = mongoose.model('Item');
//       //because this items are mongoose documents we have to get them someway. Hence .findById
//       const item = await Item.findById(itemId);
//       // The qty of the new lineItem object being pushed in defaults to 1
//       cart.lineItems.push({ item });
//     }
//     // return the save() method's promise
//     // we always want to save our document when we modify it
//     return cart.save();
// };

// this function just decreases the stock by 1 for order 
// orderSchema.methods.addItemToCart = async function(itemId) {
//   const cart = this;
//   const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
//   if (lineItem) {
//       lineItem.qty += 1;
//   } else {
//       const Item = mongoose.model('Item');
//       const item = await Item.findById(itemId);
//       if (item.stock <= 0) {
//           throw new Error('Item is out of stock.');
//       }
//       cart.lineItems.push({ item });
//       item.stock -= 1; 
//       await item.save(); 
//   }
//   return cart.save();
// };


//this function is working 
// orderSchema.methods.addItemToCart = async function(itemId) {
//   const cart = this;
//   const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  
//   if (lineItem) {
//     lineItem.qty += 1;
//   } else {
//     const Item = mongoose.model('Item');
//     const item = await Item.findById(itemId);
    
//     if (item.stock <= 0) {
//       throw new Error('Item is out of stock.');
//     }
//     cart.lineItems.push({ item, qty: 1 });
//     item.stock -= 1; 
    
//     await item.save();
//   }
  
//   return cart.save();
// };

orderSchema.methods.addItemToCart = async function(itemId) {
  const cart = this;
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  
  if (lineItem) {
    lineItem.qty += 1;
  } else {
    const Item = mongoose.model('Item');
    const item = await Item.findById(itemId);
    
    if (item.stock <= 0) {
      throw new Error('Item is out of stock.');
    }
    
    cart.lineItems.push({ item, qty: 1 });
    item.stock -= 1; 
    
    await item.save();
  }
  
  return cart.save();
};



// orderSchema.methods.addItemToCart = async function(itemId) {
//     const cart = this;
//     const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
//   console.log('this is lineItem in addItemToCart', lineItem)
//     if (lineItem) {
//       lineItem.qty += 1;
//     } else {
//       const Item = mongoose.model('Item');
//       const item = await Item.findById(itemId);
  
//       if (item.stock < qty) {
//         throw new Error('Insufficient stock.');
//       }
  
//       cart.lineItems.push({ item, qty });
//       item.stock -= qty;
//       await item.save();
//     }
  
//     return cart.save();
//   };
  


// This function is working 
// Instance method to set an item's qty in the cart (will add item if does not exist)
// orderSchema.methods.setItemQty = async function(itemId, newQty) {
//   console.log('this is itemId', itemId)
//   console.log('this is newQty', newQty)
//     // this keyword is bound to the cart (order doc)
//     const cart = this;
//     // Find the line item in the cart for the menu item
//     const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
//     if (lineItem && newQty <= 0) {
//       // Calling deleteOne(), removes itself from the cart.lineItems array
//       // Note that video shows remove(), which has been removed 😀 in Mongoose v7
//       lineItem.deleteOne();
//     } else if (lineItem) {
//       // Set the new qty - positive value is assured thanks to prev if
//       lineItem.qty = newQty;
//       const Item = mongoose.model('Item');
//       const item = await Item.findById(itemId);
//       if (item.stock <= 0) {
//         throw new Error('Item is out of stock.');
//       }
//       item.stock -= 1; 
      
//       await item.save();
//     }
//     // return the save() method's promise
//     return cart.save();
// };

// orderSchema.methods.setItemQty = async function(itemId, newQty) {
//   const cart = this;
//   const lineItemIndex = cart.lineItems.findIndex(lineItem => lineItem.item._id.equals(itemId));
  
//   if (lineItemIndex !== -1 && newQty <= 0) {
//     // Remove the line item from the array using splice
//     const lineItem = cart.lineItems[lineItemIndex];
//     cart.lineItems.splice(lineItemIndex, 1);

//     const Item = mongoose.model('Item');
//     const item = await Item.findById(itemId);
//     item.stock += lineItem.qty; // Add the previous quantity back to the stock
//     await item.save();
//   } else if (lineItemIndex !== -1) {
//     const lineItem = cart.lineItems[lineItemIndex];
//     const difference = newQty - lineItem.qty; // Calculate the difference in quantity

//     const Item = mongoose.model('Item');
//     const item = await Item.findById(itemId);

//     if (item.stock < difference) {
//       throw new Error('Insufficient stock.');
//     }

//     item.stock -= difference; // Adjust the stock based on the quantity difference
//     await item.save();

//     lineItem.qty = newQty; // Set the new quantity
//   }
  
//   return cart.save();
// };

// orderSchema.methods.setItemQty = async function(itemId, newQty) {
//   const cart = this;
//   const lineItemIndex = cart.lineItems.findIndex(lineItem => lineItem.item._id.equals(itemId));

//   if (lineItemIndex !== -1 && newQty <= 0) {
//     // Remove the line item from the array using splice
//     const lineItem = cart.lineItems[lineItemIndex];
//     cart.lineItems.splice(lineItemIndex, 1);

//     const Item = mongoose.model('Item');
//     const item = await Item.findById(itemId);
//     item.stock += lineItem.qty; // Add the previous quantity back to the stock
//     await item.save();
//   } else if (lineItemIndex !== -1) {
//     const lineItem = cart.lineItems[lineItemIndex];
//     const difference = newQty - lineItem.qty; // Calculate the difference in quantity

//     const Item = mongoose.model('Item');
//     const item = await Item.findById(itemId);

//     if (item.stock < difference) {
//       throw new Error('Insufficient stock.');
//     }

//     item.stock -= difference; // Adjust the stock based on the quantity difference
//     await item.save();

//     lineItem.qty = newQty; // Set the new quantity
//   }

//   return cart.save();
// };

orderSchema.methods.setItemQty = async function(itemId, newQty) {
  const cart = this;
  const lineItemIndex = cart.lineItems.findIndex(lineItem => lineItem.item._id.equals(itemId));

  if (lineItemIndex !== -1 && newQty <= 0) {
    // Remove the line item from the array using splice
    const lineItem = cart.lineItems[lineItemIndex];
    cart.lineItems.splice(lineItemIndex, 1);

    const Item = mongoose.model('Item');
    const item = await Item.findById(itemId);
    item.stock += lineItem.qty; // Add the previous quantity back to the stock
    await item.save();
  } else if (lineItemIndex !== -1) {
    const lineItem = cart.lineItems[lineItemIndex];
    const difference = newQty - lineItem.qty; // Calculate the difference in quantity

    const Item = mongoose.model('Item');
    const item = await Item.findById(itemId);

    if (item.stock < difference) {
      throw new Error('Insufficient stock.');
    }

    item.stock -= difference; // Adjust the stock based on the quantity difference
    await item.save();

    lineItem.qty = newQty; // Set the new quantity
  }

  return cart.save();
};

module.exports = mongoose.model('Order', orderSchema )