export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  toggleUploadIndicator(isUploading) {
    if (isUploading) {
      this._submitButton.textContent = "Saving...";
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = "Save";
      this._submitButton.disabled = false;
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (event) => {
      if (
        event.target.classList.contains("modal") ||
        event.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
