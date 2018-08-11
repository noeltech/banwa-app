import React from 'react';
import {BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import Header from '../components/Header/Header'
import HomePage from '../components/HomePage'
import PopulationMap from '../components/PopulationMap/PopulationMap'
import FloodedMap from '../components/FloodedMap'
import NotFoundPage from '../components/NotFoundPage'




import {connect} from 'react-redux';

const AppRouter = () => (
    <BrowserRouter>
    <div className='app'>
        <Header/>
        <Switch>
        <Route path='/' component ={HomePage} exact={true} />
        <Route path='/population_map' component={PopulationMap} />
        <Route path='/flooded_map' component={FloodedMap} />
        <Route component={NotFoundPage} />
        </Switch>
        
    </div>
    </BrowserRouter>
)



export default AppRouter;
 // <Route path='/population' component={PopulationMap}/>