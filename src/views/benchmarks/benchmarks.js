import "./../../main.css";
import "./benchmarks.css";
import {
    Style
} from "../../global/style";
import React from "react";
import ReactDOM from "react-dom";
import { SortingBenchmark } from "./subviews/sorting_benchmarks/sorting_benchmarks.js";
import { Constants } from "./constants/contants";
import {
    Constants as GlobalConstants
  } from "../../global/constants";
  import {
    Strings
} from "./localization/strings";

var localStrings = new Strings();

var style = new Style();
style.applyStyle();
ReactDOM.render(<SortingBenchmark onStateChanged = {handleStateChange} />, document.getElementById("renderer-panel"));
var listButtons = document.getElementsByClassName(Constants.class.ListButton);

window.onItemClicked = onItemClicked;
function onItemClicked(item, button) {
    setSelectedButton(button);
    switch (item) {
        case "sorting-benchmarks": {
            ReactDOM.render(<SortingBenchmark onStateChanged = {handleStateChange} />, document.getElementById("renderer-panel"));
        }
        break;
    }
}

function handleStateChange(state){
    switch(state) {
        case "busy": {
            setBusy();
        }break;
        case "idle": {
            setIdle();
        }break;
        default: break; 
    }
}

function setIdle() {
    document.getElementById(Constants.id.InfoLabel).innerHTML =
        localStrings.localized.Idle;
}

function setBusy() {
    document.getElementById(Constants.id.InfoLabel).innerHTML =
        localStrings.localized.BusyIndicator;
}

function setSelectedButton(selectedButton) {
    for (let listButton of listButtons) {
      listButton.classList.add(GlobalConstants.class.PixelButton);
      listButton.classList.remove(GlobalConstants.class.PixelButtonInverted);
    }
    selectedButton.classList.add(GlobalConstants.class.PixelButtonInverted);
    selectedButton.classList.remove(GlobalConstants.class.PixelButton);
  }
  
