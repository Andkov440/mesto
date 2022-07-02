export default class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._url = data.url;
    this._title = data.title;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate = () => {
    const photoTemplate = document.querySelector(this._templateSelector).content;
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

   _setEventListeners = () => {
    this._likeButton.addEventListener('click', (evt) => {this._handleLikeButton(evt);});
    this._userElement.querySelector('.photo__trashbin').addEventListener('click', this._handleDeleteCard);
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._url));
  };

  generateCard = () => {
    this._userElement = this._getTemplate();
    this._likeButton = this._userElement.querySelector('.photo__like');
    this._cardImage = this._userElement.querySelector('.photo__image');

    this._cardImage.src = this._url;
    this._cardImage.alt = this._title;
    this._userElement.querySelector('.photo__title').textContent = this._title;

    this._setEventListeners();
    return this._userElement;
  }
}
