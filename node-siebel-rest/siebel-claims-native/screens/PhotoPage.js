import React, { Component } from 'react';
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
import ImageGrid from '../components/ImageGrid';


export default class PhotoPage extends Component {

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Photo Gallery',
  });

  state = {
    holder: myConfig.customer,
    claims: [],
    loading: true,
    error: false,
  };

  render() {
    const { loading, claims, error, } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputMethodEditor}>
          <ImageGrid onPressImage={this.handlePressImage} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
});
