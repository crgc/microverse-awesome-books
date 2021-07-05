let books = [];
let addBook = (title, author) => {
  books.push({
    title: title,
    author: author
  });
  displayBooks();
;};

let removeBook = (position) => {
  books = books.filter((value, index, arr) => { 
    return position == index;
  });
  displayBooks();
};

let displayBooks = () => {
  const booksDiv = document.querySelector('.books');
  booksDiv.textContent = '';

  const createDiv = () => { return document.createElement('div'); };

  books.forEach((book) => {
    const bookDiv = createDiv();
    bookDiv.className = 'book';

    const titleDiv = createDiv();
    titleDiv.textContent = book.title;

    const authorDiv = createDiv();
    authorDiv.textContent = book.author;

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);

    booksDiv.appendChild(bookDiv);
  });
};

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', () => {
  const inputTitle = document.querySelector('.inputTitle');
  const inputAuthor = document.querySelector('.inputAuthor');
  addBook(inputTitle.value, inputAuthor.value);
});