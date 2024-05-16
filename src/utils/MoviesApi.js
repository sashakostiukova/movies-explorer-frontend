class MoviesApi {
  constructor({url}) {
    this._url = url;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._url + endpoint}`, options)
      .then(this._getResponse)
  }

  getAllMovies() {
      return this._request('/', {
        headers: {
          "Content-Type": "application/json"
        }
      })
  }

}

const apiConfig = {
  url: 'https://api.nomoreparties.co/beatfilm-movies',
};

const moviesApi = new MoviesApi(apiConfig);
export default moviesApi;