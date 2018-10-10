import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DatePicker extends Component {
  static navigationOptions = ({ navigation: { state: { params } } }) => {
    const { show } = params;
    return {
      title: 'Date of Incident',
    }
  };


  state = {
    isDateVisible: true,
    selectedDate: new Date(),
  };

  _updateDate = (newdate) => {
    this.setState({selectedDate: newdate,});
  }

  _hideDatePicker = () => {
    this.setState({isDateVisible: false,});
    this.props.navigation.goBack();
  }
  _handleDatePicked = () => {
    this.setState({isDateVisible: false});
    this.props.navigation.state.params.returnData(this.state.selectedDate);
    this.props.navigation.goBack();
  }

  render() {
    const { navigation: { state: { params } } } = this.props;
    const { show } = params;

    return (
      <View style={styles.container}>
        <DateTimePicker
          isVisible={this.state.isDateVisible}
          onDateChange={this._updateDate}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDatePicker}
          mode="datetime"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
