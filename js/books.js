class StorageUtil {
  constructor() {}
  localStorageAvailable() {
    let storage;
  
    try {
      storage = window.localStorage;
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
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
        && (storage && storage.length !== 0);
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
    displayBooks();
  }
  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id != bookId); /* eslint-disable-line eqeqeq */
    this.save();
    displayBooks();
  }
}

const library = new Library();
if(library.books.length > 0) {
  displayBooks();
}

/* eslint-disable no-use-before-define */
function displayBooks() {
  const booksDiv = document.querySelector('.books');
  booksDiv.textContent = '';

  const createDiv = () => document.createElement('div');
  const books = library.books;

  books.forEach((book) => {
    const bookDiv = createDiv();
    bookDiv.className = 'book';

    const titleDiv = createDiv();
    titleDiv.textContent = book.title;

    const authorDiv = createDiv();
    authorDiv.textContent = book.author;

    const removeBtn = document.createElement('button');
    removeBtn.className = ['removeBtn-', book.id].join('');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', (event) => {
      const source = event.target;
      const bookId = source.className.split('-')[1];

      library.removeBook(bookId);
    });

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(removeBtn);

    booksDiv.appendChild(bookDiv);
  });
}
/* eslint-enable no-use-before-define */

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', () => {
  const inputTitle = document.querySelector('.inputTitle');
  const inputAuthor = document.querySelector('.inputAuthor');

  library.addBook(inputTitle.value, inputAuthor.value);
});
