import React, { Component } from 'react';

import Claims from './Data/Claims';
import myConfig from '../config/Config';
import callApi from '../util/rest';

class AllClaims extends Component {

  constructor() {
    super();
    this.state = {
      isLoaded: false,
      claims: []
    };
  }

  componentWillMount() {
    var url = myConfig.siebelUrl + '/claims/allClaims/' + myConfig.siebelUser;
    callApi(url)
      .then(res => {
        this.setState({claims: JSON.parse(res).claims, isLoaded: true});
        })
      .catch(err => console.log(err));
  }

  render() {
    return (
      this.state.isLoaded &&
      <div>
      <Claims claims={this.state.claims} />
      </div>
    );
  }
}

export default AllClaims;
