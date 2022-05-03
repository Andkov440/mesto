import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './cards.js';

const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupCloseEditButton = document.querySelector('.popup__close_edit');
const popupCloseAddButton = document.querySelector('.popup__close_add');
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const formEditElement = document.querySelector('.popup__form_edit');
const formAddElement = document.querySelector('.popup__form_add');
const cardsContainer = document.querySelector('.photo');
const titleInput = document.querySelector('.popup__name');
const descriptionInput = document.querySelector('.popup__about');

const ESC_KEY = "Escape";

const validationParameters = {
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_error',
  errorClass: 'error'
};

const setInputsValue = () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileSubtitle.textContent;
}

const popupEscapePress = (evt) => {
  if (evt.key === ESC_KEY) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

const closePopupOnOverlayClick = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', popupEscapePress);
  popup.addEventListener('click', closePopupOnOverlayClick);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', popupEscapePress);
  popup.removeEventListener('click', closePopupOnOverlayClick);
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileSubtitle.textContent = descriptionInput.value;
  closePopup(popupEdit);
}

const setButtonDisabled = () => {
  const popupAddInputList = Array.from(popupAdd.querySelectorAll('.popup__input'));
  popupAddInputList.forEach((listItem) => {
    if (listItem.value === '') {
      popupAdd.querySelector('.popup__submit').disabled = true;
    } else {
      popupAdd.querySelector('.popup__submit').disabled = false;
    }
  });
}

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardNameInputValue = document.querySelector('.popup__caption');
  const cardLinkInputValue = document.querySelector('.popup__url');

  const newCardData = {title:` ${cardNameInputValue.value}`, image:` ${cardLinkInputValue.value}`};
  const card = new Card(newCardData, 'photo__template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(popupAdd);
  formAddElement.reset();
}

initialCards.forEach((item) => {
  const card = new Card(item, 'photo__template');
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

profileEdit.addEventListener('click', () => {setInputsValue(); openPopup(popupEdit);});
profileAdd.addEventListener('click', () => {openPopup(popupAdd); setButtonDisabled();});
popupCloseEditButton.addEventListener('click', () => closePopup(popupEdit));
popupCloseAddButton.addEventListener('click', () => closePopup(popupAdd));
formEditElement.addEventListener('submit', handleProfileFormSubmit);
formAddElement.addEventListener('submit', handleAddCardFormSubmit);

const validateEditProfileForm = new FormValidator(validationParameters, formEditElement);
const validateAddCardForm = new FormValidator(validationParameters, formAddElement);

validateEditProfileForm.enableValidation();
validateAddCardForm.enableValidation();

export { openPopup, closePopup };
