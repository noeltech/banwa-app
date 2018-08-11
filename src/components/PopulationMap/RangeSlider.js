import React from 'react'
import Slider from 'react-rangeslider'
import {switchPopulationDate,getBarangaylist} from './Utilities'



const RangeSlider =  (props) => (
    <div className='slider'>
        {console.log('slider Rendered')}
        <Slider
        min={1}
        max={9}
        step={1}
        value = {props.currentValue}
        tooltip={true}
        orientation= {'horizontal'}
        labels ={ {1:'1970',2:'1975', 3:'1980' ,4:'1990',5:'1995',6:'2000',7:'2007', 8:'2010', 9:'2015'}}
        onChange={(value) => {
            props.onSliderChange(value)
            props.populationSwitch(value)
            
          }}
        />
    </div>
)

   
export default RangeSlider;

