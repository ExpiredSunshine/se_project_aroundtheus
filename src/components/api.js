export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  // GET https://around-api.en.tripleten-services.com/v1/cards
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authToken,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => {
        console.log(err);
      });
  }
  // POST https://around-api.en.tripleten-services.com/v1/cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }
}

// GET https://around-api.en.tripleten-services.com/v1/users/me
// PATCH https://around-api.en.tripleten-services.com/v1/users/me
// PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar
// DELETE https://around-api.en.tripleten-services.com/v1/cards/:cardId
// PUT https://around-api.en.tripleten-services.com/v1/cards/:cardId/likes
// DELETE https://around-api.en.tripleten-services.com/v1/cards/:cardId/likes
