export const BASE_URL = 'http://localhost:3001';
export const BEATFILM_URL = 'https://api.nomoreparties.co';

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  
  return Promise.reject(`Ошибка: ${res.status}`);
};

export function getSavedMovies(token) {
    return fetch(`${BASE_URL}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  .then((res) => {
    return getResponseData(res)
  })
};

export function createSavedMovie({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  id,
  nameRU,
  nameEN
  }, token) {
    return fetch(`${BASE_URL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: `${BEATFILM_URL}/${image.url}`,
        trailerLink: trailerLink,
        thumbnail: `${BEATFILM_URL}/${image.formats.thumbnail.url}`,
        movieId: id,
        nameRU: nameRU,
        nameEN: nameEN
      })
    })
  .then((res) => {
    return getResponseData(res)
  })
};

export function deleteSavedMovie(movieId, token) {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  .then((res) => {
    return getResponseData(res)
  })
};

export function editProfile({name, email}, token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
  .then((res) => {
    return getResponseData(res)
  })
};