import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._img = this._popup.querySelector('.popup-picture__image');
    this._text = this._popup.querySelector('.popup-picture__caption');
  }

  open(name, link) {
    this._img.src = link;
    this._img.alt = name;

    this._text.textContent = name;
    super.open();
  }
}
