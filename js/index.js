let profileEdit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
let formElement = popup.querySelector('.popup__form');
let popupName = document.getElementById('name');
let popupAbout = document.getElementById('about');

function popupOpen() {
  popup.classList.add('popup_opened');
  popupName.value = profileTitle.textContent;
  popupAbout.value = profileSubtitle.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupAbout.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
