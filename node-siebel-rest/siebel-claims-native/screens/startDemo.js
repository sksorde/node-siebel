import React from 'react';
import { TouchableHighlight,
         StyleSheet,
         Text,
       } from 'react-native';
       import colors from '../utils/colors';

export default class StartDemo extends React.Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
      console.log("pressed!");
  }

  render() {
    return(
      <TouchableHighlight
        underlayColor={colors.grey}
        style={styles.container}
        onPress={this.onPress}
      >
          <Text style={[styles.buttonStyle, styles.mediumText]}>Press to Start Demo</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create ({
      container: {
      },
      buttonStyle: {
        fontSize: 24,
        backgroundColor: 'grey',
      },
      mediumText: {
        textAlign: 'center',
        fontSize: 25,
      },
});
