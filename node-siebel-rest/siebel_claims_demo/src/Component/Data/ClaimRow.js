import React, { Component } from 'react';

class ClaimRow extends Component {
  render() {
    const claim = this.props.claim;

    return (
      <table>
      <tbody>
      <tr>
        <td>Claim Number: {claim.claimNumber}</td>
        <td>Loss Date: {claim.lossDate}</td>
      </tr>
      <tr>
        <td>Policy Number: {claim.policyNumber}</td>
      </tr>
      <tr>
        <td>Last Name: {claim.lastName}</td>
        <td>First Name: {claim.firstName}</td>
      </tr>
      </tbody>
      </table>
    );
  }
}

export default ClaimRow;
