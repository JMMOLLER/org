export default class ConnectionManager {
    static instance;
    constructor() {
      console.log('ConnectionManager is initialized');
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    notifyObservers(value) {
      this.observers.forEach((setValue) => {
        setValue(value);
      });
    }
  
    static getInstance() {
      if (!this.instance) {
        this.instance = new ConnectionManager();
      }
      return this.instance;
    }
  }