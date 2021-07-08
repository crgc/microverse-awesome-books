import Library from './library.js';
import Display from './display.js';
import Navigation from './navigation.js';
import DateTime from 'luxon';

export default class App {
  constructor() {
    this.library = new Library();
    this.navigation = new Navigation();
    this.display = new Display(this.library);
    this.dateTimeElement = document.getElementById('datetime');
  }

  setDateTime() {
    const numberSuffix = (num) => {
      const th = 'th';
      const rd = 'rd';
      const nd = 'nd';
      const st = 'st';

      if (num === 11 || num === 12 || num === 13) return th;

      const lastDigit = num.toString().slice(-1);

      switch (lastDigit) {
        case '1': return st;
        case '2': return nd;
        case '3': return rd;
        default: return th;
      }
    };

    const dateTime = DateTime.now();
    const { day } = dateTime;
    const daySuffix = numberSuffix(day);

    const month = dateTime.toFormat('MMMM');
    const year = dateTime.toFormat('yyyy');
    const time = dateTime.toFormat('tt').toLowerCase();

    this.dateTimeElement.textContent = `${month} ${day}${daySuffix} ${year} ${time}`;
  }

  renderDisplay() {
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
      const bookId = source.className.split('-')[2];

      thislibrary.removeBook(bookId);
      thisdisplay.render();
    };

    this.display.setRemoveButtonListener(removeButtonListener);
    this.display.render();
  }

  startNavigation() {
    this.navigation.start();
  }

  start() {
    this.setDateTime();
    this.renderDisplay();
    this.startNavigation();
  }
}
