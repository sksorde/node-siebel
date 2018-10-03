import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import AppNavigator from './routes';
import StartDemo from './screens/StartDemo';

export default function App() {

  return <AppNavigator />;

  // <View style={styles.container}>
  //   <Text style={[styles.largeText, styles.textStyle]}>Siebel</Text>
  //   <Text style={[styles.largeText, styles.textStyle]}>Rest </Text>
  //   <Text style={[styles.largeText, styles.textStyle]}>Integration</Text>
  //
  // </View>

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
textStyle: {
    textAlign: 'center',
    fontFamily: 'AvenirNext-Regular',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});
