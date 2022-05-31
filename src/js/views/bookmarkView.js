import icons from 'url:../../img/icons.svg';
import View from './view';
class bookmarkView extends View {
  parentEl = document.querySelector('.bookmarks__list');
  generateMarkup() {
    return this.data
      .map(result => {
        return this.generateMarkupPreview(result);
      })
      .join('');
  }
  generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
      <a class="preview__link ${
        id === result.id ? 'preview__link--active' : ''
      }" href="#${result.id}" >
        <figure class="preview__fig">
          <img src="${result.image}" alt="Test" crossorigin />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
  }
}

export default new bookmarkView();
