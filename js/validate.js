const parameters = {
  formSelector: '.popup__form',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_error',
  errorClass: 'error'
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));

  const handleInput = (evt) => {
    const currentForm = evt.currentTarget;
    const input = evt.target;
    const submitButton = currentForm.querySelector(`${obj.submitButtonSelector}`);
    setButtonState(submitButton, currentForm.checkValidity());
    validateInput(input);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(evt.target.checkValidity()) {
      evt.target.reset();
    }
  };

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', handleSubmit);
    formElement.addEventListener('input', handleInput);
  });

  const showError = (input) => {
    input.classList.add(`${obj.inputErrorClass}`);
  };

  const hideError = (input) => {
    input.classList.remove(`${obj.inputErrorClass}`);
  };

  const checkInputValidity = (input) => {
    if(!input.validity.valid) {
      showError(input);
    } else {
      hideError(input);
    }
  };

  const validateInput = (input) => {
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(`${obj.error}`);
    checkInputValidity(input);
  };

  const setButtonState = (button, isValid) => {
    if(isValid) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };
}

enableValidation(parameters);
