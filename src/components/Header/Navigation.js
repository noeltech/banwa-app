import React from "react";
import MapList from "./MapList"


export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapListVisible : false
        }   
    }
    
    handleClickOnMaps = (e) => {
        if (!this.state.mapListVisible) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState(prevState => ({
            mapListVisible : !prevState.mapListVisible
        }));
        
    }

    handleOutsideClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
          }
          
          this.handleClickOnMaps();
        }


    
     render() {
         return (
             <div className = "nav" ref={node=> this.node =node}>
                {this.state.mapListVisible && <MapList onListClick={this.handleClickOnMaps}/>}
                 <li key = {1} className = "nav1" onClick={this.handleClickOnMaps}>Maps +</li>
                 <li key = {2} className = "nav2">About</li>
                 <li key = {3} className = "nav3">Contact Us</li>
                 {console.log(this.state.mapListVisible)}
             </div>
        )
    }
}