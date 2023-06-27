// to import all name exports we use this syntax 
// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from 
import * as usersApi from './users-api';

export async function signUp(userData) {
  console.log('this is userData in service', userData)
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersApi.signUp(userData);
    // save the token in local storage
    localStorage.setItem('token', token);
    // Baby step by returning whatever is sent back by the server
    // we'll retunr the token that we recived from the api
    return getUser();
  }

export async function login(credentials) {
  try {
    const token = await usersApi.login(credentials)
    localStorage.setItem('token', token)
    return getUser()

  } catch {
    throw new Error('Bad Credentials')
  }
}
// logout -> deletes the tokes from our local storage
export function logOut() {
  localStorage.removeItem('token');
}
// users-service.js
// get token function -> assesses the token in local storage
export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem('token');
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem('token');
    return null;
  }
  return token;
}


// getUser function -> parses the data from the token's payload
export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}



// export function checkToken() {
//    // Just so that you don't forget how to use .then
//    return usersApi.checkToken()
//    // checkToken returns a string, but let's 
//    // make it a Date object for more flexibility
//     .then(dateStr => new Date(dateStr));
// }