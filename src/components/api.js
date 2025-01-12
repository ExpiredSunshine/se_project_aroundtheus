export default class Api {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }
}

// GET https://around-api.en.tripleten-services.com/v1/users/me
// PATCH https://around-api.en.tripleten-services.com/v1/users/me
// PATCH https://around-api.en.tripleten-services.com/v1/users/me/avatar
// GET https://around-api.en.tripleten-services.com/v1/cards
// POST https://around-api.en.tripleten-services.com/v1/cards
// DELETE https://around-api.en.tripleten-services.com/v1/cards/:cardId
// PUT https://around-api.en.tripleten-services.com/v1/cards/:cardId/likes
// DELETE https://around-api.en.tripleten-services.com/v1/cards/:cardId/likes
