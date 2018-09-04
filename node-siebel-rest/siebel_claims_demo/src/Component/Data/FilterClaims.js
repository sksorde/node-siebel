import React, { Component } from 'react';

import Claims from './Claims';
import SearchBar from './SearchBar';

class FilterClaims extends Component {
  constructor(props) {
      super(props);
      this.state = {
        filterText: ''
      };
      this.onFilterTextChange = this.onFilterTextChange.bind(this);
  }

  onFilterTextChange(filterText) {
    this.setState({filterText: filterText});
  }

  render() {
    return (
          <div>
            <SearchBar
              filterText={this.state.filterText}
              onFilterTextChange={this.onFilterTextChange}
            />
            <Claims
              claims={this.props.claims}
              filterText={this.state.filterText}
            />
          </div>
        );
  }
}

export default FilterClaims;
