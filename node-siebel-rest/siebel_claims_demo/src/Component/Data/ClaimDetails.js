import React, { Component } from 'react';

import ClaimRow from './ClaimRow';

const DETAILS = [
  {claimNumber: '1-L78XTX', lossDate:'', policyNumber: 'KM-VEH-005', lastName: 'tester', firstName: 'first1', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1-OOCR13', lossDate: '', policyNumber: '1G1156K01', lastName: 'tester', firstName: 'first2', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1710118', lossDate: '', policyNumber: '1K9087TY02', lastName: 'tester', firstName: 'first3', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1710675', lossDate: '', policyNumber: 'KM-VEH-006', lastName: 'tester', firstName: 'first1', policyType: 'AUTO', status: 'OPEN', lossCode:''},
  {claimNumber: '1711379', lossDate: '', policyNumber: '1A456YU009', lastName: 'tester', firstName: 'first2', policyType: 'AUTO', status: 'OPEN', lossCode:''}
];
class ClaimDetails extends Component {
  constructor(props) {
    super(props);
    const { claim } = props.match.params;
    this.state = {
      claimNumber: `${claim}`,
      claimDetails: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({claimDetails: JSON.parse(res).claimDetails, isLoaded: true});
        })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('http://127.0.0.1:9999/claims/claimDetails/' + this.state.claimNumber);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
          <div>
            {this.state.isLoaded ? '' : 'loading ...'}
            <p>Local details { this.state.claimNumber }</p>
              <ClaimRow claim={this.state.claimDetails}
              key={this.state.claimNumber}/>
          </div>
    );
  }
}

export default ClaimDetails;
