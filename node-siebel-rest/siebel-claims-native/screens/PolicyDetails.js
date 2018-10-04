import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';

import {
  StyleSheet,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Text,
  Image,
} from 'react-native';

import myConfig from '../config/Config';
import { callGetApi } from '../utils/rest';
import colors from '../utils/colors';

export default class PolicyDetails extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: myConfig.customer,
    headerLeft: (
      <MaterialIcons
        name="menu"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => navigate('DrawerToggle')}
      />
    ),
  });
  constructor(props) {
    super(props);
    this.state = {
      customer: myConfig.customer,
      policyDetails: {},
      loading: true,
      error: false,
    };
  }

  async getPolicyDetails(url) {
    try {
      const json = await callGetApi(url);
      console.log('json: ' + JSON.stringify(json));
      return json;
    } catch (e) {
        console.log(e.message);
        throw e;
    }
  }

  async componentDidMount() {
    //var url = `${myConfig.siebelUrl}/siebel/v1.0/data/Contact/Contact/${myConfig.customerId}/INS Policy`;
    var url = `${myConfig.simUrl}/claims/policyDetails/${this.state.customer}`;
    try {
      console.log(url);
      const policyDetails = await this.getPolicyDetails(url);
      console.log("policyDetails:", policyDetails);
      this.setState({policyDetails: policyDetails, loading: false, error: false});
    } catch (e) {
        this.setState({
        loading: false,
        error: e.message,
      });
    }
  }

  render() {
    const { loading, policyDetails, error, } = this.state;
    console.log("policyDetails:Id", policyDetails["Id"]);
    return (
      <View>
        {loading && <ActivityIndicator size="large" />}
        {error !== false && <Text>Error trying to setup: {error}</Text>}
        {!loading &&
          !error && (
      <View style={styles.borderContainer}>
            <View style={styles.wrapper}>
              <View style={styles.container}>
                <View style={styles.contentContainer}>
                  <Text style={[styles.title]}>Policy #: {policyDetails["Id"]}</Text>
                  <Text style={styles.subtitle}>Policy type: {policyDetails["Type"]}</Text>
                  <Text style={styles.subtitle}>Effective: {policyDetails["Policy Version Date"]}</Text>
                </View>
              </View>
            </View>

            {/* <TouchableHighlight onPress={() => {}}>
            <View>
            <Icon.Button name="times-circle-o" backgroundColor="#3b5998"
              onPress={() => this.props.navigation.navigate('ReviewClaims')}>
              <Text style={{fontFamily: 'Arial', fontSize: 15}}>Review Claims</Text>
            </Icon.Button>
            <Icon.Button name="times-circle-o" backgroundColor="#3b5998"
              onPress={() => this.props.navigation.navigate('AddClaim')}>
              <Text style={{fontFamily: 'Arial', fontSize: 15}}>Add Claim</Text>
            </Icon.Button>
            </View>
            </TouchableHighlight> */}
        </View>
      )}
              </View>
    );
  }
}


const styles = StyleSheet.create({
  borderContainer: {
    paddingLeft: 24,
  },
  wrapper: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
    borderColor: 'steelblue',
    borderRadius: 2,
    borderWidth: 1,
    height: 80
  },
  title: {
    color: 'steelblue',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center'
  },
  subtitle: {
    color: 'steelblue',
    fontSize: 15,
    marginTop: 4,
    alignSelf: 'center',
  },
  iconContainer: {
    width: 30,
    height: 30,
    color: 'steelblue',
  }
});
