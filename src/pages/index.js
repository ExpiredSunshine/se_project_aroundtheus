// -------------------------------------------------------------------------------------
// Imports
// -------------------------------------------------------------------------------------
import { validationSettings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import API from "../components/API.js";
import "../pages/index.css";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

// -------------------------------------------------------------------------------------
// Selectors
// -------------------------------------------------------------------------------------
const profileEditButton = document.querySelector("#profile__edit-button");
const profileNameInput = document.querySelector("#profile-name-input");
const avatarURLInput = document.querySelector("#image-URL-input");
const profileAboutInput = document.querySelector("#profile-description-input");
const avatarEditButton = document.querySelector(".profile__image-container");
const cardAddButton = document.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#card-template");

// -------------------------------------------------------------------------------------
// Image Popup Instance
// -------------------------------------------------------------------------------------
const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

// -------------------------------------------------------------------------------------
// API Instance
// -------------------------------------------------------------------------------------
const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "b656ee04-ff76-4b23-b20a-1e4991fc7f99",
    "Content-Type": "application/json",
  },
});

// -------------------------------------------------------------------------------------
// UserInfo Instance
// -------------------------------------------------------------------------------------
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// -------------------------------------------------------------------------------------
// Create Card function
// -------------------------------------------------------------------------------------
function createCard(cardData) {
  const card = new Card(
    cardData,
    cardTemplate,
    (data) => imagePopup.open(data),
    handleTrashClick,
    api
  );
  card.setLikedState(cardData.isLiked);
  return card;
}

// -------------------------------------------------------------------------------------
// Inital UserInfo Population
// -------------------------------------------------------------------------------------
api
  .getProfileData()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
    });
  })
  .catch((error) => {
    console.error("Failed to fetch profile data:", error);
  });

// -------------------------------------------------------------------------------------
// Editing UserInfo Popup
// -------------------------------------------------------------------------------------
const profileEditPopup = new PopupWithForm("#profile-edit-modal", {
  handleFormSubmit: (formData) => {
    profileEditPopup.toggleUploadIndicator(true);

    api
      .editProfileData(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
        profileEditPopup.getForm().reset();
        profileEditPopup.close();
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
// Editing UserAvatar Popup
// -------------------------------------------------------------------------------------
const avatarEditPopup = new PopupWithForm("#avatar-edit-modal", {
  handleFormSubmit: (formData) => {
    const avatarURL = formData["Image URL"];
    avatarEditPopup.toggleUploadIndicator(true);

    api
      .editUserAvatar({ avatar: avatarURL })
      .then((data) => {
        userInfo.setUserInfo({
          avatar: data.avatar,
        });
        avatarEditPopup.getForm().reset();
        avatarEditPopup.close();
      })
      .catch((error) => {
        console.log("Error updating Avatar:", error);
      })
      .finally(() => {
        avatarEditPopup.toggleUploadIndicator(false);
      });
  },
});

avatarEditPopup.setEventListeners();

// -------------------------------------------------------------------------------------
// Card Section Instance
// -------------------------------------------------------------------------------------
const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardSection.appendItem(card.getView());
    },
  },
  ".cards__list"
);

// -------------------------------------------------------------------------------------
// Initial Card Creation & Rendering from API
// -------------------------------------------------------------------------------------
api
  .getCardList()
  .then((cardList) => {
    cardSection.renderItems(cardList);
  })
  .catch((error) => {
    console.error("Failed to fetch or render cards:", error);
  });

// -------------------------------------------------------------------------------------
// Additional Card adding to API & DOM
// -------------------------------------------------------------------------------------
const addCardPopup = new PopupWithForm("#add-card-modal", {
  handleFormSubmit: (formData) => {
    const cardData = {
      name: formData["title"],
      link: formData["Image URL"],
    };

    addCardPopup.toggleUploadIndicator(true);

    api
      .addCard(cardData)
      .then((apiCardData) => {
        const card = createCard(apiCardData).getView();
        cardSection.prependItem(card);
        const validator = formValidators["add-card-form"];
        validator.resetValidation();
        addCardPopup.getForm().reset();
        addCardPopup.close();
      })
      .catch((error) => console.error("Error adding card:", error))
      .finally(() => addCardPopup.toggleUploadIndicator(false));
  },
});

addCardPopup.setEventListeners();

// -------------------------------------------------------------------------------------
// Card deletion from API & DOM
// -------------------------------------------------------------------------------------
const deleteCardModal = new PopupWithConfirm("#delete-card-modal", () => {});
deleteCardModal.setEventListeners();

function handleTrashClick(card) {
  deleteCardModal.open();
  deleteCardModal.setSubmitHandler(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.element.remove();
        card.element = null;
        deleteCardModal.close();
      })
      .catch((error) => console.error("Failed to delete card:", error));
  });
}

// -------------------------------------------------------------------------------------
// Validation
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
// Event Listeners
// -------------------------------------------------------------------------------------
profileEditButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileAboutInput.value = about;
  formValidators["profile-form"].resetValidation();
  profileEditPopup.open();
});

avatarEditButton.addEventListener("click", () => {
  const { avatar } = userInfo.getUserInfo();
  avatarURLInput.value = avatar;
  formValidators["avatar-form"].resetValidation();
  avatarEditPopup.open();
});

cardAddButton.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  addCardPopup.open();
});
