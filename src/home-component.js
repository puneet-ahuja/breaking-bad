import React from "react";

import Season from './season.js'


class Home extends React.Component{


    render(){

        
        let seasonTiles = this.props.seasons.map((season => <Season key={season.id} url={season.url} title={season.title} id={season.id} episodesCount={season.episodes}/>));

        return(
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.description}</p>
                {seasonTiles}
            </div>
                    
        );            
        
    }
}




export default Home;