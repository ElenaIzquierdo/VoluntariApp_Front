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
import viewForumTheme from './pages/viewForumTheme';
import viewEventProper from './pages/viewEventProper';
import createForumTheme from './pages/createForumTheme';
import centreInteres from './pages/centreInteres';
import week from './pages/week';
import login from './pages/login';

class App extends Component {
  render(){
    return(
        <Provider store={store}>
            <Router>
              <Route exact path="/login" component={login}/>
              <Route exact path="/" component={Home}/>
              <Route exact path="/events" component={Events}/>
              <Route exact path="/forum" component={Forum}/>
              <Route exact path="/calendari" component={Calendari}/>
              <Route path="/viewforumtheme/:forumthemeid" component={viewForumTheme}/>
              <Route path="/viewEventProper/:eventid" component={viewEventProper}/>
              <Route path="/createForumTheme" component={createForumTheme}/>
              <Route path="/centre-interes" component={centreInteres}/>
              <Route path="/week/:weekid" component={week}/>
            </Router>
        </Provider>
    )
  }
}

export default App;
