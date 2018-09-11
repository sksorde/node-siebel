import React, { Component } from 'react';

import { Modal } from 'react-router-modal';
import './../../App.css';
import myConfig from '../../config/Config';
import callApi from '../../util/rest';

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
    var url = myConfig.siebelUrl + '/claims/policyDetails/' + this.state.policyNumber;
    callApi(url)
      .then(res => {
        this.setState({policyDetails: JSON.parse(res).policyDetails, isLoaded: true, show: true});
        })
      .catch(err => console.log(err));
  }

  close = (e) => {
    this.setState({show: false});
    const { history } = this.props;
    history.push("/claims");
    e.stopPropagation();
  };

  render() {
    return (
      this.state.show &&
     <Modal onBackdropClick={this.close} id="one">
        <p>Policy Number: { this.state.policyDetails.policyNumber } <br/>
         ......
         Details to follow
        </p>

      </Modal>
    );
  }
}

export default PolicyDetails;
