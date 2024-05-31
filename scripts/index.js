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
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, cardList) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardImage.addEventListener("click", () => {
    imageModalPreview.src = cardData.link;
    imageModalPreview.alt = cardData.name;
    openModal(imageModal);
  });
  return cardElement;
}

initialCards.forEach((cardData) => renderCard(cardData, cardList));
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
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  renderCard({ name, link }, cardList);
  closeModal(addCardModal);
}
// -------------------------------------------------------------------------------------
//                                     Event Listeners
// -------------------------------------------------------------------------------------

// Open Modal Buttons
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

cardAddButton.addEventListener("click", () => openModal(addCardModal));

// Close Modal Buttons
profileModalClose.addEventListener("click", () => closeModal(profileModal));
cardModalClose.addEventListener("click", () => closeModal(addCardModal));
imageModalClose.addEventListener("click", () => closeModal(imageModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);
