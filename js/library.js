import Book from './book.js';
import StorageUtil from './storage.js';

export default class Library {
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