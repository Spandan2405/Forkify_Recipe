import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    // Renders the recipes
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // console.log(this._data);
  }
  update(data) {
    // Renders the recipes
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Converts the new markup string into a virtual DOM fragment. This is a lightweight way to create DOM nodes without adding them to the actual DOM immediately.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*')); //Selects all the elements
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //console.log(curEl, newEl.isEqualNode(curEl));
      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== '' // checks new element has non-empty text content
      ) {
        // console.log('', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      // Updates changed ATTRIBUES
      //Converts the new element's attributes into an array and Sets the attribute on the current element to match the new element.
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    // clears the recipe container
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    //renders the spiner
    const markup = `<div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
