import React, { Component } from 'react';
import ClaimTableRender from './ClaimTableRender';

class Claims extends Component {
  render() {
      //const filterText = this.props.filterText;

      // const rows = [];
      //
      // this.props.claims.forEach((claim) => {
      //   if (claim.claimNumber.indexOf(filterText) === -1) {
      //     return;
      //   }
      //
      //   rows.push(
      //     <ClaimRow claim={claim}
      //       key={claim.claimNumber}
      //     />
      //   );
      // });

      return (
        <div className="container" style={{ marginTop: 50 }}>
          <ClaimTableRender claims={this.props.claims}/>
        </div>
        // <table>
        //   <thead>
        //     <tr>
        //       <th>Claim #</th>
        //       <th>ReportedDate</th>
        //       <th>Policy #</th>
        //       <th>Last Name</th>
        //       <th>First Name</th>
        //     </tr>
        //   </thead>
        //   <tbody>{rows}</tbody>
        // </table>
      );
  }
}

export default Claims;
