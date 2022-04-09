const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupImage = document.querySelector('.popup-picture');
const closeButtonEdit = document.querySelector('.popup__close_edit');
const closeButtonAdd = document.querySelector('.popup__close_add');
const closeButtonImage = document.querySelector('.popup__close_image');
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')
const formEditElement = document.querySelector('.popup__form_edit');
const formAddElement = document.querySelector('.popup__form_add');
const photo = document.querySelector('.photo');
const popupName = document.querySelector('.popup__name');
const popupAbout = document.querySelector('.popup__about');
const popupTitle = document.querySelector('.popup__title');
const popupUrl = document.querySelector('.popup__url');
const photoTemplate = document.getElementById('photo__template').content;

const setInputsValue = () => {
  popupName.value = profileTitle.textContent;
  popupAbout.value = profileSubtitle.textContent;
}

const openPopup = (popup) => {
  setInputsValue();
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', () => openPopup(popupEdit));
profileAdd.addEventListener('click', () => openPopup(popupAdd));
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupAbout.value;
  closePopup(popupEdit);
}

formEditElement.addEventListener('submit', handleProfileFormSubmit);

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

const elements = initialCards.map(function(obj) {
  return createPhotoCard(obj);
});

photo.append(...elements);

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  let newCardData = {name:`${popupTitle.value}`, link:`${popupUrl.value}`};
  photo.prepend(createPhotoCard(newCardData));
  closePopup(popupAdd);
  formAddElement.reset();
}

formAddElement.addEventListener('submit', handleAddCardFormSubmit);
