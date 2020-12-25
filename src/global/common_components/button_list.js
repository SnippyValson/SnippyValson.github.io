import { Constants as GlobalConstants } from "../constants";
import "../../main.css";
import React from "react";

export class ButtonList extends React.Component {

    referenceList;

    constructor() {
        super(props);
        this.referenceList = [];
    }

    setSelectedButton(selectedButton) {
        for (let listButtonRef of this.referenceList) {
          listButtonRef.current.classList.add(GlobalConstants.class.PixelButton);
          listButtonRef.current.classList.remove(GlobalConstants.class.PixelButtonInverted);
        }
        selectedButton.classList.add(GlobalConstants.class.PixelButtonInverted);
        selectedButton.classList.remove(GlobalConstants.class.PixelButton);
    }

    onButtonClicked(event, tag) {
        this.setSelectedButton(event.target);
        this.props.onItemClicked(event, tag);
    }

    render() {
        return (
            <div className="pixel-div">
                {
                    this.props.items.map(
                        item => {
                            let ref = React.createRef();
                            let button =  ( <button className="pixel-button list-button" ref= { ref } onClick={ (e) => { onButtonClicked(e, item.tag); } }> { item.dsplayText } </button> );
                            this.referenceList.push(ref);
                            return button;
                        }
                    );
                }
            </div>
        );
        
    }
}