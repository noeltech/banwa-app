import React from 'react'


const MapHeader = () => (
    <div className="map_header">
        <div className="header_partition">
            <div className="title_container">
                <h5 className="map_header_title header_title_1">ILOILO CITY </h5>
                <h5 className="map_header_title header_title_2">POPULATION HISTORY</h5>
            </div>
         </div>
        <div className="header_partition">
            <h3 className="population_label">
                <span>POPULATION : </span>
                <span>15,654</span>
            </h3>
        </div>
        <div className="header_partition">
            <h3 className="population_label">
                <span>YEAR : </span>
                <span>2015 </span>
            </h3>
        </div>
    </div>

)
 

export default MapHeader;