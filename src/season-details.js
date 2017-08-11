import React from "react";
import Episode from './episode-component';
import ModalContent from './modal-content';
import {Link,Route} from 'react-router-dom';

class SeasonDetails extends React.Component{
    
    constructor(props){

        super(props);

        //Season id from url
        this.seasonId = this.props.match.params.seasonId;
        this.currentUrl = props.match.url;

        let queryString = props.location.search;
        let itemToSearch = queryString.substring(queryString.indexOf('=')+1);

        this.modalProperties = {
            show : false,
            episode : {}
        }

        this.state={
            title : "",
            episodes : [],
            itemToSearch

        };
    }
  

    onEditClick(episode){
        this.modalProperties.show = true;
        this.modalProperties.episode = episode;
        

        this.forceUpdate();
    }
    onCancelClick(){
        this.modalProperties.show = false;
        this.modalProperties.episode = {};
        

        this.forceUpdate();
    }

    onUpdateClick(title , url){
        debugger;
        this.modalProperties.show = false;
        this.modalProperties.episode.title = title;
        this.modalProperties.episode.url = url;

        this.updateEpisode(this.modalProperties.episode).then(data=>{
                
                var dataJSON = JSON.parse(data);
                this.setState({
                    episodes : dataJSON
                });
        });

        this.forceUpdate();
    }

    updateEpisode(episode){
        return new Promise(
            (resolve,reject)=>{
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    resolve(xhttp.responseText);
                }
                };
                xhttp.open("POST", "http://localhost:3001/update" , true);
                xhttp.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
                let data = Object.keys(episode).map(key=>{
                    return key + '=' +episode[key] + '&'
                })
                data.push("seasonId=" +this.seasonId );
                
                let dataInString  = data.reduce((acc,ele)=>acc+ele , "");
                xhttp.send(dataInString);
            }
        );
    }

    componentWillMount(){
        getSeasonDetail(this.seasonId).then(data=>{
                
                var dataJSON = JSON.parse(data);
                this.setState({
                    title : dataJSON.title,
                    episodes : dataJSON.episodes
                });
            
        }).catch(err=>alert(err));

        
        
    }



    render(){

        let episodes = this.state.episodes
            .filter((episode)=>episode.title.startsWith(this.state.itemToSearch))
            .map((episode)=><Episode key={episode.id} episode={episode} onEditClick={this.onEditClick.bind(this)}/>);
        return (
            <div>
                <h1>{this.state.title}</h1>
                <hr />
                
                <div id="search-container">
                    {/*<Route exact path="/:seasonId/search" render={()=>{
                        return (*/}
                            <div className="search-wrapper">
                                <form>
                                <input type="text" 
                                        name="focus" 
                                        className="search-box" 
                                        placeholder="Enter search term" 
                                        required
                                        />
                                    <button className="close-icon" type="reset"></button>
                                    <button  type="submit" >Search</button>
                                </form>
                            </div>
                        {/*)
                    }}></Route>*/}
                    {/*<Route exact path="/:seasonId" render={()=>{
                        return (
                            <Link  to={`${this.currentUrl}/search`} >
                                <img id="search-episode" src="https://imageog.flaticon.com/icons/png/512/61/61088.png" alt="Not Available"></img>
                            </Link>
                        )
                    }}></Route>*/}
                    
                
                
                </div>
                {episodes}


                <div id={this.modalProperties.show ? 'visible-overlay' : 'hidden-overlay'}>
                </div>
                <div id={this.modalProperties.show ? 'visible-popup' : 'hidden-popup'}>
                    {
                        this.modalProperties.show?
                            <ModalContent 
                                style={{zIndex: this.modalProperties.show ? 10 : -1}} 
                                episode={this.modalProperties.episode}
                                onCancelClick={this.onCancelClick.bind(this)}
                                onUpdateClick={this.onUpdateClick.bind(this)}
                                />
                            :<div/>
                        
                    }
                    
                </div>
            </div>
            )    
    }

}

function getSeasonDetail(seasonId){

             return new Promise(function(resolve, reject){
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    resolve(xhttp.responseText);
                }
                };
                xhttp.open("GET", "http://localhost:3001/" + seasonId, true);
                xhttp.send();
            });

            
        
    }

export default SeasonDetails;