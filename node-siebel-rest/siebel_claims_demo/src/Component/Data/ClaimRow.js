import React, { Component } from 'react';

class ClaimRow extends Component {
  render() {
    const claim = this.props.claim;

    return (
      <tr>
        <td>{claim.claimNumber}</td>
        <td>{claim.reportedDate}</td>
        <td>{claim.policyNumber}</td>
        <td>{claim.lastName}</td>
        <td>{claim.firstName}</td>
      </tr>
    );
  }
}

export default ClaimRow;
