import React, { Component } from 'react';

import Claims from './Data/Claims';

class AllClaims extends Component {

  constructor() {
    super();
    this.state = {
      isLoaded: false,
      claims: []
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({claims: JSON.parse(res).claims, isLoaded: true});
        })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('http://127.0.0.1:9999/claims/allClaims/aj');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div>
      {this.state.isLoaded ? '': 'loading ...'}

      <Claims claims={this.state.claims} />
      </div>
    );
  }
}

export default AllClaims;
