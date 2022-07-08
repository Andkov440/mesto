import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(handleSumbitForm, popupSelector) {
    super(popupSelector);
    this._handleSumbitForm = handleSumbitForm;

    this._formElement = this._popup.querySelector('.popup__form');
    this._formInputs = this._formElement.querySelectorAll('.popup__input');
    this._btnSubmit = this._formElement.querySelector('.popup__submit');
  }

  _getInputValues() {
    this._formValues = {};
    this._formInputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  }

  setSubmitText(text) {
    this._btnSubmit.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      this._getInputValues();
      this._handleSumbitForm(evt, this._formValues);
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
