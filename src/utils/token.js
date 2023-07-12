import jwt_decode from "jwt-decode";

export function getToken(index) {
	return window.localStorage.getItem(index);
}

export function setToken(index, value) {
	window.localStorage.setItem(index, value);
}

export function deleteToken(index) {
	window.localStorage.removeItem(index);
}

export function getValueToken(value) {
  const token = jwt_decode(window.localStorage.getItem('token'));

  return token[value];
}

