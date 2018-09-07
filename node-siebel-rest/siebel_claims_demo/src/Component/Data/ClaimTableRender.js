import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { NavLink } from 'react-router-dom';

class ClaimTableRender extends Component {
  claimFormatter(cell, row) {
    return (
      <div>
        <NavLink to={`/claims/claimDetails/${cell}`}>{cell}</NavLink>
      </div>
    );
  }

  policyFormatter(cell, row) {
    return (
      <div>
        <NavLink to={`/claims/policyDetails/${cell}`}>{cell}</NavLink>
      </div>
    );
  }

  columns = [{
      dataField: 'claimNumber',
      text: 'Claim Number',
      sort: false,
      filter: textFilter(),
      formatter: this.claimFormatter
    },
    {
      dataField: 'reportedDate',
      text: 'Reported Date',
      sort: true
    },
    {
      dataField: 'policyNumber',
      text: 'Policy Number',
      sort: false,
      formatter: this.policyFormatter
    },
    {
      dataField: 'firstName',
      text: 'First Name',
      sort: true
    },
    {
      dataField: 'lastName',
      text: 'First Name',
      sort: true
    }
  ];

  render() {
    return (
      <BootstrapTable
      striped
      hover
      keyField='claimNumber'
      data={ this.props.claims }
      columns={ this.columns }
      filter={ filterFactory() }
      pagination={ paginationFactory() }/>
    );
  }
}
export default ClaimTableRender;
