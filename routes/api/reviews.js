const express = require('express');
const router = express.Router();
const reviewCtrl = require('../../controllers/api/review');

// POST route to create a new review
router.post('/', reviewCtrl.createReview);

// GET route to retrieve all review
router.get('/', reviewCtrl.indexReview);

// PUT route to update a review
router.put('/:reviewId', reviewCtrl.updateReview);

// DELETE route to delete a review
router.delete('/:reviewId', reviewCtrl.deleteReview);

module.exports = router;