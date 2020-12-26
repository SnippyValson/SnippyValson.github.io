import React from 'react'
import { Link } from 'react-router-dom'

export class TopBar extends React.Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style = {{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px' }} >
                <Link className="pixel-button" to="/">Home</Link>
                {this.props.children}
            </div>  
        );
    }
}