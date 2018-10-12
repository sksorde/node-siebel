This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Siebel Claims Demo

This project was built using React-native and deployed to Expo. Yarn was the build tool. The intended target for this project is a mobile device - IOS or android.

It requires the following dev tools installed on the build machine:
 - Nodejs
 - Yarn
 - npm
 - Expo-cli

 The app runs as an Expo client on IOS/Android device. The device talks to a tunneling server, which forwards all requests to Siebel via https. Then returns the Siebel response to the client.

## Build for development

- Clone the project from git:
```
git clone https://github.com/Pravici/node-siebel.git
cd node-siebel/node-siebel-rest/siebel-claims-native
yarn
yarn start
```

The above command starts the app and displays a QR code on the console.
```
cd node-siebel/node-siebel-rest/siebel_claims_demo/simulator
npm install
node app.js
```
To test:
 - Install Expo on the mobile device (IOS or Android device)
  Login into Expo, using the following credentials:
  - anura/test123
 - Scan the QR code from the console OR send the URL to the device by text

## Build for deployment to Expo
 This process deploys the app for any user to test on Cellular data or Wifi.

 From within the node-siebel/node-siebel-rest/siebel-claims-native folder, execute the following command (it builds for IOS AND Android devices):
 ```
 expo-cli build:ios -t simulator
 ```

 This command publishes the app to https://expo.io/@anura/siebel-claims

 Any device that has signed into the Expo app can access the app and test it.

## Additional Information for Developers
 Configuration for this project is in node-siebel-rest/siebel-claims-native/config folder. Edit the Config.js file to modify access to the tunneling server:
```
  customerId: '1-2RLW',
  customer: 'Mohamed Abdellah',
  simUrl: 'http://13.58.101.5:9999',
 ```
### Tunneling Server
The following folder contains the code for Nodejs server that receives requests from mobile device and forwards to Siebel server in a secure manner: node-siebel/node-siebel-rest/siebel_claims_demo/simulator

### Mapping between mobile and Siebel End Points
```
GET ${myConfig.simUrl}/claims/policyDetails/${myConfig.customer} => 
<SiebelUrl>/siebel/v1.0/data/Demo INS Policy/INS Policy/<policy Number>
```

```
GET
${myConfig.simUrl}/claims/allClaims/${myConfig.customer} =>
<SiebelUrl>/siebel/v1.0/data/Demo INS Claims/INS Claims
```

```
GET
${myConfig.simUrl}/claims/claimDetails/<Claim Number> =>
<SiebelUrl>/siebel/v1.0/data/Demo INS Claims/INS Claims/<claim Number>
```

```
PUT
${myConfig.simUrl}/addClaim/${myConfig.customer} =>
<SiebelUrl/siebel/v1.0/data/Demo INS Claims/INS Claims

Payload:
{
  "Id": "New claim",
  "Asset Id": "1-3H01",
  "Location Description": "parking lot Thom Thumb store",
  "Loss Date - Non UTC": "mm/dd/yyyy hh:mm::ss",
}
```