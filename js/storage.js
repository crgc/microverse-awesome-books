export default class StorageUtil {
  localStorageAvailable() {
    this.storage = null;

    try {
      this.storage = window.localStorage;
      const x = '__storage_test__';
      this.storage.setItem(x, x);
      this.storage.removeItem(x);
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
        && (this.storage && this.storage.length !== 0);
    }
  }

  setItem(name, item) {
    if (this.localStorageAvailable()) {
      localStorage.setItem(name, item);
    }
  }

  getItem(name) {
    if (this.localStorageAvailable()) {
      return localStorage.getItem(name);
    }
    return null;
  }
}