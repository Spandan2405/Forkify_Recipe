class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    // Gets the query , returns it and clears the input field
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    // clears the search field
    this._parentElement.querySelector('.search__field').value = '';
  }
  addhandlerSearch(handler) {
    //handles the search submit button
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // run the function provided as parameter
    });
  }
}

export default new SearchView();
