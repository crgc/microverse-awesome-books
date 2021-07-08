import Library from './library.js';
import Display from './display.js';

export default class App {
  constructor() {
    this.library = new Library();
    this.display = new Display(this.library);
  }

  start() {
    const addBtn = document.getElementById('add-btn');
    const thislibrary = this.library;
    const thisdisplay = this.display;

    addBtn.addEventListener('click', () => {
      const inputTitle = document.getElementsByClassName('input-title')[0];
      const inputAuthor = document.getElementsByClassName('input-author')[0];

      thislibrary.addBook(inputTitle.value, inputAuthor.value);
      thisdisplay.render();
    });

    const removeButtonListener = (event) => {
      const source = event.target;
      const bookId = source.className.split('-')[2];

      thislibrary.removeBook(bookId);
      thisdisplay.render();
    };

    this.display.setRemoveButtonListener(removeButtonListener);
    this.display.render();
  }
}
