import  React  from "react";
import Navigation from "./Navigation"




 export default class Header extends React.Component {

    render () {   
        return (
            <div className='header'>
                <img src={"/images/logo.png"} className="logo"></img>
                <h2 className="title">ILOILO CITY</h2>
                <Navigation/>
            </div>
        )
    }
}


