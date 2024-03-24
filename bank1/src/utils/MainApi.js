import { MY_URL } from "./constans";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}


export function authorise(email, password) {
  return fetch(`${MY_URL}/signin`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
}

export function checkTok(token) {
  return fetch(`http://localhost:5000/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(checkResponse)
}

export function register(name, email, password) {
  return fetch(`${MY_URL}/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name, email, password})
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
}

export function updateProfile(name, email) {
  const token = localStorage.getItem("token");
  return fetch(`${MY_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({name, email})
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
}


