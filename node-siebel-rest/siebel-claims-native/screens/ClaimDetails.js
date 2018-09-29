import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import myConfig from '../config/Config';
import { callGetApi } from '../utils/rest';
import DetailListItem from '../components/DetailListItem';
import Avatar from '../components/Avatar';
import getAvatarColor from '../utils/getAvatarColor';
import colors from '../utils/colors';
import getInitials from '../utils/getInitials';

export default class ClaimDetails extends Component {
  static navigationOptions = ({ navigation: { state: { params } } }) => {
    const { claim } = params;
    return {
    title: 'Claim Details for ' + claim,
  };
  };

  state = {
      claim: '',
      claimDetails: {},
      loading: true,
      error: false,
    };

  async getClaimDetails(url) {
      const json = await callGetApi(url);
      return json.claimDetails;
  }

  async componentDidMount() {
    const { navigation: { state: { params } } } = this.props;
    const { claim } = params;
    var url = myConfig.siebelUrl + '/claims/claimDetails/' + encodeURIComponent(claim);
    try {
      const claimDetails = await this.getClaimDetails(url);
      this.setState({claimDetails: claimDetails,loading: false, error: false,});
    } catch (e) {
        this.setState({
        loading: false,
        error: e.message,
      });
    }
  }

  render() {
    const {
         loading, error,  } = this.state;
    const { claimNumber, firstName, lastName, policyNumber, status, lossCode, policyType,
          }  = this.state.claimDetails;
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>{error}</Text>}
        {!loading &&
          !error && (
          <View style={styles.detailsSection}>
            <Avatar
            size={50}
            initials={getInitials(myConfig.customer)}
            backgroundColor={getAvatarColor(myConfig.customer)}
            />
            <Text numberOfLines={1}>{firstName} {lastName} </Text>
            <DetailListItem icon="credit-card" title="Policy#" subtitle={policyNumber} />
            <DetailListItem icon="credit-card" title="Claim#" subtitle={claimNumber} />
            <DetailListItem icon="date-range" title="Incident happened " subtitle={lossCode} />
            <DetailListItem icon="date-range" title="Incident was reported on " subtitle={policyType} />
            <DetailListItem icon="info" title="Claim Status" subtitle={status} />
        </View>
      )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
