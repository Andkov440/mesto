export default class FormValidator {
  constructor(parameters, form) {
    this._submitButtonSelector = parameters.submitButtonSelector;
    this._inputErrorClass = parameters.inputErrorClass;
    this._errorClass = parameters.errorClass;
    this._form = form;
  }

  _showError = (input) => {
    input.classList.add(`${this._inputErrorClass}`);
  };

  _hideError = (input) => {
    input.classList.remove(`${this._inputErrorClass}`);
  };

  _checkInputValidity = (input) => {
    if(!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  };

  _setButtonState = (button, isValid) => {
    if(isValid) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };

  _setButtonDisabled = () => {
    const popupSubmit = this._form.querySelector('.popup__submit');
    const popupAddInputList = Array.from(this._form.querySelectorAll('.popup__input'));
    popupAddInputList.forEach((listItem) => {
      if (listItem.value === '') {
        popupSubmit.disabled = true;
      } else {
        popupSubmit.disabled = false;
      }
    });
  }

  _validateInput = (input) => {
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(`${this._errorClass}`);
    this._checkInputValidity(input);
  };

  _handleInput = (evt) => {
    const input = evt.target;
    this._submitButton = this._form.querySelector(`${this._submitButtonSelector}`);
    this._setButtonState(this._submitButton, this._form.checkValidity());
    this._validateInput(input);
  };

  _setEventListeners = () => {
    this._form.addEventListener('input', this._handleInput);
  };

  enableValidation = () => {
    this._setButtonDisabled();
    this._setEventListeners();
  }
}
