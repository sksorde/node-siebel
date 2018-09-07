import React, { Component } from 'react';
import ClaimRow from './ClaimRow';
import { Modal } from 'react-router-modal';

class ClaimDetails extends Component {
  constructor(props) {
    super(props);
    const { claim } = props.match.params;
    this.state = {
      claimNumber: `${claim}`,
      claimDetails: [],
      show: false
    };
  }

  componentWillMount() {
    this.callApi()
      .then(res => {
        this.setState({claimDetails: JSON.parse(res).claimDetails, show: true});
        })
      .catch(err => console.log(err));
  }

  close = (e) => {
    this.setState({show: false});
    const { history } = this.props;
    history.push("/claims");
    e.stopPropagation();
  };

  callApi = async () => {
    const response = await fetch('http://127.0.0.1:9999/claims/claimDetails/' + this.state.claimNumber);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      this.state.show &&
          <Modal onBackdropClick={this.close}>
            <ClaimRow claim={this.state.claimDetails}/>
          </Modal>
    );
  }
}

export default ClaimDetails;
