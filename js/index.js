let profileEdit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')
let formElement = popup.querySelector('.popup__container');
let popupInputs = popup.querySelectorAll('.popup__input');

profileEdit.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

closeButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

popupInputs[0].value = profileTitle.textContent;
popupInputs[1].value = profileSubtitle.textContent;

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  profileTitle.textContent = popupInputs[0].value;
  profileSubtitle.textContent = popupInputs[1].value;
}

formElement.addEventListener('submit', formSubmitHandler); 