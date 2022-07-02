export default class FormValidator {
  constructor(parameters, form) {
    this._submitButtonSelector = parameters.submitButtonSelector;
    this._inputErrorClass = parameters.inputErrorClass;
    this._errorClass = parameters.errorClass;
    this._inputSelector = parameters.inputSelector;
    this._form = form;
    this._inputList = this._form.querySelectorAll(this._inputSelector);
  }

  _showError = (input) => {
    input.classList.add(this._inputErrorClass);
  };

  _hideError = (input) => {
    input.classList.remove(this._inputErrorClass);
  };

  _checkInputValidity = (input) => {
    if(!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  };

  _setButtonState = () => {
    if(this._form.checkValidity()) {
      this._submitButton.disabled = false;
    } else {
      this._submitButton.disabled = true;
    }
  };

  _validateInput = (input) => {
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(`${this._errorClass}`);
    this._checkInputValidity(input);
  };

  _handleInput = (evt) => {
    const input = evt.target;
    this._setButtonState();
    this._validateInput(input);
  };

  _setEventListeners = () => {
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._form.addEventListener('input', this._handleInput);
  };

  resetValidation = () => {
    this._setButtonState(this._submitButton);
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement)
    });
  }

  enableValidation = () => {
    this._setEventListeners();
  }
}
