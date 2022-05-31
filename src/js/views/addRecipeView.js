import View from './view';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  parentEl = document.querySelector('.upload');
  windowEl = document.querySelector('.add-recipe-window');
  overlay = document.querySelector('.overlay');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();

    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }
  toggleWindow() {
    this.overlay.classList.toggle('hidden');
    this.windowEl.classList.toggle('hidden');
  }
  addHandlerShowWindow() {
    console.log('clicked');

    this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerHideWindow() {
    this.btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this.overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    document
      .querySelector('.upload__btn')

      .addEventListener('click', function (e) {
        e.preventDefault();
        const dataArr = [...new FormData(document.querySelector('.upload'))];
        const data = Object.fromEntries(dataArr);
        handler(data);
      });
  }
  generateMarkupPreview(result) {
    Number;
  }
}

export default new addRecipeView();
