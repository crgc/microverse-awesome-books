let books = [];
let addBook = function(title, author) {
  books.push({
    title: title,
    author: author
  });
  displayBooks();
;};

let removeBook = function(position) {
  books = books.filter(function(value, index, arr){ 
    return position == index;
  });
  displayBooks();
};

let displayBooks = function(){
  const document = window.document;
  const booksDiv = document.querySelector('.books');

  books.forEach(function(book) {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';

    const titleDiv = document.createElement('div');
    titleDiv.textContent = book.title;

    const authorDiv = document.createElement('div');
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