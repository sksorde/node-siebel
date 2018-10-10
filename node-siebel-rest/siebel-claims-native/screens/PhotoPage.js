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
import {CheckBox} from 'react-native-elements';

import myConfig from '../config/Config';
import { callGetApi } from '../utils/rest';
import ClaimRow from '../components/ClaimRow';
import ImageGrid from '../components/ImageGrid';

export default class PhotoPage extends Component {

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Select Photos',
  });

  state = {
    holder: myConfig.customer,
    claims: [],
    loading: true,
    error: false,
    selectedUris: [],
  };

  selectImage = (id) => {
    var index = this.state.selectedUris.indexOf(id);
    console.log("index", index);
    if (index !== -1)
      this.setState({selectedUris: this.state.selectedUris.splice(index, 1)});
    else {
      this.setState({selectedUris: this.state.selectedUris.concat(id),});
    }
  }

  render() {
    const { loading, claims, error, } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputMethodEditor}>
          <ImageGrid

          />
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
