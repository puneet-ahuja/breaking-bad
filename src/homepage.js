import React from "react";
import Header from "./header";
import Home from './home-component'
import SeasonDetails from "./season-details";
import {Route} from 'react-router-dom';
import {BrowserRouter as Router } from 'react-router-dom';

class Homepage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            headerUrl : "",
            title : "",
            description : "",
            seasons : []
        }
       

    }

    componentWillMount(){
        getStateData().then(data=>{
                
                var dataJSON = JSON.parse(data);
                this.setState({
                    headerUrl : dataJSON["header-image-url"],
                    title : dataJSON.title,
                    description : dataJSON.description,
                    seasons : dataJSON.seasons
                });
            
        }).catch(err=>alert(err));

        
        
    }

     


    render(){
        return(
            <Router forceRefresh>
                <div className="container">
                    <Header headerUrl={this.state.headerUrl}/>
                    

                    <Route exact path="/" render={()=>{
                        return <Home title={this.state.title} description={this.state.description} seasons={this.state.seasons}/>
                    }}></Route>
                    <Route path="/:seasonId" component={SeasonDetails}></Route>
                </div>
           </Router>
        );            
        
    }
}


//Function to get data from ajax call for home page
function getStateData(){

             return new Promise(function(resolve, reject){
                let xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    resolve(xhttp.responseText);
                }
                };
                xhttp.open("GET", "http://localhost:3001/homepage", true);
                xhttp.send();
            });

            
        
    }

export default Homepage;