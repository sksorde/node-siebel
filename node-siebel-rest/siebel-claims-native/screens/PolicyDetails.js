import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
} from 'react-native';

import myConfig from '../config/Config';
import { callGetApi } from '../utils/rest';
import colors from '../utils/colors';

export default class PolicyDetails extends Component {
  static navigationOptions = {
    title: myConfig.customer,
  };
  constructor(props) {
    super(props);
    this.state = {
      customer: myConfig.customer,
      policyDetails: [],
      loading: true,
      error: false,
    };
  }

  async getPolicyDetails(url) {
    const json = await callGetApi(url);
    return json.policyDetails;
  }

  async componentWillMount() {
    var url = myConfig.siebelUrl + '/claims/policyDetails/' + encodeURIComponent(this.state.customer);
    try {
      const policyDetails = await this.getPolicyDetails(url);
      console.log(policyDetails);
      this.setState({policyDetails: policyDetails, isLoaded: true, show: true});
    } catch (e) {
        this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    return (
      <View style={styles.borderContainer}>
            <View style={styles.wrapper}>
              <View style={styles.container}>
                <View style={styles.contentContainer}>
                  <Text style={[styles.title]}>Policy #: {this.state.policyDetails.policyNumber}</Text>
                  <Text style={styles.subtitle}>Policy type: {this.state.policyDetails.policyType}</Text>
                  <Text style={styles.subtitle}>Expires: 10/10/2020</Text>
                </View>
              </View>
            </View>
            <TouchableHighlight onPress={() => 'test'}>
            <View>
            <Icon.Button name="times-circle-o" backgroundColor="#3b5998" onPress={() => this.props.navigation.navigate('ReviewClaims')}>
              <Text style={{fontFamily: 'Arial', fontSize: 15}}>Review Claims</Text>
            </Icon.Button>
            <Icon.Button name="times-circle-o" backgroundColor="#3b5998">
              <Text style={{fontFamily: 'Arial', fontSize: 15}}>Add Claim</Text>
            </Icon.Button>
            </View>
            </TouchableHighlight>
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
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center'
  },
  subtitle: {
    color: colors.blue,
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
