import StorageUtil from './storage.js';

export default class Section {
  constructor(id) {
    this.id = id;
    this.selected = false;
    this.storageUtil = new StorageUtil();

    this.element = document.getElementById(id);
    this.anchorTag = document.getElementById(`a-${id}`);
  }

  hide() {
    this.anchorTag.className = '';
    this.element.className = 'hidden';
  }

  select() {
    this.element.className = '';
    this.anchorTag.className = 'blue';
    this.storageUtil.setItem('selectedSection', this.id);
  }

  setEventListener(eventListener) {
    this.anchorTag.addEventListener('click', eventListener);
  }
}