const Review = require('../../models/review');
const Item = require('../../models/item');

async function indexReview(req, res) {
  try {
    const item = await Item.findById(req.params.itemId).populate('reviews');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    const populatedReviews = await Review.populate(item.reviews, { path: 'user', select: 'username' });
    // Populate the reviews with the user data
    console.log('Reviews in indexReview:', populatedReviews);
    res.status(200).json(populatedReviews);
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json(error);
  }
}

async function createReview(req, res) {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    const review = new Review({
      text: req.body.text,
      user: req.user._id,
      rating: req.body.rating,
    });
    await review.save();
    // Push the review into the reviews array of the item
    item.reviews.push(review); 
    await item.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function updateReview(req, res) {
  const { reviewId } = req.params;
  const { user } = req;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    // Check if the user is the creator of the review
    if (review.user.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }
    const item = await Item.findById(review.item);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    // Update the review with the request body
    review.text = req.body.text;
    review.rating = req.body.rating;
    await review.save();

    res.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json(error);
  }
}

async function deleteReview(req, res) {
  const { reviewId } = req.params;
  const { user } = req;
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    // Check if the user is the creator of the review
    if (review.user.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    const item = await Item.findById(review.item);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    // Delete the review
    await review.remove();
    item.reviews.pull(review._id);
    await item.save();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json(error);
  }
}

module.exports = {
  createReview,
  indexReview,
  updateReview,
  deleteReview,
};
