import { openPopup } from './index.js';

export default class Card {
  constructor(data, templateSelector) {
    this._image = data.image;
    this._title = data.title;
    this._templateSelector = templateSelector;
  }

  _getTemplate = () => {
    const photoTemplate = document.getElementById(this._templateSelector).content;
    const userElement = photoTemplate.querySelector('.photo__item').cloneNode(true);
    return userElement;
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle('photo__like_active');
}

  _handleDeleteCard = () => {
    this._userElement.remove();
    this._userElement = null;
  };

  _activateImagePopup = () => {
    const popupImage = document.querySelector('.popup-picture');
    popupImage.querySelector('.popup-picture__image').src = this._image;
    popupImage.querySelector('.popup-picture__image').alt = this._title;
    popupImage.querySelector('.popup-picture__caption').textContent = this._title;
    openPopup(popupImage);
  };

  _setEventListeners = () => {
    this._likeButton.addEventListener('click', (evt) => {this._handleLikeButton(evt);});
    this._userElement.querySelector('.photo__trashbin').addEventListener('click', this._handleDeleteCard);
    this._userElement.querySelector('.photo__image').addEventListener('click', this._activateImagePopup);

  };

  generateCard = () => {
    this._userElement = this._getTemplate();
    this._likeButton = this._userElement.querySelector('.photo__like');
    this._cardImage = this._userElement.querySelector('.photo__image');
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._userElement.querySelector('.photo__title').textContent = this._title;

    return this._userElement;
  }
}
