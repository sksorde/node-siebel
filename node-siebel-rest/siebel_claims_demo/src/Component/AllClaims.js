import React, { Component } from 'react';

import Claims from './Data/Claims';

const CLAIMS = [
  {claimNumber: '1-L78XTX', reportedDate: '2/26/2018 11:30 am', policyNumber: 'KM-VEH-005', lastName: 'tester', firstName: 'first1'},
  {claimNumber: '1-OOCR13', reportedDate: '2/27/2018 11:30 am', policyNumber: '1G1156K01', lastName: 'tester', firstName: 'first2'},
  {claimNumber: '1710118', reportedDate: '4/26/2018 11:30 am', policyNumber: '1K9087TY02', lastName: 'tester', firstName: 'first3'},
  {claimNumber: '1710675', reportedDate: '6/26/2018 11:30 am', policyNumber: 'KM-VEH-006', lastName: 'tester', firstName: 'first1'},
  {claimNumber: '1711379', reportedDate: '5/26/2018 11:30 pm', policyNumber: '1A456YU009', lastName: 'tester', firstName: 'first2'}
];
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
