export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardTemplate,
    handleImageClick,
    handleTrashClick,
    api
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isLiked = isLiked;
    this._cardTemplate = cardTemplate;
    this._handleImageClick = handleImageClick;
    this._handleTrashClick = handleTrashClick;
    this._api = api;
    this.element = this._getTemplate();
    this.likeButton = this.element.querySelector(".card__like-button");
    this._deleteButton = this.element.querySelector(".card__delete-button");
    this._cardImage = this.element.querySelector(".card__image");
    this._cardTitle = this.element.querySelector(".card__title");
    this._setEventListeners();
  }

  _getTemplate() {
    const cardElement = this._cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this.likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleTrashClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeClick() {
    if (this.isLiked) {
      this._api
        .unlikeCard(this._id)
        .then(() => {
          this.isLiked = false;
          this._updateLikeButton();
        })
        .catch((error) => console.error("Error unliking card:", error));
    } else {
      this._api
        .likeCard(this._id)
        .then(() => {
          this.isLiked = true;
          this._updateLikeButton();
        })
        .catch((error) => console.error("Error liking card:", error));
    }
  }

  _updateLikeButton() {
    this.likeButton.classList.toggle("card__like-button_active", this.isLiked);
  }

  getView() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    if (this.isLiked) {
      this.likeButton.classList.add("card__like-button_active");
    }
    return this.element;
  }
}
