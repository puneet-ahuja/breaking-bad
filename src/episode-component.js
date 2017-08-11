import React from "react";

class Episode extends React.Component{
    render(){
        
        return (
            <div className="episode">
                <div className="episode-image-container">
                    <img  className="episode-image" src={this.props.episode.url}
                        alt="img not available"
                        ></img>
                    <div  className="episode-button btn btn-primary" onClick={()=>{this.props.onEditClick(this.props.episode)}}>Edit</div>
                </div>
                <h4>{this.props.episode.title}</h4>
            </div>
        );
    }
}



export default Episode;