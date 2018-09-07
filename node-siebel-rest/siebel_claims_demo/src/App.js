import React, { Component } from 'react';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import Navigate from './Component/Navigate';
import Home from './Component/Home';
import AllClaims from './Component/AllClaims';
import ClaimDetails from './Component/Data/ClaimDetails';
import PolicyDetails from './Component/Data/PolicyDetails';

import 'react-router-modal/css/react-router-modal.css';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
     <div className='app'>
        <Router>
          <div>
            <Navigate />
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/claims" component={AllClaims}/>
            </Switch>
            <ModalRoute
              path="/claims/claimDetails/:claim"
              parentpath="/claims"
              component={ClaimDetails}/>
            <ModalRoute
              path="/claims/policyDetails/:policy"
              parentpath="/claims"
              component={PolicyDetails}/>
              <ModalRoute path='/modal-test' parentPath='/'>
                Hello
              </ModalRoute>
          </div>
        </Router>
        <ModalContainer id="modal-container"/>
      </div>
    );
  }
}

export default App;
