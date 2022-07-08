import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(handleDeleteCard, popupSelector) {
    super(popupSelector);

    this._handleDeleteCard = handleDeleteCard;
    this._form = this._popup.querySelector('.popup__form');
  }

  _handleConfirmRemove = (evt) => {
    evt.preventDefault();
    this._handleDeleteCard(this._card);
  }

  open = (card) => {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleConfirmRemove);
  }
}
