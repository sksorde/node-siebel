import React, { Component } from 'react';
import { Modal } from 'react-router-modal';

class PolicyDetails extends Component {

  constructor(props) {
    super(props);
    const { policy } = props.match.params;
    this.state = {
      policyNumber: `${policy}`,
      policyDetails: [],
      show: false
    };
  }

  componentWillMount() {
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

  close = (e) => {
    this.setState({show: false});
    const { history } = this.props;
    history.push("/claims");
    e.stopPropagation();
  };

  render() {
    return (
      this.state.show &&
     <Modal onBackdropClick={this.close}>
        <p>Policy Number: { this.state.policyDetails.policyNumber }</p>
      </Modal>
    );
  }
}

export default PolicyDetails;
