import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// -------------------------------------------------------------------------------------
//                                     Elements
// -------------------------------------------------------------------------------------
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.forms["profile-form"];
const profileModalClose = document.querySelector("#profile__modal-close");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardAddButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];
const cardModalClose = document.querySelector("#card__modal-close");
const cardTitleInput = addCardForm.querySelector("#place-title-input");
const cardURLInput = addCardForm.querySelector("#image-URL-input");
const imageModal = document.querySelector("#image-modal");
const imageModalTitle = document.querySelector(".modal__image-title");
const imageModalClose = document.querySelector("#image__modal-close");
const imageModalPreview = document.querySelector(".modal__image");
const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
// -------------------------------------------------------------------------------------
//                                     Functions
// -------------------------------------------------------------------------------------
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

document.querySelectorAll(".modal").forEach((modalOverlay) => {
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal(modalOverlay);
    }
  });
});

function closeModalByEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const handleImageClick = (cardData) => {
  imageModalPreview.src = cardData.link;
  imageModalPreview.alt = cardData.name;
  imageModalTitle.textContent = cardData.name;
  openModal(imageModal);
};

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
}
initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardList.prepend(card);
});

// -------------------------------------------------------------------------------------
//                                     Event Handlers
// -------------------------------------------------------------------------------------

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: cardTitleInput.value,
    link: cardURLInput.value,
  };
  const card = createCard(cardData);
  cardList.prepend(card);
  addCardForm.reset();
  addCardFormValidator._toggleButtonState();
  closeModal(addCardModal);
}
// -------------------------------------------------------------------------------------
//                                     Event Listeners
// -------------------------------------------------------------------------------------

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

cardAddButton.addEventListener("click", () => openModal(addCardModal));

profileModalClose.addEventListener("click", () => closeModal(profileModal));
cardModalClose.addEventListener("click", () => closeModal(addCardModal));
imageModalClose.addEventListener("click", () => closeModal(imageModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
