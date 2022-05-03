export default class FormValidator {
  constructor(parameters, formSelector) {
    this._submitButtonSelector = parameters.submitButtonSelector;
    this._inputErrorClass = parameters.inputErrorClass;
    this._errorClass = parameters.errorClass;
    this._formSelector = formSelector;
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

  _validateInput = (input) => {
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(`${this._errorClass}`);
    this._checkInputValidity(input);
  };

  _handleInput = (evt) => {
    const currentForm = evt.currentTarget;
    const input = evt.target;
    const submitButton = currentForm.querySelector(`${this._submitButtonSelector}`);
    this._setButtonState(submitButton, currentForm.checkValidity());
    this._validateInput(input);
  };

  _handleSubmit = (evt) => {
    evt.preventDefault();

    if(evt.target.checkValidity()) {
      evt.target.reset();
    }
  };

  _setEventListeners = () => {
    this._formSelector.addEventListener('submit', this._handleSubmit);
    this._formSelector.addEventListener('input', this._handleInput);
  };

  enableValidation = () => {
    this._setEventListeners();
  }
}
