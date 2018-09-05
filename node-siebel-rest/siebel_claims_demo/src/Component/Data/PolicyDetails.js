import React, { Component } from 'react';

import {Popover, OverlayTrigger} from 'react-bootstrap';
import {CSSTransition} from 'react-transition-group';


class PolicyDetails extends Component {

  constructor(props) {
    super(props);
    const { policy } = props.match.params;
    this.state = {
      policyNumber: `${policy}`,
      isLoaded: false,
      policyDetails: [],
      show: false
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({policyDetails: JSON.parse(res).policyDetails, isLoaded: true, show: true});
        })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('http://127.0.0.1:9999/claims/policyDetails/' + this.state.policyNumber);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
     <div>
        <p>Policy Number: { this.state.policyDetails.policyNumber }</p>
      </div>

    );
  }
}

export default PolicyDetails;
