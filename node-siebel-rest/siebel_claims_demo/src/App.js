import React, { Component } from 'react';

import Navigate from './Component/Navigate';
import Home from './Component/Home';
import AllClaims from './Component/AllClaims';
import ClaimDetails from './Component/Data/ClaimDetails';
import PolicyDetails from './Component/Data/PolicyDetails';

import './App.css';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    let claim = "test";
    return (
     <div className='app'>
        <Router>
          <div>
            <Navigate />
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/allClaims" component={AllClaims}/>
              <Route path="/claimDetails/:claim" component={ClaimDetails}/>
              <Route path="/policyDetails/:policy" component={PolicyDetails}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
