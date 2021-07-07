export default class Display {
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
      removeBtn.addEventListener('click', this.removeButtonListener);
      removeBtn.className = ['removeBtn-', book.id].join('');
      removeBtn.textContent = 'Remove';

      bookDiv.appendChild(titleDiv);
      bookDiv.appendChild(authorDiv);
      bookDiv.appendChild(removeBtn);

      booksDiv.appendChild(bookDiv);

      (() => {
        document.querySelector('.inputTitle').value = '';
        document.querySelector('.inputAuthor').value = '';
      })();
    });
  }
}