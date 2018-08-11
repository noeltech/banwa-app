import React from 'react';
import {withRouter, NavLink} from 'react-router-dom'


const mapListItem =[
     {name: 'Popualtion Timeline', linkName: "/population_map"},
     {name: 'Flooded Area', linkName: "/flooded_map"},
     {name: 'Bikeability Index', linkName: "/bikeability_map"},
]


const MapList = (props) => (
    <div className="map_list">
        {mapListItem.map((item, index)=> {
            return <li 
                    key={index} 
                    className="map_list_item"
                    onClick ={() => {
                        console.log(props)
                        props.history.push(item.linkName)
                        props.onListClick()
                    }}
                >{item.name}</li>
        })}
    </div>
)

export default withRouter(MapList);