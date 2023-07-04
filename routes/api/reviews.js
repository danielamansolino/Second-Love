const express = require('express');
const router = express.Router();
const reviewCtrl = require('../../controllers/api/reviews');

// GET route to retrieve all reviews for an item
router.get('/items/:id/reviews', reviewCtrl.indexReview);

// POST route to create a new review for an item
router.post('/items/:id/reviews', reviewCtrl.createReview);

// PUT route to update a review
router.put('/items/:itemId/reviews/:reviewId', reviewCtrl.updateReview);

// DELETE route to delete a review
router.delete('/items/:itemId/reviews/:reviewId', reviewCtrl.deleteReview);

module.exports = router;
