import React from "react";
// import {BrowserRouter as Router , Route , Link} from 'react-router-dom';

class Header extends React.Component{
    render(){
        return (
            <header >
                
                <img id="cover-photo" src={this.props.headerUrl}
                    alt="img not available"></img>
            
            </header>
        );
    }
}



export default Header;