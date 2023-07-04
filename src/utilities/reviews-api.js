import sendRequest from './send-request';

const BASE_URL = '/api';

// Retrieve all reviews
export function getAll() {
  return sendRequest(BASE_URL);
}

// Retrieve reviews for an item
export function getReviewsForItem(itemId) {
  return sendRequest(`${BASE_URL}/items/${itemId}`);
}

// Fetch a single review
export function getReview(reviewId) {
  return sendRequest(`${BASE_URL}/reviews/${reviewId}`)
    .then(response => response.json())
    .then(review => review) // Return the review object
    .catch(error => {
      console.error('Error fetching review details:', error);
      throw error;
    });
}

// Create a new review
export function createReview(reviewData, itemId) {
  return sendRequest(`${BASE_URL}/items/${itemId}/reviews`, 'POST', reviewData);
}

// Update an existing review
export function updateReview(reviewId, reviewData) {
  return sendRequest(`${BASE_URL}/reviews/${reviewId}`, 'PUT', reviewData);
}

// Delete a review
export function deleteReview(reviewId) {
  return sendRequest(`${BASE_URL}/reviews/${reviewId}`, 'DELETE');
}
