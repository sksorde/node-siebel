import React, { Component } from 'react';
import ClaimRow from './ClaimRow';
import { Modal } from 'react-router-modal';
import './../../App.css';
import myConfig from '../../config/Config';
import callGetApi from '../../util/rest';

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
    var url = myConfig.siebelUrl + '/claims/claimDetails/' + this.state.claimNumber;
    callGetApi(url)
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

  render() {
    return (
      this.state.show &&
          <Modal onBackdropClick={this.close}
          id="one">
            <ClaimRow claim={this.state.claimDetails}/>
          </Modal>
    );
  }
}

export default ClaimDetails;
