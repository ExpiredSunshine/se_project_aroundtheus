// -------------------------------------------------------------------------------------
//                                     Imports
// -------------------------------------------------------------------------------------
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

// -------------------------------------------------------------------------------------
//                                  Card Array
// -------------------------------------------------------------------------------------
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
//                               Selectors
// -------------------------------------------------------------------------------------
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileModalClose = document.querySelector("#profile__modal-close");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardForm = document.querySelector("#add-card-form");
const cardAddButton = document.querySelector(".profile__add-button");
const cardModalClose = document.querySelector("#card__modal-close");
const cardTitleInput = document.querySelector("#place-title-input");
const cardURLInput = document.querySelector("#image-URL-input");

const imageModalClose = document.querySelector("#image__modal-close");

const cardList = document.querySelector(".cards__list");

// -------------------------------------------------------------------------------------
//                              UserInfo Instance
// -------------------------------------------------------------------------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

// -------------------------------------------------------------------------------------
//                                 Popup Instances
// -------------------------------------------------------------------------------------
const profileEditPopup = new PopupWithForm("#profile-edit-modal", {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData["name"],
      description: formData["description"],
    });
    profileEditPopup.close();
  },
});
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", {
  handleFormSubmit: (formData) => {
    const cardData = {
      name: formData["title"],
      link: formData["Image URL"],
    };
    const card = createCard(cardData);
    cardSection.addItem(card);
    addCardForm.reset();
    formValidators[addCardForm.getAttribute("name")].resetValidation();
    addCardPopup.close();
  },
});
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

// -------------------------------------------------------------------------------------
//                               Validation
// -------------------------------------------------------------------------------------

const validationSettings = {
  formSelector: ".form-selector",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const formValidators = {};

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

// -------------------------------------------------------------------------------------
//                            Handle Image Click
// -------------------------------------------------------------------------------------
const handleImageClick = (cardData) => {
  imagePopup.open(cardData);
};
// -------------------------------------------------------------------------------------
//                          Card Creation & Rendering
// -------------------------------------------------------------------------------------
function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardList.prepend(card);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

// -------------------------------------------------------------------------------------
//                             Event Listeners
// -------------------------------------------------------------------------------------

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
  formValidators["profile-form"].resetValidation();
  profileEditPopup.open(false);
});

cardAddButton.addEventListener("click", () => {
  addCardForm.reset();
  formValidators[addCardForm.getAttribute("name")].resetValidation();
  addCardPopup.open(true);
});

profileModalClose.addEventListener("click", () => {
  profileEditPopup.close();
});

cardModalClose.addEventListener("click", () => {
  addCardPopup.close();
});

imageModalClose.addEventListener("click", () => {
  imagePopup.close();
});
