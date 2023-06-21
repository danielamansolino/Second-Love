// we need a base path that we can use to refer our requets to the location of our routes

const BASE_URL = '/api/users'

export async function signUp(userData) {
    //fetch uses an options object as a secont arg to make a requests
    // this is useful for anyyhing other than a basic GET
    // this means any request that sent data, headers , etc.
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Fetch requires data payloads to be stringified
        // and assigned to a body property on the options object
        body: JSON.stringify(userData)
      });
      // Check if request was successful
      if (res.ok) {
        // res.json() will resolve to the JWT
        return res.json();
      } else {
        throw new Error('Invalid Sign Up');
      }
}

export async function login(credentials) {
  //fetch uses an options object as a secont arg to make a requests
  // this is useful for anyyhing other than a basic GET
  // this means any request that sent data, headers , etc.
  const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Fetch requires data payloads to be stringified
      // and assigned to a body property on the options object
      body: JSON.stringify(credentials)
    });
    // Check if request was successful
    if (res.ok) {
      // res.json() will resolve to the JWT
      return res.json();
    } else {
      throw new Error('Invalid Sign Up');
    }
}