export class Strings {
    strings = {};
    
    constructor() {
      this.strings.en = {};
    }
  
    get localized() {
      return this.strings.en;
    }
  }
  