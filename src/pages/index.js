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
const profileAboutInput = document.querySelector("#profile-description-input");
const cardAddButton = document.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#card-template");
// -------------------------------------------------------------------------------------
//                                 API Instance
// -------------------------------------------------------------------------------------
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authToken: "b656ee04-ff76-4b23-b20a-1e4991fc7f99",
});

// -------------------------------------------------------------------------------------
//                              UserInfo Instance
// -------------------------------------------------------------------------------------
// populating modal with current written content in profile
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
});
// -------------------------------------------------------------------------------------
//                              Handle Popup Close
// -------------------------------------------------------------------------------------
function resetAndClosePopup(popupInstance) {
  const form = popupInstance.getForm();
  form.reset();
  formValidators[form.getAttribute("name")].toggleButtonState();
  popupInstance.close();
}

// -------------------------------------------------------------------------------------
//                         Inital UserInfo Population
// -------------------------------------------------------------------------------------
function fetchProfileData() {
  return api.getProfileData();
}
function populateProfile(data) {
  userInfo.setUserInfo({
    name: data.name,
    about: data.about,
  });
}
fetchProfileData()
  .then((data) => {
    populateProfile(data);
  })
  .catch((error) => {
    console.error("Failed to fetch profile data:", error);
  });
// -------------------------------------------------------------------------------------
//                              Editing UserInfo
// -------------------------------------------------------------------------------------

function patchProfileDataToApi(userInfo) {
  return api.editProfileData(userInfo).catch((error) => {
    console.log("Failed to update profile data:", error);
    throw error;
  });
}

function updateUserProfile(data) {
  userInfo.setUserInfo({
    name: data.name,
    about: data.about,
  });
}

const profileEditPopup = new PopupWithForm("#profile-edit-modal", {
  handleFormSubmit: (userInfo) => {
    const isUploading = true;
    profileEditPopup.toggleUploadIndicator(isUploading);
    patchProfileDataToApi(userInfo)
      .then((userInfo) => {
        updateUserProfile(userInfo);
        resetAndClosePopup(profileEditPopup);
      })
      .catch((error) => {
        console.log("Error updating Profile:", error);
      })
      .finally(() => {
        profileEditPopup.toggleUploadIndicator(false);
      });
  },
});
profileEditPopup.setEventListeners();

// -------------------------------------------------------------------------------------
//                              Image Popup
// -------------------------------------------------------------------------------------

const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

// -------------------------------------------------------------------------------------
//                           Add new Card to DOM and API
// -------------------------------------------------------------------------------------
function postCardToApi(cardData) {
  return api.addCard(cardData).catch((error) => {
    console.log("Failed to add card to the API:", error);
    throw error;
  });
}

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate);
  return card.getView();
}

function addCardToSection(card) {
  const cardSection = new Section({}, ".cards__list");
  cardSection.prependItem(card);
}

const addCardPopup = new PopupWithForm("#add-card-modal", {
  handleFormSubmit: (formData) => {
    const cardData = {
      name: formData["title"],
      link: formData["Image URL"],
    };

    const isUploading = true;
    addCardPopup.toggleUploadIndicator(isUploading);

    postCardToApi(cardData)
      .then((apiCardData) => {
        const card = createCard(apiCardData);
        addCardToSection(card);
        resetAndClosePopup(addCardPopup);
      })
      .catch((error) => {
        console.log("Error adding card:", error);
      })
      .finally(() => {
        addCardPopup.toggleUploadIndicator(false);
      });
  },
});

addCardPopup.setEventListeners();

// -------------------------------------------------------------------------------------
//                      Card Creation & Rendering from API
// -------------------------------------------------------------------------------------
function fetchCardList() {
  return api.getCardList();
}

function createCards(cardList, cardTemplate) {
  return cardList.map((cardData) => {
    const card = new Card(cardData, cardTemplate, (cardData) => {
      imagePopup.open(cardData);
    });
    return card.getView();
  });
}

function initializeCardSection(cards) {
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
//                                 Validation
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
//                             Event Listeners
// -------------------------------------------------------------------------------------
profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileAboutInput.value = about;
  formValidators["profile-form"].resetValidation();
  profileEditPopup.open();
});

cardAddButton.addEventListener("click", () => {
  addCardPopup.open(true);
});

// deleteCardButton.addEventListener("click", () => {
//   deleteCardModal.open(true);
// });
