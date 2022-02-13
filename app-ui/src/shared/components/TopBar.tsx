import './../../main.css'
import * as React from 'react'
import { Link } from 'react-router-dom'

type IProps = {

}

export class TopBar extends React.Component<IProps> {
    
    constructor(props: IProps){
        super(props);
    }

    onToggleDrawer() {
        let panel = document.querySelector('.pixel-app-side-panel');
        panel.classList.toggle('pixel-slide-out');
        panel.classList.toggle('pixel-slide-in');
    }

    render() {
        return (
            <div style = {{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px' }} >
                <button className="pixel-button pixel-drawer-button" onClick={this.onToggleDrawer.bind(this)} style={{ marginRight : '10px' }}>*</button>
                <Link className="pixel-button" to="/">Home</Link>
                {this.props.children}
            </div>  
        );
    }
}