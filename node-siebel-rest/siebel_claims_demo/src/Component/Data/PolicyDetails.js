import React, { Component } from 'react';

import {Popover} from 'react-bootstrap';

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
    this.handleHide = this.handleHide.bind(this);
  }

  // componentDidMount() {
  //   var url = 'http://127.0.0.1:9999/claims/policyDetails/12345';
  //   var res = fetch(url, {
  //         method: "GET", // *GET, POST, PUT, DELETE, etc.
  //         mode: "no-cors", // no-cors, cors, *same-origin,
  //         credentials: "omit",
  //         headers: {
  //             "Content-Type": "application/json",
  //             "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
  //             "Access-Control-Allow-Headers": "Content-Type",
  //             "Access-Control-Allow-Methods": "GET"
  //         },
  //         //body: JSON.stringify(body), // body data type must match "Content-Type" header
  //     }).then(function(response) {
  //     return response;
  //   })
  //   .then(function(myJson) {
  //         return myJson;
  //       })
  //   .catch((error) => {
  //           console.error(error);
  //           return error;
  //         });
  //     this.setState({isLoaded: true, details: res});
  // }

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

  handleHide() {
    this.setState({show: false});
  }

  render() {
    return (

          <div>
            <p>Policy Details for { this.state.policyNumber }</p>
            Policy: { this.state.policyDetails.policyNumber}
          </div>
    );
  }
}

export default PolicyDetails;
