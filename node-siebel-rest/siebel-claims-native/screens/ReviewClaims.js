import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import uuidv4 from 'uuid/v4';

import myConfig from '../config/Config';
import { callGetApi } from '../utils/rest';
import ClaimRow from '../components/ClaimRow';
import colors from '../utils/colors';

const mapClaim = claim => {
  const claimNumber = claim["Claim Number"];
  const status = null != claim["Status Code"] ? claim["Status Code"] : 'OPEN';
  const lossDate = claim["Loss Date"];
  const policyNumber = claim["Policy Number"];
  return {
    key: uuidv4(),
    claimNumber, status, lossDate, policyNumber,
  };
};

const keyExtractor = ( { claimNumber } ) => claimNumber;
export default class ReviewClaims extends Component {

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Review Claims',
    headerLeft: (
      <MaterialIcons
        name="menu"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => navigate('DrawerToggle')}
      />
    ),
  });

  state = {
    holder: myConfig.customer,
    claims: [],
    loading: true,
    error: false,
  };

  async componentDidMount() {
    var url = myConfig.simUrl + '/claims/allClaims/' + encodeURIComponent(this.state.holder);
    try {
      const claims = await this.getClaims(url);
      this.setState({claims,loading: false, error: false,});
    } catch (e) {
        this.setState({
        loading: false,
        error: e.message,
      });
    }
  }

  async getClaims(url) {
    const json = await callGetApi(url);
    console.log("json,", json);
    return json.items.map(mapClaim);
  }

  renderClaim = ({ item }) => {
    const { navigation: { navigate } } = this.props;
    const { claimNumber, status, lossDate, } = item;
    var ld = lossDate.length > 0 ? lossDate : 'not known';
    return (
        <ClaimRow
          claimNumber={claimNumber}
          status={status}
          lossDate={ld}
          onPress={() => navigate('ClaimDetails', { claim: item })}
        />
      );
  };

  render() {
    const { loading, claims, error, } = this.state;
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>{error}</Text>}
        {!loading &&
          !error && (
            <FlatList
              data={claims}
              keyExtractor={keyExtractor}
              renderItem={this.renderClaim}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});
