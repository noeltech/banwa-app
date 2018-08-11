import React from 'react';
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = "pk.eyJ1Ijoibm9lbHRlY2giLCJhIjoiY2o2azRiazZ2MTVlZDMxbXdvdTU1OW03YSJ9.eYd9NVbg2cgcrAqs0da8eA"

class PopulationMap extends React.Component {
    state = {
        
        style:"mapbox://styles/noeltech/cjjc96mux6tlt2snzsbxe2ed9?optimize=true",
        lng:122.5683,
        lat:10.7028,
        zoom: 13.1,
        pitch: 60,
        bearing : -65
        
    };

    componentDidMount(){
        const {lng, lat,zoom, pitch, bearing} = this.state;
         this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: this.state.style,
            center: [lng, lat],
            zoom,
            pitch,
            bearing
            // attributionControl: false
        });

        this.map.on('move', () => {
            const {lng, lat } =this.map.getCenter();     
        })

    }

    render(){
        return (
            <div className='page'>
                <p>Home Page</p>
                <div ref={el => this.mapContainer = el} className="webmap"></div>
            </div>
        )
   }    
}

 export default PopulationMap;
