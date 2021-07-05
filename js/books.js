function localStorageAvailable() {
  try {
    const storage = window.localStorage;
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

function setItem(name, item) {
  if (localStorageAvailable()) {
    localStorage.setItem(name, item);
  }
}

function getItem(name) {
  if (localStorageAvailable()) {
    return localStorage.getItem(name);
  }
}

let books = getBooks() || [];
if (books) {
  displayBooks();
}

function saveBooks() {
  setItem('books', JSON.stringify(books));
}

function getBooks() {
  return JSON.parse(getItem('books'));
}

function addBook(title, author) {
  const id = books.length + 1;
  books.push({
    id,
    title,
    author,
  });

  saveBooks();
  displayBooks();
}

function removeBook(bookId) {
  books = books.filter((book) => book.id != bookId);

  saveBooks();
  displayBooks();
}

function displayBooks() {
  const booksDiv = document.querySelector('.books');
  booksDiv.textContent = '';

  const createDiv = () => document.createElement('div');

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

      removeBook(bookId);
    });

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(removeBtn);

    booksDiv.appendChild(bookDiv);
  });
}

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', () => {
  const inputTitle = document.querySelector('.inputTitle');
  const inputAuthor = document.querySelector('.inputAuthor');
  addBook(inputTitle.value, inputAuthor.value);
});