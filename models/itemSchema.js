const Schema = require('mongoose').Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  picture: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  stock: Number,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
  timestamps: true
});

// Calculate the sum of review ratings for an item
itemSchema.methods.calculateTotalRating = function () {
  let totalRating = 0;
  for (const review of this.reviews) {
    totalRating += review.rating;
  }
  return totalRating;
};

// Calculate the average rating for an item
itemSchema.methods.calculateAverageRating = function () {
  const totalRating = this.calculateTotalRating();
  const numReviews = this.reviews.length;
  if (numReviews === 0) {
    return 0;
  }
  return totalRating / numReviews;
};

module.exports = itemSchema;
