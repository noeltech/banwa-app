import React from 'react';
import RangeSlider from './RangeSlider'
import mapboxgl from 'mapbox-gl'
import {switchPopulationDate} from './Utilities'
import Chart from './Chart'
import {lowestPopulation, highestPopulation} from './Data'
import Legend from './Legend'
import MapHeader from './MapHeader'


mapboxgl.accessToken = "pk.eyJ1Ijoibm9lbHRlY2giLCJhIjoiY2o2azRiazZ2MTVlZDMxbXdvdTU1OW03YSJ9.eYd9NVbg2cgcrAqs0da8eA"


let hoveredStateId = null;
class PopulationMap extends React.Component {
    state = {
        
        style:"mapbox://styles/noeltech/cjjku7xsx0vay2spj959b5p5s?optimize=true",
        lng:122.5683,
        lat:10.7028,
        zoom:11.8,
        rangeSliderValue : 1,
        highestPopulation : highestPopulation,
        lowestPopulation : lowestPopulation
        
        
        
    
    };

    handleSliderChange = (rangeClickValue) => {
        this.setState({rangeSliderValue : rangeClickValue})
        this.handleStyleChange(rangeClickValue)
       
    }

    handleStyleChange = (value) => {
        const populationDate = switchPopulationDate(value);
        console.log("style changed")
             const map = this.map;
             map.setPaintProperty('iloilo-city-barangay-boundary-8ms17x','fill-color',[
                "interpolate",
                [
                    "linear"
                ],
                [
                    "get",
                    populationDate
                ],
                1000,
                "hsl(60, 100%, 95%)",
                2000,
                "hsl(53, 100%, 87%)",
                3000,
                "hsl(45, 98%, 78%)",
                4000,
                "hsl(40, 99%, 65%)",
                5000,
                "hsl(32, 99%, 58%)",
                6000,
                "hsl(26, 85%, 50%)",
                8000,
                "hsl(22, 98%, 40%)",
                10000,
                "hsl(19, 95%, 31%)",
                13000,
                "hsl(19, 89%, 21%)"
            ])
    }

    getBarangaylist = (populationDate) => {
        const features = this.map.queryRenderedFeatures({ layers: ['iloilo-city-barangay-boundary-8ms17x'] });
        let barangayList = [];
        features.map(feature => {
            barangayList.push({
                barangayName: feature.properties.Barangay_BarangayName, 
                population: feature.properties[populationDate]
            })
        })
        return barangayList;
    }

    getHighestPopulation = (barangayList) => {
        return  barangayList.sort((a, b)=> {
                    return  b.population - a.population
                    }).slice(0,5)     
    }

    getLowestPopulation = (barangayList) => {
        return  barangayList.filter((list) => list.population !== 0 )
                                    .sort((a, b) => a.population - b.population)
                                    .slice(0,5)
           
    }

    populationSwitch = (rangeValue) => {
        const populationDate = switchPopulationDate(rangeValue);
            const barangayList = this.getBarangaylist(populationDate)
            const highestPopulation = this.getHighestPopulation(barangayList);
            const lowestPopulation = this.getLowestPopulation(barangayList);
            this.setState({
                lowestPopulation: lowestPopulation,
                highestPopulation : highestPopulation
            })
    }
    
    highlightFeature = (e) => {

       console.log("from higllight fetaure : ",hoveredStateId)
        if (hoveredStateId) {           
            this.map.setFeatureState({ 
                source: "composite",
                sourceLayer:"iloilo_city_barangay_boundary-8ms17x", 
                id: hoveredStateId},
                 { hover: false}
                ); 
                    
        }
        hoveredStateId = e.features[0].id;
        this.map.setFeatureState({
            source: "composite",
            sourceLayer:"iloilo_city_barangay_boundary-8ms17x", 
            id: hoveredStateId}, 
            { hover: true});  
    }

    removeHighlight = () => {
        console.log("from remove higllight fetaure : ",hoveredStateId)
        if (hoveredStateId) {
            this.map.setFeatureState({
                source: "composite",
                sourceLayer:"iloilo_city_barangay_boundary-8ms17x", 
                id: hoveredStateId}, 
                { hover: false}); 
        }
        hoveredStateId = null;
    }
    
    // shouldComponentUpdate(nextProps, nextState){
    //     if (this.state.hoveredStateId !== nextState.hoveredStateId){
    //         return false
    //     } else return true
    // }
    popupFeatureInfo(e,barangayName,populationValue,popup){
        const itemDescription = `<p>Brgy. ${barangayName}</p>
                                 <p>Population : ${populationValue}</p> `;
        popup.setLngLat(e.lngLat)
            .setHTML(itemDescription)
            .addTo(this.map)
    }

    componentDidMount(){
        
        const {lng, lat,zoom } = this.state;
         this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: this.state.style,
            center: [lng, lat],
            zoom,
            // attributionControl: false
        });

        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        this.map.on("mousemove", "iloilo-city-barangay-boundary-8ms17x", (e) => {
           this. map.getCanvas().style.cursor = 'pointer'
            if (e.features.length > 0) {
                const barangayName = e.features[0].properties.Barangay_BarangayName
                const propertyValue = switchPopulationDate(this.state.rangeSliderValue);
                const populationValue = e.features[0].properties[propertyValue]
                this.highlightFeature(e);
                this.popupFeatureInfo(e,barangayName,populationValue,popup)
            }
        });
        
        
        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        this.map.on("mouseleave", "iloilo-city-barangay-boundary-8ms17x", ()=>{ 
            this. map.getCanvas().style.cursor = ''
               this.removeHighlight()
               popup.remove();
            
        });
        
        // console.log(this.state.population)
    }


   
            
    render(){
        
        return (
            <div className='page'>
            {console.log("all was rendered")}
                <MapHeader/>
                <div ref={el => this.mapContainer = el} className="webmap"></div>
                <div className = "chart__container">
                    <Chart title="Top 5 Barangay With Highest Population" 
                        chartLimit = {this.state.highestPopulation[0].population}
                        population={this.state.highestPopulation}     
                    />
                    <Chart  title="Top 5 Barangay With lowest Population"
                        population={this.state.lowestPopulation}   
                        chartLimit = {this.state.lowestPopulation[4].population / .5 }
                        
                    />
                </div>
                <RangeSlider currentValue={this.state.rangeSliderValue} 
                    onSliderChange={this.handleSliderChange}
                    populationSwitch= {this.populationSwitch}
                />
                <Legend/>
            </div>
        )
   }    
}

// 



 export default PopulationMap;
