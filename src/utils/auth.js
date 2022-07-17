export const baseUrl = "https://auth.nomoreparties.co";

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const validityJWT = (jwt) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
    })
      .then(res => {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
      })
  }