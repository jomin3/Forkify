import icons from 'url:../../img/icons.svg';

export default class View {
  data;
  render(data) {
    if (data.length == 0) return this.renderError('No Recipes Found');
    this.data = data;
    const markup = this.generateMarkup();
    console.log(markup);
    this.clear();
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  clear() {
    this.parentEl.innerHTML = '';
  }
  updateNewServings(data) {
    // if (data.length == 0) return this.renderError('No Recipes Found');
    this.data = data;
    const markNewup = this.generateMarkup();
    const newDom = document.createRange().createContextualFragment(markNewup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElements = Array.from(this.parentEl.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> `;
    this.parentEl.innerHTML = '';
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message) {
    const markup = ` <div class="error">
              <div>
                <svg>
                  <use href="./src/img/icons.svg#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this.parentEl.innerHTML = '';
    this.parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
