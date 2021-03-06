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
import { MaterialIcons } from '@expo/vector-icons';

import { callPostApi } from '../utils/rest';
import myConfig from '../config/Config';
import colors from '../utils/colors';
import TouchableDetailListItem from '../components/TouchableDetailListItem';

export default class AddClaim extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Add Accident Claim',
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
      claim: [],
      error: false,
      adding: "false",
      lossDate:new Date(),
  };

  async postNewClaim(url, data) {
    const jsondata = await callPostApi(url, data);
    console.log('json:', jsondata);
    return jsondata['Id'];
  }

 setDateOfIncident(selectedDate) {
   this.setState({lossDate: selectedDate});
   console.log('lossDate', selectedDate);
 }

 getFormattedDate(date) {
   var mm = date.getMonth() + 1;
   var dd = date.getDate();
   var yyyy = date.getFullYear();
   return mm + '/' + dd +'/' + yyyy +' '+
   date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
 }

 async updateSiebel() {
   try {
      var url = `${myConfig.simUrl}/claims/addClaim/${myConfig.customer}`;
      //var url = `https://win-b1ejslvnv0l.siebel-pravici.com:9301/siebel/v1.0/data/Demo INS Claims/INS Claims/`;
      console.log(url);
      data = {
                "Id": "New claim",
                "Asset Id": "1-3H01",
                "Location Description": "parking lot Thom Thumb store facing Renner Rd",
                "Loss Date - Non UTC": this.getFormattedDate(this.state.lossDate),
              };
      // simdata = {
      //   claimType: 'accident',
      //   accidentType: 'other car',
      //   location: 'text field',
      //   lossDate: '10/10/17',
      //   reportedDate: '10/10/2017',
      //   policyNumber: 'KM-VEH-005',
      // };
      this.setState({adding: "adding",});
      //const claim = callPostApi(url, data, this.postNewClaim);
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
          <View style={styles.container}>
          <TouchableDetailListItem icon="info" title="Accident Type " rightIcon="chevron-right" />
          <TouchableDetailListItem icon="date-range" title="Date & Location" rightIcon="chevron-right"
           onPress={() => navigate('DatePicker', { show : true , returnData : this.setDateOfIncident.bind(this)})}/>
          <TouchableDetailListItem
            icon="camera"
            title="Pictures of the Incident"
            rightIcon="chevron-right"
            onPress = {() => navigate('PhotoPage', { claim: this.state.claimNumber })}
          />
          <TouchableDetailListItem icon="verified-user" title="Contact Info" rightIcon="chevron-right" />
          <TouchableDetailListItem icon="traffic" title="Other Driver's Info" rightIcon="chevron-right"/>
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
