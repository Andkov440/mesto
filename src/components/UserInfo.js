export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;

    this._nameField = document.querySelector(this._nameSelector);
    this._aboutField = document.querySelector(this._aboutSelector);
  }

  setUserInfo({ name, about }) {
    this._nameField.textContent = name;
    this._aboutField.textContent = about;
 }

  getUserInfo() {
    return {
      name: this._nameField.textContent,
      about: this._aboutField.textContent,
    };
  }
}

