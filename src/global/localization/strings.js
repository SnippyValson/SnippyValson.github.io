export class Strings {
    strings = {};
    constructor() {
      this.strings["constants"] = {};
      this.strings["en"] = {};
      
      this.strings["en"]["MilliSecondsUnit"] = "ms";
    }
  
    get constants() {
      return this.strings.constants;
    }
  
    get localized() {
      return this.strings.en;
    }
  }
  