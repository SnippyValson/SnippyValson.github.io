import { Constants as GlobalConstants } from "../constants";
import "../../main.css";
import * as React from "react";

export interface IButtonListItem {
    tag: string,
    displayText: string
}

type IProps = {
    items: IButtonListItem[],
    onItemClicked: (button: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string) => void;
}

export class ButtonList extends React.Component<IProps> {

    referenceList: React.RefObject<any>[];

    constructor(props: IProps) {
        super(props);
        this.referenceList = [];
    }

    componentDidMount() {
        if (this.referenceList.length > 0) {
            this.setSelectedButton(this.referenceList[0].current);
        }
    }

    setSelectedButton(selectedButton: HTMLButtonElement) {
        for (let listButtonRef of this.referenceList) {
            if (!listButtonRef || !listButtonRef.current) {
                return;
            }
            listButtonRef.current.classList.add(GlobalConstants.class.PixelButton);
            listButtonRef.current.classList.remove(GlobalConstants.class.PixelButtonInverted);
        }
        selectedButton.classList.add(GlobalConstants.class.PixelButtonInverted);
        selectedButton.classList.remove(GlobalConstants.class.PixelButton);
    }

    onButtonClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string) {
        if (event.target instanceof HTMLButtonElement) {
            this.setSelectedButton(event.target as HTMLButtonElement);
            if (this.props.onItemClicked) {
                this.props.onItemClicked(event, tag);
            }
        }
    }

    render() {
        // Clear the list of references each time.
        this.referenceList = [];
        return (
            <div style={{ width: "99%", height: "99%", display: 'flex', flexDirection: 'column' }}>
                {
                    this.props.items.map(
                        item => {
                            // Keep a reference to all the buttons thats being created.
                            let ref = React.createRef();
                            // Assign a unique key to all the buttons as well. 
                            let button = (<button className="pixel-button pixel-list-button" style={{ marginBottom: '7.5px' }} ref={ref} key={item.tag} onClick={(e) => { this.onButtonClicked(e, item.tag); }}> {item.displayText} </button>);
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