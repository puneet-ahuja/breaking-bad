import React from "react";


class ModalContent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            title : props.episode.title,
            url : props.episode.url
        }
    }

    onTitleChangeHandler(event)
    {
        debugger;
        this.setState({
            title: event.target.value
        })
    }
    onUrlChangeHandler(event)
    {
        debugger;
        this.setState({
            url: event.target.value
        })
    }
    render(){
        return (
            <div >
                <div id="modal-header">Edit Episode</div>
                <div id="modal-body" className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Title</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" value={this.state.title}  onChange={this.onTitleChangeHandler.bind(this)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Url</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" id="url" value={this.state.url} onChange={this.onUrlChangeHandler.bind(this)}/>
                        </div>
                    </div>
                </div>
                <div id="modal-footer">
                    <div 
                        id="update-button" 
                        className="btn btn-primary" 
                        onClick={()=>{(this.props.onUpdateClick(this.state.title , this.state.url))}}
                       >UPDATE</div>
                    <div id="cancel-button" className="btn btn-primary" onClick={this.props.onCancelClick}>CANCEL</div>
                </div>
            
            </div>
        );
    }
}



export default ModalContent;