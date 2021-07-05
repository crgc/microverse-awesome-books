let books = [];
let addBook = (title, author) => {
  const id = books.length + 1;
  books.push({
    id: id,
    title: title,
    author: author
  });

  displayBooks();
;};

let removeBook = (bookId) => {
  books = books.filter((book) => { 
    return book.id != bookId;
  });

  displayBooks();
};

let displayBooks = () => {
  const booksDiv = document.querySelector('.books');
  booksDiv.textContent = '';

  const createDiv = () => { return document.createElement('div'); };

  books.forEach((book, index) => {
    const bookDiv = createDiv();
    bookDiv.className = 'book';

    const titleDiv = createDiv();
    titleDiv.textContent = book.title;

    const authorDiv = createDiv();
    authorDiv.textContent = book.author;

    const removeBtn = document.createElement('button');
    removeBtn.className = ['removeBtn-', book.id].join('');
    removeBtn.textContent = 'Remove'
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
};

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', () => {
  const inputTitle = document.querySelector('.inputTitle');
  const inputAuthor = document.querySelector('.inputAuthor');
  addBook(inputTitle.value, inputAuthor.value);
});