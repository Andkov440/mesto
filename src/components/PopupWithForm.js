import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ callbackSubmit }, popupSelector) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;

    this._formElement = this._popup.querySelector('.popup__form');
    this._formInputs = this._formElement.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._formInputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._formElement.reset();
  }

}
