import sendRequest from './send-request';

// const BASE_URL = '/api/items';
const BASE_URL = 'https://second-love-api.onrender.com/api/items';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function getReviewsForItem(itemId) {
  return sendRequest(`${BASE_URL}/${itemId}/reviews`);
}