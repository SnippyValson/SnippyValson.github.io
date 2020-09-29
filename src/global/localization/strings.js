export class Strings {
    strings = {};
    
    constructor() {
      this.strings.en = {};
      this.strings.en.MilliSecondsUnit = "ms";
    }
  
    get localized() {
      return this.strings.en;
    }
  }
  