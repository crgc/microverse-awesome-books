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

    books.forEach((book, index) => {
      const isEven = (n) => n % 2 === 0;

      const bookWrapperDiv = createDiv();
      bookWrapperDiv.className = isEven(index) ? 'book-wrapper bg-grey' : 'book-wrapper';

      const bookDiv = createDiv();
      bookDiv.className = 'book';
      bookDiv.textContent = `"${book.title}" by ${book.author}`;

      const removeBtn = document.createElement('button');
      removeBtn.addEventListener('click', this.removeButtonListener);
      removeBtn.className = `remove-btn-${book.id}`;
      removeBtn.textContent = 'Remove';

      bookWrapperDiv.appendChild(bookDiv);
      bookWrapperDiv.appendChild(removeBtn);

      booksDiv.appendChild(bookWrapperDiv);

      (() => {
        document.getElementsByClassName('input-title')[0].value = '';
        document.getElementsByClassName('input-author')[0].value = '';
      })();
    });
  }
}