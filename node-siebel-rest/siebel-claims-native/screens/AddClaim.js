import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import { callGetApi } from '../utils/rest';
import myConfig from '../config/Config';
import colors from '../utils/colors';
import TouchableDetailListItem from '../components/TouchableDetailListItem';

export default class AddClaim extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Add Accident Claim',
  });
  state = {
      loading: true,
      error: false,
      claimDetails: '',
  };

  async updateSiebel() {
    var url = myConfig.siebelUrl + '/claims/addClaim/' + myConfig.customer;
    try {
      const claimDetails = await callPostApi(url);
      this.setState({claimDetails: claimDetails,loading: false, error: false,});
    }
    catch (e) {
        this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    const { navigation: { navigate } } = this.props;
    return (
      <View style={styles.container}>
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
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
