const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupImage = document.querySelector('.popup-picture');
const popupCloseEditButton = document.querySelector('.popup__close_edit');
const popupCloseAddButton = document.querySelector('.popup__close_add');
const popupCloseImageButton = document.querySelector('.popup__close_image');
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const formEditElement = document.querySelector('.popup__form_edit');
const formAddElement = document.querySelector('.popup__form_add');
const cardsContainer = document.querySelector('.photo');
const titleInputValue = document.querySelector('.popup__name');
const descriptionInputValue = document.querySelector('.popup__about');
const cardNameInputValue = document.querySelector('.popup__caption');
const cardLinkInputValue = document.querySelector('.popup__url');
const photoTemplate = document.getElementById('photo__template').content;

const ESC_KEY = "Escape";

const setInputsValue = () => {
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileSubtitle.textContent;
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
  profileTitle.textContent = titleInputValue.value;
  profileSubtitle.textContent = descriptionInputValue.value;
  closePopup(popupEdit);
}

const changeLikeButton = (evt) => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('photo__like_active');
};

const handleDeleteCard = (evt) => {
  const eventTarget = evt.target;
  const card = eventTarget.closest('.photo__item');
  card.remove();
};

const activateImagePopup = (evt) => {
  const eventTarget = evt.target;
  popupImage.querySelector('.popup-picture__image').src = eventTarget.src;
  popupImage.querySelector('.popup-picture__image').alt = eventTarget.alt;
  popupImage.querySelector('.popup-picture__caption').textContent = eventTarget.alt;
  openPopup(popupImage);
};

const createPhotoCard = (obj) => {
  const userElement = photoTemplate.querySelector('.photo__item').cloneNode(true);
  userElement.querySelector('.photo__image').src = obj['link'];
  userElement.querySelector('.photo__image').alt = obj['name'];
  userElement.querySelector('.photo__title').textContent = obj['name'];
  userElement.querySelector('.photo__like').addEventListener('click', changeLikeButton);
  userElement.querySelector('.photo__trashbin').addEventListener('click', handleDeleteCard);
  userElement.querySelector('.photo__image').addEventListener('click', activateImagePopup);
  return userElement;
}

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const newCardData = {name:`${cardNameInputValue.value}`, link:`${cardLinkInputValue.value}`};
  cardsContainer.prepend(createPhotoCard(newCardData));
  closePopup(popupAdd);
  formAddElement.reset();
}

const elements = initialCards.map((obj) => createPhotoCard(obj));
cardsContainer.append(...elements);

profileEdit.addEventListener('click', () => {setInputsValue(); openPopup(popupEdit);});
profileAdd.addEventListener('click', () => {openPopup(popupAdd);});
popupCloseEditButton.addEventListener('click', () => closePopup(popupEdit));
popupCloseAddButton.addEventListener('click', () => closePopup(popupAdd));
popupCloseImageButton.addEventListener('click', () => closePopup(popupImage));
formEditElement.addEventListener('submit', handleProfileFormSubmit);
formAddElement.addEventListener('submit', handleAddCardFormSubmit);
