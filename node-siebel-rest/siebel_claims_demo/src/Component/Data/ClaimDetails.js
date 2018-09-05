import React, { Component } from 'react';
import { TweenMax, Back } from "gsap/all";
import { Popover } from 'react-bootstrap';
import ClaimRow from './ClaimRow';
import TransitionGroup from 'react-transition-group/TransitionGroup';


class ClaimDetails extends Component {
  constructor(props) {
    super(props);
    const { claim } = props.match.params;
    this.state = {
      claimNumber: `${claim}`,
      claimDetails: [],
      isLoaded: false,
      toggle: true
    };
  }

 componentWillEnter(callback) {
   const elem = this.container;
   TweenMax.from(elem, 0.5, {height: 0, ease:Back.easeOut, onComplete: callback});
 }

 componentWillLeave(callback) {
   const elem = this.container;
   TweenMax.from(elem, 0.5, {height: 0, opacity: '0', ease:Back.easeIn, onComplete: callback});
 }

 toggle() {
   this.setState({toggle: !this.state.toggle});
 }
  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({claimDetails: JSON.parse(res).claimDetails, isLoaded: true});
        })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('http://127.0.0.1:9999/claims/claimDetails/' + this.state.claimNumber);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
          <div>
            {this.state.isLoaded ? '' : 'loading ...'}
            <a onClick={ this.toggle }>Local details { this.state.claimNumber }</a>
              { this.state.toggle &&
                <ClaimRow claim={this.state.claimDetails} key={this.state.claimNumber}/>
              }
          </div>
    );
  }
}

export default ClaimDetails;
