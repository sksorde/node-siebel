import React from 'react';
import { TouchableHighlight,
         StyleSheet,
         Text,
       } from 'react-native';
import colors from '../utils/colors';
import { MaterialIcons } from '@expo/vector-icons';
import myConfig from '../config/Config';

export default class StartDemo extends React.Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Siebel Rest Integration',
    headerLeft: (
      <MaterialIcons
        name="menu"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => navigate('DrawerToggle')}
      />
    ),
  });

  render() {
    const { navigation: { navigate } } = this.props;
    return(
      <TouchableHighlight
        underlayColor={'steelblue'}
        style={styles.container}
        onPress={() => {}}
      >
          <Text style={[styles.buttonStyle, styles.mediumText]}>Press to Start Demo</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create ({
      container: {
        flex: 1,
        backgroundColor: '#34495E',
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
