import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import { store } from "./store";

//Pages:
import Home from './pages';
import Events from './pages/events';
import Forum from './pages/forum';
import Calendari from './pages/calendari';
import Tutories from './pages/tutories';

class App extends Component {
  render(){
    return(
        <Provider store={store}>
            <Router>
              <Route exact path="/" component={Home}/>
              <Route exact path="/events" component={Events}/>
              <Route exact path="/forum" component={Forum}/>
              <Route exact path="/calendari" component={Calendari}/>
              <Route exact path="/tutories" component={Tutories}/>
            </Router>
        </Provider>
    )
  }
}

export default App;
