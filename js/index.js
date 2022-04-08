const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

let profileEdit = document.querySelector('.profile__edit');
let profileAdd = document.querySelector('.profile__add');
let popupAdd = document.querySelector('.popup_add');
let popupEdit = document.querySelector('.popup_edit');
let popupImage = document.querySelector('.pict');
let closeButtonEdit = document.querySelector('.popup__close_edit');
let closeButtonAdd = document.querySelector('.popup__close_add');
let closeButtonImage = document.querySelector('.popup__close_image');
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
let formEditElement = document.querySelector('.popup__form_edit');
let formAddElement = document.querySelector('.popup__form_add');
let popupName = document.getElementById('name');
let popupAbout = document.getElementById('about');
let popupTitle = document.getElementById('title');
let popupUrl = document.getElementById('url');
let photoTemplate = document.getElementById('photo__template').content;
let photo = document.querySelector('.photo');

const popupOpen = (popup) => {
  popup.classList.add('popup_opened');
}

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', () => popupOpen(popupEdit));
profileAdd.addEventListener('click', () => popupOpen(popupAdd));
closeButtonEdit.addEventListener('click', () => popupClose(popupEdit));
closeButtonAdd.addEventListener('click', () => popupClose(popupAdd));
closeButtonImage.addEventListener('click', () => popupClose(popupImage));

popupName.value = profileTitle.textContent;
popupAbout.value = profileSubtitle.textContent;

function formEditSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupAbout.value;
  popupClose(popupEdit);
}

formEditElement.addEventListener('submit', formEditSubmitHandler);

const activateLikeButton = (evt) => {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('photo__like_active');
};

const disablePhotoCard = (evt) => {
  const eventTarget = evt.target;
  const parent = eventTarget.closest('.photo__item');
  parent.classList.toggle('photo_disable');
};

const activateImagePopup = (evt) => {
  const eventTarget = evt.target;
  popupImage.querySelector('.pict__image').src = eventTarget.src;
  popupImage.querySelector('.pict__image').alt = eventTarget.alt;
  popupImage.querySelector('.pict__caption').textContent = eventTarget.alt;
  popupImage.classList.toggle('popup_opened');
};

const createPhotoCard = (obj) => {
  const userElement = photoTemplate.querySelector('.photo__item').cloneNode(true);
  userElement.querySelector('.photo__image').src = obj['link'];
  userElement.querySelector('.photo__image').alt = obj['name'];
  userElement.querySelector('.photo__title').textContent = obj['name'];
  userElement.querySelector('.photo__like').addEventListener('click', activateLikeButton);
  userElement.querySelector('.photo__trashbin').addEventListener('click', disablePhotoCard);
  userElement.querySelector('.photo__image').addEventListener('click', activateImagePopup);
  return userElement;
}

const elements = initialCards.map(function(obj) {
  return createPhotoCard(obj);
});

photo.append(...elements);

const formAddSubmitHandler = (evt) => {
  evt.preventDefault();
  let newCardData = {name:`${popupTitle.value}`, link:`${popupUrl.value}`};
  photo.prepend(createPhotoCard(newCardData));
  popupClose(popupAdd);
}

formAddElement.addEventListener('submit', formAddSubmitHandler);
