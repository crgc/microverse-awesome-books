import Section from './section.js';
import StorageUtil from './storage.js';

export default class Navigation {
  constructor() {
    this.storageUtil = new StorageUtil();

    this.listSection = new Section('list');
    this.addNewSection = new Section('add-new');
    this.contactSection = new Section('contact');

    this.setEventListeners();
  }

  setEventListeners() {
    const eventListener = (event) => {
      const clickedSectionId = event.target.id.substring('a-'.length);
      
      const lastSelectedSection = this.lastSelectedSection();
      const clickedSection = this.getSection(clickedSectionId);

      if(lastSelectedSection.id != clickedSection.id) {
        lastSelectedSection.hide();
        clickedSection.select();
      }
    };

    this.listSection.setEventListener(eventListener);
    this.addNewSection.setEventListener(eventListener);
    this.contactSection.setEventListener(eventListener);
  }

  lastSelectedSectionId() {
    return this.storageUtil.getItem('selectedSection');
  }

  lastSelectedSection() {
    return this.getSection(this.lastSelectedSectionId());
  }

  getSection(id) {
    switch(id) {
      case 'list': return this.listSection
      case 'add-new': return this.addNewSection
      case 'contact': return this.contactSection
      default: return this.listSection
    }
  }

  start() {
    const sectionId = this.lastSelectedSectionId() || 'list';
    const section = this.getSection(sectionId);
    section.select();
  }
}