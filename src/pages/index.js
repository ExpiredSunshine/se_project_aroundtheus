// -------------------------------------------------------------------------------------
//                                     Imports
// -------------------------------------------------------------------------------------
import { validationSettings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/api.js";
import "../pages/index.css";

// -------------------------------------------------------------------------------------
//                               Selectors
// -------------------------------------------------------------------------------------
const profileEditButton = document.querySelector("#profile__edit-button");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardForm = document.forms["add-card-form"];
const cardAddButton = document.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#card-template");
// -------------------------------------------------------------------------------------
//                                  Api
// -------------------------------------------------------------------------------------
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "b656ee04-ff76-4b23-b20a-1e4991fc7f99",
});

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
    cardSection.prependItem(card);
    addCardPopup.getForm().reset();
    formValidators[
      addCardPopup.getForm().getAttribute("name")
    ].toggleButtonState();
    addCardPopup.close();
  },
});
addCardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();
// -------------------------------------------------------------------------------------
//                               Validation
// -------------------------------------------------------------------------------------
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
function fetchCardList() {
  console.log("Fetching card list...");
  return api.getCardList();
}

function createCards(cardList, cardTemplate) {
  console.log("Creating card elements...");
  return cardList.map((cardData) => {
    const card = new Card(cardData, cardTemplate);
    return card.getView();
  });
}

function initializeCardSection(cards) {
  console.log("Initializing card section...");
  const cardSection = new Section(
    {
      items: cards,
      renderer: (cardElement) => {
        cardSection.appendItem(cardElement);
      },
    },
    ".cards__list"
  );

  cardSection.renderItems();
}

fetchCardList()
  .then((cardList) => createCards(cardList, cardTemplate))
  .then((cards) => initializeCardSection(cards))
  .catch((error) => {
    console.error("Failed to fetch or render cards:", error);
  });
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
  addCardPopup.open(true);
});
