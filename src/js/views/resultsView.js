import previewView from './previewView.js';
import View from './view.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Try again;';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);  the array -- same as model.state.search.results
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultsView();
