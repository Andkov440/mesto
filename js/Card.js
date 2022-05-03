import { openPopup, closePopup } from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._image = data.image;
    this._title = data.title;
    this._templateSelector = templateSelector;
  }

  _getTemplate = () => {
    const photoTemplate = document.getElementById('photo__template').content;
    const userElement = photoTemplate.querySelector('.photo__item').cloneNode(true);

    return userElement;
  }

  _changeLikeButton = (evt) => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('photo__like_active');
  };

  _handleDeleteCard = (evt) => {
    const eventTarget = evt.target;
    const card = eventTarget.closest('.photo__item');
    card.remove();
  };

  _activateImagePopup = (evt) => {
    const eventTarget = evt.target;
    const popupImage = document.querySelector('.popup-picture');
    popupImage.querySelector('.popup-picture__image').src = eventTarget.src;
    popupImage.querySelector('.popup-picture__image').alt = eventTarget.alt;
    popupImage.querySelector('.popup-picture__caption').textContent = eventTarget.alt;
    openPopup(popupImage);
  };

  _setEventListeners = () => {
    this._userElement.querySelector('.photo__like').addEventListener('click', this._changeLikeButton);
    this._userElement.querySelector('.photo__trashbin').addEventListener('click', this._handleDeleteCard);
    this._userElement.querySelector('.photo__image').addEventListener('click', this._activateImagePopup);
    document.querySelector('.popup__close_image').addEventListener('click', () => closePopup(document.querySelector('.popup-picture')));
  };

  generateCard = () => {
    this._userElement = this._getTemplate();
    this._setEventListeners();
    this._userElement.querySelector('.photo__image').src = this._image;
    this._userElement.querySelector('.photo__image').alt = this._title;
    this._userElement.querySelector('.photo__title').textContent = this._title;

    return this._userElement;
  }
}
