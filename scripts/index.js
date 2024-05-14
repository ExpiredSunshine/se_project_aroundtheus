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
const profileEditButton = document.querySelector("#profile__edit-button");
const profileModal = document.querySelector("#profile-edit-modal");
const profileModalClose = document.querySelector("#modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileModal.querySelector(".modal__form");

// -------------------------------------------------------------------------------------
//                                     Event Listeners
// -------------------------------------------------------------------------------------
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileModal.classList.add("modal__opened");
});

profileModalClose.addEventListener("click", () => {
  closePopup();
});

profileEditForm.addEventListener("submit", handleProfileEditModal);

// -------------------------------------------------------------------------------------
//                                     Event Handlers
// -------------------------------------------------------------------------------------
function handleProfileEditModal(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

// -------------------------------------------------------------------------------------
//                                     Functions
// -------------------------------------------------------------------------------------
function closePopup() {
  profileModal.classList.remove("modal__opened");
}
