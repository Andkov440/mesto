import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards,
    validationParameters,
    profileAddButton,
    profileEditButton,
    titleInput,
    descriptionInput,
    formEditElement,
    formAddElement } from '../utils/constants.js';

import './index.css';

const zoomPopup = new PopupWithImage('.popup-picture');
zoomPopup.setEventListeners();

const createNewCard = function createNewCard(data) {
  const card = new Card({data,
    handleCardClick: (cardname, link) => {
      zoomPopup.open(cardname, link);
    }
  }, '#photo__template');
  const cardElement = card.generateCard();
  return cardElement;
}

const defaultCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const cardElements = createNewCard(item);
    defaultCardList.addItem(cardElements);
  }
}, '.photo');
defaultCardList.renderItems();

const popupFormEdit = new PopupWithForm (
  {
    callbackSubmit: (data) => {
      createUserInfo.setUserInfo(data);
      popupFormEdit.close();
    }
  }, '.popup_edit');
popupFormEdit.setEventListeners();

const popupFormAdd = new PopupWithForm (
  {
    callbackSubmit: (data) => {
      console.log(data);
      const cardFromPopup = createNewCard(data);
      console.log(cardFromPopup);
      defaultCardList.addItem(cardFromPopup);
      popupFormAdd.close();
    }
  }, '.popup_add');

popupFormAdd.setEventListeners();

const createUserInfo = new UserInfo('.profile__title', '.profile__subtitle');

function editProfile() {
  const profileData = createUserInfo.getUserInfo();
  titleInput.value = profileData.name;
  descriptionInput.value = profileData.about;
  popupFormEdit.open();
}

profileEditButton.addEventListener('click', () => {
  validateAddCardForm.resetValidation();
  editProfile();
});

profileAddButton.addEventListener('click', () => {
  validateAddCardForm.resetValidation();
  popupFormAdd.open();
});

const validateEditProfileForm = new FormValidator(validationParameters, formEditElement);
const validateAddCardForm = new FormValidator(validationParameters, formAddElement);

validateEditProfileForm.enableValidation();
validateAddCardForm.enableValidation();
