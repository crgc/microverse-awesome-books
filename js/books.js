/* eslint-disable max-classes-per-file */
class StorageUtil {
  localStorageAvailable() {
    this.storage = null;

    try {
      this.storage = window.localStorage;
      const x = '__storage_test__';
      this.storage.setItem(x, x);
      this.storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22
        // Firefox
        || e.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || e.name === 'QuotaExceededError'
        // Firefox
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        // acknowledge QuotaExceededError only if there's something already stored
        && (this.storage && this.storage.length !== 0);
    }
  }

  setItem(name, item) {
    if (this.localStorageAvailable()) {
      localStorage.setItem(name, item);
    }
  }

  getItem(name) {
    if (this.localStorageAvailable()) {
      return localStorage.getItem(name);
    }
    return null;
  }
}

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.storageUtil = new StorageUtil();
    this.init();
  }

  init() {
    this.books = JSON.parse(this.storageUtil.getItem('books')) || [];
  }

  save() {
    this.storageUtil.setItem('books', JSON.stringify(this.books));
  }

  addBook(title, author) {
    const id = this.books.length + 1;
    const book = new Book(id, title, author);

    this.books.push(book);
    this.save();
  }

  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id != bookId); /* eslint-disable-line eqeqeq */
    this.save();
  }
}

class Display {
  constructor(library) {
    this.library = library;
  }

  setRemoveButtonListener(removeButtonListener) {
    this.removeButtonListener = removeButtonListener;
  }

  render() {
    const booksDiv = document.querySelector('.books');
    booksDiv.textContent = '';

    const createDiv = () => document.createElement('div');
    const { books } = this.library;

    books.forEach((book) => {
      const bookDiv = createDiv();
      bookDiv.className = 'book';

      const titleDiv = createDiv();
      titleDiv.textContent = book.title;

      const authorDiv = createDiv();
      authorDiv.textContent = book.author;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.className = ['removeBtn-', book.id].join('');
      removeBtn.addEventListener('click', this.removeButtonListener);

      bookDiv.appendChild(titleDiv);
      bookDiv.appendChild(authorDiv);
      bookDiv.appendChild(removeBtn);
      booksDiv.appendChild(bookDiv);
    });
  }
}

class App {
  constructor() {
    this.library = new Library();
    this.display = new Display(this.library);
  }

  start() {
    const addBtn = document.querySelector('#addBtn');
    const thislibrary = this.library;
    const thisdisplay = this.display;

    addBtn.addEventListener('click', () => {
      const inputTitle = document.querySelector('.inputTitle');
      const inputAuthor = document.querySelector('.inputAuthor');
      thislibrary.addBook(inputTitle.value, inputAuthor.value);
      thisdisplay.render();
    });

    const removeButtonListener = (event) => {
      const source = event.target;
      const bookId = source.className.split('-')[1];

      thislibrary.removeBook(bookId);
      thisdisplay.render();
    };

    this.display.setRemoveButtonListener(removeButtonListener);
    this.display.render();
  }
}

const app = new App();
app.start();
/* eslint-enable max-classes-per-file */
