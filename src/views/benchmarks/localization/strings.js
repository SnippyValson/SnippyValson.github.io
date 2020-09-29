export class Strings {
  strings = {};
  
  constructor() {
    this.strings.en = {};
    this.strings.en.Idle = "Idle";
    this.strings.en.LargeArrayWarning =
          "You are going to process a large array, this may cause your browswer to hang.";
    this.strings.en.GenerateDataPrompt = "Please generate data.";
    this.strings.en.BusyIndicator = "Working...";
  }

  get localized() {
    return this.strings.en;
  }
}
