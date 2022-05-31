class searchView {
  parentEL = document.querySelector('.search');
  getQuery() {
    console.log(this.parentEL);
    return document.querySelector('.search__field').value;
  }
  clearInput() {
    this.parentEL.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this.parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('clicked');

      handler();
    });
  }
}
export default new searchView();
