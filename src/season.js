import React from "react";
import {Link} from 'react-router-dom';

class Season extends React.Component{
    render(){
        
        return (
            <div className="season">
                <h1>{this.props.title}</h1>
                <div className="season-image-container">
                    <img  className="season-image" src={this.props.url}
                        alt="img not available"
                        ></img>
                    <div ></div>
                    <Link to={`/season${this.props.id}`} className="season-button" >{`${this.props.episodesCount} Episodes`}</Link>
                </div>
            
            </div>
        );
    }
}



export default Season;