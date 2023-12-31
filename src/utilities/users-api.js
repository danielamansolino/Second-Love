// we need a base path that we can use to refer our requets to the location of our routes
import sendRequest from "./send-request"
// const BASE_URL = '/api/users'
const BASE_URL = 'https://second-love-api.onrender.com/api/users'

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}
