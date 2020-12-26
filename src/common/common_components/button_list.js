import { Constants as GlobalConstants } from "../constants";
import "../../main.css";
import React from "react";

export class ButtonList extends React.Component {

    referenceList;

    constructor(props) {
        super(props);
        this.referenceList = [];
    }

    setSelectedButton(selectedButton) {
        for (let listButtonRef of this.referenceList) {
            if(!listButtonRef || !listButtonRef.current){
                return;
            }
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

        // Clear the list of references each time.
        this.referenceList = [];
        return (
            <div  style={{ width : "99%", height : "99%", display : 'flex', flexDirection : 'column'}}>
                {
                    this.props.items.map(
                        item => {
                            // Keep a reference to all the buttons thats being created.
                            let ref = React.createRef();
                            // Assign a unique key to all the buttons as well. 
                            let button = ( <button className="pixel-button pixel-list-button" style = {{ marginBottom : '7.5px' }} ref= { ref } key = { item.tag } onClick={ (e) => { this.onButtonClicked(e, item.tag); } }> { item.displayText } </button> );
                            // Push the ref to a list, after the re has been assigned.
                            this.referenceList.push(ref);
                            return button;
                        }
                    )
                }
            </div>
        );
        
    }
}