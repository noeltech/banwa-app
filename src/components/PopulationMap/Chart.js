import React from 'react';
// import {BarChart, Bar, XAxis, YAxis, Tooltip, LabelList} from 'recharts'


const percentValue = ( x, highestPop) => `${Math.round(( x / highestPop)*100)}%`



const Chart = (props) => (
    <div className="chart_container">
    <span>{props.title}}</span>
        {     
            props.population.map((data, index)=> {
            return <div key={index} >
            <span>{data.barangayName}     {data.population}</span>
            <svg key ={index} width="100%" height="8" >
                <rect width="100%" height="10" fill="#ccc"  rx="5" ry="5"></rect>
                
                <rect width={percentValue(data.population, props.chartLimit)} height="8" fill='#fe9929' rx="5" ry="5">
                <animate 
                    attributeName="width" 
                    from="0" 
                    to={percentValue(data.population, props.chartLimit)}
                    dur="300ms"
                    />
                </rect>
            </svg>
            </div>
            
        })}
    </div>  
)

export default Chart;