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

    this.books = this.books.concat(book);
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
      const isEven = (n) => { return n % 2 == 0; };

      const bookWrapperDiv = createDiv();
      bookWrapperDiv.className = isEven(book.id) ? 'book-wrapper' : 'book-wrapper bg-grey';

      const bookDiv = createDiv();
      bookDiv.className = 'book';
      bookDiv.textContent = ["\"", book.title, "\"", ' by ', book.author].join('');

      const removeBtn = document.createElement('button');
      removeBtn.addEventListener('click', this.removeButtonListener);
      removeBtn.className = ['removeBtn-', book.id].join('');
      removeBtn.textContent = 'Remove';

      bookWrapperDiv.appendChild(bookDiv);
      bookWrapperDiv.appendChild(removeBtn);

      booksDiv.appendChild(bookWrapperDiv);

      (() => {
        document.getElementsByClassName('input-title').value = '';
        document.getElementsByClassName('input-author').value = '';
      })();
    });
  }
}

class App {
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
