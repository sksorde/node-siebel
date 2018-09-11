import React, { Component } from 'react';

import Claims from './Data/Claims';
import myConfig from '../config/Config';

class AllClaims extends Component {

  constructor() {
    super();
    this.state = {
      isLoaded: false,
      claims: []
    };
  }

  componentWillMount() {
    this.callApi()
      .then(res => {
        this.setState({claims: JSON.parse(res).claims, isLoaded: true});
        })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    var url = myConfig.siebelUrl + '/claims/allClaims/' + myConfig.siebelUser;
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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
