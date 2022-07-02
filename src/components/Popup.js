export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClick = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _handleClosePopup = (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this. _handleEscClick);
  }

  open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this. _handleEscClick);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleClosePopup);
  }
}
