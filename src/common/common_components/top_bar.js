import React from 'react'
import { Link } from 'react-router-dom'

export class TopBar extends React.Component {
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style = {{ paddingTop: '25px', paddingBottom: '10px', paddingLeft: '5px' }}>
                <Link className="pixel-button" to="/">Home</Link>
                {this.props.children}
            </div>  
        );
    }
}