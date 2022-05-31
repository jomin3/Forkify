import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  parentEl = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this.parentEl.addEventListener('click', function (e) {
      console.log(e);
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      const gotopage = +btn.getAttribute('data-goto');
      console.log(gotopage);
      handler(gotopage);
    });
  }
  generateMarkup() {
    const numPages = Math.ceil(this.data.results.length / 10);
    if (this.data.page == 1 && numPages >= 1) {
      return `<button data-goto="${
        this.data.page + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${this.data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `;
    }
    //page1
    if (this.data.page == numPages && numPages > 1) {
      return `<button data-goto="${
        this.data.page - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this.data.page - 1}</span>
    </button>`;
    }
    if (this.data.page < numPages) {
      return `<button data-goto="${
        this.data.page - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this.data.page - 1}</span>
    </button>
    <button data-goto="${
      this.data.page + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${this.data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>;`;
    }
    //other page
    //lastpage
  }
}
export default new PaginationView();
