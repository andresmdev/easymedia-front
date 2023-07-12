
/* eslint-disable no-unused-vars */
var BASE_URL;
const URL = window.location.href;
const _local = String(URL).includes('localhost');

if (_local) {
  BASE_URL = "http://localhost:3001/api";
}
else {
  BASE_URL = "PRODUCTION_URL";
}

export const session  = `${BASE_URL}/auth/session`;
export const login    = `${BASE_URL}/auth/login`;
export const register = `${BASE_URL}/auth/register`;
export const postData = `${BASE_URL}/post`;
