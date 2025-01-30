export default class Card {
  constructor(
    { name, link, _id },
    cardTemplate,
    handleImageClick,
    handleTrashClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._cardTemplate = cardTemplate;
    this._handleImageClick = handleImageClick;
    this._handleTrashClick = handleTrashClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._deleteCardModal = document.querySelector("#delete-card-modal");
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
      this._handleTrashClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleCardLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleTrashClick() {
    this._deleteCardModal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  getView() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    return this._element;
  }
}
