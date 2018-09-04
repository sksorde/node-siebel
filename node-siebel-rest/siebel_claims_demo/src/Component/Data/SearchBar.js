import React, { Component } from 'react';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onFilterTextChange = this.onFilterTextChange.bind(this);
  }

  onFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.onFilterTextChange}
        />
      </form>
    );
  }
}

export default SearchBar;
