import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import PolicyDetails from './screens/PolicyDetails';
import ReviewClaims from './screens/ReviewClaims';
import ClaimDetails from './screens/ClaimDetails';
import AddClaim from './screens/AddClaim';
import PhotoPage from './screens/PhotoPage';


const getDrawerItemIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
);

const reviewScreen = StackNavigator (
  {
    ReviewClaims: {
      screen: ReviewClaims,
    },
    ClaimDetails: {
      screen: ClaimDetails,
    },
  },
  {
    initialRouteName: 'ReviewClaims',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('list'),
    },
  },
);

const modScreen = StackNavigator (
  {
    AddClaim: {
      screen: AddClaim,
    },
    PhotoPage: {
      screen: PhotoPage,
    },
    ReviewClaims: {
      screen: ReviewClaims,
    },
  },
  {
    initialRouteName: 'AddClaim',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('star'),
    },
  },
);

const policyScreen = StackNavigator (
  {
    PolicyDetails: {
      screen: PolicyDetails,
    },
    ReviewClaims: {
      screen: ReviewClaims,
    },
    AddClaim: {
      screen: AddClaim,
    },
  },
  {
    initialRouteName: 'PolicyDetails',
    navigationOptions: {
      drawerIcon: getDrawerItemIcon('person'),
    },
  },
);

export default DrawerNavigator(
  {
    Policy: {
      screen: policyScreen,
    },
    Review: {
      screen: reviewScreen,
    },
    AddClaims: {
      screen: modScreen,
    },
  },
  
);
