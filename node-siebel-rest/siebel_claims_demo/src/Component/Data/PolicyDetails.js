import React, { Component } from 'react';

class PolicyDetails extends Component {
  constructor(props) {
    super(props);
    const { policy } = props.match.params;
    this.state = {
      policyNumber: `${policy}`,
      isLoaded: false,
      details: []
    };
  }

  componentDidMount() {
    var url = 'http://127.0.0.1:9999/claims/policyDetails/12345';
    var res = fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "no-cors", // no-cors, cors, *same-origin,
          credentials: "omit",
          headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Methods": "GET"
          },
          //body: JSON.stringify(body), // body data type must match "Content-Type" header
      }).then(function(response) {
      return response;
    })
    .then(function(myJson) {
          return myJson;
        })
    .catch((error) => {
            console.error(error);
            return error;
          });
      this.setState({isLoaded: true, details: res});
  }

  render() {
    return (
          <div>
            <p>Policy Details for { this.state.policyNumber }</p>
            { this.state.details.toString()}
          </div>
    );
  }
}

export default PolicyDetails;
