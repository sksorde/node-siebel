import { StackNavigator } from 'react-navigation';

import PolicyDetails from './screens/PolicyDetails';
import ReviewClaims from './screens/ReviewClaims';
import ClaimDetails from './screens/ClaimDetails';
//import AddClaim from './screens/AddClaim';

export default StackNavigator(
  {
    PolicyDetails: {
      screen: PolicyDetails,
    },
    ReviewClaims: {
      screen: ReviewClaims,
    },
    ClaimDetails: {
      screen: ClaimDetails,
    },
    // AddClaim: {
    //   screen: AddClaim,
    // },
  },
  {
    initialRouteName: 'PolicyDetails',
  },
);
