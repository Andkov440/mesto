export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialData = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._initialData.forEach(item => {
      this._renderer(item);
    });
  }
}
