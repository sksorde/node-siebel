import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


const ClaimRow = ({ claim }) => {

    return (
      <Grid className="show-grid">
        <Row>
          <Col xs={6} md={4}>
            <code>Last Name: {claim.lastName}</code>
          </Col>
          <Col xs={6} md={4}>
            <code>First Name: {claim.firstName}</code>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <code>Claim #: {claim.claimNumber}</code>
          </Col>
          <Col xs={6} md={4}>
            <code>Policy #: {claim.policyNumber}</code>
          </Col>
          <Col xs={6} md={4}>
            <code>Policy Type: {claim.policyType}</code>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4}>
            <code>Status: {claim.status}</code>
          </Col>
          <Col xsHidden md={4}>
            <code>Loss Date: {claim.lossDate}</code>
          </Col>
          <Col xs={6} md={4}>
            <code>Loss Code: {claim.lossCode}</code>
          </Col>
        </Row>
    </Grid>
    );
};

export default ClaimRow;
