import React from 'react'

const legend = ['1,000 ','3,000 ','5,000 ','7,000 ','9,000 ','12,000','15,000']
const color = ['#ffffd4', '#fee391', '#fec44f','#fe9929','#ec7014','#cc4c02','#8c2d04']

   
 const Legend = () => (
    <div className="legend">
    {console.log("Legend renderd")}
        <span>Legend</span> 
        {legend.map((list ,index ) => {
            return <p key={index} className="legend_item">
                <span className="legend_text" >{list}</span>
                <span style={{height:"20px" ,width:"20px", backgroundColor:color[index] }}></span>
                </p>     
            }) 
        }
    </div>
 )
    

export default Legend;