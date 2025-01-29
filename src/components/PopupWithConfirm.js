import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleCardDelete) {
    super(popupSelector);
  }
  open() {
    super.open();
  }
  // _handleCardDelete() {
  //   this._deleteCardModal.classList.add("modal_opened");
  //   document.addEventListener("keydown", this._handleEscClose);
  // }

  // this._deleteButton.addEventListener("click", () => {
  //   this._handleCardDelete();
  // });
  // _handleCardDelete() {
  //   console.log("Card Deleted from DOM");
  //   this._element.remove();
  //   this._element = null;
  // }

  // this is the API call to delete the card
  // this is for removing the card from the dom
}
