const Review = require('../../models/review');

async function indexReview(req, res) {
  try {
    const review = await Review.find({ user: req.user._id });
    console.log('Review in indexReview:', review);
    res.status(200).json(review);
  } catch (error) {
    console.error('Error retrieving Review:', error);
    res.status(500).json(error);
  }
}

async function createReview(req, res) {
  console.log('req.body.user in review controllers:', req.body.user);

  try {
    const review = await Review.create({
      text: req.body.text,
      user: req.body.user,
      rating: req.body.rating,
    });
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating Review:', error);
    res.status(500).json(error);
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

    // Delete the review
    await review.remove();

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
