export default class Card {
  constructor(data, templateSelector, { handleCardClick, handleLikeCard, handleDislikeCard, handleDelete}) {
    this._url = data.link;
    this._title = data.name;
    this._id = data._id;
    this._owner = data.owner;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
    this._handleDelete = handleDelete;
  }

  _getTemplate = () => {
    const photoTemplate = document.querySelector(this._templateSelector).content;
    const userElement = photoTemplate.querySelector('.photo__item').cloneNode(true);
    return userElement;
  }

  _handleLikeButton = () => {
    this._likeButton.classList.toggle('photo__like_active');
    this._isLiked = !this._isLiked;
  }

  _likeCard = () => {
    if (this._isLiked) {
      this._handleDislikeCard(this);
    } else {
      this._handleLikeCard(this);
    }
  };

  updCardLike(card) {
    this._likes = card.likes;
    this._likesCount.textContent = this._likes.length;
    this._handleLikeButton();
  }

  _restoreLikes(userId) {
    if(this._likes.find(element => {
      return element._id === userId
    })) {
      this._handleLikeButton();
    }
  }

  getId = () => {
    return this._id;
  }

  _getOwnerId = () => {
    return this._owner._id;
  }

  removeCard = () => {
    this._userElement.remove();
    this._userElement = null;
  };

   _setEventListeners = () => {
    this._likeButton.addEventListener('click', () => this._likeCard());
    this._cardRemove.addEventListener('click', () => this._handleDelete(this));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._title, this._url));
  };

  generateCard = (userId) => {
    this._userElement = this._getTemplate();
    this._likeButton = this._userElement.querySelector('.photo__like');
    this._likesCount = this._userElement.querySelector('.photo__like-count');
    this._cardImage = this._userElement.querySelector('.photo__image');
    this._cardRemove = this._userElement.querySelector('.photo__trashbin');

    this._cardImage.src = this._url;
    this._cardImage.alt = this._title;
    this._likesCount.textContent = this._likes.length;

    this._userElement.querySelector('.photo__title').textContent = this._title;

    if (userId !== this._getOwnerId()) {
      this._cardRemove.classList.add('photo__trashbin_disable');
    }

    this._restoreLikes(userId);
    
    this._setEventListeners();

    return this._userElement;
  }
}
