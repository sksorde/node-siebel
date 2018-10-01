import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { callPostApi } from '../utils/rest';
import myConfig from '../config/Config';
import colors from '../utils/colors';
import TouchableDetailListItem from '../components/TouchableDetailListItem';

export default class AddClaim extends Component {
  static navigationOptions = ({ navigation: { state: { params} } }) => ({
    title: 'Add Accident Claim',
  });

  state = {
      claim: [],
      error: false,
      adding: "false",
  };

  async postNewClaim(url, data) {
    const json = await callPostApi(url, data);
    return json.claim;
  }

  async updateSiebel() {
   try {
      var url = myConfig.siebelUrl + '/claims/addClaim/' + encodeURIComponent(myConfig.customer);
      data = {
        claimType: 'accident',
        accidentType: 'other car',
        location: 'text field',
        lossDate: '10/10/17',
        reportedDate: '10/10/2017',
        policyNumber: 'KM-VEH-005',
      };
      this.setState({adding: "adding",});
      const claim = await this.postNewClaim(url, data);
      this.setState({claim: claim, error: false, adding: "true,"});
      const { navigation: { navigate } } = this.props;
      navigate('ReviewClaims');
    } catch (e) {
        this.setState({
        error: e.message,
        adding: "false",
      });
    }
  }

  render() {
    const { navigation: { navigate } } = this.props;
    const { adding, error } = this.state;
    return (
      <View style={styles.container}>
      {adding == "adding" && <ActivityIndicator size="large" />}
      {error && <Text>{error}</Text>}
      {adding == "false" &&
        !error && (
          <View>
          <TouchableDetailListItem icon="info" title="Accident Type " rightIcon="chevron-right" />
          <TouchableDetailListItem icon="date-range" title="Date & Location" rightIcon="chevron-right" />
          <TouchableDetailListItem
            icon="camera"
            title="Pictures of the Incident"
            rightIcon="chevron-right"
            onPress = {() => navigate('PhotoPage', { claim: this.state.claimNumber })}
          />
          <TouchableDetailListItem icon="verified-user" title="Contact Info" rightIcon="chevron-right" />
          <TouchableDetailListItem icon="traffic" title="Other Driver's Info" rightIcon="chevron-right" />
          <TouchableHighlight onPress={() => this.updateSiebel()}
            underlayColor={colors.grey}
            style={styles.touchContainer}
          >
          <View>
            <Text style={[styles.buttonStyle, styles.mediumText]}>Submit Claim</Text>
          </View>
          </TouchableHighlight>
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
  touchContainer: {
    paddingLeft: 24,
    backgroundColor: 'steelblue',
    paddingTop: 10,
  },
  buttonStyle: {
    height: 40,
    alignItems: 'center',
  },
  mediumText: {
    textAlign: 'center',
    fontSize: 20,
  },
});
