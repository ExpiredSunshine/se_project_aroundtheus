export default class Card {
  constructor({ name, link }, cardTemplate, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleImageClick = handleImageClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._setEventListeners();
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleCardLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleCardDelete() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    return this._element;
  }
}
