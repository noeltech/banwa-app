import React from 'react';
import ReactDOM from 'react-dom';
// import configureStore from './store/configureStore';

import AppRouter from './routers/AppRouter'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-rangeslider/lib/index.css'



import 'normalize.css/normalize.css';
import './styles/styles.scss';



const jsx = (
   
    <AppRouter/>
   
)
ReactDOM.render(jsx, document.getElementById('app'));
