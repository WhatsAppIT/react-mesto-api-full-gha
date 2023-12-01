class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._handleResponse);
    }

    changeAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            }),
        }).then(this._handleResponse);
    }

    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    editCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._handleResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    like(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    removeLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    changeAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            }),
        }).then(this._handleResponse);
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.like(cardId);
        } else {
            return this.removeLike(cardId);
        }
    }
}

const api = new Api({
    url: 'https://api.krivolapov.nomoredomainsmonster.ru',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json',
    },
});

export { api };
