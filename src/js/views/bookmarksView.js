import previewView from './previewView.js';
import View from './view.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  _generateMarkup() {
    //console.log(this._data); //the array -- same as model.state.search.results
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
  addhandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarksView();
